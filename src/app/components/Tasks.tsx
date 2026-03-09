import { CheckSquare, Plus, Trash2, Edit, Filter, Search, Calendar, Flag, Circle, CheckCircle2, Clock, X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useState } from 'react';

interface Task {
  id: number;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'todo' | 'in-progress' | 'completed';
  category: 'work' | 'personal' | 'health' | 'finance';
  dueDate: string;
  tags: string[];
}

const priorityColors = {
  low: { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30' },
  medium: { bg: 'bg-cyan-500/20', text: 'text-cyan-400', border: 'border-cyan-500/30' },
  high: { bg: 'bg-orange-500/20', text: 'text-orange-400', border: 'border-orange-500/30' },
  urgent: { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30' },
};

const categoryColors = {
  work: { bg: 'bg-purple-500/20', text: 'text-purple-400' },
  personal: { bg: 'bg-cyan-500/20', text: 'text-cyan-400' },
  health: { bg: 'bg-green-500/20', text: 'text-green-400' },
  finance: { bg: 'bg-orange-500/20', text: 'text-orange-400' },
};

export function Tasks() {
  const { isDarkMode } = useTheme();
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: 'Complete Q1 Report',
      description: 'Finalize and submit quarterly performance report',
      priority: 'high',
      status: 'in-progress',
      category: 'work',
      dueDate: '2026-03-15',
      tags: ['reports', 'quarterly'],
    },
    {
      id: 2,
      title: 'Morning Workout',
      description: 'Cardio and strength training session',
      priority: 'medium',
      status: 'todo',
      category: 'health',
      dueDate: '2026-03-09',
      tags: ['exercise', 'routine'],
    },
    {
      id: 3,
      title: 'Review Budget',
      description: 'Review monthly expenses and update budget',
      priority: 'medium',
      status: 'todo',
      category: 'finance',
      dueDate: '2026-03-10',
      tags: ['budget', 'finance'],
    },
    {
      id: 4,
      title: 'Plan Weekend Trip',
      description: 'Research and book accommodations',
      priority: 'low',
      status: 'todo',
      category: 'personal',
      dueDate: '2026-03-12',
      tags: ['travel', 'vacation'],
    },
    {
      id: 5,
      title: 'Fix Critical Bug',
      description: 'Resolve production issue affecting users',
      priority: 'urgent',
      status: 'in-progress',
      category: 'work',
      dueDate: '2026-03-08',
      tags: ['bug', 'urgent'],
    },
    {
      id: 6,
      title: 'Team Meeting Prep',
      description: 'Prepare slides for weekly team sync',
      priority: 'high',
      status: 'completed',
      category: 'work',
      dueDate: '2026-03-08',
      tags: ['meeting', 'presentation'],
    },
  ]);

  const [filterStatus, setFilterStatus] = useState<'all' | 'todo' | 'in-progress' | 'completed'>('all');
  const [filterPriority, setFilterPriority] = useState<'all' | 'low' | 'medium' | 'high' | 'urgent'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium' as 'low' | 'medium' | 'high' | 'urgent',
    status: 'todo' as 'todo' | 'in-progress' | 'completed',
    category: 'work' as 'work' | 'personal' | 'health' | 'finance',
    dueDate: '',
    tags: [] as string[],
  });
  
  const [tagInput, setTagInput] = useState('');

  const toggleTaskStatus = (id: number) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        let newStatus: 'todo' | 'in-progress' | 'completed';
        if (task.status === 'todo') newStatus = 'in-progress';
        else if (task.status === 'in-progress') newStatus = 'completed';
        else newStatus = 'todo';
        return { ...task, status: newStatus };
      }
      return task;
    }));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const handleCreateTask = () => {
    if (!newTask.title || !newTask.dueDate) {
      return;
    }

    const taskToAdd: Task = {
      id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
      ...newTask,
    };

    setTasks([...tasks, taskToAdd]);
    setShowAddModal(false);
    setNewTask({
      title: '',
      description: '',
      priority: 'medium',
      status: 'todo',
      category: 'work',
      dueDate: '',
      tags: [],
    });
    setTagInput('');
  };

  const addTag = () => {
    if (tagInput.trim() && !newTask.tags.includes(tagInput.trim())) {
      setNewTask({ ...newTask, tags: [...newTask.tags, tagInput.trim()] });
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setNewTask({ ...newTask, tags: newTask.tags.filter(tag => tag !== tagToRemove) });
  };

  const handleTagInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesPriority && matchesSearch;
  });

  const todoTasks = filteredTasks.filter(t => t.status === 'todo');
  const inProgressTasks = filteredTasks.filter(t => t.status === 'in-progress');
  const completedTasks = filteredTasks.filter(t => t.status === 'completed');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle2;
      case 'in-progress': return Clock;
      default: return Circle;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400';
      case 'in-progress': return 'text-orange-400';
      default: return 'text-cyan-400';
    }
  };

  const TaskCard = ({ task }: { task: Task }) => {
    const priorityStyle = priorityColors[task.priority];
    const categoryStyle = categoryColors[task.category];
    const StatusIcon = getStatusIcon(task.status);
    const statusColor = getStatusColor(task.status);
    const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'completed';

    return (
      <div
        className={`glass-card p-4 smooth-transition border ${
          isDarkMode ? 'border-white/10 hover:border-white/20' : 'border-black/10 hover:border-black/20'
        } ${task.status === 'completed' ? 'opacity-60' : ''}`}
      >
        <div className="flex items-start gap-3">
          {/* Checkbox */}
          <button
            onClick={() => toggleTaskStatus(task.id)}
            className={`flex-shrink-0 w-5 h-5 rounded border-2 smooth-transition flex items-center justify-center mt-0.5 ${
              task.status === 'completed'
                ? 'bg-green-500/20 border-green-400'
                : task.status === 'in-progress'
                ? 'bg-orange-500/20 border-orange-400'
                : isDarkMode
                ? 'border-white/30 hover:border-cyan-400'
                : 'border-black/30 hover:border-cyan-400'
            }`}
          >
            <StatusIcon className={`w-3 h-3 ${statusColor}`} />
          </button>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className={`text-sm font-semibold m-0 ${
                task.status === 'completed'
                  ? isDarkMode ? 'text-white/50 line-through' : 'text-black/50 line-through'
                  : isDarkMode ? 'text-white/90' : 'text-black/90'
              }`}>
                {task.title}
              </h3>
              <div className="flex items-center gap-1">
                <button
                  className={`p-1 rounded smooth-transition ${
                    isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/10'
                  }`}
                >
                  <Edit className={`w-3 h-3 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`} />
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className={`p-1 rounded smooth-transition ${
                    isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/10'
                  }`}
                >
                  <Trash2 className="w-3 h-3 text-red-400" />
                </button>
              </div>
            </div>

            <p className={`text-xs mb-3 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
              {task.description}
            </p>

            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Priority */}
              <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded ${priorityStyle.bg} ${priorityStyle.text} capitalize`}>
                <Flag className="w-3 h-3" />
                {task.priority}
              </span>

              {/* Category */}
              <span className={`text-xs px-2 py-0.5 rounded ${categoryStyle.bg} ${categoryStyle.text} capitalize`}>
                {task.category}
              </span>

              {/* Due date */}
              <span className={`inline-flex items-center gap-1 text-xs ${
                isOverdue ? 'text-red-400' : isDarkMode ? 'text-white/60' : 'text-black/60'
              }`}>
                <Calendar className="w-3 h-3" />
                {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                {isOverdue && ' (overdue)'}
              </span>
            </div>

            {/* Tags */}
            {task.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {task.tags.map(tag => (
                  <span
                    key={tag}
                    className={`text-xs px-2 py-0.5 rounded ${
                      isDarkMode ? 'bg-white/5 text-white/50' : 'bg-black/5 text-black/50'
                    }`}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className={`text-2xl md:text-3xl font-bold m-0 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
            Tasks
          </h1>
          <p className={`text-sm mt-1 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
            Organize and track your tasks
          </p>
        </div>
        <button
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg smooth-transition ${
            isDarkMode
              ? 'bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 border border-cyan-500/30'
              : 'bg-cyan-500/20 text-cyan-600 hover:bg-cyan-500/30 border border-cyan-500/30'
          }`}
          onClick={() => setShowAddModal(true)}
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm font-medium">New Task</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-4">
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>Total Tasks</span>
            <CheckSquare className="w-4 h-4 text-cyan-400" />
          </div>
          <div className={`text-2xl font-bold metric-value ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
            {tasks.length}
          </div>
        </div>

        <div className="glass-card p-4">
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>To Do</span>
            <Circle className="w-4 h-4 text-cyan-400" />
          </div>
          <div className={`text-2xl font-bold metric-value ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
            {todoTasks.length}
          </div>
        </div>

        <div className="glass-card p-4">
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>In Progress</span>
            <Clock className="w-4 h-4 text-orange-400" />
          </div>
          <div className={`text-2xl font-bold metric-value ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
            {inProgressTasks.length}
          </div>
        </div>

        <div className="glass-card p-4">
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>Completed</span>
            <CheckCircle2 className="w-4 h-4 text-green-400" />
          </div>
          <div className={`text-2xl font-bold metric-value ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
            {completedTasks.length}
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="glass-card p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDarkMode ? 'text-white/40' : 'text-black/40'}`} />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-lg border smooth-transition text-sm ${
                  isDarkMode
                    ? 'bg-white/5 border-white/10 text-white/90 placeholder-white/40 focus:border-cyan-400/50'
                    : 'bg-white/30 border-black/10 text-black/90 placeholder-black/40 focus:border-cyan-400/50'
                }`}
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter className={`w-4 h-4 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`} />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className={`px-3 py-2 rounded-lg border smooth-transition text-sm ${
                isDarkMode
                  ? 'bg-white/5 border-white/10 text-white/90'
                  : 'bg-white/30 border-black/10 text-black/90'
              }`}
            >
              <option value="all">All Status</option>
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* Priority Filter */}
          <div>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value as any)}
              className={`px-3 py-2 rounded-lg border smooth-transition text-sm ${
                isDarkMode
                  ? 'bg-white/5 border-white/10 text-white/90'
                  : 'bg-white/30 border-black/10 text-black/90'
              }`}
            >
              <option value="all">All Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* To Do Column */}
        <div>
          <div className={`flex items-center justify-between mb-4 p-3 glass-card`}>
            <div className="flex items-center gap-2">
              <Circle className="w-4 h-4 text-cyan-400" />
              <h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                To Do
              </h3>
            </div>
            <span className={`text-xs px-2 py-0.5 rounded ${isDarkMode ? 'bg-white/10 text-white/70' : 'bg-black/10 text-black/70'}`}>
              {todoTasks.length}
            </span>
          </div>
          <div className="space-y-3">
            {todoTasks.map(task => <TaskCard key={task.id} task={task} />)}
          </div>
        </div>

        {/* In Progress Column */}
        <div>
          <div className={`flex items-center justify-between mb-4 p-3 glass-card`}>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-orange-400" />
              <h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                In Progress
              </h3>
            </div>
            <span className={`text-xs px-2 py-0.5 rounded ${isDarkMode ? 'bg-white/10 text-white/70' : 'bg-black/10 text-black/70'}`}>
              {inProgressTasks.length}
            </span>
          </div>
          <div className="space-y-3">
            {inProgressTasks.map(task => <TaskCard key={task.id} task={task} />)}
          </div>
        </div>

        {/* Completed Column */}
        <div>
          <div className={`flex items-center justify-between mb-4 p-3 glass-card`}>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-400" />
              <h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                Completed
              </h3>
            </div>
            <span className={`text-xs px-2 py-0.5 rounded ${isDarkMode ? 'bg-white/10 text-white/70' : 'bg-black/10 text-black/70'}`}>
              {completedTasks.length}
            </span>
          </div>
          <div className="space-y-3">
            {completedTasks.map(task => <TaskCard key={task.id} task={task} />)}
          </div>
        </div>
      </div>

      {/* Add Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div
            className={`glass-card p-6 w-full max-w-2xl rounded-lg ${
              isDarkMode ? 'border-white/10' : 'border-black/10'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                Add New Task
              </h2>
              <button
                className={`p-1 rounded smooth-transition ${
                  isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/10'
                }`}
                onClick={() => setShowAddModal(false)}
              >
                <X className="w-4 h-4 text-red-400" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label
                  className={`block text-sm font-medium ${
                    isDarkMode ? 'text-white/70' : 'text-black/70'
                  }`}
                >
                  Title
                </label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className={`w-full pl-4 pr-4 py-2 rounded-lg border smooth-transition text-sm ${
                    isDarkMode
                      ? 'bg-white/5 border-white/10 text-white/90 placeholder-white/40 focus:border-cyan-400/50'
                      : 'bg-white/30 border-black/10 text-black/90 placeholder-black/40 focus:border-cyan-400/50'
                  }`}
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium ${
                    isDarkMode ? 'text-white/70' : 'text-black/70'
                  }`}
                >
                  Description
                </label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  className={`w-full pl-4 pr-4 py-2 rounded-lg border smooth-transition text-sm ${
                    isDarkMode
                      ? 'bg-white/5 border-white/10 text-white/90 placeholder-white/40 focus:border-cyan-400/50'
                      : 'bg-white/30 border-black/10 text-black/90 placeholder-black/40 focus:border-cyan-400/50'
                  }`}
                />
              </div>

              <div className="flex items-center gap-4">
                <div>
                  <label
                    className={`block text-sm font-medium ${
                      isDarkMode ? 'text-white/70' : 'text-black/70'
                    }`}
                  >
                    Priority
                  </label>
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as any })}
                    className={`px-3 py-2 rounded-lg border smooth-transition text-sm ${
                      isDarkMode
                        ? 'bg-white/5 border-white/10 text-white/90'
                        : 'bg-white/30 border-black/10 text-black/90'
                    }`}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium ${
                      isDarkMode ? 'text-white/70' : 'text-black/70'
                    }`}
                  >
                    Category
                  </label>
                  <select
                    value={newTask.category}
                    onChange={(e) => setNewTask({ ...newTask, category: e.target.value as any })}
                    className={`px-3 py-2 rounded-lg border smooth-transition text-sm ${
                      isDarkMode
                        ? 'bg-white/5 border-white/10 text-white/90'
                        : 'bg-white/30 border-black/10 text-black/90'
                    }`}
                  >
                    <option value="work">Work</option>
                    <option value="personal">Personal</option>
                    <option value="health">Health</option>
                    <option value="finance">Finance</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  className={`block text-sm font-medium ${
                    isDarkMode ? 'text-white/70' : 'text-black/70'
                  }`}
                >
                  Due Date
                </label>
                <input
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  className={`w-full pl-4 pr-4 py-2 rounded-lg border smooth-transition text-sm ${
                    isDarkMode
                      ? 'bg-white/5 border-white/10 text-white/90 placeholder-white/40 focus:border-cyan-400/50'
                      : 'bg-white/30 border-black/10 text-black/90 placeholder-black/40 focus:border-cyan-400/50'
                  }`}
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium ${
                    isDarkMode ? 'text-white/70' : 'text-black/70'
                  }`}
                >
                  Tags
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={handleTagInputKeyPress}
                    className={`w-full pl-4 pr-4 py-2 rounded-lg border smooth-transition text-sm ${
                      isDarkMode
                        ? 'bg-white/5 border-white/10 text-white/90 placeholder-white/40 focus:border-cyan-400/50'
                        : 'bg-white/30 border-black/10 text-black/90 placeholder-black/40 focus:border-cyan-400/50'
                    }`}
                    placeholder="Add a tag"
                  />
                  <button
                    className={`px-3 py-2 rounded-lg border smooth-transition text-sm ${
                      isDarkMode
                        ? 'bg-white/5 border-white/10 text-white/90 hover:bg-cyan-500/20'
                        : 'bg-white/30 border-black/10 text-black/90 hover:bg-cyan-500/20'
                    }`}
                    onClick={addTag}
                  >
                    Add
                  </button>
                </div>
                {newTask.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {newTask.tags.map(tag => (
                      <span
                        key={tag}
                        className={`text-xs px-2 py-0.5 rounded ${
                          isDarkMode ? 'bg-white/5 text-white/50' : 'bg-black/5 text-black/50'
                        }`}
                      >
                        #{tag}
                        <button
                          className={`ml-1 p-0.5 rounded smooth-transition ${
                            isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/10'
                          }`}
                          onClick={() => removeTag(tag)}
                        >
                          <X className="w-3 h-3 text-red-400" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <button
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg smooth-transition ${
                  isDarkMode
                    ? 'bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 border border-cyan-500/30'
                    : 'bg-cyan-500/20 text-cyan-600 hover:bg-cyan-500/30 border border-cyan-500/30'
                }`}
                onClick={handleCreateTask}
              >
                <Plus className="w-4 h-4" />
                <span className="text-sm font-medium">Create Task</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}