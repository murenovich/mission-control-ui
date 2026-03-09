import { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface HeatmapProps {
  data: number[][]; // 2D array of values
  rowLabels?: string[];
  columnLabels?: string[];
  title?: string;
  colorScale?: {
    low: string;
    medium: string;
    high: string;
  };
  showValues?: boolean;
  cellSize?: number;
}

export function Heatmap({ 
  data, 
  rowLabels,
  columnLabels,
  title,
  colorScale = {
    low: '#00e5ff',
    medium: '#b366ff',
    high: '#ff00aa'
  },
  showValues = false,
  cellSize = 40
}: HeatmapProps) {
  const { isDarkMode } = useTheme();
  const [hoveredCell, setHoveredCell] = useState<{ row: number; col: number } | null>(null);

  const maxValue = Math.max(...data.flat());
  const minValue = Math.min(...data.flat());

  const getColorForValue = (value: number) => {
    const normalized = (value - minValue) / (maxValue - minValue || 1);
    
    if (normalized < 0.33) {
      return isDarkMode ? 'bg-white/5' : 'bg-black/5';
    } else if (normalized < 0.5) {
      const opacity = Math.round((normalized - 0.33) / 0.17 * 30) + 20;
      return `bg-cyan-400/${opacity}`;
    } else if (normalized < 0.75) {
      const opacity = Math.round((normalized - 0.5) / 0.25 * 30) + 40;
      return `bg-purple-400/${opacity}`;
    } else {
      const opacity = Math.round((normalized - 0.75) / 0.25 * 30) + 60;
      return `bg-pink-400/${opacity}`;
    }
  };

  return (
    <div className="glass-card p-5">
      {title && (
        <h3 className={`text-sm mb-4 m-0 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
          {title}
        </h3>
      )}
      
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          {/* Column labels */}
          {columnLabels && (
            <div className="flex gap-1 mb-2" style={{ marginLeft: rowLabels ? '60px' : '0' }}>
              {columnLabels.map((label, idx) => (
                <div 
                  key={idx} 
                  className="text-center"
                  style={{ width: `${cellSize}px` }}
                >
                  <span className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Grid */}
          <div className="space-y-1">
            {data.map((row, rowIdx) => (
              <div key={rowIdx} className="flex items-center gap-1">
                {/* Row label */}
                {rowLabels && (
                  <span 
                    className={`text-xs w-14 text-right pr-2 ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}
                  >
                    {rowLabels[rowIdx]}
                  </span>
                )}
                
                {/* Cells */}
                {row.map((value, colIdx) => {
                  const isHovered = hoveredCell?.row === rowIdx && hoveredCell?.col === colIdx;
                  
                  return (
                    <div
                      key={colIdx}
                      className={`
                        ${getColorForValue(value)} 
                        rounded smooth-transition cursor-pointer 
                        flex items-center justify-center
                        hover:ring-2 hover:ring-cyan-400 hover:scale-105
                      `}
                      style={{ 
                        width: `${cellSize}px`, 
                        height: `${cellSize}px` 
                      }}
                      onMouseEnter={() => setHoveredCell({ row: rowIdx, col: colIdx })}
                      onMouseLeave={() => setHoveredCell(null)}
                    >
                      {(showValues || isHovered) && (
                        <span className={`text-xs font-medium ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                          {value}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-2 mt-4" style={{ marginLeft: rowLabels ? '60px' : '0' }}>
            <span className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>Low</span>
            <div className="flex gap-1">
              {[0, 0.35, 0.55, 0.75, 0.95].map((val, idx) => {
                const testValue = minValue + val * (maxValue - minValue);
                return (
                  <div
                    key={idx}
                    className={`w-6 h-6 rounded ${getColorForValue(testValue)}`}
                  />
                );
              })}
            </div>
            <span className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>High</span>
          </div>
        </div>
      </div>
    </div>
  );
}
