import { useState, type FormEvent } from 'react';
import { useTheme } from '../../app/contexts/ThemeContext';
import { Plus, Edit2, Trash2, Eye, EyeOff, Tag, BarChart3 } from 'lucide-react';

export interface NewsCategoryRecord {
  id: string;
  name: string;
  color: string;
  icon: string;
  description: string;
  sourcesCount: number;
  articlesCount: number;
  isActive: boolean;
}

export interface CategoryColorOption {
  name: string;
  value: string;
  class: string;
}

export interface CategoryFormValues {
  name: string;
  color: string;
  icon: string;
  description: string;
}

export interface CategoriesScreenProps {
  title?: string;
  description?: string;
  categories?: NewsCategoryRecord[];
  defaultCategories?: NewsCategoryRecord[];
  colorOptions?: CategoryColorOption[];
  onSaveCategory?: (category: NewsCategoryRecord, mode: 'create' | 'edit') => void;
  onDeleteCategory?: (category: NewsCategoryRecord) => void;
  onToggleCategory?: (category: NewsCategoryRecord) => void;
}

export const DEMO_NEWS_CATEGORIES: NewsCategoryRecord[] = [
  { id: '1', name: 'Technology', color: 'cyan', icon: '💻', description: 'Latest tech news, gadgets, and innovations', sourcesCount: 12, articlesCount: 456, isActive: true },
  { id: '2', name: 'Science', color: 'green', icon: '🔬', description: 'Scientific discoveries and research', sourcesCount: 8, articlesCount: 234, isActive: true },
  { id: '3', name: 'Business', color: 'orange', icon: '💼', description: 'Markets, finance, and business trends', sourcesCount: 10, articlesCount: 389, isActive: true },
  { id: '4', name: 'World', color: 'purple', icon: '🌍', description: 'Global news and international affairs', sourcesCount: 15, articlesCount: 567, isActive: true },
  { id: '5', name: 'Sports', color: 'red', icon: '⚽', description: 'Sports news, scores, and highlights', sourcesCount: 6, articlesCount: 178, isActive: false },
  { id: '6', name: 'Entertainment', color: 'pink', icon: '🎬', description: 'Movies, music, and celebrity news', sourcesCount: 7, articlesCount: 245, isActive: false },
];

export const DEMO_CATEGORY_COLOR_OPTIONS: CategoryColorOption[] = [
  { name: 'Cyan', value: 'cyan', class: 'from-cyan-500 to-cyan-600' },
  { name: 'Purple', value: 'purple', class: 'from-purple-500 to-purple-600' },
  { name: 'Orange', value: 'orange', class: 'from-orange-500 to-orange-600' },
  { name: 'Green', value: 'green', class: 'from-green-500 to-green-600' },
  { name: 'Red', value: 'red', class: 'from-red-500 to-red-600' },
  { name: 'Pink', value: 'pink', class: 'from-pink-500 to-pink-600' },
  { name: 'Blue', value: 'blue', class: 'from-blue-500 to-blue-600' },
];

