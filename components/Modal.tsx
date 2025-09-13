
import React, { useRef } from 'react';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { useModalAccessibility } from '../hooks/useModalAccessibility';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, size = 'md' }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useFocusTrap(modalRef, isOpen);
  useModalAccessibility(isOpen, onClose);

  if (!isOpen) {
    return null;
  }

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 modal-backdrop z-50 flex items-center justify-center p-4 animate-modal-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={modalRef}
        className={`bg-white rounded-xl shadow-xl w-full ${sizeClasses[size]} max-h-[90vh] flex flex-col`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

// Optional Header component for use inside Modal
export const ModalHeader: React.FC<{ title: string; onClose: () => void; subtitle?: string; }> = ({ title, onClose, subtitle }) => (
    <div className="p-6 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-start justify-between">
            <div>
                <h3 id="modal-title" className="text-lg font-semibold text-gray-900">{title}</h3>
                {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600" aria-label="Close">
                <i className="fas fa-times text-xl"></i>
            </button>
        </div>
    </div>
);

// Optional Body component for use inside Modal
export const ModalBody: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
    <div className={`p-6 overflow-y-auto ${className}`}>
        {children}
    </div>
);

// Optional Footer component for use inside Modal
export const ModalFooter: React.FC<{ children: React.ReactNode; }> = ({ children }) => (
    <div className="p-6 bg-gray-50 border-t border-gray-200 rounded-b-xl flex-shrink-0">
        {children}
    </div>
);


export default Modal;