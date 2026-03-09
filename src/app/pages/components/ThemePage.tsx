import './styles';
import { useTheme } from '../../contexts/ThemeContext';
import { Palette, Droplet, Type, Square } from 'lucide-react';

export default function ThemePage() {
  const { isDarkMode } = useTheme();

  const colors = [
    { name: 'Cyan', hex: '#06b6d4', class: 'bg-cyan-500', usage: 'Primary actions, links, highlights' },
    { name: 'Purple', hex: '#a855f7', class: 'bg-purple-500', usage: 'Secondary actions, accents' },
    { name: 'Orange', hex: '#f97316', class: 'bg-orange-500', usage: 'Warnings, highlights, CTAs' },
    { name: 'Green', hex: '#22c55e', class: 'bg-green-500', usage: 'Success states, positive metrics' },
    { name: 'Red', hex: '#ef4444', class: 'bg-red-500', usage: 'Error states, destructive actions' },
    { name: 'Yellow', hex: '#eab308', class: 'bg-yellow-500', usage: 'Warning states, caution' },
    { name: 'Pink', hex: '#ec4899', class: 'bg-pink-500', usage: 'Special highlights, accents' },
  ];

  const opacityLevels = [
    { value: '95%', class: 'text-white/95', usage: 'Primary headings' },
    { value: '90%', class: 'text-white/90', usage: 'Subheadings' },
    { value: '80%', class: 'text-white/80', usage: 'Body text' },
    { value: '70%', class: 'text-white/70', usage: 'Labels' },
    { value: '60%', class: 'text-white/60', usage: 'Secondary text' },
    { value: '50%', class: 'text-white/50', usage: 'Muted text' },
    { value: '40%', class: 'text-white/40', usage: 'Disabled text' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className={`text-3xl mb-2 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
          Theme & Colors
        </h1>
        <p className={isDarkMode ? 'text-white/60' : 'text-black/60'}>
          Color system, typography, design tokens, and theme variables
        </p>
      </div>

      {/* Color Palette */}
      <section className="glass-card p-8 rounded-2xl space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <Palette className={`w-6 h-6 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`} />
          <h2 className={`text-2xl ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
            Color Palette
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {colors.map((color) => (
            <div key={color.name} className={`glass-card p-6 rounded-2xl border ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
              <div className={`w-full h-24 rounded-xl ${color.class} mb-4`}></div>
              <h3 className={`text-lg mb-2 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
                {color.name}
              </h3>
              <p className={`text-sm mb-2 font-mono ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
                {color.hex}
              </p>
              <p className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                {color.usage}
              </p>
            </div>
          ))}
        </div>

        <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-black/20' : 'bg-gray-100'}`}>
          <code className={`text-sm ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
            {`className="bg-cyan-500" or className="text-cyan-500"`}
          </code>
        </div>
      </section>

      {/* Gradient Combinations */}
      <section className="glass-card p-8 rounded-2xl space-y-6">
        <div>
          <h2 className={`text-2xl mb-2 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
            Gradient Combinations
          </h2>
          <p className={`text-sm mb-6 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
            Primary gradient combinations used throughout the app
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="h-24 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 mb-3"></div>
            <p className={`text-sm font-mono ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
              from-cyan-500 to-purple-500
            </p>
            <p className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>Primary actions, buttons</p>
          </div>

          <div>
            <div className="h-24 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 mb-3"></div>
            <p className={`text-sm font-mono ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
              from-purple-500 to-pink-500
            </p>
            <p className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>Special highlights</p>
          </div>

          <div>
            <div className="h-24 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 mb-3"></div>
            <p className={`text-sm font-mono ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
              from-orange-500 to-red-500
            </p>
            <p className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>Warnings, important actions</p>
          </div>

          <div>
            <div className="h-24 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 mb-3"></div>
            <p className={`text-sm font-mono ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
              from-green-500 to-emerald-500
            </p>
            <p className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>Success states, confirmations</p>
          </div>
        </div>
      </section>

      {/* Typography */}
      <section className="glass-card p-8 rounded-2xl space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <Type className={`w-6 h-6 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`} />
          <h2 className={`text-2xl ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
            Typography
          </h2>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className={`text-4xl mb-2 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
              Heading 1 - 4xl
            </h1>
            <code className={`text-sm ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
              text-4xl (36px)
            </code>
          </div>

          <div>
            <h2 className={`text-3xl mb-2 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
              Heading 2 - 3xl
            </h2>
            <code className={`text-sm ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
              text-3xl (30px)
            </code>
          </div>

          <div>
            <h3 className={`text-2xl mb-2 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
              Heading 3 - 2xl
            </h3>
            <code className={`text-sm ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
              text-2xl (24px)
            </code>
          </div>

          <div>
            <h4 className={`text-xl mb-2 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
              Heading 4 - xl
            </h4>
            <code className={`text-sm ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
              text-xl (20px)
            </code>
          </div>

          <div>
            <h5 className={`text-lg mb-2 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
              Heading 5 - lg
            </h5>
            <code className={`text-sm ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
              text-lg (18px)
            </code>
          </div>

          <div>
            <p className={`text-base mb-2 ${isDarkMode ? 'text-white/80' : 'text-black/80'}`}>
              Body Text - base (16px)
            </p>
            <code className={`text-sm ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
              text-base
            </code>
          </div>

          <div>
            <p className={`text-sm mb-2 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
              Small Text - sm (14px)
            </p>
            <code className={`text-sm ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
              text-sm
            </code>
          </div>

          <div>
            <p className={`text-xs mb-2 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
              Extra Small Text - xs (12px)
            </p>
            <code className={`text-sm ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
              text-xs
            </code>
          </div>
        </div>
      </section>

      {/* Text Opacity Levels */}
      <section className="glass-card p-8 rounded-2xl space-y-6">
        <div>
          <h2 className={`text-2xl mb-2 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
            Text Opacity Hierarchy
          </h2>
          <p className={`text-sm mb-6 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
            Consistent text opacity levels for visual hierarchy
          </p>
        </div>

        <div className="space-y-4">
          {opacityLevels.map((level) => (
            <div key={level.value} className="flex items-center gap-6">
              <div className={`w-32 text-sm font-mono ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
                {level.class}
              </div>
              <div className={`flex-1 ${level.class}`}>
                The quick brown fox jumps over the lazy dog
              </div>
              <div className={`text-sm ${isDarkMode ? 'text-white/50' : 'text-black/50'} w-40`}>
                {level.usage}
              </div>
            </div>
          ))}
        </div>

        <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-black/20' : 'bg-gray-100'}`}>
          <code className={`text-sm ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
            {`className="text-white/70"`}
          </code>
        </div>
      </section>

      {/* Glassmorphism */}
      <section className="glass-card p-8 rounded-2xl space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <Square className={`w-6 h-6 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`} />
          <h2 className={`text-2xl ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
            Glassmorphism Effect
          </h2>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className={`text-lg mb-4 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
              Glass Card Base
            </h3>
            <div className={`p-6 rounded-2xl ${isDarkMode ? 'bg-white/5' : 'bg-black/5'} backdrop-blur-md border ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
              <p className={isDarkMode ? 'text-white/80' : 'text-black/80'}>
                This is a glassmorphic card with backdrop blur and subtle transparency
              </p>
            </div>
            <div className={`p-4 rounded-lg mt-4 ${isDarkMode ? 'bg-black/20' : 'bg-gray-100'}`}>
              <pre className={`text-sm ${isDarkMode ? 'text-green-400' : 'text-green-600'} overflow-x-auto`}>
{`.glass-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}`}
              </pre>
            </div>
          </div>

          <div>
            <h3 className={`text-lg mb-4 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
              Blur Levels
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`} style={{ backdropFilter: 'blur(12px)' }}>
                <p className={`text-sm ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>Subtle Blur</p>
                <code className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>blur(12px)</code>
              </div>
              <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`} style={{ backdropFilter: 'blur(24px)' }}>
                <p className={`text-sm ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>Standard Blur</p>
                <code className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>blur(24px)</code>
              </div>
              <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`} style={{ backdropFilter: 'blur(40px)' }}>
                <p className={`text-sm ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>Heavy Blur</p>
                <code className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>blur(40px)</code>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Border Radius */}
      <section className="glass-card p-8 rounded-2xl space-y-6">
        <div>
          <h2 className={`text-2xl mb-2 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
            Border Radius
          </h2>
          <p className={`text-sm mb-6 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
            Consistent rounded corners throughout the application
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <div className={`h-24 rounded-lg ${isDarkMode ? 'bg-cyan-500/20' : 'bg-cyan-500/20'} mb-3`}></div>
            <p className={`text-sm font-mono ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
              rounded-lg
            </p>
            <p className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>8px - Small elements</p>
          </div>

          <div>
            <div className={`h-24 rounded-xl ${isDarkMode ? 'bg-purple-500/20' : 'bg-purple-500/20'} mb-3`}></div>
            <p className={`text-sm font-mono ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
              rounded-xl
            </p>
            <p className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>12px - Buttons, inputs</p>
          </div>

          <div>
            <div className={`h-24 rounded-2xl ${isDarkMode ? 'bg-orange-500/20' : 'bg-orange-500/20'} mb-3`}></div>
            <p className={`text-sm font-mono ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
              rounded-2xl
            </p>
            <p className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>16px - Cards, panels</p>
          </div>

          <div>
            <div className={`h-24 rounded-full ${isDarkMode ? 'bg-green-500/20' : 'bg-green-500/20'} mb-3`}></div>
            <p className={`text-sm font-mono ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
              rounded-full
            </p>
            <p className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>Circles, avatars</p>
          </div>
        </div>
      </section>

      {/* Transitions */}
      <section className="glass-card p-8 rounded-2xl space-y-6">
        <div>
          <h2 className={`text-2xl mb-2 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
            Transitions & Animations
          </h2>
          <p className={`text-sm mb-6 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
            Smooth transitions for better user experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className={`text-sm mb-3 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
              Smooth Transition (0.2s)
            </p>
            <div className={`p-6 rounded-xl smooth-transition cursor-pointer ${isDarkMode ? 'bg-cyan-500/20 hover:bg-cyan-500/30' : 'bg-cyan-500/20 hover:bg-cyan-500/30'}`}>
              Hover me
            </div>
            <code className={`block mt-2 text-xs ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
              .smooth-transition
            </code>
          </div>

          <div>
            <p className={`text-sm mb-3 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
              Scale on Hover
            </p>
            <div className={`p-6 rounded-xl smooth-transition hover:scale-[1.05] cursor-pointer ${isDarkMode ? 'bg-purple-500/20' : 'bg-purple-500/20'}`}>
              Hover me
            </div>
            <code className={`block mt-2 text-xs ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
              hover:scale-[1.05]
            </code>
          </div>
        </div>

        <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-black/20' : 'bg-gray-100'}`}>
          <pre className={`text-sm ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
{`.smooth-transition {
  transition: all 0.2s ease-in-out;
}`}
          </pre>
        </div>
      </section>

      {/* Dark Mode */}
      <section className="glass-card p-8 rounded-2xl space-y-6">
        <div>
          <h2 className={`text-2xl mb-2 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
            Dark Mode Theme
          </h2>
          <p className={`text-sm mb-6 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
            The application uses dark mode as the primary theme
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className={`text-lg mb-3 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
              Background Colors
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-lg" style={{ background: '#0f0f19' }}></div>
                <div>
                  <p className={`text-sm font-mono ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>#0f0f19</p>
                  <p className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>Main background</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-lg ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}></div>
                <div>
                  <p className={`text-sm font-mono ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>white/5</p>
                  <p className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>Card backgrounds</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className={`text-lg mb-3 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
              Border Colors
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-lg border-2 ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}></div>
                <div>
                  <p className={`text-sm font-mono ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>white/10</p>
                  <p className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>Subtle borders</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-lg border-2 ${isDarkMode ? 'border-white/20' : 'border-black/20'}`}></div>
                <div>
                  <p className={`text-sm font-mono ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>white/20</p>
                  <p className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>Emphasis borders</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
