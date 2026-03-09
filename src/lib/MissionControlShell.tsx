import type { ReactNode } from 'react';
import { Header } from '../app/components/Header';
import { IconNavBar } from '../app/components/IconNavBar';
import { RightSidebar } from '../app/components/RightSidebar';
import { Sidebar } from '../app/components/Sidebar';
import { useTheme } from '../app/contexts/ThemeContext';
import { getDefaultCurrentPage, type ShellSection } from './navigation';

export interface MissionControlShellSlotProps {
  activeSection: ShellSection;
  currentPage: string;
}

export type MissionControlShellSlot =
  | ReactNode
  | ((props: MissionControlShellSlotProps) => ReactNode);

export interface MissionControlShellProps {
  activeSection?: ShellSection;
  currentPage?: string;
  children: ReactNode;
  header?: MissionControlShellSlot;
  leftNav?: MissionControlShellSlot;
  sidebar?: MissionControlShellSlot;
  rightSidebar?: MissionControlShellSlot;
  backgroundDecor?: MissionControlShellSlot;
  showHeader?: boolean;
  showLeftNav?: boolean;
  showSidebar?: boolean;
  showRightSidebar?: boolean;
  showBackgroundDecor?: boolean;
  contentMaxWidthClassName?: string;
}

function DefaultBackgroundDecor({ isDarkMode }: { isDarkMode: boolean }) {
  return (
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
  );
}

// Mirrors the in-app shell while still allowing host apps to replace or hide
// each chrome region without forking the layout component.
export function MissionControlShell({
  activeSection = 'home',
  currentPage,
  children,
  header,
  leftNav,
  sidebar,
  rightSidebar,
  backgroundDecor,
  showHeader = true,
  showLeftNav = true,
  showSidebar = true,
  showRightSidebar = true,
  showBackgroundDecor = true,
  contentMaxWidthClassName = 'max-w-[1600px]',
}: MissionControlShellProps) {
  const { isDarkMode } = useTheme();
  const resolvedCurrentPage = currentPage ?? getDefaultCurrentPage(activeSection);
  const slotProps: MissionControlShellSlotProps = {
    activeSection,
    currentPage: resolvedCurrentPage,
  };

  const renderSlot = (slot: MissionControlShellSlot | undefined) => {
    if (typeof slot === 'function') {
      return slot(slotProps);
    }

    return slot ?? null;
  };

  const resolvedHeader =
    header !== undefined ? renderSlot(header) : showHeader ? <Header /> : null;
  const resolvedLeftNav =
    leftNav !== undefined
      ? renderSlot(leftNav)
      : showLeftNav
        ? <IconNavBar activeSection={activeSection} className="mx-4" />
        : null;
  const resolvedSidebar =
    sidebar !== undefined
      ? renderSlot(sidebar)
      : showSidebar
        ? <Sidebar mode={activeSection} currentPage={resolvedCurrentPage} />
        : null;
  const resolvedRightSidebar =
    rightSidebar !== undefined ? renderSlot(rightSidebar) : showRightSidebar ? <RightSidebar /> : null;
  const resolvedBackgroundDecor =
    backgroundDecor !== undefined
      ? renderSlot(backgroundDecor)
      : showBackgroundDecor
        ? <DefaultBackgroundDecor isDarkMode={isDarkMode} />
        : null;

  return (
    <div
      className={`h-screen min-h-screen w-full flex overflow-hidden ${isDarkMode ? 'dark-mode' : 'light-mode'}`}
      style={{ background: isDarkMode ? '#0a0a0f' : '#f5f7fa' }}
    >
      {resolvedLeftNav}
      {resolvedSidebar}

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {resolvedHeader}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className={`${contentMaxWidthClassName} mx-auto`}>{children}</div>
        </main>
      </div>

      {resolvedRightSidebar}
      {resolvedBackgroundDecor}
    </div>
  );
}
