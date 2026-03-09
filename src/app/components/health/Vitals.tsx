import { Heart, Activity, Droplet, Wind, Thermometer, Gauge, TrendingUp, TrendingDown } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export function Vitals() {
  const { isDarkMode } = useTheme();

  const vitals = [
    { name: 'Heart Rate', value: '72', unit: 'bpm', icon: Heart, color: 'text-red-400', bgColor: 'bg-red-500/20', borderColor: 'border-red-500/30', status: 'Normal', range: '60-100 bpm', trend: 'stable' },
    { name: 'Blood Pressure', value: '118/76', unit: 'mmHg', icon: Activity, color: 'text-orange-400', bgColor: 'bg-orange-500/20', borderColor: 'border-orange-500/30', status: 'Optimal', range: '<120/80 mmHg', trend: 'down' },
    { name: 'Blood Oxygen', value: '98', unit: '%', icon: Wind, color: 'text-cyan-400', bgColor: 'bg-cyan-500/20', borderColor: 'border-cyan-500/30', status: 'Excellent', range: '95-100%', trend: 'stable' },
    { name: 'Temperature', value: '98.2', unit: '°F', icon: Thermometer, color: 'text-blue-400', bgColor: 'bg-blue-500/20', borderColor: 'border-blue-500/30', status: 'Normal', range: '97-99°F', trend: 'stable' },
    { name: 'Resp. Rate', value: '16', unit: 'brpm', icon: Wind, color: 'text-green-400', bgColor: 'bg-green-500/20', borderColor: 'border-green-500/30', status: 'Normal', range: '12-20 brpm', trend: 'up' },
    { name: 'HRV', value: '42', unit: 'ms', icon: Gauge, color: 'text-purple-400', bgColor: 'bg-purple-500/20', borderColor: 'border-purple-500/30', status: 'Good', range: '>30 ms', trend: 'up' },
  ];

  // Heart rate data for 24 hours
  const heartRateData = Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    bpm: 60 + Math.sin(i / 3) * 15 + Math.random() * 10,
  }));

  // Blood pressure history (last 7 days)
  const bpHistory = [
    { day: 'Mon', systolic: 120, diastolic: 78 },
    { day: 'Tue', systolic: 118, diastolic: 76 },
    { day: 'Wed', systolic: 122, diastolic: 80 },
    { day: 'Thu', systolic: 116, diastolic: 74 },
    { day: 'Fri', systolic: 119, diastolic: 77 },
    { day: 'Sat', systolic: 118, diastolic: 76 },
    { day: 'Sun', systolic: 117, diastolic: 75 },
  ];

  // Oxygen saturation throughout the day
  const oxygenData = Array.from({ length: 12 }, (_, i) => ({
    time: `${i * 2}:00`,
    level: 96 + Math.random() * 3,
  }));

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <TrendingUp className="w-3 h-3 text-green-400" />;
    if (trend === 'down') return <TrendingDown className="w-3 h-3 text-cyan-400" />;
    return <div className="w-3 h-3 rounded-full bg-yellow-400" />;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className={`text-2xl md:text-3xl font-bold m-0 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
          Vitals
        </h1>
        <p className={`text-sm mt-1 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
          Monitor your key health metrics
        </p>
      </div>

      {/* Vitals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {vitals.map((vital) => {
          const Icon = vital.icon;
          return (
            <div key={vital.name} className={`glass-card p-5 border ${vital.borderColor}`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <p className={`text-sm font-medium ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
                      {vital.name}
                    </p>
                    {getTrendIcon(vital.trend)}
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className={`text-4xl font-bold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                      {vital.value}
                    </span>
                    <span className={`text-sm ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>{vital.unit}</span>
                  </div>
                </div>
                <div className={`w-14 h-14 rounded-xl ${vital.bgColor} border ${vital.borderColor} flex items-center justify-center`}>
                  <Icon className={`w-7 h-7 ${vital.color}`} />
                </div>
              </div>
              <div className={`pt-4 border-t ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>Status:</span>
                  <span className={`text-xs font-medium ${vital.color}`}>{vital.status}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>Normal Range:</span>
                  <span className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>{vital.range}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Heart Rate Monitoring */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
            Heart Rate Monitor (24h)
          </h2>
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-red-400 animate-pulse" />
            <span className={`text-sm ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>Live</span>
          </div>
        </div>
        
        <div className="h-64 relative">
          <svg className="w-full h-full" viewBox="0 0 1200 250" preserveAspectRatio="none">
            {/* Grid */}
            {[0, 50, 100, 150, 200, 250].map((y) => (
              <line
                key={y}
                x1="0"
                y1={y}
                x2="1200"
                y2={y}
                stroke={isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}
                strokeWidth="1"
              />
            ))}
            
            {/* Safe zone */}
            <rect
              x="0"
              y={250 - (100 * 2.5)}
              width="1200"
              height={(40 * 2.5)}
              fill="rgba(34, 197, 94, 0.1)"
            />
            
            {/* ECG-style line */}
            <path
              d={heartRateData.map((point, i) => {
                const x = (i / (heartRateData.length - 1)) * 1200;
                const y = 250 - (point.bpm * 2.5);
                return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
              }).join(' ')}
              fill="none"
              stroke="url(#heartGradient)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            
            {/* Data points */}
            {heartRateData.map((point, i) => {
              const x = (i / (heartRateData.length - 1)) * 1200;
              const y = 250 - (point.bpm * 2.5);
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r="3"
                  fill="#ef4444"
                  opacity="0.6"
                />
              );
            })}
            
            <defs>
              <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#f97316" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs" style={{ marginLeft: '-35px' }}>
            {[100, 80, 60, 40, 20].map((val) => (
              <span key={val} className={isDarkMode ? 'text-white/40' : 'text-black/40'}>{val}</span>
            ))}
          </div>
        </div>
        
        {/* Time labels */}
        <div className="flex justify-between mt-2">
          {['12am', '4am', '8am', '12pm', '4pm', '8pm', '12am'].map((time, i) => (
            <span key={i} className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
              {time}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}>
            <div className={`text-xs mb-1 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>Average</div>
            <div className={`text-xl font-bold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>72 <span className="text-xs">bpm</span></div>
          </div>
          <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}>
            <div className={`text-xs mb-1 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>Min</div>
            <div className={`text-xl font-bold text-cyan-400`}>58 <span className="text-xs">bpm</span></div>
          </div>
          <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}>
            <div className={`text-xs mb-1 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>Max</div>
            <div className={`text-xl font-bold text-red-400`}>94 <span className="text-xs">bpm</span></div>
          </div>
        </div>
      </div>

      {/* Blood Pressure & Oxygen Saturation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Blood Pressure Trend */}
        <div className="glass-card p-6">
          <h2 className={`text-lg font-semibold mb-6 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
            Blood Pressure (7 Days)
          </h2>
          
          <div className="flex items-end justify-between gap-2 h-48 mb-4">
            {bpHistory.map((day, index) => {
              const maxBP = 140;
              const systolicHeight = (day.systolic / maxBP) * 100;
              const diastolicHeight = (day.diastolic / maxBP) * 100;
              
              return (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex flex-col gap-1 items-center relative group" style={{ height: '160px' }}>
                    {/* Systolic */}
                    <div className="w-full flex items-end" style={{ height: '160px' }}>
                      <div
                        className="w-full bg-orange-500/30 border-t-2 border-orange-400 rounded-t smooth-transition hover:bg-orange-500/40"
                        style={{ height: `${systolicHeight}%` }}
                      >
                        <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 smooth-transition ${
                          isDarkMode ? 'bg-black/80 text-white' : 'bg-white/80 text-black'
                        }`}>
                          {day.systolic}/{day.diastolic}
                        </div>
                      </div>
                    </div>
                  </div>
                  <span className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>{day.day}</span>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-orange-400"></div>
              <span className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>Systolic/Diastolic</span>
            </div>
          </div>

          {/* Current Reading */}
          <div className={`mt-4 p-4 rounded-lg ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}>
            <div className="flex items-center justify-between">
              <span className={`text-sm ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>Latest Reading</span>
              <div className="text-right">
                <div className={`text-2xl font-bold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>118/76</div>
                <div className="text-xs text-green-400">Optimal</div>
              </div>
            </div>
          </div>
        </div>

        {/* Oxygen Saturation */}
        <div className="glass-card p-6">
          <h2 className={`text-lg font-semibold mb-6 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
            Oxygen Saturation (SpO2)
          </h2>
          
          <div className="h-48 relative mb-4">
            <svg className="w-full h-full" viewBox="0 0 600 200" preserveAspectRatio="none">
              {/* Grid lines */}
              {[90, 92, 94, 96, 98, 100].map((percent) => (
                <line
                  key={percent}
                  x1="0"
                  y1={200 - ((percent - 90) * 20)}
                  x2="600"
                  y2={200 - ((percent - 90) * 20)}
                  stroke={isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}
                  strokeWidth="1"
                  strokeDasharray="4"
                />
              ))}
              
              {/* Safe zone (95-100%) */}
              <rect
                x="0"
                y="0"
                width="600"
                height="100"
                fill="rgba(34, 197, 94, 0.1)"
              />
              
              {/* Area fill */}
              <path
                d={`M 0 ${200 - ((oxygenData[0].level - 90) * 20)} ${oxygenData.map((d, i) => 
                  `L ${(i + 1) * 50} ${200 - ((d.level - 90) * 20)}`
                ).join(' ')} L 600 200 L 0 200 Z`}
                fill="url(#oxygenGradient)"
                opacity="0.4"
              />
              
              {/* Line */}
              <path
                d={`M 0 ${200 - ((oxygenData[0].level - 90) * 20)} ${oxygenData.map((d, i) => 
                  `L ${(i + 1) * 50} ${200 - ((d.level - 90) * 20)}`
                ).join(' ')}`}
                fill="none"
                stroke="#06b6d4"
                strokeWidth="2"
                strokeLinecap="round"
              />
              
              {/* Points */}
              {oxygenData.map((d, i) => (
                <circle
                  key={i}
                  cx={(i + 1) * 50}
                  cy={200 - ((d.level - 90) * 20)}
                  r="4"
                  fill="#06b6d4"
                />
              ))}
              
              <defs>
                <linearGradient id="oxygenGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
            </svg>
            
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs" style={{ marginLeft: '-30px' }}>
              {[100, 98, 96, 94, 92, 90].map((val) => (
                <span key={val} className={isDarkMode ? 'text-white/40' : 'text-black/40'}>{val}%</span>
              ))}
            </div>
          </div>
          
          {/* Time labels */}
          <div className="flex justify-between mb-4">
            {oxygenData.filter((_, i) => i % 2 === 0).map((d) => (
              <span key={d.time} className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                {d.time}
              </span>
            ))}
          </div>

          {/* Current Reading */}
          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}>
            <div className="flex items-center justify-between">
              <span className={`text-sm ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>Current SpO2</span>
              <div className="text-right">
                <div className={`text-2xl font-bold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>98%</div>
                <div className="text-xs text-cyan-400">Excellent</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Health Alerts */}
      <div className="glass-card p-6">
        <h2 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
          Recent Alerts & Insights
        </h2>
        <div className="space-y-3">
          <div className={`p-4 rounded-lg border ${isDarkMode ? 'bg-green-500/10 border-green-500/30' : 'bg-green-500/10 border-green-500/30'}`}>
            <div className="flex items-start gap-3">
              <Heart className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className={`text-sm font-semibold text-green-400 mb-1`}>All Vitals Normal</div>
                <div className={`text-xs ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
                  Your vitals are within healthy ranges. Keep up the good work!
                </div>
              </div>
            </div>
          </div>
          
          <div className={`p-4 rounded-lg border ${isDarkMode ? 'bg-cyan-500/10 border-cyan-500/30' : 'bg-cyan-500/10 border-cyan-500/30'}`}>
            <div className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className={`text-sm font-semibold text-cyan-400 mb-1`}>HRV Improving</div>
                <div className={`text-xs ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
                  Your Heart Rate Variability has increased by 15% this week - a sign of good recovery.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
