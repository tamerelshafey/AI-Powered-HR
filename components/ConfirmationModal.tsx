
import React from 'react';
import { useI18n } from '../context/I18nContext';
// FIX: Import ModalBody and ModalFooter to correctly structure the modal.
import Modal, { ModalBody, ModalFooter } from './Modal';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  confirmColor?: 'blue' | 'red' | 'green';
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm, title, message, confirmText, confirmColor = 'blue' }) => {
  const { t } = useI18n();
  
  const colorClasses = {
      blue: 'bg-blue-600 hover:bg-blue-700',
      red: 'bg-red-600 hover:bg-red-700',
      green: 'bg-green-600 hover:bg-green-700',
  };

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const modalFooter = (
    <div className="flex justify-center space-x-4 space-x-reverse">
      <button 
        type="button" 
        onClick={onClose} 
        className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors font-medium"
      >
        {t('common.cancel')}
      </button>
      <button 
        type="button" 
        onClick={handleConfirm} 
        className={`px-6 py-2 text-white rounded-lg transition-colors font-medium ${colorClasses[confirmColor]}`}
      >
        {confirmText || t('common.confirm')}
      </button>
    </div>
  );

  return (
    // FIX: Removed invalid 'footer' prop and used ModalBody and ModalFooter components.
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalBody>
        <div className="text-center">
          <div className="w-12 h-12 bg-yellow-100 text-yellow-500 rounded-full mx-auto flex items-center justify-center mb-4">
            <i className="fas fa-exclamation-triangle text-2xl"></i>
          </div>
          <h3 id="confirmation-modal-title" className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="text-gray-600 mt-2 text-sm">{message}</p>
        </div>
      </ModalBody>
      <ModalFooter>
        {modalFooter}
      </ModalFooter>
    </Modal>
  );
};

export default ConfirmationModal;
