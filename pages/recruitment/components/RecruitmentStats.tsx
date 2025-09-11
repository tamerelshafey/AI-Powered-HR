
import React from 'react';
import StatsCard from '../../../components/dashboard/StatsCard';
import { JobPosting, Candidate, JobStatus, HiringStage } from '../../../types';

interface RecruitmentStatsProps {
    postings: JobPosting[];
    candidates: Candidate[];
}

const RecruitmentStats: React.FC<RecruitmentStatsProps> = ({ postings, candidates }) => {
    const openPositions = postings.filter(p => p.status === JobStatus.ACTIVE).length;
    const newApplicants = candidates.filter(c => c.stage === HiringStage.APPLIED).length;
    const inReview = candidates.filter(c => c.stage === HiringStage.SCREENING || c.stage === HiringStage.INTERVIEW).length;
    const hiredThisMonth = candidates.filter(c => c.stage === HiringStage.HIRED).length;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard icon="fas fa-briefcase" labelKey="recruitmentStats.openPositions" value={String(openPositions)} iconBgColor="bg-blue-100" iconColor="text-blue-600" />
            <StatsCard icon="fas fa-users" labelKey="recruitmentStats.newApplicants" value={String(newApplicants)} iconBgColor="bg-green-100" iconColor="text-green-600" />
            <StatsCard icon="fas fa-user-clock" labelKey="recruitmentStats.inReview" value={String(inReview)} iconBgColor="bg-orange-100" iconColor="text-orange-600" />
            <StatsCard icon="fas fa-handshake" labelKey="recruitmentStats.hiredThisMonth" value={String(hiredThisMonth)} iconBgColor="bg-purple-100" iconColor="text-purple-600" />
        </div>
    );
};

export default RecruitmentStats;
