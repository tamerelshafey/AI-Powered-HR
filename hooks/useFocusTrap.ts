
import { useEffect, useRef, RefObject } from 'react';

// FIX: Changed React.RefObject to RefObject and imported it from 'react'.
export function useFocusTrap(ref: RefObject<HTMLElement>, isOpen: boolean) {
  const firstFocusableElement = useRef<HTMLElement | null>(null);
  const lastFocusableElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen && ref.current) {
      const focusableElements = ref.current.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select'
      );

      if (focusableElements.length > 0) {
        firstFocusableElement.current = focusableElements[0] as HTMLElement;
        lastFocusableElement.current = focusableElements[focusableElements.length - 1] as HTMLElement;

        // Use a timeout to ensure the element is ready to be focused, especially with animations.
        setTimeout(() => firstFocusableElement.current?.focus(), 100);

        const handleKeyDown = (e: KeyboardEvent) => {
          if (e.key === 'Tab') {
            if (e.shiftKey) { // Shift + Tab
              if (document.activeElement === firstFocusableElement.current) {
                lastFocusableElement.current?.focus();
                e.preventDefault();
              }
            } else { // Tab
              if (document.activeElement === lastFocusableElement.current) {
                firstFocusableElement.current?.focus();
                e.preventDefault();
              }
            }
          }
        };

        const modalElement = ref.current;
        modalElement.addEventListener('keydown', handleKeyDown);

        return () => {
          modalElement.removeEventListener('keydown', handleKeyDown);
        };
      }
    }
  }, [isOpen, ref]);
}
