
import React, { useState, useEffect, useRef } from 'react';
// FIX: Switched to namespace import for react-router-dom to resolve module resolution errors.
import * as ReactRouterDOM from 'react-router-dom';
import { useUser } from '../context/UserContext';
import LanguageSwitcher from './LanguageSwitcher';
import { useI18n } from '../context/I18nContext';
import NotificationsPopover from './NotificationsPopover';
import { Notification } from '../types';
import { getNotifications } from '../services/api';
import UserSwitcher from './UserSwitcher';
import { formatTime } from '../utils/formatters';

interface HeaderProps {
  onOpenSmartSearch: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenSmartSearch }) => {
  const location = ReactRouterDOM.useLocation();
  const navigate = ReactRouterDOM.useNavigate();
  const { currentUser, setCurrentUser } = useUser();
  const { t, language } = useI18n();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [lastUpdate, setLastUpdate] = useState(2);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  
  // Notification state
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isNotificationsOpen, setNotificationsOpen] = useState(false);
  const notificationRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fetchNotifs = async () => {
        const notifs = await getNotifications();
        setNotifications(notifs);
        setUnreadCount(notifs.filter(n => !n.read).length);
    };
    fetchNotifs();

    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    const updateTimer = setInterval(() => setLastUpdate(Math.floor(Math.random() * 5) + 1), 60000);
    
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      clearInterval(timer);
      clearInterval(updateTimer);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    }
  }, []);

  const handleToggleNotifications = () => {
    setNotificationsOpen(prev => {
        // If we are opening the popover and there are unread notifications
        if (!prev && unreadCount > 0) {
            // Mark all as read and reset count
            setNotifications(currentNotifications => 
                currentNotifications.map(n => ({ ...n, read: true }))
            );
            setUnreadCount(0);
        }
        return !prev;
    });
  };

  const handleLogout = () => {
    setCurrentUser(null);
    navigate('/login');
  };

  if (!currentUser) return null; // Should not happen within Layout, but good practice

  const timeString = formatTime(currentTime, language, { second: '2-digit' });

  const pageInfo: { [key: string]: { titleKey: string, badgeKey?: string, badgeColor?: 'green' | 'blue' } } = {
    '/dashboard': { titleKey: 'header.pageTitle.dashboard', badgeKey: 'header.aiStatus', badgeColor: 'green' },
    '/employees': { titleKey: 'header.pageTitle.employees' },
    '/attendance': { titleKey: 'header.pageTitle.attendance', badgeKey: 'header.liveTracking', badgeColor: 'green' },
    '/leaves': { titleKey: 'header.pageTitle.leaves', badgeKey: 'header.autoApprovalActive', badgeColor: 'green' },
    '/reports': { titleKey: 'header.pageTitle.reports', badgeKey: 'header.realTimeAnalytics', badgeColor: 'blue' },
  };

  const currentPage = pageInfo[location.pathname] || { titleKey: 'header.pageTitle.default' };
  
  const badgeContent = currentPage.badgeKey ? (
    <>
      <div className={`w-2 h-2 ${currentPage.badgeColor === 'green' ? 'bg-green-500' : 'bg-blue-500'} rounded-full animate-pulse`}></div>
      <span className={`text-sm ${currentPage.badgeColor === 'green' ? 'text-green-700' : 'text-blue-700'} font-medium`}>{t(currentPage.badgeKey)}</span>
    </>
  ) : null;

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-20">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <i className="fas fa-brain text-white text-lg"></i>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{t('header.title')}</h1>
                <p className="text-xs text-gray-500">{t(currentPage.titleKey)}</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 space-x-reverse">
            {!isOnline && (
                <div className="hidden sm:flex items-center space-x-2 space-x-reverse bg-red-100 px-3 py-1 rounded-full">
                    <i className="fas fa-wifi-slash text-red-600"></i>
                    <span className="text-sm text-red-700 font-medium">{t('header.offline')}</span>
                </div>
            )}
            {badgeContent && isOnline && (
               <div className="hidden sm:flex items-center space-x-2 space-x-reverse bg-gray-100 px-3 py-1 rounded-full">
                  {badgeContent}
               </div>
            )}
            
            <div className="hidden md:block text-center">
              {location.pathname === '/reports' ? 
                (<>
                  <div className="text-sm font-medium text-gray-900">{t('header.lastUpdated', { lastUpdate })}</div>
                  <div className="text-xs text-gray-500">{t('header.lastSync')}</div>
                </>) :
                (<>
                  <div className="text-sm font-medium text-gray-900">{timeString}</div>
                  <div className="text-xs text-gray-500">{t('header.currentTime')}</div>
                </>)
              }
            </div>
            
            <button onClick={onOpenSmartSearch} className="p-2 text-gray-600 hover:text-gray-900" aria-label={t('header.smartSearchAria')}>
              <i className="fas fa-wand-magic-sparkles text-lg"></i>
            </button>
            <LanguageSwitcher />
            <UserSwitcher />
            
            <div className="relative">
              <button onClick={handleToggleNotifications} className="relative p-2 text-gray-600 hover:text-gray-900" aria-label={t('header.notificationsAria')}>
                <i className="fas fa-bell text-lg" aria-hidden="true"></i>
                {unreadCount > 0 && (
                  <span ref={notificationRef} className="absolute top-0 end-0 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-notification-pop" aria-hidden="true">{unreadCount}</span>
                )}
                <span className="sr-only">{t('header.notificationsSr', { notificationCount: unreadCount })}</span>
              </button>
              <NotificationsPopover 
                isOpen={isNotificationsOpen} 
                onClose={() => setNotificationsOpen(false)} 
                notifications={notifications}
              />
            </div>

            <button onClick={handleLogout} className="p-2 text-gray-600 hover:text-gray-900" aria-label={t('header.logoutAria')}>
              <i className="fas fa-sign-out-alt text-lg"></i>
            </button>
            
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="text-start">
                <p className="text-sm font-medium text-gray-900">{currentUser.name}</p>
                <p className="text-xs text-gray-500">{t(`enum.userRole.${currentUser.role}`)}</p>
              </div>
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-cover bg-center" style={{backgroundImage: `url(${currentUser.avatar})`}}>
              </div>
            </div>

          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
