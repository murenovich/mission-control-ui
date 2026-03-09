import { AlertTriangle, Info, XCircle, CheckCircle, Search, Filter, Download, Trash2 } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useState } from 'react';

// Mock alerts and logs
const alerts = [
  {
    id: '1',
    type: 'error',
    severity: 'high',
    title: 'Database Connection Timeout',
    message: 'PostgreSQL connection pool exhausted. Unable to establish new connections.',
    timestamp: '2026-03-09 14:23:45',
    source: 'Database Service',
    resolved: false,
  },
  {
    id: '2',
    type: 'warning',
    severity: 'medium',
    title: 'High CPU Usage',
    message: 'CPU usage exceeded 80% threshold on Core 3 for 5 minutes.',
    timestamp: '2026-03-09 14:15:32',
    source: 'System Monitor',
    resolved: true,
  },
  {
    id: '3',
    type: 'warning',
    severity: 'medium',
    title: 'Disk Space Low',
    message: 'Available disk space below 20% on /var/log partition.',
    timestamp: '2026-03-09 13:45:12',
    source: 'Storage Monitor',
    resolved: false,
  },
  {
    id: '4',
    type: 'info',
    severity: 'low',
    title: 'Backup Completed',
    message: 'Scheduled backup completed successfully. 2.3GB backed up to remote storage.',
    timestamp: '2026-03-09 13:00:00',
    source: 'Backup Service',
    resolved: true,
  },
  {
    id: '5',
    type: 'error',
    severity: 'high',
    title: 'SSL Certificate Expiring',
    message: 'SSL certificate for api.example.com expires in 7 days.',
    timestamp: '2026-03-09 12:30:15',
    source: 'Security Monitor',
    resolved: false,
  },
  {
    id: '6',
    type: 'warning',
    severity: 'medium',
    title: 'Email Service Degraded',
    message: 'Email delivery experiencing delays. Average response time: 456ms.',
    timestamp: '2026-03-09 11:45:33',
    source: 'Email Service',
    resolved: false,
  },
];

