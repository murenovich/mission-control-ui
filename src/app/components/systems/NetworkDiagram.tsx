import { Maximize2, Minimize2, RefreshCw, Download, Zap, Database, Cloud, Shield, Globe } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useState } from 'react';

interface NetworkNode {
  id: string;
  name: string;
  type: 'gateway' | 'server' | 'database' | 'service' | 'cloud' | 'security';
  x: number;
  y: number;
  status: 'healthy' | 'warning' | 'critical';
  metrics?: {
    load: number;
    connections: number;
    latency?: number;
  };
}

interface NetworkConnection {
  from: string;
  to: string;
  bandwidth: number;
  status: 'active' | 'degraded' | 'inactive';
}

// Mock network topology
const networkNodes: NetworkNode[] = [
  { id: 'gateway', name: 'Gateway', type: 'gateway', x: 400, y: 50, status: 'healthy', metrics: { load: 45, connections: 128 } },
  { id: 'firewall', name: 'Firewall', type: 'security', x: 400, y: 150, status: 'healthy', metrics: { load: 32, connections: 256 } },
  { id: 'lb1', name: 'Load Balancer', type: 'server', x: 250, y: 250, status: 'healthy', metrics: { load: 58, connections: 89 } },
  { id: 'lb2', name: 'Load Balancer 2', type: 'server', x: 550, y: 250, status: 'healthy', metrics: { load: 62, connections: 94 } },
  { id: 'web1', name: 'Web Server 1', type: 'server', x: 150, y: 350, status: 'healthy', metrics: { load: 41, connections: 234, latency: 12 } },
  { id: 'web2', name: 'Web Server 2', type: 'server', x: 350, y: 350, status: 'warning', metrics: { load: 78, connections: 312, latency: 45 } },
  { id: 'api1', name: 'API Server 1', type: 'server', x: 450, y: 350, status: 'healthy', metrics: { load: 52, connections: 187, latency: 8 } },
  { id: 'api2', name: 'API Server 2', type: 'server', x: 650, y: 350, status: 'healthy', metrics: { load: 48, connections: 156, latency: 11 } },
  { id: 'db1', name: 'PostgreSQL Primary', type: 'database', x: 200, y: 500, status: 'healthy', metrics: { load: 67, connections: 45 } },
  { id: 'db2', name: 'PostgreSQL Replica', type: 'database', x: 400, y: 500, status: 'healthy', metrics: { load: 34, connections: 23 } },
  { id: 'cache', name: 'Redis Cache', type: 'database', x: 600, y: 500, status: 'healthy', metrics: { load: 28, connections: 78 } },
  { id: 'storage', name: 'File Storage', type: 'cloud', x: 300, y: 600, status: 'healthy', metrics: { load: 23, connections: 12 } },
  { id: 'backup', name: 'Backup Service', type: 'cloud', x: 500, y: 600, status: 'warning', metrics: { load: 92, connections: 5 } },
];

const networkConnections: NetworkConnection[] = [
  { from: 'gateway', to: 'firewall', bandwidth: 95, status: 'active' },
  { from: 'firewall', to: 'lb1', bandwidth: 68, status: 'active' },
  { from: 'firewall', to: 'lb2', bandwidth: 72, status: 'active' },
  { from: 'lb1', to: 'web1', bandwidth: 45, status: 'active' },
  { from: 'lb1', to: 'web2', bandwidth: 82, status: 'degraded' },
  { from: 'lb2', to: 'api1', bandwidth: 56, status: 'active' },
  { from: 'lb2', to: 'api2', bandwidth: 51, status: 'active' },
  { from: 'web1', to: 'db1', bandwidth: 34, status: 'active' },
  { from: 'web2', to: 'db1', bandwidth: 67, status: 'active' },
  { from: 'api1', to: 'db1', bandwidth: 45, status: 'active' },
  { from: 'api2', to: 'db1', bandwidth: 38, status: 'active' },
  { from: 'db1', to: 'db2', bandwidth: 23, status: 'active' },
  { from: 'api1', to: 'cache', bandwidth: 89, status: 'active' },
  { from: 'api2', to: 'cache', bandwidth: 76, status: 'active' },
  { from: 'web1', to: 'storage', bandwidth: 12, status: 'active' },
  { from: 'web2', to: 'storage', bandwidth: 18, status: 'active' },
  { from: 'db1', to: 'backup', bandwidth: 45, status: 'degraded' },
];

