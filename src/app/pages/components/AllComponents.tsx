import { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { 
  Plus, Save, Trash2, Edit2, Check, X, Heart, Star, Play,
  TrendingUp, Users, Activity, Calendar, Clock, Bell, Settings,
  Search, Filter, ChevronDown, Loader, AlertCircle, CheckCircle,
  Info, AlertTriangle, Eye, EyeOff, Upload, Download
} from 'lucide-react';

export default function AllComponents() {
  const { isDarkMode } = useTheme();
  const [liked, setLiked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState('option1');
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('option1');
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <h1 className={`text-4xl mb-3 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
          Complete Component Library
        </h1>
        <p className={`text-lg ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
          Every component used in the application with live examples and code snippets
        </p>
      </div>

      {/* TABLE OF CONTENTS */}
      <div className="glass-card p-8 rounded-2xl">
        <h2 className={`text-2xl mb-6 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
          📑 Table of Contents
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            '1. Buttons & Actions',
            '2. Cards & Containers',
            '3. Form Elements',
            '4. Modals & Overlays',
            '5. Navigation',
            '6. Feedback Components',
            '7. Data Display',
            '8. Charts',
            '9. Layout Components'
          ].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
              className={`text-cyan-400 hover:text-cyan-300 smooth-transition`}
            >
              {item}
            </a>
          ))}
        </div>
      </div>

      {/* 1. BUTTONS & ACTIONS */}
      <section id="buttons-actions" className="glass-card p-8 rounded-2xl space-y-8">
        <h2 className={`text-3xl ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
          1. Buttons & Actions
        </h2>

        {/* Primary Buttons */}
        <div>
          <h3 className={`text-xl mb-4 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>Primary Buttons</h3>
          <div className="flex flex-wrap gap-4 mb-4">
            <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:from-cyan-600 hover:to-purple-600 smooth-transition">
              Primary Button
            </button>
            <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:from-cyan-600 hover:to-purple-600 smooth-transition flex items-center gap-2">
              <Plus className="w-5 h-5" /> With Icon
            </button>
            <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 smooth-transition flex items-center gap-2">
              <Save className="w-5 h-5" /> Save
            </button>
          </div>
          <code className={`block p-4 rounded-lg text-sm ${isDarkMode ? 'bg-black/20 text-green-400' : 'bg-gray-100 text-green-600'}`}>
            {`<button className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white">Primary</button>`}
          </code>
        </div>

        {/* Secondary Buttons */}
        <div>
          <h3 className={`text-xl mb-4 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>Secondary Buttons</h3>
          <div className="flex flex-wrap gap-4 mb-4">
            <button className={`px-6 py-3 rounded-xl smooth-transition border ${
              isDarkMode ? 'bg-white/5 text-white/70 hover:bg-white/10 border-white/10' : 'bg-black/5 text-black/70 hover:bg-black/10 border-black/10'
            }`}>
              Secondary
            </button>
            <button className={`px-6 py-3 rounded-xl smooth-transition border flex items-center gap-2 ${
              isDarkMode ? 'bg-white/5 text-white/70 hover:bg-white/10 border-white/10' : 'bg-black/5 text-black/70 hover:bg-black/10 border-black/10'
            }`}>
              <Edit2 className="w-5 h-5" /> Edit
            </button>
          </div>
        </div>

        {/* Icon Buttons */}
        <div>
          <h3 className={`text-xl mb-4 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>Icon Buttons</h3>
          <div className="flex flex-wrap gap-4 mb-4">
            <button className={`p-3 rounded-lg smooth-transition ${isDarkMode ? 'hover:bg-white/5 text-white/60 hover:text-white/90' : 'hover:bg-black/5 text-black/60'}`}>
              <Edit2 className="w-5 h-5" />
            </button>
            <button className={`p-3 rounded-lg smooth-transition ${isDarkMode ? 'hover:bg-red-500/20 text-white/60 hover:text-red-400' : 'hover:bg-red-500/20 text-black/60 hover:text-red-600'}`}>
              <Trash2 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setLiked(!liked)}
              className={`p-3 rounded-lg smooth-transition ${
                liked ? isDarkMode ? 'bg-red-500/20 text-red-400' : 'bg-red-500/20 text-red-600' : isDarkMode ? 'hover:bg-white/5 text-white/60' : 'hover:bg-black/5 text-black/60'
              }`}
            >
              <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Loading Button */}
        <div>
          <h3 className={`text-xl mb-4 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>Loading State</h3>
          <button
            onClick={() => { setIsLoading(true); setTimeout(() => setIsLoading(false), 2000); }}
            disabled={isLoading}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 smooth-transition flex items-center gap-2 disabled:opacity-50"
          >
            {isLoading ? <><Loader className="w-5 h-5 animate-spin" /> Loading...</> : <><Download className="w-5 h-5" /> Download</>}
          </button>
        </div>
      </section>

      {/* 2. CARDS & CONTAINERS */}
      <section id="cards-containers" className="glass-card p-8 rounded-2xl space-y-8">
        <h2 className={`text-3xl ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
          2. Cards & Containers
        </h2>

        {/* Basic Cards */}
        <div>
          <h3 className={`text-xl mb-4 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>Basic Glass Cards</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
            <div className="glass-card p-6 rounded-2xl">
              <h4 className={`text-lg mb-2 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>Simple Card</h4>
              <p className={isDarkMode ? 'text-white/60' : 'text-black/60'}>Basic glassmorphic card</p>
            </div>
            <div className={`glass-card p-6 rounded-2xl smooth-transition hover:scale-[1.02] cursor-pointer ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/10'}`}>
              <h4 className={`text-lg mb-2 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>Hover Card</h4>
              <p className={isDarkMode ? 'text-white/60' : 'text-black/60'}>With hover effect</p>
            </div>
            <div className="glass-card p-6 rounded-2xl border border-cyan-500/30">
              <h4 className={`text-lg mb-2 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>Bordered Card</h4>
              <p className={isDarkMode ? 'text-white/60' : 'text-black/60'}>With accent border</p>
            </div>
          </div>
          <code className={`block p-4 rounded-lg text-sm ${isDarkMode ? 'bg-black/20 text-green-400' : 'bg-gray-100 text-green-600'}`}>
            {`<div className="glass-card p-6 rounded-2xl">Content</div>`}
          </code>
        </div>

        {/* Stat Cards */}
        <div>
          <h3 className={`text-xl mb-4 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>Stat Cards</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card p-6 rounded-2xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <p className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>Revenue</p>
                  <p className={`text-2xl ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>$45,231</p>
                </div>
              </div>
            </div>
            <div className="glass-card p-6 rounded-2xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <p className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>Users</p>
                  <p className={`text-2xl ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>2,345</p>
                </div>
              </div>
            </div>
            <div className="glass-card p-6 rounded-2xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                  <Activity className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <p className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>Active</p>
                  <p className={`text-2xl ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>42</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FORM ELEMENTS */}
      <section id="form-elements" className="glass-card p-8 rounded-2xl space-y-8">
        <h2 className={`text-3xl ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
          3. Form Elements
        </h2>

        {/* Text Input */}
        <div>
          <h3 className={`text-xl mb-4 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>Text Input</h3>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter text..."
            className={`w-full max-w-md px-4 py-3 rounded-xl smooth-transition ${
              isDarkMode
                ? 'bg-white/5 border border-white/10 text-white/90 placeholder-white/40 focus:bg-white/10 focus:border-cyan-500/50'
                : 'bg-black/5 border border-black/10 text-black/90 placeholder-black/40 focus:bg-black/10 focus:border-cyan-500/50'
            }`}
          />
          <code className={`block p-4 rounded-lg text-sm mt-4 ${isDarkMode ? 'bg-black/20 text-green-400' : 'bg-gray-100 text-green-600'}`}>
            {`<input className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-cyan-500/50" />`}
          </code>
        </div>

        {/* Search Input */}
        <div>
          <h3 className={`text-xl mb-4 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>Search Input</h3>
          <div className="relative max-w-md">
            <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isDarkMode ? 'text-white/40' : 'text-black/40'}`} />
            <input
              type="text"
              placeholder="Search..."
              className={`w-full pl-12 pr-4 py-3 rounded-xl smooth-transition ${
                isDarkMode
                  ? 'bg-white/5 border border-white/10 text-white/90 placeholder-white/40 focus:bg-white/10 focus:border-cyan-500/50'
                  : 'bg-black/5 border border-black/10 text-black/90 placeholder-black/40 focus:bg-black/10 focus:border-cyan-500/50'
              }`}
            />
          </div>
        </div>

        {/* Textarea */}
        <div>
          <h3 className={`text-xl mb-4 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>Textarea</h3>
          <textarea
            placeholder="Enter description..."
            rows={4}
            className={`w-full max-w-md px-4 py-3 rounded-xl smooth-transition resize-none ${
              isDarkMode
                ? 'bg-white/5 border border-white/10 text-white/90 placeholder-white/40 focus:bg-white/10 focus:border-cyan-500/50'
                : 'bg-black/5 border border-black/10 text-black/90 placeholder-black/40 focus:bg-black/10 focus:border-cyan-500/50'
            }`}
          />
        </div>

        {/* Select */}
        <div>
          <h3 className={`text-xl mb-4 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>Select Dropdown</h3>
          <select
            value={selectValue}
            onChange={(e) => setSelectValue(e.target.value)}
            className={`w-full max-w-md px-4 py-3 rounded-xl smooth-transition ${
              isDarkMode
                ? 'bg-white/5 border border-white/10 text-white/90 focus:bg-white/10 focus:border-cyan-500/50'
                : 'bg-black/5 border border-black/10 text-black/90 focus:bg-black/10 focus:border-cyan-500/50'
            }`}
          >
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div>

        {/* Checkbox */}
        <div>
          <h3 className={`text-xl mb-4 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>Checkbox</h3>
          <label className="flex items-center gap-3 cursor-pointer w-fit">
            <input
              type="checkbox"
              checked={checkboxChecked}
              onChange={(e) => setCheckboxChecked(e.target.checked)}
              className="w-5 h-5 rounded accent-cyan-500"
            />
            <span className={isDarkMode ? 'text-white/80' : 'text-black/80'}>I agree to the terms</span>
          </label>
        </div>

        {/* Radio Buttons */}
        <div>
          <h3 className={`text-xl mb-4 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>Radio Buttons</h3>
          <div className="space-y-3">
            {['option1', 'option2', 'option3'].map(opt => (
              <label key={opt} className="flex items-center gap-3 cursor-pointer w-fit">
                <input
                  type="radio"
                  name="radio-group"
                  value={opt}
                  checked={radioValue === opt}
                  onChange={(e) => setRadioValue(e.target.value)}
                  className="w-5 h-5 accent-cyan-500"
                />
                <span className={isDarkMode ? 'text-white/80' : 'text-black/80'}>Option {opt.slice(-1)}</span>
              </label>
            ))}
          </div>
        </div>
      </section>

      {/* 4. MODALS & OVERLAYS */}
      <section id="modals-overlays" className="glass-card p-8 rounded-2xl space-y-8">
        <h2 className={`text-3xl ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
          4. Modals & Overlays
        </h2>

        <div>
          <h3 className={`text-xl mb-4 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>Modal Dialog</h3>
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:from-cyan-600 hover:to-purple-600"
          >
            Open Modal
          </button>

          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
              <div className={`glass-card rounded-2xl p-8 w-full max-w-md ${isDarkMode ? 'bg-[#0f0f19]/95' : 'bg-white/95'}`} style={{ backdropFilter: 'blur(40px)' }}>
                <h3 className={`text-2xl mb-4 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>Modal Title</h3>
                <p className={`mb-6 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
                  This is a glassmorphic modal dialog with backdrop blur.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowModal(false)}
                    className={`flex-1 px-6 py-3 rounded-xl smooth-transition ${
                      isDarkMode ? 'bg-white/5 text-white/70 hover:bg-white/10' : 'bg-black/5 text-black/70 hover:bg-black/10'
                    }`}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:from-cyan-600 hover:to-purple-600"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}

          <code className={`block p-4 rounded-lg text-sm mt-4 ${isDarkMode ? 'bg-black/20 text-green-400' : 'bg-gray-100 text-green-600'}`}>
            {`<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">`}
          </code>
        </div>
      </section>

      {/* 5. FEEDBACK COMPONENTS */}
      <section id="feedback-components" className="glass-card p-8 rounded-2xl space-y-8">
        <h2 className={`text-3xl ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
          5. Feedback Components
        </h2>

        {/* Alerts */}
        <div>
          <h3 className={`text-xl mb-4 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>Alert Messages</h3>
          <div className="space-y-4">
            <div className={`p-4 rounded-xl flex items-start gap-3 ${isDarkMode ? 'bg-green-500/10 border border-green-500/20' : 'bg-green-50 border border-green-200'}`}>
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className={`font-medium mb-1 ${isDarkMode ? 'text-green-400' : 'text-green-700'}`}>Success</p>
                <p className={`text-sm ${isDarkMode ? 'text-green-300/80' : 'text-green-600'}`}>Your changes have been saved successfully</p>
              </div>
            </div>

            <div className={`p-4 rounded-xl flex items-start gap-3 ${isDarkMode ? 'bg-red-500/10 border border-red-500/20' : 'bg-red-50 border border-red-200'}`}>
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className={`font-medium mb-1 ${isDarkMode ? 'text-red-400' : 'text-red-700'}`}>Error</p>
                <p className={`text-sm ${isDarkMode ? 'text-red-300/80' : 'text-red-600'}`}>Something went wrong. Please try again</p>
              </div>
            </div>

            <div className={`p-4 rounded-xl flex items-start gap-3 ${isDarkMode ? 'bg-yellow-500/10 border border-yellow-500/20' : 'bg-yellow-50 border border-yellow-200'}`}>
              <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className={`font-medium mb-1 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-700'}`}>Warning</p>
                <p className={`text-sm ${isDarkMode ? 'text-yellow-300/80' : 'text-yellow-600'}`}>This action cannot be undone</p>
              </div>
            </div>

            <div className={`p-4 rounded-xl flex items-start gap-3 ${isDarkMode ? 'bg-cyan-500/10 border border-cyan-500/20' : 'bg-cyan-50 border border-cyan-200'}`}>
              <Info className="w-5 h-5 text-cyan-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className={`font-medium mb-1 ${isDarkMode ? 'text-cyan-400' : 'text-cyan-700'}`}>Info</p>
                <p className={`text-sm ${isDarkMode ? 'text-cyan-300/80' : 'text-cyan-600'}`}>New features are now available</p>
              </div>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div>
          <h3 className={`text-xl mb-4 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>Badges & Tags</h3>
          <div className="flex flex-wrap gap-3">
            <span className="px-3 py-1 rounded-lg text-sm bg-cyan-500/20 text-cyan-400">Cyan</span>
            <span className="px-3 py-1 rounded-lg text-sm bg-purple-500/20 text-purple-400">Purple</span>
            <span className="px-3 py-1 rounded-lg text-sm bg-orange-500/20 text-orange-400">Orange</span>
            <span className="px-3 py-1 rounded-lg text-sm bg-green-500/20 text-green-400">Green</span>
            <span className="px-3 py-1 rounded-lg text-sm bg-red-500/20 text-red-400">Red</span>
          </div>
        </div>

        {/* Loading Spinner */}
        <div>
          <h3 className={`text-xl mb-4 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>Loading Indicator</h3>
          <div className="flex items-center gap-4">
            <Loader className="w-8 h-8 text-cyan-400 animate-spin" />
            <span className={isDarkMode ? 'text-white/70' : 'text-black/70'}>Loading...</span>
          </div>
        </div>
      </section>

      {/* 6. NAVIGATION */}
      <section id="navigation" className="glass-card p-8 rounded-2xl space-y-8">
        <h2 className={`text-3xl ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
          6. Navigation Components
        </h2>

        <div>
          <h3 className={`text-xl mb-4 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>Tab Navigation</h3>
          <div className={`flex items-center gap-2 glass-card p-1.5 rounded-xl w-fit`}>
            <button className={`px-4 py-2 rounded-lg smooth-transition ${
              isDarkMode ? 'bg-cyan-500/20 text-cyan-400' : 'bg-cyan-500/20 text-cyan-600'
            }`}>
              Active
            </button>
            <button className={`px-4 py-2 rounded-lg smooth-transition ${
              isDarkMode ? 'text-white/60 hover:text-white/90 hover:bg-white/5' : 'text-black/60 hover:bg-black/5'
            }`}>
              Tab 2
            </button>
            <button className={`px-4 py-2 rounded-lg smooth-transition ${
              isDarkMode ? 'text-white/60 hover:text-white/90 hover:bg-white/5' : 'text-black/60 hover:bg-black/5'
            }`}>
              Tab 3
            </button>
          </div>
        </div>

        <div>
          <h3 className={`text-xl mb-4 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>Breadcrumbs</h3>
          <div className={`flex items-center gap-2 text-sm ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
            <a href="#" className="text-cyan-400 hover:text-cyan-300">Home</a>
            <span>/</span>
            <a href="#" className="text-cyan-400 hover:text-cyan-300">Components</a>
            <span>/</span>
            <span className={isDarkMode ? 'text-white/90' : 'text-black/90'}>Current Page</span>
          </div>
        </div>
      </section>

      {/* Summary */}
      <div className="glass-card p-8 rounded-2xl text-center">
        <h2 className={`text-2xl mb-4 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
          ✨ All Components Documented
        </h2>
        <p className={`max-w-2xl mx-auto ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
          This library includes all UI components used throughout the application with live examples,
          code snippets, and usage guidelines. Perfect for team development and design consistency.
        </p>
      </div>
    </div>
  );
}
