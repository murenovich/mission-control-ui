import { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface AreaChartProps {
  data: Array<{
    label: string;
    value: number;
  }>;
  title?: string;
  height?: number;
  gradientFrom?: string;
  gradientTo?: string;
  showGrid?: boolean;
}

export function AreaChart({ 
  data, 
  title, 
  height = 200,
  gradientFrom = '#00e5ff',
  gradientTo = '#b366ff',
  showGrid = true
}: AreaChartProps) {
  const { isDarkMode } = useTheme();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const range = maxValue - minValue || 1;

  const padding = 20;
  const chartHeight = height - padding * 2;
  const chartWidth = 100;
  const stepX = chartWidth / (data.length - 1);

  const points = data.map((item, index) => {
    const x = index * stepX;
    const y = padding + chartHeight - ((item.value - minValue) / range) * chartHeight;
    return { x, y, value: item.value, label: item.label };
  });

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${height - padding} L 0 ${height - padding} Z`;

  return (
    <div className="glass-card p-5">
      {title && (
        <h3 className={`text-sm mb-4 m-0 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
          {title}
        </h3>
      )}
      
      <div className="relative" style={{ height: `${height}px` }}>
        <svg
          viewBox={`0 0 100 ${height}`}
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id={`area-gradient-${title || 'area'}`} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor={gradientFrom} stopOpacity="0.6" />
              <stop offset="100%" stopColor={gradientTo} stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {showGrid && [0, 25, 50, 75, 100].map((percent) => (
            <line
              key={percent}
              x1="0"
              y1={padding + (chartHeight * percent) / 100}
              x2="100"
              y2={padding + (chartHeight * percent) / 100}
              stroke={isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}
              strokeWidth="0.5"
            />
          ))}

          {/* Area fill */}
          <path
            d={areaPath}
            fill={`url(#area-gradient-${title || 'area'})`}
          />

          {/* Top line */}
          <path
            d={linePath}
            fill="none"
            stroke={gradientFrom}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Interactive points */}
          {points.map((point, index) => (
            <g key={index}>
              {/* Invisible larger hit area */}
              <circle
                cx={point.x}
                cy={point.y}
                r="8"
                fill="transparent"
                className="cursor-pointer"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              />
              {/* Visible dot */}
              <circle
                cx={point.x}
                cy={point.y}
                r={hoveredIndex === index ? '4' : '0'}
                fill={gradientFrom}
                className="smooth-transition pointer-events-none"
              />
              {/* Outer ring on hover */}
              {hoveredIndex === index && (
                <circle
                  cx={point.x}
                  cy={point.y}
                  r="6"
                  fill="none"
                  stroke={gradientFrom}
                  strokeWidth="1"
                  opacity="0.5"
                  className="pointer-events-none"
                />
              )}
            </g>
          ))}
        </svg>

        {/* X-axis labels */}
        <div className="flex justify-between mt-2">
          {data.map((item, index) => (
            <span
              key={index}
              className={`text-xs ${
                hoveredIndex === index 
                  ? 'text-cyan-400 font-medium' 
                  : isDarkMode ? 'text-white/50' : 'text-black/50'
              } smooth-transition`}
            >
              {item.label}
            </span>
          ))}
        </div>

        {/* Tooltip */}
        {hoveredIndex !== null && (
          <div
            className="absolute glass-card px-3 py-2 rounded-lg pointer-events-none z-10"
            style={{
              left: `${points[hoveredIndex].x}%`,
              top: `${Math.max(points[hoveredIndex].y - 50, 0)}px`,
              transform: 'translateX(-50%)',
            }}
          >
            <div className="text-xs whitespace-nowrap">
              <div className={`font-semibold mb-1 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                {points[hoveredIndex].label}
              </div>
              <div className="metric-value" style={{ color: gradientFrom }}>
                {points[hoveredIndex].value}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
