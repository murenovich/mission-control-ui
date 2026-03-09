import type { SyntheticEvent } from 'react';
import { useMemo, useState } from 'react';
import { useTheme } from '../../app/contexts/ThemeContext';
import {
  Bookmark,
  Clock,
  ExternalLink,
  Filter,
  Grid3x3,
  LayoutGrid,
  List,
  Newspaper,
  Search,
} from 'lucide-react';

export interface NewsfeedArticle {
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
  url: string;
  isBookmarked: boolean;
}

export type NewsfeedViewMode = 'list' | 'grid' | 'gallery';

export interface NewsfeedScreenProps {
  title?: string;
  description?: string;
  articles?: NewsfeedArticle[];
  defaultArticles?: NewsfeedArticle[];
  categories?: string[];
  defaultViewMode?: NewsfeedViewMode;
  defaultSelectedCategory?: string;
  onBookmarkToggle?: (article: NewsfeedArticle) => void;
}

export const DEMO_NEWSFEED_ARTICLES: NewsfeedArticle[] = [
  {
    id: '1',
    title: 'The Future of Artificial Intelligence in Healthcare',
    excerpt:
      'AI is revolutionizing medical diagnostics and patient care with breakthrough technologies that promise to transform healthcare delivery worldwide.',
    thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=450&fit=crop',
    source: {
      name: 'TechCrunch',
      favicon: 'https://techcrunch.com/favicon.ico',
    },
    category: 'Technology',
    tags: ['AI', 'Healthcare', 'Innovation'],
    publishedAt: '2 hours ago',
    url: '#',
    isBookmarked: false,
  },
  {
    id: '2',
    title: 'Climate Change: New Research Shows Alarming Trends',
    excerpt:
      'Latest climate models reveal accelerating warming patterns, prompting urgent calls for global action and sustainable policy changes.',
    thumbnail: 'https://images.unsplash.com/photo-1569163139394-de4798aa62b6?w=800&h=450&fit=crop',
    source: {
      name: 'The Guardian',
      favicon: 'https://www.theguardian.com/favicon.ico',
    },
    category: 'Science',
    tags: ['Climate', 'Environment', 'Research'],
    publishedAt: '4 hours ago',
    url: '#',
    isBookmarked: true,
  },
  {
    id: '3',
    title: 'Stock Markets Rally on Strong Economic Data',
    excerpt:
      'Global markets surge as investors respond to positive employment figures and corporate earnings that exceed analyst expectations.',
    thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=450&fit=crop',
    source: {
      name: 'Bloomberg',
      favicon: 'https://www.bloomberg.com/favicon.ico',
    },
    category: 'Business',
    tags: ['Finance', 'Markets', 'Economy'],
    publishedAt: '6 hours ago',
    url: '#',
    isBookmarked: false,
  },
  {
    id: '4',
    title: 'Revolutionary Battery Technology Could Transform EVs',
    excerpt:
      'New solid-state battery breakthrough promises 500-mile range and 10-minute charging times for electric vehicles.',
    thumbnail: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&h=450&fit=crop',
    source: {
      name: 'Wired',
      favicon: 'https://www.wired.com/favicon.ico',
    },
    category: 'Technology',
    tags: ['EV', 'Battery', 'Innovation'],
    publishedAt: '8 hours ago',
    url: '#',
    isBookmarked: false,
  },
  {
    id: '5',
    title: 'SpaceX Successfully Launches New Satellite Constellation',
    excerpt:
      'Another successful mission adds 60 satellites to the growing network, expanding global internet coverage to remote areas.',
    thumbnail: 'https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=800&h=450&fit=crop',
    source: {
      name: 'Space.com',
      favicon: 'https://www.space.com/favicon.ico',
    },
    category: 'Science',
    tags: ['Space', 'SpaceX', 'Technology'],
    publishedAt: '12 hours ago',
    url: '#',
    isBookmarked: true,
  },
  {
    id: '6',
    title: 'Cybersecurity Threats Evolve with AI-Powered Attacks',
    excerpt:
      'Security experts warn of sophisticated new malware using machine learning to evade detection and exploit vulnerabilities.',
    thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=450&fit=crop',
    source: {
      name: 'Ars Technica',
      favicon: 'https://arstechnica.com/favicon.ico',
    },
    category: 'Technology',
    tags: ['Cybersecurity', 'AI', 'Security'],
    publishedAt: '1 day ago',
    url: '#',
    isBookmarked: false,
  },
  {
    id: '7',
    title: 'Major Breakthrough in Quantum Computing Announced',
    excerpt:
      'Researchers achieve quantum supremacy milestone, solving complex problems that would take classical computers millennia.',
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=450&fit=crop',
    source: {
      name: 'MIT Technology Review',
      favicon: 'https://www.technologyreview.com/favicon.ico',
    },
    category: 'Science',
    tags: ['Quantum', 'Computing', 'Research'],
    publishedAt: '1 day ago',
    url: '#',
    isBookmarked: false,
  },
  {
    id: '8',
    title: 'Global Food Crisis Intensifies Amid Supply Chain Issues',
    excerpt:
      'Rising prices and shortages affect millions as climate events and geopolitical tensions disrupt agricultural production.',
    thumbnail: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=800&h=450&fit=crop',
    source: {
      name: 'Reuters',
      favicon: 'https://www.reuters.com/favicon.ico',
    },
    category: 'World',
    tags: ['Food', 'Crisis', 'Global'],
    publishedAt: '2 days ago',
    url: '#',
    isBookmarked: false,
  },
];

