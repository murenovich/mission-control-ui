import {
  Activity,
  Heart,
  Flame,
  TrendingUp,
  Award,
  Target,
  Clock,
  Moon,
  Apple,
  Brain,
  Droplet,
  Wind,
} from 'lucide-react';
import type { ElementType } from 'react';
import { useTheme } from '../../app/contexts/ThemeContext';

export interface HealthOverviewStat {
  label: string;
  value: string;
  goal?: string;
  unit?: string;
  icon: ElementType;
  color: 'cyan' | 'red' | 'orange' | 'green';
  progress?: number;
  status?: string;
}

export interface HealthScoreCategory {
  name: string;
  score: number;
  color: 'cyan' | 'green' | 'blue' | 'purple';
}

export interface HealthOverviewScore {
  overall: number;
  categories: HealthScoreCategory[];
}

export interface WeeklyActivityPoint {
  day: string;
  steps: number;
  calories: number;
}

export interface VitalSnapshot {
  label: string;
  value: string;
  status: string;
  icon: ElementType;
  color: string;
}

export interface QuickHealthStat {
  label: string;
  value: string;
  change: string;
  icon: ElementType;
  color: 'blue' | 'green' | 'cyan' | 'purple';
}

export interface HealthAchievement {
  id: number;
  title: string;
  description: string;
  icon: ElementType;
  color: string;
}

export interface SummaryMetric {
  label: string;
  value: string;
  progress: number;
  color: 'green' | 'cyan' | 'blue' | 'orange';
}

export interface HealthOverviewScreenProps {
  title?: string;
  description?: string;
  stats?: HealthOverviewStat[];
  healthScore?: HealthOverviewScore;
  weeklyActivity?: WeeklyActivityPoint[];
  vitalsSnapshot?: VitalSnapshot[];
  quickStats?: QuickHealthStat[];
  achievements?: HealthAchievement[];
  todaySummary?: SummaryMetric[];
}

export const DEMO_HEALTH_OVERVIEW_STATS: HealthOverviewStat[] = [
  { label: 'Daily Steps', value: '8,547', goal: '10,000', icon: Activity, color: 'cyan', progress: 85 },
  { label: 'Heart Rate', value: '72', unit: 'bpm', icon: Heart, color: 'red', status: 'Normal' },
  { label: 'Calories Burned', value: '2,145', goal: '2,500', icon: Flame, color: 'orange', progress: 86 },
  { label: 'Active Minutes', value: '45', goal: '60', icon: Clock, color: 'green', progress: 75 },
];

export const DEMO_HEALTH_SCORE: HealthOverviewScore = {
  overall: 82,
  categories: [
    { name: 'Activity', score: 85, color: 'cyan' },
    { name: 'Nutrition', score: 78, color: 'green' },
    { name: 'Sleep', score: 88, color: 'blue' },
    { name: 'Mental', score: 80, color: 'purple' },
  ],
};

export const DEMO_WEEKLY_ACTIVITY: WeeklyActivityPoint[] = [
  { day: 'Mon', steps: 8500, calories: 2100 },
  { day: 'Tue', steps: 9200, calories: 2350 },
  { day: 'Wed', steps: 7800, calories: 1980 },
  { day: 'Thu', steps: 10500, calories: 2650 },
  { day: 'Fri', steps: 8900, calories: 2200 },
  { day: 'Sat', steps: 12000, calories: 2900 },
  { day: 'Sun', steps: 6500, calories: 1800 },
];

export const DEMO_VITALS_SNAPSHOT: VitalSnapshot[] = [
  { label: 'Blood Pressure', value: '118/76', status: 'Optimal', icon: Heart, color: 'text-red-400' },
  { label: 'Blood Oxygen', value: '98%', status: 'Excellent', icon: Wind, color: 'text-cyan-400' },
  { label: 'Resting HR', value: '58 bpm', status: 'Good', icon: Activity, color: 'text-pink-400' },
  { label: 'HRV', value: '42 ms', status: 'Good', icon: TrendingUp, color: 'text-green-400' },
];

export const DEMO_QUICK_HEALTH_STATS: QuickHealthStat[] = [
  { label: 'Sleep Last Night', value: '8.5h', change: '+12%', icon: Moon, color: 'blue' },
  { label: 'Calories Consumed', value: '1,850', change: '-5%', icon: Apple, color: 'green' },
  { label: 'Water Intake', value: '2.8L', change: '+8%', icon: Droplet, color: 'cyan' },
  { label: 'Mood Score', value: '4.3/5', change: '+0.2', icon: Brain, color: 'purple' },
];

export const DEMO_HEALTH_ACHIEVEMENTS: HealthAchievement[] = [
  { id: 1, title: '7-Day Streak', description: 'Met your step goal 7 days in a row', icon: Award, color: 'text-yellow-400' },
  { id: 2, title: 'Early Bird', description: 'Completed morning workout 5 times this week', icon: TrendingUp, color: 'text-green-400' },
  { id: 3, title: 'Hydration Hero', description: 'Drank 8 glasses of water daily', icon: Target, color: 'text-cyan-400' },
];

