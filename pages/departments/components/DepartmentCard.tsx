import React from 'react';
import { Department } from '../../../types';

interface DepartmentCardProps {
    department: Department;
    onEdit: () => void;
}

const colorClasses: Record<string, { bg: string, text: string }> = {
    blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
    green: { bg: 'bg-green-100', text: 'text-green-600' },
    orange: { bg: 'bg-orange-100', text: 'text-orange-600' },
    red: { bg: 'bg-red-100', text: 'text-red-600' },
    purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
    teal: { bg: 'bg-teal-100', text: 'text-teal-600' },
};

const DepartmentCard: React.FC<DepartmentCardProps> = ({ department, onEdit }) => {
    const colors = colorClasses[department.color] || colorClasses.blue;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col hover:shadow-lg transition-shadow duration-300">
            <div className="p-6">
                <div className="flex items-start justify-between">
                    <div>
                        <div className={`w-12 h-12 ${colors.bg} rounded-lg flex items-center justify-center mb-3`}>
                            <i className={`${department.icon} ${colors.text} text-2xl`}></i>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">{department.name}</h3>
                    </div>
                     <button onClick={onEdit} className="p-2 text-gray-400 hover:text-gray-600" aria-label={`Edit ${department.name}`}>
                        <i className="fas fa-pencil-alt"></i>
                    </button>
                </div>
                <div className="mt-4">
                    <p className="text-sm text-gray-500 mb-1">المدير</p>
                    <div className="flex items-center space-x-2 space-x-reverse">
                         <div className={`w-8 h-8 ${department.manager.avatarColor} rounded-full flex items-center justify-center flex-shrink-0`}>
                            <span className="text-white text-xs font-medium">{department.manager.avatarInitials}</span>
                        </div>
                        <div>
                            <p className="font-medium text-gray-800">{`${department.manager.firstName} ${department.manager.lastName}`}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-auto p-4 bg-gray-50 rounded-b-xl border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-600">
                    <i className="fas fa-users me-2"></i>
                    <span>{department.employeeCount} موظف</span>
                </div>
                 <button className="text-sm text-blue-600 font-medium hover:underline">
                    عرض الموظفين
                </button>
            </div>
        </div>
    );
};

export default DepartmentCard;
