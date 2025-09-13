import React from 'react';
import { EmployeeEnrollment } from '../../../types';
import { ENROLLMENT_STATUS_CLASSES } from '../../../utils/styleUtils';

interface EnrollmentListItemProps {
    enrollment: EmployeeEnrollment;
}

const EnrollmentListItem: React.FC<EnrollmentListItemProps> = ({ enrollment: enr }) => {
    return (
        <div className="bg-white rounded-lg border border-gray-200 hover:bg-gray-50 w-full h-full">
            {/* Mobile View */}
            <div className="md:hidden p-4 space-y-3">
                <div className="flex items-start justify-between">
                    <div className="flex items-center">
                        <div className={`w-8 h-8 ${enr.employee.avatarColor} rounded-full flex items-center justify-center me-3 flex-shrink-0`}>
                            <span className="text-white text-xs font-medium">{enr.employee.avatarInitials}</span>
                        </div>
                        <div>
                            <div className="text-sm font-medium text-gray-900">{`${enr.employee.firstName} ${enr.employee.lastName}`}</div>
                            <div className="text-sm text-gray-500">{enr.course.title}</div>
                        </div>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${ENROLLMENT_STATUS_CLASSES[enr.status]}`}>
                        {enr.status}
                    </span>
                </div>
                <div>
                    <div className="flex items-center">
                        <span className="text-sm text-gray-600 me-3 w-10">{enr.progress}%</span>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${enr.progress}%` }}></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Desktop View */}
            <div className="hidden md:flex items-center w-full h-full px-6">
                <div className="w-1/3 flex items-center">
                    <div className={`w-8 h-8 ${enr.employee.avatarColor} rounded-full flex items-center justify-center me-3 flex-shrink-0`}>
                        <span className="text-white text-xs font-medium">{enr.employee.avatarInitials}</span>
                    </div>
                    <div>
                        <div className="text-sm font-medium text-gray-900">{`${enr.employee.firstName} ${enr.employee.lastName}`}</div>
                    </div>
                </div>
                <div className="w-1/3 text-sm text-gray-900">{enr.course.title}</div>
                <div className="w-1/4">
                    <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2 me-3">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${enr.progress}%` }}></div>
                        </div>
                        <span className="text-sm text-gray-600">{enr.progress}%</span>
                    </div>
                </div>
                <div className="w-1/6">
                     <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${ENROLLMENT_STATUS_CLASSES[enr.status]}`}>
                        {enr.status}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default EnrollmentListItem;