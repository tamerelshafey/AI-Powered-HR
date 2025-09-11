import React, { useState } from 'react';
import { Candidate, HiringStage } from '../../../types';
import CandidateCard from './CandidateCard';

interface HiringPipelineProps {
    candidates: Candidate[];
    onCandidateStageChange: (candidateId: string, newStage: HiringStage) => void;
    jobTitle: string | null;
    onViewCandidate: (candidate: Candidate) => void;
}

const stageConfig = {
    [HiringStage.APPLIED]: { title: 'التقديم', color: 'bg-blue-500' },
    [HiringStage.SCREENING]: { title: 'الفرز', color: 'bg-orange-500' },
    [HiringStage.INTERVIEW]: { title: 'المقابلة', color: 'bg-purple-500' },
    [HiringStage.OFFER]: { title: 'العرض', color: 'bg-yellow-500' },
    [HiringStage.HIRED]: { title: 'التعيين', color: 'bg-green-500' },
};

const HiringPipeline: React.FC<HiringPipelineProps> = ({ candidates, onCandidateStageChange, jobTitle, onViewCandidate }) => {
    const stages = Object.values(HiringStage);
    const [draggedOverStage, setDraggedOverStage] = useState<HiringStage | null>(null);

    const candidatesByStage = (stage: HiringStage) => {
        return candidates.filter(c => c.stage === stage);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };
    
    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>, stage: HiringStage) => {
        setDraggedOverStage(stage);
    };
    
    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        setDraggedOverStage(null);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>, stage: HiringStage) => {
        e.preventDefault();
        const candidateId = e.dataTransfer.getData('candidateId');
        if (candidateId) {
            onCandidateStageChange(candidateId, stage);
        }
        setDraggedOverStage(null);
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">
                    {jobTitle ? `مراحل التوظيف لـ: ${jobTitle}` : 'مراحل التوظيف'}
                </h3>
            </div>
            <div className="p-6">
                <div className="flex space-x-4 space-x-reverse overflow-x-auto pb-4">
                    {stages.map(stage => {
                        const config = stageConfig[stage];
                        const stageCandidates = candidatesByStage(stage);
                        const isDropZone = draggedOverStage === stage;
                        return (
                            <div 
                                key={stage} 
                                className={`flex-shrink-0 w-72 bg-gray-50 rounded-lg p-4 transition-all duration-200 ${isDropZone ? 'drop-zone-active' : ''}`}
                                onDragOver={handleDragOver}
                                onDrop={(e) => handleDrop(e, stage)}
                                onDragEnter={(e) => handleDragEnter(e, stage)}
                                onDragLeave={handleDragLeave}
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center space-x-2 space-x-reverse">
                                        <div className={`w-2 h-2 ${config.color} rounded-full`}></div>
                                        <h4 className="font-medium text-gray-900">{config.title}</h4>
                                    </div>
                                    <span className="text-sm font-bold text-gray-600 bg-gray-200 rounded-full px-2 py-0.5">
                                        {stageCandidates.length}
                                    </span>
                                </div>
                                <div className="space-y-3 h-96 overflow-y-auto">
                                    {stageCandidates.map(candidate => (
                                        <CandidateCard 
                                            key={candidate.id} 
                                            candidate={candidate} 
                                            onViewCandidate={onViewCandidate}
                                        />
                                    ))}
                                    {stageCandidates.length === 0 && (
                                        <div className="text-center py-10 text-gray-400 text-sm">
                                            <i className="fas fa-folder-open text-2xl mb-2"></i>
                                            <p>لا يوجد مرشحون</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default HiringPipeline;