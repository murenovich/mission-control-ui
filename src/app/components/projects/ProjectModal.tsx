import { X, Calendar, User, Flag, Tag, FileText, Link as LinkIcon } from 'lucide-react';
import { useState, type FormEvent, type KeyboardEvent } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAccessibleModal } from '../ui/useAccessibleModal';
import {
  PROJECT_PRIORITY_OPTIONS,
  PROJECT_STATUS_OPTIONS,
  type ProjectFormValues,
  type ProjectPriority,
  type ProjectRecord,
  type ProjectStatus,
} from '../../../lib/screens/projects/projectModels';

interface ProjectModalProps {
  project: ProjectRecord | null;
  onClose: () => void;
  onSave: (data: ProjectFormValues) => void;
}

export function ProjectModal({ project, onClose, onSave }: ProjectModalProps) {
  const { isDarkMode } = useTheme();
  const { contentRef, titleId } = useAccessibleModal({ isOpen: true, onClose });
  const [formData, setFormData] = useState<ProjectFormValues>({
    title: project?.title || '',
    description: project?.description || '',
    status: project?.status || 'Planning',
    priority: project?.priority || 'Medium',
    assignee: project?.assignee || '',
    dueDate: project?.dueDate || '',
    tags: project?.tags || [],
    progress: project?.progress || 0,
    notionUrl: project?.notionUrl || '',
  });

  const [tagInput, setTagInput] = useState('');

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()],
      });
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((t) => t !== tag),
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        ref={contentRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={`relative w-full max-w-2xl rounded-2xl border shadow-2xl ${
          isDarkMode ? 'bg-[#0f0f19]/95 border-white/10' : 'bg-white/95 border-black/10'
        }`}
        style={{ backdropFilter: 'blur(40px)' }}
      >
        {/* Header */}
        <div className={`flex items-center justify-between p-6 border-b ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
          <h2 id={titleId} className={`text-xl font-bold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
            {project ? 'Edit Project' : 'New Project'}
          </h2>
          <button
            onClick={onClose}
            aria-label={project ? 'Close edit project dialog' : 'Close new project dialog'}
            className={`p-2 rounded-lg smooth-transition ${
              isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/10'
            }`}
          >
            <X className={`w-5 h-5 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Title */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
              Project Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className={`w-full px-4 py-3 rounded-lg border smooth-transition ${
                isDarkMode
                  ? 'bg-white/5 border-white/10 text-white/90 placeholder-white/40 focus:border-purple-400/50'
                  : 'bg-white/30 border-black/10 text-black/90 placeholder-black/40 focus:border-purple-400/50'
              }`}
              placeholder="Enter project title"
            />
          </div>

          {/* Description */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
              <FileText className="w-4 h-4 inline mr-2" />
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className={`w-full px-4 py-3 rounded-lg border smooth-transition resize-none ${
                isDarkMode
                  ? 'bg-white/5 border-white/10 text-white/90 placeholder-white/40 focus:border-purple-400/50'
                  : 'bg-white/30 border-black/10 text-black/90 placeholder-black/40 focus:border-purple-400/50'
              }`}
              placeholder="Project description..."
            />
          </div>

          {/* Status and Priority */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
                Status *
              </label>
              <select
                required
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value as ProjectStatus })
                }
                className={`w-full px-4 py-3 rounded-lg border smooth-transition ${
                  isDarkMode
                    ? 'bg-white/5 border-white/10 text-white/90 focus:border-purple-400/50'
                    : 'bg-white/30 border-black/10 text-black/90 focus:border-purple-400/50'
                }`}
              >
                {PROJECT_STATUS_OPTIONS.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
                <Flag className="w-4 h-4 inline mr-2" />
                Priority *
              </label>
              <select
                required
                value={formData.priority}
                onChange={(e) =>
                  setFormData({ ...formData, priority: e.target.value as ProjectPriority })
                }
                className={`w-full px-4 py-3 rounded-lg border smooth-transition ${
                  isDarkMode
                    ? 'bg-white/5 border-white/10 text-white/90 focus:border-purple-400/50'
                    : 'bg-white/30 border-black/10 text-black/90 focus:border-purple-400/50'
                }`}
              >
                {PROJECT_PRIORITY_OPTIONS.map((priority) => (
                  <option key={priority} value={priority}>
                    {priority}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Assignee and Due Date */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
                <User className="w-4 h-4 inline mr-2" />
                Assignee
              </label>
              <input
                type="text"
                value={formData.assignee}
                onChange={(e) => setFormData({ ...formData, assignee: e.target.value })}
                className={`w-full px-4 py-3 rounded-lg border smooth-transition ${
                  isDarkMode
                    ? 'bg-white/5 border-white/10 text-white/90 placeholder-white/40 focus:border-purple-400/50'
                    : 'bg-white/30 border-black/10 text-black/90 placeholder-black/40 focus:border-purple-400/50'
                }`}
                placeholder="Assign to..."
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
                <Calendar className="w-4 h-4 inline mr-2" />
                Due Date
              </label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className={`w-full px-4 py-3 rounded-lg border smooth-transition ${
                  isDarkMode
                    ? 'bg-white/5 border-white/10 text-white/90 focus:border-purple-400/50'
                    : 'bg-white/30 border-black/10 text-black/90 focus:border-purple-400/50'
                }`}
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
              <Tag className="w-4 h-4 inline mr-2" />
              Tags
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
                className={`flex-1 px-4 py-2 rounded-lg border smooth-transition ${
                  isDarkMode
                    ? 'bg-white/5 border-white/10 text-white/90 placeholder-white/40 focus:border-purple-400/50'
                    : 'bg-white/30 border-black/10 text-black/90 placeholder-black/40 focus:border-purple-400/50'
                }`}
                placeholder="Add tag..."
              />
              <button
                type="button"
                onClick={handleAddTag}
                className={`px-4 py-2 rounded-lg smooth-transition ${
                  isDarkMode
                    ? 'bg-purple-500/20 text-purple-400 hover:bg-purple-500/30'
                    : 'bg-purple-500/20 text-purple-600 hover:bg-purple-500/30'
                }`}
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag) => (
                <span
                  key={tag}
                  className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg ${
                    isDarkMode ? 'bg-white/10 text-white/70' : 'bg-black/10 text-black/70'
                  }`}
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    aria-label={`Remove ${tag} tag`}
                    className="hover:text-red-400"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Progress */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
              Progress: {formData.progress}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={formData.progress}
              onChange={(e) => setFormData({ ...formData, progress: parseInt(e.target.value) })}
              className="w-full"
            />
            <div className={`mt-2 h-2 rounded-full ${isDarkMode ? 'bg-white/10' : 'bg-black/10'}`}>
              <div
                className="h-full rounded-full bg-gradient-to-r from-purple-500 to-purple-600"
                style={{ width: `${formData.progress}%` }}
              />
            </div>
          </div>

          {/* Notion Link */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
              <LinkIcon className="w-4 h-4 inline mr-2" />
              Notion Page URL
            </label>
            <input
              type="url"
              value={formData.notionUrl}
              onChange={(e) => setFormData({ ...formData, notionUrl: e.target.value })}
              className={`w-full px-4 py-3 rounded-lg border smooth-transition ${
                isDarkMode
                  ? 'bg-white/5 border-white/10 text-white/90 placeholder-white/40 focus:border-purple-400/50'
                  : 'bg-white/30 border-black/10 text-black/90 placeholder-black/40 focus:border-purple-400/50'
              }`}
              placeholder="https://notion.so/..."
            />
          </div>
        </form>

        {/* Footer */}
        <div className={`flex items-center justify-end gap-3 p-6 border-t ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
          <button
            type="button"
            onClick={onClose}
            className={`px-4 py-2 rounded-lg smooth-transition ${
              isDarkMode
                ? 'bg-white/5 hover:bg-white/10 text-white/70'
                : 'bg-black/5 hover:bg-black/10 text-black/70'
            }`}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white smooth-transition hover:shadow-lg hover:scale-105"
          >
            {project ? 'Update Project' : 'Create Project'}
          </button>
        </div>
      </div>
    </div>
  );
}
