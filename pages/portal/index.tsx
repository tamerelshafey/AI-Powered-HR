import React, { useState, useEffect } from 'react';
import PortalHeader from './components/PortalHeader';
import PortalSidebar from './components/PortalSidebar';
import DashboardSection from './components/DashboardSection';
import ProfileSection from './components/ProfileSection';
import TimeOffSection from './components/TimeOffSection';
import LearningSection from './components/LearningSection';
import BenefitsSection from './components/BenefitsSection';
import DocumentsSection from './components/DocumentsSection';
import FeedbackSection from './components/FeedbackSection';
import TimeOffModal from './components/TimeOffModal';
import FeedbackModal from './components/FeedbackModal';
import FloatingActionButton from './components/FloatingActionButton';
import { portalNavItems } from './data';
import AddExternalCourseModal from './components/AddExternalCourseModal';
import DevelopmentPlanSection from './components/DevelopmentPlanSection';
import AiChatbotModal from './components/AiChatbotModal';
import ArticleModal from '../help_center/components/ArticleModal';
import { getHelpCenterArticles } from '../../services/api';
import { HelpCenterArticle, Payslip } from '../../types';
import PayrollSection from './components/PayrollSection';
import PayslipModal from '../payroll/components/PayslipModal';

type PortalSection = 'dashboard' | 'profile' | 'timeoff' | 'payroll' | 'benefits' | 'learning' | 'documents' | 'feedback' | 'development_plan';

const EmployeePortalPage: React.FC = () => {
    const [activeSection, setActiveSection] = useState<PortalSection>('dashboard');
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isTimeOffModalOpen, setTimeOffModalOpen] = useState(false);
    const [isFeedbackModalOpen, setFeedbackModalOpen] = useState(false);
    const [isExternalCourseModalOpen, setExternalCourseModalOpen] = useState(false);
    const [isChatbotOpen, setChatbotOpen] = useState(false);
    const [selectedPayslip, setSelectedPayslip] = useState<Payslip | null>(null);


    const [articles, setArticles] = useState<HelpCenterArticle[]>([]);
    const [viewedArticle, setViewedArticle] = useState<HelpCenterArticle | null>(null);

    useEffect(() => {
        getHelpCenterArticles().then(setArticles);
    }, []);

    const handleViewArticleFromChatbot = (articleId: string) => {
        const article = articles.find(a => a.id === articleId);
        if (article) {
            setViewedArticle(article);
            setChatbotOpen(false);
        }
    };

    const renderSection = () => {
        switch (activeSection) {
            case 'dashboard':
                return <DashboardSection 
                            onShowSection={setActiveSection} 
                            onOpenTimeOffModal={() => setTimeOffModalOpen(true)}
                            onOpenFeedbackModal={() => setFeedbackModalOpen(true)}
                        />;
            case 'profile':
                return <ProfileSection />;
            case 'timeoff':
                return <TimeOffSection onOpenTimeOffModal={() => setTimeOffModalOpen(true)} />;
            case 'learning':
                return <LearningSection onOpenExternalCourseModal={() => setExternalCourseModalOpen(true)} />;
            case 'development_plan':
                return <DevelopmentPlanSection />;
            case 'payroll':
                return <PayrollSection onViewPayslip={setSelectedPayslip} />;
            case 'benefits':
                return <BenefitsSection />;
            case 'documents':
                return <DocumentsSection />;
            case 'feedback':
                 return <FeedbackSection onOpenFeedbackModal={() => setFeedbackModalOpen(true)} />;
            default:
                return <DashboardSection 
                            onShowSection={setActiveSection} 
                            onOpenTimeOffModal={() => setTimeOffModalOpen(true)}
                            onOpenFeedbackModal={() => setFeedbackModalOpen(true)}
                        />;
        }
    };

    return (
        <div className="flex h-screen bg-gray-50 font-sans">
            <div 
                className={`fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden ${isSidebarOpen ? 'block' : 'hidden'}`}
                onClick={() => setSidebarOpen(false)}
            ></div>
            <PortalSidebar
                isOpen={isSidebarOpen}
                setIsOpen={setSidebarOpen}
                navItems={portalNavItems}
                activeSection={activeSection}
                setActiveSection={setActiveSection}
            />
            <div className="flex-1 flex flex-col overflow-hidden">
                <PortalHeader onSidebarToggle={() => setSidebarOpen(!isSidebarOpen)} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
                    {renderSection()}
                </main>
            </div>
            <TimeOffModal isOpen={isTimeOffModalOpen} onClose={() => setTimeOffModalOpen(false)} />
            <FeedbackModal isOpen={isFeedbackModalOpen} onClose={() => setFeedbackModalOpen(false)} />
            <AddExternalCourseModal isOpen={isExternalCourseModalOpen} onClose={() => setExternalCourseModalOpen(false)} />
            <AiChatbotModal 
                isOpen={isChatbotOpen} 
                onClose={() => setChatbotOpen(false)} 
                onViewArticle={handleViewArticleFromChatbot}
            />
            <ArticleModal 
                isOpen={!!viewedArticle}
                onClose={() => setViewedArticle(null)}
                article={viewedArticle}
            />
            <PayslipModal 
                isOpen={!!selectedPayslip}
                onClose={() => setSelectedPayslip(null)}
                payslip={selectedPayslip}
            />
            <FloatingActionButton onClick={() => setChatbotOpen(true)} />
        </div>
    );
};

export default EmployeePortalPage;