import React, { useState, useEffect, useMemo, useCallback } from 'react';
import PageHeader from './components/PageHeader';
import JobTitleHierarchy from './components/JobTitleHierarchy';
import JobTitleModal from './components/JobTitleModal';
import { JobTitle } from '../../types';
import { getJobTitles } from '../../services/api';
import { ErrorDisplay } from '../../components/ModulePlaceholder';

const JobTitlesPage: React.FC = () => {
  const [jobTitles, setJobTitles] = useState<JobTitle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingJobTitle, setEditingJobTitle] = useState<JobTitle | null>(null);
  const [parentId, setParentId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getJobTitles();
      setJobTitles(data);
    } catch (error) {
      console.error("Failed to fetch job titles", error);
      setError("فشل في تحميل بيانات المسميات الوظيفية.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleOpenModal = () => {
    setEditingJobTitle(null);
    setParentId(null);
    setModalOpen(true);
  };

  const handleEdit = (jobTitle: JobTitle) => {
    setEditingJobTitle(jobTitle);
    setParentId(null);
    setModalOpen(true);
  };

  const handleAddSub = (parentId: string) => {
    setEditingJobTitle(null);
    setParentId(parentId);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingJobTitle(null);
    setParentId(null);
  };

  const filteredJobTitles = useMemo(() => {
    if (!searchTerm) return jobTitles;
    
    const lowercasedFilter = searchTerm.toLowerCase();
    const filtered = new Set<string>();
    
    jobTitles.forEach(jt => {
        if (jt.name.toLowerCase().includes(lowercasedFilter)) {
            let current: JobTitle | undefined = jt;
            while(current) {
                filtered.add(current.id);
                current = jobTitles.find(parent => parent.id === current!.parentJobTitleId);
            }
        }
    });

    return jobTitles.filter(jt => filtered.has(jt.id));
  }, [searchTerm, jobTitles]);


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
      <PageHeader onAddJobTitle={handleOpenModal} />
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6 p-4">
          <div className="relative">
              <i className="fas fa-search absolute end-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              <input 
                  type="text" 
                  placeholder="بحث عن مسمى وظيفي..." 
                  className="w-full pe-10 ps-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
              />
          </div>
      </div>

      <JobTitleHierarchy 
        jobTitles={filteredJobTitles} 
        onEdit={handleEdit}
        onAddSub={handleAddSub}
        onAdd={handleOpenModal}
      />

      <JobTitleModal 
        isOpen={isModalOpen}
        onClose={closeModal}
        jobTitle={editingJobTitle}
        parentId={parentId}
        allJobTitles={jobTitles}
      />
    </div>
  );
};

export default JobTitlesPage;