import React from 'react';
import { OnboardingProcess, ProcessStatus } from '../../../types';
import { PROCESS_STATUS_CLASSES } from '../../../utils/styleUtils';

interface ProcessListItemProps {
  process: OnboardingProcess;
  onViewChecklist: (process: OnboardingProcess) => void;
}

const ProcessListItem: React.FC<ProcessListItemProps> = ({ process, onViewChecklist }) => {
    return (
        <div className="bg-white rounded-lg border border-gray-200 hover:bg-gray-50 w-full h-full">
            {/* Mobile View */}
            <div className="md:hidden p-4 space-y-3">
                 <div className="flex items-start justify-between">
                    <div className="flex items-center">
                        <div className={`w-8 h-8 ${process.employee.avatarColor} rounded-full flex items-center justify-center me-3 flex-shrink-0`}>
                            <span className="text-white text-xs font-medium">{process.employee.avatarInitials}</span>
                        </div>
                        <div>
                            <div className="text-sm font-medium text-gray-900">{`${process.employee.firstName} ${process.employee.lastName}`}</div>
                            <div className="text-sm text-gray-500">{process.date}</div>
                        </div>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${PROCESS_STATUS_CLASSES[process.status]}`}>
                        {process.status}
                    </span>
                </div>
                <div>
                    <div className="flex items-center">
                        <span className="text-sm text-gray-600 me-3">{process.progress}%</span>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className={`${process.status === ProcessStatus.COMPLETED ? 'bg-green-600' : 'bg-blue-600'} h-2 rounded-full`} style={{ width: `${process.progress}%` }}></div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end pt-2 text-sm font-medium">
                    <button onClick={() => onViewChecklist(process)} className="text-blue-600 hover:text-blue-900">عرض قائمة المهام</button>
                </div>
            </div>
            
            {/* Desktop View */}
            <div className={`hidden md:flex items-center w-full h-full px-6 ${process.status === ProcessStatus.COMPLETED ? 'bg-green-50' : ''}`}>
                <div className="w-1/3 flex items-center">
                    <div className={`w-8 h-8 ${process.employee.avatarColor} rounded-full flex items-center justify-center me-3 flex-shrink-0`}>
                        <span className="text-white text-xs font-medium">{process.employee.avatarInitials}</span>
                    </div>
                    <div>
                        <div className="text-sm font-medium text-gray-900">{`${process.employee.firstName} ${process.employee.lastName}`}</div>
                        <div className="text-sm text-gray-500">{process.employee.jobTitle}</div>
                    </div>
                </div>
                <div className="w-1/6 text-sm text-gray-900">{process.date}</div>
                <div className="w-1/4">
                    <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2 me-3">
                            <div className={`${process.status === ProcessStatus.COMPLETED ? 'bg-green-600' : 'bg-blue-600'} h-2 rounded-full`} style={{ width: `${process.progress}%` }}></div>
                        </div>
                        <span className="text-sm text-gray-600">{process.progress}%</span>
                    </div>
                </div>
                <div className="w-1/6">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${PROCESS_STATUS_CLASSES[process.status]}`}>
                        {process.status}
                    </span>
                </div>
                <div className="w-1/6 text-sm font-medium">
                    <button onClick={() => onViewChecklist(process)} className="text-blue-600 hover:text-blue-900">عرض قائمة المهام</button>
                </div>
            </div>
        </div>
    );
};

export default ProcessListItem;
