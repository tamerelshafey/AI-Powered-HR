
import React, { useEffect, useRef } from 'react';
import { Notification } from '../types';
import { useI18n } from '../context/I18nContext';

interface NotificationsPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
}

const notificationIcons: Record<Notification['type'], { icon: string; color: string }> = {
    leave: { icon: 'fas fa-calendar-alt', color: 'text-blue-500' },
    document: { icon: 'fas fa-file-alt', color: 'text-orange-500' },
    recruitment: { icon: 'fas fa-user-plus', color: 'text-green-500' },
    system: { icon: 'fas fa-cogs', color: 'text-purple-500' },
};

const NotificationsPopover: React.FC<NotificationsPopoverProps> = ({ isOpen, onClose, notifications }) => {
    const popoverRef = useRef<HTMLDivElement>(null);
    const { t } = useI18n();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
                onClose();
            }
        };
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) {
        return null;
    }

    return (
        <div
            ref={popoverRef}
            className="absolute end-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-50 border border-gray-100 animate-fade-in-down"
            role="dialog"
            aria-labelledby="notifications-title"
        >
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <h3 id="notifications-title" className="text-sm font-medium text-gray-900">{t('notifications.title')}</h3>
                <button className="text-xs text-blue-600 hover:underline">{t('notifications.markAllRead')}</button>
            </div>
            <div className="py-2 max-h-80 overflow-y-auto">
                {notifications.length > 0 ? (
                    notifications.map(notif => {
                        const iconInfo = notificationIcons[notif.type];
                        return (
                            <div key={notif.id} className={`p-3 flex items-start space-x-3 space-x-reverse hover:bg-gray-50 ${!notif.read ? 'bg-blue-50' : ''}`}>
                                {!notif.read && <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>}
                                <i className={`${iconInfo.icon} ${iconInfo.color} text-base mt-1 flex-shrink-0 w-5 text-center`}></i>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-800">{notif.title}</p>
                                    <p className="text-xs text-gray-500 mt-1">{notif.description}</p>
                                    <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="text-center py-8 text-gray-500">
                        <i className="fas fa-bell-slash text-3xl mb-2"></i>
                        <p>{t('notifications.noNew')}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NotificationsPopover;
