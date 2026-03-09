import { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface LineChartProps {
  data: Array<{
    label: string;
    value: number;
  }>;
  title?: string;
  height?: number;
  color?: string;
  showDots?: boolean;
  showArea?: boolean;
}

export function LineChart({ 
  data, 
  title, 
  height = 200, 
  color = '#00e5ff',
  showDots = true,
  showArea = false 
}: LineChartProps) {
  const { isDarkMode } = useTheme();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const range = maxValue - minValue;

  // Calculate SVG path
  const padding = 20;
  const chartHeight = height - padding * 2;
  const chartWidth = 100; // percentage
  const stepX = chartWidth / (data.length - 1);

  const points = data.map((item, index) => {
    const x = index * stepX;
    const y = padding + chartHeight - ((item.value - minValue) / range) * chartHeight;
    return { x, y, value: item.value, label: item.label };
  });

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  
  const areaPath = showArea
    ? `${linePath} L ${points[points.length - 1].x} ${height - padding} L 0 ${height - padding} Z`
    : '';

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
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map((percent) => (
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
          {showArea && (
            <path
              d={areaPath}
              fill={`url(#gradient-${title || 'line'})`}
              opacity="0.3"
            />
          )}

          {/* Line */}
          <path
            d={linePath}
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Dots */}
          {showDots && points.map((point, index) => (
            <circle
              key={index}
              cx={point.x}
              cy={point.y}
              r={hoveredIndex === index ? '3' : '2'}
              fill={color}
              className="smooth-transition cursor-pointer"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            />
          ))}

          {/* Gradient definition */}
          <defs>
            <linearGradient id={`gradient-${title || 'line'}`} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.5" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        {/* Labels */}
        <div className="flex justify-between mt-2">
          {data.map((item, index) => (
            <span
              key={index}
              className={`text-xs ${
                hoveredIndex === index ? 'text-cyan-400' : isDarkMode ? 'text-white/50' : 'text-black/50'
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {item.label}
            </span>
          ))}
        </div>

        {/* Hover tooltip */}
        {hoveredIndex !== null && (
          <div
            className="absolute glass-card px-3 py-2 rounded-lg pointer-events-none"
            style={{
              left: `${points[hoveredIndex].x}%`,
              top: `${points[hoveredIndex].y - 40}px`,
              transform: 'translateX(-50%)',
            }}
          >
            <div className="text-xs">
              <div className={`metric-value mb-1 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                {points[hoveredIndex].value}
              </div>
              <div className={isDarkMode ? 'text-white/60' : 'text-black/60'}>
                {points[hoveredIndex].label}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
