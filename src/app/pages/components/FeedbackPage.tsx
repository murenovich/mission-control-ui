import { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { CheckCircle, AlertCircle, Info, AlertTriangle, Loader, Bell, X } from 'lucide-react';
import { getAlertBannerStyles } from '../../lib/alertStyles';
import { getBadgeToneStyles } from '../../lib/badgeStyles';

export default function FeedbackPage() {
  const { isDarkMode } = useTheme();
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState<'success' | 'error' | 'warning' | 'info'>('success');
  const successAlertStyles = getAlertBannerStyles('success', isDarkMode);
  const errorAlertStyles = getAlertBannerStyles('error', isDarkMode);
  const warningAlertStyles = getAlertBannerStyles('warning', isDarkMode);
  const infoAlertStyles = getAlertBannerStyles('info', isDarkMode);
  const cyanBadgeStyles = getBadgeToneStyles('info', isDarkMode);
  const purpleBadgeStyles = getBadgeToneStyles('purple', isDarkMode);
  const orangeBadgeStyles = getBadgeToneStyles('orange', isDarkMode);
  const greenBadgeStyles = getBadgeToneStyles('success', isDarkMode);
  const redBadgeStyles = getBadgeToneStyles('error', isDarkMode);
  const yellowBadgeStyles = getBadgeToneStyles('warning', isDarkMode);
  const pinkBadgeStyles = getBadgeToneStyles('pink', isDarkMode);
  const neutralBadgeStyles = getBadgeToneStyles('neutral', isDarkMode);

  const showToastNotification = (type: 'success' | 'error' | 'warning' | 'info') => {
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className={`text-3xl mb-2 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
          Feedback & Alerts
        </h1>
        <p className={isDarkMode ? 'text-white/60' : 'text-black/60'}>
          Notifications, alerts, toasts, and loading states for user feedback
        </p>
      </div>

      {/* Alert Messages */}
      <section className="glass-card p-8 rounded-2xl space-y-6">
        <div>
          <h2 className={`text-2xl mb-2 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
            Alert Messages
          </h2>
          <p className={`text-sm mb-6 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
            Full-width alert banners for important messages
          </p>
        </div>

        <div className="space-y-4">
          <div className={successAlertStyles.containerClassName} style={successAlertStyles.containerStyle}>
            <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={successAlertStyles.iconStyle} />
            <div className="flex-1">
              <p className="font-medium mb-1" style={successAlertStyles.titleStyle}>
                Success
              </p>
              <p className="text-sm" style={successAlertStyles.bodyStyle}>
                Your changes have been saved successfully
              </p>
            </div>
          </div>

          <div className={errorAlertStyles.containerClassName} style={errorAlertStyles.containerStyle}>
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={errorAlertStyles.iconStyle} />
            <div className="flex-1">
              <p className="font-medium mb-1" style={errorAlertStyles.titleStyle}>
                Error
              </p>
              <p className="text-sm" style={errorAlertStyles.bodyStyle}>
                Something went wrong. Please try again
              </p>
            </div>
          </div>

          <div className={warningAlertStyles.containerClassName} style={warningAlertStyles.containerStyle}>
            <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" style={warningAlertStyles.iconStyle} />
            <div className="flex-1">
              <p className="font-medium mb-1" style={warningAlertStyles.titleStyle}>
                Warning
              </p>
              <p className="text-sm" style={warningAlertStyles.bodyStyle}>
                This action cannot be undone
              </p>
            </div>
          </div>

          <div className={infoAlertStyles.containerClassName} style={infoAlertStyles.containerStyle}>
            <Info className="w-5 h-5 flex-shrink-0 mt-0.5" style={infoAlertStyles.iconStyle} />
            <div className="flex-1">
              <p className="font-medium mb-1" style={infoAlertStyles.titleStyle}>
                Info
              </p>
              <p className="text-sm" style={infoAlertStyles.bodyStyle}>
                New features are now available
              </p>
            </div>
          </div>
        </div>

        <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-black/20' : 'bg-gray-100'}`}>
          <code className={`text-sm ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
            {`<div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">`}
          </code>
        </div>
      </section>

      {/* Dismissible Alerts */}
      <section className="glass-card p-8 rounded-2xl space-y-6">
        <div>
          <h2 className={`text-2xl mb-2 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
            Dismissible Alerts
          </h2>
          <p className={`text-sm mb-6 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
            Alerts with close buttons
          </p>
        </div>

        <div className="space-y-4">
          <div className={`p-4 rounded-xl flex items-start gap-3 ${
            isDarkMode ? 'bg-purple-500/10 border border-purple-500/20' : 'bg-purple-50 border border-purple-200'
          }`}>
            <Info className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className={`font-medium mb-1 ${isDarkMode ? 'text-purple-400' : 'text-purple-700'}`}>
                New Update Available
              </p>
              <p className={`text-sm ${isDarkMode ? 'text-purple-300/80' : 'text-purple-600'}`}>
                Version 2.0 is now available. Click here to update.
              </p>
            </div>
            <button className={`${isDarkMode ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-700'}`}>
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Toast Notifications */}
      <section className="glass-card p-8 rounded-2xl space-y-6">
        <div>
          <h2 className={`text-2xl mb-2 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
            Toast Notifications
          </h2>
          <p className={`text-sm mb-6 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
            Temporary notifications that appear and auto-dismiss
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => showToastNotification('success')}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 smooth-transition"
          >
            Show Success Toast
          </button>
          <button
            onClick={() => showToastNotification('error')}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 smooth-transition"
          >
            Show Error Toast
          </button>
          <button
            onClick={() => showToastNotification('warning')}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-600 hover:to-orange-600 smooth-transition"
          >
            Show Warning Toast
          </button>
          <button
            onClick={() => showToastNotification('info')}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:from-cyan-600 hover:to-purple-600 smooth-transition"
          >
            Show Info Toast
          </button>
        </div>

        {/* Toast Display */}
        {showToast && (
          <div className="fixed bottom-8 right-8 z-50 animate-in slide-in-from-right">
            <div className={`glass-card rounded-xl p-4 flex items-center gap-3 shadow-2xl ${
              isDarkMode ? 'bg-[#0f0f19]/95' : 'bg-white/95'
            }`} style={{ backdropFilter: 'blur(40px)' }}>
              {toastType === 'success' && <CheckCircle className="w-5 h-5 text-green-500" />}
              {toastType === 'error' && <AlertCircle className="w-5 h-5 text-red-500" />}
              {toastType === 'warning' && <AlertTriangle className="w-5 h-5 text-yellow-500" />}
              {toastType === 'info' && <Info className="w-5 h-5 text-cyan-500" />}
              <p className={isDarkMode ? 'text-white/90' : 'text-black/90'}>
                {toastType === 'success' && 'Action completed successfully!'}
                {toastType === 'error' && 'An error occurred!'}
                {toastType === 'warning' && 'Warning: Please review'}
                {toastType === 'info' && 'New information available'}
              </p>
              <button
                onClick={() => setShowToast(false)}
                className={isDarkMode ? 'text-white/60 hover:text-white/90' : 'text-black/60 hover:text-black/90'}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Badges */}
      <section className="glass-card p-8 rounded-2xl space-y-6">
        <div>
          <h2 className={`text-2xl mb-2 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
            Badges & Tags
          </h2>
          <p className={`text-sm mb-6 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
            Status indicators and labels
          </p>
        </div>

        <div>
          <h3 className={`text-lg mb-4 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>Color Variants</h3>
          <div className="flex flex-wrap gap-3">
            <span className="rounded-lg border px-3 py-1 text-sm" style={cyanBadgeStyles.style}>Cyan</span>
            <span className="rounded-lg border px-3 py-1 text-sm" style={purpleBadgeStyles.style}>Purple</span>
            <span className="rounded-lg border px-3 py-1 text-sm" style={orangeBadgeStyles.style}>Orange</span>
            <span className="rounded-lg border px-3 py-1 text-sm" style={greenBadgeStyles.style}>Green</span>
            <span className="rounded-lg border px-3 py-1 text-sm" style={redBadgeStyles.style}>Red</span>
            <span className="rounded-lg border px-3 py-1 text-sm" style={yellowBadgeStyles.style}>Yellow</span>
            <span className="rounded-lg border px-3 py-1 text-sm" style={pinkBadgeStyles.style}>Pink</span>
          </div>
        </div>

        <div>
          <h3 className={`text-lg mb-4 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>Status Badges</h3>
          <div className="flex flex-wrap gap-3">
            <span className="flex items-center gap-2 rounded-lg border px-3 py-1 text-sm" style={greenBadgeStyles.style}>
              <span className="h-2 w-2 rounded-full" style={greenBadgeStyles.dotStyle}></span>
              Active
            </span>
            <span className="flex items-center gap-2 rounded-lg border px-3 py-1 text-sm" style={yellowBadgeStyles.style}>
              <span className="h-2 w-2 rounded-full" style={yellowBadgeStyles.dotStyle}></span>
              Pending
            </span>
            <span className="flex items-center gap-2 rounded-lg border px-3 py-1 text-sm" style={redBadgeStyles.style}>
              <span className="h-2 w-2 rounded-full" style={redBadgeStyles.dotStyle}></span>
              Inactive
            </span>
            <span className="flex items-center gap-2 rounded-lg border px-3 py-1 text-sm" style={neutralBadgeStyles.style}>
              <span className="h-2 w-2 rounded-full" style={neutralBadgeStyles.dotStyle}></span>
              Draft
            </span>
          </div>
        </div>

        <div>
          <h3 className={`text-lg mb-4 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>Priority Badges</h3>
          <div className="flex flex-wrap gap-3">
            <span className="rounded-lg border px-3 py-1 text-sm font-medium" style={redBadgeStyles.style}>High Priority</span>
            <span className="rounded-lg border px-3 py-1 text-sm font-medium" style={orangeBadgeStyles.style}>Medium Priority</span>
            <span className="rounded-lg border px-3 py-1 text-sm font-medium" style={cyanBadgeStyles.style}>Low Priority</span>
          </div>
        </div>

        <div>
          <h3 className={`text-lg mb-4 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>Count Badges</h3>
          <div className="flex flex-wrap gap-4">
            <div className="relative">
              <Bell className={`w-6 h-6 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`} />
              <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                3
              </span>
            </div>
            <div className="relative">
              <Bell className={`w-6 h-6 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`} />
              <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cyan-500 text-white text-xs flex items-center justify-center">
                12
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Loading States */}
      <section className="glass-card p-8 rounded-2xl space-y-6">
        <div>
          <h2 className={`text-2xl mb-2 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
            Loading States
          </h2>
          <p className={`text-sm mb-6 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
            Spinners and progress indicators
          </p>
        </div>

        <div>
          <h3 className={`text-lg mb-4 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>Spinners</h3>
          <div className="flex flex-wrap items-center gap-8">
            <div className="flex items-center gap-3">
              <Loader className="w-6 h-6 text-cyan-400 animate-spin" />
              <span className={isDarkMode ? 'text-white/70' : 'text-black/70'}>Small</span>
            </div>
            <div className="flex items-center gap-3">
              <Loader className="w-8 h-8 text-purple-400 animate-spin" />
              <span className={isDarkMode ? 'text-white/70' : 'text-black/70'}>Medium</span>
            </div>
            <div className="flex items-center gap-3">
              <Loader className="w-12 h-12 text-orange-400 animate-spin" />
              <span className={isDarkMode ? 'text-white/70' : 'text-black/70'}>Large</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className={`text-lg mb-4 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>Progress Bars</h3>
          <div className="space-y-4 max-w-2xl">
            <div>
              <div className="flex justify-between mb-2">
                <span className={`text-sm ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>Progress</span>
                <span className={`text-sm ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>75%</span>
              </div>
              <div className={`w-full h-2 rounded-full ${isDarkMode ? 'bg-white/10' : 'bg-black/10'}`}>
                <div className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-purple-500" style={{ width: '75%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className={`text-sm ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>Upload</span>
                <span className={`text-sm ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>45%</span>
              </div>
              <div className={`w-full h-2 rounded-full ${isDarkMode ? 'bg-white/10' : 'bg-black/10'}`}>
                <div className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-500" style={{ width: '45%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className={`text-sm ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>Loading</span>
                <span className={`text-sm ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>90%</span>
              </div>
              <div className={`w-full h-2 rounded-full ${isDarkMode ? 'bg-white/10' : 'bg-black/10'}`}>
                <div className="h-full rounded-full bg-gradient-to-r from-orange-500 to-red-500" style={{ width: '90%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className={`text-lg mb-4 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>Loading Skeleton</h3>
          <div className="space-y-3 max-w-2xl">
            <div className={`h-4 rounded ${isDarkMode ? 'bg-white/5' : 'bg-black/5'} animate-pulse`}></div>
            <div className={`h-4 rounded ${isDarkMode ? 'bg-white/5' : 'bg-black/5'} animate-pulse w-3/4`}></div>
            <div className={`h-4 rounded ${isDarkMode ? 'bg-white/5' : 'bg-black/5'} animate-pulse w-1/2`}></div>
          </div>
        </div>
      </section>

      {/* Empty States */}
      <section className="glass-card p-8 rounded-2xl space-y-6">
        <div>
          <h2 className={`text-2xl mb-2 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
            Empty States
          </h2>
          <p className={`text-sm mb-6 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
            Messages displayed when there's no content
          </p>
        </div>

        <div className={`p-12 rounded-2xl text-center ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}>
          <Info className={`w-12 h-12 mx-auto mb-4 ${isDarkMode ? 'text-white/40' : 'text-black/40'}`} />
          <h3 className={`text-lg mb-2 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
            No items found
          </h3>
          <p className={`text-sm mb-4 ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
            Get started by creating your first item
          </p>
          <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:from-cyan-600 hover:to-purple-600 smooth-transition">
            Create New
          </button>
        </div>
      </section>
    </div>
  );
}
