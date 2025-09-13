
import React from 'react';
import { AssetCategory } from '../../../types';
// FIX: Import Modal sub-components to structure the modal correctly.
import Modal, { ModalHeader, ModalBody, ModalFooter } from '../../../components/Modal';

interface AddAssetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddAssetModal: React.FC<AddAssetModalProps> = ({ isOpen, onClose }) => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    alert('تمت إضافة الأصل بنجاح!');
    onClose();
  };

  const modalFooter = (
    <div className="flex justify-end space-x-3 space-x-reverse">
      <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
        إلغاء
      </button>
      <button type="submit" form="add-asset-form" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
        إضافة الأصل
      </button>
    </div>
  );

  return (
    // FIX: Removed invalid 'title' and 'footer' props and used ModalHeader, ModalBody, and ModalFooter components.
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalHeader title="إضافة أصل جديد" onClose={onClose} />
      <ModalBody>
        <form id="add-asset-form" className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">اسم الأصل</label>
              <input type="text" placeholder="مثال: MacBook Pro 16" className="w-full px-3 py-2 border border-gray-300 rounded-lg" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">الفئة</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white">
                {Object.values(AssetCategory).map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">الرقم التسلسلي</label>
              <input type="text" placeholder="Serial Number" className="w-full px-3 py-2 border border-gray-300 rounded-lg" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">تاريخ الشراء</label>
              <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
            </div>
          </div>
        </form>
      </ModalBody>
      <ModalFooter>
        {modalFooter}
      </ModalFooter>
    </Modal>
  );
};

export default AddAssetModal;
