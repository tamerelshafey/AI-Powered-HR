import React, { useState, useEffect } from 'react';
import { CompanyAsset, Employee } from '../../../../types';
import { getAvailableAssets } from '../../../../services/api';

interface AssignAssetToEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee: Employee;
}

const AssignAssetToEmployeeModal: React.FC<AssignAssetToEmployeeModalProps> = ({ isOpen, onClose, employee }) => {
  const [availableAssets, setAvailableAssets] = useState<CompanyAsset[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssets = async () => {
        setLoading(true);
        try {
            const data = await getAvailableAssets();
            setAvailableAssets(data);
        } catch (error) {
            console.error("Failed to fetch available assets", error);
        } finally {
            setLoading(false);
        }
    };
    if (isOpen) {
        fetchAssets();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    alert(`تم تسليم الأصل للموظف ${employee.firstName} ${employee.lastName}!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 modal-backdrop z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
             <div>
                <h3 className="text-lg font-semibold text-gray-900">تسليم أصل جديد</h3>
                <p className="text-sm text-gray-600">تسليم إلى: {employee.firstName} {employee.lastName}</p>
             </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>
        </div>
        
        <form className="p-6 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">الأصل المتاح</label>
            {loading ? (
                <div className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-100 text-gray-700">
                    جاري تحميل الأصول المتاحة...
                </div>
            ) : (
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500">
                <option>اختر أصلاً</option>
                {availableAssets.map(asset => (
                    <option key={asset.id} value={asset.id}>{`${asset.name} (${asset.serialNumber})`}</option>
                ))}
                </select>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">تاريخ التسليم</label>
            <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" defaultValue={new Date().toISOString().substring(0, 10)} />
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

export default AssignAssetToEmployeeModal;