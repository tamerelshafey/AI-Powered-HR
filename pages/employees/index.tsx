
import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { Employee, UserRole, Department, Branch } from '../../types';
import { addEmployee, getAllEmployees, getDepartments, getBranches } from '../../services/api';
import { useUser } from '../../context/UserContext';
import { useI18n } from '../../context/I18nContext';
import PageHeader from '../../components/PageHeader';
import FilterBar from './components/FilterBar';
import EmployeeStats from './components/EmployeeStats';
import EmployeeCard from './components/EmployeeCard';
import AddEmployeeModal from './components/AddEmployeeModal';
import EmployeeListItem from './components/EmployeeListItem';
import { ErrorDisplay } from '../../components/ModulePlaceholder';
import ToastNotification from '../../components/ToastNotification';
import LoadingSpinner from '../../components/LoadingSpinner';

type ViewMode = 'grid' | 'list';

const EmployeesPage: React.FC = () => {
    const [allEmployees, setAllEmployees] = useState<Employee[]>([]);
    const [departments, setDepartments] = useState<Department[]>([]);
    const [branches, setBranches] = useState<Branch[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [viewMode, setViewMode] = useState<ViewMode>('grid');
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);
    const [filters, setFilters] = useState({ searchTerm: '', department: 'All', role: 'All', branch: 'All' });
    
    const navigate = useNavigate();
    const { currentUser } = useUser();
    const { t } = useI18n();

    // Virtualization refs
    const listContainerRef = useRef<HTMLDivElement>(null);
    const [listDimensions, setListDimensions] = useState({ height: 0, width: 0 });
    
    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const [emps, depts, brnchs] = await Promise.all([
                getAllEmployees(),
                getDepartments(),
                getBranches(),
            ]);
            setAllEmployees(emps);
            setDepartments(depts);
            setBranches(brnchs);
        } catch (error) {
            console.error("Failed to fetch employees data", error);
            setError(t('page.employees.error.loadFailed'));
        } finally {
            setLoading(false);
        }
    }, [t]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Effect to measure the container for the virtualized list
    useEffect(() => {
        if (listContainerRef.current) {
            const resizeObserver = new ResizeObserver(entries => {
                if (entries[0]) {
                    const { height, width } = entries[0].contentRect;
                    setListDimensions({ height, width });
                }
            });
            resizeObserver.observe(listContainerRef.current);
            return () => resizeObserver.disconnect();
        }
    }, [viewMode]);

    const permissionFilteredEmployees = useMemo(() => {
        if ([UserRole.HR_MANAGER, UserRole.SYSTEM_ADMINISTRATOR, UserRole.BOARD_MEMBER, UserRole.BRANCH_MANAGER].includes(currentUser.role)) {
            return allEmployees;
        }
        if (currentUser.role === UserRole.DEPARTMENT_MANAGER) {
            return allEmployees.filter(emp => emp.department === currentUser.department);
        }
        return [];
    }, [currentUser, allEmployees]);

    const finalFilteredEmployees = useMemo(() => {
        return permissionFilteredEmployees.filter(emp => {
            const searchTermLower = filters.searchTerm.toLowerCase();
            const nameMatch = `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(searchTermLower) || emp.jobTitle.toLowerCase().includes(searchTermLower);
            const departmentMatch = filters.department === 'All' || emp.department === filters.department;
            const roleMatch = filters.role === 'All' || emp.role === filters.role;
            const branchMatch = filters.branch === 'All' || emp.branch === filters.branch;
            return nameMatch && departmentMatch && roleMatch && branchMatch;
        });
    }, [permissionFilteredEmployees, filters]);


    const handleEmployeeClick = useCallback((employeeId: string) => {
        navigate(`/employees/${employeeId}`);
    }, [navigate]);

    const handleAddEmployee = useCallback(async (employeeData: Omit<Employee, 'id'>) => {
        try {
            await addEmployee(employeeData);
            setToast({ message: `تمت إضافة الموظف ${employeeData.firstName} بنجاح!`, type: 'success' });
            fetchData();
        } catch (error) {
            console.error("Failed to add employee", error);
            setToast({ message: 'فشل في إضافة الموظف. يرجى المحاولة مرة أخرى.', type: 'error' });
        }
    }, [fetchData]);

    if (loading) {
        return <LoadingSpinner fullScreen />;
    }

    if (error) {
        return <ErrorDisplay message={error} onRetry={fetchData} />;
    }

    const department = currentUser.role === UserRole.DEPARTMENT_MANAGER ? currentUser.department : undefined;

    return (
        <div>
            {toast && <ToastNotification message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
            <PageHeader
                title={t('page.employees.header.title')}
                subtitle={department ? t('page.employees.header.subtitleDept', { department }) : t('page.employees.header.subtitle')}
                actions={
                    <button onClick={() => setAddModalOpen(true)} className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        <i className="fas fa-plus"></i>
                        <span>{t('page.employees.header.addEmployee')}</span>
                    </button>
                }
            />
            <FilterBar 
                viewMode={viewMode} 
                onViewChange={setViewMode} 
                filters={filters}
                onFilterChange={setFilters}
                departments={departments}
                branches={branches}
            />
            <EmployeeStats employees={finalFilteredEmployees} />
            
            {viewMode === 'grid' && (
                <div id="employeeGrid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {finalFilteredEmployees.map((employee) => (
                        <EmployeeCard key={employee.id} employee={employee} onClick={handleEmployeeClick} />
                    ))}
                </div>
            )}
            
            {viewMode === 'list' && (
                <div id="employeeListContainer" ref={listContainerRef} className="h-[70vh] w-full">
                    {listDimensions.height > 0 && (
                        <FixedSizeList
                            height={listDimensions.height}
                            width={listDimensions.width}
                            itemCount={finalFilteredEmployees.length}
                            itemSize={92}
                        >
                            {({ index, style }: ListChildComponentProps): React.ReactElement => {
                                const employee = finalFilteredEmployees[index];
                                return (
                                    <div style={style}>
                                        <div style={{ paddingBottom: '12px' }}>
                                            <EmployeeListItem
                                                employee={employee}
                                                onClick={handleEmployeeClick}
                                            />
                                        </div>
                                    </div>
                                );
                            }}
                        </FixedSizeList>
                    )}
                </div>
            )}

            {finalFilteredEmployees.length === 0 && !loading && !error && (
                 <div className="text-center py-12 bg-white rounded-lg shadow-sm border">
                    <i className="fas fa-users-slash text-5xl text-gray-400 mb-4"></i>
                    <h3 className="text-xl font-semibold text-gray-700">{t('page.employees.noEmployees.title')}</h3>
                    <p className="text-gray-500 mt-2">{filters.searchTerm || filters.department !== 'All' || filters.branch !== 'All' || filters.role !== 'All' ? 'لا توجد نتائج تطابق الفلاتر المحددة.' : t('page.employees.noEmployees.description')}</p>
                     <button
                        onClick={() => setAddModalOpen(true)}
                        className="mt-6 flex items-center space-x-2 space-x-reverse px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mx-auto"
                    >
                        <i className="fas fa-plus"></i>
                        <span>{t('page.employees.addFirstEmployee')}</span>
                    </button>
                </div>
            )}

            <AddEmployeeModal 
                isOpen={isAddModalOpen} 
                onClose={() => setAddModalOpen(false)} 
                onAddEmployee={handleAddEmployee}
                branches={branches}
            />
        </div>
    );
};

export default EmployeesPage;
