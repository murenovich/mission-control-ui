import { Home, BarChart3, Target, Calendar, CheckSquare, Brain, Settings, Menu, X, Activity, Dumbbell, Apple, Moon as MoonIcon, Heart, Smile, ChevronLeft, ChevronRight, FolderKanban, Archive, ListTodo, User, Server, Wifi, Zap, AlertTriangle, Wrench, Network, MessageSquare, Hash, Send, Newspaper, Rss, Bookmark, TrendingUp, Globe, Layout, MousePointer, Square, FileText, Bell, BarChart2, Palette } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useSidebar } from '../contexts/SidebarContext';
import { Link, useLocation } from 'react-router';
import {
  getDefaultCurrentPage,
  matchCurrentPageFromPath,
  type ShellSection,
} from '../../lib/navigation';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  page?: string;
}

const homeNavItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: Home, page: '/' },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, page: '/analytics' },
  { id: 'goals', label: 'Goals', icon: Target, page: '/goals' },
  { id: 'calendar', label: 'Calendar', icon: Calendar, page: '/calendar' },
  { id: 'tasks', label: 'Tasks', icon: CheckSquare, page: '/tasks' },
  { id: 'mind', label: 'Mind', icon: Brain, page: '/mind/dashboard' },
];

const projectsNavItems: NavItem[] = [
  { id: 'projects-overview', label: 'All Projects', icon: FolderKanban, page: '/projects/overview' },
  { id: 'projects-active', label: 'Active', icon: CheckSquare, page: '/projects/active' },
  { id: 'projects-archived', label: 'Archived', icon: Archive, page: '/projects/archived' },
  { id: 'projects-all-tasks', label: 'All Tasks', icon: ListTodo, page: '/projects/all-tasks' },
  { id: 'projects-my-tasks', label: 'My Tasks', icon: User, page: '/projects/my-tasks' },
];

const systemsNavItems: NavItem[] = [
  { id: 'systems-overview', label: 'System Overview', icon: Server, page: '/systems/overview' },
  { id: 'systems-network', label: 'Network Status', icon: Wifi, page: '/systems/network-status' },
  { id: 'systems-services', label: 'Services Status', icon: Zap, page: '/systems/services-status' },
  { id: 'systems-alerts', label: 'Alerts & Logs', icon: AlertTriangle, page: '/systems/alerts-logs' },
  { id: 'systems-troubleshooting', label: 'Troubleshooting', icon: Wrench, page: '/systems/troubleshooting' },
  { id: 'systems-diagram', label: 'Network Diagram', icon: Network, page: '/systems/network-diagram' },
];

const healthNavItems: NavItem[] = [
  { id: 'health-overview', label: 'Overview', icon: Activity, page: '/health/overview' },
  { id: 'health-nutrition', label: 'Nutrition', icon: Apple, page: '/health/nutrition' },
  { id: 'health-sleep', label: 'Sleep', icon: MoonIcon, page: '/health/sleep' },
  { id: 'health-vitals', label: 'Vitals', icon: Heart, page: '/health/vitals' },
  { id: 'health-mental', label: 'Mental Health', icon: Smile, page: '/health/mental' },
];

const messagesNavItems: NavItem[] = [
  { id: 'messages-overview', label: 'All Messages', icon: MessageSquare, page: '/messages' },
  { id: 'messages-discord', label: 'Discord', icon: Hash, page: '/messages/discord' },
  { id: 'messages-telegram', label: 'Telegram', icon: Send, page: '/messages/telegram' },
  { id: 'messages-slack', label: 'Slack', icon: MessageSquare, page: '/messages/slack' },
];

const newsfeedNavItems: NavItem[] = [
  { id: 'newsfeed', label: 'All Articles', icon: Newspaper, page: '/newsfeed' },
  { id: 'newsfeed-sources', label: 'Feed Sources', icon: Rss, page: '/newsfeed/sources' },
  { id: 'newsfeed-bookmarks', label: 'Saved Articles', icon: Bookmark, page: '/newsfeed/saved' },
  { id: 'newsfeed-trending', label: 'Trending', icon: TrendingUp, page: '/newsfeed/trending' },
  { id: 'newsfeed-categories', label: 'Categories', icon: Globe, page: '/newsfeed/categories' },
];

