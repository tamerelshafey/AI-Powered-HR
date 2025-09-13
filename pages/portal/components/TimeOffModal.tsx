
import React from 'react';
import Modal, { ModalHeader, ModalBody, ModalFooter } from '../../../components/Modal';

interface TimeOffModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TimeOffModal: React.FC<TimeOffModalProps> = ({ isOpen, onClose }) => {

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('تم تقديم طلب الإجازة بنجاح!');
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="md">
            <ModalHeader title="طلب إجازة" onClose={onClose} />
            <ModalBody>
                <form id="time-off-form" className="space-y-4" onSubmit={handleSubmit}>
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
                </form>
            </ModalBody>
            <ModalFooter>
                <div className="flex justify-end space-x-3 space-x-reverse">
                    <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">إلغاء</button>
                    <button type="submit" form="time-off-form" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">تقديم الطلب</button>
                </div>
            </ModalFooter>
        </Modal>
    );
};

export default TimeOffModal;
