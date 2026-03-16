import { Outlet, useLocation } from 'react-router';
import { IconNavBar } from './components/IconNavBar';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { RightSidebar } from './components/RightSidebar';
import { useTheme } from './contexts/ThemeContext';
import { getActiveSectionFromPath, getCurrentPageFromPath } from '../lib/navigation';

export function Layout() {
  const { isDarkMode } = useTheme();
  const location = useLocation();
  const activeSection = getActiveSectionFromPath(location.pathname);
  const currentPage = getCurrentPageFromPath(location.pathname);

  return (
    <div 
      className={`h-screen min-h-screen w-full flex overflow-hidden ${isDarkMode ? 'dark dark-mode' : 'light-mode'}`}
      style={{ background: isDarkMode ? '#0a0a0f' : '#f5f7fa' }}
    >
      {/* Icon navigation bar (leftmost) */}
      <IconNavBar activeSection={activeSection} className="mx-4" />
      
      {/* Secondary sidebar */}
      <Sidebar mode={activeSection} currentPage={currentPage} />

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
