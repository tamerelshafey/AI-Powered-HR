
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { leaveTypeSettingsData } from '../../settings/data';
import { LeaveTypeSetting } from '../../../types';
import { useFocusTrap } from '../../../hooks/useFocusTrap';
import { useI18n } from '../../../context/I18nContext';

interface LeaveRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LeaveRequestModal: React.FC<LeaveRequestModalProps> = ({ isOpen, onClose }) => {
  const [selectedLeaveType, setSelectedLeaveType] = useState<LeaveTypeSetting | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const { t } = useI18n();
  useFocusTrap(modalRef, isOpen);
  
  useEffect(() => {
    const appRoot = document.getElementById('root');
    if (isOpen) {
        appRoot?.setAttribute('aria-hidden', 'true');
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    } else {
        appRoot?.removeAttribute('aria-hidden');
    }
  }, [isOpen, onClose]);


  if (!isOpen) return null;

  const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      alert('تم تقديم طلب الإجازة بنجاح!');
      onClose();
  }

  const handleLeaveTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedType = leaveTypeSettingsData.find(lt => lt.name === event.target.value) || null;
    setSelectedLeaveType(selectedType);
  };

  const infoMessage = useMemo(() => {
    if (!selectedLeaveType) return null;
    let messages = [];
    if (selectedLeaveType.isDeductedFromAnnual) {
      messages.push(t('page.leaves.requestModal.info.deducted'));
    }
    if (selectedLeaveType.eligibilityYears) {
      messages.push(t('page.leaves.requestModal.info.eligibility', { years: selectedLeaveType.eligibilityYears }));
    }
    if (selectedLeaveType.maxTimesInService === 1) {
      messages.push(t('page.leaves.requestModal.info.once'));
    }
    return messages.join(' ');
  }, [selectedLeaveType, t]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 modal-backdrop z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        ref={modalRef}
        className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" 
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="leave-request-modal-title"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 id="leave-request-modal-title" className="text-lg font-semibold text-gray-900">{t('page.leaves.requestModal.title')}</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600" aria-label={t('common.close')}>
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>
        </div>
        
        <form className="p-6 space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('page.leaves.requestModal.leaveType')}</label>
              <select 
                onChange={handleLeaveTypeChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">{t('page.leaves.requestModal.selectLeaveType')}</option>
                {leaveTypeSettingsData.map(lt => (
                  <option key={lt.id} value={lt.name}>{t(`enum.leaveType.${lt.name}`)}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('page.leaves.requestModal.duration')}</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>{t('page.leaves.requestModal.duration.full')}</option>
                <option>{t('page.leaves.requestModal.duration.halfAm')}</option>
                <option>{t('page.leaves.requestModal.duration.halfPm')}</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('page.leaves.requestModal.startDate')}</label>
              <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('page.leaves.requestModal.endDate')}</label>
              <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>
          </div>

          {infoMessage && (
            <div className="p-3 bg-blue-50 border-s-4 border-blue-500 text-blue-800 text-sm rounded-e-lg">
              <i className="fas fa-info-circle me-2"></i>
              {infoMessage}
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t('page.leaves.requestModal.reason')}</label>
            <textarea rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder={t('page.leaves.requestModal.reasonPlaceholder')}></textarea>
          </div>

          <div className="flex justify-end space-x-3 space-x-reverse pt-6 border-t border-gray-200">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              {t('common.cancel')}
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              {t('page.leaves.requestModal.submit')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeaveRequestModal;
