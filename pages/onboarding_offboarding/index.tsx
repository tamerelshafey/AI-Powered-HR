
import React, { useState, useEffect, useMemo, useCallback } from 'react';
// FIX: Switched to namespace import for react-router-dom to resolve module resolution errors.
import * as ReactRouterDOM from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import ProcessStats from './components/ProcessStats';
import ProcessTable from './components/ProcessTable';
import ChecklistModal from './components/ChecklistModal';
import NewProcessModal from './components/NewProcessModal';
import ToastNotification from '../../components/ToastNotification'; // New Import
import { OnboardingProcess, ProcessType, ProcessStatus, OnboardingTaskStatus, Employee, Candidate } from '../../types';
import { getOnboardingProcesses, getAllEmployees } from '../../services/api';
import { useUser } from '../../context/UserContext';
import { ErrorDisplay } from '../../components/ModulePlaceholder';
import { useI18n } from '../../context/I18nContext';

type ActiveTab = 'onboarding' | 'offboarding';

const OnboardingOffboardingPage: React.FC = () => {
    const [processes, setProcesses] = useState<OnboardingProcess[]>([]);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<ActiveTab>('onboarding');
    const [selectedProcess, setSelectedProcess] = useState<OnboardingProcess | null>(null);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);
    
    // State for the new process modal
    const [isNewProcessModalOpen, setNewProcessModalOpen] = useState(false);
    const [processTypeToCreate, setProcessTypeToCreate] = useState<ProcessType | null>(null);
    const [newHire, setNewHire] = useState<Candidate | Employee | null>(null);
    
    const location = ReactRouterDOM.useLocation();
    const { currentUser } = useUser();
    const { t } = useI18n();

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const [processesData, employeesData] = await Promise.all([
                getOnboardingProcesses(),
                getAllEmployees()
            ]);
            setProcesses(processesData);
            setEmployees(employeesData);
        } catch (error) {
            console.error("Failed to fetch data", error);
            setError("فشل في تحميل بيانات عمليات التعيين والفصل.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Effect to handle incoming new hire from recruitment page
    useEffect(() => {
        if (location.state && location.state.newHire) {
            const hiredCandidate = location.state.newHire as Candidate;
            setNewHire(hiredCandidate);
            setProcessTypeToCreate(ProcessType.ONBOARDING);
            setNewProcessModalOpen(true);
             // Clear state to prevent re-triggering
            window.history.replaceState({}, document.title);
        }
    }, [location.state]);

    const handleStartOnboarding = () => {
        setNewHire(null);
        setProcessTypeToCreate(ProcessType.ONBOARDING);
        setNewProcessModalOpen(true);
    };

    const handleStartOffboarding = () => {
        setNewHire(null);
        setProcessTypeToCreate(ProcessType.OFFBOARDING);
        setNewProcessModalOpen(true);
    };

    const handleCloseNewProcessModal = () => {
        setNewProcessModalOpen(false);
        setProcessTypeToCreate(null);
        setNewHire(null);
    };

    const handleCreateProcess = (newProcess: Omit<OnboardingProcess, 'id' | 'tasks' | 'progress'>) => {
        // This is a mock implementation. In a real app, you'd send this to a server.
        const createdProcess: OnboardingProcess = {
            id: `PROC${Date.now()}`,
            ...newProcess,
            progress: 33,
            tasks: [
                { id: 't1', title: 'إرسال خطاب العرض', status: OnboardingTaskStatus.COMPLETED, dueDate: 'June 15, 2024', assignee: 'HR' },
                { id: 't2', title: 'توقيع العقد', status: OnboardingTaskStatus.PENDING, dueDate: 'June 20, 2024', assignee: 'الموظف' },
                { id: 't3', title: 'شرح تعديلات قانون العمل الجديد للموظف', status: OnboardingTaskStatus.PENDING, dueDate: newProcess.date, assignee: 'HR' }
            ],
        };
        setProcesses(prev => [createdProcess, ...prev]);
        handleCloseNewProcessModal();
    };

    const handleTaskStatusChange = (processId: string, taskId: string, newStatus: OnboardingTaskStatus) => {
        setProcesses(prevProcesses => {
            const updatedProcesses = prevProcesses.map(process => {
                if (process.id === processId) {
                    const updatedTasks = process.tasks.map(task =>
                        task.id === taskId ? { ...task, status: newStatus } : task
                    );
                    const completedTasksCount = updatedTasks.filter(t => t.status === OnboardingTaskStatus.COMPLETED).length;
                    const newProgress = Math.round((completedTasksCount / updatedTasks.length) * 100);
                    
                    let newProcessStatus = process.status;
                    if (newProgress === 100) {
                        newProcessStatus = ProcessStatus.COMPLETED;
                    } else if (process.status === ProcessStatus.COMPLETED && newProgress < 100) {
                        newProcessStatus = ProcessStatus.IN_PROGRESS;
                    }

                    const updatedProcess = { ...process, tasks: updatedTasks, progress: newProgress, status: newProcessStatus };
                    
                    if (selectedProcess && selectedProcess.id === processId) {
                        setSelectedProcess(updatedProcess);
                    }
                    
                    return updatedProcess;
                }
                return process;
            });
            return updatedProcesses;
        });
    };
    
    const handleAddTaskNote = (processId: string, taskId: string, noteText: string) => {
        if (!noteText.trim()) return;

        const newNote = {
            text: noteText,
            author: currentUser.name,
            date: new Date().toLocaleDateString('ar-EG'),
        };

        setProcesses(prevProcesses => {
            const updatedProcesses = prevProcesses.map(process => {
                if (process.id === processId) {
                    const updatedTasks = process.tasks.map(task => {
                        if (task.id === taskId) {
                            return {
                                ...task,
                                notes: [...(task.notes || []), newNote]
                            };
                        }
                        return task;
                    });
                    
                    const updatedProcess = { ...process, tasks: updatedTasks };

                    if (selectedProcess && selectedProcess.id === processId) {
                        setSelectedProcess(updatedProcess);
                    }
                    
                    return updatedProcess;
                }
                return process;
            });
            return updatedProcesses;
        });
    };
    
    const handleSendReminder = (taskTitle: string, assignee: string) => {
        setToast({ message: `تم إرسال تذكير إلى ${assignee} بخصوص "${taskTitle}"`, type: 'success' });
        setTimeout(() => setToast(null), 4000);
    };

    const filteredProcesses = useMemo(() => {
        return processes.filter(p => 
            activeTab === 'onboarding' 
            ? p.type === ProcessType.ONBOARDING 
            : p.type === ProcessType.OFFBOARDING
        );
    }, [processes, activeTab]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-96">
                <i className="fas fa-spinner fa-spin text-4xl text-blue-600"></i>
            </div>
        );
    }
    
    if (error) {
        return <ErrorDisplay message={error} onRetry={fetchData} />;
    }

    const TabButton: React.FC<{ tabName: ActiveTab; label: string }> = ({ tabName, label }) => (
        <button
            onClick={() => setActiveTab(tabName)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeTab === tabName
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
            }`}
            role="tab"
            aria-selected={activeTab === tabName}
            aria-controls={`${tabName}-panel`}
            id={`${tabName}-tab`}
        >
            {label}
        </button>
    );

    return (
        <div>
            {toast && <ToastNotification message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
            <PageHeader 
                title={t('page.onboarding.header.title')}
                subtitle={t('page.onboarding.header.subtitle')}
                actions={<>
                    <button onClick={handleStartOffboarding} className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                        <i className="fas fa-door-closed"></i>
                        <span>{t('page.onboarding.header.startOffboarding')}</span>
                    </button>
                    <button onClick={handleStartOnboarding} className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        <i className="fas fa-door-open"></i>
                        <span>{t('page.onboarding.header.startOnboarding')}</span>
                    </button>
                </>}
            />
            <ProcessStats processes={processes} />

            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                    <div className="flex items-center space-x-2 space-x-reverse" role="tablist" aria-label="Process Type">
                        <TabButton tabName="onboarding" label="عمليات التعيين" />
                        <TabButton tabName="offboarding" label="عمليات الفصل" />
                    </div>
                </div>
                <div id={`${activeTab}-panel`} role="tabpanel" aria-labelledby={`${activeTab}-tab`}>
                    <ProcessTable 
                        processes={filteredProcesses} 
                        onViewChecklist={setSelectedProcess} 
                    />
                </div>
            </div>
            
            {selectedProcess && (
                <ChecklistModal
                    process={selectedProcess}
                    onClose={() => setSelectedProcess(null)}
                    onTaskStatusChange={handleTaskStatusChange}
                    onAddTaskNote={handleAddTaskNote}
                    onSendReminder={handleSendReminder}
                />
            )}

            {isNewProcessModalOpen && processTypeToCreate && (
                <NewProcessModal
                    isOpen={isNewProcessModalOpen}
                    onClose={handleCloseNewProcessModal}
                    processType={processTypeToCreate}
                    employees={employees}
                    newHire={newHire}
                    onCreateProcess={handleCreateProcess}
                />
            )}
        </div>
    );
};

export default OnboardingOffboardingPage;
