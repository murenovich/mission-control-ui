import type { ReactNode } from 'react';
import { Header } from '../app/components/Header';
import { IconNavBar } from '../app/components/IconNavBar';
import { RightSidebar } from '../app/components/RightSidebar';
import { Sidebar } from '../app/components/Sidebar';
import { useTheme } from '../app/contexts/ThemeContext';

export type ShellSection =
  | 'home'
  | 'health'
  | 'projects'
  | 'systems'
  | 'messages'
  | 'newsfeed'
  | 'components';

interface MissionControlShellProps {
  activeSection: ShellSection;
  currentPage: string;
  children: ReactNode;
}

// Mirrors the in-app shell without coupling consumers to react-router Outlet.
export function MissionControlShell({
  activeSection,
  currentPage,
  children,
}: MissionControlShellProps) {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`h-screen min-h-screen w-full flex overflow-hidden ${isDarkMode ? 'dark-mode' : 'light-mode'}`}
      style={{ background: isDarkMode ? '#0a0a0f' : '#f5f7fa' }}
    >
      <IconNavBar activeSection={activeSection} className="mx-4" />
      <Sidebar mode={activeSection} currentPage={currentPage} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="max-w-[1600px] mx-auto">{children}</div>
        </main>
      </div>

      <RightSidebar />

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
