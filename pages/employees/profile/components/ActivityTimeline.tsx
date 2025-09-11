import React from 'react';
import { EmployeeActivity } from '../../../../types';

interface ActivityTimelineProps {
  activities: EmployeeActivity[];
}

const colorClasses = {
  blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
  green: { bg: 'bg-green-100', text: 'text-green-600' },
  red: { bg: 'bg-red-100', text: 'text-red-600' },
  purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
  orange: { bg: 'bg-orange-100', text: 'text-orange-600' },
};

const ActivityTimeline: React.FC<ActivityTimelineProps> = ({ activities }) => {
  return (
    <div className="space-y-4">
      {activities.map((activity, index) => {
        const colors = colorClasses[activity.color];
        return (
          <div key={activity.id} className="timeline-item flex items-start space-x-3 space-x-reverse">
            <div className={`w-10 h-10 ${colors.bg} rounded-full flex items-center justify-center flex-shrink-0 relative`}>
              <i className={`${activity.icon} ${colors.text}`}></i>
               {index < activities.length - 1 && <div className="absolute top-full start-1/2 -translate-x-1/2 h-4 w-0.5 bg-gray-200"></div>}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">{activity.title}</p>
              <p className="text-sm text-gray-500">{activity.description}</p>
              <p className="text-xs text-gray-400 mt-1">{activity.timestamp}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ActivityTimeline;