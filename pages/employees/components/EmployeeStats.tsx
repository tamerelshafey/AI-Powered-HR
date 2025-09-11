
import React from 'react';
import StatsCard from '../../../components/dashboard/StatsCard';
import { Employee, EmployeeStatus, OnlineStatus } from '../../../types';

interface EmployeeStatsProps {
    employees: Employee[];
}

const EmployeeStats: React.FC<EmployeeStatsProps> = ({ employees }) => {
    const total = employees.length;
    const activeToday = employees.filter(e => e.onlineStatus !== OnlineStatus.OFFLINE).length;
    const onLeave = employees.filter(e => e.status === EmployeeStatus.ON_LEAVE).length;
    
    // This is just a placeholder, in a real scenario this would come from more detailed data
    const newThisMonth = employees.filter(e => e.id > 'EMP004').length; 

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard icon="fas fa-users" labelKey="employeeStats.totalEmployees" value={String(total)} iconBgColor="bg-blue-100" iconColor="text-blue-600" />
            <StatsCard icon="fas fa-user-check" labelKey="employeeStats.activeToday" value={String(activeToday)} iconBgColor="bg-green-100" iconColor="text-green-600" />
            <StatsCard icon="fas fa-user-plus" labelKey="employeeStats.newThisMonth" value={String(newThisMonth)} iconBgColor="bg-purple-100" iconColor="text-purple-600" />
            <StatsCard icon="fas fa-calendar-times" labelKey="employeeStats.onLeave" value={String(onLeave)} iconBgColor="bg-orange-100" iconColor="text-orange-600" />
        </div>
    );
};

export default EmployeeStats;
