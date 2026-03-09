import { useState } from 'react';
import { useTheme } from '../../app/contexts/ThemeContext';
import { Flame, Eye, MessageCircle, Share2, ExternalLink, Bookmark, Clock, ChevronUp, ChevronDown } from 'lucide-react';

export interface TrendingArticleRecord {
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
  trending: {
    rank: number;
    rankChange: number;
    views: number;
    shares: number;
    comments: number;
    trendingScore: number;
  };
}

export type TrendingTimeFilter = '1h' | '6h' | '24h' | '7d';

export interface TrendingScreenProps {
  title?: string;
  description?: string;
  articles?: TrendingArticleRecord[];
  defaultArticles?: TrendingArticleRecord[];
  defaultTimeFilter?: TrendingTimeFilter;
  onBookmarkToggle?: (article: TrendingArticleRecord) => void;
}

export const DEMO_TRENDING_ARTICLES: TrendingArticleRecord[] = [
  { id: '1', title: 'Major Breakthrough in Quantum Computing Announced', excerpt: 'Researchers achieve quantum supremacy milestone, solving complex problems that would take classical computers millennia.', thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=450&fit=crop', source: { name: 'MIT Technology Review', favicon: 'https://www.technologyreview.com/favicon.ico' }, category: 'Science', tags: ['Quantum', 'Computing', 'Research'], publishedAt: '3 hours ago', url: '#', isBookmarked: false, trending: { rank: 1, rankChange: 3, views: 125400, shares: 8920, comments: 1240, trendingScore: 98.5 } },
  { id: '2', title: 'AI Model Beats Human Doctors in Diagnostic Accuracy', excerpt: 'New deep learning system achieves 95% accuracy in detecting early-stage diseases from medical imaging.', thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=450&fit=crop', source: { name: 'Nature Medicine', favicon: 'https://www.nature.com/favicon.ico' }, category: 'Technology', tags: ['AI', 'Healthcare', 'Medicine'], publishedAt: '5 hours ago', url: '#', isBookmarked: true, trending: { rank: 2, rankChange: 1, views: 98700, shares: 6540, comments: 892, trendingScore: 94.2 } },
  { id: '3', title: 'Global Markets Rally on Unexpected Economic Data', excerpt: 'Stock indices surge worldwide as employment figures and corporate earnings exceed all analyst expectations.', thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=450&fit=crop', source: { name: 'Bloomberg', favicon: 'https://www.bloomberg.com/favicon.ico' }, category: 'Business', tags: ['Finance', 'Markets', 'Economy'], publishedAt: '2 hours ago', url: '#', isBookmarked: false, trending: { rank: 3, rankChange: -1, views: 87600, shares: 5230, comments: 1567, trendingScore: 89.8 } },
  { id: '4', title: 'Revolutionary Battery Technology Promises 1000-Mile Range', excerpt: 'Solid-state battery breakthrough could eliminate range anxiety for electric vehicles within five years.', thumbnail: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&h=450&fit=crop', source: { name: 'TechCrunch', favicon: 'https://techcrunch.com/favicon.ico' }, category: 'Technology', tags: ['EV', 'Battery', 'Innovation'], publishedAt: '6 hours ago', url: '#', isBookmarked: false, trending: { rank: 4, rankChange: 2, views: 76500, shares: 4890, comments: 743, trendingScore: 86.4 } },
  { id: '5', title: 'Climate Summit Reaches Historic Agreement on Emissions', excerpt: 'World leaders commit to unprecedented carbon reduction targets in landmark environmental accord.', thumbnail: 'https://images.unsplash.com/photo-1569163139394-de4798aa62b6?w=800&h=450&fit=crop', source: { name: 'The Guardian', favicon: 'https://www.theguardian.com/favicon.ico' }, category: 'World', tags: ['Climate', 'Environment', 'Politics'], publishedAt: '8 hours ago', url: '#', isBookmarked: true, trending: { rank: 5, rankChange: 0, views: 65300, shares: 7820, comments: 2341, trendingScore: 82.7 } },
  { id: '6', title: 'SpaceX Announces Plans for First Mars Colony', excerpt: 'Elon Musk reveals ambitious timeline for establishing permanent human settlement on the Red Planet.', thumbnail: 'https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=800&h=450&fit=crop', source: { name: 'Space.com', favicon: 'https://www.space.com/favicon.ico' }, category: 'Science', tags: ['Space', 'SpaceX', 'Mars'], publishedAt: '4 hours ago', url: '#', isBookmarked: false, trending: { rank: 6, rankChange: -2, views: 54200, shares: 3450, comments: 986, trendingScore: 78.9 } },
  { id: '7', title: 'Cybersecurity Crisis: Major Data Breach Affects Millions', excerpt: 'International investigation launched as hackers compromise databases of several Fortune 500 companies.', thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=450&fit=crop', source: { name: 'Wired', favicon: 'https://www.wired.com/favicon.ico' }, category: 'Technology', tags: ['Cybersecurity', 'Hacking', 'Privacy'], publishedAt: '1 hour ago', url: '#', isBookmarked: false, trending: { rank: 7, rankChange: 5, views: 92100, shares: 6780, comments: 1876, trendingScore: 95.3 } },
];

export function TrendingScreen({
  title = 'Trending Now',
  description = 'Most popular articles across all sources',
  articles,
  defaultArticles = DEMO_TRENDING_ARTICLES,
  defaultTimeFilter = '24h',
  onBookmarkToggle,
}: TrendingScreenProps) {
  const { isDarkMode } = useTheme();
  const [internalArticles, setInternalArticles] = useState(defaultArticles);
  const [timeFilter, setTimeFilter] = useState<TrendingTimeFilter>(defaultTimeFilter);
  const resolvedArticles = articles ?? internalArticles;

  const toggleBookmark = (article: TrendingArticleRecord) => {
    if (!articles) {
      setInternalArticles((previous) => previous.map((item) => item.id === article.id ? { ...item, isBookmarked: !item.isBookmarked } : item));
    }
    onBookmarkToggle?.(article);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const leadArticle = resolvedArticles[0];

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className={`text-3xl mb-2 flex items-center gap-3 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}><Flame className="w-8 h-8 text-orange-500" />{title}</h1>
          <p className={isDarkMode ? 'text-white/60' : 'text-black/60'}>{description}</p>
        </div>
        <div className="flex items-center gap-2 glass-card p-1.5 rounded-xl w-fit">
          {(['1h', '6h', '24h', '7d'] as TrendingTimeFilter[]).map((filter) => (
            <button key={filter} onClick={() => setTimeFilter(filter)} className={`px-4 py-2 rounded-lg text-sm smooth-transition ${timeFilter === filter ? isDarkMode ? 'bg-orange-500/20 text-orange-400' : 'bg-orange-500/20 text-orange-600' : isDarkMode ? 'text-white/60 hover:text-white/90 hover:bg-white/5' : 'text-black/60 hover:text-black/90 hover:bg-black/5'}`}>{filter.toUpperCase()}</button>
          ))}
        </div>
      </div>

      {leadArticle && (
        <div className={`glass-card rounded-2xl overflow-hidden smooth-transition border-2 ${isDarkMode ? 'border-orange-500/30 hover:border-orange-500/50' : 'border-orange-500/30 hover:border-orange-500/50'}`}>
          <div className="flex flex-col lg:flex-row gap-6 p-8">
            <div className="flex lg:flex-col items-center lg:items-start gap-4 lg:gap-6">
              <div className="relative"><div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center"><span className="text-4xl font-bold text-white">#1</span></div><div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center"><Flame className="w-5 h-5 text-white" /></div></div>
              <div className="flex lg:flex-col gap-4"><div className="text-center lg:text-left"><div className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>Trending Score</div><div className={`text-2xl ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>{leadArticle.trending.trendingScore}</div></div></div>
            </div>
            <div className="lg:w-96 h-64 flex-shrink-0 rounded-xl overflow-hidden"><img src={leadArticle.thumbnail} alt={leadArticle.title} className="w-full h-full object-cover" /></div>
            <div className="flex-1 flex flex-col gap-4">
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-2"><img src={leadArticle.source.favicon} alt={leadArticle.source.name} className="w-5 h-5" onError={(event) => { (event.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"><rect width="20" height="20" fill="%23ccc"/></svg>'; }} /><span className={`text-sm ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>{leadArticle.source.name}</span></div>
                <span className={`px-3 py-1 rounded-lg text-sm ${isDarkMode ? 'bg-orange-500/20 text-orange-400' : 'bg-orange-500/20 text-orange-600'}`}>{leadArticle.category}</span>
                <div className="flex items-center gap-1.5 text-sm"><Clock className={`w-4 h-4 ${isDarkMode ? 'text-white/50' : 'text-black/50'}`} /><span className={isDarkMode ? 'text-white/50' : 'text-black/50'}>{leadArticle.publishedAt}</span></div>
              </div>
              <h2 className={`text-2xl font-normal ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>{leadArticle.title}</h2>
              <p className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>{leadArticle.excerpt}</p>
              <div className="flex items-center gap-6 flex-wrap">
                <div className="flex items-center gap-2"><Eye className={isDarkMode ? 'w-5 h-5 text-cyan-400' : 'w-5 h-5 text-cyan-600'} /><span className={`text-sm ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>{formatNumber(leadArticle.trending.views)} views</span></div>
                <div className="flex items-center gap-2"><Share2 className={isDarkMode ? 'w-5 h-5 text-purple-400' : 'w-5 h-5 text-purple-600'} /><span className={`text-sm ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>{formatNumber(leadArticle.trending.shares)} shares</span></div>
                <div className="flex items-center gap-2"><MessageCircle className={isDarkMode ? 'w-5 h-5 text-green-400' : 'w-5 h-5 text-green-600'} /><span className={`text-sm ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>{formatNumber(leadArticle.trending.comments)} comments</span></div>
              </div>
              <div className="flex items-center gap-3 mt-auto">
                <button onClick={() => toggleBookmark(leadArticle)} className={`px-5 py-2.5 rounded-lg smooth-transition flex items-center gap-2 ${leadArticle.isBookmarked ? isDarkMode ? 'bg-orange-500/20 text-orange-400' : 'bg-orange-500/20 text-orange-600' : isDarkMode ? 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white/90' : 'bg-black/5 text-black/70 hover:bg-black/10 hover:text-black/90'}`}><Bookmark className={`w-4 h-4 ${leadArticle.isBookmarked ? 'fill-current' : ''}`} />{leadArticle.isBookmarked ? 'Saved' : 'Save'}</button>
                <a href={leadArticle.url} target="_blank" rel="noopener noreferrer" className={`px-5 py-2.5 rounded-lg smooth-transition flex items-center gap-2 ${isDarkMode ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-white hover:from-cyan-500/30 hover:to-purple-500/30' : 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-black hover:from-cyan-500/30 hover:to-purple-500/30'}`}>Read Article<ExternalLink className="w-4 h-4" /></a>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {resolvedArticles.slice(1).map((article) => (
          <div key={article.id} className={`glass-card rounded-xl p-6 smooth-transition hover:scale-[1.01] ${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-black/5'}`}>
            <div className="flex items-start gap-6">
              <div className="flex flex-col items-center gap-2 w-16 flex-shrink-0">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${article.trending.rank <= 3 ? 'bg-gradient-to-br from-orange-500 to-red-500 text-white' : isDarkMode ? 'bg-white/10 text-white/70' : 'bg-black/10 text-black/70'}`}>#{article.trending.rank}</div>
                {article.trending.rankChange !== 0 && <div className={`flex items-center gap-1 text-xs ${article.trending.rankChange > 0 ? 'text-green-400' : 'text-red-400'}`}>{article.trending.rankChange > 0 ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}{Math.abs(article.trending.rankChange)}</div>}
              </div>
              <div className="w-32 h-24 flex-shrink-0 rounded-lg overflow-hidden"><img src={article.thumbnail} alt={article.title} className="w-full h-full object-cover" /></div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <div className="flex items-center gap-2"><img src={article.source.favicon} alt={article.source.name} className="w-4 h-4" onError={(event) => { (event.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"><rect width="16" height="16" fill="%23ccc"/></svg>'; }} /><span className={`text-sm ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>{article.source.name}</span></div>
                  <span className={`px-2 py-0.5 rounded text-xs ${isDarkMode ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-500/20 text-purple-600'}`}>{article.category}</span>
                  <span className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>{article.publishedAt}</span>
                </div>
                <h3 className={`text-lg font-normal mb-2 line-clamp-2 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>{article.title}</h3>
                <div className="flex items-center gap-5 text-sm mb-3">
                  <div className="flex items-center gap-1.5"><Eye className={`w-4 h-4 ${isDarkMode ? 'text-white/50' : 'text-black/50'}`} /><span className={isDarkMode ? 'text-white/60' : 'text-black/60'}>{formatNumber(article.trending.views)}</span></div>
                  <div className="flex items-center gap-1.5"><Share2 className={`w-4 h-4 ${isDarkMode ? 'text-white/50' : 'text-black/50'}`} /><span className={isDarkMode ? 'text-white/60' : 'text-black/60'}>{formatNumber(article.trending.shares)}</span></div>
                  <div className="flex items-center gap-1.5"><MessageCircle className={`w-4 h-4 ${isDarkMode ? 'text-white/50' : 'text-black/50'}`} /><span className={isDarkMode ? 'text-white/60' : 'text-black/60'}>{formatNumber(article.trending.comments)}</span></div>
                  <span className={`px-2 py-0.5 rounded text-xs ${isDarkMode ? 'bg-orange-500/20 text-orange-400' : 'bg-orange-500/20 text-orange-600'}`}>Score: {article.trending.trendingScore}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">{article.tags.map((tag) => <span key={tag} className={`px-2 py-0.5 rounded text-xs ${isDarkMode ? 'bg-white/5 text-white/60' : 'bg-black/5 text-black/60'}`}>#{tag}</span>)}</div>
              </div>
              <div className="flex flex-col gap-2 flex-shrink-0">
                <button onClick={() => toggleBookmark(article)} className={`p-2.5 rounded-lg smooth-transition ${article.isBookmarked ? isDarkMode ? 'bg-orange-500/20 text-orange-400' : 'bg-orange-500/20 text-orange-600' : isDarkMode ? 'hover:bg-white/5 text-white/60 hover:text-white/90' : 'hover:bg-black/5 text-black/60 hover:text-black/90'}`}><Bookmark className={`w-4 h-4 ${article.isBookmarked ? 'fill-current' : ''}`} /></button>
                <a href={article.url} target="_blank" rel="noopener noreferrer" className={`p-2.5 rounded-lg smooth-transition ${isDarkMode ? 'hover:bg-white/5 text-white/60 hover:text-white/90' : 'hover:bg-black/5 text-black/60 hover:text-black/90'}`}><ExternalLink className="w-4 h-4" /></a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
