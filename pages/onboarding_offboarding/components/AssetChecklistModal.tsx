import React, { useState, useEffect } from 'react';
import { Employee, CompanyAsset, AssetStatus } from '../../../types';
import { getAvailableAssets, getCompanyAssets } from '../../../services/api';
import LoadingSpinner from '../../../components/LoadingSpinner';

interface AssetChecklistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  mode: 'assign' | 'retrieve';
  employee: Employee;
}

const AssetChecklistModal: React.FC<AssetChecklistModalProps> = ({ isOpen, onClose, onConfirm, mode, employee }) => {
  const [assets, setAssets] = useState<CompanyAsset[]>([]);
  const [selectedAssetIds, setSelectedAssetIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
        const fetchAssets = async () => {
            setLoading(true);
            try {
                const data = mode === 'assign' 
                    ? await getAvailableAssets()
                    : await getCompanyAssets(employee.id);
                setAssets(data);
            } catch (error) {
                console.error(`Failed to fetch assets for mode: ${mode}`, error);
            } finally {
                setLoading(false);
            }
        };
        fetchAssets();
    }
  }, [isOpen, mode, employee.id]);

  if (!isOpen) return null;
  
  const handleToggleAsset = (assetId: string) => {
    setSelectedAssetIds(prev => {
        const newSet = new Set(prev);
        if (newSet.has(assetId)) {
            newSet.delete(assetId);
        } else {
            newSet.add(assetId);
        }
        return newSet;
    });
  };

  const isAssignMode = mode === 'assign';
  const title = isAssignMode ? `تسليم أصول لـ ${employee.firstName}` : `استلام أصول من ${employee.firstName}`;
  const confirmButtonText = isAssignMode ? `تأكيد التسليم (${selectedAssetIds.size})` : `تأكيد الاستلام (${selectedAssetIds.size})`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 modal-backdrop z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>
        </div>
        
        <div className="p-6 overflow-y-auto">
            {loading ? (
                <div className="h-48"><LoadingSpinner/></div>
            ) : assets.length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                    <i className={`fas ${isAssignMode ? 'fa-check-circle' : 'fa-box-open'} text-3xl mb-2`}></i>
                    <p>{isAssignMode ? 'لا توجد أصول متاحة حاليًا.' : 'لا توجد أصول مسلمة لهذا الموظف.'}</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {assets.map(asset => (
                        <label key={asset.id} className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${selectedAssetIds.has(asset.id) ? 'bg-blue-50 border-blue-300' : 'bg-white hover:bg-gray-50'}`}>
                            <input 
                                type="checkbox"
                                checked={selectedAssetIds.has(asset.id)}
                                onChange={() => handleToggleAsset(asset.id)}
                                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 me-4"
                            />
                            <div>
                                <p className="font-medium text-gray-800">{asset.name}</p>
                                <p className="text-sm text-gray-500">{asset.serialNumber} - {asset.category}</p>
                            </div>
                        </label>
                    ))}
                </div>
            )}
        </div>

        <div className="p-6 border-t mt-auto bg-gray-50">
            <div className="flex justify-end space-x-3 space-x-reverse">
                <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100">
                  إلغاء
                </button>
                <button 
                    type="button" 
                    onClick={onConfirm}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
                    disabled={selectedAssetIds.size === 0 && assets.length > 0}
                >
                    {confirmButtonText}
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AssetChecklistModal;