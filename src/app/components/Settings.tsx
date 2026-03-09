import { Settings as SettingsIcon, User, Bell, Lock, Palette, Globe, Sliders, Shield, Zap, Mail, Moon, Sun, Monitor, Save, RefreshCw } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useState } from 'react';

export function Settings() {
  const { isDarkMode, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<'profile' | 'appearance' | 'notifications' | 'security' | 'preferences'>('profile');
  
  const [profileSettings, setProfileSettings] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    timezone: 'America/New_York',
    language: 'English (US)',
  });

  const [appearanceSettings, setAppearanceSettings] = useState({
    themeMode: isDarkMode ? 'dark' : 'light',
    accentColor: 'cyan',
    compactMode: false,
    showAnimations: true,
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    taskReminders: true,
    goalMilestones: true,
    calendarAlerts: true,
    weeklyDigest: true,
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: '30',
    loginAlerts: true,
  });

  const [preferencesSettings, setPreferencesSettings] = useState({
    defaultView: 'dashboard',
    startWeekOn: 'monday',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12h',
    autoSave: true,
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'preferences', label: 'Preferences', icon: Sliders },
  ];

  const handleSaveSettings = () => {
    // In a real app, this would save to a backend
    console.log('Settings saved:', {
      profile: profileSettings,
      appearance: appearanceSettings,
      notifications: notificationSettings,
      security: securitySettings,
      preferences: preferencesSettings,
    });
  };

  const handleResetSettings = () => {
    // Reset to defaults
    setProfileSettings({
      name: 'Alex Johnson',
      email: 'alex.johnson@example.com',
      timezone: 'America/New_York',
      language: 'English (US)',
    });
    setAppearanceSettings({
      themeMode: isDarkMode ? 'dark' : 'light',
      accentColor: 'cyan',
      compactMode: false,
      showAnimations: true,
    });
    setNotificationSettings({
      emailNotifications: true,
      pushNotifications: false,
      taskReminders: true,
      goalMilestones: true,
      calendarAlerts: true,
      weeklyDigest: true,
    });
    setSecuritySettings({
      twoFactorAuth: false,
      sessionTimeout: '30',
      loginAlerts: true,
    });
    setPreferencesSettings({
      defaultView: 'dashboard',
      startWeekOn: 'monday',
      dateFormat: 'MM/DD/YYYY',
      timeFormat: '12h',
      autoSave: true,
    });
  };

  const renderProfileSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
          Profile Information
        </h3>
        <div className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/80' : 'text-black/80'}`}>
              Full Name
            </label>
            <input
              type="text"
              value={profileSettings.name}
              onChange={(e) => setProfileSettings({ ...profileSettings, name: e.target.value })}
              className={`w-full px-4 py-2.5 rounded-lg border smooth-transition text-sm ${
                isDarkMode
                  ? 'bg-white/5 border-white/10 text-white/90 placeholder-white/40 focus:border-cyan-400/50'
                  : 'bg-white/30 border-black/10 text-black/90 placeholder-black/40 focus:border-cyan-400/50'
              }`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/80' : 'text-black/80'}`}>
              Email Address
            </label>
            <input
              type="email"
              value={profileSettings.email}
              onChange={(e) => setProfileSettings({ ...profileSettings, email: e.target.value })}
              className={`w-full px-4 py-2.5 rounded-lg border smooth-transition text-sm ${
                isDarkMode
                  ? 'bg-white/5 border-white/10 text-white/90 placeholder-white/40 focus:border-cyan-400/50'
                  : 'bg-white/30 border-black/10 text-black/90 placeholder-black/40 focus:border-cyan-400/50'
              }`}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/80' : 'text-black/80'}`}>
                Timezone
              </label>
              <select
                value={profileSettings.timezone}
                onChange={(e) => setProfileSettings({ ...profileSettings, timezone: e.target.value })}
                className={`w-full px-4 py-2.5 rounded-lg border smooth-transition text-sm ${
                  isDarkMode
                    ? 'bg-white/5 border-white/10 text-white/90 focus:border-cyan-400/50'
                    : 'bg-white/30 border-black/10 text-black/90 focus:border-cyan-400/50'
                }`}
              >
                <option value="America/New_York">Eastern Time</option>
                <option value="America/Chicago">Central Time</option>
                <option value="America/Denver">Mountain Time</option>
                <option value="America/Los_Angeles">Pacific Time</option>
                <option value="Europe/London">London</option>
                <option value="Europe/Paris">Paris</option>
                <option value="Asia/Tokyo">Tokyo</option>
              </select>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/80' : 'text-black/80'}`}>
                Language
              </label>
              <select
                value={profileSettings.language}
                onChange={(e) => setProfileSettings({ ...profileSettings, language: e.target.value })}
                className={`w-full px-4 py-2.5 rounded-lg border smooth-transition text-sm ${
                  isDarkMode
                    ? 'bg-white/5 border-white/10 text-white/90 focus:border-cyan-400/50'
                    : 'bg-white/30 border-black/10 text-black/90 focus:border-cyan-400/50'
                }`}
              >
                <option value="English (US)">English (US)</option>
                <option value="English (UK)">English (UK)</option>
                <option value="Spanish">Español</option>
                <option value="French">Français</option>
                <option value="German">Deutsch</option>
                <option value="Japanese">日本語</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
          Theme & Display
        </h3>
        <div className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-3 ${isDarkMode ? 'text-white/80' : 'text-black/80'}`}>
              Theme Mode
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => {
                  setAppearanceSettings({ ...appearanceSettings, themeMode: 'light' });
                  if (isDarkMode) toggleTheme();
                }}
                className={`p-4 rounded-lg border smooth-transition flex flex-col items-center gap-2 ${
                  appearanceSettings.themeMode === 'light'
                    ? 'border-cyan-400 bg-cyan-500/20'
                    : isDarkMode
                    ? 'border-white/10 hover:border-white/30'
                    : 'border-black/10 hover:border-black/30'
                }`}
              >
                <Sun className={`w-5 h-5 ${appearanceSettings.themeMode === 'light' ? 'text-cyan-400' : isDarkMode ? 'text-white/60' : 'text-black/60'}`} />
                <span className={`text-sm ${appearanceSettings.themeMode === 'light' ? 'text-cyan-400' : isDarkMode ? 'text-white/70' : 'text-black/70'}`}>Light</span>
              </button>
              
              <button
                onClick={() => {
                  setAppearanceSettings({ ...appearanceSettings, themeMode: 'dark' });
                  if (!isDarkMode) toggleTheme();
                }}
                className={`p-4 rounded-lg border smooth-transition flex flex-col items-center gap-2 ${
                  appearanceSettings.themeMode === 'dark'
                    ? 'border-cyan-400 bg-cyan-500/20'
                    : isDarkMode
                    ? 'border-white/10 hover:border-white/30'
                    : 'border-black/10 hover:border-black/30'
                }`}
              >
                <Moon className={`w-5 h-5 ${appearanceSettings.themeMode === 'dark' ? 'text-cyan-400' : isDarkMode ? 'text-white/60' : 'text-black/60'}`} />
                <span className={`text-sm ${appearanceSettings.themeMode === 'dark' ? 'text-cyan-400' : isDarkMode ? 'text-white/70' : 'text-black/70'}`}>Dark</span>
              </button>

              <button
                onClick={() => setAppearanceSettings({ ...appearanceSettings, themeMode: 'auto' })}
                className={`p-4 rounded-lg border smooth-transition flex flex-col items-center gap-2 ${
                  appearanceSettings.themeMode === 'auto'
                    ? 'border-cyan-400 bg-cyan-500/20'
                    : isDarkMode
                    ? 'border-white/10 hover:border-white/30'
                    : 'border-black/10 hover:border-black/30'
                }`}
              >
                <Monitor className={`w-5 h-5 ${appearanceSettings.themeMode === 'auto' ? 'text-cyan-400' : isDarkMode ? 'text-white/60' : 'text-black/60'}`} />
                <span className={`text-sm ${appearanceSettings.themeMode === 'auto' ? 'text-cyan-400' : isDarkMode ? 'text-white/70' : 'text-black/70'}`}>Auto</span>
              </button>
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-3 ${isDarkMode ? 'text-white/80' : 'text-black/80'}`}>
              Accent Color
            </label>
            <div className="flex flex-wrap gap-3">
              {['cyan', 'purple', 'orange', 'green', 'blue', 'pink'].map((color) => (
                <button
                  key={color}
                  onClick={() => setAppearanceSettings({ ...appearanceSettings, accentColor: color })}
                  className={`w-10 h-10 rounded-lg smooth-transition border-2 ${
                    appearanceSettings.accentColor === color
                      ? `border-${color}-400`
                      : 'border-transparent'
                  }`}
                  style={{
                    background: color === 'cyan' ? '#06b6d4' :
                               color === 'purple' ? '#a855f7' :
                               color === 'orange' ? '#f97316' :
                               color === 'green' ? '#22c55e' :
                               color === 'blue' ? '#3b82f6' :
                               '#ec4899'
                  }}
                />
              ))}
            </div>
          </div>

          <div className={`flex items-center justify-between p-4 rounded-lg ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}>
            <div>
              <p className={`text-sm font-medium ${isDarkMode ? 'text-white/80' : 'text-black/80'}`}>Compact Mode</p>
              <p className={`text-xs mt-1 ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>Reduce spacing for denser layout</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={appearanceSettings.compactMode}
                onChange={(e) => setAppearanceSettings({ ...appearanceSettings, compactMode: e.target.checked })}
                className="sr-only peer"
              />
              <div className={`w-11 h-6 rounded-full peer transition-colors ${
                appearanceSettings.compactMode
                  ? 'bg-cyan-500'
                  : isDarkMode ? 'bg-white/20' : 'bg-black/20'
              }`}>
                <div className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                  appearanceSettings.compactMode ? 'translate-x-5' : ''
                }`} />
              </div>
            </label>
          </div>

          <div className={`flex items-center justify-between p-4 rounded-lg ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}>
            <div>
              <p className={`text-sm font-medium ${isDarkMode ? 'text-white/80' : 'text-black/80'}`}>Show Animations</p>
              <p className={`text-xs mt-1 ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>Enable smooth transitions and effects</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={appearanceSettings.showAnimations}
                onChange={(e) => setAppearanceSettings({ ...appearanceSettings, showAnimations: e.target.checked })}
                className="sr-only peer"
              />
              <div className={`w-11 h-6 rounded-full peer transition-colors ${
                appearanceSettings.showAnimations
                  ? 'bg-cyan-500'
                  : isDarkMode ? 'bg-white/20' : 'bg-black/20'
              }`}>
                <div className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                  appearanceSettings.showAnimations ? 'translate-x-5' : ''
                }`} />
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
          Notification Preferences
        </h3>
        <div className="space-y-3">
          {Object.entries(notificationSettings).map(([key, value]) => (
            <div
              key={key}
              className={`flex items-center justify-between p-4 rounded-lg ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}
            >
              <div>
                <p className={`text-sm font-medium ${isDarkMode ? 'text-white/80' : 'text-black/80'}`}>
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => setNotificationSettings({ ...notificationSettings, [key]: e.target.checked })}
                  className="sr-only peer"
                />
                <div className={`w-11 h-6 rounded-full peer transition-colors ${
                  value
                    ? 'bg-cyan-500'
                    : isDarkMode ? 'bg-white/20' : 'bg-black/20'
                }`}>
                  <div className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                    value ? 'translate-x-5' : ''
                  }`} />
                </div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
          Security Settings
        </h3>
        <div className="space-y-4">
          <div className={`flex items-center justify-between p-4 rounded-lg ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}>
            <div>
              <p className={`text-sm font-medium ${isDarkMode ? 'text-white/80' : 'text-black/80'}`}>Two-Factor Authentication</p>
              <p className={`text-xs mt-1 ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>Add an extra layer of security</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={securitySettings.twoFactorAuth}
                onChange={(e) => setSecuritySettings({ ...securitySettings, twoFactorAuth: e.target.checked })}
                className="sr-only peer"
              />
              <div className={`w-11 h-6 rounded-full peer transition-colors ${
                securitySettings.twoFactorAuth
                  ? 'bg-cyan-500'
                  : isDarkMode ? 'bg-white/20' : 'bg-black/20'
              }`}>
                <div className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                  securitySettings.twoFactorAuth ? 'translate-x-5' : ''
                }`} />
              </div>
            </label>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/80' : 'text-black/80'}`}>
              Session Timeout (minutes)
            </label>
            <select
              value={securitySettings.sessionTimeout}
              onChange={(e) => setSecuritySettings({ ...securitySettings, sessionTimeout: e.target.value })}
              className={`w-full px-4 py-2.5 rounded-lg border smooth-transition text-sm ${
                isDarkMode
                  ? 'bg-white/5 border-white/10 text-white/90 focus:border-cyan-400/50'
                  : 'bg-white/30 border-black/10 text-black/90 focus:border-cyan-400/50'
              }`}
            >
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="60">1 hour</option>
              <option value="120">2 hours</option>
              <option value="never">Never</option>
            </select>
          </div>

          <div className={`flex items-center justify-between p-4 rounded-lg ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}>
            <div>
              <p className={`text-sm font-medium ${isDarkMode ? 'text-white/80' : 'text-black/80'}`}>Login Alerts</p>
              <p className={`text-xs mt-1 ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>Get notified of new login attempts</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={securitySettings.loginAlerts}
                onChange={(e) => setSecuritySettings({ ...securitySettings, loginAlerts: e.target.checked })}
                className="sr-only peer"
              />
              <div className={`w-11 h-6 rounded-full peer transition-colors ${
                securitySettings.loginAlerts
                  ? 'bg-cyan-500'
                  : isDarkMode ? 'bg-white/20' : 'bg-black/20'
              }`}>
                <div className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                  securitySettings.loginAlerts ? 'translate-x-5' : ''
                }`} />
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPreferencesSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
          General Preferences
        </h3>
        <div className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/80' : 'text-black/80'}`}>
              Default View
            </label>
            <select
              value={preferencesSettings.defaultView}
              onChange={(e) => setPreferencesSettings({ ...preferencesSettings, defaultView: e.target.value })}
              className={`w-full px-4 py-2.5 rounded-lg border smooth-transition text-sm ${
                isDarkMode
                  ? 'bg-white/5 border-white/10 text-white/90 focus:border-cyan-400/50'
                  : 'bg-white/30 border-black/10 text-black/90 focus:border-cyan-400/50'
              }`}
            >
              <option value="dashboard">Dashboard</option>
              <option value="analytics">Analytics</option>
              <option value="tasks">Tasks</option>
              <option value="calendar">Calendar</option>
              <option value="goals">Goals</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/80' : 'text-black/80'}`}>
                Start Week On
              </label>
              <select
                value={preferencesSettings.startWeekOn}
                onChange={(e) => setPreferencesSettings({ ...preferencesSettings, startWeekOn: e.target.value })}
                className={`w-full px-4 py-2.5 rounded-lg border smooth-transition text-sm ${
                  isDarkMode
                    ? 'bg-white/5 border-white/10 text-white/90 focus:border-cyan-400/50'
                    : 'bg-white/30 border-black/10 text-black/90 focus:border-cyan-400/50'
                }`}
              >
                <option value="sunday">Sunday</option>
                <option value="monday">Monday</option>
              </select>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/80' : 'text-black/80'}`}>
                Date Format
              </label>
              <select
                value={preferencesSettings.dateFormat}
                onChange={(e) => setPreferencesSettings({ ...preferencesSettings, dateFormat: e.target.value })}
                className={`w-full px-4 py-2.5 rounded-lg border smooth-transition text-sm ${
                  isDarkMode
                    ? 'bg-white/5 border-white/10 text-white/90 focus:border-cyan-400/50'
                    : 'bg-white/30 border-black/10 text-black/90 focus:border-cyan-400/50'
                }`}
              >
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/80' : 'text-black/80'}`}>
              Time Format
            </label>
            <select
              value={preferencesSettings.timeFormat}
              onChange={(e) => setPreferencesSettings({ ...preferencesSettings, timeFormat: e.target.value })}
              className={`w-full px-4 py-2.5 rounded-lg border smooth-transition text-sm ${
                isDarkMode
                  ? 'bg-white/5 border-white/10 text-white/90 focus:border-cyan-400/50'
                  : 'bg-white/30 border-black/10 text-black/90 focus:border-cyan-400/50'
              }`}
            >
              <option value="12h">12-hour</option>
              <option value="24h">24-hour</option>
            </select>
          </div>

          <div className={`flex items-center justify-between p-4 rounded-lg ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}>
            <div>
              <p className={`text-sm font-medium ${isDarkMode ? 'text-white/80' : 'text-black/80'}`}>Auto-Save</p>
              <p className={`text-xs mt-1 ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>Automatically save changes</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={preferencesSettings.autoSave}
                onChange={(e) => setPreferencesSettings({ ...preferencesSettings, autoSave: e.target.checked })}
                className="sr-only peer"
              />
              <div className={`w-11 h-6 rounded-full peer transition-colors ${
                preferencesSettings.autoSave
                  ? 'bg-cyan-500'
                  : isDarkMode ? 'bg-white/20' : 'bg-black/20'
              }`}>
                <div className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                  preferencesSettings.autoSave ? 'translate-x-5' : ''
                }`} />
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfileSettings();
      case 'appearance':
        return renderAppearanceSettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'security':
        return renderSecuritySettings();
      case 'preferences':
        return renderPreferencesSettings();
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className={`text-2xl md:text-3xl font-bold m-0 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
          Settings
        </h1>
        <p className={`text-sm mt-1 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
          Customize your dashboard experience
        </p>
      </div>

      {/* Settings Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Tabs Sidebar */}
        <div className="lg:col-span-1">
          <div className="glass-card p-3 space-y-1">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg smooth-transition text-left ${
                  activeTab === id
                    ? isDarkMode
                      ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                      : 'bg-cyan-500/20 text-cyan-600 border border-cyan-500/30'
                    : isDarkMode
                    ? 'text-white/60 hover:text-white hover:bg-white/5'
                    : 'text-black/60 hover:text-black hover:bg-black/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Settings Panel */}
        <div className="lg:col-span-3">
          <div className="glass-card p-6">
            {renderTabContent()}

            {/* Action Buttons */}
            <div className="flex items-center gap-3 mt-8 pt-6 border-t border-white/10">
              <button
                onClick={handleSaveSettings}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg smooth-transition ${
                  isDarkMode
                    ? 'bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 border border-cyan-500/30'
                    : 'bg-cyan-500/20 text-cyan-600 hover:bg-cyan-500/30 border border-cyan-500/30'
                }`}
              >
                <Save className="w-4 h-4" />
                <span className="text-sm font-medium">Save Changes</span>
              </button>

              <button
                onClick={handleResetSettings}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg smooth-transition ${
                  isDarkMode
                    ? 'bg-white/5 text-white/70 hover:bg-white/10'
                    : 'bg-black/5 text-black/70 hover:bg-black/10'
                }`}
              >
                <RefreshCw className="w-4 h-4" />
                <span className="text-sm font-medium">Reset to Defaults</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
