import React, { useRef } from 'react';
import { Branch } from '../../../types';
import useOnScreen from '../../../hooks/useOnScreen';

interface BranchCardProps {
    branch: Branch;
    onEdit: () => void;
}

const BranchCard: React.FC<BranchCardProps> = ({ branch, onEdit }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const isVisible = useOnScreen(cardRef, '100px');

    return (
        <div ref={cardRef} className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col hover:shadow-lg transition-shadow duration-300">
            <div className="p-6">
                <div className="flex items-start justify-between">
                    <div>
                        <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mb-3">
                            <i className="fas fa-building text-2xl"></i>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">{branch.name}</h3>
                        <p className="text-sm text-gray-500">{branch.location}</p>
                    </div>
                     <button onClick={onEdit} className="p-2 text-gray-400 hover:text-gray-600" aria-label={`Edit ${branch.name}`}>
                        <i className="fas fa-pencil-alt"></i>
                    </button>
                </div>
                <div className="mt-4">
                    <p className="text-sm text-gray-500 mb-1">المدير المسؤول</p>
                    <div className="flex items-center space-x-2 space-x-reverse">
                        <div
                            className={`w-8 h-8 ${branch.manager.avatarColor} rounded-full flex items-center justify-center flex-shrink-0 bg-cover bg-center`}
                            style={{ backgroundImage: isVisible && branch.manager.avatar ? `url(${branch.manager.avatar})` : 'none' }}
                        >
                            {(!isVisible || !branch.manager.avatar) && (
                                <span className="text-white text-xs font-medium">{branch.manager.avatarInitials}</span>
                            )}
                        </div>
                        <div>
                            <p className="font-medium text-gray-800">{`${branch.manager.firstName} ${branch.manager.lastName}`}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-auto p-4 bg-gray-50 rounded-b-xl border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-600">
                    <i className="fas fa-users me-2"></i>
                    <span>{branch.employeeCount} موظف</span>
                </div>
                 <button className="text-sm text-blue-600 font-medium hover:underline">
                    عرض التفاصيل
                </button>
            </div>
        </div>
    );
};

export default BranchCard;