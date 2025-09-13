
import React from 'react';
import { CompanyAsset, Employee } from '../../../types';
import Modal, { ModalHeader, ModalBody, ModalFooter } from '../../../components/Modal';

interface AssignAssetModalProps {
  isOpen: boolean;
  onClose: () => void;
  asset: CompanyAsset;
  employees: Employee[];
}

const AssignAssetModal: React.FC<AssignAssetModalProps> = ({ isOpen, onClose, asset, employees }) => {

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    alert(`تم تسليم الأصل ${asset.name} بنجاح!`);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalHeader title="تسليم أصل" subtitle={`الأصل: ${asset.name} (${asset.serialNumber})`} onClose={onClose} />
      <ModalBody>
        <form id="assign-asset-form" className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">تسليم إلى الموظف</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500">
              <option>اختر موظفًا</option>
              {employees.map(emp => (
                <option key={emp.id} value={emp.id}>{`${emp.firstName} ${emp.lastName}`}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">تاريخ التسليم</label>
            <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" defaultValue={new Date().toISOString().substring(0, 10)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">ملاحظات (اختياري)</label>
            <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="مثال: تم تسليم الأصل مع الشاحن والحقيبة..."></textarea>
          </div>
        </form>
      </ModalBody>
      <ModalFooter>
        <div className="flex justify-end space-x-3 space-x-reverse">
          <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
            إلغاء
          </button>
          <button type="submit" form="assign-asset-form" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            تأكيد التسليم
          </button>
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default AssignAssetModal;
