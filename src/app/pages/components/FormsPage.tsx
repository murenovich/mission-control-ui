import { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Search, Eye, EyeOff, Calendar, Clock, Upload, X } from 'lucide-react';

export default function FormsPage() {
  const { isDarkMode } = useTheme();
  const [textInput, setTextInput] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [textarea, setTextarea] = useState('');
  const [selectValue, setSelectValue] = useState('option1');
  const [multiSelect, setMultiSelect] = useState<string[]>([]);
  const [checkboxes, setCheckboxes] = useState({
    option1: false,
    option2: true,
    option3: false,
  });
  const [radioValue, setRadioValue] = useState('option1');
  const [sliderValue, setSliderValue] = useState(50);
  const [switchValue, setSwitchValue] = useState(false);
  const [tags, setTags] = useState(['React', 'TypeScript', 'Tailwind']);
  const [tagInput, setTagInput] = useState('');

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className={`text-3xl mb-2 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
          Forms & Inputs
        </h1>
        <p className={isDarkMode ? 'text-white/60' : 'text-black/60'}>
          Comprehensive form elements with glassmorphic styling and validation states
        </p>
      </div>

      {/* Text Input */}
      <section className="glass-card p-8 rounded-2xl space-y-6">
        <div>
          <h2 className={`text-2xl mb-2 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
            Text Input
          </h2>
          <p className={`text-sm mb-6 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
            Standard text input fields with focus states
          </p>
        </div>

        <div className="space-y-4 max-w-2xl">
          <div>
            <label className={`block text-sm mb-2 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
              Default Input
            </label>
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Enter text..."
              className={`w-full px-4 py-3 rounded-xl smooth-transition ${
                isDarkMode
                  ? 'bg-white/5 border border-white/10 text-white/90 placeholder-white/40 focus:bg-white/10 focus:border-cyan-500/50'
                  : 'bg-black/5 border border-black/10 text-black/90 placeholder-black/40 focus:bg-black/10 focus:border-cyan-500/50'
              }`}
            />
          </div>

          <div>
            <label className={`block text-sm mb-2 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
              With Helper Text
            </label>
            <input
              type="email"
              placeholder="email@example.com"
              className={`w-full px-4 py-3 rounded-xl smooth-transition ${
                isDarkMode
                  ? 'bg-white/5 border border-white/10 text-white/90 placeholder-white/40 focus:bg-white/10 focus:border-cyan-500/50'
                  : 'bg-black/5 border border-black/10 text-black/90 placeholder-black/40 focus:bg-black/10 focus:border-cyan-500/50'
              }`}
            />
            <p className={`text-xs mt-2 ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
              We'll never share your email with anyone else.
            </p>
          </div>

          <div>
            <label className={`block text-sm mb-2 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
              Error State
            </label>
            <input
              type="text"
              placeholder="Invalid input"
              className={`w-full px-4 py-3 rounded-xl border-red-500/50 ${
                isDarkMode
                  ? 'bg-red-500/5 border text-white/90 placeholder-white/40'
                  : 'bg-red-50 border text-black/90 placeholder-black/40'
              }`}
            />
            <p className="text-xs mt-2 text-red-400">
              This field is required
            </p>
          </div>

          <div>
            <label className={`block text-sm mb-2 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
              Disabled State
            </label>
            <input
              type="text"
              placeholder="Disabled input"
              disabled
              className={`w-full px-4 py-3 rounded-xl cursor-not-allowed ${
                isDarkMode
                  ? 'bg-white/5 border border-white/10 text-white/40 placeholder-white/30'
                  : 'bg-black/5 border border-black/10 text-black/40 placeholder-black/30'
              }`}
            />
          </div>
        </div>

        <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-black/20' : 'bg-gray-100'}`}>
          <code className={`text-sm ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
            {`<input className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-cyan-500/50" />`}
          </code>
        </div>
      </section>

      {/* Search Input */}
      <section className="glass-card p-8 rounded-2xl space-y-6">
        <div>
          <h2 className={`text-2xl mb-2 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
            Search Input
          </h2>
          <p className={`text-sm mb-6 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
            Search field with icon prefix
          </p>
        </div>

        <div className="max-w-2xl">
          <div className="relative">
            <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isDarkMode ? 'text-white/40' : 'text-black/40'}`} />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search..."
              className={`w-full pl-12 pr-4 py-3 rounded-xl smooth-transition ${
                isDarkMode
                  ? 'bg-white/5 border border-white/10 text-white/90 placeholder-white/40 focus:bg-white/10 focus:border-cyan-500/50'
                  : 'bg-black/5 border border-black/10 text-black/90 placeholder-black/40 focus:bg-black/10 focus:border-cyan-500/50'
              }`}
            />
          </div>
        </div>
      </section>

      {/* Password Input */}
      <section className="glass-card p-8 rounded-2xl space-y-6">
        <div>
          <h2 className={`text-2xl mb-2 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
            Password Input
          </h2>
          <p className={`text-sm mb-6 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
            Password field with visibility toggle
          </p>
        </div>

        <div className="max-w-2xl">
          <div className="relative">
            <input
              type={passwordVisible ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password..."
              className={`w-full px-4 pr-12 py-3 rounded-xl smooth-transition ${
                isDarkMode
                  ? 'bg-white/5 border border-white/10 text-white/90 placeholder-white/40 focus:bg-white/10 focus:border-cyan-500/50'
                  : 'bg-black/5 border border-black/10 text-black/90 placeholder-black/40 focus:bg-black/10 focus:border-cyan-500/50'
              }`}
            />
            <button
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
              className={`absolute right-4 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-white/40 hover:text-white/70' : 'text-black/40 hover:text-black/70'}`}
            >
              {passwordVisible ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </section>

      {/* Textarea */}
      <section className="glass-card p-8 rounded-2xl space-y-6">
        <div>
          <h2 className={`text-2xl mb-2 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
            Textarea
          </h2>
          <p className={`text-sm mb-6 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
            Multi-line text input with character counter
          </p>
        </div>

        <div className="max-w-2xl">
          <textarea
            value={textarea}
            onChange={(e) => setTextarea(e.target.value)}
            placeholder="Enter description..."
            rows={6}
            maxLength={500}
            className={`w-full px-4 py-3 rounded-xl smooth-transition resize-none ${
              isDarkMode
                ? 'bg-white/5 border border-white/10 text-white/90 placeholder-white/40 focus:bg-white/10 focus:border-cyan-500/50'
                : 'bg-black/5 border border-black/10 text-black/90 placeholder-black/40 focus:bg-black/10 focus:border-cyan-500/50'
            }`}
          />
          <div className={`text-xs mt-2 text-right ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
            {textarea.length}/500 characters
          </div>
        </div>
      </section>

      {/* Select Dropdown */}
      <section className="glass-card p-8 rounded-2xl space-y-6">
        <div>
          <h2 className={`text-2xl mb-2 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
            Select Dropdown
          </h2>
          <p className={`text-sm mb-6 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
            Dropdown selection menus
          </p>
        </div>

        <div className="space-y-4 max-w-2xl">
          <div>
            <label className={`block text-sm mb-2 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
              Single Select
            </label>
            <select
              value={selectValue}
              onChange={(e) => setSelectValue(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl smooth-transition ${
                isDarkMode
                  ? 'bg-white/5 border border-white/10 text-white/90 focus:bg-white/10 focus:border-cyan-500/50'
                  : 'bg-black/5 border border-black/10 text-black/90 focus:bg-black/10 focus:border-cyan-500/50'
              }`}
            >
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
              <option value="option4">Option 4</option>
            </select>
          </div>
        </div>
      </section>

      {/* Checkboxes */}
      <section className="glass-card p-8 rounded-2xl space-y-6">
        <div>
          <h2 className={`text-2xl mb-2 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
            Checkboxes
          </h2>
          <p className={`text-sm mb-6 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
            Multiple selection checkboxes
          </p>
        </div>

        <div className="space-y-3 max-w-2xl">
          {Object.entries(checkboxes).map(([key, checked]) => (
            <label key={key} className="flex items-center gap-3 cursor-pointer w-fit">
              <input
                type="checkbox"
                checked={checked}
                onChange={(e) => setCheckboxes({ ...checkboxes, [key]: e.target.checked })}
                className="w-5 h-5 rounded accent-cyan-500"
              />
              <span className={isDarkMode ? 'text-white/80' : 'text-black/80'}>
                Checkbox {key.slice(-1)}
              </span>
            </label>
          ))}
        </div>
      </section>

      {/* Radio Buttons */}
      <section className="glass-card p-8 rounded-2xl space-y-6">
        <div>
          <h2 className={`text-2xl mb-2 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
            Radio Buttons
          </h2>
          <p className={`text-sm mb-6 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
            Single selection radio groups
          </p>
        </div>

        <div className="space-y-3 max-w-2xl">
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
              <span className={isDarkMode ? 'text-white/80' : 'text-black/80'}>
                Radio Option {opt.slice(-1)}
              </span>
            </label>
          ))}
        </div>
      </section>

      {/* Toggle Switch */}
      <section className="glass-card p-8 rounded-2xl space-y-6">
        <div>
          <h2 className={`text-2xl mb-2 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
            Toggle Switch
          </h2>
          <p className={`text-sm mb-6 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
            On/off toggle switches
          </p>
        </div>

        <div className="max-w-2xl">
          <label className="flex items-center gap-3 cursor-pointer w-fit">
            <div className="relative">
              <input
                type="checkbox"
                checked={switchValue}
                onChange={(e) => setSwitchValue(e.target.checked)}
                className="sr-only"
              />
              <div
                onClick={() => setSwitchValue(!switchValue)}
                className={`w-14 h-8 rounded-full smooth-transition ${
                  switchValue
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-500'
                    : isDarkMode
                    ? 'bg-white/10'
                    : 'bg-black/10'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full bg-white shadow-lg smooth-transition transform ${
                    switchValue ? 'translate-x-7' : 'translate-x-1'
                  } mt-1`}
                />
              </div>
            </div>
            <span className={isDarkMode ? 'text-white/80' : 'text-black/80'}>
              {switchValue ? 'Enabled' : 'Disabled'}
            </span>
          </label>
        </div>
      </section>

      {/* Range Slider */}
      <section className="glass-card p-8 rounded-2xl space-y-6">
        <div>
          <h2 className={`text-2xl mb-2 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
            Range Slider
          </h2>
          <p className={`text-sm mb-6 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
            Numeric range selection
          </p>
        </div>

        <div className="max-w-2xl">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className={`text-sm ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
                Value
              </label>
              <span className={`text-lg ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                {sliderValue}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={sliderValue}
              onChange={(e) => setSliderValue(Number(e.target.value))}
              className="w-full accent-cyan-500"
            />
          </div>
        </div>
      </section>

      {/* Tag Input */}
      <section className="glass-card p-8 rounded-2xl space-y-6">
        <div>
          <h2 className={`text-2xl mb-2 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
            Tag Input
          </h2>
          <p className={`text-sm mb-6 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
            Multi-tag input with add/remove functionality
          </p>
        </div>

        <div className="max-w-2xl">
          <div className={`p-3 rounded-xl border ${
            isDarkMode
              ? 'bg-white/5 border-white/10'
              : 'bg-black/5 border-black/10'
          }`}>
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center gap-2 text-sm"
                >
                  {tag}
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:text-cyan-300"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
                placeholder="Add tag..."
                className={`flex-1 px-3 py-2 rounded-lg bg-transparent ${
                  isDarkMode ? 'text-white/90 placeholder-white/40' : 'text-black/90 placeholder-black/40'
                } focus:outline-none`}
              />
              <button
                onClick={handleAddTag}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-sm hover:from-cyan-600 hover:to-purple-600"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* File Upload */}
      <section className="glass-card p-8 rounded-2xl space-y-6">
        <div>
          <h2 className={`text-2xl mb-2 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
            File Upload
          </h2>
          <p className={`text-sm mb-6 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
            Drag and drop or click to upload
          </p>
        </div>

        <div className="max-w-2xl">
          <div className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer smooth-transition ${
            isDarkMode
              ? 'border-white/10 hover:border-cyan-500/50 hover:bg-white/5'
              : 'border-black/10 hover:border-cyan-500/50 hover:bg-black/5'
          }`}>
            <Upload className={`w-12 h-12 mx-auto mb-4 ${isDarkMode ? 'text-white/40' : 'text-black/40'}`} />
            <p className={`mb-2 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
              Drop files here or click to browse
            </p>
            <p className={`text-sm ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
              Supports: JPG, PNG, PDF (Max 10MB)
            </p>
          </div>
        </div>
      </section>

      {/* Date & Time Inputs */}
      <section className="glass-card p-8 rounded-2xl space-y-6">
        <div>
          <h2 className={`text-2xl mb-2 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
            Date & Time Inputs
          </h2>
          <p className={`text-sm mb-6 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
            Date and time pickers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
          <div>
            <label className={`block text-sm mb-2 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
              Date
            </label>
            <div className="relative">
              <Calendar className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none ${isDarkMode ? 'text-white/40' : 'text-black/40'}`} />
              <input
                type="date"
                className={`w-full pl-12 pr-4 py-3 rounded-xl smooth-transition ${
                  isDarkMode
                    ? 'bg-white/5 border border-white/10 text-white/90 focus:bg-white/10 focus:border-cyan-500/50'
                    : 'bg-black/5 border border-black/10 text-black/90 focus:bg-black/10 focus:border-cyan-500/50'
                }`}
              />
            </div>
          </div>

          <div>
            <label className={`block text-sm mb-2 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
              Time
            </label>
            <div className="relative">
              <Clock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none ${isDarkMode ? 'text-white/40' : 'text-black/40'}`} />
              <input
                type="time"
                className={`w-full pl-12 pr-4 py-3 rounded-xl smooth-transition ${
                  isDarkMode
                    ? 'bg-white/5 border border-white/10 text-white/90 focus:bg-white/10 focus:border-cyan-500/50'
                    : 'bg-black/5 border border-black/10 text-black/90 focus:bg-black/10 focus:border-cyan-500/50'
                }`}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
