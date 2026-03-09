import { useTheme } from '../../contexts/ThemeContext';
import { AreaChart } from '../../components/charts/AreaChart';
import { BarChart } from '../../components/charts/BarChart';
import { DonutChart } from '../../components/charts/DonutChart';
import { LineChart } from '../../components/charts/LineChart';
import { RadialProgress } from '../../components/charts/RadialProgress';
import { StackedBarChart } from '../../components/charts/StackedBarChart';
import { Heatmap } from '../../components/charts/Heatmap';

export default function ChartsPage() {
  const { isDarkMode } = useTheme();

  // Sample data for charts
  const areaData = [
    { label: 'Jan', value: 400 },
    { label: 'Feb', value: 300 },
    { label: 'Mar', value: 600 },
    { label: 'Apr', value: 800 },
    { label: 'May', value: 500 },
    { label: 'Jun', value: 700 },
  ];

  const barData = [
    { label: 'Mon', value: 65 },
    { label: 'Tue', value: 59 },
    { label: 'Wed', value: 80 },
    { label: 'Thu', value: 81 },
    { label: 'Fri', value: 56 },
    { label: 'Sat', value: 55 },
    { label: 'Sun', value: 40 },
  ];

  const donutData = [
    { label: 'Completed', value: 400, color: '#22c55e' },
    { label: 'In Progress', value: 300, color: '#06b6d4' },
    { label: 'Pending', value: 200, color: '#f97316' },
    { label: 'Cancelled', value: 100, color: '#ef4444' },
  ];

  const lineData = [
    { label: 'Week 1', value: 20 },
    { label: 'Week 2', value: 35 },
    { label: 'Week 3', value: 25 },
    { label: 'Week 4', value: 45 },
    { label: 'Week 5', value: 60 },
    { label: 'Week 6', value: 55 },
  ];

  const stackedData = [
    { 
      label: 'Q1',
      segments: [
        { value: 400, color: '#06b6d4', label: 'Sales' },
        { value: 240, color: '#a855f7', label: 'Expenses' },
        { value: 160, color: '#22c55e', label: 'Profit' }
      ]
    },
    { 
      label: 'Q2',
      segments: [
        { value: 300, color: '#06b6d4', label: 'Sales' },
        { value: 139, color: '#a855f7', label: 'Expenses' },
        { value: 161, color: '#22c55e', label: 'Profit' }
      ]
    },
    { 
      label: 'Q3',
      segments: [
        { value: 200, color: '#06b6d4', label: 'Sales' },
        { value: 180, color: '#a855f7', label: 'Expenses' },
        { value: 20, color: '#22c55e', label: 'Profit' }
      ]
    },
    { 
      label: 'Q4',
      segments: [
        { value: 278, color: '#06b6d4', label: 'Sales' },
        { value: 190, color: '#a855f7', label: 'Expenses' },
        { value: 88, color: '#22c55e', label: 'Profit' }
      ]
    },
  ];

  const heatmapData = [
    [80, 90, 70, 60, 85, 75, 95],
    [70, 85, 75, 80, 90, 65, 88],
    [90, 75, 80, 70, 85, 90, 82],
    [60, 80, 85, 90, 75, 80, 77],
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className={`text-3xl mb-2 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
          Charts & Data Visualization
        </h1>
        <p className={isDarkMode ? 'text-white/60' : 'text-black/60'}>
          Data visualization components powered by Recharts with custom glassmorphic styling
        </p>
      </div>

      {/* Area Chart */}
      <section className="glass-card p-8 rounded-2xl space-y-6">
        <div>
          <h2 className={`text-2xl mb-2 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
            Area Chart
          </h2>
          <p className={`text-sm mb-6 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
            Smooth area chart with gradient fill
          </p>
        </div>

        <div className="h-80">
          <AreaChart data={areaData} />
        </div>

        <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-black/20' : 'bg-gray-100'}`}>
          <code className={`text-sm ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
            {`<AreaChart data={data} />`}
          </code>
        </div>
      </section>

      {/* Bar Chart */}
      <section className="glass-card p-8 rounded-2xl space-y-6">
        <div>
          <h2 className={`text-2xl mb-2 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
            Bar Chart
          </h2>
          <p className={`text-sm mb-6 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
            Vertical bar chart for comparing values
          </p>
        </div>

        <div className="h-80">
          <BarChart data={barData} />
        </div>

        <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-black/20' : 'bg-gray-100'}`}>
          <code className={`text-sm ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
            {`<BarChart data={data} />`}
          </code>
        </div>
      </section>

      {/* Line Chart */}
      <section className="glass-card p-8 rounded-2xl space-y-6">
        <div>
          <h2 className={`text-2xl mb-2 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
            Line Chart
          </h2>
          <p className={`text-sm mb-6 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
            Line chart for showing trends over time
          </p>
        </div>

        <div className="h-80">
          <LineChart data={lineData} />
        </div>

        <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-black/20' : 'bg-gray-100'}`}>
          <code className={`text-sm ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
            {`<LineChart data={data} />`}
          </code>
        </div>
      </section>

      {/* Stacked Bar Chart */}
      <section className="glass-card p-8 rounded-2xl space-y-6">
        <div>
          <h2 className={`text-2xl mb-2 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
            Stacked Bar Chart
          </h2>
          <p className={`text-sm mb-6 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
            Multi-series stacked bar chart
          </p>
        </div>

        <div className="h-80">
          <StackedBarChart data={stackedData} />
        </div>

        <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-black/20' : 'bg-gray-100'}`}>
          <code className={`text-sm ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
            {`<StackedBarChart data={data} />`}
          </code>
        </div>
      </section>

      {/* Donut Chart */}
      <section className="glass-card p-8 rounded-2xl space-y-6">
        <div>
          <h2 className={`text-2xl mb-2 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
            Donut Chart
          </h2>
          <p className={`text-sm mb-6 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
            Pie/donut chart for showing proportions
          </p>
        </div>

        <div className="h-80 flex items-center justify-center">
          <DonutChart data={donutData} />
        </div>

        <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-black/20' : 'bg-gray-100'}`}>
          <code className={`text-sm ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
            {`<DonutChart data={data} />`}
          </code>
        </div>
      </section>

      {/* Radial Progress */}
      <section className="glass-card p-8 rounded-2xl space-y-6">
        <div>
          <h2 className={`text-2xl mb-2 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
            Radial Progress
          </h2>
          <p className={`text-sm mb-6 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
            Circular progress indicators
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center gap-4">
            <RadialProgress value={75} size={150} strokeWidth={12} color="#06b6d4" />
            <p className={isDarkMode ? 'text-white/70' : 'text-black/70'}>Goals Progress</p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <RadialProgress value={60} size={150} strokeWidth={12} color="#a855f7" />
            <p className={isDarkMode ? 'text-white/70' : 'text-black/70'}>Tasks Completed</p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <RadialProgress value={90} size={150} strokeWidth={12} color="#22c55e" />
            <p className={isDarkMode ? 'text-white/70' : 'text-black/70'}>Health Score</p>
          </div>
        </div>

        <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-black/20' : 'bg-gray-100'}`}>
          <code className={`text-sm ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
            {`<RadialProgress value={75} size={150} strokeWidth={12} color="#06b6d4" />`}
          </code>
        </div>
      </section>

      {/* Heatmap */}
      <section className="glass-card p-8 rounded-2xl space-y-6">
        <div>
          <h2 className={`text-2xl mb-2 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
            Heatmap
          </h2>
          <p className={`text-sm mb-6 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
            Activity heatmap for pattern visualization
          </p>
        </div>

        <div className="h-80">
          <Heatmap data={heatmapData} />
        </div>

        <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-black/20' : 'bg-gray-100'}`}>
          <code className={`text-sm ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
            {`<Heatmap data={data} />`}
          </code>
        </div>
      </section>

      {/* Data Tables */}
      <section className="glass-card p-8 rounded-2xl space-y-6">
        <div>
          <h2 className={`text-2xl mb-2 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
            Data Tables
          </h2>
          <p className={`text-sm mb-6 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
            Structured data display with sorting and filtering
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
                <th className={`text-left py-3 px-4 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>Name</th>
                <th className={`text-left py-3 px-4 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>Status</th>
                <th className={`text-left py-3 px-4 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>Progress</th>
                <th className={`text-right py-3 px-4 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr className={`border-b ${isDarkMode ? 'border-white/5' : 'border-black/5'}`}>
                <td className={`py-3 px-4 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>Project Alpha</td>
                <td className="py-3 px-4">
                  <span className="px-3 py-1 rounded-lg text-sm bg-green-500/20 text-green-400">Active</span>
                </td>
                <td className="py-3 px-4">
                  <div className={`w-full h-2 rounded-full ${isDarkMode ? 'bg-white/10' : 'bg-black/10'}`}>
                    <div className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-purple-500" style={{ width: '75%' }}></div>
                  </div>
                </td>
                <td className={`text-right py-3 px-4 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>$12,450</td>
              </tr>
              <tr className={`border-b ${isDarkMode ? 'border-white/5' : 'border-black/5'}`}>
                <td className={`py-3 px-4 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>Project Beta</td>
                <td className="py-3 px-4">
                  <span className="px-3 py-1 rounded-lg text-sm bg-yellow-500/20 text-yellow-400">Pending</span>
                </td>
                <td className="py-3 px-4">
                  <div className={`w-full h-2 rounded-full ${isDarkMode ? 'bg-white/10' : 'bg-black/10'}`}>
                    <div className="h-full rounded-full bg-gradient-to-r from-orange-500 to-red-500" style={{ width: '45%' }}></div>
                  </div>
                </td>
                <td className={`text-right py-3 px-4 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>$8,320</td>
              </tr>
              <tr className={`border-b ${isDarkMode ? 'border-white/5' : 'border-black/5'}`}>
                <td className={`py-3 px-4 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>Project Gamma</td>
                <td className="py-3 px-4">
                  <span className="px-3 py-1 rounded-lg text-sm bg-cyan-500/20 text-cyan-400">In Progress</span>
                </td>
                <td className="py-3 px-4">
                  <div className={`w-full h-2 rounded-full ${isDarkMode ? 'bg-white/10' : 'bg-black/10'}`}>
                    <div className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-500" style={{ width: '90%' }}></div>
                  </div>
                </td>
                <td className={`text-right py-3 px-4 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>$15,670</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Chart Summary */}
      <div className="glass-card p-8 rounded-2xl">
        <h2 className={`text-2xl mb-4 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
          Chart Library
        </h2>
        <p className={`mb-6 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
          All charts are built with Recharts and customized with the application's glassmorphic theme.
          They support dark mode, responsive layouts, and interactive tooltips.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className={`text-lg mb-2 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>Available Charts</h3>
            <ul className={`space-y-2 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
              <li>• Area Chart</li>
              <li>• Bar Chart</li>
              <li>• Line Chart</li>
              <li>• Stacked Bar Chart</li>
              <li>• Donut/Pie Chart</li>
              <li>• Radial Progress</li>
              <li>• Heatmap</li>
            </ul>
          </div>
          <div>
            <h3 className={`text-lg mb-2 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>Features</h3>
            <ul className={`space-y-2 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
              <li>• Responsive design</li>
              <li>• Dark/light mode support</li>
              <li>• Interactive tooltips</li>
              <li>• Gradient colors</li>
              <li>• Smooth animations</li>
              <li>• Customizable styling</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
