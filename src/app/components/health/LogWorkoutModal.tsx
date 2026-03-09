import { X, Dumbbell, Clock, Flame, TrendingUp } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useState } from 'react';

interface LogWorkoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LogWorkoutModal({ isOpen, onClose }: LogWorkoutModalProps) {
  const { isDarkMode } = useTheme();
  const [workoutType, setWorkoutType] = useState<'strength' | 'cardio' | 'flexibility' | 'sports'>('strength');
  const [workoutName, setWorkoutName] = useState('');
  const [duration, setDuration] = useState('');
  const [calories, setCalories] = useState('');
  const [intensity, setIntensity] = useState<'low' | 'medium' | 'high'>('medium');
  const [notes, setNotes] = useState('');

  const handleSubmit = () => {
    // Here you would typically save to state/database
    console.log('Workout logged:', { workoutType, workoutName, duration, calories, intensity, notes });
    onClose();
    // Reset form
    setWorkoutName('');
    setDuration('');
    setCalories('');
    setNotes('');
  };

  if (!isOpen) return null;

  const workoutTypes = [
    { value: 'strength', label: 'Strength', icon: '💪' },
    { value: 'cardio', label: 'Cardio', icon: '🏃' },
    { value: 'flexibility', label: 'Flexibility', icon: '🧘' },
    { value: 'sports', label: 'Sports', icon: '⚽' },
  ];

  const intensityLevels = [
    { value: 'low', label: 'Low', color: 'green' },
    { value: 'medium', label: 'Medium', color: 'yellow' },
    { value: 'high', label: 'High', color: 'red' },
  ];