export const DEMO_TODAY_SUMMARY: SummaryMetric[] = [
  { label: 'Activity Time', value: '45 / 60 min', progress: 75, color: 'green' },
  { label: 'Water Intake', value: '2.8 / 3.0 L', progress: 93, color: 'cyan' },
  { label: 'Sleep Goal', value: '7.5 / 8 hours', progress: 94, color: 'blue' },
  { label: 'Calorie Balance', value: '1,850 / 2,200', progress: 84, color: 'orange' },
];

export function HealthOverviewScreen({
  title = 'Health Overview',
  description = 'Track your daily health and fitness metrics',
  stats = DEMO_HEALTH_OVERVIEW_STATS,
  healthScore = DEMO_HEALTH_SCORE,
  weeklyActivity = DEMO_WEEKLY_ACTIVITY,
  vitalsSnapshot = DEMO_VITALS_SNAPSHOT,
  quickStats = DEMO_QUICK_HEALTH_STATS,
  achievements = DEMO_HEALTH_ACHIEVEMENTS,
  todaySummary = DEMO_TODAY_SUMMARY,
}: HealthOverviewScreenProps) {
  const { isDarkMode } = useTheme();

  const getScoreColor = (score: number) => {
    if (score >= 80) return { text: 'text-green-400', bg: 'bg-green-500' };
    if (score >= 60) return { text: 'text-yellow-400', bg: 'bg-yellow-500' };
    return { text: 'text-orange-400', bg: 'bg-orange-500' };
  };

  const summaryColorClasses = {
    green: 'bg-green-500/50 border-green-400',
    cyan: 'bg-cyan-500/50 border-cyan-400',
    blue: 'bg-blue-500/50 border-blue-400',
    orange: 'bg-orange-500/50 border-orange-400',
  } as const;

  return (
    <div className="space-y-6">
      <div>
        <h1 className={`text-2xl md:text-3xl font-bold m-0 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>{title}</h1>
        <p className={`text-sm mt-1 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>{description}</p>
      </div>

      <div className="glass-card p-6">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="flex flex-col items-center">
            <div className="relative w-48 h-48">
              <svg className="transform -rotate-90 w-48 h-48">
                <circle cx="96" cy="96" r="88" stroke={isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} strokeWidth="12" fill="none" />
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="url(#healthGradient)"
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 88}`}
                  strokeDashoffset={`${2 * Math.PI * 88 * (1 - healthScore.overall / 100)}`}
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="healthGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="50%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <div className={`text-5xl font-bold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>{healthScore.overall}</div>
                <div className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>Health Score</div>
              </div>
            </div>
            <div className={`mt-4 text-sm font-semibold ${getScoreColor(healthScore.overall).text}`}>
              {healthScore.overall >= 80 ? 'Excellent' : healthScore.overall >= 60 ? 'Good' : 'Fair'}
            </div>
          </div>

          <div className="flex-1 w-full">
            <h3 className={`text-sm font-semibold mb-4 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>Category Breakdown</h3>
            <div className="space-y-4">
              {healthScore.categories.map((category) => {
                const scoreColors = getScoreColor(category.score);
                const borderColorClass = {
                  cyan: 'border-cyan-400',
                  green: 'border-green-400',
                  blue: 'border-blue-400',
                  purple: 'border-purple-400',
                }[category.color];

                return (
                  <div key={category.name}>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-sm ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>{category.name}</span>
                      <span className={`text-sm font-semibold ${scoreColors.text}`}>{category.score}/100</span>
                    </div>
                    <div className={`h-3 rounded-full ${isDarkMode ? 'bg-white/10' : 'bg-black/10'} overflow-hidden`}>
                      <div className={`h-full ${scoreColors.bg}/50 border-r-2 ${borderColorClass} rounded-full smooth-transition`} style={{ width: `${category.score}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const colorClasses = {
            cyan: { bg: 'bg-cyan-500/20', text: 'text-cyan-400', border: 'border-cyan-500/30' },
            red: { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30' },
            orange: { bg: 'bg-orange-500/20', text: 'text-orange-400', border: 'border-orange-500/30' },
            green: { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30' },
          }[stat.color];

          return (
            <div key={index} className="glass-card p-5">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-12 h-12 rounded-xl ${colorClasses.bg} border ${colorClasses.border} flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${colorClasses.text}`} />
                </div>
              </div>
              <div className="mb-2">
                <p className={`text-xs mb-1 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>{stat.label}</p>
                <div className="flex items-baseline gap-2">
                  <span className={`text-3xl font-bold metric-value ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>{stat.value}</span>
                  {stat.unit && <span className={`text-sm ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>{stat.unit}</span>}
                </div>
              </div>
              {stat.progress && stat.goal ? (
                <>
                  <div className={`h-2 rounded-full ${isDarkMode ? 'bg-white/10' : 'bg-black/10'} overflow-hidden mb-2`}>
                    <div className={`h-full ${colorClasses.bg} ${colorClasses.border} border-r-2 rounded-full smooth-transition`} style={{ width: `${stat.progress}%` }} />
                  </div>
                  <p className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>Goal: {stat.goal}</p>
                </>
              ) : null}
              {stat.status && <p className={`text-xs ${colorClasses.text}`}>{stat.status}</p>}
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          const colors = {
            blue: { border: 'border-blue-500/30', text: 'text-blue-400' },
            green: { border: 'border-green-500/30', text: 'text-green-400' },
            cyan: { border: 'border-cyan-500/30', text: 'text-cyan-400' },
            purple: { border: 'border-purple-500/30', text: 'text-purple-400' },
          }[stat.color];
          const isPositive = stat.change.includes('+');

          return (
            <div key={index} className={`glass-card p-4 border ${colors.border}`}>
              <div className="flex items-center justify-between mb-2">
                <Icon className={`w-5 h-5 ${colors.text}`} />
                <span className={`text-xs font-semibold ${isPositive ? 'text-green-400' : 'text-orange-400'}`}>{stat.change}</span>
              </div>
              <div className={`text-2xl font-bold mb-1 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>{stat.value}</div>
              <div className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>{stat.label}</div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>Weekly Activity</h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
                <span className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>Steps</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-orange-400"></div>
                <span className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>Calories</span>
              </div>
            </div>
          </div>

          <div className="flex items-end justify-between gap-3 h-64">
            {weeklyActivity.map((day, index) => {
              const maxSteps = Math.max(...weeklyActivity.map((item) => item.steps));
              const maxCalories = Math.max(...weeklyActivity.map((item) => item.calories));
              const stepHeight = (day.steps / maxSteps) * 100;
              const calorieHeight = (day.calories / maxCalories) * 100;

              return (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex gap-1 items-end" style={{ height: '200px' }}>
                    <div className="flex-1 bg-cyan-500/30 border-t-2 border-cyan-400 rounded-t smooth-transition hover:bg-cyan-500/40 cursor-pointer relative group" style={{ height: `${stepHeight}%` }}>
                      <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 smooth-transition ${isDarkMode ? 'bg-black/80 text-white' : 'bg-white/80 text-black'}`}>{day.steps} steps</div>
                    </div>
                    <div className="flex-1 bg-orange-500/30 border-t-2 border-orange-400 rounded-t smooth-transition hover:bg-orange-500/40 cursor-pointer relative group" style={{ height: `${calorieHeight}%` }}>
                      <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 smooth-transition ${isDarkMode ? 'bg-black/80 text-white' : 'bg-white/80 text-black'}`}>{day.calories} cal</div>
                    </div>
                  </div>
                  <span className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>{day.day}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="glass-card p-6">
          <h2 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>Vitals Snapshot</h2>
          <div className="space-y-4">
            {vitalsSnapshot.map((vital, index) => {
              const Icon = vital.icon;
              return (
                <div key={index} className={`p-4 rounded-lg border smooth-transition ${isDarkMode ? 'bg-white/5 border-white/10 hover:border-white/20' : 'bg-black/5 border-black/10 hover:border-black/20'}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon className={`w-5 h-5 ${vital.color}`} />
                      <div>
                        <div className={`text-sm ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>{vital.label}</div>
                        <div className={`text-lg font-bold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>{vital.value}</div>
                      </div>
                    </div>
                    <div className={`text-xs px-3 py-1 rounded-full ${vital.status === 'Optimal' || vital.status === 'Excellent' ? 'bg-green-500/20 text-green-400' : 'bg-cyan-500/20 text-cyan-400'}`}>{vital.status}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <h2 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>Recent Achievements</h2>
          <div className="space-y-3">
            {achievements.map((achievement) => {
              const Icon = achievement.icon;
              return (
                <div key={achievement.id} className={`p-4 rounded-lg smooth-transition ${isDarkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-black/5 hover:bg-black/10'}`}>
                  <div className="flex items-start gap-3">
                    <Icon className={`w-5 h-5 ${achievement.color}`} />
                    <div>
                      <h3 className={`text-sm font-semibold mb-1 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>{achievement.title}</h3>
                      <p className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>{achievement.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="glass-card p-6">
          <h2 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>Today's Summary</h2>
          <div className="space-y-4">
            {todaySummary.map((item) => (
              <div key={item.label} className={`p-4 rounded-lg ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-sm ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>{item.label}</span>
                  <span className={`text-sm font-semibold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>{item.value}</span>
                </div>
                <div className={`h-2 rounded-full ${isDarkMode ? 'bg-white/10' : 'bg-black/10'} overflow-hidden`}>
                  <div className={`h-full border-r-2 rounded-full ${summaryColorClasses[item.color]}`} style={{ width: `${item.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
