import { Play, Pause, MoreVertical, Circle, CheckCircle2, Timer, Repeat, X, ChevronLeft, ChevronRight, Bell, AlertCircle, CheckCircle, Info } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useSidebar, type RightSidebarModule } from '../contexts/SidebarContext';
import { getBadgeToneStyles } from '../lib/badgeStyles';

interface Task {
  id: string;
  number: string;
  title: string;
  completed: boolean;
  comments?: number;
  subtasks?: number;
  priority?: 'low' | 'medium' | 'high';
  dueDate?: string;
}

interface TimerItem {
  id: string;
  project: string;
  task: string;
  time: number; // Changed to number (seconds)
  isActive: boolean;
}

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  category: 'task' | 'system' | 'product' | 'backup';
  source: string;
  icon: typeof CheckCircle | typeof AlertCircle | typeof Info;
  accentClassName: string;
  surfaceClassName: string;
  iconSurfaceClassName: string;
}

interface DiscordMessage {
  id: string;
  user: string;
  avatar: string;
  message: string;
  timestamp: string;
  color: string;
}

interface DiscordChannel {
  id: string;
  name: string;
  unread?: number;
}

const initialTasks: Task[] = [
  { id: '1', number: '01', title: 'Create wireframe', completed: false, priority: 'high', dueDate: 'Today' },
  { id: '2', number: '02', title: 'Slack Logo Design', completed: false, comments: 3, subtasks: 5, priority: 'medium', dueDate: 'Tomorrow' },
  { id: '3', number: '03', title: 'Dashboard Design', completed: false, subtasks: 5, priority: 'high', dueDate: 'Today' },
  { id: '4', number: '04', title: 'Create wireframe', completed: true, priority: 'low' },
  { id: '5', number: '05', title: 'Google Logo Design', completed: true, priority: 'medium' },
  { id: '6', number: '06', title: 'Slack Logo Design', completed: false, priority: 'low', dueDate: 'Next Week' },
  { id: '7', number: '07', title: 'Dashboard Design', completed: false, subtasks: 5, priority: 'medium', dueDate: 'Tomorrow' },
];

const initialTimers: TimerItem[] = [
  { id: '1', project: 'Google', task: 'Create Wireframe', time: 1520, isActive: false },
  { id: '2', project: 'Slack', task: 'Slack logo design', time: 1800, isActive: false },
  { id: '3', project: 'Slack', task: 'Dashboard design', time: 1800, isActive: false },
  { id: '4', project: 'Google', task: 'Create Wireframe', time: 1800, isActive: false },
];

const initialNotifications: NotificationItem[] = [
  {
    id: 'notification-task-complete',
    title: 'Task Completed',
    message: 'Analytics report generation finished successfully',
    timestamp: '5 min ago',
    category: 'task',
    source: 'Analytics',
    icon: CheckCircle,
    accentClassName: 'text-green-400',
    surfaceClassName: 'bg-green-500/10 border border-green-500/20',
    iconSurfaceClassName: 'bg-green-500/20',
  },
  {
    id: 'notification-system-maintenance',
    title: 'System Maintenance',
    message: 'Scheduled for tonight at 2:00 AM',
    timestamp: '1 hour ago',
    category: 'system',
    source: 'Infrastructure',
    icon: AlertCircle,
    accentClassName: 'text-orange-400',
    surfaceClassName: 'bg-orange-500/10 border border-orange-500/20',
    iconSurfaceClassName: 'bg-orange-500/20',
  },
  {
    id: 'notification-feature-release',
    title: 'New Feature Available',
    message: 'Check out the updated dashboard',
    timestamp: '2 hours ago',
    category: 'product',
    source: 'Dashboard',
    icon: Info,
    accentClassName: 'text-cyan-400',
    surfaceClassName: 'bg-cyan-500/10 border border-cyan-500/20',
    iconSurfaceClassName: 'bg-cyan-500/20',
  },
  {
    id: 'notification-backup-complete',
    title: 'Backup Complete',
    message: 'All data backed up successfully',
    timestamp: '3 hours ago',
    category: 'backup',
    source: 'Storage',
    icon: CheckCircle,
    accentClassName: 'text-purple-400',
    surfaceClassName: 'bg-purple-500/10 border border-purple-500/20',
    iconSurfaceClassName: 'bg-purple-500/20',
  },
];

