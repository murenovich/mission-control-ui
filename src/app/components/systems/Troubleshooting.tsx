import { Wrench, Search, Book, ExternalLink, ChevronRight, CheckCircle, AlertTriangle } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useState } from 'react';

// Mock troubleshooting guides
const guides = [
  {
    id: '1',
    category: 'Database',
    title: 'Database Connection Issues',
    description: 'Fix connection timeouts and pool exhaustion',
    solutions: 5,
    severity: 'high',
  },
  {
    id: '2',
    category: 'Performance',
    title: 'High CPU Usage',
    description: 'Identify and resolve CPU bottlenecks',
    solutions: 7,
    severity: 'medium',
  },
  {
    id: '3',
    category: 'Network',
    title: 'Slow Network Response',
    description: 'Diagnose network latency and packet loss',
    solutions: 4,
    severity: 'medium',
  },
  {
    id: '4',
    category: 'Storage',
    title: 'Disk Space Issues',
    description: 'Clean up disk space and optimize storage',
    solutions: 6,
    severity: 'high',
  },
  {
    id: '5',
    category: 'Security',
    title: 'SSL Certificate Errors',
    description: 'Renew and configure SSL certificates',
    solutions: 3,
    severity: 'high',
  },
  {
    id: '6',
    category: 'Email',
    title: 'Email Delivery Failures',
    description: 'Troubleshoot SMTP and email service issues',
    solutions: 5,
    severity: 'medium',
  },
];

const commonIssues = [
  {
    id: '1',
    issue: 'Service won\'t start',
    quickFix: 'Check service logs and restart',
    icon: '🔄',
  },
  {
    id: '2',
    issue: 'Out of memory',
    quickFix: 'Increase memory allocation or restart services',
    icon: '💾',
  },
  {
    id: '3',
    issue: 'Port already in use',
    quickFix: 'Find and kill process using the port',
    icon: '🔌',
  },
  {
    id: '4',
    issue: 'Permission denied',
    quickFix: 'Check file permissions and ownership',
    icon: '🔐',
  },
];

const diagnosticTools = [
  { name: 'System Health Check', description: 'Run comprehensive system diagnostics', icon: '🏥' },
  { name: 'Network Diagnostics', description: 'Test connectivity and latency', icon: '🌐' },
  { name: 'Service Monitor', description: 'Check all service statuses', icon: '⚙️' },
  { name: 'Log Analyzer', description: 'Scan logs for errors', icon: '📊' },
];

export function Troubleshooting() {
  const { isDarkMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGuide, setSelectedGuide] = useState<string | null>(null);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'text-red-400 bg-red-500/20';
      case 'medium':
        return 'text-orange-400 bg-orange-500/20';
      case 'low':
        return 'text-green-400 bg-green-500/20';
      default:
        return 'text-gray-400 bg-gray-500/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg`}>
          <Wrench className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
            Troubleshooting
          </h1>
          <p className={`text-sm ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
            Diagnostic tools and resolution guides
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isDarkMode ? 'text-white/40' : 'text-black/40'}`} />
        <input
          type="text"
          placeholder="Search for issues, error codes, or solutions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`w-full pl-12 pr-4 py-3 rounded-xl border smooth-transition ${
            isDarkMode
              ? 'bg-white/5 border-white/10 text-white/90 placeholder-white/40 focus:border-purple-400/50'
              : 'bg-white/30 border-black/10 text-black/90 placeholder-black/40 focus:border-purple-400/50'
          }`}
        />
      </div>

      {/* Quick Fixes */}
      <div>
        <h2 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
          Common Issues & Quick Fixes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {commonIssues.map((item) => (
            <div
              key={item.id}
              className={`p-4 rounded-xl border smooth-transition cursor-pointer ${
                isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white/30 border-black/10 hover:bg-white/40'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{item.icon}</span>
                <div className="flex-1">
                  <h3 className={`text-sm font-medium mb-1 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                    {item.issue}
                  </h3>
                  <p className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                    {item.quickFix}
                  </p>
                </div>
                <ChevronRight className={`w-4 h-4 ${isDarkMode ? 'text-white/40' : 'text-black/40'}`} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Diagnostic Tools */}
      <div>
        <h2 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
          Diagnostic Tools
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {diagnosticTools.map((tool, index) => (
            <button
              key={index}
              className={`p-4 rounded-xl border text-center smooth-transition ${
                isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white/30 border-black/10 hover:bg-white/40'
              }`}
            >
              <div className="text-3xl mb-2">{tool.icon}</div>
              <h3 className={`text-sm font-medium mb-1 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                {tool.name}
              </h3>
              <p className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
                {tool.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Troubleshooting Guides */}
      <div>
        <h2 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
          Troubleshooting Guides
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {guides.map((guide) => (
            <div
              key={guide.id}
              className={`p-5 rounded-xl border smooth-transition cursor-pointer ${
                isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white/30 border-black/10 hover:bg-white/40'
              }`}
              onClick={() => setSelectedGuide(guide.id)}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium mb-2 ${
                    isDarkMode ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-500/20 text-purple-600'
                  }`}>
                    {guide.category}
                  </span>
                  <h3 className={`text-sm font-semibold mt-2 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                    {guide.title}
                  </h3>
                </div>
                <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getSeverityColor(guide.severity)}`}>
                  {guide.severity}
                </span>
              </div>
              <p className={`text-sm mb-3 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                {guide.description}
              </p>
              <div className="flex items-center justify-between">
                <span className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
                  {guide.solutions} solutions
                </span>
                <div className="flex items-center gap-1 text-xs text-cyan-400">
                  View Guide
                  <ExternalLink className="w-3 h-3" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Knowledge Base */}
      <div className={`rounded-xl border p-6 ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white/30 border-black/10'}`}>
        <div className="flex items-start gap-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-cyan-500 to-cyan-600`}>
            <Book className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
              Knowledge Base
            </h3>
            <p className={`text-sm mb-4 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
              Browse our comprehensive documentation and community solutions
            </p>
            <div className="flex items-center gap-3">
              <button className={`px-4 py-2 rounded-lg smooth-transition ${
                isDarkMode ? 'bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400' : 'bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-600'
              }`}>
                Browse Docs
              </button>
              <button className={`px-4 py-2 rounded-lg smooth-transition ${
                isDarkMode ? 'bg-white/5 hover:bg-white/10 text-white/70' : 'bg-black/5 hover:bg-black/10 text-black/70'
              }`}>
                Community Forum
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Solutions */}
      <div>
        <h2 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
          Recently Resolved
        </h2>
        <div className="space-y-3">
          <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white/30 border-black/10'}`}>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
              <div className="flex-1">
                <h3 className={`text-sm font-medium mb-1 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                  Fixed PostgreSQL connection pool
                </h3>
                <p className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                  Increased max connections and optimized query timeouts
                </p>
                <span className={`text-xs ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}>2 hours ago</span>
              </div>
            </div>
          </div>
          <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white/30 border-black/10'}`}>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
              <div className="flex-1">
                <h3 className={`text-sm font-medium mb-1 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                  Resolved high CPU usage
                </h3>
                <p className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                  Identified memory leak in background worker process
                </p>
                <span className={`text-xs ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}>5 hours ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
