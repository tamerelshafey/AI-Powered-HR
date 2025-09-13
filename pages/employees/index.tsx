import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
// FIX: Switched to namespace import for react-router-dom to resolve module resolution errors.
import * as ReactRouterDOM from 'react-router-dom';
// FIX: Switched to named imports for 'react-window' to resolve module resolution errors.
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import { Employee, UserRole } from '../../types';
import { getEmployees, addEmployee } from '../../services/api';
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

type ViewMode = 'grid' | 'list';

const EmployeesPage: React.FC = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [initialLoading, setInitialLoading] = useState(true);
    const [moreLoading, setMoreLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [viewMode, setViewMode] = useState<ViewMode>('grid');
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);
    const navigate = ReactRouterDOM.useNavigate();

    const { currentUser } = useUser();
    const { t } = useI18n();

    // Refs for infinite scroll and list virtualization
    const observer = useRef<IntersectionObserver | null>(null);
    const listContainerRef = useRef<HTMLDivElement>(null);
    const [listDimensions, setListDimensions] = useState({ height: 0, width: 0 });
    
    // A single, robust function for loading more items, compatible with both grid and list loaders.
    // It returns a Promise that resolves after the fetch and state updates are complete,
    // and uses a timeout to prevent race conditions with react-window-infinite-loader.
    const loadMoreItems = useCallback((startIndex?: number, stopIndex?: number): Promise<void> => {
        return new Promise(resolve => {
            if (moreLoading || !hasMore) {
                resolve();
                return;
            }

            setMoreLoading(true);

            // A timeout helps prevent race conditions and ensures smooth state transitions with virtualized lists.
            setTimeout(async () => {
                try {
                    const { data, hasMore: newHasMore } = await getEmployees(page, 12);
                    setEmployees(prev => [...prev, ...data]);
                    setHasMore(newHasMore);
                    setPage(prev => prev + 1);
                } catch (error) {
                    console.error("Failed to fetch more employees", error);
                } finally {
                    setMoreLoading(false);
                    resolve();
                }
            }, 500);
        });
    }, [moreLoading, hasMore, page]);

    // Infinite scroll for grid view
    const gridLoaderRef = useCallback(node => {
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                loadMoreItems();
            }
        });
        if (node) observer.current.observe(node);
    }, [hasMore, loadMoreItems]);


    const fetchInitialEmployees = useCallback(async () => {
        setInitialLoading(true);
        setError(null);
        try {
            const { data, hasMore: newHasMore } = await getEmployees(1, 12);
            setEmployees(data);
            setHasMore(newHasMore);
            setPage(2);
        } catch (error) {
            console.error("Failed to fetch employees", error);
            setError(t('page.employees.error.loadFailed'));
        } finally {
            setInitialLoading(false);
        }
    }, [t]);

    useEffect(() => {
        fetchInitialEmployees();
    }, [fetchInitialEmployees]);

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

    const filteredEmployees = useMemo(() => {
        if ([UserRole.HR_MANAGER, UserRole.SYSTEM_ADMINISTRATOR, UserRole.BOARD_MEMBER, UserRole.BRANCH_MANAGER].includes(currentUser.role)) {
            return employees;
        }
        if (currentUser.role === UserRole.DEPARTMENT_MANAGER) {
            return employees.filter(emp => emp.department === currentUser.department);
        }
        return [];
    }, [currentUser, employees]);

    const handleEmployeeClick = useCallback((employeeId: string) => {
        navigate(`/employees/${employeeId}`);
    }, [navigate]);

    const handleAddEmployee = useCallback(async (employeeData: Omit<Employee, 'id'>) => {
        try {
            const newEmployee = await addEmployee(employeeData);
            setToast({ message: `تمت إضافة الموظف ${newEmployee.firstName} بنجاح!`, type: 'success' });
            // Refetch all employees to ensure the list is up-to-date with the database.
            // This is safer than just adding to local state.
            await fetchInitialEmployees();
        } catch (error) {
            console.error("Failed to add employee", error);
            setToast({ message: 'فشل في إضافة الموظف. يرجى المحاولة مرة أخرى.', type: 'error' });
        }
    }, [fetchInitialEmployees]);

    // Infinite loader props for react-window
    const isItemLoaded = (index: number) => !hasMore || index < filteredEmployees.length;
    const itemCount = hasMore ? filteredEmployees.length + 1 : filteredEmployees.length;

    if (initialLoading) {
        return (
            <div className="flex justify-center items-center h-96">
                <i className="fas fa-spinner fa-spin text-4xl text-blue-600"></i>
            </div>
        );
    }

    if (error) {
        return <ErrorDisplay message={error} onRetry={fetchInitialEmployees} />;
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
            <FilterBar viewMode={viewMode} onViewChange={setViewMode} />
            <EmployeeStats employees={filteredEmployees} />
            
            {viewMode === 'grid' && (
                <>
                    <div id="employeeGrid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredEmployees.map((employee, index) => {
                            // The ref is attached to the last element to trigger loading
                            if (filteredEmployees.length === index + 1) {
                                return (
                                    <div ref={gridLoaderRef} key={employee.id}>
                                        <EmployeeCard employee={employee} onClick={handleEmployeeClick} />
                                    </div>
                                );
                            }
                            return <EmployeeCard key={employee.id} employee={employee} onClick={handleEmployeeClick} />;
                        })}
                    </div>
                    {moreLoading && (
                        <div className="text-center py-6">
                            <i className="fas fa-spinner fa-spin text-2xl text-blue-600"></i>
                        </div>
                    )}
                    {!hasMore && employees.length > 0 && (
                        <div className="text-center mt-8 text-gray-500">
                            {t('page.employees.listEnd')}
                        </div>
                    )}
                </>
            )}
            
            {viewMode === 'list' && (
                <div id="employeeListContainer" ref={listContainerRef} className="h-[70vh] w-full">
                    {listDimensions.height > 0 && (
                        <InfiniteLoader
                            isItemLoaded={isItemLoaded}
                            itemCount={itemCount}
                            loadMoreItems={loadMoreItems}
                        >
                            {({ onItemsRendered, ref }) => (
                                // FIX: Use named import for react-window component.
                                <FixedSizeList
                                    ref={ref}
                                    onItemsRendered={onItemsRendered}
                                    height={listDimensions.height}
                                    width={listDimensions.width}
                                    itemCount={itemCount}
                                    itemSize={92}
                                >
                                    {/* FIX: Use named import for react-window type. */}
                                    {({ index, style }: ListChildComponentProps): React.ReactElement => {
                                        if (!isItemLoaded(index)) {
                                            return (
                                                <div style={style} className="flex items-center justify-center text-gray-500">
                                                    <i className="fas fa-spinner fa-spin me-2"></i> {t('common.loading')}
                                                </div>
                                            );
                                        }
                                        const employee = filteredEmployees[index];
                                        if (!employee) {
                                            return <div style={style}></div>;
                                        }
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
                        </InfiniteLoader>
                    )}
                </div>
            )}


            {filteredEmployees.length === 0 && !initialLoading && !error && (
                 <div className="text-center py-12 bg-white rounded-lg shadow-sm border">
                    <i className="fas fa-users-slash text-5xl text-gray-400 mb-4"></i>
                    <h3 className="text-xl font-semibold text-gray-700">{t('page.employees.noEmployees.title')}</h3>
                    <p className="text-gray-500 mt-2">{t('page.employees.noEmployees.description')}</p>
                     <button
                        onClick={() => setAddModalOpen(true)}
                        className="mt-6 flex items-center space-x-2 space-x-reverse px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mx-auto"
                    >
                        <i className="fas fa-plus"></i>
                        <span>{t('page.employees.addFirstEmployee')}</span>
                    </button>
                </div>
            )}

            <AddEmployeeModal isOpen={isAddModalOpen} onClose={() => setAddModalOpen(false)} onAddEmployee={handleAddEmployee} />
        </div>
    );
};

export default EmployeesPage;