export function AlertsLogs() {
  const { isDarkMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState('all');

  const filteredAlerts = alerts.filter(alert => {
    if (selectedSeverity === 'all') return true;
    return alert.severity === selectedSeverity;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'error':
        return <XCircle className="w-5 h-5 text-red-400" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-orange-400" />;
      case 'info':
        return <Info className="w-5 h-5 text-cyan-400" />;
      default:
        return <Info className="w-5 h-5 text-gray-400" />;
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

  const unresolvedCount = alerts.filter(a => !a.resolved).length;
  const highSeverityCount = alerts.filter(a => a.severity === 'high' && !a.resolved).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-red-500 to-red-600 shadow-lg`}>
          <AlertTriangle className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
            Alerts & Logs
          </h1>
          <p className={`text-sm ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
            Monitor system alerts and review activity logs
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className={`rounded-xl border p-4 ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white/30 border-black/10'}`}>
          <p className={`text-xs mb-1 ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>Total Alerts</p>
          <p className={`text-2xl font-bold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
            {alerts.length}
          </p>
        </div>
        <div className={`rounded-xl border p-4 ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white/30 border-black/10'}`}>
          <p className={`text-xs mb-1 ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>Unresolved</p>
          <p className={`text-2xl font-bold text-orange-400`}>
            {unresolvedCount}
          </p>
        </div>
        <div className={`rounded-xl border p-4 ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white/30 border-black/10'}`}>
          <p className={`text-xs mb-1 ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>High Severity</p>
          <p className={`text-2xl font-bold text-red-400`}>
            {highSeverityCount}
          </p>
        </div>
        <div className={`rounded-xl border p-4 ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white/30 border-black/10'}`}>
          <p className={`text-xs mb-1 ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>Last 24h</p>
          <p className={`text-2xl font-bold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
            {alerts.length}
          </p>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDarkMode ? 'text-white/40' : 'text-black/40'}`} />
          <input
            type="text"
            placeholder="Search alerts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 rounded-lg border smooth-transition text-sm ${
              isDarkMode
                ? 'bg-white/5 border-white/10 text-white/90 placeholder-white/40 focus:border-purple-400/50'
                : 'bg-white/30 border-black/10 text-black/90 placeholder-black/40 focus:border-purple-400/50'
            }`}
          />
        </div>

        {/* Severity Filter */}
        <div className={`flex items-center gap-1 p-1 rounded-lg ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}>
          <button
            onClick={() => setSelectedSeverity('all')}
            className={`px-3 py-1.5 rounded text-xs smooth-transition ${
              selectedSeverity === 'all'
                ? isDarkMode ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-500/20 text-purple-600'
                : isDarkMode ? 'text-white/60 hover:text-white/90' : 'text-black/60 hover:text-black/90'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setSelectedSeverity('high')}
            className={`px-3 py-1.5 rounded text-xs smooth-transition ${
              selectedSeverity === 'high'
                ? isDarkMode ? 'bg-red-500/20 text-red-400' : 'bg-red-500/20 text-red-600'
                : isDarkMode ? 'text-white/60 hover:text-white/90' : 'text-black/60 hover:text-black/90'
            }`}
          >
            High
          </button>
          <button
            onClick={() => setSelectedSeverity('medium')}
            className={`px-3 py-1.5 rounded text-xs smooth-transition ${
              selectedSeverity === 'medium'
                ? isDarkMode ? 'bg-orange-500/20 text-orange-400' : 'bg-orange-500/20 text-orange-600'
                : isDarkMode ? 'text-white/60 hover:text-white/90' : 'text-black/60 hover:text-black/90'
            }`}
          >
            Medium
          </button>
          <button
            onClick={() => setSelectedSeverity('low')}
            className={`px-3 py-1.5 rounded text-xs smooth-transition ${
              selectedSeverity === 'low'
                ? isDarkMode ? 'bg-cyan-500/20 text-cyan-400' : 'bg-cyan-500/20 text-cyan-600'
                : isDarkMode ? 'text-white/60 hover:text-white/90' : 'text-black/60 hover:text-black/90'
            }`}
          >
            Low
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button className={`p-2 rounded-lg smooth-transition ${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-black/5'}`}>
            <Download className={`w-5 h-5 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`} />
          </button>
          <button className={`p-2 rounded-lg smooth-transition ${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-black/5'}`}>
            <Filter className={`w-5 h-5 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`} />
          </button>
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-3">
        {filteredAlerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-4 rounded-xl border smooth-transition ${
              isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white/30 border-black/10 hover:bg-white/40'
            }`}
          >
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className="mt-1">
                {getTypeIcon(alert.type)}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                        {alert.title}
                      </h3>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getSeverityColor(alert.severity)}`}>
                        {alert.severity}
                      </span>
                      {alert.resolved && (
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium text-green-400 bg-green-500/20`}>
                          <CheckCircle className="w-3 h-3 mr-1" />
                          resolved
                        </span>
                      )}
                    </div>
                    <p className={`text-sm ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
                      {alert.message}
                    </p>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <span className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
                      {alert.source}
                    </span>
                    <span className={`text-xs ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}>
                      {alert.timestamp}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {!alert.resolved && (
                      <button className={`px-3 py-1 rounded text-xs smooth-transition ${
                        isDarkMode ? 'bg-green-500/20 hover:bg-green-500/30 text-green-400' : 'bg-green-500/20 hover:bg-green-500/30 text-green-600'
                      }`}>
                        Resolve
                      </button>
                    )}
                    <button className={`p-1 rounded smooth-transition ${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-black/5'}`}>
                      <Trash2 className={`w-4 h-4 ${isDarkMode ? 'text-white/40' : 'text-black/40'}`} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
