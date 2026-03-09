import { useState } from 'react';
import { useTheme } from '../../app/contexts/ThemeContext';
import { Bookmark, Search, Grid3x3, List, Clock, ExternalLink, Trash2, FolderOpen, Filter } from 'lucide-react';

export interface SavedArticle {
  id: string;
  title: string;
  excerpt: string;
  thumbnail: string;
  source: {
    name: string;
    favicon: string;
  };
  category: string;
  tags: string[];
  publishedAt: string;
  savedAt: string;
  url: string;
  collection?: string;
}

export interface SavedArticlesScreenProps {
  title?: string;
  articles?: SavedArticle[];
  defaultArticles?: SavedArticle[];
  defaultViewMode?: 'grid' | 'list';
  onRemoveArticle?: (article: SavedArticle) => void;
}

export const DEMO_SAVED_ARTICLES: SavedArticle[] = [
  { id: '2', title: 'Climate Change: New Research Shows Alarming Trends', excerpt: 'Latest climate models reveal accelerating warming patterns, prompting urgent calls for global action and sustainable policy changes.', thumbnail: 'https://images.unsplash.com/photo-1569163139394-de4798aa62b6?w=800&h=450&fit=crop', source: { name: 'The Guardian', favicon: 'https://www.theguardian.com/favicon.ico' }, category: 'Science', tags: ['Climate', 'Environment', 'Research'], publishedAt: '4 hours ago', savedAt: '2 hours ago', url: '#', collection: 'Research' },
  { id: '5', title: 'SpaceX Successfully Launches New Satellite Constellation', excerpt: 'Another successful mission adds 60 satellites to the growing network, expanding global internet coverage to remote areas.', thumbnail: 'https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=800&h=450&fit=crop', source: { name: 'Space.com', favicon: 'https://www.space.com/favicon.ico' }, category: 'Science', tags: ['Space', 'SpaceX', 'Technology'], publishedAt: '12 hours ago', savedAt: '10 hours ago', url: '#', collection: 'Space' },
  { id: '9', title: 'Breakthrough in Gene Therapy Shows Promise for Rare Diseases', excerpt: 'New CRISPR technique allows precise editing of genetic mutations, offering hope for patients with previously untreatable conditions.', thumbnail: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&h=450&fit=crop', source: { name: 'Nature', favicon: 'https://www.nature.com/favicon.ico' }, category: 'Science', tags: ['Genetics', 'Medicine', 'CRISPR'], publishedAt: '1 day ago', savedAt: '1 day ago', url: '#', collection: 'Research' },
  { id: '10', title: 'The Future of Remote Work: Hybrid Models Gain Traction', excerpt: 'Companies worldwide adopt flexible work policies as studies show increased productivity and employee satisfaction.', thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=450&fit=crop', source: { name: 'Forbes', favicon: 'https://www.forbes.com/favicon.ico' }, category: 'Business', tags: ['Remote Work', 'Productivity', 'Workplace'], publishedAt: '2 days ago', savedAt: '2 days ago', url: '#' },
];

export function SavedArticlesScreen({
  title = 'Saved Articles',
  articles,
  defaultArticles = DEMO_SAVED_ARTICLES,
  defaultViewMode = 'grid',
  onRemoveArticle,
}: SavedArticlesScreenProps) {
  const { isDarkMode } = useTheme();
  const [internalArticles, setInternalArticles] = useState(defaultArticles);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>(defaultViewMode);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCollection, setSelectedCollection] = useState<string>('All');
  const resolvedArticles = articles ?? internalArticles;
  const collections = ['All', ...new Set(resolvedArticles.filter((article) => article.collection).map((article) => article.collection!))];

  const removeSaved = (article: SavedArticle) => {
    if (!articles) setInternalArticles((previous) => previous.filter((item) => item.id !== article.id));
    onRemoveArticle?.(article);
  };

  const filteredArticles = resolvedArticles.filter((article) => {
    const matchesCollection = selectedCollection === 'All' || article.collection === selectedCollection;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCollection && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className={`text-3xl mb-2 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>{title}</h1>
          <p className={isDarkMode ? 'text-white/60' : 'text-black/60'}>{resolvedArticles.length} bookmarked article{resolvedArticles.length !== 1 ? 's' : ''}</p>
        </div>
        <div className="flex items-center gap-2 glass-card p-1.5 rounded-xl w-fit">
          <button onClick={() => setViewMode('list')} className={`p-2.5 rounded-lg smooth-transition ${viewMode === 'list' ? isDarkMode ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-500/20 text-purple-600' : isDarkMode ? 'text-white/60 hover:text-white/90 hover:bg-white/5' : 'text-black/60 hover:text-black/90 hover:bg-black/5'}`} title="List View"><List className="w-5 h-5" /></button>
          <button onClick={() => setViewMode('grid')} className={`p-2.5 rounded-lg smooth-transition ${viewMode === 'grid' ? isDarkMode ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-500/20 text-purple-600' : isDarkMode ? 'text-white/60 hover:text-white/90 hover:bg-white/5' : 'text-black/60 hover:text-black/90 hover:bg-black/5'}`} title="Grid View"><Grid3x3 className="w-5 h-5" /></button>
        </div>
      </div>

      <div className="glass-card p-6 rounded-2xl space-y-4">
        <div className="relative">
          <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isDarkMode ? 'text-white/40' : 'text-black/40'}`} />
          <input type="text" placeholder="Search saved articles..." value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} className={`w-full pl-12 pr-4 py-3 rounded-xl smooth-transition ${isDarkMode ? 'bg-white/5 border border-white/10 text-white/90 placeholder-white/40 focus:bg-white/10 focus:border-purple-500/50' : 'bg-black/5 border border-black/10 text-black/90 placeholder-black/40 focus:bg-black/10 focus:border-purple-500/50'}`} />
        </div>
        <div className="flex flex-wrap gap-2">
          {collections.map((collection) => (
            <button key={collection} onClick={() => setSelectedCollection(collection)} className={`px-4 py-2 rounded-lg text-sm smooth-transition ${selectedCollection === collection ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : isDarkMode ? 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white/90 border border-white/10' : 'bg-black/5 text-black/70 hover:bg-black/10 hover:text-black/90 border border-black/10'}`}>
              <FolderOpen className="w-3.5 h-3.5 inline-block mr-1.5" />
              {collection}
            </button>
          ))}
        </div>
      </div>

      <div className={`flex items-center gap-2 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}><Filter className="w-4 h-4" /><span className="text-sm">{filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''} found</span></div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <div key={article.id} className={`glass-card rounded-2xl overflow-hidden smooth-transition hover:scale-[1.02] ${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-black/5'}`}>
              <div className="w-full h-48 overflow-hidden relative"><img src={article.thumbnail} alt={article.title} className="w-full h-full object-cover" /><div className="absolute top-3 right-3"><span className="px-2 py-1 rounded-lg text-xs backdrop-blur-md bg-purple-500/40 text-white"><Bookmark className="w-3 h-3 inline-block mr-1 fill-current" />Saved</span></div></div>
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2"><img src={article.source.favicon} alt={article.source.name} className="w-4 h-4" onError={(event) => { (event.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"><rect width="16" height="16" fill="%23ccc"/></svg>'; }} /><span className={`text-xs ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>{article.source.name}</span></div>
                  {article.collection && <span className={`px-2 py-0.5 rounded-md text-xs ${isDarkMode ? 'bg-cyan-500/20 text-cyan-400' : 'bg-cyan-500/20 text-cyan-600'}`}>{article.collection}</span>}
                </div>
                <h3 className={`text-lg font-normal line-clamp-2 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>{article.title}</h3>
                <p className={`text-sm line-clamp-3 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>{article.excerpt}</p>
                <div className="flex flex-wrap gap-1.5">{article.tags.slice(0, 3).map((tag) => <span key={tag} className={`px-2 py-0.5 rounded text-xs ${isDarkMode ? 'bg-white/5 text-white/60' : 'bg-black/5 text-black/60'}`}>#{tag}</span>)}</div>
                <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}>
                  <div className="flex items-center gap-1.5"><Clock className={`w-3.5 h-3.5 ${isDarkMode ? 'text-white/50' : 'text-black/50'}`} /><span className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>Saved {article.savedAt}</span></div>
                  <div className="flex items-center gap-1">
                    <a href={article.url} target="_blank" rel="noopener noreferrer" className={`p-1.5 rounded-lg smooth-transition ${isDarkMode ? 'hover:bg-white/5 text-white/60 hover:text-white/90' : 'hover:bg-black/5 text-black/60 hover:text-black/90'}`}><ExternalLink className="w-4 h-4" /></a>
                    <button onClick={() => removeSaved(article)} className={`p-1.5 rounded-lg smooth-transition ${isDarkMode ? 'hover:bg-red-500/20 text-white/60 hover:text-red-400' : 'hover:bg-red-500/20 text-black/60 hover:text-red-600'}`}><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredArticles.map((article) => (
            <div key={article.id} className={`glass-card rounded-2xl overflow-hidden smooth-transition hover:scale-[1.01] ${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-black/5'}`}>
              <div className="flex flex-col sm:flex-row gap-4 p-6">
                <div className="sm:w-48 sm:h-32 w-full h-48 flex-shrink-0 rounded-xl overflow-hidden relative"><img src={article.thumbnail} alt={article.title} className="w-full h-full object-cover" /><div className="absolute top-2 right-2"><span className="px-2 py-1 rounded-lg text-xs backdrop-blur-md bg-purple-500/40 text-white"><Bookmark className="w-3 h-3 inline-block fill-current" /></span></div></div>
                <div className="flex-1 flex flex-col gap-3">
                  <div className="flex items-center gap-3 flex-wrap"><div className="flex items-center gap-2"><img src={article.source.favicon} alt={article.source.name} className="w-4 h-4" onError={(event) => { (event.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"><rect width="16" height="16" fill="%23ccc"/></svg>'; }} /><span className={`text-sm ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>{article.source.name}</span></div><span className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>•</span><span className={`text-sm ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>Saved {article.savedAt}</span>{article.collection ? <><span className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>•</span><span className={`px-2 py-0.5 rounded-md text-xs ${isDarkMode ? 'bg-cyan-500/20 text-cyan-400' : 'bg-cyan-500/20 text-cyan-600'}`}>{article.collection}</span></> : null}</div>
                  <h3 className={`text-xl font-normal ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>{article.title}</h3>
                  <p className={`text-sm line-clamp-2 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>{article.excerpt}</p>
                  <div className="flex items-center justify-between gap-4 mt-auto">
                    <div className="flex flex-wrap gap-2">{article.tags.map((tag) => <span key={tag} className={`px-2 py-1 rounded text-xs ${isDarkMode ? 'bg-white/5 text-white/60' : 'bg-black/5 text-black/60'}`}>#{tag}</span>)}</div>
                    <div className="flex items-center gap-2">
                      <a href={article.url} target="_blank" rel="noopener noreferrer" className={`p-2 rounded-lg smooth-transition ${isDarkMode ? 'hover:bg-white/5 text-white/60 hover:text-white/90' : 'hover:bg-black/5 text-black/60 hover:text-black/90'}`}><ExternalLink className="w-4 h-4" /></a>
                      <button onClick={() => removeSaved(article)} className={`p-2 rounded-lg smooth-transition ${isDarkMode ? 'hover:bg-red-500/20 text-white/60 hover:text-red-400' : 'hover:bg-red-500/20 text-black/60 hover:text-red-600'}`}><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredArticles.length === 0 && (
        <div className="glass-card rounded-2xl p-12 text-center">
          <Bookmark className={`w-16 h-16 mx-auto mb-4 ${isDarkMode ? 'text-white/20' : 'text-black/20'}`} />
          <h3 className={`text-xl mb-2 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>No saved articles</h3>
          <p className={isDarkMode ? 'text-white/50' : 'text-black/50'}>{searchQuery || selectedCollection !== 'All' ? 'Try adjusting your filters or search query' : 'Bookmark articles from the newsfeed to save them here'}</p>
        </div>
      )}
    </div>
  );
}
