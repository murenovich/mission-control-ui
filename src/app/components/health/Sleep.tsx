import { Moon, TrendingUp, Clock, Zap, Sun, CloudMoon, Eye, Battery } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export function Sleep() {
  const { isDarkMode } = useTheme();

  const weekData = [
    { day: 'Mon', hours: 7.5, quality: 85, deep: 2.1, rem: 1.8, light: 3.6, awake: 0.3 },
    { day: 'Tue', hours: 6.8, quality: 72, deep: 1.8, rem: 1.5, light: 3.2, awake: 0.5 },
    { day: 'Wed', hours: 8.2, quality: 92, deep: 2.5, rem: 2.0, light: 3.5, awake: 0.2 },
    { day: 'Thu', hours: 7.0, quality: 78, deep: 2.0, rem: 1.6, light: 3.1, awake: 0.3 },
    { day: 'Fri', hours: 6.5, quality: 68, deep: 1.6, rem: 1.4, light: 3.2, awake: 0.6 },
    { day: 'Sat', hours: 9.0, quality: 95, deep: 2.8, rem: 2.2, light: 3.8, awake: 0.2 },
    { day: 'Sun', hours: 8.5, quality: 88, deep: 2.4, rem: 2.1, light: 3.7, awake: 0.3 },
  ];

  const sleepPhases = [
    { phase: 'Deep Sleep', hours: 2.4, percentage: 32, color: 'bg-indigo-500', description: 'Physical recovery' },
    { phase: 'REM Sleep', hours: 2.1, percentage: 28, color: 'bg-purple-500', description: 'Mental recovery' },
    { phase: 'Light Sleep', hours: 3.7, percentage: 49, color: 'bg-blue-400', description: 'Transition stages' },
    { phase: 'Awake', hours: 0.3, percentage: 4, color: 'bg-orange-400', description: 'Interruptions' },
  ];

  const sleepStats = [
    { label: 'Avg Sleep', value: '7.6', unit: 'hrs', icon: Moon, color: 'text-blue-400', change: '+12%' },
    { label: 'Quality Score', value: '85', unit: '%', icon: Zap, color: 'text-yellow-400', change: '+8%' },
    { label: 'Time to Sleep', value: '12', unit: 'min', icon: Clock, color: 'text-cyan-400', change: '-3 min' },
    { label: 'Wake Count', value: '2', unit: 'times', icon: Eye, color: 'text-orange-400', change: '-1' },
  ];

  const sleepCycle = [
    { time: '10:30 PM', stage: 'Bedtime', icon: CloudMoon },
    { time: '10:42 PM', stage: 'Sleep Onset', icon: Moon },
    { time: '11:00 PM', stage: 'Deep Sleep', icon: Moon },
    { time: '1:30 AM', stage: 'REM Sleep', icon: Eye },
    { time: '3:00 AM', stage: 'Light Sleep', icon: CloudMoon },
    { time: '5:00 AM', stage: 'REM Sleep', icon: Eye },
    { time: '6:00 AM', stage: 'Wake Up', icon: Sun },
  ];

  const maxHours = Math.max(...weekData.map(d => d.hours));

  return (
    <div className="space-y-6">
      <div>
        <h1 className={`text-2xl md:text-3xl font-bold m-0 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
          Sleep Tracking
        </h1>
        <p className={`text-sm mt-1 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
          Monitor your sleep patterns and quality
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {sleepStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="glass-card p-4">
              <div className="flex items-center justify-between mb-3">
                <span className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>{stat.label}</span>
                <Icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <div className="flex items-baseline gap-2 mb-1">
                <span className={`text-3xl font-bold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                  {stat.value}
                </span>
                <span className={`text-sm ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
                  {stat.unit}
                </span>
              </div>
              <div className={`text-xs ${stat.change.includes('+') ? 'text-green-400' : 'text-cyan-400'}`}>
                {stat.change} vs last week
              </div>
            </div>
          );
        })}
      </div>

      {/* Last Night Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sleep Duration */}
        <div className="glass-card p-6 text-center">
          <Moon className={`w-12 h-12 mx-auto mb-4 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
          <h2 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
            Last Night
          </h2>
          <div className={`text-5xl font-bold mb-2 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
            8.5 <span className="text-2xl">hrs</span>
          </div>
          <p className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
            10:30 PM - 6:00 AM
          </p>
          <div className={`mt-4 pt-4 border-t ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
            <div className="flex items-center justify-center gap-2">
              <Battery className="w-4 h-4 text-green-400" />
              <span className={`text-sm ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
                Sleep Goal: <span className="text-green-400 font-semibold">106%</span>
              </span>
            </div>
          </div>
        </div>

        {/* Sleep Quality */}
        <div className="glass-card p-6">
          <h2 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
            Sleep Quality
          </h2>
          <div className="relative w-40 h-40 mx-auto mb-4">
            <svg className="transform -rotate-90 w-40 h-40">
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke={isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}
                strokeWidth="12"
                fill="none"
              />
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="url(#gradient)"
                strokeWidth="12"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 70}`}
                strokeDashoffset={`${2 * Math.PI * 70 * (1 - 0.88)}`}
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <div className={`text-4xl font-bold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>88%</div>
              <div className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>Quality</div>
            </div>
          </div>
          <div className="text-center">
            <span className={`inline-flex items-center gap-1 text-sm px-3 py-1 rounded-full ${
              isDarkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-500/20 text-green-600'
            }`}>
              <Zap className="w-3 h-3" />
              Excellent
            </span>
          </div>
        </div>

        {/* Sleep Phases Breakdown */}
        <div className="glass-card p-6">
          <h2 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
            Sleep Phases
          </h2>
          <div className="space-y-3">
            {sleepPhases.map((phase) => (
              <div key={phase.phase}>
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
                    {phase.phase}
                  </span>
                  <span className={`text-xs font-semibold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                    {phase.hours}h ({phase.percentage}%)
                  </span>
                </div>
                <div className={`h-2 rounded-full ${isDarkMode ? 'bg-white/10' : 'bg-black/10'} overflow-hidden`}>
                  <div
                    className={`h-full ${phase.color} rounded-full smooth-transition`}
                    style={{ width: `${phase.percentage}%` }}
                  />
                </div>
                <p className={`text-xs mt-1 ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
                  {phase.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Weekly Sleep Duration */}
      <div className="glass-card p-6">
        <h2 className={`text-lg font-semibold mb-6 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
          Weekly Sleep Duration
        </h2>
        <div className="flex items-end justify-between gap-3 h-64">
          {weekData.map((day, index) => {
            const height = (day.hours / maxHours) * 100;
            const isGoodSleep = day.hours >= 7;
            return (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex items-end relative group" style={{ height: '200px' }}>
                  {/* Recommended sleep line */}
                  <div 
                    className="absolute left-0 right-0 border-t-2 border-dashed border-green-400/30"
                    style={{ bottom: `${(7 / maxHours) * 100}%` }}
                  />
                  <div
                    className={`w-full rounded-t smooth-transition hover:opacity-80 cursor-pointer ${
                      isGoodSleep
                        ? 'bg-gradient-to-t from-blue-500/50 to-purple-500/50 border-t-2 border-blue-400'
                        : 'bg-gradient-to-t from-orange-500/50 to-red-500/50 border-t-2 border-orange-400'
                    }`}
                    style={{ height: `${height}%` }}
                  >
                    {/* Tooltip */}
                    <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 smooth-transition ${
                      isDarkMode ? 'bg-black/80 text-white' : 'bg-white/80 text-black'
                    }`}>
                      {day.hours}h - {day.quality}%
                    </div>
                  </div>
                </div>
                <span className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>{day.day}</span>
              </div>
            );
          })}
        </div>
        <div className="flex justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-gradient-to-r from-blue-500 to-purple-500"></div>
            <span className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>7+ hours</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-gradient-to-r from-orange-500 to-red-500"></div>
            <span className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>&lt;7 hours</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 border-2 border-dashed border-green-400/50"></div>
            <span className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>Recommended</span>
          </div>
        </div>
      </div>

      {/* Sleep Quality Trend */}
      <div className="glass-card p-6">
        <h2 className={`text-lg font-semibold mb-6 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
          Sleep Quality Trend
        </h2>
        <div className="h-48 relative pl-10">
          <svg className="w-full h-full" viewBox="0 0 700 200" preserveAspectRatio="none">
            {/* Grid lines */}
            {[0, 25, 50, 75, 100].map((percent) => (
              <line
                key={percent}
                x1="0"
                y1={200 - (percent * 2)}
                x2="700"
                y2={200 - (percent * 2)}
                stroke={isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}
                strokeWidth="1"
              />
            ))}
            
            {/* Area fill */}
            <path
              d={`M 0 ${200 - weekData[0].quality * 2} ${weekData.map((d, i) => 
                `L ${(i + 1) * 100} ${200 - d.quality * 2}`
              ).join(' ')} L 700 200 L 0 200 Z`}
              fill="url(#qualityGradient)"
              opacity="0.3"
            />
            
            {/* Line */}
            <path
              d={`M 0 ${200 - weekData[0].quality * 2} ${weekData.map((d, i) => 
                `L ${(i + 1) * 100} ${200 - d.quality * 2}`
              ).join(' ')}`}
              fill="none"
              stroke="url(#qualityLineGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            
            {/* Data points */}
            {weekData.map((d, i) => (
              <circle
                key={i}
                cx={(i + 1) * 100}
                cy={200 - d.quality * 2}
                r="5"
                fill={isDarkMode ? '#1a1a2e' : '#ffffff'}
                stroke="#8b5cf6"
                strokeWidth="2"
              />
            ))}
            
            <defs>
              <linearGradient id="qualityGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
              <linearGradient id="qualityLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 bottom-0 flex w-8 flex-col justify-between text-xs">
            {[100, 75, 50, 25, 0].map((val) => (
              <span key={val} className={`text-right ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}>{val}%</span>
            ))}
          </div>
        </div>
        
        {/* X-axis labels */}
        <div className="flex justify-between mt-2 pl-10">
          {weekData.map((d, i) => (
            <span key={i} className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
              {d.day}
            </span>
          ))}
        </div>
      </div>

      {/* Sleep Cycle Timeline */}
      <div className="glass-card p-6">
        <h2 className={`text-lg font-semibold mb-6 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
          Last Night's Sleep Cycle
        </h2>
        <div className="relative">
          {/* Timeline line */}
          <div className={`absolute left-8 top-0 bottom-0 w-0.5 ${isDarkMode ? 'bg-white/10' : 'bg-black/10'}`} />
          
          {/* Timeline events */}
          <div className="space-y-6">
            {sleepCycle.map((event, index) => {
              const Icon = event.icon;
              const colors = {
                'Bedtime': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
                'Sleep Onset': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
                'Deep Sleep': 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
                'REM Sleep': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
                'Light Sleep': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
                'Wake Up': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
              };
              const colorClass = colors[event.stage as keyof typeof colors] || 'bg-white/10 text-white/60';
              
              return (
                <div key={index} className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-full border-2 flex items-center justify-center ${colorClass} relative z-10`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className={`text-sm font-semibold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                      {event.stage}
                    </div>
                    <div className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                      {event.time}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
