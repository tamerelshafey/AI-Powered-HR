
import React, { useRef, useEffect } from 'react';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { useModalAccessibility } from '../hooks/useModalAccessibility';

interface UpdateNotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoToSettings: () => void;
}

const UpdateNotificationModal: React.FC<UpdateNotificationModalProps> = ({ isOpen, onClose, onGoToSettings }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useFocusTrap(modalRef, isOpen);
  useModalAccessibility(isOpen, onClose);


  if (!isOpen) return null;

  return (
    <div 
        className="fixed inset-0 bg-black bg-opacity-50 modal-backdrop z-[100] flex items-center justify-center p-4 animate-modal-fade-in" 
        onClick={onClose} 
        role="dialog" 
        aria-modal="true" 
        aria-labelledby="update-notification-title"
    >
      <div 
        ref={modalRef}
        className="bg-white rounded-xl shadow-xl max-w-lg w-full" 
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6 text-center">
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
        
        <div className="flex justify-center space-x-4 space-x-reverse p-6 bg-gray-50 rounded-b-xl border-t">
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
      </div>
    </div>
  );
};

export default UpdateNotificationModal;