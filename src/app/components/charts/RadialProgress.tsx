import { useTheme } from '../../contexts/ThemeContext';

interface RadialProgressProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  backgroundColor?: string;
  label?: string;
  showPercentage?: boolean;
  children?: React.ReactNode;
}

export function RadialProgress({ 
  value, 
  max = 100,
  size = 120,
  strokeWidth = 8,
  color = '#00e5ff',
  backgroundColor,
  label,
  showPercentage = true,
  children
}: RadialProgressProps) {
  const { isDarkMode } = useTheme();
  
  const percentage = Math.min((value / max) * 100, 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  const defaultBgColor = isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={backgroundColor || defaultBgColor}
            strokeWidth={strokeWidth}
          />
          
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="smooth-transition"
            style={{ transition: 'stroke-dashoffset 0.5s ease' }}
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {children || (
            <>
              {showPercentage && (
                <span 
                  className={`text-2xl font-semibold ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}
                  style={{ color }}
                >
                  {Math.round(percentage)}%
                </span>
              )}
              {!showPercentage && (
                <span className={`text-xl font-semibold ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
                  {value}/{max}
                </span>
              )}
            </>
          )}
        </div>
      </div>
      
      {label && (
        <span className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
          {label}
        </span>
      )}
    </div>
  );
}
