import { useEffect } from 'react';

export function useModalAccessibility(isOpen: boolean, onClose: () => void) {
  useEffect(() => {
    const appRoot = document.getElementById('root');
    
    if (isOpen) {
      // Prevent background from being interactive for screen readers
      appRoot?.setAttribute('aria-hidden', 'true');

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleKeyDown);

      // Cleanup function
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        // Ensure aria-hidden is removed when modal is closed or component unmounts
        appRoot?.removeAttribute('aria-hidden');
      };
    } else {
      // Ensure aria-hidden is removed if the modal closes without the component unmounting
      appRoot?.removeAttribute('aria-hidden');
    }
  }, [isOpen, onClose]);
}
