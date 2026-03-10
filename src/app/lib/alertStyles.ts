export type AlertTone = 'success' | 'error' | 'warning' | 'info';

type AlertPalette = {
  backgroundColor: string;
  borderColor: string;
  iconColor: string;
  titleColor: string;
  bodyColor: string;
};

const darkAlertPalettes: Record<AlertTone, AlertPalette> = {
  success: {
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    borderColor: 'rgba(34, 197, 94, 0.2)',
    iconColor: '#22c55e',
    titleColor: '#00f787',
    bodyColor: 'rgba(110, 231, 183, 0.9)',
  },
  error: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderColor: 'rgba(239, 68, 68, 0.2)',
    iconColor: '#ff3b4d',
    titleColor: '#ff5f6d',
    bodyColor: 'rgba(252, 165, 165, 0.9)',
  },
  warning: {
    backgroundColor: 'rgba(234, 179, 8, 0.1)',
    borderColor: 'rgba(234, 179, 8, 0.2)',
    iconColor: '#facc15',
    titleColor: '#ffcc00',
    bodyColor: 'rgba(253, 224, 71, 0.88)',
  },
  info: {
    backgroundColor: 'rgba(6, 182, 212, 0.1)',
    borderColor: 'rgba(6, 182, 212, 0.2)',
    iconColor: '#00cfff',
    titleColor: '#18d7ff',
    bodyColor: 'rgba(103, 232, 249, 0.9)',
  },
};

const lightAlertPalettes: Record<AlertTone, AlertPalette> = {
  success: {
    backgroundColor: '#f0fdf4',
    borderColor: '#bbf7d0',
    iconColor: '#16a34a',
    titleColor: '#15803d',
    bodyColor: '#166534',
  },
  error: {
    backgroundColor: '#fef2f2',
    borderColor: '#fecaca',
    iconColor: '#dc2626',
    titleColor: '#b91c1c',
    bodyColor: '#991b1b',
  },
  warning: {
    backgroundColor: '#fefce8',
    borderColor: '#fde68a',
    iconColor: '#ca8a04',
    titleColor: '#a16207',
    bodyColor: '#854d0e',
  },
  info: {
    backgroundColor: '#ecfeff',
    borderColor: '#a5f3fc',
    iconColor: '#0891b2',
    titleColor: '#0e7490',
    bodyColor: '#155e75',
  },
};

export function getAlertBannerStyles(tone: AlertTone, isDarkMode: boolean) {
  const palette = isDarkMode ? darkAlertPalettes[tone] : lightAlertPalettes[tone];

  return {
    containerClassName: 'p-4 rounded-xl flex items-start gap-3 border',
    containerStyle: {
      backgroundColor: palette.backgroundColor,
      borderColor: palette.borderColor,
    },
    iconStyle: { color: palette.iconColor },
    titleStyle: { color: palette.titleColor },
    bodyStyle: { color: palette.bodyColor },
  };
}
