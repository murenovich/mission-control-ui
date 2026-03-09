import { Plus, CheckSquare } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { BoardView } from './BoardView';
import { useState } from 'react';
import { ProjectModal } from './ProjectModal';
import {
  DEMO_PROJECTS,
  type ProjectRecord,
} from '../../../lib/screens/projects/projectModels';

export function ActiveProjects() {
  const { isDarkMode } = useTheme();
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectRecord | null>(null);

  // Filter for active projects (not completed)
  const activeProjects = DEMO_PROJECTS.filter(p => p.status !== 'Completed');

  const handleCreateProject = () => {
    setSelectedProject(null);
    setIsProjectModalOpen(true);
  };

  const handleEditProject = (project: ProjectRecord) => {
    setSelectedProject(project);
    setIsProjectModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-cyan-500 to-cyan-600 shadow-lg`}>
            <CheckSquare className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
              Active Projects
            </h1>
            <p className={`text-sm ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
              {activeProjects.length} projects in progress
            </p>
          </div>
        </div>

        {/* New Project */}
        <button
          onClick={handleCreateProject}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white smooth-transition hover:shadow-lg hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm font-medium">New Project</span>
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={`rounded-xl border p-4 ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white/30 border-black/10'}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>Planning</p>
              <p className={`text-2xl font-bold ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                {activeProjects.filter(p => p.status === 'Planning').length}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/20 flex items-center justify-center">
              <span className="text-2xl">📋</span>
            </div>
          </div>
        </div>

        <div className={`rounded-xl border p-4 ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white/30 border-black/10'}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>In Progress</p>
              <p className={`text-2xl font-bold ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`}>
                {activeProjects.filter(p => p.status === 'In Progress').length}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 flex items-center justify-center">
              <span className="text-2xl">🚀</span>
            </div>
          </div>
        </div>

        <div className={`rounded-xl border p-4 ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white/30 border-black/10'}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>In Review</p>
              <p className={`text-2xl font-bold ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                {activeProjects.filter(p => p.status === 'In Review').length}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/20 flex items-center justify-center">
              <span className="text-2xl">👀</span>
            </div>
          </div>
        </div>
      </div>

      {/* Board View */}
      <BoardView projects={activeProjects} onEdit={handleEditProject} />

      {/* Project Modal */}
      {isProjectModalOpen && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setIsProjectModalOpen(false)}
          onSave={(data) => {
            console.log('Save project:', data);
            setIsProjectModalOpen(false);
          }}
        />
      )}
    </div>
  );
}
