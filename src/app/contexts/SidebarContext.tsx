import { createContext, useContext, useState, ReactNode } from 'react';

export type RightSidebarModule = 'notifications' | 'tasks' | 'timers';

interface SidebarContextType {
  leftSidebarExpanded: boolean;
  rightSidebarExpanded: boolean;
  activeRightSidebarModule: RightSidebarModule;
  toggleLeftSidebar: () => void;
  toggleRightSidebar: () => void;
  openRightSidebarModule: (module: RightSidebarModule) => void;
  leftSidebarWidth: number;
  rightSidebarWidth: number;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [leftSidebarExpanded, setLeftSidebarExpanded] = useState(true);
  const [rightSidebarExpanded, setRightSidebarExpanded] = useState(true);
  const [activeRightSidebarModule, setActiveRightSidebarModule] =
    useState<RightSidebarModule>('notifications');

  const toggleLeftSidebar = () => setLeftSidebarExpanded(prev => !prev);
  const toggleRightSidebar = () => setRightSidebarExpanded(prev => !prev);
  const openRightSidebarModule = (module: RightSidebarModule) => {
    setActiveRightSidebarModule(module);
    setRightSidebarExpanded(true);
  };

  // Define widths in pixels
  const leftSidebarWidth = leftSidebarExpanded ? 256 : 64; // 64 = w-16, 256 = w-64
  // Richer right-rail content like notification badges needs more breathing room than the original narrow rail.
  const rightSidebarWidth = rightSidebarExpanded 
    ? (leftSidebarExpanded ? 384 : 440)
    : 64; // 64 = w-16 when collapsed

  return (
    <SidebarContext.Provider
      value={{
        leftSidebarExpanded,
        rightSidebarExpanded,
        activeRightSidebarModule,
        toggleLeftSidebar,
        toggleRightSidebar,
        openRightSidebarModule,
        leftSidebarWidth,
        rightSidebarWidth,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}
