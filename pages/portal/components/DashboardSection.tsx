

import React, { useEffect, useState } from 'react';
import { useUser } from '../../../context/UserContext';
import { useI18n } from '../../../context/I18nContext';
import { formatDate } from '../../../utils/formatters';
import { UpcomingEvent, PortalActivity, Announcement } from '../../../types';
import { getUpcomingEvents, getPortalActivities, getAnnouncements } from '../../../services/api';
import LoadingSpinner from '../../../components/LoadingSpinner';

interface DashboardSectionProps {
    onShowSection: (sectionId: any) => void;
    onOpenTimeOffModal: () => void;
    onOpenFeedbackModal: () => void;
    onOpenBiometricModal: () => void;
    onOpenExpenseModal: () => void;
}

const QuickActionButton: React.FC<{ icon: string; title: string; color: string; onClick: () => void }> = ({ icon, title, color, onClick }) => (
    <button onClick={onClick} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow transform hover:-translate-y-1">
        <div className={`w-12 h-12 ${color.replace('text', 'bg').replace('600', '100')} rounded-lg flex items-center justify-center mx-auto mb-3`}>
            <i className={`${icon} ${color} text-xl`}></i>
        </div>
        <p className="text-sm font-medium text-gray-900">{title}</p>
    </button>
);

const DashboardSection: React.FC<DashboardSectionProps> = ({ onShowSection, onOpenTimeOffModal, onOpenFeedbackModal, onOpenBiometricModal, onOpenExpenseModal }) => {
    const { currentUser } = useUser();
    const { t, language } = useI18n();
    const [currentDate, setCurrentDate] = useState('');
    
    const [events, setEvents] = useState<UpcomingEvent[]>([]);
    const [activities, setActivities] = useState<PortalActivity[]>([]);
    const [announcementsData, setAnnouncementsData] = useState<Announcement[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const now = new Date();
        const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        setCurrentDate(formatDate(now, language, options));
        
        const fetchData = async () => {
            setLoading(true);
            try {
                const [eventsData, activitiesData, announcementsResult] = await Promise.all([
                    getUpcomingEvents(),
                    getPortalActivities(),
                    getAnnouncements()
                ]);
                setEvents(eventsData);
                setActivities(activitiesData);
                setAnnouncementsData(announcementsResult);
            } catch (error) {
                console.error("Failed to fetch portal dashboard data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [language]);
    
    if(loading) {
        return <div className="min-h-[60vh] flex items-center justify-center"><LoadingSpinner/></div>
    }

    return (
        <div>
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold mb-2">صباح الخير، {currentUser.name.split(' ')[0]}! 👋</h2>
                        <p className="text-blue-100">لديك 3 مهام معلقة واجتماعان قادمان اليوم.</p>
                    </div>
                    <div className="hidden md:block text-end">
                        <p className="text-lg font-semibold">{currentDate}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
                <QuickActionButton icon="fas fa-calendar-plus" title="طلب إجازة" color="text-blue-600" onClick={onOpenTimeOffModal} />
                <QuickActionButton icon="fas fa-file-invoice-dollar" title="عرض قسيمة الدفع" color="text-green-600" onClick={() => onShowSection('payroll')} />
                <QuickActionButton icon="fas fa-receipt" title={t('portal.dashboard.action.submitExpense')} color="text-yellow-600" onClick={onOpenExpenseModal} />
                <QuickActionButton icon="fas fa-fingerprint" title={t('portal.dashboard.action.biometricCheckin')} color="text-indigo-600" onClick={onOpenBiometricModal} />
                <QuickActionButton icon="fas fa-user-edit" title="تحديث الملف الشخصي" color="text-purple-600" onClick={() => onShowSection('profile')} />
                <QuickActionButton icon="fas fa-comment-dots" title="تقديم ملاحظات" color="text-orange-600" onClick={onOpenFeedbackModal} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">إحصائياتي</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between"><span className="text-sm text-gray-600">أيام الإجازة المتبقية</span><span className="text-lg font-bold text-blue-600">12</span></div>
                        <div className="flex items-center justify-between"><span className="text-sm text-gray-600">أيام المرض المستخدمة</span><span className="text-lg font-bold text-orange-600">2/5</span></div>
                        <div className="flex items-center justify-between"><span className="text-sm text-gray-600">ساعات التدريب</span><span className="text-lg font-bold text-green-600">24</span></div>
                        <div className="flex items-center justify-between"><span className="text-sm text-gray-600">درجة الأداء</span><span className="text-lg font-bold text-purple-600">4.8/5</span></div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">الأحداث القادمة</h3>
                    <div className="space-y-3">
                        {events.map(event => (
                            <div key={event.title} className={`flex items-center space-x-3 space-x-reverse p-3 bg-${event.color}-50 rounded-lg`}>
                                <div className={`w-10 h-10 bg-${event.color}-100 rounded-lg flex items-center justify-center`}><i className={`${event.icon} text-${event.color}-600`}></i></div>
                                <div className="flex-1"><p className="text-sm font-medium text-gray-900">{event.title}</p><p className="text-xs text-gray-500">{event.time}</p></div>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">النشاط الأخير</h3>
                    <div className="space-y-4">
                        {activities.map(activity => (
                            <div key={activity.text} className="timeline-item flex items-start space-x-3 space-x-reverse">
                                <div className={`w-8 h-8 bg-${activity.color}-100 rounded-full flex items-center justify-center flex-shrink-0`}><i className={`${activity.icon} text-${activity.color}-600 text-xs`}></i></div>
                                <div><p className="text-sm text-gray-900">{activity.text}</p><p className="text-xs text-gray-500">{activity.time}</p></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">إعلانات الشركة</h3>
                <div className="space-y-4">
                    {announcementsData.map(announcement => (
                        <div key={announcement.title} className={`border-s-4 border-${announcement.color}-500 ps-4 py-2`}>
                            <h4 className="font-medium text-gray-900">{announcement.title}</h4>
                            <p className="text-sm text-gray-600 mt-1">{announcement.content}</p>
                            <p className="text-xs text-gray-500 mt-2">نشرت {announcement.time} بواسطة {announcement.author}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DashboardSection;