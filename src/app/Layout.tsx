import { Outlet, useLocation } from 'react-router';
import { IconNavBar } from './components/IconNavBar';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { RightSidebar } from './components/RightSidebar';
import { useTheme } from './contexts/ThemeContext';

export function Layout() {
  const { isDarkMode } = useTheme();
  const location = useLocation();

  // Determine active section based on current path
  const activeSection: 'home' | 'health' | 'projects' | 'systems' | 'messages' | 'newsfeed' | 'components' = location.pathname.startsWith('/health')
    ? 'health'
    : location.pathname.startsWith('/projects')
    ? 'projects'
    : location.pathname.startsWith('/systems')
    ? 'systems'
    : location.pathname.startsWith('/messages')
    ? 'messages'
    : location.pathname.startsWith('/newsfeed')
    ? 'newsfeed'
    : location.pathname.startsWith('/components')
    ? 'components'
    : 'home';

  // Map current path to page identifier for sidebar highlighting
  const getCurrentPage = (): string => {
    const path = location.pathname;
    
    if (path === '/' || path === '/dashboard') return 'dashboard';
    if (path === '/analytics') return 'analytics';
    if (path === '/goals') return 'goals';
    if (path === '/calendar') return 'calendar';
    if (path === '/tasks') return 'tasks';
    if (path.startsWith('/mind')) return 'mind';
    if (path === '/newsfeed') return 'newsfeed';
    if (path.startsWith('/projects/overview')) return 'projects-overview';
    if (path.startsWith('/projects/active')) return 'projects-active';
    if (path.startsWith('/projects/archived')) return 'projects-archived';
    if (path.startsWith('/projects/all-tasks')) return 'projects-all-tasks';
    if (path.startsWith('/projects/my-tasks')) return 'projects-my-tasks';
    if (path.startsWith('/systems/overview')) return 'systems-overview';
    if (path.startsWith('/systems/network-status')) return 'systems-network';
    if (path.startsWith('/systems/services-status')) return 'systems-services';
    if (path.startsWith('/systems/alerts-logs')) return 'systems-alerts';
    if (path.startsWith('/systems/troubleshooting')) return 'systems-troubleshooting';
    if (path.startsWith('/systems/network-diagram')) return 'systems-diagram';
    if (path === '/settings') return 'settings';
    if (path.startsWith('/health/overview')) return 'health-overview';
    if (path.startsWith('/health/nutrition')) return 'health-nutrition';
    if (path.startsWith('/health/sleep')) return 'health-sleep';
    if (path.startsWith('/health/vitals')) return 'health-vitals';
    if (path.startsWith('/health/mental')) return 'health-mental';
    if (path === '/messages') return 'messages-overview';
    if (path.startsWith('/messages/discord')) return 'messages-discord';
    if (path.startsWith('/messages/telegram')) return 'messages-telegram';
    if (path.startsWith('/messages/slack')) return 'messages-slack';
    
    return 'dashboard';
  };

  return (
    <div 
      className={`h-screen min-h-screen w-full flex overflow-hidden ${isDarkMode ? 'dark-mode' : 'light-mode'}`}
      style={{ background: isDarkMode ? '#0a0a0f' : '#f5f7fa' }}
    >
      {/* Icon navigation bar (leftmost) */}
      <IconNavBar activeSection={activeSection} className="mx-4" />
      
      {/* Secondary sidebar */}
      <Sidebar mode={activeSection} currentPage={getCurrentPage()} />

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <Header />

        {/* Dashboard body */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="max-w-[1600px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Right sidebar */}
      <RightSidebar />

      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: -1 }}>
        {isDarkMode ? (
          <>
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-3xl"></div>
          </>
        ) : (
          <>
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-3xl"></div>
          </>
        )}
      </div>
    </div>
  );
}
