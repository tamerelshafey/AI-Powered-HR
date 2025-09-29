
import React, { useState } from 'react';
import Modal, { ModalBody, ModalFooter } from '../../../components/Modal';
import { useI18n } from '../../../context/I18nContext';

interface ApplyAnnualRaiseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ApplyAnnualRaiseModal: React.FC<ApplyAnnualRaiseModalProps> = ({ isOpen, onClose }) => {
  const { t } = useI18n();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleApplyRaise = () => {
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
    }, 2000);
  };

  const handleClose = () => {
    onClose();
    // Reset state after a delay for the animation
    setTimeout(() => {
        setIsProcessing(false);
        setIsComplete(false);
    }, 300);
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="lg">
      <ModalBody>
        <div className="text-center">
            {isComplete ? (
                <>
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full mx-auto flex items-center justify-center mb-4">
                        <i className="fas fa-check-circle text-3xl"></i>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{t('annualRaise.successTitle')}</h3>
                    <p className="text-gray-600 mt-3">{t('annualRaise.successMessage')}</p>
                </>
            ) : isProcessing ? (
                <>
                    <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4">
                       <i className="fas fa-spinner fa-spin text-blue-600 text-3xl"></i>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{t('annualRaise.processingTitle')}</h3>
                    <p className="text-gray-600 mt-3">{t('annualRaise.processingMessage')}</p>
                </>
            ) : (
                <>
                    <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full mx-auto flex items-center justify-center mb-4">
                        <i className="fas fa-rocket text-3xl"></i>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{t('annualRaise.title')}</h3>
                    <p className="text-gray-600 mt-3">{t('annualRaise.message')}</p>
                    <p className="text-sm text-gray-500 mt-2">{t('annualRaise.irreversible')}</p>
                </>
            )}
        </div>
      </ModalBody>
      <ModalFooter>
         <div className="flex justify-center space-x-4 space-x-reverse">
            {isComplete ? (
                 <button 
                    type="button" 
                    onClick={handleClose} 
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                    {t('common.close')}
                </button>
            ) : (
                <>
                    <button 
                        type="button" 
                        onClick={handleClose} 
                        disabled={isProcessing}
                        className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors font-medium disabled:opacity-50"
                    >
                        {t('common.cancel')}
                    </button>
                    <button 
                        type="button" 
                        onClick={handleApplyRaise} 
                        disabled={isProcessing}
                        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50"
                    >
                        {isProcessing ? t('annualRaise.running') : t('annualRaise.confirmRun')}
                    </button>
                </>
            )}
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default ApplyAnnualRaiseModal;
