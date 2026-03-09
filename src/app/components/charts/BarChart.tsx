import { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface BarChartProps {
  data: Array<{
    label: string;
    value: number;
    color?: string;
  }>;
  title?: string;
  height?: number;
  showValues?: boolean;
  gradient?: boolean;
}

export function BarChart({ data, title, height = 200, showValues = true, gradient = true }: BarChartProps) {
  const { isDarkMode } = useTheme();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const maxValue = Math.max(...data.map(d => d.value));

  const getBarColor = (item: typeof data[0], index: number) => {
    if (item.color) return item.color;
    const colors = ['#00e5ff', '#b366ff', '#ff8c42', '#00ff88', '#ff00aa'];
    return colors[index % colors.length];
  };

  return (
    <div className="glass-card p-5">
      {title && (
        <h3 className={`text-sm mb-4 m-0 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
          {title}
        </h3>
      )}
      
      <div className="flex items-end justify-between gap-3" style={{ height: `${height}px` }}>
        {data.map((item, index) => {
          const barHeight = (item.value / maxValue) * 100;
          const isHovered = hoveredIndex === index;
          const color = getBarColor(item, index);

          return (
            <div
              key={index}
              className="flex-1 flex flex-col items-center gap-3 group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Value tooltip */}
              {showValues && (
                <div
                  className={`smooth-transition ${
                    isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                  }`}
                >
                  <div className="glass-card px-2 py-1 rounded">
                    <span className={`text-xs metric-value ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                      {item.value}
                    </span>
                  </div>
                </div>
              )}

              {/* Bar */}
              <div className="w-full flex-1 flex items-end">
                <div
                  className="w-full rounded-t-lg smooth-transition cursor-pointer"
                  style={{
                    height: `${barHeight}%`,
                    background: gradient
                      ? isHovered
                        ? `linear-gradient(180deg, ${color} 0%, ${color}99 100%)`
                        : `linear-gradient(180deg, ${color}80 0%, ${color}60 100%)`
                      : isHovered
                      ? color
                      : `${color}80`,
                  }}
                />
              </div>

              {/* Label */}
              <span
                className={`text-xs truncate max-w-full ${
                  isHovered ? 'text-cyan-400' : isDarkMode ? 'text-white/50' : 'text-black/50'
                }`}
              >
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