export function CategoriesScreen({
  title = 'Categories',
  description = 'Organize your newsfeed by topics',
  categories,
  defaultCategories = DEMO_NEWS_CATEGORIES,
  colorOptions = DEMO_CATEGORY_COLOR_OPTIONS,
  onSaveCategory,
  onDeleteCategory,
  onToggleCategory,
}: CategoriesScreenProps) {
  const { isDarkMode } = useTheme();
  const [internalCategories, setInternalCategories] = useState(defaultCategories);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<NewsCategoryRecord | null>(null);
  const [formData, setFormData] = useState<CategoryFormValues>({ name: '', color: 'cyan', icon: '📰', description: '' });
  const resolvedCategories = categories ?? internalCategories;
  const totalArticles = resolvedCategories.reduce((acc, cat) => acc + cat.articlesCount, 0);
  const activeCategories = resolvedCategories.filter((cat) => cat.isActive).length;

  const updateLocalCategories = (updater: (previous: NewsCategoryRecord[]) => NewsCategoryRecord[]) => {
    if (!categories) setInternalCategories(updater);
  };

  const toggleCategory = (target: NewsCategoryRecord) => {
    updateLocalCategories((previous) => previous.map((cat) => cat.id === target.id ? { ...cat, isActive: !cat.isActive } : cat));
    onToggleCategory?.(target);
  };

  const deleteCategory = (target: NewsCategoryRecord) => {
    updateLocalCategories((previous) => previous.filter((cat) => cat.id !== target.id));
    onDeleteCategory?.(target);
  };

  const openAddModal = () => {
    setFormData({ name: '', color: 'cyan', icon: '📰', description: '' });
    setEditingCategory(null);
    setShowAddModal(true);
  };

  const openEditModal = (categoryRecord: NewsCategoryRecord) => {
    setFormData({ name: categoryRecord.name, color: categoryRecord.color, icon: categoryRecord.icon, description: categoryRecord.description });
    setEditingCategory(categoryRecord);
    setShowAddModal(true);
  };

  const closeModal = () => {
    setShowAddModal(false);
    setEditingCategory(null);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const nextCategory: NewsCategoryRecord = editingCategory
      ? { ...editingCategory, ...formData }
      : { id: Date.now().toString(), ...formData, sourcesCount: 0, articlesCount: 0, isActive: true };

    updateLocalCategories((previous) =>
      editingCategory
        ? previous.map((cat) => cat.id === editingCategory.id ? nextCategory : cat)
        : [...previous, nextCategory],
    );
    onSaveCategory?.(nextCategory, editingCategory ? 'edit' : 'create');
    closeModal();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className={`text-3xl mb-2 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>{title}</h1>
          <p className={isDarkMode ? 'text-white/60' : 'text-black/60'}>{description}</p>
        </div>
        <button onClick={openAddModal} className={`glass-card px-6 py-3 rounded-xl smooth-transition flex items-center gap-2 w-fit ${isDarkMode ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-white hover:from-cyan-500/30 hover:to-purple-500/30' : 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-black hover:from-cyan-500/30 hover:to-purple-500/30'}`}><Plus className="w-5 h-5" />Add Category</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-2xl"><div className="flex items-center gap-4"><div className="w-12 h-12 rounded-xl flex items-center justify-center bg-purple-500/20"><Tag className="w-6 h-6 text-purple-400" /></div><div><p className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>Total Categories</p><p className={`text-2xl ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>{resolvedCategories.length}</p></div></div></div>
        <div className="glass-card p-6 rounded-2xl"><div className="flex items-center gap-4"><div className="w-12 h-12 rounded-xl flex items-center justify-center bg-green-500/20"><Eye className="w-6 h-6 text-green-400" /></div><div><p className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>Active Categories</p><p className={`text-2xl ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>{activeCategories}</p></div></div></div>
        <div className="glass-card p-6 rounded-2xl"><div className="flex items-center gap-4"><div className="w-12 h-12 rounded-xl flex items-center justify-center bg-cyan-500/20"><BarChart3 className="w-6 h-6 text-cyan-400" /></div><div><p className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>Total Articles</p><p className={`text-2xl ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>{totalArticles}</p></div></div></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resolvedCategories.map((category) => {
          const colorOption = colorOptions.find((option) => option.value === category.color) ?? colorOptions[0];
          return (
            <div key={category.id} className={`glass-card rounded-2xl p-6 smooth-transition hover:scale-[1.02] ${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-black/5'} ${category.isActive ? '' : 'opacity-60'}`}>
              <div className="flex items-start justify-between mb-4">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl bg-gradient-to-br ${colorOption.class}`}>{category.icon}</div>
                <div className="flex items-center gap-1">
                  <button onClick={() => toggleCategory(category)} className={`p-2 rounded-lg smooth-transition ${category.isActive ? isDarkMode ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30' : 'bg-green-500/20 text-green-600 hover:bg-green-500/30' : isDarkMode ? 'bg-gray-500/20 text-gray-400 hover:bg-gray-500/30' : 'bg-gray-500/20 text-gray-600 hover:bg-gray-500/30'}`} title={category.isActive ? 'Hide category' : 'Show category'}>{category.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}</button>
                  <button onClick={() => openEditModal(category)} className={`p-2 rounded-lg smooth-transition ${isDarkMode ? 'hover:bg-cyan-500/20 text-white/60 hover:text-cyan-400' : 'hover:bg-cyan-500/20 text-black/60 hover:text-cyan-600'}`} title="Edit category"><Edit2 className="w-4 h-4" /></button>
                  <button onClick={() => deleteCategory(category)} className={`p-2 rounded-lg smooth-transition ${isDarkMode ? 'hover:bg-red-500/20 text-white/60 hover:text-red-400' : 'hover:bg-red-500/20 text-black/60 hover:text-red-600'}`} title="Delete category"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
              <h3 className={`text-xl mb-2 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>{category.name}</h3>
              <p className={`text-sm mb-4 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>{category.description}</p>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t" style={{ borderColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}>
                <div><p className={`text-xs mb-1 ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>Sources</p><p className={`text-lg ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>{category.sourcesCount}</p></div>
                <div><p className={`text-xs mb-1 ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>Articles</p><p className={`text-lg ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>{category.articlesCount}</p></div>
              </div>
              {category.isActive && <div className={`mt-4 px-3 py-1.5 rounded-lg text-xs text-center ${isDarkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-500/20 text-green-600'}`}>Active</div>}
            </div>
          );
        })}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className={`glass-card rounded-2xl p-8 w-full max-w-lg ${isDarkMode ? 'bg-[#0f0f19]/95' : 'bg-white/95'}`} style={{ backdropFilter: 'blur(40px)' }}>
            <h2 className={`text-2xl mb-6 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>{editingCategory ? 'Edit Category' : 'Add Category'}</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div><label className={`block text-sm mb-2 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>Category Name</label><input type="text" value={formData.name} onChange={(event) => setFormData({ ...formData, name: event.target.value })} className={`w-full px-4 py-3 rounded-xl smooth-transition ${isDarkMode ? 'bg-white/5 border border-white/10 text-white/90 placeholder-white/40 focus:bg-white/10 focus:border-cyan-500/50' : 'bg-black/5 border border-black/10 text-black/90 placeholder-black/40 focus:bg-black/10 focus:border-cyan-500/50'}`} placeholder="e.g., Technology" required /></div>
              <div><label className={`block text-sm mb-2 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>Icon (Emoji)</label><input type="text" value={formData.icon} onChange={(event) => setFormData({ ...formData, icon: event.target.value })} className={`w-full px-4 py-3 rounded-xl smooth-transition text-2xl text-center ${isDarkMode ? 'bg-white/5 border border-white/10 text-white/90 placeholder-white/40 focus:bg-white/10 focus:border-cyan-500/50' : 'bg-black/5 border border-black/10 text-black/90 placeholder-black/40 focus:bg-black/10 focus:border-cyan-500/50'}`} placeholder="📰" maxLength={2} required /></div>
              <div><label className={`block text-sm mb-2 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>Color</label><div className="grid grid-cols-4 gap-3">{colorOptions.map((color) => <button key={color.value} type="button" onClick={() => setFormData({ ...formData, color: color.value })} className={`h-12 rounded-xl smooth-transition bg-gradient-to-br ${color.class} ${formData.color === color.value ? 'ring-2 ring-white ring-offset-2 ring-offset-transparent scale-105' : 'opacity-60 hover:opacity-100'}`} title={color.name} />)}</div></div>
              <div><label className={`block text-sm mb-2 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>Description</label><textarea value={formData.description} onChange={(event) => setFormData({ ...formData, description: event.target.value })} className={`w-full px-4 py-3 rounded-xl smooth-transition resize-none ${isDarkMode ? 'bg-white/5 border border-white/10 text-white/90 placeholder-white/40 focus:bg-white/10 focus:border-cyan-500/50' : 'bg-black/5 border border-black/10 text-black/90 placeholder-black/40 focus:bg-black/10 focus:border-cyan-500/50'}`} placeholder="Brief description of this category..." rows={3} required /></div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={closeModal} className={`flex-1 px-6 py-3 rounded-xl smooth-transition ${isDarkMode ? 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white/90' : 'bg-black/5 text-black/70 hover:bg-black/10 hover:text-black/90'}`}>Cancel</button>
                <button type="submit" className="flex-1 px-6 py-3 rounded-xl smooth-transition bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:from-cyan-600 hover:to-purple-600">{editingCategory ? 'Update Category' : 'Add Category'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
