import { X, Calendar, Type } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useState } from 'react';

interface LogMoodModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LogMoodModal({ isOpen, onClose }: LogMoodModalProps) {
  const { isDarkMode } = useTheme();
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [note, setNote] = useState('');

  const moods = [
    { emoji: '😊', label: 'Great', score: 5 },
    { emoji: '🙂', label: 'Good', score: 4 },
    { emoji: '😐', label: 'Okay', score: 3 },
    { emoji: '😔', label: 'Low', score: 2 },
    { emoji: '😰', label: 'Stressed', score: 1 },
  ];

  const activities = ['Exercise', 'Social', 'Work', 'Sleep', 'Hobbies', 'Meditation', 'Rest'];

  const toggleActivity = (activity: string) => {
    if (selectedActivities.includes(activity)) {
      setSelectedActivities(selectedActivities.filter(a => a !== activity));
    } else {
      setSelectedActivities([...selectedActivities, activity]);
    }
  };

  const handleSubmit = () => {
    // Here you would typically save to state/database
    console.log('Mood logged:', { mood: selectedMood, activities: selectedActivities, note });
    onClose();
    // Reset form
    setSelectedMood(null);
    setSelectedActivities([]);
    setNote('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div 
        className={`w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border smooth-transition ${
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
            Log Your Mood
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
          {/* Mood Selection */}
          <div>
            <label className={`block text-sm font-semibold mb-3 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
              How are you feeling? *
            </label>
            <div className="flex flex-wrap justify-center gap-3">
              {moods.map((mood) => (
                <button
                  key={mood.score}
                  onClick={() => setSelectedMood(mood.score)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 smooth-transition ${
                    selectedMood === mood.score
                      ? 'border-purple-400 bg-purple-500/20 scale-105'
                      : isDarkMode
                      ? 'border-white/10 hover:border-white/30 hover:bg-white/5'
                      : 'border-black/10 hover:border-black/30 hover:bg-black/5'
                  }`}
                >
                  <span className="text-4xl">{mood.emoji}</span>
                  <span className={`text-sm font-medium ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
                    {mood.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Activities */}
          <div>
            <label className={`block text-sm font-semibold mb-3 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
              What activities did you do today?
            </label>
            <div className="flex flex-wrap gap-2">
              {activities.map((activity) => (
                <button
                  key={activity}
                  onClick={() => toggleActivity(activity)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium smooth-transition border ${
                    selectedActivities.includes(activity)
                      ? isDarkMode
                        ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
                        : 'bg-cyan-500/20 text-cyan-600 border-cyan-500/30'
                      : isDarkMode
                      ? 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                      : 'bg-black/5 border-black/10 text-black/70 hover:bg-black/10'
                  }`}
                >
                  {activity}
                </button>
              ))}
            </div>
          </div>

          {/* Note */}
          <div>
            <label className={`block text-sm font-semibold mb-3 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
              Add a note (optional)
            </label>
            <div className="relative">
              <Type className={`absolute left-3 top-3 w-4 h-4 ${isDarkMode ? 'text-white/40' : 'text-black/40'}`} />
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="How was your day? Any thoughts to capture..."
                rows={4}
                className={`w-full pl-10 pr-4 py-3 rounded-lg border smooth-transition text-sm resize-none ${
                  isDarkMode
                    ? 'bg-white/5 border-white/10 text-white/90 placeholder-white/40 focus:border-purple-400/50'
                    : 'bg-white/50 border-black/10 text-black/90 placeholder-black/40 focus:border-purple-400/50'
                }`}
              />
            </div>
          </div>

          {/* Date (current date shown) */}
          <div>
            <label className={`block text-sm font-semibold mb-3 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
              Date
            </label>
            <div className="relative">
              <Calendar className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDarkMode ? 'text-white/40' : 'text-black/40'}`} />
              <input
                type="text"
                value={new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                readOnly
                className={`w-full pl-10 pr-4 py-3 rounded-lg border smooth-transition text-sm ${
                  isDarkMode
                    ? 'bg-white/5 border-white/10 text-white/60'
                    : 'bg-white/50 border-black/10 text-black/60'
                }`}
              />
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
            disabled={!selectedMood}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium smooth-transition border ${
              selectedMood
                ? isDarkMode
                  ? 'bg-purple-500/20 text-purple-400 border-purple-500/30 hover:bg-purple-500/30'
                  : 'bg-purple-500/20 text-purple-600 border-purple-500/30 hover:bg-purple-500/30'
                : 'bg-white/5 text-white/30 border-white/10 cursor-not-allowed'
            }`}
          >
            Log Mood
          </button>
        </div>
      </div>
    </div>
  );
}
