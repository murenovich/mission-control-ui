import './styles';
import { useTheme } from '../../contexts/ThemeContext';
import { Layout, Menu, Sidebar as SidebarIcon, Grid, Columns, Rows, PanelLeft, PanelRight, ChevronLeft, ChevronRight } from 'lucide-react';

export default function LayoutPage() {
  const { isDarkMode } = useTheme();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className={`text-3xl mb-2 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
          Layout & Structure
        </h1>
        <p className={isDarkMode ? 'text-white/60' : 'text-black/60'}>
          Layout components, grid systems, and structural elements
        </p>
      </div>

      {/* Application Layout */}
      <section className="glass-card p-8 rounded-2xl space-y-6">
        <div>
          <h2 className={`text-2xl mb-2 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
            Application Layout
          </h2>
          <p className={`text-sm mb-6 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
            Three-column mission control layout with icon navigation, sidebars, and main content
          </p>
        </div>

        <div className={`p-4 rounded-xl border ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
          <div className="flex gap-2 h-64">
            {/* Icon Bar */}
            <div className={`w-16 rounded-lg ${isDarkMode ? 'bg-white/5' : 'bg-black/5'} flex flex-col items-center gap-2 py-4`}>
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                <Layout className="w-5 h-5 text-white" />
              </div>
              <div className={`w-10 h-10 rounded-lg ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}></div>
              <div className={`w-10 h-10 rounded-lg ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}></div>
            </div>

            {/* Left Sidebar */}
            <div className={`w-48 rounded-lg ${isDarkMode ? 'bg-white/5' : 'bg-black/5'} p-3`}>
              <div className={`text-xs mb-3 ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>Navigation</div>
              <div className="space-y-2">
                <div className={`h-8 rounded-lg ${isDarkMode ? 'bg-cyan-500/20' : 'bg-cyan-500/20'}`}></div>
                <div className={`h-8 rounded-lg ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}></div>
                <div className={`h-8 rounded-lg ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}></div>
              </div>
            </div>

            {/* Main Content */}
            <div className={`flex-1 rounded-lg ${isDarkMode ? 'bg-white/5' : 'bg-black/5'} p-3`}>
              <div className={`text-xs mb-3 ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>Main Content</div>
              <div className={`h-full rounded-lg ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}></div>
            </div>

            {/* Right Sidebar */}
            <div className={`w-48 rounded-lg ${isDarkMode ? 'bg-white/5' : 'bg-black/5'} p-3`}>
              <div className={`text-xs mb-3 ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>Sidebar</div>
              <div className="space-y-2">
                <div className={`h-12 rounded-lg ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}></div>
                <div className={`h-12 rounded-lg ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}></div>
              </div>
            </div>
          </div>
        </div>

        <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-black/20' : 'bg-gray-100'}`}>
          <pre className={`text-sm ${isDarkMode ? 'text-green-400' : 'text-green-600'} overflow-x-auto`}>
{`<div className="flex h-screen">
  <IconNavBar />
  <Sidebar />
  <main className="flex-1">{children}</main>
  <RightSidebar />
</div>`}
          </pre>
        </div>
      </section>

      {/* Grid Systems */}
      <section className="glass-card p-8 rounded-2xl space-y-6">
        <div>
          <h2 className={`text-2xl mb-2 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
            Grid Systems
          </h2>
          <p className={`text-sm mb-6 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
            Responsive grid layouts for organizing content
          </p>
        </div>

        <div>
          <h3 className={`text-lg mb-4 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>2 Column Grid</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`h-24 rounded-xl ${isDarkMode ? 'bg-white/5' : 'bg-black/5'} flex items-center justify-center ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
              Column 1
            </div>
            <div className={`h-24 rounded-xl ${isDarkMode ? 'bg-white/5' : 'bg-black/5'} flex items-center justify-center ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
              Column 2
            </div>
          </div>
          <code className={`block mt-4 p-3 rounded-lg text-sm ${isDarkMode ? 'bg-black/20 text-green-400' : 'bg-gray-100 text-green-600'}`}>
            {`<div className="grid grid-cols-1 md:grid-cols-2 gap-4">`}
          </code>
        </div>

        <div>
          <h3 className={`text-lg mb-4 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>3 Column Grid</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`h-24 rounded-xl ${isDarkMode ? 'bg-white/5' : 'bg-black/5'} flex items-center justify-center ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
              Column 1
            </div>
            <div className={`h-24 rounded-xl ${isDarkMode ? 'bg-white/5' : 'bg-black/5'} flex items-center justify-center ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
              Column 2
            </div>
            <div className={`h-24 rounded-xl ${isDarkMode ? 'bg-white/5' : 'bg-black/5'} flex items-center justify-center ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
              Column 3
            </div>
          </div>
          <code className={`block mt-4 p-3 rounded-lg text-sm ${isDarkMode ? 'bg-black/20 text-green-400' : 'bg-gray-100 text-green-600'}`}>
            {`<div className="grid grid-cols-1 md:grid-cols-3 gap-4">`}
          </code>
        </div>

        <div>
          <h3 className={`text-lg mb-4 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>4 Column Grid</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className={`h-24 rounded-xl ${isDarkMode ? 'bg-white/5' : 'bg-black/5'} flex items-center justify-center ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
              Col 1
            </div>
            <div className={`h-24 rounded-xl ${isDarkMode ? 'bg-white/5' : 'bg-black/5'} flex items-center justify-center ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
              Col 2
            </div>
            <div className={`h-24 rounded-xl ${isDarkMode ? 'bg-white/5' : 'bg-black/5'} flex items-center justify-center ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
              Col 3
            </div>
            <div className={`h-24 rounded-xl ${isDarkMode ? 'bg-white/5' : 'bg-black/5'} flex items-center justify-center ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
              Col 4
            </div>
          </div>
          <code className={`block mt-4 p-3 rounded-lg text-sm ${isDarkMode ? 'bg-black/20 text-green-400' : 'bg-gray-100 text-green-600'}`}>
            {`<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">`}
          </code>
        </div>
      </section>

      {/* Sidebar Components */}
      <section className="glass-card p-8 rounded-2xl space-y-6">
        <div>
          <h2 className={`text-2xl mb-2 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
            Sidebar Components
          </h2>
          <p className={`text-sm mb-6 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
            Collapsible sidebars with context-aware navigation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className={`text-lg mb-4 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>Left Sidebar (Expanded)</h3>
            <div className={`w-64 p-4 rounded-xl ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}>
              <div className="flex items-center justify-between mb-6">
                <div className={`flex items-center gap-2 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                  <SidebarIcon className="w-5 h-5" />
                  <span>Navigation</span>
                </div>
                <button className={`p-1.5 rounded-lg ${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-black/5'}`}>
                  <ChevronLeft className={`w-5 h-5 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`} />
                </button>
              </div>
              <div className="space-y-2">
                <div className={`px-4 py-3 rounded-lg flex items-center gap-3 ${isDarkMode ? 'bg-cyan-500/20 text-cyan-400' : 'bg-cyan-500/20 text-cyan-600'}`}>
                  <Menu className="w-5 h-5" />
                  <span>Active Page</span>
                </div>
                <div className={`px-4 py-3 rounded-lg flex items-center gap-3 ${isDarkMode ? 'text-white/60 hover:bg-white/5' : 'text-black/60 hover:bg-black/5'} cursor-pointer`}>
                  <Menu className="w-5 h-5" />
                  <span>Menu Item</span>
                </div>
                <div className={`px-4 py-3 rounded-lg flex items-center gap-3 ${isDarkMode ? 'text-white/60 hover:bg-white/5' : 'text-black/60 hover:bg-black/5'} cursor-pointer`}>
                  <Menu className="w-5 h-5" />
                  <span>Menu Item</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className={`text-lg mb-4 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>Left Sidebar (Collapsed)</h3>
            <div className={`w-16 p-2 rounded-xl ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}>
              <div className="flex flex-col items-center gap-2 mb-6">
                <button className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-black/5'}`}>
                  <ChevronRight className={`w-5 h-5 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`} />
                </button>
              </div>
              <div className="space-y-2">
                <div className={`p-3 rounded-lg flex items-center justify-center ${isDarkMode ? 'bg-cyan-500/20' : 'bg-cyan-500/20'}`}>
                  <Menu className="w-5 h-5 text-cyan-400" />
                </div>
                <div className={`p-3 rounded-lg flex items-center justify-center ${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-black/5'} cursor-pointer`}>
                  <Menu className={`w-5 h-5 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`} />
                </div>
                <div className={`p-3 rounded-lg flex items-center justify-center ${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-black/5'} cursor-pointer`}>
                  <Menu className={`w-5 h-5 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spacing System */}
      <section className="glass-card p-8 rounded-2xl space-y-6">
        <div>
          <h2 className={`text-2xl mb-2 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
            Spacing System
          </h2>
          <p className={`text-sm mb-6 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
            Consistent spacing scale based on 4px increments
          </p>
        </div>

        <div className="space-y-4">
          {[
            { size: '1', px: '4px', class: 'space-1' },
            { size: '2', px: '8px', class: 'space-2' },
            { size: '3', px: '12px', class: 'space-3' },
            { size: '4', px: '16px', class: 'space-4' },
            { size: '6', px: '24px', class: 'space-6' },
            { size: '8', px: '32px', class: 'space-8' },
            { size: '12', px: '48px', class: 'space-12' },
          ].map(({ size, px, class: className }) => (
            <div key={size} className="flex items-center gap-6">
              <div className={`w-24 text-sm ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
                {className}
              </div>
              <div className={`h-8 bg-cyan-500/20 rounded`} style={{ width: px }}></div>
              <div className={`text-sm ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
                {px}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Container Widths */}
      <section className="glass-card p-8 rounded-2xl space-y-6">
        <div>
          <h2 className={`text-2xl mb-2 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
            Container Widths
          </h2>
          <p className={`text-sm mb-6 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
            Maximum width constraints for different content types
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <p className={`text-sm mb-2 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>max-w-sm (384px)</p>
            <div className={`max-w-sm h-12 rounded-xl ${isDarkMode ? 'bg-cyan-500/20' : 'bg-cyan-500/20'}`}></div>
          </div>
          <div>
            <p className={`text-sm mb-2 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>max-w-md (448px)</p>
            <div className={`max-w-md h-12 rounded-xl ${isDarkMode ? 'bg-purple-500/20' : 'bg-purple-500/20'}`}></div>
          </div>
          <div>
            <p className={`text-sm mb-2 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>max-w-lg (512px)</p>
            <div className={`max-w-lg h-12 rounded-xl ${isDarkMode ? 'bg-orange-500/20' : 'bg-orange-500/20'}`}></div>
          </div>
          <div>
            <p className={`text-sm mb-2 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>max-w-2xl (672px)</p>
            <div className={`max-w-2xl h-12 rounded-xl ${isDarkMode ? 'bg-green-500/20' : 'bg-green-500/20'}`}></div>
          </div>
        </div>
      </section>

      {/* Flexbox Layouts */}
      <section className="glass-card p-8 rounded-2xl space-y-6">
        <div>
          <h2 className={`text-2xl mb-2 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
            Flexbox Layouts
          </h2>
          <p className={`text-sm mb-6 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
            Common flexbox patterns for alignment and distribution
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <p className={`text-sm mb-2 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>Space Between</p>
            <div className={`flex items-center justify-between p-4 rounded-xl ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}>
              <div className={`w-16 h-16 rounded-lg ${isDarkMode ? 'bg-cyan-500/20' : 'bg-cyan-500/20'}`}></div>
              <div className={`w-16 h-16 rounded-lg ${isDarkMode ? 'bg-purple-500/20' : 'bg-purple-500/20'}`}></div>
              <div className={`w-16 h-16 rounded-lg ${isDarkMode ? 'bg-orange-500/20' : 'bg-orange-500/20'}`}></div>
            </div>
            <code className={`block mt-2 text-xs ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
              flex items-center justify-between
            </code>
          </div>

          <div>
            <p className={`text-sm mb-2 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>Center</p>
            <div className={`flex items-center justify-center p-4 rounded-xl ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}>
              <div className={`w-16 h-16 rounded-lg ${isDarkMode ? 'bg-green-500/20' : 'bg-green-500/20'}`}></div>
            </div>
            <code className={`block mt-2 text-xs ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
              flex items-center justify-center
            </code>
          </div>

          <div>
            <p className={`text-sm mb-2 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>Gap Spacing</p>
            <div className={`flex items-center gap-4 p-4 rounded-xl ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}>
              <div className={`w-16 h-16 rounded-lg ${isDarkMode ? 'bg-cyan-500/20' : 'bg-cyan-500/20'}`}></div>
              <div className={`w-16 h-16 rounded-lg ${isDarkMode ? 'bg-purple-500/20' : 'bg-purple-500/20'}`}></div>
              <div className={`w-16 h-16 rounded-lg ${isDarkMode ? 'bg-orange-500/20' : 'bg-orange-500/20'}`}></div>
            </div>
            <code className={`block mt-2 text-xs ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
              flex items-center gap-4
            </code>
          </div>
        </div>
      </section>
    </div>
  );
}
