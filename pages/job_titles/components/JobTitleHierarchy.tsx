import React from 'react';
import { JobTitle } from '../../../types';

interface JobTitleNodeProps {
  jobTitle: JobTitle;
  jobTitlesByParent: Record<string, JobTitle[]>;
  onEdit: (jobTitle: JobTitle) => void;
  onAddSub: (parentId: string) => void;
}

const JobTitleNode: React.FC<JobTitleNodeProps> = ({ jobTitle, jobTitlesByParent, onEdit, onAddSub }) => {
  const children = jobTitlesByParent[jobTitle.id] || [];
  
  return (
    <div>
      <div className="flex items-center bg-white p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
        <div className="flex-1 flex items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center me-4 bg-blue-100 text-blue-600 flex-shrink-0`}>
            <i className="fas fa-sitemap"></i>
          </div>
          <div>
            <p className="font-medium text-gray-900">{jobTitle.name}</p>
            <p className="text-sm text-gray-500">
              <i className="fas fa-users me-2"></i>{jobTitle.employeeCount} موظفين
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2 space-x-reverse">
          <button onClick={() => onAddSub(jobTitle.id)} className="p-2 text-gray-500 hover:text-blue-600" title="إضافة مسمى فرعي">
            <i className="fas fa-plus-circle"></i>
          </button>
          <button onClick={() => onEdit(jobTitle)} className="p-2 text-gray-500 hover:text-green-600" title="تعديل">
            <i className="fas fa-pencil-alt"></i>
          </button>
        </div>
      </div>
      {children.length > 0 && (
        <div className="pe-8 mt-2 space-y-2 relative before:content-[''] before:absolute before:top-0 before:bottom-0 before:start-5 before:w-px before:bg-gray-300">
          {children.map(child => (
            <div key={child.id} className="relative ps-8">
               <div className="absolute top-5 -start-3.5 h-px w-8 bg-gray-300"></div>
              <JobTitleNode 
                jobTitle={child} 
                jobTitlesByParent={jobTitlesByParent}
                onEdit={onEdit}
                onAddSub={onAddSub}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


interface JobTitleHierarchyProps {
  jobTitles: JobTitle[];
  onEdit: (jobTitle: JobTitle) => void;
  onAddSub: (parentId: string) => void;
  onAdd: () => void;
}

const JobTitleHierarchy: React.FC<JobTitleHierarchyProps> = ({ jobTitles, onEdit, onAddSub, onAdd }) => {
  const jobTitlesByParent = jobTitles.reduce((acc, jt) => {
    const parentId = jt.parentJobTitleId || 'root';
    if (!acc[parentId]) {
      acc[parentId] = [];
    }
    acc[parentId].push(jt);
    return acc;
  }, {} as Record<string, JobTitle[]>);

  const rootJobTitles = jobTitlesByParent['root'] || [];

  return (
    <div className="space-y-4">
      {rootJobTitles.map(jobTitle => (
        <JobTitleNode 
            key={jobTitle.id}
            jobTitle={jobTitle}
            jobTitlesByParent={jobTitlesByParent}
            onEdit={onEdit}
            onAddSub={onAddSub}
        />
      ))}
      {jobTitles.length === 0 && (
          <div className="text-center py-12 text-gray-500 bg-white rounded-lg border">
              <i className="fas fa-sitemap text-4xl mb-3"></i>
              <p>لم يتم إضافة أي مسميات وظيفية بعد أو أنها لا تطابق بحثك.</p>
              <button
                onClick={onAdd}
                className="mt-6 flex items-center space-x-2 space-x-reverse px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mx-auto"
              >
                  <i className="fas fa-plus"></i>
                  <span>إضافة المسمى الوظيفي الأول</span>
              </button>
          </div>
      )}
    </div>
  );
};

export default JobTitleHierarchy;