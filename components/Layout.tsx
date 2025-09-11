

import React, { useState } from 'react';
// FIX: Switched to namespace import for react-router-dom to resolve module resolution errors.
import * as ReactRouterDOM from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { useUser } from '../context/UserContext';
import SmartSearchModal from './SmartSearchModal';

const Layout: React.FC = () => {
  const { currentUser } = useUser();
  const navigate = ReactRouterDOM.useNavigate();
  const [isSmartSearchOpen, setSmartSearchOpen] = useState(false);
  
  if (!currentUser) {
    // This should theoretically not be reached due to ProtectedRoute, but as a safeguard.
    navigate('/login');
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      <SmartSearchModal isOpen={isSmartSearchOpen} onClose={() => setSmartSearchOpen(false)} />
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
            onOpenSmartSearch={() => setSmartSearchOpen(true)}
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <div className="container mx-auto px-6 py-8 animate-content-fade-in">
            <ReactRouterDOM.Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;