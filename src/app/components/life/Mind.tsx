import { Brain, BookOpen, Target, Lightbulb, TrendingUp, Plus, Flame, Trophy, Clock, Zap, Heart, Sparkles, Book, GraduationCap, Coffee, Pencil } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { QuickCaptureModal } from './QuickCaptureModal';
import { AddCourseModal } from './AddCourseModal';
import { AddBookModal } from './AddBookModal';
import { AddSkillModal } from './AddSkillModal';

export function Mind() {
  const { isDarkMode } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get active view from URL path
  const getActiveViewFromPath = (): 'dashboard' | 'learning' | 'reading' | 'skills' | 'ideas' | 'focus' => {
    const path = location.pathname;
    if (path.includes('/mind/learning')) return 'learning';
    if (path.includes('/mind/reading')) return 'reading';
    if (path.includes('/mind/skills')) return 'skills';
    if (path.includes('/mind/ideas')) return 'ideas';
    if (path.includes('/mind/focus')) return 'focus';
    return 'dashboard';
  };

  const [activeView, setActiveView] = useState<'dashboard' | 'learning' | 'reading' | 'skills' | 'ideas' | 'focus'>(getActiveViewFromPath());
  const [isQuickCaptureOpen, setIsQuickCaptureOpen] = useState(false);
  const [isAddCourseOpen, setIsAddCourseOpen] = useState(false);
  const [isAddBookOpen, setIsAddBookOpen] = useState(false);
  const [isAddSkillOpen, setIsAddSkillOpen] = useState(false);

  // Update active view when URL changes
  useEffect(() => {
    setActiveView(getActiveViewFromPath());
  }, [location.pathname]);

  // Navigate when view changes
  const handleViewChange = (view: 'dashboard' | 'learning' | 'reading' | 'skills' | 'ideas' | 'focus') => {
    navigate(`/mind/${view}`);
  };

  const stats = [
    { label: 'Learning Streak', value: '12', unit: 'days', icon: Flame, color: 'orange' },
    { label: 'Hours This Week', value: '8.5', unit: 'hrs', icon: Clock, color: 'cyan' },
    { label: 'Skills Developing', value: '5', unit: 'active', icon: Zap, color: 'purple' },
    { label: 'Books This Month', value: '3', unit: 'read', icon: BookOpen, color: 'green' },
  ];

  const activeLearning = [
    { id: 1, title: 'Advanced TypeScript Patterns', type: 'Course', platform: 'Udemy', progress: 68, hours: 12, category: 'Technical' },
    { id: 2, title: 'System Design Fundamentals', type: 'Course', platform: 'Educative', progress: 45, hours: 8, category: 'Technical' },
    { id: 3, title: 'The Psychology of Money', type: 'Book', platform: 'Audible', progress: 82, hours: 4, category: 'Finance' },
  ];

  const skills = [
    { name: 'TypeScript', level: 4, maxLevel: 5, lastPracticed: '2 days ago', trend: 'up' },
    { name: 'System Design', level: 3, maxLevel: 5, lastPracticed: '1 day ago', trend: 'up' },
    { name: 'Spanish', level: 2, maxLevel: 5, lastPracticed: '5 days ago', trend: 'neutral' },
    { name: 'Piano', level: 2, maxLevel: 5, lastPracticed: '1 week ago', trend: 'down' },
    { name: 'Public Speaking', level: 3, maxLevel: 5, lastPracticed: '3 days ago', trend: 'up' },
  ];

  const currentReading = [
    { id: 1, title: 'Atomic Habits', author: 'James Clear', progress: 245, total: 320, category: 'Self-Improvement' },
    { id: 2, title: 'Deep Work', author: 'Cal Newport', progress: 89, total: 296, category: 'Productivity' },
    { id: 3, title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', progress: 412, total: 499, category: 'Psychology' },
  ];

  const recentIdeas = [
    { id: 1, idea: 'Build a spaced repetition system into the dashboard for tracking learned concepts', category: 'Product', timestamp: '2 hours ago' },
    { id: 2, idea: 'Create a morning routine that combines exercise, meditation, and reading', category: 'Personal', timestamp: '1 day ago' },
    { id: 3, idea: 'Explore combining pomodoro technique with music-based focus sessions', category: 'Productivity', timestamp: '2 days ago' },
    { id: 4, idea: 'Research how top performers structure their learning schedules', category: 'Learning', timestamp: '3 days ago' },
  ];

  const focusAreas = [
    { name: 'Web Architecture', description: 'Master scalable system design patterns', progress: 60, target: 'March 2026' },
    { name: 'Spanish Fluency', description: 'Conversational proficiency for travel', progress: 35, target: 'June 2026' },
    { name: 'Financial Literacy', description: 'Investment strategies and wealth building', progress: 50, target: 'May 2026' },
  ];

  const learningCalendar = [
    { day: 'Mon', hours: 2.5 },
    { day: 'Tue', hours: 1.8 },
    { day: 'Wed', hours: 3.2 },
    { day: 'Thu', hours: 1.5 },
    { day: 'Fri', hours: 2.0 },
    { day: 'Sat', hours: 4.5 },
    { day: 'Sun', hours: 3.0 },
  ];

  const weeklyStats = {
    articlesRead: 12,
    videosWatched: 8,
    podcastsListened: 5,
    notesCreated: 23,
  };

  const getSkillColor = (level: number) => {
    if (level <= 1) return { bg: 'bg-red-500', text: 'text-red-400', label: 'Beginner' };
    if (level === 2) return { bg: 'bg-orange-500', text: 'text-orange-400', label: 'Novice' };
    if (level === 3) return { bg: 'bg-yellow-500', text: 'text-yellow-400', label: 'Intermediate' };
    if (level === 4) return { bg: 'bg-green-500', text: 'text-green-400', label: 'Advanced' };
    return { bg: 'bg-cyan-500', text: 'text-cyan-400', label: 'Expert' };
  };

  const getCategoryColor = (category: string) => {
    const colors: any = {
      Technical: 'cyan',
      Finance: 'green',
      Product: 'purple',
      Personal: 'orange',
      Productivity: 'yellow',
      Learning: 'blue',
      'Self-Improvement': 'pink',
      Psychology: 'purple',
    };
    return colors[category] || 'gray';
  };

  const getCategoryBadge = (category: string) => {
    const color = getCategoryColor(category);
    return {
      cyan: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
      green: 'bg-green-500/20 text-green-400 border-green-500/30',
      purple: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      orange: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      yellow: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      blue: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      pink: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
      gray: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    }[color];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className={`text-2xl md:text-3xl font-bold m-0 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
            Mind Command
          </h1>
          <p className={`text-sm mt-1 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
            Exercise your mind, track your intellectual growth
          </p>
        </div>
        <button
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg smooth-transition ${
            isDarkMode
              ? 'bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 border border-purple-500/30'
              : 'bg-purple-500/20 text-purple-600 hover:bg-purple-500/30 border border-purple-500/30'
          }`}
          onClick={() => setIsQuickCaptureOpen(true)}
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm font-medium">Quick Capture</span>
        </button>
      </div>

      {/* View Tabs */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'dashboard', label: 'Dashboard', icon: Brain },
          { id: 'learning', label: 'Learning', icon: GraduationCap },
          { id: 'reading', label: 'Reading', icon: BookOpen },
          { id: 'skills', label: 'Skills', icon: Zap },
          { id: 'ideas', label: 'Ideas', icon: Lightbulb },
          { id: 'focus', label: 'Focus', icon: Target },
        ].map((view) => {
          const Icon = view.icon;
          return (
            <button
              key={view.id}
              onClick={() => handleViewChange(view.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg smooth-transition text-sm font-medium ${
                activeView === view.id
                  ? isDarkMode
                    ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                    : 'bg-purple-500/20 text-purple-600 border border-purple-500/30'
                  : isDarkMode
                  ? 'bg-white/5 text-white/60 hover:bg-white/10'
                  : 'bg-black/5 text-black/60 hover:bg-black/10'
              }`}
            >
              <Icon className="w-4 h-4" />
              {view.label}
            </button>
          );
        })}
      </div>

      {/* Dashboard View */}
      {activeView === 'dashboard' && (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              const colorClasses = {
                orange: { bg: 'bg-orange-500/20', text: 'text-orange-400', border: 'border-orange-500/30' },
                cyan: { bg: 'bg-cyan-500/20', text: 'text-cyan-400', border: 'border-cyan-500/30' },
                purple: { bg: 'bg-purple-500/20', text: 'text-purple-400', border: 'border-purple-500/30' },
                green: { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30' },
              };
              const colors = colorClasses[stat.color as keyof typeof colorClasses];

              return (
                <div key={index} className="glass-card p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-12 h-12 rounded-xl ${colors.bg} border ${colors.border} flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${colors.text}`} />
                    </div>
                  </div>
                  <p className={`text-xs mb-1 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>{stat.label}</p>
                  <div className="flex items-baseline gap-2">
                    <span className={`text-3xl font-bold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                      {stat.value}
                    </span>
                    <span className={`text-sm ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>{stat.unit}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Currently Learning */}
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                Currently Learning
              </h2>
              <button className={`text-sm ${isDarkMode ? 'text-purple-400' : 'text-purple-600'} hover:underline`}>
                View All
              </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {activeLearning.map((item) => (
                <div
                  key={item.id}
                  className={`p-4 rounded-lg border smooth-transition ${
                    isDarkMode
                      ? 'bg-white/5 border-white/10 hover:border-purple-500/30'
                      : 'bg-black/5 border-black/10 hover:border-purple-500/30'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className={`text-xs px-2 py-1 rounded border ${getCategoryBadge(item.category)}`}>
                      {item.category}
                    </div>
                    <div className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
                      {item.hours}h
                    </div>
                  </div>
                  <h3 className={`text-sm font-semibold mb-1 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                    {item.title}
                  </h3>
                  <p className={`text-xs mb-3 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                    {item.type} • {item.platform}
                  </p>
                  <div className={`h-2 rounded-full ${isDarkMode ? 'bg-white/10' : 'bg-black/10'} overflow-hidden mb-2`}>
                    <div
                      className="h-full bg-purple-500/50 border-r-2 border-purple-400 rounded-full"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                  <div className={`text-xs text-right ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                    {item.progress}% complete
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Learning Chart & Quick Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Learning Hours This Week */}
            <div className="glass-card p-6">
              <h2 className={`text-lg font-semibold mb-6 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                Learning Hours This Week
              </h2>
              <div className="flex items-end justify-between gap-3 h-48">
                {learningCalendar.map((day, index) => {
                  const maxHours = Math.max(...learningCalendar.map(d => d.hours));
                  const height = (day.hours / maxHours) * 100;

                  return (
                    <div key={index} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full flex items-end" style={{ height: '150px' }}>
                        <div
                          className="w-full bg-purple-500/30 border-t-2 border-purple-400 rounded-t smooth-transition hover:bg-purple-500/40 cursor-pointer relative group"
                          style={{ height: `${height}%` }}
                        >
                          <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 smooth-transition ${
                            isDarkMode ? 'bg-black/80 text-white' : 'bg-white/80 text-black'
                          }`}>
                            {day.hours}h
                          </div>
                        </div>
                      </div>
                      <span className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>{day.day}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Weekly Consumption Stats */}
            <div className="glass-card p-6">
              <h2 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                This Week's Consumption
              </h2>
              <div className="space-y-4">
                <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Book className="w-4 h-4 text-cyan-400" />
                      <span className={`text-sm ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>Articles Read</span>
                    </div>
                    <span className={`text-lg font-bold text-cyan-400`}>{weeklyStats.articlesRead}</span>
                  </div>
                </div>
                <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-purple-400" />
                      <span className={`text-sm ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>Videos Watched</span>
                    </div>
                    <span className={`text-lg font-bold text-purple-400`}>{weeklyStats.videosWatched}</span>
                  </div>
                </div>
                <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Coffee className="w-4 h-4 text-orange-400" />
                      <span className={`text-sm ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>Podcasts</span>
                    </div>
                    <span className={`text-lg font-bold text-orange-400`}>{weeklyStats.podcastsListened}</span>
                  </div>
                </div>
                <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Pencil className="w-4 h-4 text-green-400" />
                      <span className={`text-sm ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>Notes Created</span>
                    </div>
                    <span className={`text-lg font-bold text-green-400`}>{weeklyStats.notesCreated}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Focus Areas & Recent Ideas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Current Focus Areas */}
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                  Current Focus Areas
                </h2>
                <Target className="w-5 h-5 text-purple-400" />
              </div>
              <div className="space-y-4">
                {focusAreas.map((area, index) => (
                  <div key={index} className={`p-4 rounded-lg ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className={`text-sm font-semibold mb-1 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                          {area.name}
                        </h3>
                        <p className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                          {area.description}
                        </p>
                      </div>
                      <span className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
                        {area.target}
                      </span>
                    </div>
                    <div className={`h-2 rounded-full ${isDarkMode ? 'bg-white/10' : 'bg-black/10'} overflow-hidden mt-3`}>
                      <div
                        className="h-full bg-purple-500/50 border-r-2 border-purple-400 rounded-full"
                        style={{ width: `${area.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Ideas */}
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                  Recent Ideas
                </h2>
                <Lightbulb className="w-5 h-5 text-yellow-400" />
              </div>
              <div className="space-y-3">
                {recentIdeas.slice(0, 4).map((item) => (
                  <div
                    key={item.id}
                    className={`p-3 rounded-lg smooth-transition ${
                      isDarkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-black/5 hover:bg-black/10'
                    }`}
                  >
                    <div className="flex items-start gap-2 mb-2">
                      <Lightbulb className="w-3 h-3 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <p className={`text-xs ${isDarkMode ? 'text-white/80' : 'text-black/80'}`}>
                        {item.idea}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs px-2 py-0.5 rounded border ${getCategoryBadge(item.category)}`}>
                        {item.category}
                      </span>
                      <span className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
                        {item.timestamp}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Learning View */}
      {activeView === 'learning' && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Active Courses */}
            <div className="lg:col-span-2 glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                  Active Learning
                </h2>
                <button
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm smooth-transition ${
                    isDarkMode
                      ? 'bg-purple-500/20 text-purple-400 hover:bg-purple-500/30'
                      : 'bg-purple-500/20 text-purple-600 hover:bg-purple-500/30'
                  }`}
                  onClick={() => setIsAddCourseOpen(true)}
                >
                  <Plus className="w-3 h-3" />
                  Add Course
                </button>
              </div>
              <div className="space-y-4">
                {activeLearning.map((item) => (
                  <div
                    key={item.id}
                    className={`p-4 rounded-lg border smooth-transition ${
                      isDarkMode
                        ? 'bg-white/5 border-white/10 hover:border-purple-500/30'
                        : 'bg-black/5 border-black/10 hover:border-purple-500/30'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className={`text-base font-semibold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                            {item.title}
                          </h3>
                          <span className={`text-xs px-2 py-0.5 rounded border ${getCategoryBadge(item.category)}`}>
                            {item.category}
                          </span>
                        </div>
                        <p className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                          {item.type} • {item.platform} • {item.hours} hours
                        </p>
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                          {item.progress}%
                        </div>
                      </div>
                    </div>
                    <div className={`h-3 rounded-full ${isDarkMode ? 'bg-white/10' : 'bg-black/10'} overflow-hidden`}>
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full smooth-transition"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Learning Queue */}
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                  Want to Learn
                </h2>
                <button
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm smooth-transition ${
                    isDarkMode
                      ? 'bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30'
                      : 'bg-cyan-500/20 text-cyan-600 hover:bg-cyan-500/30'
                  }`}
                  onClick={() => setIsAddCourseOpen(true)}
                >
                  <Plus className="w-3 h-3" />
                  Add
                </button>
              </div>
              <div className="space-y-3">
                {[
                  'Machine Learning Basics',
                  'Figma Advanced Prototyping',
                  'Cloud Architecture on AWS',
                  'Product Management',
                  'Data Structures & Algorithms',
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg smooth-transition cursor-pointer ${
                      isDarkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-black/5 hover:bg-black/10'
                    }`}
                  >
                    <p className={`text-sm ${isDarkMode ? 'text-white/80' : 'text-black/80'}`}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Completed Courses */}
          <div className="glass-card p-6">
            <h2 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
              Recently Completed
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: 'React Advanced Patterns', platform: 'Frontend Masters', rating: 5, completedDate: 'Feb 2026' },
                { title: 'Node.js Microservices', platform: 'Pluralsight', rating: 4, completedDate: 'Jan 2026' },
                { title: 'PostgreSQL Performance', platform: 'Udemy', rating: 5, completedDate: 'Jan 2026' },
              ].map((course, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border ${
                    isDarkMode
                      ? 'bg-white/5 border-white/10'
                      : 'bg-black/5 border-black/10'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <Trophy className="w-5 h-5 text-yellow-400" />
                    <div className="flex gap-0.5">
                      {[...Array(course.rating)].map((_, i) => (
                        <span key={i} className="text-yellow-400 text-xs">★</span>
                      ))}
                    </div>
                  </div>
                  <h3 className={`text-sm font-semibold mb-1 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                    {course.title}
                  </h3>
                  <p className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                    {course.platform} • {course.completedDate}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Reading View */}
      {activeView === 'reading' && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Currently Reading */}
            <div className="lg:col-span-2 glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                  Currently Reading
                </h2>
                <button
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm smooth-transition ${
                    isDarkMode
                      ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                      : 'bg-green-500/20 text-green-600 hover:bg-green-500/30'
                  }`}
                  onClick={() => setIsAddBookOpen(true)}
                >
                  <Plus className="w-3 h-3" />
                  Add Book
                </button>
              </div>
              <div className="space-y-4">
                {currentReading.map((book) => {
                  const percentage = Math.round((book.progress / book.total) * 100);
                  return (
                    <div
                      key={book.id}
                      className={`p-4 rounded-lg border smooth-transition ${
                        isDarkMode
                          ? 'bg-white/5 border-white/10 hover:border-green-500/30'
                          : 'bg-black/5 border-black/10 hover:border-green-500/30'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className={`text-base font-semibold mb-1 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                            {book.title}
                          </h3>
                          <p className={`text-sm mb-2 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                            by {book.author}
                          </p>
                          <span className={`text-xs px-2 py-1 rounded border ${getCategoryBadge(book.category)}`}>
                            {book.category}
                          </span>
                        </div>
                        <div className="text-right">
                          <div className={`text-sm font-semibold mb-1 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                            {book.progress} / {book.total}
                          </div>
                          <div className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                            pages
                          </div>
                        </div>
                      </div>
                      <div className={`h-3 rounded-full ${isDarkMode ? 'bg-white/10' : 'bg-black/10'} overflow-hidden mb-2`}>
                        <div
                          className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <div className={`text-xs text-right ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                        {percentage}% complete • {book.total - book.progress} pages left
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Reading Stats */}
            <div className="glass-card p-6">
              <h2 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                Reading Stats
              </h2>
              <div className="space-y-4">
                <div className={`p-4 rounded-lg text-center ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}>
                  <div className={`text-3xl font-bold mb-1 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>12</div>
                  <div className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>Books This Year</div>
                </div>
                <div className={`p-4 rounded-lg text-center ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}>
                  <div className={`text-3xl font-bold mb-1 text-green-400`}>3</div>
                  <div className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>This Month</div>
                </div>
                <div className={`p-4 rounded-lg text-center ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}>
                  <div className={`text-3xl font-bold mb-1 text-cyan-400`}>742</div>
                  <div className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>Pages This Week</div>
                </div>
                <div className={`p-4 rounded-lg text-center ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}>
                  <div className={`text-3xl font-bold mb-1 text-purple-400`}>35</div>
                  <div className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>Min Avg Daily</div>
                </div>
              </div>
            </div>
          </div>

          {/* To Read Queue */}
          <div className="glass-card p-6">
            <h2 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
              Want to Read
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                'The Almanack of Naval Ravikant',
                'Range by David Epstein',
                'Build by Tony Fadell',
                'The Mom Test',
                'Zero to One',
                'Hooked by Nir Eyal',
                'The Lean Startup',
                'Sprint by Jake Knapp',
              ].map((book, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg smooth-transition cursor-pointer ${
                    isDarkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-black/5 hover:bg-black/10'
                  }`}
                >
                  <BookOpen className={`w-4 h-4 mb-2 ${isDarkMode ? 'text-white/40' : 'text-black/40'}`} />
                  <p className={`text-sm ${isDarkMode ? 'text-white/80' : 'text-black/80'}`}>{book}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Skills View */}
      {activeView === 'skills' && (
        <>
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                Skills In Development
              </h2>
              <button
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm smooth-transition ${
                  isDarkMode
                    ? 'bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30'
                    : 'bg-cyan-500/20 text-cyan-600 hover:bg-cyan-500/30'
                }`}
                onClick={() => setIsAddSkillOpen(true)}
              >
                <Plus className="w-3 h-3" />
                Add Skill
              </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {skills.map((skill, index) => {
                const colors = getSkillColor(skill.level);
                return (
                  <div
                    key={index}
                    className={`p-5 rounded-lg border smooth-transition ${
                      isDarkMode
                        ? 'bg-white/5 border-white/10 hover:border-cyan-500/30'
                        : 'bg-black/5 border-black/10 hover:border-cyan-500/30'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className={`text-base font-semibold mb-1 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                          {skill.name}
                        </h3>
                        <p className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                          Last practiced: {skill.lastPracticed}
                        </p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded ${colors.text}`}>
                        {colors.label}
                      </span>
                    </div>
                    
                    {/* Skill Level Dots */}
                    <div className="flex gap-2 mb-3">
                      {[...Array(skill.maxLevel)].map((_, i) => (
                        <div
                          key={i}
                          className={`flex-1 h-2 rounded-full ${
                            i < skill.level
                              ? `${colors.bg}/50 border-2 border-${colors.bg.replace('bg-', '')}`
                              : isDarkMode
                              ? 'bg-white/10'
                              : 'bg-black/10'
                          }`}
                        />
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className={`text-xs ${colors.text}`}>
                        Level {skill.level}/{skill.maxLevel}
                      </span>
                      <span className={`text-xs ${
                        skill.trend === 'up' 
                          ? 'text-green-400' 
                          : skill.trend === 'down' 
                          ? 'text-red-400' 
                          : isDarkMode ? 'text-white/50' : 'text-black/50'
                      }`}>
                        {skill.trend === 'up' ? '↑ Improving' : skill.trend === 'down' ? '↓ Rusty' : '→ Maintaining'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Skill Categories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { category: 'Technical', count: 8, color: 'cyan' },
              { category: 'Creative', count: 5, color: 'purple' },
              { category: 'Languages', count: 3, color: 'green' },
            ].map((cat, index) => (
              <div key={index} className="glass-card p-6 text-center">
                <div className={`text-4xl font-bold mb-2 text-${cat.color}-400`}>{cat.count}</div>
                <div className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                  {cat.category} Skills
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Ideas View */}
      {activeView === 'ideas' && (
        <>
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                All Ideas
              </h2>
              <button
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm smooth-transition ${
                  isDarkMode
                    ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30'
                    : 'bg-yellow-500/20 text-yellow-600 hover:bg-yellow-500/30'
                }`}
              >
                <Plus className="w-3 h-3" />
                Capture Idea
              </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {recentIdeas.map((item) => (
                <div
                  key={item.id}
                  className={`p-4 rounded-lg border smooth-transition ${
                    isDarkMode
                      ? 'bg-white/5 border-white/10 hover:border-yellow-500/30'
                      : 'bg-black/5 border-black/10 hover:border-yellow-500/30'
                  }`}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <p className={`text-sm flex-1 ${isDarkMode ? 'text-white/80' : 'text-black/80'}`}>
                      {item.idea}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs px-2 py-1 rounded border ${getCategoryBadge(item.category)}`}>
                      {item.category}
                    </span>
                    <span className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
                      {item.timestamp}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Idea Categories */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { category: 'Product', count: 12, color: 'purple' },
              { category: 'Personal', count: 8, color: 'orange' },
              { category: 'Productivity', count: 15, color: 'yellow' },
              { category: 'Learning', count: 6, color: 'cyan' },
            ].map((cat, index) => (
              <div key={index} className="glass-card p-4 text-center">
                <div className={`text-2xl font-bold mb-1 text-${cat.color}-400`}>{cat.count}</div>
                <div className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                  {cat.category}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Focus View */}
      {activeView === 'focus' && (
        <>
          <div className="glass-card p-6">
            <h2 className={`text-lg font-semibold mb-6 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
              Long-term Focus Areas
            </h2>
            <div className="space-y-4">
              {focusAreas.map((area, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-lg border smooth-transition ${
                    isDarkMode
                      ? 'bg-white/5 border-white/10 hover:border-purple-500/30'
                      : 'bg-black/5 border-black/10 hover:border-purple-500/30'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                        {area.name}
                      </h3>
                      <p className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                        {area.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-semibold ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
                        Target: {area.target}
                      </div>
                    </div>
                  </div>
                  <div className={`h-4 rounded-full ${isDarkMode ? 'bg-white/10' : 'bg-black/10'} overflow-hidden mb-2`}>
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full smooth-transition"
                      style={{ width: `${area.progress}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-semibold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                      {area.progress}% Complete
                    </span>
                    <span className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                      {100 - area.progress}% remaining
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Focus Session Timer (Placeholder) */}
          <div className="glass-card p-6 text-center">
            <Target className="w-12 h-12 mx-auto mb-4 text-purple-400" />
            <h2 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
              Focus Session
            </h2>
            <p className={`text-sm mb-6 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
              Start a deep work session with pomodoro timer
            </p>
            <button
              className={`px-6 py-3 rounded-lg smooth-transition ${
                isDarkMode
                  ? 'bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 border border-purple-500/30'
                  : 'bg-purple-500/20 text-purple-600 hover:bg-purple-500/30 border border-purple-500/30'
              }`}
            >
              Start 25-Min Session
            </button>
          </div>
        </>
      )}

      {/* Modals */}
      <QuickCaptureModal isOpen={isQuickCaptureOpen} onClose={() => setIsQuickCaptureOpen(false)} />
      <AddCourseModal isOpen={isAddCourseOpen} onClose={() => setIsAddCourseOpen(false)} />
      <AddBookModal isOpen={isAddBookOpen} onClose={() => setIsAddBookOpen(false)} />
      <AddSkillModal isOpen={isAddSkillOpen} onClose={() => setIsAddSkillOpen(false)} />
    </div>
  );
}