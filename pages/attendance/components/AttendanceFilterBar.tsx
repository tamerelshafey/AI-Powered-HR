
import React from 'react';
import { Branch, Department } from '../../../types';
import { useI18n } from '../../../context/I18nContext';

interface AttendanceFilterBarProps {
  filters: { date: string; branch: string; department: string; };
  onFilterChange: (filters: { date: string; branch: string; department: string; }) => void;
  branches: Branch[];
  departments: Department[];
}

const AttendanceFilterBar: React.FC<AttendanceFilterBarProps> = ({ filters, onFilterChange, branches, departments }) => {
    const { t } = useI18n();

    // In a real app, departments would be filtered based on the selected branch.
    // For this mock, we'll show all departments.
    
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label htmlFor="date-filter" className="block text-sm font-medium text-gray-700 mb-1">التاريخ</label>
                    <input 
                        id="date-filter"
                        type="date"
                        value={filters.date}
                        onChange={e => onFilterChange({ ...filters, date: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="branch-filter" className="block text-sm font-medium text-gray-700 mb-1">الفرع</label>
                    <select 
                        id="branch-filter"
                        value={filters.branch}
                        onChange={e => onFilterChange({ ...filters, branch: e.target.value, department: 'All' })} // Reset department on branch change
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="All">كل الفروع</option>
                        {branches.map(branch => <option key={branch.id} value={branch.name}>{branch.name}</option>)}
                    </select>
                </div>
                 <div>
                    <label htmlFor="department-filter" className="block text-sm font-medium text-gray-700 mb-1">القسم</label>
                    <select 
                        id="department-filter"
                        value={filters.department}
                        onChange={e => onFilterChange({ ...filters, department: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="All">كل الأقسام</option>
                        {departments.map(dept => <option key={dept.id} value={dept.name}>{dept.name}</option>)}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default AttendanceFilterBar;