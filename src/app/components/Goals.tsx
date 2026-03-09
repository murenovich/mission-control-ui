import { Target, Plus, Trash2, Edit, TrendingUp, Calendar, CheckCircle, Circle, X, Filter } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useState } from 'react';

interface Goal {
  id: number;
  title: string;
  description: string;
  category: 'health' | 'career' | 'finance' | 'personal';
  progress: number;
  target: number;
  unit: string;
  deadline: string;
  status: 'active' | 'completed' | 'paused';
}

type GoalCategory = Goal['category'];

const categoryColors = {
  health: { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30' },
  career: { bg: 'bg-purple-500/20', text: 'text-purple-400', border: 'border-purple-500/30' },
  finance: { bg: 'bg-orange-500/20', text: 'text-orange-400', border: 'border-orange-500/30' },
  personal: { bg: 'bg-cyan-500/20', text: 'text-cyan-400', border: 'border-cyan-500/30' },
};

export function Goals() {
  const { isDarkMode } = useTheme();
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: 1,
      title: 'Complete Marathon Training',
      description: 'Train for and complete a full marathon',
      category: 'health',
      progress: 32,
      target: 50,
      unit: 'runs',
      deadline: '2026-06-15',
      status: 'active',
    },
    {
      id: 2,
      title: 'Save for Emergency Fund',
      description: 'Build 6-month emergency savings',
      category: 'finance',
      progress: 8500,
      target: 15000,
      unit: 'USD',
      deadline: '2026-12-31',
      status: 'active',
    },
    {
      id: 3,
      title: 'Learn React Advanced Patterns',
      description: 'Master advanced React concepts and patterns',
      category: 'career',
      progress: 12,
      target: 20,
      unit: 'modules',
      deadline: '2026-05-01',
      status: 'active',
    },
    {
      id: 4,
      title: 'Read 24 Books',
      description: 'Read 2 books per month this year',
      category: 'personal',
      progress: 7,
      target: 24,
      unit: 'books',
      deadline: '2026-12-31',
      status: 'active',
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [filterCategory, setFilterCategory] = useState<'all' | 'health' | 'career' | 'finance' | 'personal'>('all');
  
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    category: 'personal' as 'health' | 'career' | 'finance' | 'personal',
    progress: 0,
    target: 100,
    unit: '',
    deadline: '',
    status: 'active' as 'active' | 'completed' | 'paused',
  });

  const deleteGoal = (id: number) => {
    setGoals(goals.filter(g => g.id !== id));
  };

  const toggleGoalStatus = (id: number) => {
    setGoals(goals.map(g => {
      if (g.id === id) {
        const newStatus = g.status === 'active' ? 'paused' : 'active';
        return { ...g, status: newStatus };
      }
      return g;
    }));
  };

  const handleCreateGoal = () => {
    if (!newGoal.title || !newGoal.deadline || !newGoal.unit) {
      return;
    }

    const goalToAdd: Goal = {
      id: goals.length > 0 ? Math.max(...goals.map(g => g.id)) + 1 : 1,
      ...newGoal,
    };

    setGoals([...goals, goalToAdd]);
    setShowAddModal(false);
    setNewGoal({
      title: '',
      description: '',
      category: 'personal',
      progress: 0,
      target: 100,
      unit: '',
      deadline: '',
      status: 'active',
    });
  };

  const calculatePercentage = (progress: number, target: number) => {
    return Math.min(Math.round((progress / target) * 100), 100);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400';
      case 'paused': return 'text-orange-400';
      default: return 'text-cyan-400';
    }
  };

  const filteredGoals = filterCategory === 'all' 
    ? goals 
    : goals.filter(g => g.category === filterCategory);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className={`text-2xl md:text-3xl font-bold m-0 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
            Goals
          </h1>
          <p className={`text-sm mt-1 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
            Track your progress and achieve your objectives
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg smooth-transition ${
            isDarkMode
              ? 'bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 border border-cyan-500/30'
              : 'bg-cyan-500/20 text-cyan-600 hover:bg-cyan-500/30 border border-cyan-500/30'
          }`}
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm font-medium">New Goal</span>
        </button>
      </div>

      {/* Category Filter */}
      <div className="glass-card p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className={`w-4 h-4 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`} />
            <span className={`text-sm font-medium ${isDarkMode ? 'text-white/80' : 'text-black/80'}`}>
              Filter by Category:
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilterCategory('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg smooth-transition ${
                filterCategory === 'all'
                  ? isDarkMode
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                    : 'bg-cyan-500/20 text-cyan-600 border border-cyan-500/30'
                  : isDarkMode
                  ? 'bg-white/5 text-white/60 hover:bg-white/10'
                  : 'bg-black/5 text-black/60 hover:bg-black/10'
              }`}
            >
              All ({goals.length})
            </button>
            <button
              onClick={() => setFilterCategory('health')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg smooth-transition ${
                filterCategory === 'health'
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : isDarkMode
                  ? 'bg-white/5 text-white/60 hover:bg-white/10'
                  : 'bg-black/5 text-black/60 hover:bg-black/10'
              }`}
            >
              Health ({goals.filter(g => g.category === 'health').length})
            </button>
            <button
              onClick={() => setFilterCategory('career')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg smooth-transition ${
                filterCategory === 'career'
                  ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                  : isDarkMode
                  ? 'bg-white/5 text-white/60 hover:bg-white/10'
                  : 'bg-black/5 text-black/60 hover:bg-black/10'
              }`}
            >
              Career ({goals.filter(g => g.category === 'career').length})
            </button>
            <button
              onClick={() => setFilterCategory('finance')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg smooth-transition ${
                filterCategory === 'finance'
                  ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                  : isDarkMode
                  ? 'bg-white/5 text-white/60 hover:bg-white/10'
                  : 'bg-black/5 text-black/60 hover:bg-black/10'
              }`}
            >
              Finance ({goals.filter(g => g.category === 'finance').length})
            </button>
            <button
              onClick={() => setFilterCategory('personal')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg smooth-transition ${
                filterCategory === 'personal'
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                  : isDarkMode
                  ? 'bg-white/5 text-white/60 hover:bg-white/10'
                  : 'bg-black/5 text-black/60 hover:bg-black/10'
              }`}
            >
              Personal ({goals.filter(g => g.category === 'personal').length})
            </button>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-4">
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>Total Goals</span>
            <Target className="w-4 h-4 text-cyan-400" />
          </div>
          <div className={`text-2xl font-bold metric-value ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
            {goals.length}
          </div>
        </div>

        <div className="glass-card p-4">
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>Active</span>
            <Circle className="w-4 h-4 text-green-400" />
          </div>
          <div className={`text-2xl font-bold metric-value ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
            {goals.filter(g => g.status === 'active').length}
          </div>
        </div>

        <div className="glass-card p-4">
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>Completed</span>
            <CheckCircle className="w-4 h-4 text-purple-400" />
          </div>
          <div className={`text-2xl font-bold metric-value ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
            {goals.filter(g => g.status === 'completed').length}
          </div>
        </div>

        <div className="glass-card p-4">
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>Avg Progress</span>
            <TrendingUp className="w-4 h-4 text-orange-400" />
          </div>
          <div className={`text-2xl font-bold metric-value ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
            {goals.length > 0 ? Math.round(goals.reduce((acc, g) => acc + calculatePercentage(g.progress, g.target), 0) / goals.length) : 0}%
          </div>
        </div>
      </div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredGoals.map(goal => {
          const percentage = calculatePercentage(goal.progress, goal.target);
          const categoryStyle = categoryColors[goal.category];
          const daysUntilDeadline = Math.ceil((new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

          return (
            <div
              key={goal.id}
              className={`glass-card p-5 smooth-transition border ${
                isDarkMode ? 'border-white/10 hover:border-white/20' : 'border-black/10 hover:border-black/20'
              }`}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg ${categoryStyle.bg} border ${categoryStyle.border} flex items-center justify-center`}>
                    <Target className={`w-5 h-5 ${categoryStyle.text}`} />
                  </div>
                  <div>
                    <h3 className={`text-base font-semibold m-0 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                      {goal.title}
                    </h3>
                    <span className={`text-xs px-2 py-0.5 rounded ${categoryStyle.bg} ${categoryStyle.text} capitalize`}>
                      {goal.category}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setEditingGoal(goal)}
                    className={`p-1.5 rounded smooth-transition ${
                      isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/10'
                    }`}
                  >
                    <Edit className={`w-4 h-4 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`} />
                  </button>
                  <button
                    onClick={() => deleteGoal(goal.id)}
                    className={`p-1.5 rounded smooth-transition ${
                      isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/10'
                    }`}
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              </div>

              {/* Description */}
              <p className={`text-sm mb-4 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                {goal.description}
              </p>

              {/* Progress */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className={isDarkMode ? 'text-white/70' : 'text-black/70'}>
                    Progress: {goal.progress} / {goal.target} {goal.unit}
                  </span>
                  <span className={`font-semibold ${categoryStyle.text}`}>
                    {percentage}%
                  </span>
                </div>
                <div className={`h-2 rounded-full ${isDarkMode ? 'bg-white/10' : 'bg-black/10'} overflow-hidden`}>
                  <div
                    className={`h-full ${categoryStyle.bg} ${categoryStyle.border} border-r-2 rounded-full smooth-transition`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <Calendar className={`w-4 h-4 ${isDarkMode ? 'text-white/40' : 'text-black/40'}`} />
                  <span className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                    {daysUntilDeadline > 0 ? `${daysUntilDeadline} days left` : 'Deadline passed'}
                  </span>
                </div>
                <button
                  onClick={() => toggleGoalStatus(goal.id)}
                  className={`text-xs px-3 py-1 rounded-full smooth-transition ${
                    goal.status === 'active'
                      ? isDarkMode
                        ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                        : 'bg-green-500/20 text-green-600 hover:bg-green-500/30'
                      : isDarkMode
                      ? 'bg-orange-500/20 text-orange-400 hover:bg-orange-500/30'
                      : 'bg-orange-500/20 text-orange-600 hover:bg-orange-500/30'
                  }`}
                >
                  {goal.status === 'active' ? 'Active' : 'Paused'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredGoals.length === 0 && (
        <div className="glass-card p-12 text-center">
          <Target className={`w-16 h-16 mx-auto mb-4 ${isDarkMode ? 'text-white/20' : 'text-black/20'}`} />
          <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
            {filterCategory === 'all' ? 'No goals yet' : `No ${filterCategory} goals`}
          </h3>
          <p className={`text-sm mb-4 ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
            {filterCategory === 'all' 
              ? 'Create your first goal to start tracking your progress'
              : `Create a ${filterCategory} goal or view all goals`
            }
          </p>
          <button
            onClick={() => setShowAddModal(true)}
            className={`px-4 py-2 rounded-lg smooth-transition ${
              isDarkMode
                ? 'bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30'
                : 'bg-cyan-500/20 text-cyan-600 hover:bg-cyan-500/30'
            }`}
          >
            Create Goal
          </button>
        </div>
      )}

      {/* New Goal Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div
            className="glass-card rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            style={{ background: isDarkMode ? 'rgba(15, 15, 25, 0.95)' : 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(40px)' }}
          >
            <div className={`flex items-center justify-between p-6 border-b ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
              <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>Create New Goal</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className={`p-2 rounded-lg smooth-transition ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/10'}`}
              >
                <X className={`w-5 h-5 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/80' : 'text-black/80'}`}>
                  Goal Title *
                </label>
                <input
                  type="text"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                  placeholder="e.g., Run a Marathon, Learn Python"
                  className={`w-full px-4 py-2.5 rounded-lg border smooth-transition text-sm ${
                    isDarkMode
                      ? 'bg-white/5 border-white/10 text-white/90 placeholder-white/40 focus:border-cyan-400/50'
                      : 'bg-white/30 border-black/10 text-black/90 placeholder-black/40 focus:border-cyan-400/50'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/80' : 'text-black/80'}`}>
                  Description
                </label>
                <textarea
                  value={newGoal.description}
                  onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                  placeholder="Describe your goal and what you want to achieve"
                  rows={3}
                  className={`w-full px-4 py-2.5 rounded-lg border smooth-transition text-sm ${
                    isDarkMode
                      ? 'bg-white/5 border-white/10 text-white/90 placeholder-white/40 focus:border-cyan-400/50'
                      : 'bg-white/30 border-black/10 text-black/90 placeholder-black/40 focus:border-cyan-400/50'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/80' : 'text-black/80'}`}>
                  Category *
                </label>
                <select
                  value={newGoal.category}
                  onChange={(e) =>
                    setNewGoal({ ...newGoal, category: e.target.value as GoalCategory })
                  }
                  className={`w-full px-4 py-2.5 rounded-lg border smooth-transition text-sm ${
                    isDarkMode
                      ? 'bg-white/5 border-white/10 text-white/90 focus:border-cyan-400/50'
                      : 'bg-white/30 border-black/10 text-black/90 focus:border-cyan-400/50'
                  }`}
                >
                  <option value="personal">Personal</option>
                  <option value="health">Health</option>
                  <option value="career">Career</option>
                  <option value="finance">Finance</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/80' : 'text-black/80'}`}>
                    Current Progress
                  </label>
                  <input
                    type="number"
                    value={newGoal.progress}
                    onChange={(e) => setNewGoal({ ...newGoal, progress: parseFloat(e.target.value) || 0 })}
                    min="0"
                    className={`w-full px-4 py-2.5 rounded-lg border smooth-transition text-sm ${
                      isDarkMode
                        ? 'bg-white/5 border-white/10 text-white/90 focus:border-cyan-400/50'
                        : 'bg-white/30 border-black/10 text-black/90 focus:border-cyan-400/50'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/80' : 'text-black/80'}`}>
                    Target *
                  </label>
                  <input
                    type="number"
                    value={newGoal.target}
                    onChange={(e) => setNewGoal({ ...newGoal, target: parseFloat(e.target.value) || 0 })}
                    min="1"
                    className={`w-full px-4 py-2.5 rounded-lg border smooth-transition text-sm ${
                      isDarkMode
                        ? 'bg-white/5 border-white/10 text-white/90 focus:border-cyan-400/50'
                        : 'bg-white/30 border-black/10 text-black/90 focus:border-cyan-400/50'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/80' : 'text-black/80'}`}>
                    Unit *
                  </label>
                  <input
                    type="text"
                    value={newGoal.unit}
                    onChange={(e) => setNewGoal({ ...newGoal, unit: e.target.value })}
                    placeholder="e.g., km, hours, books"
                    className={`w-full px-4 py-2.5 rounded-lg border smooth-transition text-sm ${
                      isDarkMode
                        ? 'bg-white/5 border-white/10 text-white/90 placeholder-white/40 focus:border-cyan-400/50'
                        : 'bg-white/30 border-black/10 text-black/90 placeholder-black/40 focus:border-cyan-400/50'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/80' : 'text-black/80'}`}>
                    Deadline *
                  </label>
                  <input
                    type="date"
                    value={newGoal.deadline}
                    onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-lg border smooth-transition text-sm ${
                      isDarkMode
                        ? 'bg-white/5 border-white/10 text-white/90 focus:border-cyan-400/50'
                        : 'bg-white/30 border-black/10 text-black/90 focus:border-cyan-400/50'
                    }`}
                    // Match the native picker chrome to the active theme so the calendar icon stays visible.
                    style={{ colorScheme: isDarkMode ? 'dark' : 'light' }}
                  />
                </div>
              </div>
            </div>

            <div className={`flex justify-end gap-3 p-6 border-t ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
              <button
                onClick={() => setShowAddModal(false)}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium smooth-transition ${
                  isDarkMode
                    ? 'bg-white/5 text-white/70 hover:bg-white/10'
                    : 'bg-black/5 text-black/70 hover:bg-black/10'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={handleCreateGoal}
                disabled={!newGoal.title || !newGoal.deadline || !newGoal.unit}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium smooth-transition ${
                  !newGoal.title || !newGoal.deadline || !newGoal.unit
                    ? isDarkMode
                      ? 'bg-white/5 text-white/30 cursor-not-allowed'
                      : 'bg-black/5 text-black/30 cursor-not-allowed'
                    : isDarkMode
                    ? 'bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 border border-cyan-500/30'
                    : 'bg-cyan-500/20 text-cyan-600 hover:bg-cyan-500/30 border border-cyan-500/30'
                }`}
              >
                Create Goal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
