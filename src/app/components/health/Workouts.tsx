import { Dumbbell, Plus, TrendingUp, Flame, Clock, Target } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useState } from 'react';
import { LogWorkoutModal } from './LogWorkoutModal';

export function Workouts() {
  const { isDarkMode } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const workouts = [
    { id: 1, name: 'Morning Run', duration: '30 min', calories: 350, date: 'Today, 6:00 AM', type: 'Cardio', intensity: 'High' },
    { id: 2, name: 'Strength Training', duration: '45 min', calories: 280, date: 'Yesterday, 5:30 PM', type: 'Strength', intensity: 'Medium' },
    { id: 3, name: 'Yoga Session', duration: '60 min', calories: 180, date: 'Mar 7, 7:00 AM', type: 'Flexibility', intensity: 'Low' },
  ];

  const stats = [
    { label: 'Workouts This Week', value: '5', icon: Dumbbell, color: 'text-red-400' },
    { label: 'Total Minutes', value: '225', icon: Clock, color: 'text-orange-400' },
    { label: 'Calories Burned', value: '1,450', icon: Flame, color: 'text-yellow-400' },
    { label: 'Weekly Goal', value: '83%', icon: Target, color: 'text-green-400' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className={`text-2xl md:text-3xl font-bold m-0 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
            Workouts
          </h1>
          <p className={`text-sm mt-1 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
            Track and manage your exercise routine
          </p>
        </div>
        <button
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg smooth-transition ${
            isDarkMode
              ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30'
              : 'bg-red-500/20 text-red-600 hover:bg-red-500/30 border border-red-500/30'
          }`}
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm font-medium">Log Workout</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="glass-card p-4">
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>{stat.label}</span>
                <Icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <div className={`text-2xl font-bold metric-value ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                {stat.value}
              </div>
            </div>
          );
        })}
      </div>

      {/* Workout List */}
      <div className="glass-card p-6">
        <h2 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
          Recent Workouts
        </h2>
        <div className="space-y-3">
          {workouts.map((workout) => (
            <div
              key={workout.id}
              className={`p-4 rounded-lg smooth-transition border ${
                isDarkMode ? 'bg-white/5 border-white/10 hover:border-white/20' : 'bg-black/5 border-black/10 hover:border-black/20'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className={`text-base font-semibold mb-2 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                    {workout.name}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 text-xs">
                    <span className={`px-2 py-1 rounded ${isDarkMode ? 'bg-red-500/20 text-red-400' : 'bg-red-500/20 text-red-600'}`}>
                      {workout.type}
                    </span>
                    <span className={`flex items-center gap-1 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                      <Clock className="w-3 h-3" />
                      {workout.duration}
                    </span>
                    <span className={`flex items-center gap-1 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                      <Flame className="w-3 h-3" />
                      {workout.calories} cal
                    </span>
                    <span className={isDarkMode ? 'text-white/50' : 'text-black/50'}>
                      {workout.date}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Log Workout Modal */}
      <LogWorkoutModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}