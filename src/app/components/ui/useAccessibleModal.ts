import { useEffect, useId, useRef } from 'react';

interface UseAccessibleModalOptions {
  isOpen: boolean;
  onClose: () => void;
}

const FOCUSABLE_SELECTOR = [
  'button:not([disabled])',
  '[href]',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

export function useAccessibleModal({ isOpen, onClose }: UseAccessibleModalOptions) {
  const contentRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousActiveElement =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;

    // Move focus into the dialog as soon as it is painted so keyboard users land in the active surface.
    const animationFrame = window.requestAnimationFrame(() => {
      const modalElement = contentRef.current;
      const firstInteractiveElement =
        modalElement?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR) ?? modalElement;

      firstInteractiveElement?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      document.removeEventListener('keydown', handleKeyDown);

      if (previousActiveElement?.isConnected) {
        previousActiveElement.focus();
      }
    };
  }, [isOpen, onClose]);

  return { contentRef, titleId };
}
