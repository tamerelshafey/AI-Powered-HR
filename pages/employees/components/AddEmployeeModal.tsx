import React, { useState } from 'react';
import { UserRole, Employee, EmployeeStatus, OnlineStatus, Branch } from '../../../types';
import { useI18n } from '../../../context/I18nContext';
import Modal, { ModalHeader, ModalBody, ModalFooter } from '../../../components/Modal';

interface AddEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddEmployee: (employeeData: Omit<Employee, 'id'>) => void;
  branches: Branch[];
}

const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({ isOpen, onClose, onAddEmployee, branches }) => {
  const { t } = useI18n();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    department: 'قسم الهندسة',
    jobTitle: '',
    role: UserRole.EMPLOYEE,
    hireDate: new Date().toISOString().split('T')[0],
    dateOfBirth: '',
    branch: branches[0]?.name || '',
    isPersonWithDisability: false,
  });
  const [ageError, setAgeError] = useState<string | null>(null);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    const isCheckbox = type === 'checkbox';
    const checked = isCheckbox ? (e.target as HTMLInputElement).checked : undefined;

    setFormData(prev => ({ ...prev, [name]: isCheckbox ? checked : value }));

    if (name === 'dateOfBirth') {
        validateAge(value);
    }
  };
  
  const validateAge = (dob: string) => {
    if (!dob) {
        setAgeError(null);
        return;
    }
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    if (age < 14) {
        setAgeError('لا يمكن تعيين موظف تحت سن 14 عامًا وفقًا للقانون.');
    } else if (age >= 14 && age < 15) {
        setAgeError('تحذير: سيتم تعيين الموظف كـ "متدرب" ويخضع لقيود ساعات العمل.');
        setFormData(prev => ({ ...prev, role: UserRole.TRAINEE }));
    } else {
        setAgeError(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ageError && !ageError.startsWith('تحذير')) {
        alert(ageError);
        return;
    }

    const avatarColors = ['bg-blue-500', 'bg-purple-500', 'bg-green-500', 'bg-red-500', 'bg-indigo-500', 'bg-pink-500'];
    const randomColor = avatarColors[Math.floor(Math.random() * avatarColors.length)];

    const employeeData: Omit<Employee, 'id'> = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        avatar: `https://i.pravatar.cc/150?u=EMP${Date.now().toString().slice(-6)}`,
        avatarInitials: `${formData.firstName[0] || ''}${formData.lastName[0] || ''}`.toUpperCase(),
        avatarColor: randomColor,
        jobTitle: formData.jobTitle,
        department: formData.department,
        branch: formData.branch,
        status: EmployeeStatus.ACTIVE,
        onlineStatus: OnlineStatus.OFFLINE,
        role: formData.role as UserRole,
        dateOfBirth: formData.dateOfBirth,
        hireDate: formData.hireDate,
        isPersonWithDisability: formData.isPersonWithDisability,
        maternityLeavesTaken: 0
    };

    onAddEmployee(employeeData);
    onClose();
  };

  const modalFooter = (
    <div className="flex justify-end space-x-3 space-x-reverse">
      <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
        {t('common.cancel')}
      </button>
      <button type="submit" form="add-employee-form" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
        {t('page.employees.addModal.addEmployee')}
      </button>
    </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalHeader title={t('page.employees.addModal.title')} onClose={onClose} />
        <ModalBody>
            <form id="add-employee-form" className="space-y-6" onSubmit={handleSubmit}>
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
                        <label className="block text-sm font-medium text-gray-700 mb-2">تاريخ الميلاد</label>
                        <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
                        {ageError && <p className={`text-xs mt-1 ${ageError.startsWith('تحذير') ? 'text-yellow-600' : 'text-red-600'}`}>{ageError}</p>}
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">{t('page.employees.addModal.startDate')}</label>
                        <input type="date" name="hireDate" value={formData.hireDate} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
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
                        <label className="block text-sm font-medium text-gray-700 mb-2">{t('page.employees.addModal.jobTitle')}</label>
                        <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required/>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">الفرع</label>
                        <select name="branch" value={formData.branch} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required>
                            {branches.map(branch => <option key={branch.id} value={branch.name}>{branch.name}</option>)}
                        </select>
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
                        <label className="block text-sm font-medium text-gray-700 mb-2">{t('page.employees.addModal.userRole')}</label>
                        <select name="role" value={formData.role} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required>
                            {Object.values(UserRole).map(role => (
                                <option key={role} value={role}>{t(`enum.userRole.${role}`)}</option>
                            ))}
                        </select>
                    </div>
                    <div className="md:col-span-2 flex items-center pt-2">
                        <input type="checkbox" id="isPersonWithDisability" name="isPersonWithDisability" checked={formData.isPersonWithDisability} onChange={handleInputChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"/>
                        <label htmlFor="isPersonWithDisability" className="ms-2 block text-sm text-gray-900">الموظف من ذوي الاحتياجات الخاصة (يؤثر على رصيد الإجازات)</label>
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

export default AddEmployeeModal;