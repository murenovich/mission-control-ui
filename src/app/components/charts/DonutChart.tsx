import { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface DonutChartProps {
  data: Array<{
    label: string;
    value: number;
    color: string;
  }>;
  title?: string;
  size?: number;
  innerRadius?: number;
  showLegend?: boolean;
  centerContent?: React.ReactNode;
}

export function DonutChart({ 
  data, 
  title, 
  size = 200, 
  innerRadius = 0.6,
  showLegend = true,
  centerContent 
}: DonutChartProps) {
  const { isDarkMode } = useTheme();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const total = data.reduce((sum, item) => sum + item.value, 0);
  const radius = 45;
  const strokeWidth = radius * (1 - innerRadius);
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;

  let currentOffset = 0;

  return (
    <div className="glass-card p-5">
      {title && (
        <h3 className={`text-sm mb-4 m-0 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
          {title}
        </h3>
      )}

      <div className="flex flex-col lg:flex-row items-center gap-6">
        {/* Chart */}
        <div className="relative" style={{ width: size, height: size }}>
          <svg width={size} height={size} viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r={normalizedRadius}
              fill="none"
              stroke={isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}
              strokeWidth={strokeWidth}
            />

            {/* Data segments */}
            {data.map((item, index) => {
              const percentage = (item.value / total) * 100;
              const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;
              const offset = currentOffset;
              currentOffset -= (percentage / 100) * circumference;

              const isHovered = hoveredIndex === index;

              return (
                <circle
                  key={index}
                  cx="50"
                  cy="50"
                  r={normalizedRadius}
                  fill="none"
                  stroke={item.color}
                  strokeWidth={isHovered ? strokeWidth + 2 : strokeWidth}
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={offset}
                  transform="rotate(-90 50 50)"
                  className="smooth-transition cursor-pointer"
                  opacity={hoveredIndex === null || isHovered ? 1 : 0.4}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
              );
            })}
          </svg>

          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {centerContent || (
              <>
                <span className={`text-2xl metric-value ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
                  {total}
                </span>
                <span className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>Total</span>
              </>
            )}
          </div>
        </div>

        {/* Legend */}
        {showLegend && (
          <div className="flex-1 space-y-2">
            {data.map((item, index) => {
              const percentage = Math.round((item.value / total) * 100);
              const isHovered = hoveredIndex === index;

              return (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-lg smooth-transition cursor-pointer ${
                    isHovered
                      ? isDarkMode
                        ? 'bg-white/10'
                        : 'bg-black/10'
                      : isDarkMode
                      ? 'bg-white/5 hover:bg-white/8'
                      : 'bg-black/5 hover:bg-black/8'
                  }`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className={`text-sm ${isDarkMode ? 'text-white/80' : 'text-black/80'}`}>
                      {item.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
                      {item.value}
                    </span>
                    <span className={`text-sm metric-value ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                      {percentage}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