function fallbackFavicon(event: SyntheticEvent<HTMLImageElement>) {
  event.currentTarget.src =
    'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"><rect width="16" height="16" fill="%23ccc"/></svg>';
}

export function NewsfeedScreen({
  title = 'Newsfeed',
  description = 'Your personalized RSS news aggregator',
  articles,
  defaultArticles = DEMO_NEWSFEED_ARTICLES,
  categories,
  defaultViewMode = 'grid',
  defaultSelectedCategory = 'All',
  onBookmarkToggle,
}: NewsfeedScreenProps) {
  const { isDarkMode } = useTheme();
  const [viewMode, setViewMode] = useState<NewsfeedViewMode>(defaultViewMode);
  const [selectedCategory, setSelectedCategory] = useState(defaultSelectedCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [internalArticles, setInternalArticles] = useState(defaultArticles);

  const resolvedArticles = articles ?? internalArticles;
  const resolvedCategories = useMemo(() => {
    if (categories && categories.length > 0) {
      return categories;
    }

    const uniqueCategories = Array.from(new Set(resolvedArticles.map((article) => article.category)));
    return ['All', ...uniqueCategories];
  }, [categories, resolvedArticles]);

  const toggleBookmark = (id: string) => {
    const article = resolvedArticles.find((candidate) => candidate.id === id);
    if (!article) {
      return;
    }

    onBookmarkToggle?.(article);

    if (!articles) {
      setInternalArticles((previousArticles) =>
        previousArticles.map((candidate) =>
          candidate.id === id
            ? { ...candidate, isBookmarked: !candidate.isBookmarked }
            : candidate,
        ),
      );
    }
  };

  const filteredArticles = resolvedArticles.filter((article) => {
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className={`text-3xl mb-2 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>{title}</h1>
          <p className={isDarkMode ? 'text-white/60' : 'text-black/60'}>{description}</p>
        </div>

        <div className="flex items-center gap-2 glass-card p-1.5 rounded-xl w-fit">
          <button
            onClick={() => setViewMode('list')}
            className={`p-2.5 rounded-lg smooth-transition ${
              viewMode === 'list'
                ? isDarkMode
                  ? 'bg-cyan-500/20 text-cyan-400'
                  : 'bg-cyan-500/20 text-cyan-600'
                : isDarkMode
                ? 'text-white/60 hover:text-white/90 hover:bg-white/5'
                : 'text-black/60 hover:text-black/90 hover:bg-black/5'
            }`}
            title="List View"
          >
            <List className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2.5 rounded-lg smooth-transition ${
              viewMode === 'grid'
                ? isDarkMode
                  ? 'bg-cyan-500/20 text-cyan-400'
                  : 'bg-cyan-500/20 text-cyan-600'
                : isDarkMode
                ? 'text-white/60 hover:text-white/90 hover:bg-white/5'
                : 'text-black/60 hover:text-black/90 hover:bg-black/5'
            }`}
            title="Grid View"
          >
            <Grid3x3 className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('gallery')}
            className={`p-2.5 rounded-lg smooth-transition ${
              viewMode === 'gallery'
                ? isDarkMode
                  ? 'bg-cyan-500/20 text-cyan-400'
                  : 'bg-cyan-500/20 text-cyan-600'
                : isDarkMode
                ? 'text-white/60 hover:text-white/90 hover:bg-white/5'
                : 'text-black/60 hover:text-black/90 hover:bg-black/5'
            }`}
            title="Gallery View"
          >
            <LayoutGrid className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="glass-card p-6 rounded-2xl space-y-4">
        <div className="relative">
          <Search
            className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}
          />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className={`w-full pl-12 pr-4 py-3 rounded-xl smooth-transition ${
              isDarkMode
                ? 'bg-white/5 border border-white/10 text-white/90 placeholder-white/40 focus:bg-white/10 focus:border-cyan-500/50'
                : 'bg-black/5 border border-black/10 text-black/90 placeholder-black/40 focus:bg-black/10 focus:border-cyan-500/50'
            }`}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {resolvedCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm smooth-transition ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                  : isDarkMode
                  ? 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white/90 border border-white/10'
                  : 'bg-black/5 text-black/70 hover:bg-black/10 hover:text-black/90 border border-black/10'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className={`flex items-center gap-2 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
        <Filter className="w-4 h-4" />
        <span className="text-sm">
          {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''} found
        </span>
      </div>

      {viewMode === 'list' && (
        <div className="space-y-4">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              className={`glass-card rounded-2xl overflow-hidden smooth-transition hover:scale-[1.01] ${
                isDarkMode ? 'hover:bg-white/5' : 'hover:bg-black/5'
              }`}
            >
              <div className="flex flex-col sm:flex-row gap-4 p-6">
                <div className="sm:w-48 sm:h-32 w-full h-48 flex-shrink-0 rounded-xl overflow-hidden">
                  <img src={article.thumbnail} alt={article.title} className="w-full h-full object-cover" />
                </div>

                <div className="flex-1 flex flex-col gap-3">
                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="flex items-center gap-2">
                      <img
                        src={article.source.favicon}
                        alt={article.source.name}
                        className="w-4 h-4"
                        onError={fallbackFavicon}
                      />
                      <span className={`text-sm ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
                        {article.source.name}
                      </span>
                    </div>
                    <span className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>•</span>
                    <div className="flex items-center gap-1.5">
                      <Clock className={`w-3.5 h-3.5 ${isDarkMode ? 'text-white/50' : 'text-black/50'}`} />
                      <span className={`text-sm ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
                        {article.publishedAt}
                      </span>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded-md text-xs ${
                        isDarkMode ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-500/20 text-purple-600'
                      }`}
                    >
                      {article.category}
                    </span>
                  </div>

                  <h3 className={`text-xl font-normal ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
                    {article.title}
                  </h3>

                  <p className={`text-sm line-clamp-2 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                    {article.excerpt}
                  </p>

                  <div className="flex items-center justify-between gap-4 mt-auto">
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`px-2 py-1 rounded text-xs ${
                            isDarkMode ? 'bg-white/5 text-white/60' : 'bg-black/5 text-black/60'
                          }`}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleBookmark(article.id)}
                        aria-label={
                          article.isBookmarked
                            ? `Remove bookmark for ${article.title}`
                            : `Bookmark ${article.title}`
                        }
                        className={`p-2 rounded-lg smooth-transition ${
                          article.isBookmarked
                            ? isDarkMode
                              ? 'bg-orange-500/20 text-orange-400'
                              : 'bg-orange-500/20 text-orange-600'
                            : isDarkMode
                            ? 'hover:bg-white/5 text-white/60 hover:text-white/90'
                            : 'hover:bg-black/5 text-black/60 hover:text-black/90'
                        }`}
                      >
                        <Bookmark className={`w-4 h-4 ${article.isBookmarked ? 'fill-current' : ''}`} />
                      </button>
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2 rounded-lg smooth-transition ${
                          isDarkMode
                            ? 'hover:bg-white/5 text-white/60 hover:text-white/90'
                            : 'hover:bg-black/5 text-black/60 hover:text-black/90'
                        }`}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              className={`glass-card rounded-2xl overflow-hidden smooth-transition hover:scale-[1.02] ${
                isDarkMode ? 'hover:bg-white/5' : 'hover:bg-black/5'
              }`}
            >
              <div className="w-full h-48 overflow-hidden">
                <img src={article.thumbnail} alt={article.title} className="w-full h-full object-cover" />
              </div>

              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <img
                      src={article.source.favicon}
                      alt={article.source.name}
                      className="w-4 h-4"
                      onError={fallbackFavicon}
                    />
                    <span className={`text-xs ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
                      {article.source.name}
                    </span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-md text-xs ${
                      isDarkMode ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-500/20 text-purple-600'
                    }`}
                  >
                    {article.category}
                  </span>
                </div>

                <h3 className={`text-lg font-normal line-clamp-2 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
                  {article.title}
                </h3>

                <p className={`text-sm line-clamp-3 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                  {article.excerpt}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-2 py-0.5 rounded text-xs ${
                        isDarkMode ? 'bg-white/5 text-white/60' : 'bg-black/5 text-black/60'
                      }`}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div
                  className="flex items-center justify-between pt-3 border-t"
                  style={{
                    borderColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                  }}
                >
                  <div className="flex items-center gap-1.5">
                    <Clock className={`w-3.5 h-3.5 ${isDarkMode ? 'text-white/50' : 'text-black/50'}`} />
                    <span className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
                      {article.publishedAt}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => toggleBookmark(article.id)}
                      aria-label={
                        article.isBookmarked
                          ? `Remove bookmark for ${article.title}`
                          : `Bookmark ${article.title}`
                      }
                      className={`p-1.5 rounded-lg smooth-transition ${
                        article.isBookmarked
                          ? isDarkMode
                            ? 'bg-orange-500/20 text-orange-400'
                            : 'bg-orange-500/20 text-orange-600'
                          : isDarkMode
                          ? 'hover:bg-white/5 text-white/60 hover:text-white/90'
                          : 'hover:bg-black/5 text-black/60 hover:text-black/90'
                      }`}
                    >
                      <Bookmark className={`w-4 h-4 ${article.isBookmarked ? 'fill-current' : ''}`} />
                    </button>
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-1.5 rounded-lg smooth-transition ${
                        isDarkMode
                          ? 'hover:bg-white/5 text-white/60 hover:text-white/90'
                          : 'hover:bg-black/5 text-black/60 hover:text-black/90'
                      }`}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {viewMode === 'gallery' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              className={`glass-card rounded-2xl overflow-hidden smooth-transition hover:scale-[1.01] ${
                isDarkMode ? 'hover:bg-white/5' : 'hover:bg-black/5'
              }`}
            >
              <div className="w-full h-80 overflow-hidden relative">
                <img src={article.thumbnail} alt={article.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3">
                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-lg">
                      <img
                        src={article.source.favicon}
                        alt={article.source.name}
                        className="w-4 h-4"
                        onError={fallbackFavicon}
                      />
                      <span className="text-sm text-white/90">{article.source.name}</span>
                    </div>
                    <span className="px-2 py-1 rounded-md text-xs bg-purple-500/40 text-white backdrop-blur-md">
                      {article.category}
                    </span>
                  </div>

                  <h3 className="text-2xl font-normal text-white/95">{article.title}</h3>
                </div>
              </div>

              <div className="p-5 space-y-3">
                <p className={`text-sm line-clamp-2 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                  {article.excerpt}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-2 py-1 rounded text-xs ${
                        isDarkMode ? 'bg-white/5 text-white/60' : 'bg-black/5 text-black/60'
                      }`}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div
                  className="flex items-center justify-between pt-3 border-t"
                  style={{
                    borderColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                  }}
                >
                  <div className="flex items-center gap-1.5">
                    <Clock className={`w-3.5 h-3.5 ${isDarkMode ? 'text-white/50' : 'text-black/50'}`} />
                    <span className={`text-sm ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
                      {article.publishedAt}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleBookmark(article.id)}
                      aria-label={
                        article.isBookmarked
                          ? `Remove bookmark for ${article.title}`
                          : `Bookmark ${article.title}`
                      }
                      className={`p-2 rounded-lg smooth-transition ${
                        article.isBookmarked
                          ? isDarkMode
                            ? 'bg-orange-500/20 text-orange-400'
                            : 'bg-orange-500/20 text-orange-600'
                          : isDarkMode
                          ? 'hover:bg-white/5 text-white/60 hover:text-white/90'
                          : 'hover:bg-black/5 text-black/60 hover:text-black/90'
                      }`}
                    >
                      <Bookmark className={`w-4 h-4 ${article.isBookmarked ? 'fill-current' : ''}`} />
                    </button>
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2 rounded-lg smooth-transition ${
                        isDarkMode
                          ? 'hover:bg-white/5 text-white/60 hover:text-white/90'
                          : 'hover:bg-black/5 text-black/60 hover:text-black/90'
                      }`}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredArticles.length === 0 && (
        <div className="glass-card rounded-2xl p-12 text-center">
          <Newspaper className={`w-16 h-16 mx-auto mb-4 ${isDarkMode ? 'text-white/20' : 'text-black/20'}`} />
          <h3 className={`text-xl mb-2 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
            No articles found
          </h3>
          <p className={isDarkMode ? 'text-white/50' : 'text-black/50'}>
            Try adjusting your search terms or category filters
          </p>
        </div>
      )}
    </div>
  );
}
