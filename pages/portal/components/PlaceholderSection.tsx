import React from 'react';

const PlaceholderSection: React.FC = () => {
  return (
    <div className="mt-8 p-12 flex flex-col items-center justify-center bg-white rounded-lg shadow-md border-2 border-dashed border-gray-300 min-h-[60vh]">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
      <h4 className="mt-4 text-xl font-semibold text-gray-600">هذه الوحدة قيد الإنشاء</h4>
      <p className="mt-2 text-gray-500">سيتم بناء وتفعيل هذه الصفحة قريبًا.</p>
    </div>
  );
};

export default PlaceholderSection;
