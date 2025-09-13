
import React from 'react';
import Modal, { ModalBody, ModalFooter } from './Modal';

interface UpdateNotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoToSettings: () => void;
}

const UpdateNotificationModal: React.FC<UpdateNotificationModalProps> = ({ isOpen, onClose, onGoToSettings }) => {

  const modalBodyContent = (
    <div className="text-center">
        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full mx-auto flex items-center justify-center mb-4">
            <i className="fas fa-bullhorn text-3xl"></i>
        </div>
        <h3 id="update-notification-title" className="text-xl font-bold text-gray-900">تحديثات هامة: الامتثال لقانون العمل الجديد</h3>
        <p className="text-gray-600 mt-3">
            لقد قمنا بتحديث نظام 'بُكرة' ليتوافق تمامًا مع متطلبات قانون العمل المصري الجديد. تشمل التحديثات الرئيسية سياسات الإجازات السنوية، إجازة الوضع (الأمومة)، ومعدلات العمل الإضافي.
        </p>
            <p className="text-sm text-gray-500 mt-2">
            يمكنك مراجعة وتخصيص الإعدادات الجديدة لضمان توافقها مع سياسات شركتك الداخلية.
        </p>
    </div>
  );

  const modalFooterContent = (
     <div className="flex justify-center space-x-4 space-x-reverse">
            <button 
                type="button" 
                onClick={onClose} 
                className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors font-medium"
            >
                فهمت
            </button>
            <button 
                type="button" 
                onClick={onGoToSettings} 
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
                مراجعة الإعدادات
            </button>
        </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalBody>
            {modalBodyContent}
        </ModalBody>
        <ModalFooter>
            {modalFooterContent}
        </ModalFooter>
    </Modal>
  );
};

export default UpdateNotificationModal;
