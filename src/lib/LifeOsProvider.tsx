import type { ReactNode } from 'react';
import { ThemeProvider } from '../app/contexts/ThemeContext';
import { SidebarProvider } from '../app/contexts/SidebarContext';

interface LifeOsProviderProps {
  children: ReactNode;
}

// Bundles the exact providers used by the demo app so imported screens
// behave the same way in a host application.
export function LifeOsProvider({ children }: LifeOsProviderProps) {
  return (
    <ThemeProvider>
      <SidebarProvider>{children}</SidebarProvider>
    </ThemeProvider>
  );
}
