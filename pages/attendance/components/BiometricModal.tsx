
import React, { useState } from 'react';
import { useI18n } from '../../../context/I18nContext';
import Modal, { ModalHeader, ModalBody } from '../../../components/Modal';

interface BiometricModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BiometricModal: React.FC<BiometricModalProps> = ({ isOpen, onClose }) => {
    const [status, setStatus] = useState<'idle' | 'scanning' | 'success'>('idle');
    const { t } = useI18n();

    const handleClose = () => {
        if (status !== 'scanning') {
            onClose();
            setStatus('idle');
        }
    }

    const handleSimulateScan = () => {
        setStatus('scanning');
        setTimeout(() => {
            setStatus('success');
            setTimeout(() => {
                onClose();
                setStatus('idle');
            }, 1500);
        }, 2000);
    };
    
    const statusText = {
        idle: { title: t('page.attendance.biometricModal.status.idle'), description: t('page.attendance.biometricModal.description.idle') },
        scanning: { title: t('page.attendance.biometricModal.status.scanning'), description: t('page.attendance.biometricModal.description.scanning') },
        success: { title: t('page.attendance.biometricModal.status.success'), description: t('page.attendance.biometricModal.description.success') }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            size="md"
        >
            <ModalHeader title={t('page.attendance.biometricModal.title')} onClose={handleClose} />
            <ModalBody>
                <div className="text-center">
                    <div className={`biometric-scanner w-32 h-32 rounded-full mx-auto mb-6 flex items-center justify-center transition-all duration-300 ${status === 'success' ? '!bg-green-500 !shadow-none !animate-none' : ''}`}>
                        {status === 'success' ? <i className="fas fa-check text-white text-4xl"></i> : <i className="fas fa-fingerprint text-white text-4xl"></i>}
                    </div>
                    <h4 className="text-lg font-medium text-gray-900 mb-2">{statusText[status].title}</h4>
                    <p className="text-gray-600 mb-6">{statusText[status].description}</p>
                    
                    <div className="space-y-3">
                        <button onClick={handleSimulateScan} disabled={status !== 'idle'} className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed">
                            {status === 'idle' ? t('page.attendance.biometricModal.simulateScan') : t('page.attendance.biometricModal.processing')}
                        </button>
                        <button onClick={handleClose} disabled={status === 'scanning'} className="w-full px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:bg-gray-200 disabled:cursor-not-allowed">
                            {t('common.cancel')}
                        </button>
                    </div>
                </div>
            </ModalBody>
        </Modal>
    );
};

export default BiometricModal;