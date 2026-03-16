import { X, Zap, Target, Save } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useState } from 'react';
import { useAccessibleModal } from '../ui/useAccessibleModal';

interface AddSkillModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddSkillModal({ isOpen, onClose }: AddSkillModalProps) {
  const { isDarkMode } = useTheme();
  const { contentRef, titleId } = useAccessibleModal({ isOpen, onClose });
  const [formData, setFormData] = useState({
    skillName: '',
    category: 'Technical',
    currentLevel: 1,
    targetLevel: 5,
  });

  const categories = ['Technical', 'Creative', 'Language', 'Business', 'Physical', 'Social', 'Cognitive'];
  const levels = [
    { value: 1, label: 'Beginner' },
    { value: 2, label: 'Novice' },
    { value: 3, label: 'Intermediate' },
    { value: 4, label: 'Advanced' },
    { value: 5, label: 'Expert' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Add skill:', formData);
    onClose();
    setFormData({ skillName: '', category: 'Technical', currentLevel: 1, targetLevel: 5 });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

      <div
        ref={contentRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={`relative w-full max-w-lg rounded-xl border shadow-2xl ${
          isDarkMode ? 'bg-[#0f0f1a]/95 border-white/10' : 'bg-white/95 border-black/10'
        }`}
        style={{ backdropFilter: 'blur(20px)' }}
      >
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
              <Zap className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h2 id={titleId} className={`text-lg font-semibold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                Add Skill
              </h2>
              <p className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                Track a new skill to develop
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close add skill dialog"
            className={`w-8 h-8 rounded-lg flex items-center justify-center smooth-transition ${
              isDarkMode ? 'hover:bg-white/10 text-white/60 hover:text-white/90' : 'hover:bg-black/10 text-black/60 hover:text-black/90'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
              Skill Name
            </label>
            <input
              type="text"
              value={formData.skillName}
              onChange={(e) => setFormData({ ...formData, skillName: e.target.value })}
              placeholder="e.g., TypeScript, Guitar, Spanish"
              required
              className={`w-full px-4 py-3 rounded-lg border smooth-transition ${
                isDarkMode
                  ? 'bg-white/5 border-white/10 text-white/90 placeholder:text-white/40 focus:border-cyan-500/50 focus:bg-white/10'
                  : 'bg-black/5 border-black/10 text-black/90 placeholder:text-black/40 focus:border-cyan-500/50 focus:bg-black/10'
              }`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
              Category
            </label>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setFormData({ ...formData, category })}
                  aria-pressed={formData.category === category}
                  className={`px-3 py-2 rounded-lg text-sm font-medium smooth-transition border ${
                    formData.category === category
                      ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
                      : isDarkMode
                      ? 'bg-white/5 text-white/60 border-white/10 hover:bg-white/10'
                      : 'bg-black/5 text-black/60 border-black/10 hover:bg-black/10'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
              Current Level
            </label>
            <div className="grid grid-cols-5 gap-2">
              {levels.map((level) => (
                <button
                  key={level.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, currentLevel: level.value })}
                  aria-pressed={formData.currentLevel === level.value}
                  className={`p-3 rounded-lg text-center smooth-transition border ${
                    formData.currentLevel === level.value
                      ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
                      : isDarkMode
                      ? 'bg-white/5 text-white/60 border-white/10 hover:bg-white/10'
                      : 'bg-black/5 text-black/60 border-black/10 hover:bg-black/10'
                  }`}
                >
                  <div className="text-lg font-bold">{level.value}</div>
                  <div className="text-[10px] mt-1">{level.label}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
              <Target className="w-4 h-4 inline mr-1" />
              Target Level
            </label>
            <div className="grid grid-cols-5 gap-2">
              {levels.map((level) => (
                <button
                  key={level.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, targetLevel: level.value })}
                  aria-pressed={formData.targetLevel === level.value}
                  className={`p-3 rounded-lg text-center smooth-transition border ${
                    formData.targetLevel === level.value
                      ? 'bg-purple-500/20 text-purple-400 border-purple-500/30'
                      : isDarkMode
                      ? 'bg-white/5 text-white/60 border-white/10 hover:bg-white/10'
                      : 'bg-black/5 text-black/60 border-black/10 hover:bg-black/10'
                  }`}
                >
                  <div className="text-lg font-bold">{level.value}</div>
                  <div className="text-[10px] mt-1">{level.label}</div>
                </button>
              ))}
            </div>
          </div>

          {formData.targetLevel < formData.currentLevel && (
            <div className={`p-3 rounded-lg border text-xs ${
              isDarkMode 
                ? 'bg-orange-500/10 border-orange-500/30 text-orange-400' 
                : 'bg-orange-500/10 border-orange-500/30 text-orange-600'
            }`}>
              ⚠️ Target level should be equal to or higher than current level
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className={`flex-1 px-4 py-3 rounded-lg font-medium smooth-transition ${
                isDarkMode ? 'bg-white/5 text-white/70 hover:bg-white/10' : 'bg-black/5 text-black/70 hover:bg-black/10'
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={formData.targetLevel < formData.currentLevel}
              className="flex-1 px-4 py-3 rounded-lg font-medium bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 border border-cyan-500/30 smooth-transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4" />
              Add Skill
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
