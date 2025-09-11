import React from 'react';
import { Candidate } from '../../../types';

interface StartOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  candidate: Candidate | null;
}

const StartOnboardingModal: React.FC<StartOnboardingModalProps> = ({ isOpen, onClose, onConfirm, candidate }) => {
  if (!isOpen || !candidate) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 modal-backdrop z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full" onClick={e => e.stopPropagation()}>
        <div className="p-6 text-center">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full mx-auto flex items-center justify-center mb-4">
            <i className="fas fa-rocket text-2xl"></i>
          </div>
          <h3 className="text-lg font-semibold text-gray-900">بدء عملية التعيين؟</h3>
          <p className="text-gray-600 mt-2">
            تم نقل <span className="font-bold">{candidate.name}</span> إلى مرحلة التعيين. هل ترغب في بدء عملية التعيين الرسمية له الآن؟
          </p>
        </div>
        
        <div className="flex justify-center space-x-4 space-x-reverse p-6 bg-gray-50 rounded-b-xl">
          <button 
            type="button" 
            onClick={onClose} 
            className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
          >
            ليس الآن
          </button>
          <button 
            type="button" 
            onClick={onConfirm} 
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            نعم، ابدأ العملية
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartOnboardingModal;