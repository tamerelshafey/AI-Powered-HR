import React, { useState, useMemo, useEffect } from 'react';
import { Feedback } from '../../../types';
import { getFeedback } from '../../../services/api';
import LoadingSpinner from '../../../components/LoadingSpinner';

interface FeedbackSectionProps {
    onOpenFeedbackModal: () => void;
}

const categoryClasses: Record<Feedback['category'], { bg: string, text: string, icon: string }> = {
    Praise: { bg: 'bg-green-100', text: 'text-green-800', icon: 'fas fa-award' },
    Constructive: { bg: 'bg-orange-100', text: 'text-orange-800', icon: 'fas fa-lightbulb' },
};

const FeedbackCard: React.FC<{ feedback: Feedback }> = ({ feedback }) => {
    const styles = categoryClasses[feedback.category];
    return (
        <div className={`border-s-4 ${feedback.category === 'Praise' ? 'border-green-500' : 'border-orange-500'} bg-white p-4 rounded-e-lg shadow-sm`}>
            <div className="flex justify-between items-start">
                <div>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${styles.bg} ${styles.text}`}>
                        <i className={`${styles.icon} me-1.5`}></i>
                        {feedback.category === 'Praise' ? 'إشادة' : 'ملاحظة بناءة'}
                    </span>
                    <p className="text-sm text-gray-700 mt-3">{feedback.content}</p>
                </div>
                <p className="text-xs text-gray-500 flex-shrink-0 ms-2">{feedback.date}</p>
            </div>
            <p className="text-xs text-gray-500 mt-2">
                {feedback.type === 'received' ? `من: ${feedback.from}` : `إلى: ${feedback.to}`}
            </p>
        </div>
    );
};

const FeedbackSection: React.FC<FeedbackSectionProps> = ({ onOpenFeedbackModal }) => {
    const [activeTab, setActiveTab] = useState<'received' | 'given'>('received');
    const [feedbackData, setFeedbackData] = useState<Feedback[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await getFeedback();
                setFeedbackData(data);
            } catch (error) {
                console.error("Failed to fetch feedback data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const filteredFeedback = useMemo(() => {
        return feedbackData.filter(f => f.type === activeTab);
    }, [activeTab, feedbackData]);

    const TabButton: React.FC<{ tab: 'received' | 'given', label: string }> = ({ tab, label }) => (
        <button
            id={`${tab}-tab`}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeTab === tab
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
            }`}
            role="tab"
            aria-selected={activeTab === tab}
            aria-controls={`${tab}-panel`}
        >
            {label}
        </button>
    );
    
    if (loading) {
        return <div className="min-h-[60vh] flex items-center justify-center"><LoadingSpinner /></div>
    }

    return (
        <div>
             <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">الملاحظات</h2>
                    <p className="text-gray-600">شارك ملاحظاتك واستقبلها لتعزيز النمو.</p>
                </div>
                <button onClick={onOpenFeedbackModal} className="mt-4 lg:mt-0 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <i className="fas fa-plus me-2"></i>تقديم ملاحظات جديدة
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                    <div className="flex items-center space-x-2 space-x-reverse" role="tablist" aria-label="Feedback Type">
                        <TabButton tab="received" label="الملاحظات المستلمة" />
                        <TabButton tab="given" label="الملاحظات المرسلة" />
                    </div>
                </div>
                <div id={`${activeTab}-panel`} role="tabpanel" aria-labelledby={`${activeTab}-tab`} className="p-6 bg-gray-50">
                    {filteredFeedback.length > 0 ? (
                        <div className="space-y-4">
                            {filteredFeedback.map(fb => <FeedbackCard key={fb.id} feedback={fb} />)}
                        </div>
                    ) : (
                         <div className="text-center py-12 text-gray-500">
                            <i className="fas fa-comment-slash text-4xl mb-3"></i>
                            <p>لا توجد ملاحظات لعرضها.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FeedbackSection;