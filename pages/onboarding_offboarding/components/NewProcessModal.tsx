import React, { useState, useEffect } from 'react';
import { Employee, ProcessType, OnboardingProcess, ProcessStatus, Candidate, EmployeeStatus, OnlineStatus, UserRole } from '../../../types';

interface NewProcessModalProps {
  isOpen: boolean;
  onClose: () => void;
  processType: ProcessType;
  employees: Employee[];
  newHire: Candidate | Employee | null;
  onCreateProcess: (newProcess: Omit<OnboardingProcess, 'id' | 'tasks' | 'progress'>) => void;
}

const NewProcessModal: React.FC<NewProcessModalProps> = ({ isOpen, onClose, processType, employees, newHire, onCreateProcess }) => {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
  const [manager, setManager] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    if (newHire) {
      // Check if newHire is a candidate or an employee
      const newHireFullName = 'name' in newHire ? newHire.name : `${newHire.firstName} ${newHire.lastName}`;
      const employeeMatch = employees.find(e => e.id === newHire.id || `${e.firstName} ${e.lastName}` === newHireFullName);
      if (employeeMatch) {
        setSelectedEmployeeId(employeeMatch.id);
      }
    }
  }, [newHire, employees]);

  if (!isOpen) return null;

  const isOnboarding = processType === ProcessType.ONBOARDING;
  const title = isOnboarding ? 'بدء عملية تعيين جديدة' : 'بدء عملية فصل جديدة';
  const dateLabel = isOnboarding ? 'تاريخ البدء' : 'تاريخ الانتهاء';

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // If it's a candidate, transform it into a full Employee object.
    // If it's an employee, use it directly.
    const selectedEmployee = newHire
      ? 'name' in newHire // is a Candidate
        ? {
            id: newHire.id,
            firstName: newHire.name.split(' ')[0],
            lastName: newHire.name.split(' ').slice(1).join(' '),
            avatarColor: newHire.avatarColor,
            avatarInitials: newHire.avatarInitials,
            jobTitle: newHire.positionApplied,
            department: 'غير محدد', // Placeholder, ideally this would come from the job posting
            status: EmployeeStatus.ACTIVE,
            onlineStatus: OnlineStatus.OFFLINE,
            role: UserRole.EMPLOYEE,
          }
        : newHire // is an Employee
      : employees.find(e => e.id === selectedEmployeeId);

    if (!selectedEmployee || !manager || !date) {
        alert('يرجى ملء جميع الحقول المطلوبة.');
        return;
    }

    onCreateProcess({
        employee: selectedEmployee,
        type: processType,
        date,
        manager,
        status: ProcessStatus.IN_PROGRESS,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 modal-backdrop z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>
        </div>
        
        <form className="p-6 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">الموظف</label>
            {newHire ? (
                <div className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-100 text-gray-700">
                    {'name' in newHire ? newHire.name : `${newHire.firstName} ${newHire.lastName}`}
                </div>
            ) : (
                <select 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500"
                    value={selectedEmployeeId}
                    onChange={(e) => setSelectedEmployeeId(e.target.value)}
                    required
                >
                    <option value="">اختر موظفًا</option>
                    {employees.map(emp => (
                    <option key={emp.id} value={emp.id}>{`${emp.firstName} ${emp.lastName}`}</option>
                    ))}
                </select>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">المدير المسؤول</label>
              <input 
                type="text" 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                value={manager}
                onChange={(e) => setManager(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{dateLabel}</label>
              <input 
                type="date" 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 space-x-reverse pt-6 border-t border-gray-200">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              إلغاء
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              بدء العملية
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewProcessModal;