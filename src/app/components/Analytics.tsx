import { TrendingUp, TrendingDown, Calendar, Target, Zap, Brain, Clock, Award, BarChart3, Activity, ArrowUpRight, ArrowDownRight, Flame, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { BarChart } from './charts/BarChart';
import { LineChart } from './charts/LineChart';
import { DonutChart } from './charts/DonutChart';
import { AreaChart } from './charts/AreaChart';
import { RadialProgress } from './charts/RadialProgress';
import { Heatmap } from './charts/Heatmap';
import { StackedBarChart } from './charts/StackedBarChart';

// Time Range Selector
function TimeRangeSelector({ selected, onSelect }: { selected: string; onSelect: (range: string) => void }) {
  const { isDarkMode } = useTheme();
  const ranges = ['7D', '30D', '90D', '1Y', 'All'];

  return (
    <div className={`flex items-center gap-2 p-1 rounded-lg ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}>
      {ranges.map((range) => (
        <button
          key={range}
          onClick={() => onSelect(range)}
          className={`px-3 py-1.5 rounded-md text-xs smooth-transition ${
            selected === range
              ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
              : isDarkMode
              ? 'text-white/60 hover:text-white/90 hover:bg-white/5'
              : 'text-black/60 hover:text-black/90 hover:bg-black/5'
          }`}
        >
          {range}
        </button>
      ))}
    </div>
  );
}

// Analytics Metric Card
interface AnalyticsMetricProps {
  title: string;
  value: string | number;
  change: number;
  icon: React.ElementType;
  color: string;
  trend?: number[];
}

function AnalyticsMetric({ title, value, change, icon: Icon, color, trend }: AnalyticsMetricProps) {
  const { isDarkMode } = useTheme();
  const isPositive = change >= 0;

  return (
    <div className="glass-card glass-card-hover p-5">
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2.5 rounded-lg ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}>
          <Icon className={`w-5 h-5 ${color}`} />
        </div>
        <div className={`flex items-center gap-1 text-sm ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
          {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          <span>{Math.abs(change)}%</span>
        </div>
      </div>
      <h3 className={`text-xs mb-1 m-0 ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>{title}</h3>
      <p className={`text-2xl metric-value m-0 mb-3 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>{value}</p>
      
      {/* Mini trend line */}
      {trend && (
        <div className="flex items-end gap-0.5 h-8">
          {trend.map((val, idx) => (
            <div
              key={idx}
              className="flex-1 rounded-t-sm smooth-transition"
              style={{
                height: `${val}%`,
                background: `linear-gradient(180deg, ${color.replace('text-', '')} 0%, ${color.replace('text-', '')}80 100%)`
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Performance Chart
function PerformanceChart() {
  const { isDarkMode } = useTheme();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedMetric, setSelectedMetric] = useState<'goals' | 'tasks' | 'focus'>('goals');

  const data = {
    goals: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'],
      values: [65, 75, 82, 78, 88, 85, 92, 95],
      color: 'cyan',
    },
    tasks: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'],
      values: [55, 68, 72, 85, 80, 88, 90, 87],
      color: 'purple',
    },
    focus: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'],
      values: [70, 72, 68, 75, 82, 85, 88, 92],
      color: 'orange',
    },
  };

  const currentData = data[selectedMetric];
  const maxValue = Math.max(...currentData.values);

  const gradientColors = {
    cyan: { start: '#00e5ff', end: '#b366ff' },
    purple: { start: '#b366ff', end: '#ff00aa' },
    orange: { start: '#ff8c42', end: '#ffaa00' },
  };

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className={`text-sm m-0 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>Performance Overview</h3>
        <div className={`flex gap-2 p-1 rounded-lg ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}>
          {(['goals', 'tasks', 'focus'] as const).map((metric) => (
            <button
              key={metric}
              onClick={() => setSelectedMetric(metric)}
              className={`px-3 py-1.5 rounded-md text-xs capitalize smooth-transition ${
                selectedMetric === metric
                  ? isDarkMode
                    ? 'bg-white/10 text-white'
                    : 'bg-black/10 text-black'
                  : isDarkMode
                  ? 'text-white/60 hover:text-white'
                  : 'text-black/60 hover:text-black'
              }`}
            >
              {metric}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="h-64 flex items-end justify-between gap-3">
        {currentData.values.map((value, index) => {
          const height = (value / maxValue) * 100;
          const isHovered = hoveredIndex === index;
          const gradient = gradientColors[currentData.color];

          return (
            <div
              key={index}
              className="flex-1 flex flex-col items-center gap-3 group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Value tooltip */}
              <div
                className={`smooth-transition ${
                  isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                }`}
              >
                <div className="glass-card px-2 py-1 rounded">
                  <span className={`text-xs metric-value ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                    {value}%
                  </span>
                </div>
              </div>

              {/* Bar */}
              <div className="w-full flex-1 flex items-end">
                <div
                  className="w-full rounded-t-lg smooth-transition cursor-pointer"
                  style={{
                    height: `${height}%`,
                    background: isHovered
                      ? `linear-gradient(180deg, ${gradient.start} 0%, ${gradient.end} 100%)`
                      : `linear-gradient(180deg, ${gradient.start}60 0%, ${gradient.end}60 100%)`,
                  }}
                />
              </div>

              {/* Label */}
              <span className={`text-xs ${isHovered ? 'text-cyan-400' : isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
                {currentData.labels[index].replace('Week ', 'W')}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Category Breakdown
function CategoryBreakdown() {
  const { isDarkMode } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    { name: 'Work', value: 45, color: 'cyan', hours: '36h' },
    { name: 'Health', value: 25, color: 'green', hours: '20h' },
    { name: 'Learning', value: 20, color: 'purple', hours: '16h' },
    { name: 'Personal', value: 10, color: 'orange', hours: '8h' },
  ];

  const total = categories.reduce((sum, cat) => sum + cat.value, 0);

  return (
    <div className="glass-card p-6">
      <h3 className={`text-sm mb-6 m-0 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>Time Distribution</h3>

      {/* Circular progress visualization */}
      <div className="flex items-center justify-center mb-6">
        <div className="relative w-48 h-48">
          {/* Background circle */}
          <div className={`absolute inset-0 rounded-full ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`} />
          
          {/* Segments */}
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
            {categories.reduce((acc, category, index) => {
              const percentage = (category.value / total) * 100;
              const strokeDasharray = `${percentage * 2.827} 282.7`; // Circumference = 2πr = 282.7
              const offset = acc;
              
              const colors = {
                cyan: '#00e5ff',
                green: '#00ff88',
                purple: '#b366ff',
                orange: '#ff8c42',
              };

              acc += percentage * 2.827;

              return [
                ...acc,
                <circle
                  key={category.name}
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke={colors[category.color as keyof typeof colors]}
                  strokeWidth="10"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={-offset}
                  className="smooth-transition cursor-pointer"
                  opacity={selectedCategory === category.name || selectedCategory === null ? 1 : 0.3}
                  onMouseEnter={() => setSelectedCategory(category.name)}
                  onMouseLeave={() => setSelectedCategory(null)}
                />,
              ];
            }, [] as any)}
          </svg>

          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-3xl metric-value ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>80h</span>
            <span className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>Total Time</span>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="space-y-2">
        {categories.map((category) => {
          const colors = {
            cyan: 'bg-cyan-400',
            green: 'bg-green-400',
            purple: 'bg-purple-400',
            orange: 'bg-orange-400',
          };

          return (
            <div
              key={category.name}
              className={`flex items-center justify-between p-3 rounded-lg smooth-transition cursor-pointer ${
                selectedCategory === category.name
                  ? isDarkMode
                    ? 'bg-white/10'
                    : 'bg-black/10'
                  : isDarkMode
                  ? 'bg-white/5 hover:bg-white/8'
                  : 'bg-black/5 hover:bg-black/8'
              }`}
              onMouseEnter={() => setSelectedCategory(category.name)}
              onMouseLeave={() => setSelectedCategory(null)}
            >
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${colors[category.color as keyof typeof colors]}`} />
                <span className={`text-sm ${isDarkMode ? 'text-white/80' : 'text-black/80'}`}>{category.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>{category.hours}</span>
                <span className={`text-sm metric-value ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>{category.value}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Heatmap
function ActivityHeatmap() {
  const { isDarkMode } = useTheme();
  const [hoveredCell, setHoveredCell] = useState<{ week: number; day: number } | null>(null);

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const weeks = Array.from({ length: 12 }, (_, i) => i);

  // Generate random activity data (0-100)
  const activityData = weeks.map(() =>
    days.map(() => Math.floor(Math.random() * 100))
  );

  const getIntensityColor = (value: number) => {
    if (value < 20) return isDarkMode ? 'bg-white/5' : 'bg-black/5';
    if (value < 40) return 'bg-cyan-400/30';
    if (value < 60) return 'bg-cyan-400/50';
    if (value < 80) return 'bg-cyan-400/70';
    return 'bg-cyan-400';
  };

  return (
    <div className="glass-card p-6">
      <h3 className={`text-sm mb-4 m-0 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>Activity Heatmap</h3>
      
      {/* Heatmap grid */}
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          {/* Day labels */}
          <div className="flex gap-1 mb-2 ml-8">
            {days.map((day, idx) => (
              <div key={day} className="w-5 text-center">
                <span className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
                  {day[0]}
                </span>
              </div>
            ))}
          </div>

          {/* Grid */}
          <div className="space-y-1">
            {activityData.map((week, weekIdx) => (
              <div key={weekIdx} className="flex items-center gap-1">
                <span className={`text-xs w-6 text-right ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
                  W{weekIdx + 1}
                </span>
                {week.map((value, dayIdx) => (
                  <div
                    key={dayIdx}
                    className={`w-5 h-5 rounded-sm ${getIntensityColor(value)} smooth-transition cursor-pointer hover:ring-2 hover:ring-cyan-400`}
                    onMouseEnter={() => setHoveredCell({ week: weekIdx, day: dayIdx })}
                    onMouseLeave={() => setHoveredCell(null)}
                    title={`${days[dayIdx]}: ${value}% active`}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-2 mt-4 ml-8">
            <span className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>Less</span>
            <div className="flex gap-1">
              {[0, 25, 50, 75, 95].map((val) => (
                <div
                  key={val}
                  className={`w-4 h-4 rounded-sm ${getIntensityColor(val)}`}
                />
              ))}
            </div>
            <span className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>More</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Goal Progress List
function GoalProgressList() {
  const { isDarkMode } = useTheme();

  const goals = [
    { id: 1, name: 'Complete 100 workouts', current: 87, target: 100, color: 'orange' },
    { id: 2, name: 'Read 24 books', current: 18, target: 24, color: 'cyan' },
    { id: 3, name: 'Learn Spanish', current: 65, target: 100, color: 'purple' },
    { id: 4, name: 'Save $10,000', current: 7200, target: 10000, color: 'green', prefix: '$' },
  ];

  return (
    <div className="glass-card p-6">
      <h3 className={`text-sm mb-4 m-0 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>Goals Progress</h3>
      
      <div className="space-y-4">
        {goals.map((goal) => {
          const percentage = Math.round((goal.current / goal.target) * 100);
          const colorClasses = {
            orange: { text: 'text-orange-400', bg: 'from-orange-400 to-yellow-400' },
            cyan: { text: 'text-cyan-400', bg: 'from-cyan-400 to-purple-400' },
            purple: { text: 'text-purple-400', bg: 'from-purple-400 to-pink-400' },
            green: { text: 'text-green-400', bg: 'from-green-400 to-cyan-400' },
          };

          const colors = colorClasses[goal.color as keyof typeof colorClasses];

          return (
            <div key={goal.id}>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-sm ${isDarkMode ? 'text-white/80' : 'text-black/80'}`}>{goal.name}</span>
                <span className={`text-xs metric-value ${colors.text}`}>
                  {goal.prefix}{goal.current} / {goal.prefix}{goal.target}
                </span>
              </div>
              <div className={`w-full h-2 rounded-full overflow-hidden ${isDarkMode ? 'bg-white/10' : 'bg-black/10'}`}>
                <div
                  className={`h-full bg-gradient-to-r ${colors.bg} smooth-transition`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Main Analytics Component
export function Analytics() {
  const { isDarkMode } = useTheme();
  const [timeRange, setTimeRange] = useState('30D');

  // Sample data for charts
  const barChartData = [
    { label: 'Mon', value: 85 },
    { label: 'Tue', value: 92 },
    { label: 'Wed', value: 78 },
    { label: 'Thu', value: 95 },
    { label: 'Fri', value: 88 },
    { label: 'Sat', value: 90 },
    { label: 'Sun', value: 87 },
  ];

  const lineChartData = [
    { label: 'Jan', value: 65 },
    { label: 'Feb', value: 75 },
    { label: 'Mar', value: 82 },
    { label: 'Apr', value: 78 },
    { label: 'May', value: 88 },
    { label: 'Jun', value: 92 },
  ];

  const donutChartData = [
    { label: 'Work', value: 45, color: '#00e5ff' },
    { label: 'Health', value: 25, color: '#00ff88' },
    { label: 'Learning', value: 20, color: '#b366ff' },
    { label: 'Personal', value: 10, color: '#ff8c42' },
  ];

  const areaChartData = [
    { label: 'Week 1', value: 70 },
    { label: 'Week 2', value: 75 },
    { label: 'Week 3', value: 68 },
    { label: 'Week 4', value: 82 },
    { label: 'Week 5', value: 88 },
    { label: 'Week 6', value: 95 },
  ];

  const heatmapData = [
    [12, 45, 23, 67, 89, 34, 56],
    [34, 67, 45, 23, 78, 90, 45],
    [56, 89, 67, 45, 34, 67, 78],
    [78, 23, 89, 67, 56, 45, 89],
    [90, 45, 34, 89, 67, 78, 23],
  ];

  const stackedBarData = [
    {
      label: 'Mon',
      segments: [
        { value: 30, color: '#00e5ff', label: 'Focus' },
        { value: 25, color: '#b366ff', label: 'Break' },
        { value: 20, color: '#ff8c42', label: 'Meeting' },
      ]
    },
    {
      label: 'Tue',
      segments: [
        { value: 40, color: '#00e5ff', label: 'Focus' },
        { value: 20, color: '#b366ff', label: 'Break' },
        { value: 25, color: '#ff8c42', label: 'Meeting' },
      ]
    },
    {
      label: 'Wed',
      segments: [
        { value: 35, color: '#00e5ff', label: 'Focus' },
        { value: 30, color: '#b366ff', label: 'Break' },
        { value: 15, color: '#ff8c42', label: 'Meeting' },
      ]
    },
    {
      label: 'Thu',
      segments: [
        { value: 45, color: '#00e5ff', label: 'Focus' },
        { value: 15, color: '#b366ff', label: 'Break' },
        { value: 30, color: '#ff8c42', label: 'Meeting' },
      ]
    },
    {
      label: 'Fri',
      segments: [
        { value: 38, color: '#00e5ff', label: 'Focus' },
        { value: 22, color: '#b366ff', label: 'Break' },
        { value: 28, color: '#ff8c42', label: 'Meeting' },
      ]
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-2xl m-0 mb-1 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>Analytics</h1>
          <p className={`text-sm m-0 ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
            Track your progress and insights
          </p>
        </div>
        <TimeRangeSelector selected={timeRange} onSelect={setTimeRange} />
      </div>

      {/* Top Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <AnalyticsMetric
          title="Total Goals"
          value="142"
          change={12}
          icon={Target}
          color="text-cyan-400"
          trend={[45, 60, 55, 70, 75, 80, 85, 95]}
        />
        <AnalyticsMetric
          title="Completion Rate"
          value="87%"
          change={8}
          icon={CheckCircle2}
          color="text-green-400"
          trend={[50, 55, 65, 70, 75, 82, 85, 87]}
        />
        <AnalyticsMetric
          title="Focus Hours"
          value="156h"
          change={15}
          icon={Clock}
          color="text-purple-400"
          trend={[40, 50, 60, 65, 70, 80, 90, 95]}
        />
        <AnalyticsMetric
          title="Current Streak"
          value="21 days"
          change={-3}
          icon={Flame}
          color="text-orange-400"
          trend={[60, 70, 75, 80, 90, 85, 80, 75]}
        />
      </div>

      {/* Chart Examples Section */}
      <div className="glass-card p-6">
        <h2 className={`text-lg mb-6 m-0 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
          📊 Interactive Chart Components
        </h2>
        
        {/* Bar and Line Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <BarChart 
            data={barChartData} 
            title="📊 Bar Chart - Weekly Activity"
            height={220}
          />
          <LineChart 
            data={lineChartData} 
            title="📈 Line Chart - Monthly Trends"
            height={220}
            color="#b366ff"
            showDots={true}
          />
        </div>

        {/* Area and Donut Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <AreaChart 
            data={areaChartData} 
            title="📉 Area Chart - Progress Over Time"
            height={220}
            gradientFrom="#ff8c42"
            gradientTo="#ffaa00"
          />
          <DonutChart 
            data={donutChartData} 
            title="🍩 Donut Chart - Time Distribution"
            size={180}
          />
        </div>

        {/* Stacked Bar Chart */}
        <div className="mb-4">
          <StackedBarChart 
            data={stackedBarData} 
            title="📊 Stacked Bar Chart - Daily Breakdown"
            height={220}
          />
        </div>

        {/* Heatmap */}
        <div className="mb-4">
          <Heatmap 
            data={heatmapData}
            rowLabels={['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5']}
            columnLabels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
            title="🔥 Heatmap - Activity Intensity"
          />
        </div>

        {/* Radial Progress Examples */}
        <div className="glass-card p-5">
          <h3 className={`text-sm mb-4 m-0 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
            ⭕ Radial Progress Charts
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            <RadialProgress 
              value={87} 
              color="#00e5ff" 
              label="Goals"
            />
            <RadialProgress 
              value={65} 
              color="#b366ff" 
              label="Tasks"
            />
            <RadialProgress 
              value={92} 
              color="#ff8c42" 
              label="Focus"
            />
            <RadialProgress 
              value={45} 
              max={60}
              color="#00ff88" 
              label="Habits"
              showPercentage={false}
            />
          </div>
        </div>
      </div>

      {/* Original Performance Chart */}
      <PerformanceChart />

      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <CategoryBreakdown />
        <GoalProgressList />
      </div>

      {/* Original Heatmap */}
      <ActivityHeatmap />
    </div>
  );
}