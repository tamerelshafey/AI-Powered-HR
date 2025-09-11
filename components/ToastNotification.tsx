import React, { useEffect } from 'react';

interface ToastNotificationProps {
  message: string;
  type: 'success' | 'info' | 'error';
  onClose: () => void;
}

const ToastNotification: React.FC<ToastNotificationProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000); // Auto-close after 4 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  const baseClasses = "fixed top-20 end-6 z-[100] p-4 rounded-lg shadow-lg flex items-center animate-fade-in-down";
  const typeClasses = {
    success: "bg-green-500 text-white",
    info: "bg-blue-500 text-white",
    error: "bg-red-500 text-white",
  };
  const iconClasses = {
    success: "fas fa-check-circle",
    info: "fas fa-info-circle",
    error: "fas fa-exclamation-circle",
  };

  return (
    <div className={`${baseClasses} ${typeClasses[type]}`}>
      <i className={`${iconClasses[type]} me-3 text-xl`}></i>
      <span className="text-sm font-medium">{message}</span>
      <button onClick={onClose} className="ms-4 text-white hover:bg-white/20 p-1 rounded-full">
        <i className="fas fa-times"></i>
      </button>
      <style>{`
        @keyframes fade-in-down {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ToastNotification;