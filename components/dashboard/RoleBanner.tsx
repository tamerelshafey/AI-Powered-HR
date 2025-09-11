
import React from 'react';
import { UserRole } from '../../types';

interface RoleBannerProps {
    role: UserRole;
}

const RoleBanner: React.FC<RoleBannerProps> = ({ role }) => {
    return (
        <div className="mb-6 p-4 bg-indigo-50 border-s-4 border-indigo-500 rounded-e-lg">
            <div className="flex items-center">
                <div className="flex-shrink-0">
                    <i className="fas fa-user-shield text-indigo-600 text-xl"></i>
                </div>
                <div className="ms-3">
                    <p className="text-sm text-indigo-800">
                        أنت تعرض لوحة التحكم حاليًا بصلاحيات: <span className="font-bold">{role}</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RoleBanner;
