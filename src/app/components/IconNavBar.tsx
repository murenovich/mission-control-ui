import { Home, MessageSquare, Activity, CheckSquare, Server, Newspaper, Layout } from 'lucide-react';
import type { ElementType } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Link } from 'react-router';

interface NavIcon {
  id: string;
  icon: ElementType;
  active?: boolean;
  color?: string;
}

const navIcons: NavIcon[] = [
  { id: 'home', icon: Home, active: true, color: 'from-orange-500 to-orange-600' },
  { id: 'health', icon: Activity, color: 'from-green-500 to-emerald-600' },
  { id: 'projects', icon: CheckSquare, color: 'from-purple-500 to-purple-600' },
  { id: 'systems', icon: Server, color: 'from-cyan-500 to-cyan-600' },
  { id: 'messages', icon: MessageSquare, color: 'from-purple-400 to-purple-500' },
  { id: 'newsfeed', icon: Newspaper, color: 'from-orange-400 to-orange-500' },
  { id: 'components', icon: Layout, color: 'from-pink-500 to-pink-600' },
];

interface IconNavBarProps {
  activeSection: 'home' | 'health' | 'projects' | 'systems' | 'messages' | 'newsfeed' | 'components';
  className?: string;
}

export function IconNavBar({ activeSection, className = '' }: IconNavBarProps) {
  const { isDarkMode } = useTheme();

  return (
    <div 
      className={`w-16 lg:w-20 shrink-0 sticky top-0 h-screen flex flex-col items-center justify-start py-6 ${className}`}
    >
      <div className={`space-y-3 p-3 mx-2 rounded-full ${isDarkMode ? 'bg-white/10' : 'bg-black/10'} backdrop-blur-md border ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
        {navIcons.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          const getLink = () => {
            if (item.id === 'home') return '/';
            if (item.id === 'health') return '/health/overview';
            if (item.id === 'projects') return '/projects/overview';
            if (item.id === 'systems') return '/systems/overview';
            if (item.id === 'messages') return '/messages';
            if (item.id === 'newsfeed') return '/newsfeed';
            if (item.id === 'components') return '/components';
            return '/';
          };
          
          return (
            <Link
              key={item.id}
              to={getLink()}
              className={`
                w-12 h-12 rounded-full flex items-center justify-center
                smooth-transition group relative
                ${isActive && item.color
                  ? `bg-gradient-to-br ${item.color} shadow-lg`
                  : isActive
                  ? isDarkMode ? 'bg-white/10' : 'bg-black/10'
                  : isDarkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-black/5 hover:bg-black/10'
                }
              `}
            >
              <Icon 
                className={`w-5 h-5 ${
                  isActive && item.color
                    ? 'text-white'
                    : isActive
                    ? isDarkMode ? 'text-white' : 'text-black'
                    : isDarkMode ? 'text-white/60 group-hover:text-white/90' : 'text-black/60 group-hover:text-black/90'
                }`}
              />
              
              {/* Active indicator */}
              {isActive && !item.color && (
                <div className="absolute -left-1 w-1 h-6 bg-gradient-to-b from-cyan-400 to-purple-400 rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
