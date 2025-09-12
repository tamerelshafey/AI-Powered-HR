
import React, { useRef, useEffect, useState } from 'react';
import { UserRole, Employee, EmployeeStatus, OnlineStatus } from '../../../types';
import { useFocusTrap } from '../../../hooks/useFocusTrap';
import { useI18n } from '../../../context/I18nContext';
import { useModalAccessibility } from '../../../hooks/useModalAccessibility';

interface AddEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddEmployee: (employee: Employee) => void;
}

const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({ isOpen, onClose, onAddEmployee }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { t } = useI18n();
  useFocusTrap(modalRef, isOpen);
  useModalAccessibility(isOpen, onClose);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    department: 'قسم الهندسة',
    jobTitle: '',
    role: UserRole.EMPLOYEE,
    startDate: new Date().toISOString().split('T')[0],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const avatarColors = ['bg-blue-500', 'bg-purple-500', 'bg-green-500', 'bg-red-500', 'bg-indigo-500', 'bg-pink-500'];
    const randomColor = avatarColors[Math.floor(Math.random() * avatarColors.length)];
    const newEmployee: Employee = {
        id: `EMP${Date.now().toString().slice(-4)}`,
        firstName: formData.firstName,
        lastName: formData.lastName,
        avatar: `https://i.pravatar.cc/150?u=EMP${Date.now().toString().slice(-4)}`,
        avatarInitials: `${formData.firstName[0] || ''}${formData.lastName[0] || ''}`.toUpperCase(),
        avatarColor: randomColor,
        jobTitle: formData.jobTitle,
        department: formData.department,
        status: EmployeeStatus.ACTIVE,
        onlineStatus: OnlineStatus.OFFLINE,
        role: formData.role as UserRole,
    };
    onAddEmployee(newEmployee);
    onClose();
  };


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 modal-backdrop z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        ref={modalRef}
        className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" 
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-employee-modal-title"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 id="add-employee-modal-title" className="text-lg font-semibold text-gray-900">{t('page.employees.addModal.title')}</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600" aria-label={t('common.close')}>
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>
        </div>

        <form className="p-6 space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('page.employees.addModal.firstName')}</label>
              <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('page.employees.addModal.lastName')}</label>
              <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('page.employees.addModal.email')}</label>
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('page.employees.addModal.phone')}</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('page.employees.addModal.department')}</label>
              <select name="department" value={formData.department} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required>
                <option>الهندسة</option>
                <option>التسويق</option>
                <option>المبيعات</option>
                <option>الموارد البشرية</option>
                <option>المالية</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('page.employees.addModal.jobTitle')}</label>
              <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required/>
            </div>
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('page.employees.addModal.userRole')}</label>
                <select name="role" value={formData.role} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required>
                    {Object.values(UserRole).map(role => (
                        <option key={role} value={role}>{t(`enum.userRole.${role}`)}</option>
                    ))}
                </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('page.employees.addModal.startDate')}</label>
              <input type="date" name="startDate" value={formData.startDate} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
            </div>
          </div>

          <div className="flex justify-end space-x-3 space-x-reverse pt-6 border-t border-gray-200">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              {t('common.cancel')}
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              {t('page.employees.addModal.addEmployee')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeeModal;