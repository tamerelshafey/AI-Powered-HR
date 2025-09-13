
import React from 'react';
import { PublicHoliday } from '../../../types';
// FIX: Import Modal sub-components to structure the modal correctly.
import Modal, { ModalHeader, ModalBody, ModalFooter } from '../../../components/Modal';

interface PublicHolidayModalProps {
  isOpen: boolean;
  onClose: () => void;
  holiday: PublicHoliday | null;
}

const PublicHolidayModal: React.FC<PublicHolidayModalProps> = ({ isOpen, onClose, holiday }) => {
  if (!isOpen) return null;

  const isEditing = !!holiday;
  const title = isEditing ? 'تعديل عطلة رسمية' : 'إضافة عطلة رسمية جديدة';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('تم حفظ العطلة الرسمية!');
    onClose();
  };

  const modalFooter = (
    <div className="flex justify-end space-x-3 space-x-reverse">
      <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">إلغاء</button>
      <button type="submit" form="holiday-form" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">حفظ</button>
    </div>
  );

  return (
    // FIX: Removed invalid 'title' and 'footer' props and used ModalHeader, ModalBody, and ModalFooter components.
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
    >
      <ModalHeader title={title} onClose={onClose} />
      <ModalBody>
        <form id="holiday-form" className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">اسم العطلة</label>
            <input type="text" defaultValue={holiday?.name} className="w-full px-3 py-2 border border-gray-300 rounded-lg" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">التاريخ</label>
            <input type="date" defaultValue={holiday?.date} className="w-full px-3 py-2 border border-gray-300 rounded-lg" required />
          </div>
        </form>
      </ModalBody>
      <ModalFooter>
        {modalFooter}
      </ModalFooter>
    </Modal>
  );
};

export default PublicHolidayModal;
