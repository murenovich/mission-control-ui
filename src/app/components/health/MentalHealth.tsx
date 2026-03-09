import { Smile, Plus, TrendingUp, Calendar, Brain, Zap, Heart, CloudRain, Sun as SunIcon, Cloud } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useState } from 'react';
import { LogMoodModal } from './LogMoodModal';

export function MentalHealth() {
  const { isDarkMode } = useTheme();
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const moods = [
    { emoji: '😊', label: 'Great', count: 12, color: 'bg-green-500', score: 5 },
    { emoji: '🙂', label: 'Good', count: 8, color: 'bg-cyan-500', score: 4 },
    { emoji: '😐', label: 'Okay', count: 5, color: 'bg-yellow-500', score: 3 },
    { emoji: '😔', label: 'Low', count: 2, color: 'bg-orange-500', score: 2 },
    { emoji: '😰', label: 'Stressed', count: 1, color: 'bg-red-500', score: 1 },
  ];

  const weekMoods = [
    { day: 'Mon', mood: 4, activities: ['Exercise', 'Meditation'], note: 'Great start to the week' },
    { day: 'Tue', mood: 5, activities: ['Sleep', 'Hobbies'], note: 'Felt very productive' },
    { day: 'Wed', mood: 3, activities: ['Work'], note: 'Bit stressful at work' },
    { day: 'Thu', mood: 4, activities: ['Exercise', 'Social'], note: 'Good balance' },
    { day: 'Fri', mood: 5, activities: ['Hobbies', 'Social'], note: 'TGIF!' },
    { day: 'Sat', mood: 5, activities: ['Rest', 'Hobbies'], note: 'Relaxing weekend' },
    { day: 'Sun', mood: 4, activities: ['Exercise', 'Social'], note: 'Preparing for the week' },
  ];

  const monthlyTrend = [
    { week: 'Week 1', avg: 4.2 },
    { week: 'Week 2', avg: 3.8 },
    { week: 'Week 3', avg: 4.5 },
    { week: 'Week 4', avg: 4.3 },
  ];

  const activities = [
    { name: 'Exercise', impact: '+0.8', icon: Zap, color: 'text-green-400' },
    { name: 'Social Time', impact: '+0.6', icon: Heart, color: 'text-pink-400' },
    { name: 'Sleep Quality', impact: '+0.7', icon: CloudRain, color: 'text-blue-400' },
    { name: 'Work Stress', impact: '-0.5', icon: Brain, color: 'text-orange-400' },
    { name: 'Hobbies', impact: '+0.5', icon: SunIcon, color: 'text-yellow-400' },
    { name: 'Meditation', impact: '+0.6', icon: Cloud, color: 'text-purple-400' },
  ];

  const journalEntries = [
    { date: 'Today, 8:30 PM', mood: 5, entry: 'Had a wonderful day! Completed all my tasks and went for a run.' },
    { date: 'Yesterday, 9:15 PM', mood: 4, entry: 'Good productive day. Feeling grateful for my team.' },
    { date: 'Mar 6, 7:45 PM', mood: 3, entry: 'Bit tired today but managed to get through the work.' },
  ];

  const getMoodColor = (level: number) => {
    if (level === 5) return 'bg-green-500';
    if (level === 4) return 'bg-cyan-500';
    if (level === 3) return 'bg-yellow-500';
    if (level === 2) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getMoodEmoji = (level: number) => {
    if (level === 5) return '😊';
    if (level === 4) return '🙂';
    if (level === 3) return '😐';
    if (level === 2) return '😔';
    return '😰';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className={`text-2xl md:text-3xl font-bold m-0 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
            Mental Health
          </h1>
          <p className={`text-sm mt-1 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
            Track your mood and emotional well-being
          </p>
        </div>
        <button
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg smooth-transition ${
            isDarkMode
              ? 'bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 border border-purple-500/30'
              : 'bg-purple-500/20 text-purple-600 hover:bg-purple-500/30 border border-purple-500/30'
          }`}
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm font-medium">Log Mood</span>
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-card p-4">
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>Current Streak</span>
            <TrendingUp className="w-4 h-4 text-green-400" />
          </div>
          <div className={`text-3xl font-bold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
            7 <span className="text-sm">days</span>
          </div>
          <div className="text-xs text-green-400 mt-1">Logging daily</div>
        </div>
        
        <div className="glass-card p-4">
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>Avg Mood Score</span>
            <Smile className="w-4 h-4 text-purple-400" />
          </div>
          <div className={`text-3xl font-bold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
            4.3 <span className="text-sm">/ 5</span>
          </div>
          <div className="text-xs text-purple-400 mt-1">Above average</div>
        </div>

        <div className="glass-card p-4">
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>Best Day</span>
            <SunIcon className="w-4 h-4 text-yellow-400" />
          </div>
          <div className={`text-3xl font-bold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
            Sat
          </div>
          <div className="text-xs text-yellow-400 mt-1">5.0 avg score</div>
        </div>

        <div className="glass-card p-4">
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>Days Tracked</span>
            <Calendar className="w-4 h-4 text-cyan-400" />
          </div>
          <div className={`text-3xl font-bold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
            28
          </div>
          <div className="text-xs text-cyan-400 mt-1">This month</div>
        </div>
      </div>

      {/* Mood Selector & Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Mood Selector */}
        <div className="glass-card p-6">
          <h2 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
            How are you feeling today?
          </h2>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6">
            {[5, 4, 3, 2, 1].map((score) => {
              const moodData = moods.find(m => m.score === score);
              return (
                <button
                  key={score}
                  onClick={() => setSelectedMood(score)}
                  className={`text-3xl sm:text-4xl md:text-5xl p-2 sm:p-3 md:p-4 rounded-xl sm:rounded-2xl smooth-transition border-2 ${
                    selectedMood === score
                      ? 'border-purple-400 bg-purple-500/20 scale-105 sm:scale-110'
                      : isDarkMode
                      ? 'border-white/10 hover:border-white/30 hover:bg-white/5'
                      : 'border-black/10 hover:border-black/30 hover:bg-black/5'
                  }`}
                >
                  {moodData?.emoji}
                </button>
              );
            })}
          </div>
          {selectedMood && (
            <div className={`text-center p-4 rounded-lg ${isDarkMode ? 'bg-purple-500/20' : 'bg-purple-500/20'}`}>
              <p className={`text-sm font-medium ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                You selected: {moods.find(m => m.score === selectedMood)?.label}
              </p>
            </div>
          )}
        </div>

        {/* Mood Distribution */}
        <div className="glass-card p-6">
          <h2 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
            This Month's Distribution
          </h2>
          <div className="space-y-3">
            {moods.map((mood) => {
              const total = moods.reduce((sum, m) => sum + m.count, 0);
              const percentage = (mood.count / total) * 100;
              return (
                <div key={mood.label}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{mood.emoji}</span>
                      <span className={`text-sm ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>{mood.label}</span>
                    </div>
                    <span className={`text-sm font-semibold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                      {mood.count} days ({percentage.toFixed(0)}%)
                    </span>
                  </div>
                  <div className={`h-2.5 rounded-full ${isDarkMode ? 'bg-white/10' : 'bg-black/10'} overflow-hidden`}>
                    <div 
                      className={`h-full ${mood.color}/50 border-r-2 border-${mood.color} rounded-full smooth-transition`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Weekly Mood Calendar */}
      <div className="glass-card p-6">
        <h2 className={`text-lg font-semibold mb-6 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
          This Week's Mood Calendar
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
          {weekMoods.map((day, index) => {
            const moodColor = getMoodColor(day.mood);
            return (
              <div 
                key={index} 
                className={`p-4 rounded-xl border-2 smooth-transition cursor-pointer ${
                  isDarkMode 
                    ? 'bg-white/5 border-white/10 hover:border-white/30' 
                    : 'bg-black/5 border-black/10 hover:border-black/30'
                }`}
              >
                <div className="text-center mb-3">
                  <div className={`text-xs font-semibold mb-2 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                    {day.day}
                  </div>
                  <div className={`w-16 h-16 mx-auto rounded-2xl ${moodColor}/30 border-2 border-${moodColor.replace('bg-', '')} flex items-center justify-center mb-2`}>
                    <span className="text-3xl">{getMoodEmoji(day.mood)}</span>
                  </div>
                  <div className={`text-xs font-bold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                    {day.mood}/5
                  </div>
                </div>
                <div className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-black/60'} mb-2`}>
                  {day.note}
                </div>
                <div className="flex flex-wrap gap-1">
                  {day.activities.map((activity, i) => (
                    <span 
                      key={i}
                      className={`text-xs px-2 py-0.5 rounded ${isDarkMode ? 'bg-white/10 text-white/70' : 'bg-black/10 text-black/70'}`}
                    >
                      {activity}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Monthly Trend & Activity Impact */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Mood Trend */}
        <div className="glass-card p-6">
          <h2 className={`text-lg font-semibold mb-6 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
            Monthly Mood Trend
          </h2>
          <div className="h-64 relative">
            <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
              {/* Grid */}
              {[1, 2, 3, 4, 5].map((y) => (
                <line
                  key={y}
                  x1="0"
                  y1={200 - (y * 40)}
                  x2="400"
                  y2={200 - (y * 40)}
                  stroke={isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}
                  strokeWidth="1"
                />
              ))}
              
              {/* Area fill */}
              <path
                d={`M 0 ${200 - (monthlyTrend[0].avg * 40)} ${monthlyTrend.map((w, i) => 
                  `L ${(i + 1) * 100} ${200 - (w.avg * 40)}`
                ).join(' ')} L 400 200 L 0 200 Z`}
                fill="url(#moodGradient)"
                opacity="0.3"
              />
              
              {/* Line */}
              <path
                d={`M 0 ${200 - (monthlyTrend[0].avg * 40)} ${monthlyTrend.map((w, i) => 
                  `L ${(i + 1) * 100} ${200 - (w.avg * 40)}`
                ).join(' ')}`}
                fill="none"
                stroke="url(#moodLineGradient)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              
              {/* Points */}
              {monthlyTrend.map((w, i) => (
                <g key={i}>
                  <circle
                    cx={(i + 1) * 100}
                    cy={200 - (w.avg * 40)}
                    r="6"
                    fill={isDarkMode ? '#1a1a2e' : '#ffffff'}
                    stroke="#a855f7"
                    strokeWidth="3"
                  />
                  <text
                    x={(i + 1) * 100}
                    y={200 - (w.avg * 40) - 15}
                    textAnchor="middle"
                    className={`text-xs ${isDarkMode ? 'fill-white/90' : 'fill-black/90'}`}
                  >
                    {w.avg}
                  </text>
                </g>
              ))}
              
              <defs>
                <linearGradient id="moodGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
                <linearGradient id="moodLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
            </svg>
            
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs" style={{ marginLeft: '-25px' }}>
              {[5, 4, 3, 2, 1].map((val) => (
                <span key={val} className={isDarkMode ? 'text-white/40' : 'text-black/40'}>{val}</span>
              ))}
            </div>
          </div>
          
          {/* X-axis labels */}
          <div className="flex justify-between mt-2">
            {monthlyTrend.map((w, i) => (
              <span key={i} className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                {w.week}
              </span>
            ))}
          </div>
        </div>

        {/* Activity Impact */}
        <div className="glass-card p-6">
          <h2 className={`text-lg font-semibold mb-6 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
            Activity Impact on Mood
          </h2>
          <div className="space-y-4">
            {activities.map((activity) => {
              const Icon = activity.icon;
              const isPositive = activity.impact.includes('+');
              const impactValue = Math.abs(parseFloat(activity.impact));
              const percentage = (impactValue / 1) * 100;
              
              return (
                <div key={activity.name}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Icon className={`w-4 h-4 ${activity.color}`} />
                      <span className={`text-sm ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
                        {activity.name}
                      </span>
                    </div>
                    <span className={`text-sm font-semibold ${isPositive ? 'text-green-400' : 'text-orange-400'}`}>
                      {activity.impact}
                    </span>
                  </div>
                  <div className={`h-2 rounded-full ${isDarkMode ? 'bg-white/10' : 'bg-black/10'} overflow-hidden`}>
                    <div
                      className={`h-full rounded-full ${isPositive ? 'bg-green-500/50 border-r-2 border-green-400' : 'bg-orange-500/50 border-r-2 border-orange-400'}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mood Journal */}
      <div className="glass-card p-6">
        <h2 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
          Mood Journal
        </h2>
        <div className="space-y-3">
          {journalEntries.map((entry, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border smooth-transition ${
                isDarkMode
                  ? 'bg-white/5 border-white/10 hover:border-white/20'
                  : 'bg-black/5 border-black/10 hover:border-black/20'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-12 h-12 rounded-xl ${getMoodColor(entry.mood)}/30 border-2 border-${getMoodColor(entry.mood).replace('bg-', '')} flex items-center justify-center flex-shrink-0`}>
                  <span className="text-2xl">{getMoodEmoji(entry.mood)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                      {entry.date}
                    </span>
                    <span className={`text-xs font-semibold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                      {entry.mood}/5
                    </span>
                  </div>
                  <p className={`text-sm ${isDarkMode ? 'text-white/80' : 'text-black/80'}`}>
                    {entry.entry}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Log Mood Modal */}
      <LogMoodModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}