import { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { X, AlertTriangle, Trash2, Save, Info, CheckCircle } from 'lucide-react';

export default function ModalsPage() {
  const { isDarkMode } = useTheme();
  const [showBasicModal, setShowBasicModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className={`text-3xl mb-2 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
          Modals & Overlays
        </h1>
        <p className={isDarkMode ? 'text-white/60' : 'text-black/60'}>
          Dialog boxes, modals, and overlay components with glassmorphic styling
        </p>
      </div>

      {/* Modal Examples */}
      <section className="glass-card p-8 rounded-2xl space-y-6">
        <div>
          <h2 className={`text-2xl mb-2 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
            Modal Types
          </h2>
          <p className={`text-sm mb-6 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
            Click the buttons below to see different modal styles
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <button
            onClick={() => setShowBasicModal(true)}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:from-cyan-600 hover:to-purple-600 smooth-transition"
          >
            Basic Modal
          </button>

          <button
            onClick={() => setShowFormModal(true)}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 smooth-transition"
          >
            Form Modal
          </button>

          <button
            onClick={() => setShowConfirmModal(true)}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 smooth-transition"
          >
            Confirmation Modal
          </button>

          <button
            onClick={() => setShowSuccessModal(true)}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 smooth-transition"
          >
            Success Modal
          </button>

          <button
            onClick={() => setShowDeleteModal(true)}
            className={`px-6 py-3 rounded-xl smooth-transition border ${
              isDarkMode
                ? 'bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20'
                : 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100'
            }`}
          >
            Delete Modal
          </button>

          <button
            onClick={() => setShowInfoModal(true)}
            className={`px-6 py-3 rounded-xl smooth-transition border ${
              isDarkMode
                ? 'bg-white/5 text-white/70 hover:bg-white/10 border-white/10'
                : 'bg-black/5 text-black/70 hover:bg-black/10 border-black/10'
            }`}
          >
            Info Modal
          </button>
        </div>
      </section>

      {/* Code Examples */}
      <section className="glass-card p-8 rounded-2xl space-y-6">
        <div>
          <h2 className={`text-2xl mb-2 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
            Modal Structure
          </h2>
          <p className={`text-sm mb-6 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
            Base modal structure with glassmorphic styling
          </p>
        </div>

        <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-black/20' : 'bg-gray-100'}`}>
          <pre className={`text-sm ${isDarkMode ? 'text-green-400' : 'text-green-600'} overflow-x-auto`}>
{`{showModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4
                  bg-black/50 backdrop-blur-sm">
    <div className="glass-card rounded-2xl p-8 w-full max-w-lg 
                    bg-[#0f0f19]/95" 
         style={{ backdropFilter: 'blur(40px)' }}>
      {/* Modal content */}
    </div>
  </div>
)}`}
          </pre>
        </div>
      </section>

      {/* MODALS */}

      {/* Basic Modal */}
      {showBasicModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div
            className={`glass-card rounded-2xl p-8 w-full max-w-lg ${
              isDarkMode ? 'bg-[#0f0f19]/95' : 'bg-white/95'
            }`}
            style={{ backdropFilter: 'blur(40px)' }}
          >
            <div className="flex items-start justify-between mb-6">
              <h3 className={`text-2xl ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
                Basic Modal
              </h3>
              <button
                onClick={() => setShowBasicModal(false)}
                className={`p-2 rounded-lg smooth-transition ${
                  isDarkMode ? 'hover:bg-white/5 text-white/60' : 'hover:bg-black/5 text-black/60'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className={`mb-6 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
              This is a basic modal dialog with a glassmorphic effect and backdrop blur.
              It can be used for simple messages, confirmations, or any other content.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowBasicModal(false)}
                className={`flex-1 px-6 py-3 rounded-xl smooth-transition ${
                  isDarkMode
                    ? 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'
                    : 'bg-black/5 text-black/70 hover:bg-black/10 border border-black/10'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={() => setShowBasicModal(false)}
                className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:from-cyan-600 hover:to-purple-600 smooth-transition"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Form Modal */}
      {showFormModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div
            className={`glass-card rounded-2xl p-8 w-full max-w-lg ${
              isDarkMode ? 'bg-[#0f0f19]/95' : 'bg-white/95'
            }`}
            style={{ backdropFilter: 'blur(40px)' }}
          >
            <div className="flex items-start justify-between mb-6">
              <h3 className={`text-2xl ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
                Contact Form
              </h3>
              <button
                onClick={() => setShowFormModal(false)}
                className={`p-2 rounded-lg smooth-transition ${
                  isDarkMode ? 'hover:bg-white/5 text-white/60' : 'hover:bg-black/5 text-black/60'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className={`block text-sm mb-2 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your name"
                  className={`w-full px-4 py-3 rounded-xl smooth-transition ${
                    isDarkMode
                      ? 'bg-white/5 border border-white/10 text-white/90 placeholder-white/40 focus:bg-white/10 focus:border-cyan-500/50'
                      : 'bg-black/5 border border-black/10 text-black/90 placeholder-black/40 focus:bg-black/10 focus:border-cyan-500/50'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-sm mb-2 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                  className={`w-full px-4 py-3 rounded-xl smooth-transition ${
                    isDarkMode
                      ? 'bg-white/5 border border-white/10 text-white/90 placeholder-white/40 focus:bg-white/10 focus:border-cyan-500/50'
                      : 'bg-black/5 border border-black/10 text-black/90 placeholder-black/40 focus:bg-black/10 focus:border-cyan-500/50'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-sm mb-2 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
                  Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Your message..."
                  rows={4}
                  className={`w-full px-4 py-3 rounded-xl smooth-transition resize-none ${
                    isDarkMode
                      ? 'bg-white/5 border border-white/10 text-white/90 placeholder-white/40 focus:bg-white/10 focus:border-cyan-500/50'
                      : 'bg-black/5 border border-black/10 text-black/90 placeholder-black/40 focus:bg-black/10 focus:border-cyan-500/50'
                  }`}
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowFormModal(false)}
                className={`flex-1 px-6 py-3 rounded-xl smooth-transition ${
                  isDarkMode
                    ? 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'
                    : 'bg-black/5 text-black/70 hover:bg-black/10 border border-black/10'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={() => setShowFormModal(false)}
                className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 smooth-transition flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" />
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div
            className={`glass-card rounded-2xl p-8 w-full max-w-md ${
              isDarkMode ? 'bg-[#0f0f19]/95' : 'bg-white/95'
            }`}
            style={{ backdropFilter: 'blur(40px)' }}
          >
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-orange-500/20 flex items-center justify-center mb-4">
                <AlertTriangle className="w-8 h-8 text-orange-400" />
              </div>
              <h3 className={`text-2xl mb-2 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
                Are you sure?
              </h3>
              <p className={isDarkMode ? 'text-white/70' : 'text-black/70'}>
                This action requires confirmation. Please review before proceeding.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className={`flex-1 px-6 py-3 rounded-xl smooth-transition ${
                  isDarkMode
                    ? 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'
                    : 'bg-black/5 text-black/70 hover:bg-black/10 border border-black/10'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 smooth-transition"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div
            className={`glass-card rounded-2xl p-8 w-full max-w-md ${
              isDarkMode ? 'bg-[#0f0f19]/95' : 'bg-white/95'
            }`}
            style={{ backdropFilter: 'blur(40px)' }}
          >
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              <h3 className={`text-2xl mb-2 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
                Success!
              </h3>
              <p className={isDarkMode ? 'text-white/70' : 'text-black/70'}>
                Your changes have been saved successfully.
              </p>
            </div>

            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 smooth-transition"
            >
              Great!
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div
            className={`glass-card rounded-2xl p-8 w-full max-w-md ${
              isDarkMode ? 'bg-[#0f0f19]/95' : 'bg-white/95'
            }`}
            style={{ backdropFilter: 'blur(40px)' }}
          >
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-4">
                <Trash2 className="w-8 h-8 text-red-400" />
              </div>
              <h3 className={`text-2xl mb-2 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
                Delete Item
              </h3>
              <p className={isDarkMode ? 'text-white/70' : 'text-black/70'}>
                Are you sure you want to delete this item? This action cannot be undone.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className={`flex-1 px-6 py-3 rounded-xl smooth-transition ${
                  isDarkMode
                    ? 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'
                    : 'bg-black/5 text-black/70 hover:bg-black/10 border border-black/10'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className={`flex-1 px-6 py-3 rounded-xl smooth-transition border ${
                  isDarkMode
                    ? 'bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20'
                    : 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100'
                } flex items-center justify-center gap-2`}
              >
                <Trash2 className="w-5 h-5" />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Info Modal */}
      {showInfoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div
            className={`glass-card rounded-2xl p-8 w-full max-w-md ${
              isDarkMode ? 'bg-[#0f0f19]/95' : 'bg-white/95'
            }`}
            style={{ backdropFilter: 'blur(40px)' }}
          >
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-cyan-500/20 flex items-center justify-center mb-4">
                <Info className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className={`text-2xl mb-2 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
                Information
              </h3>
              <p className={isDarkMode ? 'text-white/70' : 'text-black/70'}>
                This is an informational modal dialog. Use it to display important information or tips to users.
              </p>
            </div>

            <button
              onClick={() => setShowInfoModal(false)}
              className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:from-cyan-600 hover:to-purple-600 smooth-transition"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
