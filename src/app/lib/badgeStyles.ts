export type BadgeTone = 'success' | 'error' | 'warning' | 'info' | 'neutral' | 'purple' | 'orange' | 'pink';

type BadgePalette = {
  backgroundColor: string;
  borderColor: string;
  textColor: string;
};

const darkBadgePalettes: Record<BadgeTone, BadgePalette> = {
  success: {
    backgroundColor: 'rgba(34, 197, 94, 0.16)',
    borderColor: 'rgba(34, 197, 94, 0.24)',
    textColor: '#86efac',
  },
  error: {
    backgroundColor: 'rgba(239, 68, 68, 0.16)',
    borderColor: 'rgba(239, 68, 68, 0.24)',
    textColor: '#fca5a5',
  },
  warning: {
    backgroundColor: 'rgba(234, 179, 8, 0.16)',
    borderColor: 'rgba(234, 179, 8, 0.24)',
    textColor: '#fde047',
  },
  info: {
    backgroundColor: 'rgba(6, 182, 212, 0.16)',
    borderColor: 'rgba(6, 182, 212, 0.24)',
    textColor: '#67e8f9',
  },
  neutral: {
    backgroundColor: 'rgba(148, 163, 184, 0.16)',
    borderColor: 'rgba(148, 163, 184, 0.24)',
    textColor: 'rgba(255, 255, 255, 0.72)',
  },
  purple: {
    backgroundColor: 'rgba(168, 85, 247, 0.16)',
    borderColor: 'rgba(168, 85, 247, 0.24)',
    textColor: '#d8b4fe',
  },
  orange: {
    backgroundColor: 'rgba(249, 115, 22, 0.16)',
    borderColor: 'rgba(249, 115, 22, 0.24)',
    textColor: '#fdba74',
  },
  pink: {
    backgroundColor: 'rgba(236, 72, 153, 0.16)',
    borderColor: 'rgba(236, 72, 153, 0.24)',
    textColor: '#f9a8d4',
  },
};

const lightBadgePalettes: Record<BadgeTone, BadgePalette> = {
  success: {
    backgroundColor: '#dcfce7',
    borderColor: '#bbf7d0',
    textColor: '#166534',
  },
  error: {
    backgroundColor: '#fee2e2',
    borderColor: '#fecaca',
    textColor: '#991b1b',
  },
  warning: {
    backgroundColor: '#fef3c7',
    borderColor: '#fde68a',
    textColor: '#92400e',
  },
  info: {
    backgroundColor: '#cffafe',
    borderColor: '#a5f3fc',
    textColor: '#155e75',
  },
  neutral: {
    backgroundColor: '#e5e7eb',
    borderColor: '#d1d5db',
    textColor: '#374151',
  },
  purple: {
    backgroundColor: '#ede9fe',
    borderColor: '#ddd6fe',
    textColor: '#6b21a8',
  },
  orange: {
    backgroundColor: '#ffedd5',
    borderColor: '#fed7aa',
    textColor: '#9a3412',
  },
  pink: {
    backgroundColor: '#fce7f3',
    borderColor: '#fbcfe8',
    textColor: '#9d174d',
  },
};

export function getBadgeToneStyles(tone: BadgeTone, isDarkMode: boolean) {
  const palette = isDarkMode ? darkBadgePalettes[tone] : lightBadgePalettes[tone];

  return {
    style: {
      backgroundColor: palette.backgroundColor,
      borderColor: palette.borderColor,
      color: palette.textColor,
    },
    dotStyle: {
      backgroundColor: palette.textColor,
    },
  };
}
