
import React, { useState, useRef } from 'react';
import { CompanyGoal, Employee } from '../../../types';
import Modal, { ModalHeader, ModalBody, ModalFooter } from '../../../components/Modal';

interface AddGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddGoal: (goalData: Omit<CompanyGoal, 'id' | 'progress'>) => void;
  employees: Employee[];
}

const AddGoalModal: React.FC<AddGoalModalProps> = ({ isOpen, onClose, onAddGoal, employees }) => {
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('All');
  const [employeeId, setEmployeeId] = useState('');
  const [keyResults, setKeyResults] = useState<{ description: string }[]>( [{ description: '' }]);

  if (!isOpen) return null;

  const handleKeyResultChange = (index: number, value: string) => {
    const newKeyResults = [...keyResults];
    newKeyResults[index].description = value;
    setKeyResults(newKeyResults);
  };

  const addKeyResult = () => {
    setKeyResults([...keyResults, { description: '' }]);
  };

  const removeKeyResult = (index: number) => {
    setKeyResults(keyResults.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalKeyResults = keyResults
        .filter(kr => kr.description.trim() !== '')
        .map(kr => ({ description: kr.description, isCompleted: false }));

    if (!title || finalKeyResults.length === 0) {
        alert('يرجى إدخال عنوان وهدف رئيسي واحد على الأقل.');
        return;
    }

    onAddGoal({
        title,
        department,
        employeeId: department === 'employee' ? employeeId : undefined,
        keyResults: finalKeyResults
    });
  };
  
  const departments = Array.from(new Set(employees.map(e => e.department)));


  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalHeader title="إضافة هدف جديد" onClose={onClose} />
        <ModalBody>
            <form id="add-goal-form" className="space-y-6" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">عنوان الهدف</label>
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" required />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">إسناد إلى</label>
                        <select value={department} onChange={e => setDepartment(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white">
                            <option value="All">الشركة بأكملها</option>
                            {departments.map(dep => <option key={dep} value={dep}>{dep}</option>)}
                            <option value="employee">موظف محدد</option>
                        </select>
                    </div>
                    {department === 'employee' && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">اختر الموظف</label>
                            <select value={employeeId} onChange={e => setEmployeeId(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white" required>
                                <option value="">-- اختر --</option>
                                {employees.map(emp => <option key={emp.id} value={emp.id}>{`${emp.firstName} ${emp.lastName}`}</option>)}
                            </select>
                        </div>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">النتائج الرئيسية (Key Results)</label>
                    <div className="space-y-3">
                        {keyResults.map((kr, index) => (
                            <div key={index} className="flex items-center space-x-2 space-x-reverse">
                                <input
                                    type="text"
                                    value={kr.description}
                                    onChange={e => handleKeyResultChange(index, e.target.value)}
                                    placeholder={`النتيجة الرئيسية #${index + 1}`}
                                    className="flex-grow px-3 py-2 border border-gray-300 rounded-lg"
                                />
                                {keyResults.length > 1 && (
                                    <button type="button" onClick={() => removeKeyResult(index)} className="p-2 text-red-500 hover:text-red-700"><i className="fas fa-trash"></i></button>
                                )}
                            </div>
                        ))}
                    </div>
                    <button type="button" onClick={addKeyResult} className="mt-2 text-sm text-blue-600 hover:underline">
                        + إضافة نتيجة أخرى
                    </button>
                </div>
            </form>
        </ModalBody>
        <ModalFooter>
            <div className="flex justify-end space-x-3 space-x-reverse">
                <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">إلغاء</button>
                <button type="submit" form="add-goal-form" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">حفظ الهدف</button>
            </div>
        </ModalFooter>
      </Modal>
  );
};

export default AddGoalModal;