const componentsNavItems: NavItem[] = [
  { id: 'components-overview', label: 'Overview', icon: Layout, page: '/components' },
  { id: 'components-buttons', label: 'Buttons & Actions', icon: MousePointer, page: '/components/buttons' },
  { id: 'components-cards', label: 'Cards & Containers', icon: Square, page: '/components/cards' },
  { id: 'components-forms', label: 'Forms & Inputs', icon: FileText, page: '/components/forms' },
  { id: 'components-modals', label: 'Modals & Overlays', icon: Layout, page: '/components/modals' },
  { id: 'components-feedback', label: 'Feedback & Alerts', icon: Bell, page: '/components/feedback' },
  { id: 'components-charts', label: 'Charts & Data', icon: BarChart2, page: '/components/charts' },
  { id: 'components-layout', label: 'Layout & Structure', icon: Layout, page: '/components/layout' },
  { id: 'components-theme', label: 'Theme & Colors', icon: Palette, page: '/components/theme' },
];

interface SidebarProps {
  mode: ShellSection;
  currentPage?: string;
}

export function Sidebar({ mode, currentPage }: SidebarProps) {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { isDarkMode } = useTheme();
  const { leftSidebarExpanded, toggleLeftSidebar } = useSidebar();
  const activeItem =
    matchCurrentPageFromPath(location.pathname) ?? currentPage ?? getDefaultCurrentPage(mode);

  const navItems = mode === 'health' 
    ? healthNavItems 
    : mode === 'projects' 
    ? projectsNavItems 
    : mode === 'systems' 
    ? systemsNavItems 
    : mode === 'messages'
    ? messagesNavItems
    : mode === 'newsfeed'
    ? newsfeedNavItems
    : mode === 'components'
    ? componentsNavItems
    : homeNavItems;
  
  const sectionTitle = mode === 'health' 
    ? 'Health Dashboard' 
    : mode === 'projects' 
    ? 'Projects & Tasks' 
    : mode === 'systems' 
    ? 'System Monitor' 
    : mode === 'messages'
    ? 'Messages'
    : mode === 'newsfeed'
    ? 'Newsfeed'
    : mode === 'components'
    ? 'Components'
    : 'Life Command';
  
  const sectionSubtitle = mode === 'health' 
    ? 'Fitness & Wellness' 
    : mode === 'projects' 
    ? 'Notion Sync' 
    : mode === 'systems' 
    ? 'Server Status' 
    : mode === 'messages'
    ? 'Communication Hub'
    : mode === 'newsfeed'
    ? 'Latest Articles'
    : mode === 'components'
    ? 'UI Elements'
    : 'Mission Control';

  const handleItemClick = (item: NavItem) => {
    if (item.page) {
      // onPageChange(item.page);
    }
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className={`lg:hidden fixed top-4 left-20 z-50 glass-card p-3 smooth-transition ${isDarkMode ? 'text-white/90 hover:text-white' : 'text-black/90 hover:text-black'}`}
      >
        {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-16 lg:left-0 z-40
          glass-card border-r border-white/5
          flex flex-col
          transform transition-all duration-300 ease-in-out
          ${leftSidebarExpanded ? 'w-56 lg:w-64' : 'w-16'}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
        style={{ background: isDarkMode ? 'rgba(15, 15, 25, 0.3)' : 'rgba(255, 255, 255, 0.4)', backdropFilter: 'blur(40px)' }}
      >
        {/* Collapse/Expand Button */}
        <button
          onClick={toggleLeftSidebar}
          className={`
            hidden lg:flex absolute -right-3 bottom-6 z-[100]
            w-6 h-6 rounded-full items-center justify-center
            smooth-transition
            ${isDarkMode ? 'bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400' : 'bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-600'}
            border ${isDarkMode ? 'border-cyan-500/30' : 'border-cyan-500/30'}
          `}
          title={leftSidebarExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          {leftSidebarExpanded ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>

        {/* Logo / Brand */}
        <div className={`p-6 border-b ${isDarkMode ? 'border-white/5' : 'border-black/5'}`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center neon-glow-cyan flex-shrink-0"
                 style={{ background: 'linear-gradient(135deg, #00e5ff 0%, #b366ff 100%)' }}>
              <Brain className="w-6 h-6 text-white" />
            </div>
            {leftSidebarExpanded && (
              <div className="overflow-hidden">
                <h2 className={`text-lg m-0 whitespace-nowrap ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>{sectionTitle}</h2>
                <p className={`text-xs m-0 whitespace-nowrap ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>{sectionSubtitle}</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            
            // Color mapping for each nav item
            const colorMap: Record<string, string> = {
              dashboard: 'text-cyan-400',
              analytics: 'text-purple-400',
              goals: 'text-orange-400',
              calendar: 'text-pink-400',
              tasks: 'text-green-400',
              mind: 'text-blue-400',
              'health-overview': 'text-cyan-400',
              'health-workouts': 'text-red-400',
              'health-nutrition': 'text-green-400',
              'health-sleep': 'text-blue-400',
              'health-vitals': 'text-red-400',
              'health-mental': 'text-purple-400',
              'projects-overview': 'text-cyan-400',
              'projects-active': 'text-green-400',
              'projects-archived': 'text-gray-400',
              'projects-all-tasks': 'text-blue-400',
              'projects-my-tasks': 'text-orange-400',
              'systems-overview': 'text-cyan-400',
              'systems-network': 'text-green-400',
              'systems-services': 'text-blue-400',
              'systems-alerts': 'text-red-400',
              'systems-troubleshooting': 'text-gray-400',
              'systems-diagram': 'text-gray-400',
              'messages-overview': 'text-purple-400',
              'messages-discord': 'text-purple-400',
              'messages-telegram': 'text-cyan-400',
              'messages-slack': 'text-orange-400',
              'newsfeed': 'text-orange-400',
              'newsfeed-sources': 'text-cyan-400',
              'newsfeed-bookmarks': 'text-purple-400',
              'newsfeed-trending': 'text-red-400',
              'newsfeed-categories': 'text-green-400',
              'components-overview': 'text-cyan-400',
              'components-buttons': 'text-blue-400',
              'components-cards': 'text-gray-400',
              'components-forms': 'text-green-400',
              'components-modals': 'text-cyan-400',
              'components-feedback': 'text-red-400',
              'components-charts': 'text-blue-400',
              'components-layout': 'text-gray-400',
              'components-theme': 'text-purple-400',
            };
            
            const itemColor = colorMap[item.id] || 'text-cyan-400';
            
            return (
              <Link
                key={item.id}
                to={item.page || '/'}
                onClick={() => handleItemClick(item)}
                aria-current={isActive ? 'page' : undefined}
                className={`
                  w-full flex items-center gap-3 rounded-lg
                  smooth-transition group relative
                  ${leftSidebarExpanded ? 'px-4 py-3' : 'px-2 py-3 justify-center'}
                  ${isActive 
                    ? isDarkMode 
                      ? 'bg-white/10 text-white' 
                      : 'bg-black/10 text-black'
                    : isDarkMode
                      ? 'text-white/60 hover:text-white hover:bg-white/5'
                      : 'text-black/60 hover:text-black hover:bg-black/5'
                  }
                `}
                title={!leftSidebarExpanded ? item.label : undefined}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? itemColor : ''}`} />
                {leftSidebarExpanded && (
                  <>
                    <span className="text-sm whitespace-nowrap">{item.label}</span>
                    {isActive && (
                      <div className={`ml-auto w-1.5 h-1.5 rounded-full ${itemColor.replace('text-', 'bg-')}`} />
                    )}
                  </>
                )}
                {!leftSidebarExpanded && isActive && (
                  <div className={`absolute right-1 w-1.5 h-1.5 rounded-full ${itemColor.replace('text-', 'bg-')}`} />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom section */}
        <div className={`p-4 border-t ${isDarkMode ? 'border-white/5' : 'border-black/5'}`}>
          {/* User profile */}
          {leftSidebarExpanded && (
            <div className="glass-card p-4 mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm text-white">JD</span>
                </div>
                <div className="flex-1 min-w-0 overflow-hidden">
                  <p className={`text-sm m-0 truncate ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>John Doe</p>
                  <p className={`text-xs m-0 ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>Level 42</p>
                </div>
              </div>
            </div>
          )}
          
          {!leftSidebarExpanded && (
            <div className="flex justify-center mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
                <span className="text-sm text-white">JD</span>
              </div>
            </div>
          )}

          {/* Settings */}
          <Link 
            to="/settings"
            aria-current={activeItem === 'settings' ? 'page' : undefined}
            className={`w-full flex items-center gap-3 rounded-lg smooth-transition ${
              leftSidebarExpanded ? 'px-4 py-3' : 'px-2 py-3 justify-center'
            } ${
              activeItem === 'settings'
                ? isDarkMode
                  ? 'bg-cyan-500/20 text-cyan-400'
                  : 'bg-cyan-500/20 text-cyan-600'
                : isDarkMode
                ? 'text-white/60 hover:text-white hover:bg-white/5'
                : 'text-black/60 hover:text-black hover:bg-black/5'
            }`}
            title={!leftSidebarExpanded ? 'Settings' : undefined}
          >
            <Settings className="w-5 h-5 flex-shrink-0" />
            {leftSidebarExpanded && <span className="text-sm">Settings</span>}
          </Link>
        </div>
      </aside>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
}
