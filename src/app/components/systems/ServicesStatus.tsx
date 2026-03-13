import { useState } from 'react';
import { Database, Cloud, Zap, CheckCircle, XCircle, AlertTriangle, RefreshCw, Settings, type LucideIcon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

type ServiceStatusType = 'running' | 'degraded' | 'stopped';
type ServiceFilter = 'all' | ServiceStatusType;

type Service = {
  id: string;
  name: string;
  category: string;
  status: ServiceStatusType;
  uptime: string;
  responseTime: number;
  lastCheck: string;
  icon: LucideIcon;
  color: string;
  history: ServiceStatusType[];
};

const buildHistory = (...segments: Array<{ status: ServiceStatusType; count: number }>) =>
  segments.flatMap(({ status, count }) => Array.from({ length: count }, () => status));

// Mock services data with recent interval history for the segmented uptime bar.
const services: Service[] = [
  {
    id: '1',
    name: 'PostgreSQL Database',
    category: 'Database',
    status: 'running',
    uptime: '99.9%',
    responseTime: 8,
    lastCheck: '30 sec ago',
    icon: Database,
    color: 'from-blue-500 to-blue-600',
    history: buildHistory(
      { status: 'running', count: 28 },
      { status: 'degraded', count: 1 },
      { status: 'running', count: 7 },
    ),
  },
  {
    id: '2',
    name: 'Redis Cache',
    category: 'Cache',
    status: 'running',
    uptime: '100%',
    responseTime: 2,
    lastCheck: '30 sec ago',
    icon: Zap,
    color: 'from-red-500 to-red-600',
    history: buildHistory({ status: 'running', count: 36 }),
  },
  {
    id: '3',
    name: 'REST API',
    category: 'API',
    status: 'running',
    uptime: '98.7%',
    responseTime: 125,
    lastCheck: '30 sec ago',
    icon: Cloud,
    color: 'from-purple-500 to-purple-600',
    history: buildHistory(
      { status: 'running', count: 18 },
      { status: 'degraded', count: 3 },
      { status: 'running', count: 11 },
      { status: 'degraded', count: 4 },
    ),
  },
  {
    id: '4',
    name: 'Authentication Service',
    category: 'Security',
    status: 'running',
    uptime: '99.5%',
    responseTime: 45,
    lastCheck: '30 sec ago',
    icon: CheckCircle,
    color: 'from-green-500 to-green-600',
    history: buildHistory(
      { status: 'running', count: 34 },
      { status: 'degraded', count: 1 },
      { status: 'running', count: 1 },
    ),
  },
  {
    id: '5',
    name: 'File Storage',
    category: 'Storage',
    status: 'running',
    uptime: '99.8%',
    responseTime: 67,
    lastCheck: '30 sec ago',
    icon: Database,
    color: 'from-orange-500 to-orange-600',
    history: buildHistory(
      { status: 'running', count: 24 },
      { status: 'degraded', count: 2 },
      { status: 'running', count: 10 },
    ),
  },
  {
    id: '6',
    name: 'Email Service',
    category: 'Communication',
    status: 'degraded',
    uptime: '95.2%',
    responseTime: 456,
    lastCheck: '30 sec ago',
    icon: Cloud,
    color: 'from-cyan-500 to-cyan-600',
    history: buildHistory(
      { status: 'running', count: 14 },
      { status: 'degraded', count: 8 },
      { status: 'running', count: 6 },
      { status: 'degraded', count: 8 },
    ),
  },
  {
    id: '7',
    name: 'WebSocket Server',
    category: 'Real-time',
    status: 'running',
    uptime: '99.1%',
    responseTime: 15,
    lastCheck: '30 sec ago',
    icon: Zap,
    color: 'from-pink-500 to-pink-600',
    history: buildHistory(
      { status: 'running', count: 30 },
      { status: 'degraded', count: 2 },
      { status: 'running', count: 4 },
    ),
  },
  {
    id: '8',
    name: 'Backup Service',
    category: 'Backup',
    status: 'stopped',
    uptime: '0%',
    responseTime: 0,
    lastCheck: '5 min ago',
    icon: Database,
    color: 'from-gray-500 to-gray-600',
    history: buildHistory(
      { status: 'running', count: 16 },
      { status: 'degraded', count: 6 },
      { status: 'stopped', count: 14 },
    ),
  },
];

export function ServicesStatus() {
  const { isDarkMode } = useTheme();
  const [activeFilter, setActiveFilter] = useState<ServiceFilter>('all');

  const getStatusIcon = (status: ServiceStatusType) => {
    switch (status) {
      case 'running':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'degraded':
        return <AlertTriangle className="w-5 h-5 text-orange-400" />;
      case 'stopped':
        return <XCircle className="w-5 h-5 text-red-400" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: ServiceStatusType) => {
    switch (status) {
      case 'running':
        return 'text-green-400 bg-green-500/20';
      case 'degraded':
        return 'text-orange-400 bg-orange-500/20';
      case 'stopped':
        return 'text-red-400 bg-red-500/20';
      default:
        return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getStatusTextColor = (status: ServiceStatusType) => {
    switch (status) {
      case 'running':
        return 'text-green-400';
      case 'degraded':
        return 'text-orange-400';
      case 'stopped':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getResponseTimeColor = (time: number) => {
    if (time === 0) return 'text-gray-400';
    if (time < 50) return 'text-green-400';
    if (time < 200) return 'text-cyan-400';
    if (time < 500) return 'text-orange-400';
    return 'text-red-400';
  };

  const getHistorySegmentColor = (status: ServiceStatusType) => {
    switch (status) {
      case 'running':
        return 'bg-green-400';
      case 'degraded':
        return 'bg-orange-400';
      case 'stopped':
        return 'bg-red-400';
      default:
        return 'bg-gray-400';
    }
  };

  const runningServices = services.filter((service) => service.status === 'running').length;
  const degradedServices = services.filter((service) => service.status === 'degraded').length;
  const stoppedServices = services.filter((service) => service.status === 'stopped').length;
  const filteredServices = activeFilter === 'all' ? services : services.filter((service) => service.status === activeFilter);

  const toggleFilter = (filter: Exclude<ServiceFilter, 'all'>) => {
    setActiveFilter((currentFilter) => (currentFilter === filter ? 'all' : filter));
  };

  const filterCards: Array<{
    label: string;
    value: number;
    filter: Exclude<ServiceFilter, 'all'>;
    icon: LucideIcon;
    color: string;
    activeText: string;
  }> = [
    {
      label: 'Running',
      value: runningServices,
      filter: 'running',
      icon: CheckCircle,
      color: 'from-green-500 to-green-600',
      activeText: 'text-green-400',
    },
    {
      label: 'Degraded',
      value: degradedServices,
      filter: 'degraded',
      icon: AlertTriangle,
      color: 'from-orange-500 to-orange-600',
      activeText: 'text-orange-400',
    },
    {
      label: 'Stopped',
      value: stoppedServices,
      filter: 'stopped',
      icon: XCircle,
      color: 'from-red-500 to-red-600',
      activeText: 'text-red-400',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-green-500 to-green-600 shadow-lg">
          <Settings className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
            Services Status
          </h1>
          <p className={`text-sm ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
            Monitor all system services and dependencies
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filterCards.map((card) => {
          const Icon = card.icon;
          const isActive = activeFilter === card.filter;

          return (
            <button
              key={card.filter}
              type="button"
              aria-pressed={isActive}
              onClick={() => toggleFilter(card.filter)}
              className={`rounded-xl border p-5 text-left smooth-transition ${
                isDarkMode
                  ? 'bg-white/5 border-white/10 hover:bg-white/10'
                  : 'bg-white/30 border-black/10 hover:bg-white/40'
              } ${isActive ? (isDarkMode ? 'ring-1 ring-white/20 bg-white/10' : 'ring-1 ring-black/10 bg-white/50') : ''}`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br ${card.color}`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                {isActive ? (
                  <span className={`text-[11px] font-medium uppercase tracking-[0.18em] ${card.activeText}`}>
                    Active
                  </span>
                ) : null}
              </div>
              <h3 className={`text-sm font-medium mb-1 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
                {card.label}
              </h3>
              <p className={`text-3xl font-bold ${card.activeText}`}>
                {card.value}
              </p>
            </button>
          );
        })}
      </div>

      {/* Services Grid */}
      <div>
        <div className="flex items-center justify-between gap-3 mb-4">
          <div>
            <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
              {activeFilter === 'all' ? 'All Services' : `${activeFilter.charAt(0).toUpperCase()}${activeFilter.slice(1)} Services`}
            </h2>
            <p className={`text-sm ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
              Showing {filteredServices.length} of {services.length} services
            </p>
          </div>
          {activeFilter !== 'all' ? (
            <button
              type="button"
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-2 rounded-lg text-xs smooth-transition ${
                isDarkMode ? 'bg-white/5 hover:bg-white/10 text-white/70' : 'bg-black/5 hover:bg-black/10 text-black/70'
              }`}
            >
              Clear Filter
            </button>
          ) : null}
        </div>

        {filteredServices.length === 0 ? (
          <div className={`rounded-xl border p-6 text-center ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white/30 border-black/10'}`}>
            <p className={`text-sm font-medium ${isDarkMode ? 'text-white/80' : 'text-black/80'}`}>
              No services match the current filter.
            </p>
            <p className={`text-xs mt-1 ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
              Try switching to another status or clearing the filter.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredServices.map((service) => {
              const Icon = service.icon;

              return (
                <div
                  key={service.id}
                  className={`rounded-xl border p-5 smooth-transition ${
                    isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white/30 border-black/10 hover:bg-white/40'
                  }`}
                >
                  {/* Service Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br ${service.color}`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                          {service.name}
                        </h3>
                        <p className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
                          {service.category}
                        </p>
                      </div>
                    </div>
                    {getStatusIcon(service.status)}
                  </div>

                  {/* Service Metrics */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>Status</span>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(service.status)}`}>
                        {service.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>Uptime</span>
                      <span className={`text-xs ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                        {service.uptime}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>Response Time</span>
                      <span className={`text-xs ${getResponseTimeColor(service.responseTime)}`}>
                        {service.responseTime > 0 ? `${service.responseTime}ms` : 'N/A'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>Last Check</span>
                      <span className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
                        {service.lastCheck}
                      </span>
                    </div>
                  </div>

                  {/* The segmented history mirrors an uptime timeline without needing a full chart library. */}
                  <div className={`mt-4 rounded-xl border p-3 ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'}`}>
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-xs font-medium ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
                        Status Over Time
                      </span>
                      <span className={`text-xs ${getStatusTextColor(service.status)}`}>
                        {service.status === 'running' ? 'Operational' : service.status === 'degraded' ? 'Intermittent' : 'Offline'}
                      </span>
                    </div>
                    <div className="flex items-end gap-1 h-12">
                      {service.history.map((status, index) => (
                        <span
                          key={`${service.id}-${status}-${index}`}
                          className={`flex-1 h-full rounded-[2px] ${getHistorySegmentColor(status)}`}
                          title={`Interval ${index + 1}: ${status}`}
                        />
                      ))}
                    </div>
                    <div className={`flex items-center justify-between text-[11px] mt-3 ${isDarkMode ? 'text-white/45' : 'text-black/45'}`}>
                      <span>36h ago</span>
                      <span>{service.uptime} uptime</span>
                      <span>Now</span>
                    </div>
                  </div>

                  {/* Service Actions */}
                  <div className="flex items-center gap-2 mt-4 pt-4 border-t" style={{ borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}>
                    <button className={`flex-1 py-2 px-3 rounded-lg text-xs smooth-transition ${
                      isDarkMode ? 'bg-white/5 hover:bg-white/10 text-white/70' : 'bg-black/5 hover:bg-black/10 text-black/70'
                    }`}>
                      <RefreshCw className="w-3 h-3 inline mr-1" />
                      Restart
                    </button>
                    <button className={`flex-1 py-2 px-3 rounded-lg text-xs smooth-transition ${
                      isDarkMode ? 'bg-white/5 hover:bg-white/10 text-white/70' : 'bg-black/5 hover:bg-black/10 text-black/70'
                    }`}>
                      <Settings className="w-3 h-3 inline mr-1" />
                      Configure
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Bulk Actions */}
      <div className={`rounded-xl border p-4 ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white/30 border-black/10'}`}>
        <h3 className={`text-sm font-semibold mb-3 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
          Bulk Actions
        </h3>
        <div className="flex items-center gap-2 flex-wrap">
          <button className={`px-4 py-2 rounded-lg text-xs smooth-transition ${
            isDarkMode ? 'bg-green-500/20 hover:bg-green-500/30 text-green-400' : 'bg-green-500/20 hover:bg-green-500/30 text-green-600'
          }`}>
            Start All Stopped Services
          </button>
          <button className={`px-4 py-2 rounded-lg text-xs smooth-transition ${
            isDarkMode ? 'bg-orange-500/20 hover:bg-orange-500/30 text-orange-400' : 'bg-orange-500/20 hover:bg-orange-500/30 text-orange-600'
          }`}>
            Restart Degraded Services
          </button>
          <button className={`px-4 py-2 rounded-lg text-xs smooth-transition ${
            isDarkMode ? 'bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400' : 'bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-600'
          }`}>
            Run Health Check
          </button>
        </div>
      </div>
    </div>
  );
}
