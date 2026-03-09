import { useState, type FormEvent } from 'react';
import { useTheme } from '../../app/contexts/ThemeContext';
import { Rss, Plus, Edit2, Trash2, ExternalLink, Check, X, Globe, RefreshCw, AlertCircle } from 'lucide-react';

export interface FeedSourceRecord {
  id: string;
  name: string;
  url: string;
  category: string;
  favicon: string;
  isActive: boolean;
  articleCount: number;
  lastUpdated: string;
}

export interface FeedSourceFormValues {
  name: string;
  url: string;
  category: string;
}

export interface FeedSourcesScreenProps {
  title?: string;
  description?: string;
  sources?: FeedSourceRecord[];
  defaultSources?: FeedSourceRecord[];
  categories?: string[];
  onSaveSource?: (source: FeedSourceRecord, mode: 'create' | 'edit') => void;
  onDeleteSource?: (source: FeedSourceRecord) => void;
  onToggleSource?: (source: FeedSourceRecord) => void;
  onRefreshSource?: (source: FeedSourceRecord) => void;
}

export const DEMO_FEED_SOURCES: FeedSourceRecord[] = [
  { id: '1', name: 'TechCrunch', url: 'https://techcrunch.com/feed/', category: 'Technology', favicon: 'https://techcrunch.com/favicon.ico', isActive: true, articleCount: 245, lastUpdated: '5 minutes ago' },
  { id: '2', name: 'The Guardian - Science', url: 'https://www.theguardian.com/science/rss', category: 'Science', favicon: 'https://www.theguardian.com/favicon.ico', isActive: true, articleCount: 189, lastUpdated: '12 minutes ago' },
  { id: '3', name: 'Bloomberg', url: 'https://www.bloomberg.com/feed/podcast/technology', category: 'Business', favicon: 'https://www.bloomberg.com/favicon.ico', isActive: true, articleCount: 156, lastUpdated: '1 hour ago' },
  { id: '4', name: 'Wired', url: 'https://www.wired.com/feed/rss', category: 'Technology', favicon: 'https://www.wired.com/favicon.ico', isActive: false, articleCount: 203, lastUpdated: '3 hours ago' },
  { id: '5', name: 'MIT Technology Review', url: 'https://www.technologyreview.com/feed/', category: 'Science', favicon: 'https://www.technologyreview.com/favicon.ico', isActive: true, articleCount: 98, lastUpdated: '2 hours ago' },
];

export const DEMO_FEED_SOURCE_CATEGORIES = ['Technology', 'Science', 'Business', 'World', 'Sports', 'Entertainment'];

