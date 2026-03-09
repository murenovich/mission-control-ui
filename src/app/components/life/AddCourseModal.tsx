import { X, GraduationCap, BookOpen, Clock, Tag, Save } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useState } from 'react';

interface AddCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddCourseModal({ isOpen, onClose }: AddCourseModalProps) {
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    title: '',
    type: 'Course',
    platform: '',
    hours: '',
    category: 'Technical',
  });

  const types = ['Course', 'Book', 'Tutorial', 'Workshop', 'Bootcamp'];
  const categories = ['Technical', 'Business', 'Creative', 'Finance', 'Marketing', 'Design', 'Personal'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Add course:', formData);
    onClose();
    setFormData({ title: '', type: 'Course', platform: '', hours: '', category: 'Technical' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div
        className={`relative w-full max-w-lg rounded-xl border shadow-2xl ${
          isDarkMode ? 'bg-[#0f0f1a]/95 border-white/10' : 'bg-white/95 border-black/10'
        }`}
        style={{ backdropFilter: 'blur(20px)' }}
      >
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                Add Learning Material
              </h2>
              <p className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                Track a new course or learning resource
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`w-8 h-8 rounded-lg flex items-center justify-center smooth-transition ${
              isDarkMode ? 'hover:bg-white/10 text-white/60 hover:text-white/90' : 'hover:bg-black/10 text-black/60 hover:text-black/90'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Advanced React Patterns"
              required
              className={`w-full px-4 py-3 rounded-lg border smooth-transition ${
                isDarkMode
                  ? 'bg-white/5 border-white/10 text-white/90 placeholder:text-white/40 focus:border-purple-500/50 focus:bg-white/10'
                  : 'bg-black/5 border-black/10 text-black/90 placeholder:text-black/40 focus:border-purple-500/50 focus:bg-black/10'
              }`}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
                <BookOpen className="w-4 h-4 inline mr-1" />
                Type
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className={`w-full px-4 py-3 rounded-lg border smooth-transition ${
                  isDarkMode
                    ? 'bg-white/5 border-white/10 text-white/90 focus:border-purple-500/50 focus:bg-white/10'
                    : 'bg-black/5 border-black/10 text-black/90 focus:border-purple-500/50 focus:bg-black/10'
                }`}
              >
                {types.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
                <Clock className="w-4 h-4 inline mr-1" />
                Hours
              </label>
              <input
                type="number"
                value={formData.hours}
                onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                placeholder="10"
                min="0"
                step="0.5"
                className={`w-full px-4 py-3 rounded-lg border smooth-transition ${
                  isDarkMode
                    ? 'bg-white/5 border-white/10 text-white/90 placeholder:text-white/40 focus:border-purple-500/50 focus:bg-white/10'
                    : 'bg-black/5 border-black/10 text-black/90 placeholder:text-black/40 focus:border-purple-500/50 focus:bg-black/10'
                }`}
              />
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
              Platform
            </label>
            <input
              type="text"
              value={formData.platform}
              onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
              placeholder="e.g., Udemy, Coursera, Frontend Masters"
              required
              className={`w-full px-4 py-3 rounded-lg border smooth-transition ${
                isDarkMode
                  ? 'bg-white/5 border-white/10 text-white/90 placeholder:text-white/40 focus:border-purple-500/50 focus:bg-white/10'
                  : 'bg-black/5 border-black/10 text-black/90 placeholder:text-black/40 focus:border-purple-500/50 focus:bg-black/10'
              }`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
              <Tag className="w-4 h-4 inline mr-1" />
              Category
            </label>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setFormData({ ...formData, category })}
                  className={`px-3 py-2 rounded-lg text-sm font-medium smooth-transition border ${
                    formData.category === category
                      ? 'bg-purple-500/20 text-purple-400 border-purple-500/30'
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
              className="flex-1 px-4 py-3 rounded-lg font-medium bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 border border-purple-500/30 smooth-transition flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              Add to Learning
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
