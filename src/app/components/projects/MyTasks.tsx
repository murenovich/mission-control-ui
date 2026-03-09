import { User, Calendar, ListChecks } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

// Mock tasks for current user
const myTasks = [
  {
    id: '1',
    title: 'Design wireframes for new dashboard',
    projectName: 'Dashboard Redesign',
    status: 'In Progress',
    priority: 'High',
    dueDate: '2026-03-12',
    tags: ['Design'],
  },
  {
    id: '6',
    title: 'Update color scheme',
    projectName: 'Dashboard Redesign',
    status: 'In Review',
    priority: 'Medium',
    dueDate: '2026-03-11',
    tags: ['Design'],
  },
];

export function MyTasks() {
  const { isDarkMode } = useTheme();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'text-red-400 bg-red-500/20 border-red-400/50';
      case 'Medium':
        return 'text-orange-400 bg-orange-500/20 border-orange-400/50';
      case 'Low':
        return 'text-green-400 bg-green-500/20 border-green-400/50';
      default:
        return 'text-gray-400 bg-gray-500/20 border-gray-400/50';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Done':
        return 'text-green-400 bg-green-500/20';
      case 'In Progress':
        return 'text-cyan-400 bg-cyan-500/20';
      case 'In Review':
        return 'text-purple-400 bg-purple-500/20';
      case 'To Do':
        return 'text-orange-400 bg-orange-500/20';
      default:
        return 'text-gray-400 bg-gray-500/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg`}>
          <User className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
            My Tasks
          </h1>
          <p className={`text-sm ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
            {myTasks.length} tasks assigned to you
          </p>
        </div>
      </div>

      {/* Today's Focus */}
      <div className={`rounded-xl border p-6 bg-gradient-to-br ${isDarkMode ? 'from-purple-500/10 to-cyan-500/10 border-purple-400/20' : 'from-purple-500/20 to-cyan-500/20 border-purple-400/30'}`}>
        <div className="flex items-center gap-3 mb-4">
          <ListChecks className={`w-5 h-5 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
          <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
            Today's Focus
          </h2>
        </div>
        <p className={`text-sm ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
          Complete the dashboard wireframes and submit for review
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className={`rounded-xl border p-4 ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white/30 border-black/10'}`}>
          <p className={`text-xs mb-1 ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>In Progress</p>
          <p className={`text-2xl font-bold ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`}>
            {myTasks.filter(t => t.status === 'In Progress').length}
          </p>
        </div>
        <div className={`rounded-xl border p-4 ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white/30 border-black/10'}`}>
          <p className={`text-xs mb-1 ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>In Review</p>
          <p className={`text-2xl font-bold ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>
            {myTasks.filter(t => t.status === 'In Review').length}
          </p>
        </div>
        <div className={`rounded-xl border p-4 ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white/30 border-black/10'}`}>
          <p className={`text-xs mb-1 ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>High Priority</p>
          <p className={`text-2xl font-bold ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>
            {myTasks.filter(t => t.priority === 'High').length}
          </p>
        </div>
      </div>

      {/* Tasks List */}
      <div>
        <h3 className={`text-sm font-semibold mb-3 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
          Active Tasks
        </h3>
        <div className="space-y-3">
          {myTasks.map((task) => (
            <div
              key={task.id}
              className={`p-4 rounded-xl border-l-2 ${getPriorityColor(task.priority)} cursor-pointer smooth-transition ${
                isDarkMode
                  ? 'bg-white/5 hover:bg-white/10 border-r border-t border-b border-white/10'
                  : 'bg-white/50 hover:bg-white/60 border-r border-t border-b border-black/10'
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Checkbox */}
                <div className="mt-1">
                  <input
                    type="checkbox"
                    checked={task.status === 'Done'}
                    className="w-5 h-5 rounded cursor-pointer"
                    onChange={() => {}}
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className={`text-sm font-medium ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                      {task.title}
                    </h3>
                    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${getStatusColor(task.status)}`}>
                      {task.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 flex-wrap">
                    {/* Project */}
                    <span className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
                      📁 {task.projectName}
                    </span>

                    {/* Due Date */}
                    <div className="flex items-center gap-1">
                      <Calendar className={`w-3 h-3 ${isDarkMode ? 'text-white/40' : 'text-black/40'}`} />
                      <span className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                        {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>

                    {/* Tags */}
                    {task.tags.map((tag, i) => (
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
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
