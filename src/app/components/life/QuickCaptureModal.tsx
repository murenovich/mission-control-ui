import { X, Lightbulb, Tag, Save } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useState } from 'react';

interface QuickCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QuickCaptureModal({ isOpen, onClose }: QuickCaptureModalProps) {
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    idea: '',
    category: 'Personal',
  });

  const categories = ['Product', 'Personal', 'Productivity', 'Learning', 'Creative', 'Business', 'Technical', 'Health'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Quick capture:', formData);
    onClose();
    setFormData({ idea: '', category: 'Personal' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`relative w-full max-w-lg rounded-xl border shadow-2xl ${
          isDarkMode
            ? 'bg-[#0f0f1a]/95 border-white/10'
            : 'bg-white/95 border-black/10'
        }`}
        style={{ backdropFilter: 'blur(20px)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                Quick Capture
              </h2>
              <p className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                Capture a thought or idea
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`w-8 h-8 rounded-lg flex items-center justify-center smooth-transition ${
              isDarkMode
                ? 'hover:bg-white/10 text-white/60 hover:text-white/90'
                : 'hover:bg-black/10 text-black/60 hover:text-black/90'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Idea Input */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
              Your Idea
            </label>
            <textarea
              value={formData.idea}
              onChange={(e) => setFormData({ ...formData, idea: e.target.value })}
              placeholder="What's on your mind?"
              rows={4}
              required
              className={`w-full px-4 py-3 rounded-lg border smooth-transition resize-none ${
                isDarkMode
                  ? 'bg-white/5 border-white/10 text-white/90 placeholder:text-white/40 focus:border-yellow-500/50 focus:bg-white/10'
                  : 'bg-black/5 border-black/10 text-black/90 placeholder:text-black/40 focus:border-yellow-500/50 focus:bg-black/10'
              }`}
            />
          </div>

          {/* Category Selection */}
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
                      ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
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

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className={`flex-1 px-4 py-3 rounded-lg font-medium smooth-transition ${
                isDarkMode
                  ? 'bg-white/5 text-white/70 hover:bg-white/10'
                  : 'bg-black/5 text-black/70 hover:bg-black/10'
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 rounded-lg font-medium bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 border border-yellow-500/30 smooth-transition flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Idea
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
