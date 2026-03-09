import { useMemo, useState } from 'react';
import {
  Calendar as CalendarIcon,
  CheckSquare,
  ChevronDown,
  Filter,
  Kanban,
  Plus,
  Search,
  Settings,
  SortAsc,
  Table,
} from 'lucide-react';
import { useTheme } from '../../app/contexts/ThemeContext';
import { BoardView } from '../../app/components/projects/BoardView';
import { ProjectModal } from '../../app/components/projects/ProjectModal';
import { TableView } from '../../app/components/projects/TableView';
import { TimelineView } from '../../app/components/projects/TimelineView';
import {
  DEMO_PROJECTS,
  DEMO_PROJECT_WORKSPACES,
  type ProjectFormValues,
  type ProjectRecord,
  type ProjectsViewMode,
  type ProjectWorkspace,
} from './projects/projectModels';

export interface ProjectsOverviewScreenProps {
  title?: string;
  syncLabel?: string;
  projects?: ProjectRecord[];
  defaultProjects?: ProjectRecord[];
  workspaces?: ProjectWorkspace[];
  defaultWorkspaceId?: string;
  defaultViewMode?: ProjectsViewMode;
  searchPlaceholder?: string;
  onCreateProject?: () => void;
  onEditProject?: (project: ProjectRecord) => void;
  onSaveProject?: (
    project: ProjectRecord,
    context: {
      mode: 'create' | 'edit';
      previousProject: ProjectRecord | null;
    },
  ) => void;
}

function createProjectId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  return `project-${Date.now()}`;
}

