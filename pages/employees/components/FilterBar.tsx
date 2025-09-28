
import React from 'react';
import { UserRole, Department, Branch } from '../../../types';
import { useI18n } from '../../../context/I18nContext';

type ViewMode = 'grid' | 'list';

interface FilterBarProps {
  viewMode: ViewMode;
  onViewChange: (mode: ViewMode) => void;
  filters: { searchTerm: string; department: string; role: string; branch: string; };
  onFilterChange: (filters: { searchTerm: string; department: string; role: string; branch: string; }) => void;
  departments: Department[];
  branches: Branch[];
}

const FilterBar: React.FC<FilterBarProps> = ({ viewMode, onViewChange, filters, onFilterChange, departments, branches }) => {
    const { t } = useI18n();
    const commonButtonClasses = "p-2 rounded-lg";
    const activeButtonClasses = "bg-blue-100 text-blue-600";
    const inactiveButtonClasses = "text-gray-600 hover:bg-gray-100";
    
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
            <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                    <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                        <div className="relative">
                            <i className="fas fa-search absolute end-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                            <input 
                                type="text" 
                                placeholder={t('page.employees.filter.searchPlaceholder')} 
                                className="pe-10 ps-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
                                value={filters.searchTerm}
                                onChange={e => onFilterChange({ ...filters, searchTerm: e.target.value })}
                            />
                        </div>
                        <select 
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={filters.department}
                            onChange={e => onFilterChange({ ...filters, department: e.target.value })}
                        >
                            <option value="All">{t('page.employees.filter.allDepartments')}</option>
                            {departments.map(dept => <option key={dept.id} value={dept.name}>{dept.name}</option>)}
                        </select>
                         <select 
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={filters.branch}
                            onChange={e => onFilterChange({ ...filters, branch: e.target.value })}
                        >
                            <option value="All">{t('page.employees.filter.allBranches')}</option>
                            {branches.map(branch => <option key={branch.id} value={branch.name}>{branch.name}</option>)}
                        </select>
                         <select 
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={filters.role}
                            onChange={e => onFilterChange({ ...filters, role: e.target.value })}
                         >
                            <option value="All">{t('page.employees.filter.allUserRoles')}</option>
                            {Object.values(UserRole).map(role => (
                                <option key={role} value={role}>{t(`enum.userRole.${role}`)}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                        <button onClick={() => onViewChange('grid')} className={`${commonButtonClasses} ${viewMode === 'grid' ? activeButtonClasses : inactiveButtonClasses}`} aria-label="Grid View">
                            <i className="fas fa-th-large"></i>
                        </button>
                        <button onClick={() => onViewChange('list')} className={`${commonButtonClasses} ${viewMode === 'list' ? activeButtonClasses : inactiveButtonClasses}`} aria-label="List View">
                            <i className="fas fa-list"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterBar;
