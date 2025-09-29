

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
import { PORTAL_NAV_ITEMS } from '../../constants';
import AddExternalCourseModal from './components/AddExternalCourseModal';
import DevelopmentPlanSection from './components/DevelopmentPlanSection';
import AiChatbotModal from './components/AiChatbotModal';
import ArticleModal from '../help_center/components/ArticleModal';
import { getHelpCenterArticles } from '../../services/api';
import { HelpCenterArticle, Payslip } from '../../types';
import PayrollSection from './components/PayrollSection';
import PayslipModal from '../payroll/components/PayslipModal';
import BiometricModal from '../attendance/components/BiometricModal';
import MissionsSection from './components/MissionsSection';
import ExpenseSection from './components/ExpenseSection';
import ExpenseModal from '../expenses/components/ExpenseModal';

type PortalSection = 'dashboard' | 'profile' | 'timeoff' | 'payroll' | 'benefits' | 'learning' | 'documents' | 'feedback' | 'development_plan' | 'missions' | 'expenses';

const EmployeePortalPage: React.FC = () => {
    const [activeSection, setActiveSection] = useState<PortalSection>('dashboard');
    const [isTimeOffModalOpen, setTimeOffModalOpen] = useState(false);
    const [isFeedbackModalOpen, setFeedbackModalOpen] = useState(false);
    const [isExternalCourseModalOpen, setExternalCourseModalOpen] = useState(false);
    const [isChatbotOpen, setChatbotOpen] = useState(false);
    const [selectedPayslip, setSelectedPayslip] = useState<Payslip | null>(null);
    const [isBiometricModalOpen, setBiometricModalOpen] = useState(false);
    const [isExpenseModalOpen, setExpenseModalOpen] = useState(false);


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
                            onOpenBiometricModal={() => setBiometricModalOpen(true)}
                            onOpenExpenseModal={() => setExpenseModalOpen(true)}
                        />;
            case 'profile':
                return <ProfileSection />;
            case 'timeoff':
                return <TimeOffSection onOpenTimeOffModal={() => setTimeOffModalOpen(true)} />;
            case 'missions':
                return <MissionsSection />;
            case 'expenses':
                return <ExpenseSection onOpenExpenseModal={() => setExpenseModalOpen(true)} />;
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
                            onOpenBiometricModal={() => setBiometricModalOpen(true)}
                            onOpenExpenseModal={() => setExpenseModalOpen(true)}
                        />;
        }
    };

    return (
        <div className="flex h-screen bg-gray-50 font-sans">
            <PortalSidebar
                navItems={PORTAL_NAV_ITEMS}
                activeSection={activeSection}
                setActiveSection={setActiveSection}
            />
            <div className="flex-1 flex flex-col overflow-y-auto">
                <PortalHeader />
                <main className="flex-1 p-6">
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
                payslipInfo={{ employee: selectedPayslip?.employee!, run: selectedPayslip?.run! }}
            />
            <BiometricModal
                isOpen={isBiometricModalOpen}
                onClose={() => setBiometricModalOpen(false)}
            />
            <ExpenseModal
                isOpen={isExpenseModalOpen}
                onClose={() => setExpenseModalOpen(false)}
            />
            <FloatingActionButton onClick={() => setChatbotOpen(true)} />
        </div>
    );
};

export default EmployeePortalPage;