export function FeedSourcesScreen({
  title = 'Feed Sources',
  description = 'Manage your RSS feed sources',
  sources,
  defaultSources = DEMO_FEED_SOURCES,
  categories = DEMO_FEED_SOURCE_CATEGORIES,
  onSaveSource,
  onDeleteSource,
  onToggleSource,
  onRefreshSource,
}: FeedSourcesScreenProps) {
  const { isDarkMode } = useTheme();
  const [internalSources, setInternalSources] = useState(defaultSources);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingSource, setEditingSource] = useState<FeedSourceRecord | null>(null);
  const [formData, setFormData] = useState<FeedSourceFormValues>({ name: '', url: '', category: categories[0] ?? 'Technology' });

  const resolvedSources = sources ?? internalSources;

  const openAddModal = () => {
    setFormData({ name: '', url: '', category: categories[0] ?? 'Technology' });
    setEditingSource(null);
    setShowAddModal(true);
  };

  const openEditModal = (source: FeedSourceRecord) => {
    setFormData({ name: source.name, url: source.url, category: source.category });
    setEditingSource(source);
    setShowAddModal(true);
  };

  const closeModal = () => {
    setShowAddModal(false);
    setEditingSource(null);
  };

  const updateLocalSources = (updater: (previous: FeedSourceRecord[]) => FeedSourceRecord[]) => {
    if (!sources) {
      setInternalSources(updater);
    }
  };

  const toggleSource = (target: FeedSourceRecord) => {
    updateLocalSources((previous) => previous.map((source) => source.id === target.id ? { ...source, isActive: !source.isActive } : source));
    onToggleSource?.(target);
  };

  const deleteSource = (target: FeedSourceRecord) => {
    updateLocalSources((previous) => previous.filter((source) => source.id !== target.id));
    onDeleteSource?.(target);
  };

  const refreshSource = (target: FeedSourceRecord) => {
    updateLocalSources((previous) => previous.map((source) => source.id === target.id ? { ...source, lastUpdated: 'Just now' } : source));
    onRefreshSource?.(target);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const nextSource: FeedSourceRecord = editingSource
      ? { ...editingSource, ...formData }
      : {
          id: Date.now().toString(),
          ...formData,
          favicon: `https://www.google.com/s2/favicons?domain=${formData.url}`,
          isActive: true,
          articleCount: 0,
          lastUpdated: 'Never',
        };

    updateLocalSources((previous) =>
      editingSource
        ? previous.map((source) => source.id === editingSource.id ? nextSource : source)
        : [...previous, nextSource],
    );
    onSaveSource?.(nextSource, editingSource ? 'edit' : 'create');
    closeModal();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className={`text-3xl mb-2 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>{title}</h1>
          <p className={isDarkMode ? 'text-white/60' : 'text-black/60'}>{description}</p>
        </div>
        <button onClick={openAddModal} className={`glass-card px-6 py-3 rounded-xl smooth-transition flex items-center gap-2 w-fit ${isDarkMode ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-white hover:from-cyan-500/30 hover:to-purple-500/30' : 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-black hover:from-cyan-500/30 hover:to-purple-500/30'}`}>
          <Plus className="w-5 h-5" />
          Add Feed Source
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-2xl"><div className="flex items-center gap-4"><div className="w-12 h-12 rounded-xl flex items-center justify-center bg-cyan-500/20"><Rss className="w-6 h-6 text-cyan-400" /></div><div><p className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>Total Sources</p><p className={`text-2xl ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>{resolvedSources.length}</p></div></div></div>
        <div className="glass-card p-6 rounded-2xl"><div className="flex items-center gap-4"><div className="w-12 h-12 rounded-xl flex items-center justify-center bg-green-500/20"><Check className="w-6 h-6 text-green-400" /></div><div><p className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>Active Sources</p><p className={`text-2xl ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>{resolvedSources.filter((source) => source.isActive).length}</p></div></div></div>
        <div className="glass-card p-6 rounded-2xl"><div className="flex items-center gap-4"><div className="w-12 h-12 rounded-xl flex items-center justify-center bg-purple-500/20"><Globe className="w-6 h-6 text-purple-400" /></div><div><p className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>Total Articles</p><p className={`text-2xl ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>{resolvedSources.reduce((acc, source) => acc + source.articleCount, 0)}</p></div></div></div>
      </div>

      <div className="space-y-4">
        {resolvedSources.map((source) => (
          <div key={source.id} className={`glass-card p-6 rounded-2xl smooth-transition ${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-black/5'}`}>
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              <div className="flex items-start gap-4 flex-1">
                <img src={source.favicon} alt={source.name} className="w-10 h-10 rounded-lg flex-shrink-0" onError={(event) => { (event.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"><rect width="40" height="40" fill="%23ccc"/></svg>'; }} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className={`text-lg ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>{source.name}</h3>
                    <span className={`px-2 py-0.5 rounded text-xs ${source.isActive ? isDarkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-500/20 text-green-600' : isDarkMode ? 'bg-gray-500/20 text-gray-400' : 'bg-gray-500/20 text-gray-600'}`}>{source.isActive ? 'Active' : 'Inactive'}</span>
                    <span className={`px-2 py-0.5 rounded text-xs ${isDarkMode ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-500/20 text-purple-600'}`}>{source.category}</span>
                  </div>
                  <p className={`text-sm mb-2 truncate ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>{source.url}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className={isDarkMode ? 'text-white/50' : 'text-black/50'}>{source.articleCount} articles</span>
                    <span className={isDarkMode ? 'text-white/40' : 'text-black/40'}>•</span>
                    <span className={isDarkMode ? 'text-white/50' : 'text-black/50'}>Updated {source.lastUpdated}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <button onClick={() => refreshSource(source)} className={`p-2.5 rounded-lg smooth-transition ${isDarkMode ? 'hover:bg-white/5 text-white/60 hover:text-white/90' : 'hover:bg-black/5 text-black/60 hover:text-black/90'}`} title="Refresh feed"><RefreshCw className="w-4 h-4" /></button>
                <a href={source.url} target="_blank" rel="noopener noreferrer" className={`p-2.5 rounded-lg smooth-transition ${isDarkMode ? 'hover:bg-white/5 text-white/60 hover:text-white/90' : 'hover:bg-black/5 text-black/60 hover:text-black/90'}`} title="Open feed URL"><ExternalLink className="w-4 h-4" /></a>
                <button onClick={() => openEditModal(source)} className={`p-2.5 rounded-lg smooth-transition ${isDarkMode ? 'hover:bg-cyan-500/20 text-white/60 hover:text-cyan-400' : 'hover:bg-cyan-500/20 text-black/60 hover:text-cyan-600'}`} title="Edit source"><Edit2 className="w-4 h-4" /></button>
                <button onClick={() => toggleSource(source)} className={`p-2.5 rounded-lg smooth-transition ${source.isActive ? isDarkMode ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30' : 'bg-green-500/20 text-green-600 hover:bg-green-500/30' : isDarkMode ? 'bg-gray-500/20 text-gray-400 hover:bg-gray-500/30' : 'bg-gray-500/20 text-gray-600 hover:bg-gray-500/30'}`} title={source.isActive ? 'Deactivate' : 'Activate'}>{source.isActive ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}</button>
                <button onClick={() => deleteSource(source)} className={`p-2.5 rounded-lg smooth-transition ${isDarkMode ? 'hover:bg-red-500/20 text-white/60 hover:text-red-400' : 'hover:bg-red-500/20 text-black/60 hover:text-red-600'}`} title="Delete source"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className={`glass-card rounded-2xl p-8 w-full max-w-lg ${isDarkMode ? 'bg-[#0f0f19]/95' : 'bg-white/95'}`} style={{ backdropFilter: 'blur(40px)' }}>
            <h2 className={`text-2xl mb-6 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>{editingSource ? 'Edit Feed Source' : 'Add Feed Source'}</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div><label className={`block text-sm mb-2 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>Source Name</label><input type="text" value={formData.name} onChange={(event) => setFormData({ ...formData, name: event.target.value })} className={`w-full px-4 py-3 rounded-xl smooth-transition ${isDarkMode ? 'bg-white/5 border border-white/10 text-white/90 placeholder-white/40 focus:bg-white/10 focus:border-cyan-500/50' : 'bg-black/5 border border-black/10 text-black/90 placeholder-black/40 focus:bg-black/10 focus:border-cyan-500/50'}`} placeholder="e.g., TechCrunch" required /></div>
              <div><label className={`block text-sm mb-2 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>RSS Feed URL</label><input type="url" value={formData.url} onChange={(event) => setFormData({ ...formData, url: event.target.value })} className={`w-full px-4 py-3 rounded-xl smooth-transition ${isDarkMode ? 'bg-white/5 border border-white/10 text-white/90 placeholder-white/40 focus:bg-white/10 focus:border-cyan-500/50' : 'bg-black/5 border border-black/10 text-black/90 placeholder-black/40 focus:bg-black/10 focus:border-cyan-500/50'}`} placeholder="https://example.com/feed/rss" required /></div>
              <div><label className={`block text-sm mb-2 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>Category</label><select value={formData.category} onChange={(event) => setFormData({ ...formData, category: event.target.value })} className={`w-full px-4 py-3 rounded-xl smooth-transition ${isDarkMode ? 'bg-white/5 border border-white/10 text-white/90 focus:bg-white/10 focus:border-cyan-500/50' : 'bg-black/5 border border-black/10 text-black/90 focus:bg-black/10 focus:border-cyan-500/50'}`}>{categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}</select></div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={closeModal} className={`flex-1 px-6 py-3 rounded-xl smooth-transition ${isDarkMode ? 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white/90' : 'bg-black/5 text-black/70 hover:bg-black/10 hover:text-black/90'}`}>Cancel</button>
                <button type="submit" className="flex-1 px-6 py-3 rounded-xl smooth-transition bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:from-cyan-600 hover:to-purple-600">{editingSource ? 'Update Source' : 'Add Source'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {resolvedSources.length === 0 && (
        <div className="glass-card rounded-2xl p-12 text-center">
          <AlertCircle className={`w-16 h-16 mx-auto mb-4 ${isDarkMode ? 'text-white/20' : 'text-black/20'}`} />
          <h3 className={`text-xl mb-2 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>No feed sources yet</h3>
          <p className={`mb-6 ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>Add your first RSS feed source to get started</p>
          <button onClick={openAddModal} className="px-6 py-3 rounded-xl smooth-transition bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:from-cyan-600 hover:to-purple-600"><Plus className="w-5 h-5 inline-block mr-2" />Add Feed Source</button>
        </div>
      )}
    </div>
  );
}