export function NetworkDiagram() {
  const { isDarkMode } = useTheme();
  const [selectedNode, setSelectedNode] = useState<NetworkNode | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showTraffic, setShowTraffic] = useState(true);

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'gateway':
        return Globe;
      case 'server':
        return Zap;
      case 'database':
        return Database;
      case 'service':
        return Zap;
      case 'cloud':
        return Cloud;
      case 'security':
        return Shield;
      default:
        return Zap;
    }
  };

  const getNodeColor = (type: string) => {
    switch (type) {
      case 'gateway':
        return 'from-cyan-500 to-cyan-600';
      case 'server':
        return 'from-purple-500 to-purple-600';
      case 'database':
        return 'from-blue-500 to-blue-600';
      case 'service':
        return 'from-green-500 to-green-600';
      case 'cloud':
        return 'from-orange-500 to-orange-600';
      case 'security':
        return 'from-red-500 to-red-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return '#10b981';
      case 'warning':
        return '#f59e0b';
      case 'critical':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  const getConnectionColor = (status: string) => {
    switch (status) {
      case 'active':
        return isDarkMode ? '#06b6d4' : '#0891b2';
      case 'degraded':
        return '#f59e0b';
      case 'inactive':
        return isDarkMode ? '#4b5563' : '#9ca3af';
      default:
        return '#6b7280';
    }
  };

  const getNodePosition = (nodeId: string) => {
    const node = networkNodes.find(n => n.id === nodeId);
    return node ? { x: node.x, y: node.y } : { x: 0, y: 0 };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg`}>
            <Globe className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
              Network Topology
            </h1>
            <p className={`text-sm ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
              Visual network infrastructure map
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowTraffic(!showTraffic)}
            className={`px-4 py-2 rounded-lg smooth-transition text-sm ${
              showTraffic
                ? isDarkMode ? 'bg-cyan-500/20 text-cyan-400' : 'bg-cyan-500/20 text-cyan-600'
                : isDarkMode ? 'bg-white/5 text-white/60 hover:bg-white/10' : 'bg-black/5 text-black/60 hover:bg-black/10'
            }`}
          >
            {showTraffic ? 'Hide Traffic' : 'Show Traffic'}
          </button>
          <button className={`p-2 rounded-lg smooth-transition ${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-black/5'}`}>
            <RefreshCw className={`w-5 h-5 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`} />
          </button>
          <button className={`p-2 rounded-lg smooth-transition ${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-black/5'}`}>
            <Download className={`w-5 h-5 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`} />
          </button>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className={`p-2 rounded-lg smooth-transition ${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-black/5'}`}
          >
            {isFullscreen ? (
              <Minimize2 className={`w-5 h-5 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`} />
            ) : (
              <Maximize2 className={`w-5 h-5 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`} />
            )}
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className={`rounded-xl border p-4 ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white/30 border-black/10'}`}>
          <p className={`text-xs mb-1 ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>Total Nodes</p>
          <p className={`text-2xl font-bold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
            {networkNodes.length}
          </p>
        </div>
        <div className={`rounded-xl border p-4 ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white/30 border-black/10'}`}>
          <p className={`text-xs mb-1 ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>Healthy</p>
          <p className={`text-2xl font-bold text-green-400`}>
            {networkNodes.filter(n => n.status === 'healthy').length}
          </p>
        </div>
        <div className={`rounded-xl border p-4 ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white/30 border-black/10'}`}>
          <p className={`text-xs mb-1 ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>Warnings</p>
          <p className={`text-2xl font-bold text-orange-400`}>
            {networkNodes.filter(n => n.status === 'warning').length}
          </p>
        </div>
        <div className={`rounded-xl border p-4 ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white/30 border-black/10'}`}>
          <p className={`text-xs mb-1 ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>Connections</p>
          <p className={`text-2xl font-bold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
            {networkConnections.length}
          </p>
        </div>
      </div>

      {/* Network Diagram */}
      <div className={`rounded-xl border p-6 ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white/30 border-black/10'}`}>
        <div className="relative" style={{ height: isFullscreen ? '80vh' : '650px' }}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 800 650"
            className="rounded-lg"
            style={{ background: isDarkMode ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.3)' }}
          >
            {/* Connections */}
            <g>
              {networkConnections.map((conn, index) => {
                const fromPos = getNodePosition(conn.from);
                const toPos = getNodePosition(conn.to);
                const color = getConnectionColor(conn.status);
                
                return (
                  <g key={index}>
                    {/* Connection line */}
                    <line
                      x1={fromPos.x}
                      y1={fromPos.y}
                      x2={toPos.x}
                      y2={toPos.y}
                      stroke={color}
                      strokeWidth={conn.status === 'degraded' ? 3 : 2}
                      strokeOpacity={conn.status === 'inactive' ? 0.3 : 0.6}
                      strokeDasharray={conn.status === 'degraded' ? '5,5' : 'none'}
                    />
                    
                    {/* Traffic indicator (animated dots) */}
                    {showTraffic && conn.status === 'active' && (
                      <circle r="3" fill={color}>
                        <animateMotion
                          dur={`${3 - (conn.bandwidth / 50)}s`}
                          repeatCount="indefinite"
                          path={`M ${fromPos.x},${fromPos.y} L ${toPos.x},${toPos.y}`}
                        />
                      </circle>
                    )}
                  </g>
                );
              })}
            </g>

            {/* Nodes */}
            <g>
              {networkNodes.map((node) => {
                const Icon = getNodeIcon(node.type);
                const isSelected = selectedNode?.id === node.id;
                
                return (
                  <g
                    key={node.id}
                    transform={`translate(${node.x}, ${node.y})`}
                    onClick={() => setSelectedNode(node)}
                    style={{ cursor: 'pointer' }}
                    className="smooth-transition"
                  >
                    {/* Node glow effect */}
                    {isSelected && (
                      <circle
                        r="30"
                        fill="none"
                        stroke={getStatusColor(node.status)}
                        strokeWidth="2"
                        opacity="0.3"
                      >
                        <animate
                          attributeName="r"
                          from="25"
                          to="35"
                          dur="1.5s"
                          repeatCount="indefinite"
                        />
                        <animate
                          attributeName="opacity"
                          from="0.3"
                          to="0"
                          dur="1.5s"
                          repeatCount="indefinite"
                        />
                      </circle>
                    )}
                    
                    {/* Node circle */}
                    <circle
                      r="20"
                      fill={isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}
                      stroke={getStatusColor(node.status)}
                      strokeWidth={isSelected ? 3 : 2}
                      className="smooth-transition"
                    />
                    
                    {/* Status indicator */}
                    <circle
                      cx="14"
                      cy="-14"
                      r="5"
                      fill={getStatusColor(node.status)}
                    />
                    
                    {/* Node label */}
                    <text
                      y="35"
                      textAnchor="middle"
                      fill={isDarkMode ? '#fff' : '#000'}
                      opacity="0.9"
                      fontSize="11"
                      fontWeight="500"
                    >
                      {node.name}
                    </text>
                    
                    {/* Load indicator */}
                    {node.metrics && (
                      <text
                        y="48"
                        textAnchor="middle"
                        fill={isDarkMode ? '#fff' : '#000'}
                        opacity="0.5"
                        fontSize="9"
                      >
                        {node.metrics.load}% load
                      </text>
                    )}
                  </g>
                );
              })}
            </g>
          </svg>
        </div>
      </div>

      {/* Legend and Node Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Legend */}
        <div className={`rounded-xl border p-5 ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white/30 border-black/10'}`}>
          <h3 className={`text-sm font-semibold mb-4 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
            Legend
          </h3>
          <div className="space-y-3">
            <div>
              <p className={`text-xs font-medium mb-2 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>Node Types</p>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br from-cyan-500 to-cyan-600`}>
                    <Globe className="w-4 h-4 text-white" />
                  </div>
                  <span className={`text-xs ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>Gateway</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br from-purple-500 to-purple-600`}>
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                  <span className={`text-xs ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>Server</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600`}>
                    <Database className="w-4 h-4 text-white" />
                  </div>
                  <span className={`text-xs ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>Database</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br from-red-500 to-red-600`}>
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                  <span className={`text-xs ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>Security</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br from-orange-500 to-orange-600`}>
                    <Cloud className="w-4 h-4 text-white" />
                  </div>
                  <span className={`text-xs ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>Cloud</span>
                </div>
              </div>
            </div>
            <div>
              <p className={`text-xs font-medium mb-2 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>Status</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className={`text-xs ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>Healthy</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-orange-500" />
                  <span className={`text-xs ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>Warning</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <span className={`text-xs ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>Critical</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Node Details */}
        <div className={`rounded-xl border p-5 ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white/30 border-black/10'}`}>
          <h3 className={`text-sm font-semibold mb-4 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
            {selectedNode ? 'Node Details' : 'Select a Node'}
          </h3>
          {selectedNode ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3 pb-3 border-b" style={{ borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br ${getNodeColor(selectedNode.type)}`}>
                  {(() => {
                    const Icon = getNodeIcon(selectedNode.type);
                    return <Icon className="w-5 h-5 text-white" />;
                  })()}
                </div>
                <div>
                  <p className={`text-sm font-medium ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                    {selectedNode.name}
                  </p>
                  <p className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
                    {selectedNode.type}
                  </p>
                </div>
              </div>
              {selectedNode.metrics && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>Load</span>
                    <span className={`text-xs font-medium ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                      {selectedNode.metrics.load}%
                    </span>
                  </div>
                  <div className={`h-2 rounded-full ${isDarkMode ? 'bg-white/10' : 'bg-black/10'}`}>
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-purple-500"
                      style={{ width: `${selectedNode.metrics.load}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>Connections</span>
                    <span className={`text-xs font-medium ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                      {selectedNode.metrics.connections}
                    </span>
                  </div>
                  {selectedNode.metrics.latency !== undefined && (
                    <div className="flex items-center justify-between">
                      <span className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>Latency</span>
                      <span className={`text-xs font-medium ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                        {selectedNode.metrics.latency}ms
                      </span>
                    </div>
                  )}
                </div>
              )}
              <div className="pt-3 border-t" style={{ borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}>
                <div className="flex items-center gap-2">
                  <button className={`flex-1 py-2 px-3 rounded-lg text-xs smooth-transition ${
                    isDarkMode ? 'bg-white/5 hover:bg-white/10 text-white/70' : 'bg-black/5 hover:bg-black/10 text-black/70'
                  }`}>
                    View Logs
                  </button>
                  <button className={`flex-1 py-2 px-3 rounded-lg text-xs smooth-transition ${
                    isDarkMode ? 'bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400' : 'bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-600'
                  }`}>
                    Restart
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <p className={`text-sm ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
              Click on any node in the diagram to view its details
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
