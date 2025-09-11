import React, { useState, useEffect, useCallback } from 'react';
import { Kudo, Milestone, Employee, CompanyValue } from '../../types';
import { getKudosFeed, getUpcomingMilestones, getAllEmployees, sendKudo } from '../../services/api';
import { useUser } from '../../context/UserContext';
import { ErrorDisplay } from '../../components/ModulePlaceholder';
import LoadingSpinner from '../../components/LoadingSpinner';
import PageHeader from './components/PageHeader';
import SendKudos from './components/SendKudos';
import KudosFeed from './components/KudosFeed';
import MilestonesWidget from './components/MilestonesWidget';
import LeaderboardWidget from './components/LeaderboardWidget';
import ToastNotification from '../../components/ToastNotification';

const RecognitionPage: React.FC = () => {
    const { currentUser } = useUser();
    const [kudos, setKudos] = useState<Kudo[]>([]);
    const [milestones, setMilestones] = useState<Milestone[]>([]);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const [kudosData, milestonesData, employeesData] = await Promise.all([
                getKudosFeed(),
                getUpcomingMilestones(),
                getAllEmployees()
            ]);
            setKudos(kudosData);
            setMilestones(milestonesData);
            setEmployees(employeesData);
        } catch (err) {
            console.error("Failed to fetch recognition data", err);
            setError("Failed to load recognition data. Please try again.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleSendKudo = async (receiverId: string, message: string, values: CompanyValue[]) => {
        if (!currentUser) return;
        
        const sender = employees.find(e => e.id === 'EMP001'); // Mock sender
        const receiver = employees.find(e => e.id === receiverId);

        if (!sender || !receiver) {
            setToast({ message: 'Could not find sender or receiver.', type: 'info' });
            return;
        }

        try {
            const newKudo = await sendKudo({ sender, receiver, message, values });
            setKudos(prev => [newKudo, ...prev]);
            setToast({ message: `تم إرسال التقدير إلى ${receiver.firstName} بنجاح!`, type: 'success' });
        } catch (error) {
            console.error(error);
            setToast({ message: 'فشل إرسال التقدير.', type: 'info' });
        }
    };


    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <ErrorDisplay message={error} onRetry={fetchData} />;
    }

    return (
        <div>
            {toast && <ToastNotification message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
            <PageHeader />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2 space-y-8">
                    <SendKudos employees={employees} onSendKudo={handleSendKudo} />
                    <KudosFeed kudos={kudos} />
                </div>
                <div className="space-y-8">
                    <MilestonesWidget milestones={milestones} />
                    <LeaderboardWidget kudos={kudos} />
                </div>
            </div>
        </div>
    );
};

export default RecognitionPage;
