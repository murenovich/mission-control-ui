import { Edit, Plus, MoreVertical } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import type { ProjectRecord } from '../../../lib/screens/projects/projectModels';

interface BoardViewProps {
  projects: ProjectRecord[];
  onEdit: (project: ProjectRecord) => void;
}

const columns = [
  { id: 'Planning', title: 'Planning', color: 'from-orange-500 to-orange-600' },
  { id: 'In Progress', title: 'In Progress', color: 'from-cyan-500 to-cyan-600' },
  { id: 'In Review', title: 'In Review', color: 'from-purple-500 to-purple-600' },
  { id: 'Completed', title: 'Completed', color: 'from-green-500 to-green-600' },
];

export function BoardView({ projects, onEdit }: BoardViewProps) {
  const { isDarkMode } = useTheme();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'border-red-400/50';
      case 'Medium':
        return 'border-orange-400/50';
      case 'Low':
        return 'border-green-400/50';
      default:
        return 'border-gray-400/50';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {columns.map((column) => {
        const columnProjects = projects.filter((p) => p.status === column.id);

        return (
          <div
            key={column.id}
            className={`rounded-xl border p-4 ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white/30 border-black/10'}`}
          >
            {/* Column Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${column.color}`} />
                <h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                  {column.title}
                </h3>
                <span className={`text-xs px-2 py-0.5 rounded-full ${isDarkMode ? 'bg-white/10 text-white/60' : 'bg-black/10 text-black/60'}`}>
                  {columnProjects.length}
                </span>
              </div>
              <button className={`p-1 rounded smooth-transition ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/10'}`}>
                <Plus className={`w-4 h-4 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`} />
              </button>
            </div>

            {/* Cards */}
            <div className="space-y-3">
              {columnProjects.map((project) => (
                <div
                  key={project.id}
                  className={`p-4 rounded-lg border-l-2 ${getPriorityColor(project.priority)} cursor-pointer smooth-transition ${
                    isDarkMode
                      ? 'bg-white/5 hover:bg-white/10 border-r border-t border-b border-white/10'
                      : 'bg-white/50 hover:bg-white/60 border-r border-t border-b border-black/10'
                  }`}
                  onClick={() => onEdit(project)}
                >
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <h4 className={`text-sm font-medium ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                      {project.title}
                    </h4>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      className={`p-1 rounded smooth-transition ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/10'}`}
                    >
                      <MoreVertical className={`w-3 h-3 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`} />
                    </button>
                  </div>

                  {/* Description */}
                  <p className={`text-xs mb-3 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs ${
                          isDarkMode ? 'bg-white/10 text-white/70' : 'bg-black/10 text-black/70'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                        Progress
                      </span>
                      <span className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                        {project.progress}%
                      </span>
                    </div>
                    <div className={`h-1.5 rounded-full ${isDarkMode ? 'bg-white/10' : 'bg-black/10'}`}>
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-purple-500 to-purple-600"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${isDarkMode ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-500/20 text-purple-600'}`}>
                        {project.assignee.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                        {project.assignee.split(' ')[0]}
                      </span>
                    </div>
                    <span className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
                      {new Date(project.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                </div>
              ))}

              {/* Empty State */}
              {columnProjects.length === 0 && (
                <div className={`p-8 rounded-lg border-2 border-dashed text-center ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
                  <p className={`text-xs ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}>
                    No projects
                  </p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
