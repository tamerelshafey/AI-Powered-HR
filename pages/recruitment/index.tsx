
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import RecruitmentStats from './components/RecruitmentStats';
import JobPostingsTable from './components/JobPostingsTable';
import HiringPipeline from './components/HiringPipeline';
import { getJobPostings, getCandidates } from '../../services/api';
import { JobPosting, Candidate, HiringStage } from '../../types';
import NewPostingModal from './components/NewPostingModal';
import CandidateDetailsModal from './components/CandidateDetailsModal';
import StartOnboardingModal from './components/StartOnboardingModal';
import { GoogleGenAI } from '@google/genai';
import { ErrorDisplay } from '../../components/ModulePlaceholder';
import { useI18n } from '../../context/I18nContext';

// Lazily initialize the GoogleGenAI client to avoid issues on app load
let ai: GoogleGenAI | null = null;
const getAiClient = () => {
  if (!ai) {
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
  }
  return ai;
};


const RecruitmentPage: React.FC = () => {
  const [jobPostings, setJobPostings] = useState<JobPosting[]>([]);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isNewPostingModalOpen, setNewPostingModalOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [candidateToHire, setCandidateToHire] = useState<Candidate | null>(null);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState<Record<string, boolean>>({});
  const [generationError, setGenerationError] = useState<Record<string, string | null>>({});
  const navigate = useNavigate();
  const { t } = useI18n();

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [postingsData, candidatesData] = await Promise.all([
        getJobPostings(),
        getCandidates()
      ]);
      setJobPostings(postingsData);
      setCandidates(candidatesData);
    } catch (error) {
      console.error("Failed to fetch recruitment data", error);
      setError("فشل في تحميل بيانات التوظيف.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCandidateStageChange = (candidateId: string, newStage: HiringStage) => {
    const candidate = candidates.find(c => c.id === candidateId);
    if (!candidate) return;

    if (newStage === HiringStage.HIRED && candidate.stage !== HiringStage.HIRED) {
      setCandidateToHire(candidate);
    } else {
      setCandidates(prevCandidates =>
        prevCandidates.map(c =>
          c.id === candidateId ? { ...c, stage: newStage } : c
        )
      );
    }
  };
  
  const handleConfirmOnboarding = () => {
    if (candidateToHire) {
      setCandidates(prevCandidates =>
        prevCandidates.map(c =>
          c.id === candidateToHire.id ? { ...c, stage: HiringStage.HIRED } : c
        )
      );
      navigate('/onboarding-offboarding', { state: { newHire: candidateToHire } });
      setCandidateToHire(null);
    }
  };

  const handleGenerateSummary = async (candidateId: string) => {
    const candidate = candidates.find(c => c.id === candidateId);
    if (!candidate) return;

    setIsGeneratingSummary(prev => ({ ...prev, [candidateId]: true }));
    setGenerationError(prev => ({ ...prev, [candidateId]: null })); // Clear previous error
    try {
        const client = getAiClient();
        const prompt = `بصفتك خبير توظيف، قم بإنشاء ملخص احترافي وموجز للمرشح التالي لوظيفة "${candidate.positionApplied}". ركز على نقاط قوته الرئيسية بناءً على مهاراته المعلنة وكيف تتناسب مع الوظيفة. المهارات: ${candidate.skills.join(', ')}.`;

        // FIX: Updated deprecated model 'gemini-1.5-flash' to 'gemini-2.5-flash'.
        const response = await client.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        // FIX: Access the generated text directly from the `text` property of the response object.
        const newSummary = response.text;

        if (!newSummary || newSummary.trim() === '') {
            throw new Error("Received an empty summary from the AI.");
        }

        setCandidates(prev =>
            prev.map(c => (c.id === candidateId ? { ...c, aiSummary: newSummary } : c))
        );
         // Update selectedCandidate state if it's the one being updated
        if (selectedCandidate && selectedCandidate.id === candidateId) {
            setSelectedCandidate(prev => prev ? { ...prev, aiSummary: newSummary } : null);
        }

    } catch (error) {
        console.error("Error generating AI summary:", error);
        setGenerationError(prev => ({ ...prev, [candidateId]: "فشل في إنشاء الملخص. يرجى المحاولة مرة أخرى." }));
    } finally {
        setIsGeneratingSummary(prev => ({ ...prev, [candidateId]: false }));
    }
  };


  const handleAddNewPosting = (newPosting: JobPosting) => {
    setJobPostings(prevPostings => [newPosting, ...prevPostings]);
  };

  const handleViewCandidate = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
  };

  const handleCloseDetailsModal = () => {
    setSelectedCandidate(null);
  };

  const filteredCandidates = useMemo(() => {
    if (!selectedJobId) {
      return candidates;
    }
    const selectedJob = jobPostings.find(job => job.id === selectedJobId);
    if (!selectedJob) return candidates;

    return candidates.filter(candidate => candidate.positionApplied === selectedJob.title);
  }, [selectedJobId, candidates, jobPostings]);

  const selectedJobTitle = useMemo(() => {
    if (!selectedJobId) return null;
    return jobPostings.find(job => job.id === selectedJobId)?.title || null;
  }, [selectedJobId, jobPostings]);

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

  return (
    <div>
      <PageHeader
        title={t('page.recruitment.header.title')}
        subtitle={t('page.recruitment.header.subtitle')}
        actions={
          <button onClick={() => setNewPostingModalOpen(true)} className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <i className="fas fa-plus"></i>
            <span>{t('page.recruitment.header.newPosting')}</span>
          </button>
        }
      />
      <RecruitmentStats postings={jobPostings} candidates={candidates} />
      <div className="mb-8">
        <JobPostingsTable
          postings={jobPostings}
          selectedJobId={selectedJobId}
          onSelectJob={setSelectedJobId}
        />
      </div>
      <div>
        <HiringPipeline
          candidates={filteredCandidates}
          onCandidateStageChange={handleCandidateStageChange}
          jobTitle={selectedJobTitle}
          onViewCandidate={handleViewCandidate}
        />
      </div>

      <NewPostingModal 
        isOpen={isNewPostingModalOpen}
        onClose={() => setNewPostingModalOpen(false)}
        onAddPosting={handleAddNewPosting}
      />

      <CandidateDetailsModal
        isOpen={!!selectedCandidate}
        onClose={handleCloseDetailsModal}
        candidate={selectedCandidate}
        onGenerateSummary={handleGenerateSummary}
        isGenerating={selectedCandidate ? isGeneratingSummary[selectedCandidate.id] : false}
        generationError={selectedCandidate ? generationError[selectedCandidate.id] : null}
      />

      <StartOnboardingModal
        isOpen={!!candidateToHire}
        onClose={() => setCandidateToHire(null)}
        onConfirm={handleConfirmOnboarding}
        candidate={candidateToHire}
      />
    </div>
  );
};

export default RecruitmentPage;