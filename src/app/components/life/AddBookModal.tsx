import { X, BookOpen, User, Hash, Tag, Save } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useState } from 'react';

interface AddBookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddBookModal({ isOpen, onClose }: AddBookModalProps) {
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    totalPages: '',
    category: 'Self-Improvement',
  });

  const categories = [
    'Self-Improvement',
    'Business',
    'Finance',
    'Psychology',
    'Technology',
    'Fiction',
    'Biography',
    'Productivity',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Add book:', formData);
    onClose();
    setFormData({ title: '', author: '', totalPages: '', category: 'Self-Improvement' });
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
            <div className="w-10 h-10 rounded-lg bg-green-500/20 border border-green-500/30 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                Add Book
              </h2>
              <p className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                Track a new book to your reading list
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
              <BookOpen className="w-4 h-4 inline mr-1" />
              Book Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Atomic Habits"
              required
              className={`w-full px-4 py-3 rounded-lg border smooth-transition ${
                isDarkMode
                  ? 'bg-white/5 border-white/10 text-white/90 placeholder:text-white/40 focus:border-green-500/50 focus:bg-white/10'
                  : 'bg-black/5 border-black/10 text-black/90 placeholder:text-black/40 focus:border-green-500/50 focus:bg-black/10'
              }`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
              <User className="w-4 h-4 inline mr-1" />
              Author
            </label>
            <input
              type="text"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              placeholder="e.g., James Clear"
              required
              className={`w-full px-4 py-3 rounded-lg border smooth-transition ${
                isDarkMode
                  ? 'bg-white/5 border-white/10 text-white/90 placeholder:text-white/40 focus:border-green-500/50 focus:bg-white/10'
                  : 'bg-black/5 border-black/10 text-black/90 placeholder:text-black/40 focus:border-green-500/50 focus:bg-black/10'
              }`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
              <Hash className="w-4 h-4 inline mr-1" />
              Total Pages
            </label>
            <input
              type="number"
              value={formData.totalPages}
              onChange={(e) => setFormData({ ...formData, totalPages: e.target.value })}
              placeholder="e.g., 320"
              min="1"
              required
              className={`w-full px-4 py-3 rounded-lg border smooth-transition ${
                isDarkMode
                  ? 'bg-white/5 border-white/10 text-white/90 placeholder:text-white/40 focus:border-green-500/50 focus:bg-white/10'
                  : 'bg-black/5 border-black/10 text-black/90 placeholder:text-black/40 focus:border-green-500/50 focus:bg-black/10'
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
                      ? 'bg-green-500/20 text-green-400 border-green-500/30'
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
              className="flex-1 px-4 py-3 rounded-lg font-medium bg-green-500/20 text-green-400 hover:bg-green-500/30 border border-green-500/30 smooth-transition flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              Add Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
