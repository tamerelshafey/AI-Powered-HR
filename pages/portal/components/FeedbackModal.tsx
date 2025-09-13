
import React from 'react';
import Modal, { ModalHeader, ModalBody, ModalFooter } from '../../../components/Modal';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose }) => {

     const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('شكراً لملاحظاتك!');
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="md">
            <ModalHeader title="مشاركة الملاحظات" onClose={onClose} />
            <ModalBody>
                <form id="feedback-form" className="space-y-4" onSubmit={handleSubmit}>
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
                </form>
            </ModalBody>
            <ModalFooter>
                <div className="flex justify-end space-x-3 space-x-reverse">
                    <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">إلغاء</button>
                    <button type="submit" form="feedback-form" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">إرسال</button>
                </div>
            </ModalFooter>
        </Modal>
    );
};

export default FeedbackModal;
