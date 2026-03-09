import './styles';
import { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Plus, Save, Trash2, Download, Upload, Edit2, Check, X, ChevronRight, ArrowRight, Loader, Play, Pause, Star, Heart, Share2, Settings } from 'lucide-react';

export default function ButtonsPage() {
  const { isDarkMode } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [liked, setLiked] = useState(false);
  const [starred, setStarred] = useState(false);

  const handleLoadingClick = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className={`text-3xl mb-2 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
          Buttons & Actions
        </h1>
        <p className={isDarkMode ? 'text-white/60' : 'text-black/60'}>
          Interactive buttons, links, and action triggers used throughout the application
        </p>
      </div>

      {/* Primary Buttons */}
      <section className="glass-card p-8 rounded-2xl space-y-6">
        <div>
          <h2 className={`text-2xl mb-2 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
            Primary Buttons
          </h2>
          <p className={`text-sm mb-6 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
            Main action buttons with gradient backgrounds and icon support
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <button className="px-6 py-3 rounded-xl smooth-transition bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:from-cyan-600 hover:to-purple-600">
            Primary Action
          </button>
          
          <button className="px-6 py-3 rounded-xl smooth-transition bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:from-cyan-600 hover:to-purple-600 flex items-center gap-2">
            <Plus className="w-5 h-5" />
            With Icon
          </button>

          <button className="px-6 py-3 rounded-xl smooth-transition bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 flex items-center gap-2">
            <Save className="w-5 h-5" />
            Save Changes
          </button>

          <button className="px-6 py-3 rounded-xl smooth-transition bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 flex items-center gap-2">
            <Check className="w-5 h-5" />
            Confirm
          </button>

          <button 
            onClick={handleLoadingClick}
            disabled={isLoading}
            className="px-6 py-3 rounded-xl smooth-transition bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 flex items-center gap-2 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                Loading...
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                Download
              </>
            )}
          </button>
        </div>

        <div className={`mt-6 p-4 rounded-lg ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}>
          <code className={`text-sm ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
            {`<button className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white">`}
          </code>
        </div>
      </section>

      {/* Secondary Buttons */}
      <section className="glass-card p-8 rounded-2xl space-y-6">
        <div>
          <h2 className={`text-2xl mb-2 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
            Secondary Buttons
          </h2>
          <p className={`text-sm mb-6 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
            Subtle glass-styled buttons for secondary actions
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <button className={`px-6 py-3 rounded-xl smooth-transition ${
            isDarkMode 
              ? 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white/90 border border-white/10'
              : 'bg-black/5 text-black/70 hover:bg-black/10 hover:text-black/90 border border-black/10'
          }`}>
            Secondary
          </button>

          <button className={`px-6 py-3 rounded-xl smooth-transition ${
            isDarkMode 
              ? 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white/90 border border-white/10'
              : 'bg-black/5 text-black/70 hover:bg-black/10 hover:text-black/90 border border-black/10'
          } flex items-center gap-2`}>
            <Edit2 className="w-5 h-5" />
            Edit
          </button>

          <button className={`px-6 py-3 rounded-xl smooth-transition ${
            isDarkMode 
              ? 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white/90 border border-white/10'
              : 'bg-black/5 text-black/70 hover:bg-black/10 hover:text-black/90 border border-black/10'
          } flex items-center gap-2`}>
            Cancel
          </button>
        </div>
      </section>

      {/* Icon Buttons */}
      <section className="glass-card p-8 rounded-2xl space-y-6">
        <div>
          <h2 className={`text-2xl mb-2 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
            Icon Buttons
          </h2>
          <p className={`text-sm mb-6 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
            Compact icon-only buttons for toolbars and actions
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <button className={`p-3 rounded-lg smooth-transition ${
            isDarkMode 
              ? 'hover:bg-white/5 text-white/60 hover:text-white/90'
              : 'hover:bg-black/5 text-black/60 hover:text-black/90'
          }`}>
            <Edit2 className="w-5 h-5" />
          </button>

          <button className={`p-3 rounded-lg smooth-transition ${
            isDarkMode 
              ? 'hover:bg-red-500/20 text-white/60 hover:text-red-400'
              : 'hover:bg-red-500/20 text-black/60 hover:text-red-600'
          }`}>
            <Trash2 className="w-5 h-5" />
          </button>

          <button className={`p-3 rounded-lg smooth-transition ${
            isDarkMode 
              ? 'hover:bg-cyan-500/20 text-white/60 hover:text-cyan-400'
              : 'hover:bg-cyan-500/20 text-black/60 hover:text-cyan-600'
          }`}>
            <Download className="w-5 h-5" />
          </button>

          <button className={`p-3 rounded-lg smooth-transition ${
            isDarkMode 
              ? 'hover:bg-purple-500/20 text-white/60 hover:text-purple-400'
              : 'hover:bg-purple-500/20 text-black/60 hover:text-purple-600'
          }`}>
            <Upload className="w-5 h-5" />
          </button>

          <button className={`p-3 rounded-lg smooth-transition ${
            isDarkMode 
              ? 'hover:bg-white/5 text-white/60 hover:text-white/90'
              : 'hover:bg-black/5 text-black/60 hover:text-black/90'
          }`}>
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Action Buttons with States */}
      <section className="glass-card p-8 rounded-2xl space-y-6">
        <div>
          <h2 className={`text-2xl mb-2 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
            Interactive States
          </h2>
          <p className={`text-sm mb-6 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
            Buttons with toggle states and active indicators
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => setLiked(!liked)}
            className={`p-3 rounded-lg smooth-transition ${
              liked
                ? isDarkMode
                  ? 'bg-red-500/20 text-red-400'
                  : 'bg-red-500/20 text-red-600'
                : isDarkMode
                ? 'hover:bg-white/5 text-white/60 hover:text-white/90'
                : 'hover:bg-black/5 text-black/60 hover:text-black/90'
            }`}
          >
            <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
          </button>

          <button
            onClick={() => setStarred(!starred)}
            className={`p-3 rounded-lg smooth-transition ${
              starred
                ? isDarkMode
                  ? 'bg-yellow-500/20 text-yellow-400'
                  : 'bg-yellow-500/20 text-yellow-600'
                : isDarkMode
                ? 'hover:bg-white/5 text-white/60 hover:text-white/90'
                : 'hover:bg-black/5 text-black/60 hover:text-black/90'
            }`}
          >
            <Star className={`w-5 h-5 ${starred ? 'fill-current' : ''}`} />
          </button>

          <button className={`p-3 rounded-lg smooth-transition ${
            isDarkMode
              ? 'bg-green-500/20 text-green-400'
              : 'bg-green-500/20 text-green-600'
          }`}>
            <Play className="w-5 h-5 fill-current" />
          </button>

          <button className={`p-3 rounded-lg smooth-transition ${
            isDarkMode
              ? 'bg-orange-500/20 text-orange-400'
              : 'bg-orange-500/20 text-orange-600'
          }`}>
            <Pause className="w-5 h-5 fill-current" />
          </button>
        </div>
      </section>

      {/* Button Sizes */}
      <section className="glass-card p-8 rounded-2xl space-y-6">
        <div>
          <h2 className={`text-2xl mb-2 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
            Button Sizes
          </h2>
          <p className={`text-sm mb-6 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
            Different button sizes for various contexts
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <button className="px-3 py-1.5 text-sm rounded-lg smooth-transition bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:from-cyan-600 hover:to-purple-600">
            Small
          </button>

          <button className="px-5 py-2.5 text-sm rounded-xl smooth-transition bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:from-cyan-600 hover:to-purple-600">
            Medium
          </button>

          <button className="px-6 py-3 text-base rounded-xl smooth-transition bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:from-cyan-600 hover:to-purple-600">
            Large
          </button>

          <button className="px-8 py-4 text-lg rounded-xl smooth-transition bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:from-cyan-600 hover:to-purple-600">
            Extra Large
          </button>
        </div>
      </section>

      {/* Button Groups */}
      <section className="glass-card p-8 rounded-2xl space-y-6">
        <div>
          <h2 className={`text-2xl mb-2 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
            Button Groups
          </h2>
          <p className={`text-sm mb-6 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
            Grouped buttons for related actions
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className={`flex items-center gap-2 glass-card p-1.5 rounded-xl w-fit`}>
            <button className={`px-4 py-2 rounded-lg smooth-transition ${
              isDarkMode
                ? 'bg-cyan-500/20 text-cyan-400'
                : 'bg-cyan-500/20 text-cyan-600'
            }`}>
              Active
            </button>
            <button className={`px-4 py-2 rounded-lg smooth-transition ${
              isDarkMode
                ? 'text-white/60 hover:text-white/90 hover:bg-white/5'
                : 'text-black/60 hover:text-black/90 hover:bg-black/5'
            }`}>
              Inactive
            </button>
            <button className={`px-4 py-2 rounded-lg smooth-transition ${
              isDarkMode
                ? 'text-white/60 hover:text-white/90 hover:bg-white/5'
                : 'text-black/60 hover:text-black/90 hover:bg-black/5'
            }`}>
              Inactive
            </button>
          </div>

          <div className="flex gap-2">
            <button className={`flex-1 px-6 py-3 rounded-xl smooth-transition ${
              isDarkMode 
                ? 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white/90 border border-white/10'
                : 'bg-black/5 text-black/70 hover:bg-black/10 hover:text-black/90 border border-black/10'
            }`}>
              Cancel
            </button>
            <button className="flex-1 px-6 py-3 rounded-xl smooth-transition bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:from-cyan-600 hover:to-purple-600">
              Confirm
            </button>
          </div>
        </div>
      </section>

      {/* Link Buttons */}
      <section className="glass-card p-8 rounded-2xl space-y-6">
        <div>
          <h2 className={`text-2xl mb-2 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
            Link Buttons
          </h2>
          <p className={`text-sm mb-6 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
            Text-based buttons and links
          </p>
        </div>

        <div className="flex flex-wrap gap-6">
          <button className={`text-cyan-400 hover:text-cyan-300 smooth-transition flex items-center gap-2`}>
            Learn More
            <ChevronRight className="w-4 h-4" />
          </button>

          <button className={`text-purple-400 hover:text-purple-300 smooth-transition flex items-center gap-2`}>
            View Details
            <ArrowRight className="w-4 h-4" />
          </button>

          <button className={`${isDarkMode ? 'text-white/70 hover:text-white/90' : 'text-black/70 hover:text-black/90'} smooth-transition underline`}>
            Simple Link
          </button>

          <button className={`text-red-400 hover:text-red-300 smooth-transition flex items-center gap-2`}>
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </section>

      {/* Disabled State */}
      <section className="glass-card p-8 rounded-2xl space-y-6">
        <div>
          <h2 className={`text-2xl mb-2 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
            Disabled State
          </h2>
          <p className={`text-sm mb-6 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
            Disabled button variations
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <button disabled className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white opacity-50 cursor-not-allowed">
            Disabled Primary
          </button>

          <button disabled className={`px-6 py-3 rounded-xl ${
            isDarkMode 
              ? 'bg-white/5 text-white/40 border border-white/10'
              : 'bg-black/5 text-black/40 border border-black/10'
          } cursor-not-allowed`}>
            Disabled Secondary
          </button>

          <button disabled className={`p-3 rounded-lg ${
            isDarkMode 
              ? 'text-white/30'
              : 'text-black/30'
          } cursor-not-allowed`}>
            <Edit2 className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
}
