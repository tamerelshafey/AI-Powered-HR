
import React from 'react';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

     const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('شكراً لملاحظاتك!');
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 modal-backdrop z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full" onClick={e => e.stopPropagation()}>
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">مشاركة الملاحظات</h3>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><i className="fas fa-times text-xl"></i></button>
                    </div>
                </div>
                <form className="p-6 space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">الموضوع</label>
                        <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="موضوع موجز"/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">الرسالة</label>
                        <textarea rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="شارك أفكارك..."></textarea>
                    </div>
                     <div className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 me-2" />
                        <label className="text-sm text-gray-700">إرسال كمجهول</label>
                    </div>
                    <div className="flex justify-end space-x-3 space-x-reverse mt-6 pt-6 border-t border-gray-200">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">إلغاء</button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">إرسال</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FeedbackModal;
