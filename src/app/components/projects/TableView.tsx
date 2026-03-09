import { Edit, Trash2, MoreHorizontal, ExternalLink } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import type { ProjectRecord } from '../../../lib/screens/projects/projectModels';

interface TableViewProps {
  projects: ProjectRecord[];
  onEdit: (project: ProjectRecord) => void;
}

export function TableView({ projects, onEdit }: TableViewProps) {
  const { isDarkMode } = useTheme();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'text-red-400 bg-red-500/20';
      case 'Medium':
        return 'text-orange-400 bg-orange-500/20';
      case 'Low':
        return 'text-green-400 bg-green-500/20';
      default:
        return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'text-green-400 bg-green-500/20';
      case 'In Progress':
        return 'text-cyan-400 bg-cyan-500/20';
      case 'In Review':
        return 'text-purple-400 bg-purple-500/20';
      case 'Planning':
        return 'text-orange-400 bg-orange-500/20';
      default:
        return 'text-gray-400 bg-gray-500/20';
    }
  };

  return (
    <div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white/30 border-black/10'}`}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className={`${isDarkMode ? 'bg-white/5 border-b border-white/10' : 'bg-black/5 border-b border-black/10'}`}>
            <tr>
              <th className={`px-6 py-4 text-left text-xs font-semibold ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                Project
              </th>
              <th className={`px-6 py-4 text-left text-xs font-semibold ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                Status
              </th>
              <th className={`px-6 py-4 text-left text-xs font-semibold ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                Priority
              </th>
              <th className={`px-6 py-4 text-left text-xs font-semibold ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                Assignee
              </th>
              <th className={`px-6 py-4 text-left text-xs font-semibold ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                Due Date
              </th>
              <th className={`px-6 py-4 text-left text-xs font-semibold ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                Progress
              </th>
              <th className={`px-6 py-4 text-left text-xs font-semibold ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                Tags
              </th>
              <th className={`px-6 py-4 text-right text-xs font-semibold ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr
                key={project.id}
                className={`border-b smooth-transition ${
                  isDarkMode
                    ? 'border-white/5 hover:bg-white/5'
                    : 'border-black/5 hover:bg-black/5'
                }`}
              >
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-1">
                    <span className={`text-sm font-medium ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                      {project.title}
                    </span>
                    <span className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
                      {project.description}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getPriorityColor(project.priority)}`}>
                    {project.priority}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${isDarkMode ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-500/20 text-purple-600'}`}>
                      {project.assignee.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className={`text-sm ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
                      {project.assignee}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-sm ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
                    {new Date(project.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className={`flex-1 h-2 rounded-full ${isDarkMode ? 'bg-white/10' : 'bg-black/10'}`}>
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-purple-500 to-purple-600"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                    <span className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                      {project.progress}%
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
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
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onEdit(project)}
                      className={`p-1.5 rounded smooth-transition ${
                        isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/10'
                      }`}
                    >
                      <Edit className={`w-4 h-4 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`} />
                    </button>
                    <button
                      className={`p-1.5 rounded smooth-transition ${
                        isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/10'
                      }`}
                    >
                      <ExternalLink className={`w-4 h-4 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`} />
                    </button>
                    <button
                      className={`p-1.5 rounded smooth-transition ${
                        isDarkMode ? 'hover:bg-red-500/10' : 'hover:bg-red-500/10'
                      }`}
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
