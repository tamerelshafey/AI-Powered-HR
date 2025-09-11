import React from 'react';
import { Candidate } from '../../../types';

interface CandidateCardProps {
  candidate: Candidate;
  onViewCandidate: (candidate: Candidate) => void;
}

const CandidateCard: React.FC<CandidateCardProps> = ({ candidate, onViewCandidate }) => {

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('candidateId', candidate.id);
    setTimeout(() => {
        e.currentTarget.classList.add('dragging');
    }, 0);
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
      e.currentTarget.classList.remove('dragging');
  };
  
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
        onViewCandidate(candidate);
    }
  };

  return (
    <div 
        className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
        draggable="true"
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onClick={() => onViewCandidate(candidate)}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-label={`View details for ${candidate.name}, applicant for ${candidate.positionApplied}`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2 space-x-reverse">
          <div className={`w-8 h-8 ${candidate.avatarColor} rounded-full flex items-center justify-center flex-shrink-0`}>
            <span className="text-white text-xs font-medium">{candidate.avatarInitials}</span>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-900">{candidate.name}</h4>
            <p className="text-xs text-gray-500">{candidate.positionApplied}</p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600 p-1" onClick={(e) => e.stopPropagation()} aria-label={`More options for ${candidate.name}`}>
            <i className="fas fa-ellipsis-h"></i>
        </button>
      </div>
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span><i className="fas fa-calendar-alt me-1"></i>{candidate.appliedDate}</span>
        <div className="flex items-center space-x-1 space-x-reverse">
            <i className="fas fa-star text-yellow-400"></i>
            <span>4.5</span>
        </div>
      </div>
    </div>
  );
};

export default CandidateCard;