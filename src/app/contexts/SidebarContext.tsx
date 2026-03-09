import { createContext, useContext, useState, ReactNode } from 'react';

interface SidebarContextType {
  leftSidebarExpanded: boolean;
  rightSidebarExpanded: boolean;
  toggleLeftSidebar: () => void;
  toggleRightSidebar: () => void;
  leftSidebarWidth: number;
  rightSidebarWidth: number;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [leftSidebarExpanded, setLeftSidebarExpanded] = useState(true);
  const [rightSidebarExpanded, setRightSidebarExpanded] = useState(true);

  const toggleLeftSidebar = () => setLeftSidebarExpanded(prev => !prev);
  const toggleRightSidebar = () => setRightSidebarExpanded(prev => !prev);

  // Define widths in pixels
  const leftSidebarWidth = leftSidebarExpanded ? 256 : 64; // 64 = w-16, 256 = w-64
  // Right sidebar is wider when left sidebar is collapsed (more horizontal space available)
  const rightSidebarWidth = rightSidebarExpanded 
    ? (leftSidebarExpanded ? 320 : 400) // 320 = w-80, 400 = w-[400px] when left is collapsed
    : 64; // 64 = w-16 when collapsed

  return (
    <SidebarContext.Provider
      value={{
        leftSidebarExpanded,
        rightSidebarExpanded,
        toggleLeftSidebar,
        toggleRightSidebar,
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