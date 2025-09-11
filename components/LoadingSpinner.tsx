
import React from 'react';

interface LoadingSpinnerProps {
    fullScreen?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ fullScreen = false }) => {
    const containerClasses = fullScreen 
        ? "flex justify-center items-center h-screen" 
        : "flex justify-center items-center h-full min-h-[calc(100vh-150px)]";

    return (
        <div className={containerClasses}>
            <i className="fas fa-spinner fa-spin text-4xl text-blue-600"></i>
        </div>
    );
};

export default LoadingSpinner;