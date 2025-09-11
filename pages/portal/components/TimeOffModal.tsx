
import React from 'react';

interface TimeOffModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TimeOffModal: React.FC<TimeOffModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('تم تقديم طلب الإجازة بنجاح!');
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 modal-backdrop z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full" onClick={e => e.stopPropagation()}>
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">طلب إجازة</h3>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><i className="fas fa-times text-xl"></i></button>
                    </div>
                </div>
                <form className="p-6 space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">نوع الطلب</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white"><option>إجازة سنوية</option><option>إجازة مرضية</option></select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">تاريخ البدء</label>
                            <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">تاريخ الانتهاء</label>
                            <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg"/>
                        </div>
                    </div>
                     <div className="flex justify-end space-x-3 space-x-reverse mt-6 pt-6 border-t border-gray-200">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">إلغاء</button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">تقديم الطلب</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TimeOffModal;
