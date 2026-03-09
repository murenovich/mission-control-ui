import './styles';
import { useTheme } from '../../contexts/ThemeContext';
import { Layout, MousePointer, Square, FileText, Bell, BarChart2, Palette, Code, Package } from 'lucide-react';
import { Link } from 'react-router';

interface ComponentCategory {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  count: number;
  color: string;
  link: string;
}

const categories: ComponentCategory[] = [
  {
    id: 'buttons',
    name: 'Buttons & Actions',
    description: 'Interactive buttons, links, and action triggers',
    icon: MousePointer,
    count: 12,
    color: 'from-blue-500 to-blue-600',
    link: '/components/buttons',
  },
  {
    id: 'cards',
    name: 'Cards & Containers',
    description: 'Glassmorphic cards, panels, and content containers',
    icon: Square,
    count: 8,
    color: 'from-gray-500 to-gray-600',
    link: '/components/cards',
  },
  {
    id: 'all',
    name: 'All Components',
    description: 'Complete component library with live examples',
    icon: Package,
    count: 72,
    color: 'from-pink-500 to-pink-600',
    link: '/components/all',
  },
  {
    id: 'forms',
    name: 'Forms & Inputs',
    description: 'Form elements, text inputs, selects, and validation',
    icon: FileText,
    count: 15,
    color: 'from-green-500 to-green-600',
    link: '/components/all#form-elements',
  },
  {
    id: 'modals',
    name: 'Modals & Overlays',
    description: 'Dialog boxes, modals, dropdowns, and popovers',
    icon: Layout,
    count: 6,
    color: 'from-cyan-500 to-cyan-600',
    link: '/components/all#modals-overlays',
  },
  {
    id: 'feedback',
    name: 'Feedback & Alerts',
    description: 'Notifications, alerts, toasts, and loading states',
    icon: Bell,
    count: 10,
    color: 'from-red-500 to-red-600',
    link: '/components/all#feedback-components',
  },
  {
    id: 'charts',
    name: 'Charts & Data',
    description: 'Data visualizations, charts, graphs, and tables',
    icon: BarChart2,
    count: 7,
    color: 'from-purple-500 to-purple-600',
    link: '/components/all',
  },
  {
    id: 'layout',
    name: 'Layout & Structure',
    description: 'Sidebars, headers, navigation, and grid systems',
    icon: Layout,
    count: 9,
    color: 'from-orange-500 to-orange-600',
    link: '/components/all',
  },
  {
    id: 'theme',
    name: 'Theme & Colors',
    description: 'Color system, typography, and design tokens',
    icon: Palette,
    count: 5,
    color: 'from-pink-500 to-pink-600',
    link: '/components/all',
  },
];

export default function ComponentLibrary() {
  const { isDarkMode } = useTheme();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br from-pink-500 to-pink-600`}>
            <Package className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className={`text-4xl mb-3 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
          Component Library
        </h1>
        <p className={`text-lg ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
          A comprehensive collection of all UI components used throughout the application.
          Browse, explore, and reference components for development.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="glass-card p-6 rounded-2xl text-center">
          <div className={`text-4xl mb-2 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
            {categories.reduce((acc, cat) => acc + cat.count, 0)}
          </div>
          <div className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
            Total Components
          </div>
        </div>
        <div className="glass-card p-6 rounded-2xl text-center">
          <div className={`text-4xl mb-2 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
            {categories.length}
          </div>
          <div className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
            Categories
          </div>
        </div>
        <div className="glass-card p-6 rounded-2xl text-center">
          <div className={`text-4xl mb-2 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent`}>
            100%
          </div>
          <div className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
            Documented
          </div>
        </div>
      </div>

      {/* Component Categories */}
      <div>
        <h2 className={`text-2xl mb-6 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
          Browse by Category
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            
            return (
              <Link
                key={category.id}
                to={category.link}
                className={`glass-card rounded-2xl p-6 smooth-transition hover:scale-[1.03] ${
                  isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/10'
                }`}
              >
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br ${category.color} mb-4`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>

                {/* Title */}
                <h3 className={`text-lg mb-2 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
                  {category.name}
                </h3>

                {/* Description */}
                <p className={`text-sm mb-4 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                  {category.description}
                </p>

                {/* Count */}
                <div className={`flex items-center gap-2 text-sm ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
                  <Code className="w-4 h-4" />
                  <span>{category.count} components</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Features */}
      <div className="glass-card rounded-2xl p-8 mt-12">
        <h2 className={`text-2xl mb-6 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
          Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <div className={`text-lg mb-2 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
              ✨ Glassmorphic Design
            </div>
            <p className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
              All components feature beautiful glassmorphic styling with backdrop blur effects
            </p>
          </div>
          <div>
            <div className={`text-lg mb-2 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
              🎨 Dark & Light Themes
            </div>
            <p className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
              Fully responsive theme system with dark and light mode support
            </p>
          </div>
          <div>
            <div className={`text-lg mb-2 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
              📱 Fully Responsive
            </div>
            <p className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
              Mobile-first design optimized for all screen sizes
            </p>
          </div>
          <div>
            <div className={`text-lg mb-2 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
              ⚡ Performance Optimized
            </div>
            <p className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
              Smooth animations and transitions for premium user experience
            </p>
          </div>
          <div>
            <div className={`text-lg mb-2 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
              🔧 Fully Customizable
            </div>
            <p className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
              Easy to extend and modify to match your design requirements
            </p>
          </div>
          <div>
            <div className={`text-lg mb-2 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
              📚 Well Documented
            </div>
            <p className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
              Live examples with code snippets for easy implementation
            </p>
          </div>
        </div>
      </div>

      {/* Technology Stack */}
      <div className="glass-card rounded-2xl p-8">
        <h2 className={`text-2xl mb-6 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
          Technology Stack
        </h2>
        <div className="flex flex-wrap gap-3">
          {['React', 'TypeScript', 'Tailwind CSS v4', 'React Router', 'Lucide Icons', 'Recharts', 'Framer Motion'].map(tech => (
            <span
              key={tech}
              className={`px-4 py-2 rounded-lg text-sm ${
                isDarkMode ? 'bg-white/10 text-white/80' : 'bg-black/10 text-black/80'
              }`}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
