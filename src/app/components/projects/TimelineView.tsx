import { useTheme } from '../../contexts/ThemeContext';
import { Calendar } from 'lucide-react';
import type { ProjectRecord } from '../../../lib/screens/projects/projectModels';

interface TimelineViewProps {
  projects: ProjectRecord[];
  onEdit: (project: ProjectRecord) => void;
}

export function TimelineView({ projects, onEdit }: TimelineViewProps) {
  const { isDarkMode } = useTheme();

  // Sort projects by due date
  const sortedProjects = [...projects].sort((a, b) => 
    new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  );

  // Get date range
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(1); // First day of current month
  const endDate = new Date(today);
  endDate.setMonth(endDate.getMonth() + 2); // 2 months ahead

  // Generate weeks
  const weeks: Date[] = [];
  const currentWeek = new Date(startDate);
  while (currentWeek <= endDate) {
    weeks.push(new Date(currentWeek));
    currentWeek.setDate(currentWeek.getDate() + 7);
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'from-red-500 to-red-600 border-red-400/50';
      case 'Medium':
        return 'from-orange-500 to-orange-600 border-orange-400/50';
      case 'Low':
        return 'from-green-500 to-green-600 border-green-400/50';
      default:
        return 'from-gray-500 to-gray-600 border-gray-400/50';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-500/20 text-green-400';
      case 'In Progress':
        return 'bg-cyan-500/20 text-cyan-400';
      case 'In Review':
        return 'bg-purple-500/20 text-purple-400';
      case 'Planning':
        return 'bg-orange-500/20 text-orange-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getProjectPosition = (dueDate: string) => {
    const date = new Date(dueDate);
    const diff = date.getTime() - startDate.getTime();
    const totalDiff = endDate.getTime() - startDate.getTime();
    return (diff / totalDiff) * 100;
  };

  return (
    <div className={`rounded-xl border p-6 ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white/30 border-black/10'}`}>
      {/* Timeline Header */}
      <div className="flex items-center gap-3 mb-6">
        <Calendar className="w-5 h-5 text-purple-400" />
        <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
          Project Timeline
        </h3>
        <span className={`text-sm ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
          {startDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - {endDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
        </span>
      </div>

      {/* Timeline Grid */}
      <div className="space-y-4">
        {/* Week Headers */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-48 flex-shrink-0"></div>
          <div className="flex-1 flex">
            {weeks.map((week, i) => (
              <div
                key={i}
                className="flex-1 text-center"
              >
                <div className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                  {week.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Today Marker */}
        <div className="relative">
          <div className="flex items-center gap-2">
            <div className="w-48 flex-shrink-0"></div>
            <div className="flex-1 relative h-1">
              <div className={`absolute inset-0 ${isDarkMode ? 'bg-white/5' : 'bg-black/5'} rounded-full`}></div>
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-cyan-400 z-10"
                style={{ left: `${getProjectPosition(today.toISOString())}%` }}
              >
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-cyan-400 rounded-full border-2 border-cyan-900"></div>
                <div className={`absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs px-2 py-0.5 rounded ${isDarkMode ? 'bg-cyan-500/20 text-cyan-400' : 'bg-cyan-500/30 text-cyan-600'}`}>
                  Today
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Project Rows */}
        {sortedProjects.map((project) => (
          <div
            key={project.id}
            className="flex items-center gap-2 group"
          >
            {/* Project Info */}
            <div className="w-48 flex-shrink-0">
              <div className="flex items-start gap-2">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-medium flex-shrink-0 ${isDarkMode ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-500/20 text-purple-600'}`}>
                  {project.assignee.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`text-sm font-medium truncate ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                    {project.title}
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline Bar */}
            <div className="flex-1 relative h-12">
              <div className={`absolute inset-0 ${isDarkMode ? 'bg-white/5' : 'bg-black/5'} rounded-lg`}></div>
              <div
                className={`absolute top-1/2 -translate-y-1/2 h-8 rounded-lg border-2 bg-gradient-to-r ${getPriorityColor(project.priority)} cursor-pointer smooth-transition hover:shadow-lg hover:scale-105 z-10`}
                style={{ 
                  left: `${Math.max(0, getProjectPosition(project.dueDate) - 10)}%`,
                  width: '20%',
                  minWidth: '80px'
                }}
                onClick={() => onEdit(project)}
              >
                <div className="h-full flex items-center justify-between px-3">
                  <span className="text-xs font-medium text-white truncate">
                    {project.title}
                  </span>
                  <span className="text-xs text-white/80">
                    {project.progress}%
                  </span>
                </div>
                {/* Progress overlay */}
                <div 
                  className="absolute inset-0 bg-black/20 rounded-lg" 
                  style={{ 
                    width: `${100 - project.progress}%`,
                    right: 0,
                    left: 'auto'
                  }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-8 pt-6 border-t flex items-center gap-6 flex-wrap" style={{ borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}>
        <div className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>Priority:</div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gradient-to-r from-red-500 to-red-600"></div>
          <span className={`text-xs ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>High</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gradient-to-r from-orange-500 to-orange-600"></div>
          <span className={`text-xs ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>Medium</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gradient-to-r from-green-500 to-green-600"></div>
          <span className={`text-xs ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>Low</span>
        </div>
      </div>
    </div>
  );
}
