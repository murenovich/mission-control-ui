import { Wifi, WifiOff, Globe, Activity, ArrowUpDown, Clock, Signal } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

// Mock network data
const networkMetrics = {
  status: 'online',
  latency: 12,
  uploadSpeed: 45.2,
  downloadSpeed: 98.7,
  packetLoss: 0.2,
  dns: { primary: '8.8.8.8', secondary: '8.8.4.4', status: 'healthy' },
};

const connections = [
  { id: '1', name: 'Primary Gateway', ip: '192.168.1.1', status: 'connected', latency: 1, uptime: '99.9%' },
  { id: '2', name: 'DNS Server', ip: '8.8.8.8', status: 'connected', latency: 12, uptime: '100%' },
  { id: '3', name: 'API Server', ip: 'api.example.com', status: 'connected', latency: 45, uptime: '98.7%' },
  { id: '4', name: 'Database Server', ip: 'db.example.com', status: 'connected', latency: 8, uptime: '99.5%' },
  { id: '5', name: 'CDN Provider', ip: 'cdn.cloudflare.com', status: 'connected', latency: 23, uptime: '99.9%' },
  { id: '6', name: 'Backup Server', ip: 'backup.example.com', status: 'degraded', latency: 156, uptime: '95.2%' },
];

export function NetworkStatus() {
  const { isDarkMode } = useTheme();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
      case 'online':
        return 'text-green-400 bg-green-500/20';
      case 'degraded':
        return 'text-orange-400 bg-orange-500/20';
      case 'offline':
        return 'text-red-400 bg-red-500/20';
      default:
        return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getLatencyColor = (latency: number) => {
    if (latency < 20) return 'text-green-400';
    if (latency < 50) return 'text-cyan-400';
    if (latency < 100) return 'text-orange-400';
    return 'text-red-400';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg`}>
          <Wifi className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
            Network Status
          </h1>
          <p className={`text-sm ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
            Monitor network connectivity and performance
          </p>
        </div>
      </div>

      {/* Network Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Connection Status */}
        <div className={`rounded-xl border p-5 ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white/30 border-black/10'}`}>
          <div className="flex items-center justify-between mb-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-green-500 to-green-600`}>
              <Globe className="w-5 h-5 text-white" />
            </div>
            <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getStatusColor(networkMetrics.status)}`}>
              {networkMetrics.status}
            </span>
          </div>
          <h3 className={`text-sm font-medium mb-1 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
            Connection
          </h3>
          <p className={`text-2xl font-bold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
            Stable
          </p>
        </div>

        {/* Latency */}
        <div className={`rounded-xl border p-5 ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white/30 border-black/10'}`}>
          <div className="flex items-center justify-between mb-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-cyan-500 to-cyan-600`}>
              <Clock className="w-5 h-5 text-white" />
            </div>
            <Activity className={`w-5 h-5 ${getLatencyColor(networkMetrics.latency)}`} />
          </div>
          <h3 className={`text-sm font-medium mb-1 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
            Latency
          </h3>
          <div className="flex items-baseline gap-2">
            <span className={`text-2xl font-bold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
              {networkMetrics.latency}
            </span>
            <span className={`text-sm ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>ms</span>
          </div>
        </div>

        {/* Download Speed */}
        <div className={`rounded-xl border p-5 ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white/30 border-black/10'}`}>
          <div className="flex items-center justify-between mb-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-purple-500 to-purple-600`}>
              <ArrowUpDown className="w-5 h-5 text-white" />
            </div>
            <Signal className="w-5 h-5 text-purple-400" />
          </div>
          <h3 className={`text-sm font-medium mb-1 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
            Download
          </h3>
          <div className="flex items-baseline gap-2">
            <span className={`text-2xl font-bold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
              {networkMetrics.downloadSpeed}
            </span>
            <span className={`text-sm ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>Mbps</span>
          </div>
        </div>

        {/* Upload Speed */}
        <div className={`rounded-xl border p-5 ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white/30 border-black/10'}`}>
          <div className="flex items-center justify-between mb-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-orange-500 to-orange-600`}>
              <ArrowUpDown className="w-5 h-5 text-white rotate-180" />
            </div>
            <Signal className="w-5 h-5 text-orange-400" />
          </div>
          <h3 className={`text-sm font-medium mb-1 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
            Upload
          </h3>
          <div className="flex items-baseline gap-2">
            <span className={`text-2xl font-bold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
              {networkMetrics.uploadSpeed}
            </span>
            <span className={`text-sm ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>Mbps</span>
          </div>
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* DNS Status */}
        <div className={`rounded-xl border p-5 ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white/30 border-black/10'}`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
              DNS Configuration
            </h3>
            <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getStatusColor(networkMetrics.dns.status)}`}>
              {networkMetrics.dns.status}
            </span>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>Primary DNS</span>
              <span className={`text-sm font-mono ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                {networkMetrics.dns.primary}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>Secondary DNS</span>
              <span className={`text-sm font-mono ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                {networkMetrics.dns.secondary}
              </span>
            </div>
          </div>
        </div>

        {/* Packet Loss */}
        <div className={`rounded-xl border p-5 ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white/30 border-black/10'}`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
              Packet Loss
            </h3>
            <Activity className="w-5 h-5 text-green-400" />
          </div>
          <div className="flex items-baseline gap-2 mb-3">
            <span className={`text-3xl font-bold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
              {networkMetrics.packetLoss}%
            </span>
            <span className={`text-sm ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>loss rate</span>
          </div>
          <div className={`h-2 rounded-full ${isDarkMode ? 'bg-white/10' : 'bg-black/10'}`}>
            <div
              className="h-full rounded-full bg-gradient-to-r from-green-500 to-green-600"
              style={{ width: `${100 - networkMetrics.packetLoss}%` }}
            />
          </div>
        </div>
      </div>

      {/* Active Connections */}
      <div>
        <h2 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
          Active Connections
        </h2>
        <div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white/30 border-black/10'}`}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={`${isDarkMode ? 'bg-white/5 border-b border-white/10' : 'bg-black/5 border-b border-black/10'}`}>
                <tr>
                  <th className={`px-4 py-3 text-left text-xs font-semibold ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                    Service
                  </th>
                  <th className={`px-4 py-3 text-left text-xs font-semibold ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                    Address
                  </th>
                  <th className={`px-4 py-3 text-left text-xs font-semibold ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                    Status
                  </th>
                  <th className={`px-4 py-3 text-left text-xs font-semibold ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                    Latency
                  </th>
                  <th className={`px-4 py-3 text-left text-xs font-semibold ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                    Uptime
                  </th>
                </tr>
              </thead>
              <tbody>
                {connections.map((conn) => (
                  <tr
                    key={conn.id}
                    className={`border-b smooth-transition ${
                      isDarkMode
                        ? 'border-white/5 hover:bg-white/5'
                        : 'border-black/5 hover:bg-black/5'
                    }`}
                  >
                    <td className={`px-4 py-3 text-sm font-medium ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                      {conn.name}
                    </td>
                    <td className={`px-4 py-3 text-sm font-mono ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
                      {conn.ip}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getStatusColor(conn.status)}`}>
                        {conn.status}
                      </span>
                    </td>
                    <td className={`px-4 py-3 text-sm ${getLatencyColor(conn.latency)}`}>
                      {conn.latency}ms
                    </td>
                    <td className={`px-4 py-3 text-sm ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
                      {conn.uptime}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Network Tools */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <button className={`p-4 rounded-xl border text-center smooth-transition ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white/30 border-black/10 hover:bg-white/40'}`}>
          <div className="text-2xl mb-2">🔍</div>
          <span className={`text-xs ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>Ping Test</span>
        </button>
        <button className={`p-4 rounded-xl border text-center smooth-transition ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white/30 border-black/10 hover:bg-white/40'}`}>
          <div className="text-2xl mb-2">📡</div>
          <span className={`text-xs ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>Trace Route</span>
        </button>
        <button className={`p-4 rounded-xl border text-center smooth-transition ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white/30 border-black/10 hover:bg-white/40'}`}>
          <div className="text-2xl mb-2">⚡</div>
          <span className={`text-xs ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>Speed Test</span>
        </button>
        <button className={`p-4 rounded-xl border text-center smooth-transition ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white/30 border-black/10 hover:bg-white/40'}`}>
          <div className="text-2xl mb-2">🔄</div>
          <span className={`text-xs ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>Flush DNS</span>
        </button>
      </div>
    </div>
  );
}
