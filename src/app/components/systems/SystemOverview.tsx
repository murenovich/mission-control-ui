import { Cpu, HardDrive, MemoryStick, Zap, TrendingUp, AlertTriangle, CheckCircle, Server } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

// Mock system metrics
const systemMetrics = {
  cpu: { usage: 45, cores: 8, temperature: 62, status: 'healthy' },
  memory: { used: 12.4, total: 32, percentage: 38.75, status: 'healthy' },
  disk: { used: 456, total: 1000, percentage: 45.6, status: 'healthy' },
  uptime: '14d 7h 23m',
  processes: 247,
};

const recentAlerts = [
  { id: '1', type: 'warning', message: 'High CPU usage detected on Core 3', time: '2 min ago', severity: 'medium' },
  { id: '2', type: 'info', message: 'System backup completed successfully', time: '15 min ago', severity: 'low' },
  { id: '3', type: 'error', message: 'Database connection timeout', time: '1 hour ago', severity: 'high' },
];

export function SystemOverview() {
  const { isDarkMode } = useTheme();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'from-green-500 to-green-600';
      case 'warning':
        return 'from-orange-500 to-orange-600';
      case 'critical':
        return 'from-red-500 to-red-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'text-red-400 bg-red-500/20';
      case 'medium':
        return 'text-orange-400 bg-orange-500/20';
      case 'low':
        return 'text-cyan-400 bg-cyan-500/20';
      default:
        return 'text-gray-400 bg-gray-500/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-cyan-500 to-cyan-600 shadow-lg`}>
          <Server className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
            System Overview
          </h1>
          <p className={`text-sm ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
            Real-time system health monitoring
          </p>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* CPU */}
        <div className={`rounded-xl border p-5 ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white/30 border-black/10'}`}>
          <div className="flex items-center justify-between mb-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br ${getStatusColor(systemMetrics.cpu.status)}`}>
              <Cpu className="w-5 h-5 text-white" />
            </div>
            <CheckCircle className="w-5 h-5 text-green-400" />
          </div>
          <h3 className={`text-sm font-medium mb-1 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
            CPU Usage
          </h3>
          <div className="flex items-baseline gap-2 mb-2">
            <span className={`text-3xl font-bold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
              {systemMetrics.cpu.usage}%
            </span>
            <span className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
              {systemMetrics.cpu.cores} cores
            </span>
          </div>
          <div className={`h-2 rounded-full ${isDarkMode ? 'bg-white/10' : 'bg-black/10'} mb-2`}>
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-cyan-600"
              style={{ width: `${systemMetrics.cpu.usage}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className={isDarkMode ? 'text-white/50' : 'text-black/50'}>
              Temp: {systemMetrics.cpu.temperature}°C
            </span>
            <TrendingUp className="w-3 h-3 text-green-400" />
          </div>
        </div>

        {/* Memory */}
        <div className={`rounded-xl border p-5 ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white/30 border-black/10'}`}>
          <div className="flex items-center justify-between mb-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br ${getStatusColor(systemMetrics.memory.status)}`}>
              <MemoryStick className="w-5 h-5 text-white" />
            </div>
            <CheckCircle className="w-5 h-5 text-green-400" />
          </div>
          <h3 className={`text-sm font-medium mb-1 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
            Memory
          </h3>
          <div className="flex items-baseline gap-2 mb-2">
            <span className={`text-3xl font-bold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
              {systemMetrics.memory.percentage.toFixed(1)}%
            </span>
            <span className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
              {systemMetrics.memory.used}GB / {systemMetrics.memory.total}GB
            </span>
          </div>
          <div className={`h-2 rounded-full ${isDarkMode ? 'bg-white/10' : 'bg-black/10'} mb-2`}>
            <div
              className="h-full rounded-full bg-gradient-to-r from-purple-500 to-purple-600"
              style={{ width: `${systemMetrics.memory.percentage}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className={isDarkMode ? 'text-white/50' : 'text-black/50'}>
              Available: {systemMetrics.memory.total - systemMetrics.memory.used}GB
            </span>
          </div>
        </div>

        {/* Disk */}
        <div className={`rounded-xl border p-5 ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white/30 border-black/10'}`}>
          <div className="flex items-center justify-between mb-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br ${getStatusColor(systemMetrics.disk.status)}`}>
              <HardDrive className="w-5 h-5 text-white" />
            </div>
            <CheckCircle className="w-5 h-5 text-green-400" />
          </div>
          <h3 className={`text-sm font-medium mb-1 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
            Disk Space
          </h3>
          <div className="flex items-baseline gap-2 mb-2">
            <span className={`text-3xl font-bold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
              {systemMetrics.disk.percentage.toFixed(1)}%
            </span>
            <span className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
              {systemMetrics.disk.used}GB / {systemMetrics.disk.total}GB
            </span>
          </div>
          <div className={`h-2 rounded-full ${isDarkMode ? 'bg-white/10' : 'bg-black/10'} mb-2`}>
            <div
              className="h-full rounded-full bg-gradient-to-r from-orange-500 to-orange-600"
              style={{ width: `${systemMetrics.disk.percentage}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className={isDarkMode ? 'text-white/50' : 'text-black/50'}>
              Free: {systemMetrics.disk.total - systemMetrics.disk.used}GB
            </span>
          </div>
        </div>

        {/* Uptime */}
        <div className={`rounded-xl border p-5 ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white/30 border-black/10'}`}>
          <div className="flex items-center justify-between mb-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-green-500 to-green-600`}>
              <Zap className="w-5 h-5 text-white" />
            </div>
            <CheckCircle className="w-5 h-5 text-green-400" />
          </div>
          <h3 className={`text-sm font-medium mb-1 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
            System Uptime
          </h3>
          <div className="mb-2">
            <span className={`text-2xl font-bold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
              {systemMetrics.uptime}
            </span>
          </div>
          <div className="pt-2 border-t" style={{ borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}>
            <div className="flex items-center justify-between text-xs">
              <span className={isDarkMode ? 'text-white/50' : 'text-black/50'}>
                Processes
              </span>
              <span className={isDarkMode ? 'text-white/90' : 'text-black/90'}>
                {systemMetrics.processes}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Alerts */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
            Recent Alerts
          </h2>
          <button className={`text-sm ${isDarkMode ? 'text-cyan-400 hover:text-cyan-300' : 'text-cyan-600 hover:text-cyan-700'}`}>
            View All
          </button>
        </div>
        <div className="space-y-3">
          {recentAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 rounded-xl border flex items-start gap-3 ${
                isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white/30 border-black/10'
              }`}
            >
              <div className="mt-0.5">
                {alert.type === 'error' && <AlertTriangle className="w-5 h-5 text-red-400" />}
                {alert.type === 'warning' && <AlertTriangle className="w-5 h-5 text-orange-400" />}
                {alert.type === 'info' && <CheckCircle className="w-5 h-5 text-cyan-400" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-sm font-medium ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                    {alert.message}
                  </span>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs ${getSeverityColor(alert.severity)}`}>
                    {alert.severity}
                  </span>
                </div>
                <span className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
                  {alert.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <button className={`p-4 rounded-xl border text-center smooth-transition ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white/30 border-black/10 hover:bg-white/40'}`}>
          <div className="text-2xl mb-2">🔄</div>
          <span className={`text-xs ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>Restart Services</span>
        </button>
        <button className={`p-4 rounded-xl border text-center smooth-transition ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white/30 border-black/10 hover:bg-white/40'}`}>
          <div className="text-2xl mb-2">🧹</div>
          <span className={`text-xs ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>Clear Cache</span>
        </button>
        <button className={`p-4 rounded-xl border text-center smooth-transition ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white/30 border-black/10 hover:bg-white/40'}`}>
          <div className="text-2xl mb-2">💾</div>
          <span className={`text-xs ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>Backup Now</span>
        </button>
        <button className={`p-4 rounded-xl border text-center smooth-transition ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white/30 border-black/10 hover:bg-white/40'}`}>
          <div className="text-2xl mb-2">📊</div>
          <span className={`text-xs ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>View Logs</span>
        </button>
      </div>
    </div>
  );
}
