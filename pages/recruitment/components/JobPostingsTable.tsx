
import React from 'react';
import { JobPosting, JobStatus } from '../../../types';

interface JobPostingsTableProps {
  postings: JobPosting[];
  selectedJobId: string | null;
  onSelectJob: (jobId: string | null) => void;
}

const statusClasses: Record<JobStatus, string> = {
    [JobStatus.ACTIVE]: 'bg-green-100 text-green-800',
    [JobStatus.CLOSED]: 'bg-red-100 text-red-800',
    [JobStatus.ON_HOLD]: 'bg-yellow-100 text-yellow-800',
};

const JobPostingsTable: React.FC<JobPostingsTableProps> = ({ postings, selectedJobId, onSelectJob }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">الوظائف الشاغرة</h3>
            {selectedJobId && (
                <button
                    onClick={() => onSelectJob(null)}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                    <i className="fas fa-times me-1"></i>
                    إلغاء تحديد الكل
                </button>
            )}
        </div>

        {/* Mobile View */}
        <div className="md:hidden">
             <div className="p-4 space-y-4">
                {postings.map(job => (
                    <div 
                        key={job.id} 
                        onClick={() => onSelectJob(job.id)}
                        className={`border rounded-lg p-4 space-y-3 cursor-pointer transition-colors ${selectedJobId === job.id ? 'bg-blue-50 border-blue-300' : 'bg-gray-50 border-gray-200'}`}
                    >
                        <div className="flex justify-between items-start">
                             <div>
                                <p className="font-semibold text-gray-800">{job.title}</p>
                                <p className="text-sm text-gray-500">{job.department}</p>
                            </div>
                             <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClasses[job.status]}`}>
                                {job.status}
                            </span>
                        </div>
                        <div className="flex justify-between items-center text-sm border-t pt-2">
                             <p className="text-gray-600">المتقدمون:</p>
                             <p className="font-bold text-blue-600">{job.applicantsCount} متقدم</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Desktop View */}
        <div className="overflow-x-auto hidden md:block">
            <table className="w-full">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">المسمى الوظيفي</th>
                        <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">القسم</th>
                        <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">المتقدمون</th>
                        <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">الحالة</th>
                        <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">الإجراءات</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {postings.map(job => (
                        <tr 
                            key={job.id} 
                            onClick={() => onSelectJob(job.id)}
                            className={`cursor-pointer transition-colors ${selectedJobId === job.id ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                        >
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">{job.title}</div>
                                <div className="text-sm text-gray-500">تاريخ النشر: {job.postedDate}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{job.department}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-blue-600">{job.applicantsCount} متقدم</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClasses[job.status]}`}>
                                    {job.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <button className="text-blue-600 hover:text-blue-900 me-3" onClick={(e) => e.stopPropagation()}>عرض المتقدمين</button>
                                <button className="text-gray-500 hover:text-gray-700" onClick={(e) => e.stopPropagation()}>تعديل</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

export default JobPostingsTable;
