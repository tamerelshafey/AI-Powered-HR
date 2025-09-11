
import React, { useState, useRef, useEffect } from 'react';
import { useFocusTrap } from '../../../hooks/useFocusTrap';
import { useI18n } from '../../../context/I18nContext';

interface BiometricModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BiometricModal: React.FC<BiometricModalProps> = ({ isOpen, onClose }) => {
    const [status, setStatus] = useState<'idle' | 'scanning' | 'success'>('idle');
    const modalRef = useRef<HTMLDivElement>(null);
    const { t } = useI18n();
    useFocusTrap(modalRef, isOpen);

    useEffect(() => {
        const appRoot = document.getElementById('root');
        if (isOpen) {
            appRoot?.setAttribute('aria-hidden', 'true');
            const handleKeyDown = (e: KeyboardEvent) => {
                if (e.key === 'Escape') {
                    handleClose();
                }
            };
            document.addEventListener('keydown', handleKeyDown);
            return () => document.removeEventListener('keydown', handleKeyDown);
        } else {
            appRoot?.removeAttribute('aria-hidden');
        }
    }, [isOpen, onClose]);

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

    const handleClose = () => {
        if (status !== 'scanning') {
            onClose();
            setStatus('idle');
        }
    }

    if (!isOpen) return null;
    
    const statusText = {
        idle: { title: t('page.attendance.biometricModal.status.idle'), description: t('page.attendance.biometricModal.description.idle') },
        scanning: { title: t('page.attendance.biometricModal.status.scanning'), description: t('page.attendance.biometricModal.description.scanning') },
        success: { title: t('page.attendance.biometricModal.status.success'), description: t('page.attendance.biometricModal.description.success') }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 modal-backdrop z-50 flex items-center justify-center p-4" onClick={handleClose}>
            <div 
                ref={modalRef}
                className="bg-white rounded-xl shadow-xl max-w-md w-full" 
                onClick={e => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="biometric-modal-title"
            >
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <h3 id="biometric-modal-title" className="text-lg font-semibold text-gray-900">{t('page.attendance.biometricModal.title')}</h3>
                        <button onClick={handleClose} className="text-gray-400 hover:text-gray-600" aria-label={t('common.close')}>
                            <i className="fas fa-times text-xl"></i>
                        </button>
                    </div>
                </div>
                
                <div className="p-6 text-center">
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
            </div>
        </div>
    );
};

export default BiometricModal;
