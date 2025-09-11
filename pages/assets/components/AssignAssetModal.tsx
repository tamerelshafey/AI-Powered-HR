import React from 'react';
import { CompanyAsset, Employee } from '../../../types';

interface AssignAssetModalProps {
  isOpen: boolean;
  onClose: () => void;
  asset: CompanyAsset;
  employees: Employee[];
}

const AssignAssetModal: React.FC<AssignAssetModalProps> = ({ isOpen, onClose, asset, employees }) => {
  if (!isOpen) return null;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    alert(`تم تسليم الأصل ${asset.name} بنجاح!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 modal-backdrop z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
             <div>
                <h3 className="text-lg font-semibold text-gray-900">تسليم أصل</h3>
                <p className="text-sm text-gray-600">الأصل: {asset.name} ({asset.serialNumber})</p>
             </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>
        </div>
        
        <form className="p-6 space-y-6" onSubmit={handleSubmit}>
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
          <div className="flex justify-end space-x-3 space-x-reverse pt-6 border-t border-gray-200">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
              إلغاء
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              تأكيد التسليم
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignAssetModal;