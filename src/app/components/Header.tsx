import { Search, Bell, Sun, Moon, Zap, Activity, MessageSquare, Database, Server, HardDrive, BarChart3, Eye, Wifi, Cloud, Key, Globe, ChevronDown, CheckCircle, AlertCircle, Info, X, ExternalLink, Link2, Webhook } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useState, useRef } from 'react';
import { Link } from 'react-router';

export function Header() {
  const { isDarkMode, toggleTheme } = useTheme();
  const [systemsDropdownOpen, setSystemsDropdownOpen] = useState(false);
  const [connectionsDropdownOpen, setConnectionsDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [messagesOpen, setMessagesOpen] = useState(false);
  const systemsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const connectionsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  const handleSystemsMouseEnter = () => {
    if (systemsTimeoutRef.current) {
      clearTimeout(systemsTimeoutRef.current);
    }
    setSystemsDropdownOpen(true);
  };

  const handleSystemsMouseLeave = () => {
    systemsTimeoutRef.current = setTimeout(() => {
      setSystemsDropdownOpen(false);
    }, 200);
  };

  const handleConnectionsMouseEnter = () => {
    if (connectionsTimeoutRef.current) {
      clearTimeout(connectionsTimeoutRef.current);
    }
    setConnectionsDropdownOpen(true);
  };

  const handleConnectionsMouseLeave = () => {
    connectionsTimeoutRef.current = setTimeout(() => {
      setConnectionsDropdownOpen(false);
    }, 200);
  };
  
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });

  const systems = [
    { name: 'Database', status: 'operational', icon: Database, color: 'text-green-400' },
    { name: 'Server', status: 'operational', icon: Server, color: 'text-green-400' },
    { name: 'Cache', status: 'operational', icon: Zap, color: 'text-green-400' },
    { name: 'Storage', status: 'operational', icon: HardDrive, color: 'text-green-400' },
    { name: 'Analytics', status: 'operational', icon: BarChart3, color: 'text-green-400' },
    { name: 'Monitoring', status: 'operational', icon: Eye, color: 'text-green-400' },
  ];

  const connections = [
    { name: 'REST API', status: 'connected', icon: Link2, color: 'text-cyan-400' },
    { name: 'OAuth 2.0', status: 'connected', icon: Key, color: 'text-cyan-400' },
    { name: 'Webhooks', status: 'connected', icon: Webhook, color: 'text-cyan-400' },
    { name: 'Third-party APIs', status: 'connected', icon: Globe, color: 'text-cyan-400' },
  ];

  const notifications = [
    { 
      id: 1,
      title: 'Task completed successfully',
      message: 'Analytics report generation finished',
      type: 'success',
      icon: CheckCircle,
      color: 'text-green-400',
      time: '5 min ago',
      unread: true
    },
    { 
      id: 2,
      title: 'System maintenance',
      message: 'Scheduled for tonight at 2:00 AM',
      type: 'warning',
      icon: AlertCircle,
      color: 'text-orange-400',
      time: '1 hour ago',
      unread: true
    },
    { 
      id: 3,
      title: 'New feature available',
      message: 'Check out the updated dashboard',
      type: 'info',
      icon: Info,
      color: 'text-cyan-400',
      time: '2 hours ago',
      unread: false
    },
  ];

  const handleDismissNotification = (id: number) => {
    // In a real app, this would remove the notification
    console.log('Dismiss notification', id);
  };

  const handleMarkAllRead = () => {
    // In a real app, this would mark all as read
    console.log('Mark all as read');
  };

  const handleClearAll = () => {
    // In a real app, this would clear all notifications
    console.log('Clear all notifications');
  };

  return (
    <header className="glass-card border-b border-white/5 sticky top-0 z-30" style={{ background: isDarkMode ? 'rgba(15, 15, 25, 0.25)' : 'rgba(255, 255, 255, 0.5)', backdropFilter: 'blur(40px)' }}>
      <div className="px-6 py-4 space-y-4">
        {/* Top row - Search and Date/Time */}
        <div className="flex items-center gap-4">
          {/* Search bar - Full width */}
          <div className="flex-1">
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDarkMode ? 'text-white/40' : 'text-black/40'}`} />
              <input
                type="text"
                placeholder="Search dashboard..."
                className={`w-full pl-10 pr-4 py-2 rounded-lg border smooth-transition text-sm ${
                  isDarkMode 
                    ? 'bg-white/5 border-white/10 text-white/90 placeholder-white/40 focus:border-cyan-400/50 focus:bg-white/8'
                    : 'bg-white/30 border-black/10 text-black/90 placeholder-black/40 focus:border-cyan-400/50 focus:bg-white/50'
                }`}
              />
            </div>
          </div>

          {/* Date & Time */}
          <div className="hidden md:flex flex-col items-end">
            <span className={`text-sm metric-value ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>{currentTime}</span>
            <span className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>{currentDate}</span>
          </div>
        </div>

        {/* Bottom row - Status indicators and controls */}
        <div className="flex items-center justify-between gap-4">
          {/* Left - Status indicators */}
          <div className="hidden lg:flex items-center gap-3">
            {/* System status */}
            <div 
              className="relative"
              onMouseEnter={handleSystemsMouseEnter}
              onMouseLeave={handleSystemsMouseLeave}
            >
              <button
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg smooth-transition cursor-pointer ${
                  isDarkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-white/30 hover:bg-white/40'
                }`}
                onClick={() => setSystemsDropdownOpen(!systemsDropdownOpen)}
              >
                <Activity className="w-4 h-4 text-green-400" />
                <span className={`text-xs ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>All Systems</span>
                <span className="status-dot status-success"></span>
                <ChevronDown className={`w-3 h-3 ${isDarkMode ? 'text-white/40' : 'text-black/40'} smooth-transition ${systemsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown */}
              {systemsDropdownOpen && (
                <div
                  className="absolute top-full left-0 mt-2 w-56 glass-card rounded-lg shadow-xl border border-white/10 overflow-hidden z-50"
                  style={{ background: isDarkMode ? 'rgba(15, 15, 25, 0.95)' : 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(40px)' }}
                >
                  <div className="p-2">
                    <div className={`px-3 py-2 border-b ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
                      <span className={`text-xs font-semibold ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                        System Status
                      </span>
                    </div>
                    <div className="py-1">
                      {systems.map((system) => {
                        const Icon = system.icon;
                        return (
                          <div
                            key={system.name}
                            className={`flex items-center justify-between px-3 py-2 rounded smooth-transition ${
                              isDarkMode ? 'hover:bg-white/5' : 'hover:bg-black/5'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <Icon className={`w-4 h-4 ${system.color}`} />
                              <span className={`text-xs ${isDarkMode ? 'text-white/80' : 'text-black/80'}`}>
                                {system.name}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className={`status-dot ${system.status === 'operational' ? 'status-success' : 'status-warning'}`}></span>
                              <span className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
                                {system.status}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Connectivity */}
            <div 
              className="relative"
              onMouseEnter={handleConnectionsMouseEnter}
              onMouseLeave={handleConnectionsMouseLeave}
            >
              <button
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${isDarkMode ? 'bg-white/5' : 'bg-white/30'}`}
                onClick={() => setConnectionsDropdownOpen(!connectionsDropdownOpen)}
              >
                <Wifi className="w-4 h-4 text-cyan-400" />
                <span className={`text-xs ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>Connected</span>
                <ChevronDown className={`w-3 h-3 ${isDarkMode ? 'text-white/40' : 'text-black/40'} smooth-transition ${connectionsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown */}
              {connectionsDropdownOpen && (
                <div
                  className="absolute top-full left-0 mt-2 w-56 glass-card rounded-lg shadow-xl border border-white/10 overflow-hidden z-50"
                  style={{ background: isDarkMode ? 'rgba(15, 15, 25, 0.95)' : 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(40px)' }}
                >
                  <div className="p-2">
                    <div className={`px-3 py-2 border-b ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
                      <span className={`text-xs font-semibold ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                        Connectivity
                      </span>
                    </div>
                    <div className="py-1">
                      {connections.map((connection) => {
                        const Icon = connection.icon;
                        return (
                          <div
                            key={connection.name}
                            className={`flex items-center justify-between px-3 py-2 rounded smooth-transition ${
                              isDarkMode ? 'hover:bg-white/5' : 'hover:bg-black/5'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <Icon className={`w-4 h-4 ${connection.color}`} />
                              <span className={`text-xs ${isDarkMode ? 'text-white/80' : 'text-black/80'}`}>
                                {connection.name}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className={`status-dot ${connection.status === 'connected' ? 'status-success' : 'status-warning'}`}></span>
                              <span className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
                                {connection.status}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Cloud sync */}
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${isDarkMode ? 'bg-white/5' : 'bg-white/30'}`}>
              <Cloud className="w-4 h-4 text-purple-400" />
              <span className={`text-xs ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>Synced</span>
            </div>
          </div>

          {/* Right - Controls */}
          <div className="flex items-center gap-3">
            {/* Energy/streak indicator */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg glass-card">
              <Zap className="w-4 h-4 text-orange-400" />
              <span className={`text-sm metric-value ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>87%</span>
            </div>

            {/* Dark/Light mode toggle */}
            <button 
              onClick={toggleTheme}
              className={`p-2 rounded-lg smooth-transition ${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-black/5'}`}
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-white/70" />
              ) : (
                <Moon className="w-5 h-5 text-black/70" />
              )}
            </button>

            {/* Messages */}
            <div className="relative">
              <button
                className={`relative p-2 rounded-lg smooth-transition ${
                  messagesOpen 
                    ? isDarkMode ? 'bg-white/10' : 'bg-black/10'
                    : isDarkMode ? 'hover:bg-white/5' : 'hover:bg-black/5'
                }`}
                onClick={() => setMessagesOpen(!messagesOpen)}
                aria-label="Messages"
              >
                <MessageSquare className={`w-5 h-5 smooth-transition ${
                  messagesOpen
                    ? 'text-purple-400'
                    : isDarkMode ? 'text-white/70' : 'text-black/70'
                }`} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-purple-500 rounded-full border border-black"></span>
              </button>

              {/* Messages panel */}
              {messagesOpen && (
                <div
                  className="absolute top-full right-0 mt-2 w-80 sm:w-96 max-h-[min(75vh,44rem)] glass-card rounded-lg shadow-xl border border-white/10 overflow-hidden z-50 flex flex-col"
                  style={{ background: isDarkMode ? 'rgba(15, 15, 25, 0.95)' : 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(40px)' }}
                  onMouseEnter={() => setMessagesOpen(true)}
                  onMouseLeave={() => setMessagesOpen(false)}
                >
                  {/* Header */}
                  <div className={`px-4 py-3 border-b flex items-center justify-between ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
                    <div>
                      <h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                        Messages
                      </h3>
                      <p className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
                        Recent conversations
                      </p>
                    </div>
                  </div>

                  {/* Messages list */}
                  <div className="min-h-0 flex-1 overflow-y-auto">
                    {/* Discord Message */}
                    <Link
                      to="/messages/discord"
                      onClick={() => setMessagesOpen(false)}
                      className={`block px-4 py-3 border-b smooth-transition cursor-pointer ${
                        isDarkMode 
                          ? 'border-white/5 hover:bg-white/5 bg-white/5' 
                          : 'border-black/5 hover:bg-black/5 bg-black/5'
                      }`}
                    >
                      <div className="flex gap-3">
                        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-purple-500 to-purple-600`}>
                          <MessageSquare className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className={`text-xs font-medium ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                              Discord
                              <span className="ml-2 inline-block w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                            </h4>
                            <span className={`text-xs ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}>
                              2m ago
                            </span>
                          </div>
                          <p className={`text-xs mt-1 ${isDarkMode ? 'text-white/60' : 'text-black/60'} truncate`}>
                            Alex: Hey team! Don't forget about the standup...
                          </p>
                          <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-xs bg-purple-500/20 text-purple-400">
                            3 new
                          </span>
                        </div>
                      </div>
                    </Link>

                    {/* Telegram Message */}
                    <Link
                      to="/messages/telegram"
                      onClick={() => setMessagesOpen(false)}
                      className={`block px-4 py-3 border-b smooth-transition cursor-pointer ${
                        isDarkMode 
                          ? 'border-white/5 hover:bg-white/5' 
                          : 'border-black/5 hover:bg-black/5'
                      }`}
                    >
                      <div className="flex gap-3">
                        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-cyan-500 to-cyan-600`}>
                          <MessageSquare className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className={`text-xs font-medium ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                              Telegram
                            </h4>
                            <span className={`text-xs ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}>
                              15m ago
                            </span>
                          </div>
                          <p className={`text-xs mt-1 ${isDarkMode ? 'text-white/60' : 'text-black/60'} truncate`}>
                            Maria: The project deadline has been extended
                          </p>
                        </div>
                      </div>
                    </Link>

                    {/* Slack Message */}
                    <Link
                      to="/messages/slack"
                      onClick={() => setMessagesOpen(false)}
                      className={`block px-4 py-3 border-b smooth-transition cursor-pointer ${
                        isDarkMode 
                          ? 'border-white/5 hover:bg-white/5 bg-white/5' 
                          : 'border-black/5 hover:bg-black/5 bg-black/5'
                      }`}
                    >
                      <div className="flex gap-3">
                        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-orange-500 to-orange-600`}>
                          <MessageSquare className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className={`text-xs font-medium ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                              Slack
                              <span className="ml-2 inline-block w-1.5 h-1.5 bg-orange-400 rounded-full"></span>
                            </h4>
                            <span className={`text-xs ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}>
                              1h ago
                            </span>
                          </div>
                          <p className={`text-xs mt-1 ${isDarkMode ? 'text-white/60' : 'text-black/60'} truncate`}>
                            John: Can you review the PR when you have time?
                          </p>
                          <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-xs bg-orange-500/20 text-orange-400">
                            2 new
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>

                  {/* Footer */}
                  <div className={`px-4 py-3 border-t ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
                    <Link
                      to="/messages"
                      onClick={() => setMessagesOpen(false)}
                      className={`block text-center text-xs py-2 rounded smooth-transition ${
                        isDarkMode 
                          ? 'bg-purple-500/20 hover:bg-purple-500/30 text-purple-400'
                          : 'bg-purple-500/20 hover:bg-purple-500/30 text-purple-600'
                      }`}
                    >
                      View all messages
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                className={`relative p-2 rounded-lg smooth-transition ${
                  notificationsOpen 
                    ? isDarkMode ? 'bg-white/10' : 'bg-black/10'
                    : isDarkMode ? 'hover:bg-white/5' : 'hover:bg-black/5'
                }`}
                onClick={() => setNotificationsOpen(!notificationsOpen)}
              >
                <Bell className={`w-5 h-5 smooth-transition ${
                  notificationsOpen
                    ? 'text-orange-400'
                    : isDarkMode ? 'text-white/70' : 'text-black/70'
                }`} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full border border-black"></span>
              </button>

              {/* Notifications panel */}
              {notificationsOpen && (
                <div
                  className="absolute top-full right-0 mt-2 w-80 sm:w-96 max-h-[min(75vh,44rem)] glass-card rounded-lg shadow-xl border border-white/10 overflow-hidden z-50 flex flex-col"
                  style={{ background: isDarkMode ? 'rgba(15, 15, 25, 0.95)' : 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(40px)' }}
                  onMouseEnter={() => setNotificationsOpen(true)}
                  onMouseLeave={() => setNotificationsOpen(false)}
                >
                  {/* Header */}
                  <div className={`px-4 py-3 border-b flex items-center justify-between ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
                    <div>
                      <h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                        Notifications
                      </h3>
                      <p className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
                        You have {notifications.filter(n => n.unread).length} unread messages
                      </p>
                    </div>
                    <button
                      onClick={handleMarkAllRead}
                      className={`text-xs px-2 py-1 rounded smooth-transition ${
                        isDarkMode 
                          ? 'text-cyan-400 hover:bg-cyan-400/10'
                          : 'text-cyan-600 hover:bg-cyan-400/10'
                      }`}
                    >
                      Mark all read
                    </button>
                  </div>

                  {/* Notifications list */}
                  <div className="min-h-0 flex-1 overflow-y-auto">
                    {notifications.map((notification) => {
                      const Icon = notification.icon;
                      return (
                        <div
                          key={notification.id}
                          className={`relative px-4 py-3 border-b smooth-transition cursor-pointer ${
                            isDarkMode 
                              ? 'border-white/5 hover:bg-white/5' 
                              : 'border-black/5 hover:bg-black/5'
                          } ${notification.unread ? (isDarkMode ? 'bg-white/5' : 'bg-black/5') : ''}`}
                        >
                          <div className="flex gap-3">
                            {/* Icon */}
                            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                              isDarkMode ? 'bg-white/10' : 'bg-black/10'
                            }`}>
                              <Icon className={`w-4 h-4 ${notification.color}`} />
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <h4 className={`text-xs font-medium ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                                  {notification.title}
                                  {notification.unread && (
                                    <span className="ml-2 inline-block w-1.5 h-1.5 bg-cyan-400 rounded-full"></span>
                                  )}
                                </h4>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDismissNotification(notification.id);
                                  }}
                                  className={`flex-shrink-0 p-1 rounded smooth-transition ${
                                    isDarkMode 
                                      ? 'hover:bg-white/10 text-white/40 hover:text-white/70'
                                      : 'hover:bg-black/10 text-black/40 hover:text-black/70'
                                  }`}
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </div>
                              <p className={`text-xs mt-1 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                                {notification.message}
                              </p>
                              <div className="flex items-center justify-between mt-2">
                                <span className={`text-xs ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}>
                                  {notification.time}
                                </span>
                                <button
                                  className={`text-xs flex items-center gap-1 smooth-transition ${
                                    isDarkMode 
                                      ? 'text-cyan-400 hover:text-cyan-300'
                                      : 'text-cyan-600 hover:text-cyan-700'
                                  }`}
                                >
                                  View <ExternalLink className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Footer */}
                  <div className={`px-4 py-3 border-t flex gap-2 ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
                    <button
                      onClick={handleClearAll}
                      className={`flex-1 text-xs py-2 rounded smooth-transition ${
                        isDarkMode 
                          ? 'bg-white/5 hover:bg-white/10 text-white/70'
                          : 'bg-black/5 hover:bg-black/10 text-black/70'
                      }`}
                    >
                      Clear all
                    </button>
                    <button
                      className={`flex-1 text-xs py-2 rounded smooth-transition ${
                        isDarkMode 
                          ? 'bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400'
                          : 'bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-600'
                      }`}
                    >
                      View all
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile status bar */}
      <div className={`lg:hidden flex items-center justify-center gap-4 px-6 pb-3 border-t pt-3 ${isDarkMode ? 'border-white/5' : 'border-black/5'}`}>
        <div className="flex items-center gap-1.5">
          <Activity className="w-3 h-3 text-green-400" />
          <span className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>Online</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Zap className="w-3 h-3 text-orange-400" />
          <span className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>87% Energy</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Cloud className="w-3 h-3 text-purple-400" />
          <span className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>Synced</span>
        </div>
      </div>
    </header>
  );
}
