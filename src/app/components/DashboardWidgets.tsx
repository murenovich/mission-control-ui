import { TrendingUp, Target, Calendar, CheckCircle2, Flame, Brain, Clock, Award, ArrowUpRight, ArrowDownRight, X, Plus } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useState } from 'react';

// Metric Card Component
interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ElementType;
  accentColor: 'cyan' | 'purple' | 'orange' | 'green' | 'pink';
  onClick?: () => void;
}

function MetricCard({ title, value, change, icon: Icon, accentColor, onClick }: MetricCardProps) {
  const { isDarkMode } = useTheme();
  const accentColors = {
    cyan: 'text-cyan-400',
    purple: 'text-purple-400',
    orange: 'text-orange-400',
    green: 'text-green-400',
    pink: 'text-pink-400',
  };

  const glowColors = {
    cyan: 'neon-glow-cyan',
    purple: 'neon-glow-purple',
    orange: 'neon-glow-orange',
    green: '',
    pink: '',
  };

  return (
    <div 
      className={`glass-card glass-card-hover p-5 ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-2.5 rounded-lg ${isDarkMode ? 'bg-white/5' : 'bg-black/5'} ${glowColors[accentColor]}`}>
          <Icon className={`w-5 h-5 ${accentColors[accentColor]}`} />
        </div>
        {change !== undefined && (
          <div className={`flex items-center gap-1 text-xs ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {change >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
            <span>{Math.abs(change)}%</span>
          </div>
        )}
      </div>
      <h3 className={`text-xs label-text mb-2 m-0 ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>{title}</h3>
      <p className={`text-2xl metric-value m-0 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>{value}</p>
    </div>
  );
}

// Progress Card Component
interface ProgressCardProps {
  title: string;
  current: number;
  total: number;
  icon: React.ElementType;
  color: string;
  onIncrement?: () => void;
}

function ProgressCard({ title, current, total, icon: Icon, color, onIncrement }: ProgressCardProps) {
  const { isDarkMode } = useTheme();
  const percentage = Math.round((current / total) * 100);

  return (
    <div className="glass-card glass-card-hover p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Icon className={`w-5 h-5 ${color}`} />
          <h3 className={`text-sm m-0 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>{title}</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-sm metric-value ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>{current}/{total}</span>
          {onIncrement && current < total && (
            <button 
              onClick={onIncrement}
              className={`w-6 h-6 rounded-full flex items-center justify-center smooth-transition ${isDarkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-black/10 hover:bg-black/20'}`}
              title="Complete goal"
            >
              <Plus className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
      <div className={`w-full h-2 rounded-full overflow-hidden ${isDarkMode ? 'bg-white/10' : 'bg-black/10'}`}>
        <div
          className={`h-full rounded-full transition-all duration-500`}
          style={{
            width: `${percentage}%`,
            background: `linear-gradient(90deg, ${color.includes('cyan') ? '#00e5ff' : color.includes('purple') ? '#b366ff' : '#ff8c42'}, ${color.includes('cyan') ? '#b366ff' : color.includes('purple') ? '#ff00aa' : '#ffaa00'})`
          }}
        />
      </div>
      <p className={`text-xs mt-2 m-0 ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>{percentage}% complete</p>
    </div>
  );
}

// Activity Feed Component
interface ActivityItem {
  id: string;
  type: 'goal' | 'task' | 'habit';
  text: string;
  time: string;
  status: 'success' | 'warning' | 'info';
}

function ActivityFeed({ onRemoveActivity }: { onRemoveActivity: (id: string) => void }) {
  const { isDarkMode } = useTheme();
  const [activities, setActivities] = useState<ActivityItem[]>([
    { id: '1', type: 'goal', text: 'Completed morning meditation', time: '8:30 AM', status: 'success' },
    { id: '2', type: 'task', text: 'Project deadline approaching', time: '9:15 AM', status: 'warning' },
    { id: '3', type: 'habit', text: '7-day workout streak achieved', time: '10:00 AM', status: 'success' },
    { id: '4', type: 'task', text: 'Reviewed quarterly goals', time: '11:30 AM', status: 'info' },
  ]);

  const statusColors = {
    success: 'status-success',
    warning: 'status-warning',
    info: 'bg-cyan-400',
  };

  const removeActivity = (id: string) => {
    setActivities(prev => prev.filter(a => a.id !== id));
    onRemoveActivity(id);
  };

  return (
    <div className="glass-card p-5">
      <h3 className={`text-sm mb-4 m-0 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>Recent Activity</h3>
      <div className="space-y-3">
        {activities.map((activity) => (
          <div key={activity.id} className={`flex items-start gap-3 p-3 rounded-lg smooth-transition group ${isDarkMode ? 'bg-white/5 hover:bg-white/8' : 'bg-black/5 hover:bg-black/8'}`}>
            <span className={`status-dot ${statusColors[activity.status]} mt-1.5`}></span>
            <div className="flex-1 min-w-0">
              <p className={`text-sm m-0 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>{activity.text}</p>
              <p className={`text-xs mt-1 m-0 ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>{activity.time}</p>
            </div>
            <button
              onClick={() => removeActivity(activity.id)}
              className={`opacity-0 group-hover:opacity-100 smooth-transition hover:text-red-400 ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}
              title="Dismiss"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Weekly Overview Component
function WeeklyOverview() {
  const { isDarkMode } = useTheme();
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const [values, setValues] = useState([85, 92, 78, 95, 88, 90, 87]);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const maxValue = Math.max(...values);

  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className={`text-sm m-0 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>Weekly Performance</h3>
        {selectedDay !== null && (
          <span className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
            {days[selectedDay]}: {values[selectedDay]}%
          </span>
        )}
      </div>
      <div className="flex items-end justify-between gap-2 h-32">
        {days.map((day, index) => {
          const height = (values[index] / maxValue) * 100;
          return (
            <div 
              key={day} 
              className="flex-1 flex flex-col items-center gap-2"
              onMouseEnter={() => setSelectedDay(index)}
              onMouseLeave={() => setSelectedDay(null)}
            >
              <div className="w-full flex-1 flex items-end">
                <div
                  className="w-full rounded-t-md smooth-transition hover:opacity-80 cursor-pointer"
                  style={{
                    height: `${height}%`,
                    background: index === selectedDay || index === 6 
                      ? 'linear-gradient(180deg, #00e5ff 0%, #b366ff 100%)'
                      : 'linear-gradient(180deg, rgba(0, 229, 255, 0.3) 0%, rgba(179, 102, 255, 0.3) 100%)'
                  }}
                />
              </div>
              <span className={`text-xs ${index === selectedDay ? 'text-cyan-400' : isDarkMode ? 'text-white/50' : 'text-black/50'}`}>{day}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Streak Card Component
function StreakCard() {
  const { isDarkMode } = useTheme();
  const [streak, setStreak] = useState(21);
  const [longest, setLongest] = useState(45);
  
  const incrementStreak = () => {
    const newStreak = streak + 1;
    setStreak(newStreak);
    if (newStreak > longest) {
      setLongest(newStreak);
    }
  };

  return (
    <div className="glass-card glass-card-hover p-5 relative overflow-hidden cursor-pointer" onClick={incrementStreak}>
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/20 to-transparent rounded-full blur-3xl"></div>
      <div className="relative">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-lg bg-orange-500/20 neon-glow-orange">
            <Flame className="w-5 h-5 text-orange-400" />
          </div>
          <div>
            <h3 className={`text-xs label-text m-0 ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>Current Streak</h3>
            <p className={`text-2xl metric-value m-0 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>{streak} Days</p>
          </div>
        </div>
        <div className={`flex items-center justify-between text-xs ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
          <span>Longest: {longest} days</span>
          <span className="text-orange-400">Keep going! 🔥</span>
        </div>
      </div>
    </div>
  );
}

// Focus Time Component
function FocusTime() {
  const { isDarkMode } = useTheme();
  const focusSessions = [
    { time: '2h 30m', label: 'Today', color: 'cyan' },
    { time: '18h 45m', label: 'This Week', color: 'purple' },
  ];

  return (
    <div className="glass-card p-5">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-cyan-400" />
        <h3 className={`text-sm m-0 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>Focus Time</h3>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {focusSessions.map((session, index) => (
          <div key={index}>
            <p className={`text-xl metric-value m-0 mb-1 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>{session.time}</p>
            <p className={`text-xs m-0 ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>{session.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Main Dashboard Grid
export function DashboardWidgets() {
  const { isDarkMode } = useTheme();
  const [goalsCompleted, setGoalsCompleted] = useState(12);
  const [tasksCompleted, setTasksCompleted] = useState(8);
  const [monthlyGoalsCompleted, setMonthlyGoalsCompleted] = useState(8);
  
  return (
    <div className="space-y-6">
      {/* Top metrics row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          title="Goals Completed" 
          value={`${goalsCompleted}/15`}
          change={8} 
          icon={Target} 
          accentColor="cyan"
          onClick={() => setGoalsCompleted(prev => prev < 15 ? prev + 1 : prev)}
        />
        <MetricCard 
          title="Tasks Today" 
          value={`${tasksCompleted}/12`}
          change={-5} 
          icon={CheckCircle2} 
          accentColor="purple"
          onClick={() => setTasksCompleted(prev => prev < 12 ? prev + 1 : prev)}
        />
        <MetricCard title="Weekly Score" value="87%" change={12} icon={TrendingUp} accentColor="orange" />
        <MetricCard title="Level Progress" value="Level 42" icon={Award} accentColor="green" />
      </div>

      {/* Second row - Progress and Streak */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ProgressCard 
          title="Monthly Goals" 
          current={monthlyGoalsCompleted} 
          total={12} 
          icon={Target} 
          color="text-cyan-400"
          onIncrement={() => setMonthlyGoalsCompleted(prev => prev < 12 ? prev + 1 : prev)}
        />
        <StreakCard />
      </div>

      {/* Third row - Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <WeeklyOverview />
        <FocusTime />
      </div>

      {/* Bottom row - Activity feed and other widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <ActivityFeed onRemoveActivity={() => {}} />
        </div>
        <div className="glass-card p-5">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="w-5 h-5 text-purple-400" />
            <h3 className={`text-sm m-0 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>Mind Health</h3>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>Stress Level</span>
                <span className={`text-xs metric-value ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>Low</span>
              </div>
              <div className={`w-full h-2 rounded-full overflow-hidden ${isDarkMode ? 'bg-white/10' : 'bg-black/10'}`}>
                <div className="h-full w-1/4 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full" />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>Energy</span>
                <span className={`text-xs metric-value ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>87%</span>
              </div>
              <div className={`w-full h-2 rounded-full overflow-hidden ${isDarkMode ? 'bg-white/10' : 'bg-black/10'}`}>
                <div className="h-full w-[87%] bg-gradient-to-r from-orange-400 to-pink-400 rounded-full" />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>Focus</span>
                <span className={`text-xs metric-value ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>92%</span>
              </div>
              <div className={`w-full h-2 rounded-full overflow-hidden ${isDarkMode ? 'bg-white/10' : 'bg-black/10'}`}>
                <div className="h-full w-[92%] bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}