import React from 'react';

interface FloatingActionButtonProps {
    onClick: () => void;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ onClick }) => {
    return (
        <button 
            onClick={onClick}
            className="floating-action w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
            aria-label="AI Assistant"
        >
            <i className="fas fa-comment-dots text-xl"></i>
        </button>
    );
};

export default FloatingActionButton;