  const getIntensityColor = (level: string) => {
    switch (level) {
      case 'low': return 'border-green-500/30 bg-green-500/20 text-green-400';
      case 'medium': return 'border-yellow-500/30 bg-yellow-500/20 text-yellow-400';
      case 'high': return 'border-red-500/30 bg-red-500/20 text-red-400';
      default: return 'border-white/10 bg-white/5 text-white/60';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div 
        className={`w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border smooth-transition ${
          isDarkMode 
            ? 'bg-[#0a0a0f]/95 border-white/10' 
            : 'bg-white/95 border-black/10'
        }`}
        style={{ backdropFilter: 'blur(20px)' }}
      >
        {/* Header */}
        <div className={`sticky top-0 flex items-center justify-between p-6 border-b ${
          isDarkMode ? 'bg-[#0a0a0f]/95 border-white/10' : 'bg-white/95 border-black/10'
        }`}>
          <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
            Log Workout
          </h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg smooth-transition ${
              isDarkMode
                ? 'hover:bg-white/10 text-white/60 hover:text-white/90'
                : 'hover:bg-black/10 text-black/60 hover:text-black/90'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Workout Type Selection */}
          <div>
            <label className={`block text-sm font-semibold mb-3 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
              Workout Type *
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {workoutTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => setWorkoutType(type.value as any)}
                  className={`flex flex-col items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium smooth-transition border ${
                    workoutType === type.value
                      ? isDarkMode
                        ? 'border-orange-500/30 bg-orange-500/20 text-orange-400'
                        : 'border-orange-500/30 bg-orange-500/20 text-orange-600'
                      : isDarkMode
                      ? 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                      : 'bg-black/5 border-black/10 text-black/70 hover:bg-black/10'
                  }`}
                >
                  <span className="text-2xl">{type.icon}</span>
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Workout Name */}
          <div>
            <label className={`block text-sm font-semibold mb-3 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
              Workout Name *
            </label>
            <div className="relative">
              <Dumbbell className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDarkMode ? 'text-white/40' : 'text-black/40'}`} />
              <input
                type="text"
                value={workoutName}
                onChange={(e) => setWorkoutName(e.target.value)}
                placeholder="e.g., Morning Run, Chest & Triceps, Yoga Flow"
                className={`w-full pl-10 pr-4 py-3 rounded-lg border smooth-transition text-sm ${
                  isDarkMode
                    ? 'bg-white/5 border-white/10 text-white/90 placeholder-white/40 focus:border-orange-400/50'
                    : 'bg-white/50 border-black/10 text-black/90 placeholder-black/40 focus:border-orange-400/50'
                }`}
              />
            </div>
          </div>

          {/* Duration and Calories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-semibold mb-3 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                Duration (minutes) *
              </label>
              <div className="relative">
                <Clock className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDarkMode ? 'text-white/40' : 'text-black/40'}`} />
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="30"
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border smooth-transition text-sm ${
                    isDarkMode
                      ? 'bg-white/5 border-white/10 text-white/90 placeholder-white/40 focus:border-orange-400/50'
                      : 'bg-white/50 border-black/10 text-black/90 placeholder-black/40 focus:border-orange-400/50'
                  }`}
                />
              </div>
            </div>
            
            <div>
              <label className={`block text-sm font-semibold mb-3 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                Calories Burned
              </label>
              <div className="relative">
                <Flame className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDarkMode ? 'text-white/40' : 'text-black/40'}`} />
                <input
                  type="number"
                  value={calories}
                  onChange={(e) => setCalories(e.target.value)}
                  placeholder="250"
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border smooth-transition text-sm ${
                    isDarkMode
                      ? 'bg-white/5 border-white/10 text-white/90 placeholder-white/40 focus:border-orange-400/50'
                      : 'bg-white/50 border-black/10 text-black/90 placeholder-black/40 focus:border-orange-400/50'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Intensity Selection */}
          <div>
            <label className={`block text-sm font-semibold mb-3 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
              Intensity Level *
            </label>
            <div className="grid grid-cols-3 gap-3">
              {intensityLevels.map((level) => (
                <button
                  key={level.value}
                  onClick={() => setIntensity(level.value as any)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium smooth-transition border ${
                    intensity === level.value
                      ? getIntensityColor(level.value)
                      : isDarkMode
                      ? 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                      : 'bg-black/5 border-black/10 text-black/70 hover:bg-black/10'
                  }`}
                >
                  {level.label}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className={`block text-sm font-semibold mb-3 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
              Notes (optional)
            </label>
            <div className="relative">
              <TrendingUp className={`absolute left-3 top-3 w-4 h-4 ${isDarkMode ? 'text-white/40' : 'text-black/40'}`} />
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="How did the workout feel? Any PRs or achievements?"
                rows={4}
                className={`w-full pl-10 pr-4 py-3 rounded-lg border smooth-transition text-sm resize-none ${
                  isDarkMode
                    ? 'bg-white/5 border-white/10 text-white/90 placeholder-white/40 focus:border-orange-400/50'
                    : 'bg-white/50 border-black/10 text-black/90 placeholder-black/40 focus:border-orange-400/50'
                }`}
              />
            </div>
          </div>

          {/* Quick Stats Preview */}
          <div className={`p-4 rounded-lg grid grid-cols-3 gap-4 ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}>
            <div className="text-center">
              <div className={`text-xs mb-1 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>Duration</div>
              <div className={`text-lg font-bold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                {duration || '0'} <span className="text-xs">min</span>
              </div>
            </div>
            <div className="text-center">
              <div className={`text-xs mb-1 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>Calories</div>
              <div className={`text-lg font-bold text-orange-400`}>
                {calories || '0'} <span className="text-xs">kcal</span>
              </div>
            </div>
            <div className="text-center">
              <div className={`text-xs mb-1 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>Intensity</div>
              <div className={`text-lg font-bold capitalize ${
                intensity === 'low' ? 'text-green-400' : 
                intensity === 'medium' ? 'text-yellow-400' : 
                'text-red-400'
              }`}>
                {intensity}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`sticky bottom-0 flex items-center justify-end gap-3 p-6 border-t ${
          isDarkMode ? 'bg-[#0a0a0f]/95 border-white/10' : 'bg-white/95 border-black/10'
        }`}>
          <button
            onClick={onClose}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium smooth-transition ${
              isDarkMode
                ? 'bg-white/5 text-white/70 hover:bg-white/10'
                : 'bg-black/5 text-black/70 hover:bg-black/10'
            }`}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!workoutName || !duration}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium smooth-transition border ${
              workoutName && duration
                ? isDarkMode
                  ? 'bg-orange-500/20 text-orange-400 border-orange-500/30 hover:bg-orange-500/30'
                  : 'bg-orange-500/20 text-orange-600 border-orange-500/30 hover:bg-orange-500/30'
                : 'bg-white/5 text-white/30 border-white/10 cursor-not-allowed'
            }`}
          >
            Log Workout
          </button>
        </div>
      </div>
    </div>
  );
}
