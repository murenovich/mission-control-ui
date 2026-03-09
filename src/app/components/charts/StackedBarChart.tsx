import { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface StackedBarChartProps {
  data: Array<{
    label: string;
    segments: Array<{
      value: number;
      color: string;
      label: string;
    }>;
  }>;
  title?: string;
  height?: number;
  showLegend?: boolean;
}

export function StackedBarChart({ 
  data, 
  title, 
  height = 250,
  showLegend = true 
}: StackedBarChartProps) {
  const { isDarkMode } = useTheme();
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const [hoveredSegment, setHoveredSegment] = useState<number | null>(null);

  // Calculate max total value
  const maxTotal = Math.max(
    ...data.map(item => item.segments.reduce((sum, seg) => sum + seg.value, 0))
  );

  // Get unique segment labels for legend
  const legendItems = data[0]?.segments.map((seg, idx) => ({
    label: seg.label,
    color: seg.color
  })) || [];

  return (
    <div className="glass-card p-5">
      {title && (
        <h3 className={`text-sm mb-4 m-0 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
          {title}
        </h3>
      )}

      <div className="flex gap-6">
        {/* Chart */}
        <div className="flex-1">
          <div 
            className="flex items-end justify-between gap-3" 
            style={{ height: `${height}px` }}
          >
            {data.map((item, barIdx) => {
              const total = item.segments.reduce((sum, seg) => sum + seg.value, 0);
              const barHeight = maxTotal > 0 ? (total / maxTotal) * 100 : 0;
              const isBarHovered = hoveredBar === barIdx;

              return (
                <div
                  key={barIdx}
                  className="flex-1 h-full flex flex-col items-center gap-3"
                  onMouseEnter={() => setHoveredBar(barIdx)}
                  onMouseLeave={() => {
                    setHoveredBar(null);
                    setHoveredSegment(null);
                  }}
                >
                  {/* Total value tooltip */}
                  <div
                    className={`smooth-transition ${
                      isBarHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                    }`}
                  >
                    <div className="glass-card px-2 py-1 rounded">
                      <span className={`text-xs metric-value ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                        {total}
                      </span>
                    </div>
                  </div>

                  {/* Stacked bar */}
                  <div className="w-full flex-1 flex items-end">
                    {/* The stack needs a real parent height, otherwise percentage-based segment heights collapse to zero. */}
                    <div
                      className="w-full flex flex-col-reverse gap-0.5"
                      style={{ height: `${barHeight}%` }}
                    >
                      {item.segments.map((segment, segIdx) => {
                        const segmentHeight = total > 0 ? (segment.value / total) * 100 : 0;
                        const isSegmentHovered = isBarHovered && hoveredSegment === segIdx;

                        return (
                          <div
                            key={segIdx}
                            className="w-full rounded-sm smooth-transition cursor-pointer relative group"
                            style={{
                              height: `${segmentHeight}%`,
                              backgroundColor: segment.color,
                              opacity: hoveredSegment === null || isSegmentHovered ? 1 : 0.5,
                            }}
                            onMouseEnter={() => setHoveredSegment(segIdx)}
                            title={`${segment.label}: ${segment.value}`}
                          >
                            {/* Segment value on hover */}
                            {isSegmentHovered && (
                              <div className="absolute -top-6 left-1/2 -translate-x-1/2 glass-card px-2 py-1 rounded text-xs whitespace-nowrap z-10">
                                {segment.label}: {segment.value}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Label */}
                  <span
                    className={`text-xs ${
                      isBarHovered ? 'text-cyan-400' : isDarkMode ? 'text-white/50' : 'text-black/50'
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        {showLegend && (
          <div className="w-32 space-y-2">
            {legendItems.map((item, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-2 p-2 rounded smooth-transition cursor-pointer ${
                  hoveredSegment === idx
                    ? isDarkMode
                      ? 'bg-white/10'
                      : 'bg-black/10'
                    : ''
                }`}
                onMouseEnter={() => setHoveredSegment(idx)}
                onMouseLeave={() => setHoveredSegment(null)}
              >
                <div
                  className="w-3 h-3 rounded-sm"
                  style={{ backgroundColor: item.color }}
                />
                <span className={`text-xs ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
