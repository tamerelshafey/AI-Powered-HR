
import React from 'react';
import { OnboardingProcess, ProcessStatus } from '../../../types';
import { PROCESS_STATUS_CLASSES } from '../../../utils/styleUtils';

interface ProcessTableProps {
  processes: OnboardingProcess[];
  onViewChecklist: (process: OnboardingProcess) => void;
}

const ProcessTable: React.FC<ProcessTableProps> = ({ processes, onViewChecklist }) => (
    <div>
        {/* Mobile View */}
        <div className="md:hidden">
            <div className="p-4 space-y-4">
                {processes.map(process => (
                    <div key={process.id} className={`border rounded-lg p-4 space-y-3 ${process.status === ProcessStatus.COMPLETED ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
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
                ))}
            </div>
        </div>
        
        {/* Desktop View */}
        <div className="overflow-x-auto hidden md:block">
            <table className="w-full">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">الموظف</th>
                        <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">التاريخ</th>
                        <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">التقدم</th>
                        <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">الحالة</th>
                        <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">الإجراءات</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {processes.map(process => (
                        <tr key={process.id} className={`${process.status === ProcessStatus.COMPLETED ? 'bg-green-50' : 'hover:bg-gray-50'}`}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div className={`w-8 h-8 ${process.employee.avatarColor} rounded-full flex items-center justify-center me-3 flex-shrink-0`}>
                                        <span className="text-white text-xs font-medium">{process.employee.avatarInitials}</span>
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-gray-900">{`${process.employee.firstName} ${process.employee.lastName}`}</div>
                                        <div className="text-sm text-gray-500">{process.employee.jobTitle}</div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{process.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div className="w-full bg-gray-200 rounded-full h-2 me-3">
                                        <div className={`${process.status === ProcessStatus.COMPLETED ? 'bg-green-600' : 'bg-blue-600'} h-2 rounded-full`} style={{ width: `${process.progress}%` }}></div>
                                    </div>
                                    <span className="text-sm text-gray-600">{process.progress}%</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${PROCESS_STATUS_CLASSES[process.status]}`}>
                                    {process.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <button onClick={() => onViewChecklist(process)} className="text-blue-600 hover:text-blue-900">عرض قائمة المهام</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        
        {processes.length === 0 && (
            <div className="text-center py-12 text-gray-500">
                <i className="fas fa-folder-open text-4xl mb-3"></i>
                <p>لا توجد عمليات لعرضها.</p>
            </div>
        )}
    </div>
);

export default ProcessTable;
