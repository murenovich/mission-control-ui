import { Archive, Search, Calendar } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { TableView } from './TableView';
import { useState } from 'react';
import { ProjectModal } from './ProjectModal';
import {
  DEMO_PROJECTS,
  type ProjectRecord,
} from '../../../lib/screens/projects/projectModels';

export function ArchivedProjects() {
  const { isDarkMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<ProjectRecord | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  // Filter for completed projects
  const completedProjects = DEMO_PROJECTS.filter(p => p.status === 'Completed');

  const handleEditProject = (project: ProjectRecord) => {
    setSelectedProject(project);
    setIsProjectModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-green-500 to-green-600 shadow-lg`}>
            <Archive className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
              Archived Projects
            </h1>
            <p className={`text-sm ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
              {completedProjects.length} completed projects
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDarkMode ? 'text-white/40' : 'text-black/40'}`} />
          <input
            type="text"
            placeholder="Search archived projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`pl-10 pr-4 py-2 rounded-lg border smooth-transition text-sm w-64 ${
              isDarkMode
                ? 'bg-white/5 border-white/10 text-white/90 placeholder-white/40 focus:border-purple-400/50'
                : 'bg-white/30 border-black/10 text-black/90 placeholder-black/40 focus:border-purple-400/50'
            }`}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className={`rounded-xl border p-4 ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white/30 border-black/10'}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>Total Completed</p>
              <p className={`text-2xl font-bold ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                {completedProjects.length}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-green-600/20 flex items-center justify-center">
              <span className="text-2xl">✅</span>
            </div>
          </div>
        </div>

        <div className={`rounded-xl border p-4 ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white/30 border-black/10'}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>This Month</p>
              <p className={`text-2xl font-bold ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`}>
                {completedProjects.filter(p => {
                  const dueDate = new Date(p.dueDate);
                  const now = new Date();
                  return dueDate.getMonth() === now.getMonth() && dueDate.getFullYear() === now.getFullYear();
                }).length}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 flex items-center justify-center">
              <Calendar className={`w-6 h-6 ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`} />
            </div>
          </div>
        </div>
      </div>

      {/* Message if empty */}
      {completedProjects.length === 0 ? (
        <div className={`rounded-xl border p-12 text-center ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white/30 border-black/10'}`}>
          <Archive className={`w-16 h-16 mx-auto mb-4 ${isDarkMode ? 'text-white/20' : 'text-black/20'}`} />
          <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
            No Archived Projects
          </h3>
          <p className={`text-sm ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
            Completed projects will appear here
          </p>
        </div>
      ) : (
        <TableView projects={completedProjects} onEdit={handleEditProject} />
      )}

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