export function ProjectsOverviewScreen({
  title = 'All Projects',
  syncLabel = 'Synced with Notion',
  projects,
  defaultProjects = DEMO_PROJECTS,
  workspaces = DEMO_PROJECT_WORKSPACES,
  defaultWorkspaceId,
  defaultViewMode = 'table',
  searchPlaceholder = 'Search projects...',
  onCreateProject,
  onEditProject,
  onSaveProject,
}: ProjectsOverviewScreenProps) {
  const { isDarkMode } = useTheme();
  const [currentView, setCurrentView] = useState<ProjectsViewMode>(defaultViewMode);
  const [workspaceDropdownOpen, setWorkspaceDropdownOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectRecord | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [internalProjects, setInternalProjects] = useState(defaultProjects);
  const fallbackWorkspace = workspaces[0] ?? { id: 'default', name: 'Workspace', icon: '📁' };
  const resolvedWorkspaces = workspaces.length > 0 ? workspaces : [fallbackWorkspace];
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState(
    defaultWorkspaceId ?? fallbackWorkspace.id,
  );

  const resolvedProjects = projects ?? internalProjects;
  const selectedWorkspace =
    resolvedWorkspaces.find((workspace) => workspace.id === selectedWorkspaceId) ?? fallbackWorkspace;

  const filteredProjects = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return resolvedProjects;
    }

    return resolvedProjects.filter((project) => {
      const searchableText = [
        project.title,
        project.description,
        project.assignee,
        project.status,
        project.priority,
        ...project.tags,
      ]
        .join(' ')
        .toLowerCase();

      return searchableText.includes(query);
    });
  }, [resolvedProjects, searchQuery]);

  const handleCreateProject = () => {
    setSelectedProject(null);
    setIsProjectModalOpen(true);
    onCreateProject?.();
  };

  const handleEditProject = (project: ProjectRecord) => {
    setSelectedProject(project);
    setIsProjectModalOpen(true);
    onEditProject?.(project);
  };

  const handleSaveProject = (formData: ProjectFormValues) => {
    const nextProject: ProjectRecord = selectedProject
      ? { ...selectedProject, ...formData }
      : { id: createProjectId(), ...formData };

    if (!projects) {
      setInternalProjects((previousProjects) => {
        if (selectedProject) {
          return previousProjects.map((project) =>
            project.id === selectedProject.id ? nextProject : project,
          );
        }

        return [...previousProjects, nextProject];
      });
    }

    onSaveProject?.(nextProject, {
      mode: selectedProject ? 'edit' : 'create',
      previousProject: selectedProject,
    });
    setIsProjectModalOpen(false);
    setSelectedProject(null);
  };

  const renderView = () => {
    switch (currentView) {
      case 'board':
        return <BoardView projects={filteredProjects} onEdit={handleEditProject} />;
      case 'timeline':
        return <TimelineView projects={filteredProjects} onEdit={handleEditProject} />;
      case 'table':
      default:
        return <TableView projects={filteredProjects} onEdit={handleEditProject} />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg">
              <CheckSquare className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                {title}
              </h1>
              <p className={`text-sm ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
                {resolvedProjects.length} projects
                {syncLabel ? ` • ${syncLabel}` : ''}
              </p>
            </div>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => setWorkspaceDropdownOpen(!workspaceDropdownOpen)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border smooth-transition ${
              isDarkMode
                ? 'bg-white/5 border-white/10 hover:bg-white/10'
                : 'bg-white/30 border-black/10 hover:bg-white/40'
            }`}
          >
            <span className="text-lg">{selectedWorkspace.icon}</span>
            <span className={`text-sm ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
              {selectedWorkspace.name}
            </span>
            <ChevronDown
              className={`w-4 h-4 ${isDarkMode ? 'text-white/40' : 'text-black/40'} smooth-transition ${workspaceDropdownOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {workspaceDropdownOpen && (
            <div
              className={`absolute top-full right-0 mt-2 w-56 rounded-lg border shadow-xl z-50 ${
                isDarkMode ? 'bg-[#0f0f19]/95 border-white/10' : 'bg-white/95 border-black/10'
              }`}
              style={{ backdropFilter: 'blur(40px)' }}
            >
              <div className="p-2">
                {resolvedWorkspaces.map((workspace) => (
                  <button
                    key={workspace.id}
                    onClick={() => {
                      setSelectedWorkspaceId(workspace.id);
                      setWorkspaceDropdownOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg smooth-transition ${
                      selectedWorkspace.id === workspace.id
                        ? isDarkMode
                          ? 'bg-purple-500/20 text-purple-400'
                          : 'bg-purple-500/20 text-purple-600'
                        : isDarkMode
                          ? 'hover:bg-white/5 text-white/80'
                          : 'hover:bg-black/5 text-black/80'
                    }`}
                  >
                    <span className="text-lg">{workspace.icon}</span>
                    <span className="text-sm">{workspace.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className={`flex items-center gap-1 p-1 rounded-lg ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}>
          <button
            onClick={() => setCurrentView('table')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg smooth-transition text-sm ${
              currentView === 'table'
                ? isDarkMode
                  ? 'bg-purple-500/20 text-purple-400'
                  : 'bg-purple-500/20 text-purple-600'
                : isDarkMode
                  ? 'text-white/60 hover:text-white/90'
                  : 'text-black/60 hover:text-black/90'
            }`}
          >
            <Table className="w-4 h-4" />
            <span>Table</span>
          </button>
          <button
            onClick={() => setCurrentView('board')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg smooth-transition text-sm ${
              currentView === 'board'
                ? isDarkMode
                  ? 'bg-purple-500/20 text-purple-400'
                  : 'bg-purple-500/20 text-purple-600'
                : isDarkMode
                  ? 'text-white/60 hover:text-white/90'
                  : 'text-black/60 hover:text-black/90'
            }`}
          >
            <Kanban className="w-4 h-4" />
            <span>Board</span>
          </button>
          <button
            onClick={() => setCurrentView('timeline')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg smooth-transition text-sm ${
              currentView === 'timeline'
                ? isDarkMode
                  ? 'bg-purple-500/20 text-purple-400'
                  : 'bg-purple-500/20 text-purple-600'
                : isDarkMode
                  ? 'text-white/60 hover:text-white/90'
                  : 'text-black/60 hover:text-black/90'
            }`}
          >
            <CalendarIcon className="w-4 h-4" />
            <span>Timeline</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search
              className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}
            />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className={`pl-10 pr-4 py-2 rounded-lg border smooth-transition text-sm w-64 ${
                isDarkMode
                  ? 'bg-white/5 border-white/10 text-white/90 placeholder-white/40 focus:border-purple-400/50'
                  : 'bg-white/30 border-black/10 text-black/90 placeholder-black/40 focus:border-purple-400/50'
              }`}
            />
          </div>

          <button className={`p-2 rounded-lg smooth-transition ${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-black/5'}`}>
            <Filter className={`w-5 h-5 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`} />
          </button>

          <button className={`p-2 rounded-lg smooth-transition ${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-black/5'}`}>
            <SortAsc className={`w-5 h-5 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`} />
          </button>

          <button className={`p-2 rounded-lg smooth-transition ${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-black/5'}`}>
            <Settings className={`w-5 h-5 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`} />
          </button>

          <button
            onClick={handleCreateProject}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white smooth-transition hover:shadow-lg hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm font-medium">New Project</span>
          </button>
        </div>
      </div>

      <div className="mt-6">{renderView()}</div>

      {isProjectModalOpen && (
        <ProjectModal
          project={selectedProject}
          onClose={() => {
            setIsProjectModalOpen(false);
            setSelectedProject(null);
          }}
          onSave={handleSaveProject}
        />
      )}
    </div>
  );
}
