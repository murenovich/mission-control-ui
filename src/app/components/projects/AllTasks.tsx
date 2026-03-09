import { Plus, Search, Filter, ListTodo, Calendar } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useState } from 'react';

// Mock tasks data
const mockTasks = [
  {
    id: '1',
    title: 'Design wireframes for new dashboard',
    projectId: '1',
    projectName: 'Dashboard Redesign',
    status: 'In Progress',
    priority: 'High',
    assignee: 'John Doe',
    dueDate: '2026-03-12',
    tags: ['Design'],
  },
  {
    id: '2',
    title: 'Review API documentation',
    projectId: '2',
    projectName: 'API Integration',
    status: 'To Do',
    priority: 'Medium',
    assignee: 'Jane Smith',
    dueDate: '2026-03-14',
    tags: ['Backend'],
  },
  {
    id: '3',
    title: 'Conduct user interviews',
    projectId: '3',
    projectName: 'User Testing',
    status: 'Done',
    priority: 'High',
    assignee: 'Mike Johnson',
    dueDate: '2026-03-08',
    tags: ['Research'],
  },
  {
    id: '4',
    title: 'Prepare app store screenshots',
    projectId: '4',
    projectName: 'Mobile App Launch',
    status: 'In Progress',
    priority: 'High',
    assignee: 'Sarah Wilson',
    dueDate: '2026-03-13',
    tags: ['Mobile', 'Design'],
  },
  {
    id: '5',
    title: 'Write blog post draft',
    projectId: '5',
    projectName: 'Marketing Campaign',
    status: 'To Do',
    priority: 'Medium',
    assignee: 'Tom Brown',
    dueDate: '2026-03-20',
    tags: ['Content'],
  },
  {
    id: '6',
    title: 'Update color scheme',
    projectId: '1',
    projectName: 'Dashboard Redesign',
    status: 'In Review',
    priority: 'Medium',
    assignee: 'John Doe',
    dueDate: '2026-03-11',
    tags: ['Design'],
  },
];

export function AllTasks() {
  const { isDarkMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredTasks = mockTasks.filter(task => {
    if (selectedStatus === 'all') return true;
    return task.status.toLowerCase().replace(' ', '-') === selectedStatus;
  });

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
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg`}>
            <ListTodo className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
              All Tasks
            </h1>
            <p className={`text-sm ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
              {mockTasks.length} total tasks across all projects
            </p>
          </div>
        </div>

        {/* New Task */}
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white smooth-transition hover:shadow-lg hover:scale-105">
          <Plus className="w-4 h-4" />
          <span className="text-sm font-medium">New Task</span>
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className={`rounded-xl border p-4 ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white/30 border-black/10'}`}>
          <p className={`text-xs mb-1 ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>To Do</p>
          <p className={`text-2xl font-bold ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`}>
            {mockTasks.filter(t => t.status === 'To Do').length}
          </p>
        </div>
        <div className={`rounded-xl border p-4 ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white/30 border-black/10'}`}>
          <p className={`text-xs mb-1 ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>In Progress</p>
          <p className={`text-2xl font-bold ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`}>
            {mockTasks.filter(t => t.status === 'In Progress').length}
          </p>
        </div>
        <div className={`rounded-xl border p-4 ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white/30 border-black/10'}`}>
          <p className={`text-xs mb-1 ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>In Review</p>
          <p className={`text-2xl font-bold ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>
            {mockTasks.filter(t => t.status === 'In Review').length}
          </p>
        </div>
        <div className={`rounded-xl border p-4 ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white/30 border-black/10'}`}>
          <p className={`text-xs mb-1 ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>Done</p>
          <p className={`text-2xl font-bold ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
            {mockTasks.filter(t => t.status === 'Done').length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 flex-wrap">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDarkMode ? 'text-white/40' : 'text-black/40'}`} />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 rounded-lg border smooth-transition text-sm ${
              isDarkMode
                ? 'bg-white/5 border-white/10 text-white/90 placeholder-white/40 focus:border-purple-400/50'
                : 'bg-white/30 border-black/10 text-black/90 placeholder-black/40 focus:border-purple-400/50'
            }`}
          />
        </div>

        {/* Status Filter */}
        <div className={`flex items-center gap-1 p-1 rounded-lg ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}>
          <button
            onClick={() => setSelectedStatus('all')}
            className={`px-3 py-1.5 rounded text-xs smooth-transition ${
              selectedStatus === 'all'
                ? isDarkMode ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-500/20 text-purple-600'
                : isDarkMode ? 'text-white/60 hover:text-white/90' : 'text-black/60 hover:text-black/90'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setSelectedStatus('to-do')}
            className={`px-3 py-1.5 rounded text-xs smooth-transition ${
              selectedStatus === 'to-do'
                ? isDarkMode ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-500/20 text-purple-600'
                : isDarkMode ? 'text-white/60 hover:text-white/90' : 'text-black/60 hover:text-black/90'
            }`}
          >
            To Do
          </button>
          <button
            onClick={() => setSelectedStatus('in-progress')}
            className={`px-3 py-1.5 rounded text-xs smooth-transition ${
              selectedStatus === 'in-progress'
                ? isDarkMode ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-500/20 text-purple-600'
                : isDarkMode ? 'text-white/60 hover:text-white/90' : 'text-black/60 hover:text-black/90'
            }`}
          >
            In Progress
          </button>
          <button
            onClick={() => setSelectedStatus('done')}
            className={`px-3 py-1.5 rounded text-xs smooth-transition ${
              selectedStatus === 'done'
                ? isDarkMode ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-500/20 text-purple-600'
                : isDarkMode ? 'text-white/60 hover:text-white/90' : 'text-black/60 hover:text-black/90'
            }`}
          >
            Done
          </button>
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-3">
        {filteredTasks.map((task) => (
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
                  <h3 className={`text-sm font-medium ${task.status === 'Done' ? 'line-through opacity-60' : ''} ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                    {task.title}
                  </h3>
                  <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getStatusColor(task.status)}`}>
                    {task.status}
                  </span>
                </div>

                <div className="flex items-center gap-4 flex-wrap">
                  {/* Project */}
                  <span className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
                    📁 {task.projectName}
                  </span>

                  {/* Assignee */}
                  <div className="flex items-center gap-2">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium ${isDarkMode ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-500/20 text-purple-600'}`}>
                      {task.assignee.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                      {task.assignee}
                    </span>
                  </div>

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
  );
}
