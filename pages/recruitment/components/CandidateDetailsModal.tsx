
import React, { useState, useEffect } from 'react';
import { Candidate, CandidateActivity } from '../../../types';
import Modal, { ModalBody, ModalFooter } from '../../../components/Modal';

interface CandidateDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidate: Candidate | null;
  onGenerateSummary: (candidateId: string) => void;
  isGenerating: boolean;
  generationError: string | null;
}

type ActiveTab = 'profile' | 'ai-summary' | 'activity';

const TabButton: React.FC<{ text: string; icon: string; isActive: boolean; onClick: () => void; controls: string; }> = ({ text, icon, isActive, onClick, controls }) => (
    <button
        onClick={onClick}
        className={`flex items-center space-x-2 space-x-reverse px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            isActive
                ? 'tab-button-active'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
        }`}
        role="tab"
        aria-selected={isActive}
        aria-controls={controls}
    >
        <i className={icon}></i>
        <span>{text}</span>
    </button>
);

const CandidateDetailsModal: React.FC<CandidateDetailsModalProps> = ({ isOpen, onClose, candidate, onGenerateSummary, isGenerating, generationError }) => {
    const [activeTab, setActiveTab] = useState<ActiveTab>('profile');

    useEffect(() => {
        if (!isOpen) {
            setActiveTab('profile'); // Reset tab on close
        }
    }, [isOpen]);


    if (!isOpen || !candidate) return null;

    const ProfileTab: React.FC = () => (
        <div className="space-y-6">
            <div>
                <h4 className="font-semibold text-gray-800 mb-3">معلومات الاتصال</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center text-gray-600"><i className="fas fa-envelope me-3 text-gray-400"></i><span>{candidate.email}</span></div>
                    <div className="flex items-center text-gray-600"><i className="fas fa-phone me-3 text-gray-400"></i><span>{candidate.phone}</span></div>
                </div>
            </div>
            <div>
                <h4 className="font-semibold text-gray-800 mb-3">السيرة الذاتية</h4>
                <a href={candidate.resumeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 space-x-reverse px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
                    <i className="fas fa-download"></i>
                    <span>تحميل السيرة الذاتية</span>
                </a>
            </div>
            <div>
                <h4 className="font-semibold text-gray-800 mb-3">المهارات الأساسية</h4>
                <div className="flex flex-wrap gap-2">
                    {candidate.skills.map(skill => (
                        <span key={skill} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">{skill}</span>
                    ))}
                </div>
            </div>
        </div>
    );

    const AiSummaryTab: React.FC = () => (
        <div className="bg-purple-50 border-s-4 border-purple-500 p-4 rounded-e-lg">
            <div className="flex items-start space-x-3 space-x-reverse">
                <i className="fas fa-brain text-purple-600 text-xl mt-1"></i>
                <div className="flex-1">
                    <h4 className="font-semibold text-purple-900 mb-2">ملخص السيرة الذاتية بالذكاء الاصطناعي</h4>
                    {isGenerating ? (
                        <div className="flex items-center text-sm text-purple-700">
                           <i className="fas fa-spinner fa-spin me-2"></i>
                           <span>جاري إنشاء الملخص...</span>
                        </div>
                    ) : generationError ? (
                        <div className="bg-red-100 border border-red-200 p-3 rounded-lg text-sm text-red-800">
                            <p><i className="fas fa-exclamation-circle me-2"></i>{generationError}</p>
                        </div>
                    ) : (
                       <p className="text-sm text-purple-800 leading-relaxed">{candidate.aiSummary}</p>
                    )}
                    <button
                        onClick={() => onGenerateSummary(candidate.id)}
                        disabled={isGenerating}
                        className="mt-4 flex items-center space-x-2 space-x-reverse px-3 py-1.5 bg-purple-600 text-white text-xs font-medium rounded-lg hover:bg-purple-700 transition-colors disabled:bg-purple-300 disabled:cursor-wait"
                    >
                        <i className={`fas ${generationError ? 'fa-redo' : 'fa-sync-alt'}`}></i>
                        <span>{isGenerating ? 'جاري التوليد...' : (generationError ? 'إعادة المحاولة' : 'إعادة توليد الملخص')}</span>
                    </button>
                </div>
            </div>
        </div>
    );
    
    const ActivityLogTab: React.FC = () => (
        <div className="space-y-4">
            {candidate.activities.map(activity => (
                 <div key={activity.id} className="flex items-start space-x-3 space-x-reverse">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <i className="fas fa-history text-gray-500 text-sm"></i>
                    </div>
                    <div>
                        <p className="text-sm text-gray-800">
                           {activity.activity} <span className="text-gray-500">بواسطة {activity.user}</span>
                        </p>
                        <p className="text-xs text-gray-500">{activity.date}</p>
                        {activity.notes && <p className="text-xs bg-gray-100 p-2 rounded mt-1">{activity.notes}</p>}
                    </div>
                </div>
            ))}
        </div>
    );

    const renderContent = () => {
        return (
            <>
                <div id="profile-panel" role="tabpanel" hidden={activeTab !== 'profile'}><ProfileTab /></div>
                <div id="ai-summary-panel" role="tabpanel" hidden={activeTab !== 'ai-summary'}><AiSummaryTab /></div>
                <div id="activity-panel" role="tabpanel" hidden={activeTab !== 'activity'}><ActivityLogTab /></div>
            </>
        )
    };
    
    const CustomHeader = () => (
        <div className="p-6">
            <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4 space-x-reverse">
                    <div className={`w-16 h-16 ${candidate.avatarColor} rounded-full flex items-center justify-center flex-shrink-0`}>
                        <span className="text-white text-2xl font-medium">{candidate.avatarInitials}</span>
                    </div>
                    <div>
                        <h3 id="candidate-details-title" className="text-xl font-bold text-gray-900">{candidate.name}</h3>
                        <p className="text-gray-600">مرشح لوظيفة: {candidate.positionApplied}</p>
                        <p className="text-sm text-gray-500 mt-1">تاريخ التقديم: {candidate.appliedDate}</p>
                    </div>
                </div>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600" aria-label="Close">
                    <i className="fas fa-times text-xl"></i>
                </button>
            </div>
        </div>
    );

    const footerContent = (
         <div className="flex justify-end space-x-3 space-x-reverse">
            <button type="button" className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700">رفض المرشح</button>
            <button type="button" className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700">جدولة مقابلة</button>
        </div>
    );

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="3xl">
            <CustomHeader />
            <div className="px-6 border-b border-gray-200">
                <nav className="flex space-x-4 space-x-reverse -mb-px" role="tablist" aria-label="Candidate Details">
                    <TabButton text="الملف الشخصي" icon="fas fa-user" isActive={activeTab === 'profile'} onClick={() => setActiveTab('profile')} controls="profile-panel" />
                    <TabButton text="ملخص الذكاء الاصطناعي" icon="fas fa-brain" isActive={activeTab === 'ai-summary'} onClick={() => setActiveTab('ai-summary')} controls="ai-summary-panel" />
                    <TabButton text="سجل النشاط" icon="fas fa-history" isActive={activeTab === 'activity'} onClick={() => setActiveTab('activity')} controls="activity-panel" />
                </nav>
            </div>
            <ModalBody className="min-h-[250px]">
                {renderContent()}
            </ModalBody>
            <ModalFooter>
                {footerContent}
            </ModalFooter>
        </Modal>
    );
};

export default CandidateDetailsModal;