const discordChannels: DiscordChannel[] = [
  { id: '1', name: 'general', unread: 3 },
  { id: '2', name: 'dev-team' },
  { id: '3', name: 'design-feedback', unread: 1 },
  { id: '4', name: 'random' },
];

const discordMessages: DiscordMessage[] = [
  { id: '1', user: 'Sarah', avatar: 'S', message: 'Hey everyone! Quick update on the dashboard design', timestamp: '2:34 PM', color: 'from-purple-500 to-pink-500' },
  { id: '2', user: 'Mike', avatar: 'M', message: 'Looking good! Can we add more analytics?', timestamp: '2:35 PM', color: 'from-cyan-500 to-blue-500' },
  { id: '3', user: 'You', avatar: 'JD', message: 'Sure, I\'ll work on that this afternoon', timestamp: '2:36 PM', color: 'from-orange-500 to-yellow-500' },
  { id: '4', user: 'Alex', avatar: 'A', message: 'Don\'t forget the mobile responsive version', timestamp: '2:40 PM', color: 'from-green-500 to-emerald-500' },
];

export function RightSidebar() {
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [timers, setTimers] = useState<TimerItem[]>(initialTimers);
  const { isDarkMode } = useTheme();
  const {
    rightSidebarExpanded,
    toggleRightSidebar,
    rightSidebarWidth,
    activeRightSidebarModule,
    openRightSidebarModule,
  } = useSidebar();
  const notificationsRef = useRef<HTMLDivElement | null>(null);
  const tasksRef = useRef<HTMLDivElement | null>(null);
  const timersRef = useRef<HTMLDivElement | null>(null);

  // Live timer effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTimers(prevTimers => 
        prevTimers.map(timer => 
          timer.isActive ? { ...timer, time: timer.time + 1 } : timer
        )
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!rightSidebarExpanded) {
      return;
    }

    const sectionRefs: Record<RightSidebarModule, HTMLDivElement | null> = {
      notifications: notificationsRef.current,
      tasks: tasksRef.current,
      timers: timersRef.current,
    };

    const activeSection = sectionRefs[activeRightSidebarModule];
    if (activeSection && typeof activeSection.scrollIntoView === 'function') {
      activeSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [activeRightSidebarModule, rightSidebarExpanded]);

  const toggleTaskComplete = (taskId: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const removeTask = (taskId: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  const toggleTimer = (timerId: string) => {
    setTimers(prevTimers =>
      prevTimers.map(timer =>
        timer.id === timerId ? { ...timer, isActive: !timer.isActive } : timer
      )
    );
  };

  const removeTimer = (timerId: string) => {
    setTimers(prevTimers => prevTimers.filter(timer => timer.id !== timerId));
  };

  const removeNotification = (notificationId: string) => {
    setNotifications(prevNotifications =>
      prevNotifications.filter(notification => notification.id !== notificationId),
    );
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const activeTasks = tasks.filter(t => !t.completed);
  const getModuleCardClassName = (module: RightSidebarModule) =>
    activeRightSidebarModule === module
      ? isDarkMode
        ? 'ring-1 ring-cyan-400/40 bg-white/5'
        : 'ring-1 ring-cyan-500/40 bg-black/5'
      : '';

  const getCollapsedModuleButtonClassName = (
    module: RightSidebarModule,
    baseClassName: string,
  ) =>
    activeRightSidebarModule === module
      ? `${baseClassName} ${isDarkMode ? 'bg-white/10 ring-1 ring-white/10' : 'bg-black/10 ring-1 ring-black/10'}`
      : baseClassName;

  const getPriorityColor = (priority?: 'low' | 'medium' | 'high') => {
    if (!priority) return isDarkMode ? 'bg-white/5' : 'bg-black/5';
    switch (priority) {
      case 'high': return 'bg-red-500/20 border-l-2 border-red-500';
      case 'medium': return 'bg-orange-500/20 border-l-2 border-orange-500';
      case 'low': return 'bg-cyan-500/20 border-l-2 border-cyan-500';
    }
  };

  const getNotificationBadgeStyle = (category: NotificationItem['category']) => {
    switch (category) {
      case 'task':
        return getBadgeToneStyles('success', isDarkMode).style;
      case 'system':
        return getBadgeToneStyles('warning', isDarkMode).style;
      case 'product':
        return getBadgeToneStyles('info', isDarkMode).style;
      case 'backup':
        return getBadgeToneStyles('purple', isDarkMode).style;
    }
  };

  const notificationCountLabel = notifications.length.toString();

  return (
    // Keep the rail itself overflow-visible so the external collapse control is not clipped.
    <aside
      className="hidden xl:flex flex-col glass-card border-l border-white/5 overflow-visible transition-all duration-300 ease-in-out relative z-50"
      style={{ 
        width: `${rightSidebarWidth}px`,
        background: isDarkMode ? 'rgba(15, 15, 25, 0.3)' : 'rgba(255, 255, 255, 0.4)', 
        backdropFilter: 'blur(40px)' 
      }}
    >
      {/* Collapse/Expand Button */}
      <button
        onClick={toggleRightSidebar}
        className={`
          absolute -left-3 bottom-6 z-[100]
          w-6 h-6 rounded-full flex items-center justify-center
          smooth-transition
          ${isDarkMode ? 'bg-purple-500/20 hover:bg-purple-500/30 text-purple-400' : 'bg-purple-500/20 hover:bg-purple-500/30 text-purple-600'}
          border ${isDarkMode ? 'border-purple-500/30' : 'border-purple-500/30'}
        `}
        title={rightSidebarExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
      >
        {rightSidebarExpanded ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>

      {rightSidebarExpanded ? (
        <div className="flex-1 min-h-0 overflow-y-auto p-6 space-y-6">
          {/* Notifications Section */}
          <div
            ref={notificationsRef}
            className={`glass-card rounded-lg overflow-hidden smooth-transition ${getModuleCardClassName('notifications')}`}
          >
            <div className={`p-4 border-b ${isDarkMode ? 'border-white/5' : 'border-black/5'}`}>
              <div className="flex items-center justify-between mb-3">
                <h3 className={`m-0 flex items-center gap-2 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                  <Bell className="w-4 h-4 text-orange-400" />
                  Notifications
                </h3>
                <span className={`px-2 py-0.5 rounded-full text-xs ${isDarkMode ? 'bg-orange-500/20 text-orange-400' : 'bg-orange-500/20 text-orange-600'}`}>
                  {notificationCountLabel} new
                </span>
              </div>
            </div>
            
            {/* Notifications List */}
            <div className="p-4 space-y-3 max-h-80 overflow-y-auto">
              {notifications.length > 0 ? (
                notifications.map((notification) => {
                  const Icon = notification.icon;

                  return (
                    <div key={notification.id} className={`p-3 rounded-lg ${notification.surfaceClassName}`}>
                      <div className="flex gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${notification.iconSurfaceClassName}`}>
                          <Icon className={`w-4 h-4 ${notification.accentClassName}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div className="min-w-0">
                              <h4 className={`text-xs font-medium mb-1 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                                {notification.title}
                              </h4>
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-[0.08em]" style={getNotificationBadgeStyle(notification.category)}>
                                  {notification.category}
                                </span>
                                <span className="rounded-full border px-2 py-0.5 text-[10px]" style={getBadgeToneStyles('neutral', isDarkMode).style}>
                                  {notification.source}
                                </span>
                              </div>
                            </div>
                            <button
                              onClick={() => removeNotification(notification.id)}
                              className={`w-7 h-7 rounded-lg flex items-center justify-center smooth-transition ${isDarkMode ? 'hover:bg-white/10 text-white/40 hover:text-white/80' : 'hover:bg-black/10 text-black/40 hover:text-black/80'}`}
                              title="Clear notification"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <p className={`text-xs m-0 mb-2 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                            {notification.message}
                          </p>
                          <span className={`text-xs ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}>
                            {notification.timestamp}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className={`rounded-lg p-4 text-center ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}>
                  <Bell className={`w-5 h-5 mx-auto mb-2 ${isDarkMode ? 'text-white/30' : 'text-black/30'}`} />
                  <p className={`text-xs m-0 ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
                    All caught up. No notifications right now.
                  </p>
                </div>
              )}
            </div>
            
            {/* Footer */}
            <div className={`p-3 border-t ${isDarkMode ? 'border-white/5' : 'border-black/5'}`}>
              <button className={`w-full py-2 px-3 rounded-lg text-xs smooth-transition ${isDarkMode ? 'bg-white/5 hover:bg-white/10 text-white/70' : 'bg-black/5 hover:bg-black/10 text-black/70'}`}>
                View All Notifications
              </button>
            </div>
          </div>

          {/* My Tasks Section - Evolved */}
          <div
            ref={tasksRef}
            className={`rounded-lg smooth-transition ${getModuleCardClassName('tasks')}`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className={`m-0 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                My Tasks 
                <span className={isDarkMode ? 'text-white/50' : 'text-black/50'}> ({activeTasks.length.toString().padStart(2, '0')})</span>
              </h3>
              <button className={`text-xs px-2 py-1 rounded-lg smooth-transition ${isDarkMode ? 'text-cyan-400 hover:bg-cyan-500/20' : 'text-cyan-600 hover:bg-cyan-500/20'}`}>
                View All
              </button>
            </div>
            
            <div className="space-y-2">
              {tasks.slice(0, 5).map((task) => (
                <div
                  key={task.id}
                  className={`
                    flex items-start gap-3 p-3 rounded-lg
                    smooth-transition group relative
                    ${task.completed ? 'opacity-60' : ''}
                    ${getPriorityColor(task.priority)}
                  `}
                >
                  {/* Checkbox */}
                  <button 
                    onClick={() => toggleTaskComplete(task.id)}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center hover:border-cyan-400 smooth-transition flex-shrink-0 mt-0.5 ${isDarkMode ? 'border-white/20' : 'border-black/20'}`}
                  >
                    {task.completed && (
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                    )}
                  </button>
                  
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm m-0 mb-1 ${task.completed ? isDarkMode ? 'line-through text-white/40' : 'line-through text-black/40' : isDarkMode ? 'text-white/80' : 'text-black/80'}`}>
                      {task.title}
                    </p>
                    
                    {/* Task metadata row */}
                    <div className="flex items-center gap-3 flex-wrap">
                      {task.dueDate && (
                        <span className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
                          📅 {task.dueDate}
                        </span>
                      )}
                      {task.subtasks && (
                        <span className={`flex items-center gap-1 text-xs ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
                          <Repeat className="w-3 h-3" />
                          {task.subtasks}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Delete button (shows on hover) */}
                  <button 
                    onClick={() => removeTask(task.id)}
                    className={`opacity-0 group-hover:opacity-100 smooth-transition p-1 rounded hover:bg-red-500/20 flex-shrink-0`}
                    title="Remove task"
                  >
                    <X className="w-3 h-3 text-red-400" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Combined Timer Section */}
          <div
            ref={timersRef}
            className={`rounded-lg smooth-transition ${getModuleCardClassName('timers')}`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className={`m-0 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                Active Timers
              </h3>
              <button className={`w-8 h-8 rounded-lg flex items-center justify-center smooth-transition ${isDarkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-black/5 hover:bg-black/10'}`}>
                <Play className={`w-4 h-4 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`} />
              </button>
            </div>
            
            <div className="glass-card p-4 rounded-lg space-y-2">
              {timers.map((timer) => (
                <div
                  key={timer.id}
                  className={`
                    flex items-center gap-3 p-3 rounded-lg group
                    ${timer.isActive ? 'bg-orange-500/20 border border-orange-500/30' : isDarkMode ? 'bg-white/5' : 'bg-black/5'}
                  `}
                >
                  <div className={`p-2 rounded-lg ${timer.isActive ? 'bg-orange-500/20' : isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}>
                    <Timer className={`w-4 h-4 ${timer.isActive ? 'text-orange-400' : isDarkMode ? 'text-white/40' : 'text-black/40'}`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs m-0 mb-0.5 ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>{timer.project}</p>
                    <p className={`text-sm m-0 truncate ${isDarkMode ? 'text-white/80' : 'text-black/80'}`}>{timer.task}</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className={`text-sm metric-value min-w-[60px] text-right ${timer.isActive ? 'text-orange-400' : isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                      {formatTime(timer.time)}
                    </span>
                    <button 
                      onClick={() => toggleTimer(timer.id)}
                      className={timer.isActive 
                        ? "w-7 h-7 rounded-lg bg-orange-500 flex items-center justify-center hover:bg-orange-600 smooth-transition" 
                        : `w-7 h-7 rounded-lg flex items-center justify-center smooth-transition ${isDarkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-black/10 hover:bg-black/20'}`
                      }
                    >
                      {timer.isActive ? (
                        <Pause className="w-3.5 h-3.5 text-white" />
                      ) : (
                        <Play className={`w-3.5 h-3.5 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`} />
                      )}
                    </button>
                    <button 
                      onClick={() => removeTimer(timer.id)}
                      className={`opacity-0 group-hover:opacity-100 w-7 h-7 flex items-center justify-center smooth-transition hover:text-red-400 ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}
                      title="Remove timer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        // Collapsed state - icon only view
        <div className="flex-1 overflow-y-auto p-3 space-y-4">
          {/* Notifications icon */}
          <button 
            onClick={() => openRightSidebarModule('notifications')}
            className={`w-full flex items-center justify-center p-3 rounded-lg smooth-transition ${getCollapsedModuleButtonClassName(
              'notifications',
              isDarkMode ? 'hover:bg-orange-500/20 text-orange-400' : 'hover:bg-orange-500/20 text-orange-600',
            )}`}
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
          </button>
          
          {/* Tasks icon with count */}
          <button 
            onClick={() => openRightSidebarModule('tasks')}
            className={`w-full flex flex-col items-center justify-center p-3 rounded-lg smooth-transition relative ${getCollapsedModuleButtonClassName(
              'tasks',
              isDarkMode ? 'hover:bg-cyan-500/20 text-cyan-400' : 'hover:bg-cyan-500/20 text-cyan-600',
            )}`}
            title="My Tasks"
          >
            <CheckCircle2 className="w-5 h-5" />
            {activeTasks.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                {activeTasks.length}
              </span>
            )}
          </button>
          
          {/* Timer icon */}
          <button 
            onClick={() => openRightSidebarModule('timers')}
            className={`w-full flex items-center justify-center p-3 rounded-lg smooth-transition ${getCollapsedModuleButtonClassName(
              'timers',
              isDarkMode ? 'hover:bg-orange-500/20 text-orange-400' : 'hover:bg-orange-500/20 text-orange-600',
            )}`}
            title="Active Timers"
          >
            <Timer className="w-5 h-5" />
          </button>
        </div>
      )}
    </aside>
  );
}
