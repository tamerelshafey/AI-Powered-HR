

import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { useUser } from '../context/UserContext';
import SmartSearchModal from './SmartSearchModal';
import UpdateNotificationModal from './UpdateNotificationModal';
import { UserRole } from '../types';

const Layout: React.FC = () => {
  const { currentUser } = useUser();
  const navigate = useNavigate();
  const [isSmartSearchOpen, setSmartSearchOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);

  useEffect(() => {
    const hasSeenModal = localStorage.getItem('updateModalShown_v2');
    const isEligibleRole = currentUser && [UserRole.SYSTEM_ADMINISTRATOR, UserRole.HR_MANAGER].includes(currentUser.role);
    
    if (isEligibleRole && !hasSeenModal) {
        setUpdateModalOpen(true);
        localStorage.setItem('updateModalShown_v2', 'true');
    }
  }, [currentUser]);

  const handleGoToSettings = () => {
      setUpdateModalOpen(false);
      navigate('/settings');
  };
  
  if (!currentUser) {
    // This should theoretically not be reached due to ProtectedRoute, but as a safeguard.
    navigate('/login');
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      <SmartSearchModal isOpen={isSmartSearchOpen} onClose={() => setSmartSearchOpen(false)} />
      <UpdateNotificationModal 
          isOpen={isUpdateModalOpen} 
          onClose={() => setUpdateModalOpen(false)} 
          onGoToSettings={handleGoToSettings} 
      />
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-y-auto">
        <Header 
            onOpenSmartSearch={() => setSmartSearchOpen(true)}
        />
        <main className="flex-1">
          <div className="container mx-auto px-6 py-8 animate-content-fade-in">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;