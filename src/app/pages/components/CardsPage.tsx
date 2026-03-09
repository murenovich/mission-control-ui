import { useTheme } from '../../contexts/ThemeContext';
import { TrendingUp, Users, DollarSign, Activity, Calendar, Clock, MoreVertical, Heart, MessageCircle, Share2, Bookmark } from 'lucide-react';

export default function CardsPage() {
  const { isDarkMode } = useTheme();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className={`text-3xl mb-2 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
          Cards & Containers
        </h1>
        <p className={isDarkMode ? 'text-white/60' : 'text-black/60'}>
          Glassmorphic cards, panels, and content containers with various layouts
        </p>
      </div>

      {/* Basic Glass Card */}
      <section className="space-y-6">
        <div>
          <h2 className={`text-2xl mb-2 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
            Basic Glass Card
          </h2>
          <p className={`text-sm mb-6 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
            Standard glassmorphic card with backdrop blur
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="glass-card p-6 rounded-2xl">
            <h3 className={`text-lg mb-2 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
              Simple Card
            </h3>
            <p className={isDarkMode ? 'text-white/60' : 'text-black/60'}>
              This is a basic glass card with padding and rounded corners. Perfect for grouping content.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl">
            <h3 className={`text-lg mb-2 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
              Another Card
            </h3>
            <p className={isDarkMode ? 'text-white/60' : 'text-black/60'}>
              Multiple cards can be displayed in a grid layout for consistent spacing.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl">
            <h3 className={`text-lg mb-2 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
              Third Card
            </h3>
            <p className={isDarkMode ? 'text-white/60' : 'text-black/60'}>
              The glass-card class provides the glassmorphic effect throughout the app.
            </p>
          </div>
        </div>

        <div className={`mt-6 p-4 rounded-lg glass-card`}>
          <code className={`text-sm ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
            {`<div className="glass-card p-6 rounded-2xl">...</div>`}
          </code>
        </div>
      </section>

      {/* Stat Cards */}
      <section className="space-y-6">
        <div>
          <h2 className={`text-2xl mb-2 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
            Stat Cards
          </h2>
          <p className={`text-sm mb-6 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
            Cards displaying key metrics with icons and gradient backgrounds
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-card p-6 rounded-2xl">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                isDarkMode ? 'bg-cyan-500/20' : 'bg-cyan-500/20'
              }`}>
                <TrendingUp className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                  Total Revenue
                </p>
                <p className={`text-2xl ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
                  $45,231
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm text-green-400">
              <TrendingUp className="w-4 h-4" />
              <span>+12.5%</span>
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                isDarkMode ? 'bg-purple-500/20' : 'bg-purple-500/20'
              }`}>
                <Users className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                  Active Users
                </p>
                <p className={`text-2xl ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
                  2,345
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm text-green-400">
              <TrendingUp className="w-4 h-4" />
              <span>+8.2%</span>
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                isDarkMode ? 'bg-orange-500/20' : 'bg-orange-500/20'
              }`}>
                <DollarSign className="w-6 h-6 text-orange-400" />
              </div>
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                  Sales
                </p>
                <p className={`text-2xl ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
                  $12,426
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm text-red-400">
              <TrendingUp className="w-4 h-4 rotate-180" />
              <span>-3.1%</span>
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                isDarkMode ? 'bg-green-500/20' : 'bg-green-500/20'
              }`}>
                <Activity className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                  Active Tasks
                </p>
                <p className={`text-2xl ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
                  42
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm text-green-400">
              <TrendingUp className="w-4 h-4" />
              <span>+5.3%</span>
            </div>
          </div>
        </div>
      </section>

      {/* Social Card */}
      <section className="space-y-6">
        <div>
          <h2 className={`text-2xl mb-2 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
            Social Media Card
          </h2>
          <p className={`text-sm mb-6 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
            Card with image, actions, and engagement metrics
          </p>
        </div>

        <div className="max-w-2xl">
          <div className="glass-card rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
                  <span className="text-white">JD</span>
                </div>
                <div>
                  <p className={`font-medium ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
                    John Doe
                  </p>
                  <p className={`text-sm ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
                    2 hours ago
                  </p>
                </div>
              </div>
              <button className={`p-2 rounded-lg ${
                isDarkMode ? 'hover:bg-white/5' : 'hover:bg-black/5'
              }`}>
                <MoreVertical className={`w-5 h-5 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`} />
              </button>
            </div>

            {/* Content */}
            <div className="px-6 pb-4">
              <p className={isDarkMode ? 'text-white/80' : 'text-black/80'}>
                Just finished building an amazing component library! Check out the glassmorphic design 🎨
              </p>
            </div>

            {/* Image */}
            <img
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop"
              alt="Post"
              className="w-full h-64 object-cover"
            />

            {/* Actions */}
            <div className={`p-6 flex items-center gap-6 border-t ${
              isDarkMode ? 'border-white/5' : 'border-black/5'
            }`}>
              <button className={`flex items-center gap-2 ${isDarkMode ? 'text-white/60 hover:text-red-400' : 'text-black/60 hover:text-red-600'} smooth-transition`}>
                <Heart className="w-5 h-5" />
                <span>124</span>
              </button>
              <button className={`flex items-center gap-2 ${isDarkMode ? 'text-white/60 hover:text-cyan-400' : 'text-black/60 hover:text-cyan-600'} smooth-transition`}>
                <MessageCircle className="w-5 h-5" />
                <span>32</span>
              </button>
              <button className={`flex items-center gap-2 ${isDarkMode ? 'text-white/60 hover:text-purple-400' : 'text-black/60 hover:text-purple-600'} smooth-transition`}>
                <Share2 className="w-5 h-5" />
                <span>18</span>
              </button>
              <button className={`ml-auto ${isDarkMode ? 'text-white/60 hover:text-orange-400' : 'text-black/60 hover:text-orange-600'} smooth-transition`}>
                <Bookmark className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Event Card */}
      <section className="space-y-6">
        <div>
          <h2 className={`text-2xl mb-2 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
            Event/Task Card
          </h2>
          <p className={`text-sm mb-6 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
            Card displaying scheduled events with date and time
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card rounded-2xl p-6">
            <div className="flex gap-4">
              <div className={`w-16 h-16 rounded-xl flex flex-col items-center justify-center ${
                isDarkMode ? 'bg-cyan-500/20' : 'bg-cyan-500/20'
              }`}>
                <span className="text-2xl text-cyan-400 font-bold">15</span>
                <span className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>MAR</span>
              </div>
              <div className="flex-1">
                <h3 className={`text-lg mb-1 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
                  Team Meeting
                </h3>
                <div className="flex items-center gap-4 text-sm">
                  <div className={`flex items-center gap-1.5 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                    <Clock className="w-4 h-4" />
                    <span>2:00 PM - 3:30 PM</span>
                  </div>
                </div>
                <p className={`text-sm mt-2 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                  Quarterly planning and roadmap discussion
                </p>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <div className="flex gap-4">
              <div className={`w-16 h-16 rounded-xl flex flex-col items-center justify-center ${
                isDarkMode ? 'bg-purple-500/20' : 'bg-purple-500/20'
              }`}>
                <span className="text-2xl text-purple-400 font-bold">20</span>
                <span className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>MAR</span>
              </div>
              <div className="flex-1">
                <h3 className={`text-lg mb-1 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
                  Product Launch
                </h3>
                <div className="flex items-center gap-4 text-sm">
                  <div className={`flex items-center gap-1.5 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                    <Calendar className="w-4 h-4" />
                    <span>All Day Event</span>
                  </div>
                </div>
                <p className={`text-sm mt-2 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                  New feature release and announcement
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hover Effect Cards */}
      <section className="space-y-6">
        <div>
          <h2 className={`text-2xl mb-2 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
            Interactive Cards
          </h2>
          <p className={`text-sm mb-6 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
            Cards with hover effects and transitions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={`glass-card rounded-2xl p-6 smooth-transition hover:scale-[1.03] cursor-pointer ${
            isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/10'
          }`}>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center mb-4">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <h3 className={`text-lg mb-2 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
              Hover to Scale
            </h3>
            <p className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
              This card grows slightly on hover
            </p>
          </div>

          <div className={`glass-card rounded-2xl p-6 smooth-transition hover:scale-[1.03] cursor-pointer ${
            isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/10'
          }`}>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h3 className={`text-lg mb-2 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
              Interactive
            </h3>
            <p className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
              Smooth hover transitions
            </p>
          </div>

          <div className={`glass-card rounded-2xl p-6 smooth-transition hover:scale-[1.03] cursor-pointer ${
            isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/10'
          }`}>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className={`text-lg mb-2 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
              Clickable
            </h3>
            <p className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
              Cards can be made clickable
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
