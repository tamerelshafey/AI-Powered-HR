
import React, { useState, useEffect } from 'react';
import { FeedItem } from '../../../types';
import { useI18n } from '../../../context/I18nContext';
import { pollNewEvents } from '../../../services/api';

interface LiveFeedProps {
    initialItems: FeedItem[];
}

const LiveFeed: React.FC<LiveFeedProps> = ({ initialItems }) => {
    const [feedItems, setFeedItems] = useState<FeedItem[]>(initialItems);
    const { t } = useI18n();

    useEffect(() => {
        const interval = setInterval(async () => {
            const newEvents = await pollNewEvents();
            if (newEvents.length > 0) {
                 setFeedItems(prevItems => [...newEvents, ...prevItems.slice(0, 5)]);
            }
        }, 5000); // Poll every 5 seconds

        return () => clearInterval(interval);
    }, []);

    const colorClasses: Record<string, { bg: string, text: string, iconBg: string }> = {
        green: { bg: 'bg-green-50', text: 'text-green-600', iconBg: 'bg-green-500' },
        orange: { bg: 'bg-orange-50', text: 'text-orange-600', iconBg: 'bg-orange-500' },
        purple: { bg: 'bg-purple-50', text: 'text-purple-600', iconBg: 'bg-purple-500' },
        blue: { bg: 'bg-blue-50', text: 'text-blue-600', iconBg: 'bg-blue-500' },
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 h-full">
            <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                        <i className="fas fa-broadcast-tower text-green-600 me-2"></i>
                        {t('page.attendance.liveFeed.title')}
                    </h3>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">{t('page.attendance.liveFeed.live')}</span>
                </div>
            </div>
            <div className="p-6">
                <div className="space-y-4 max-h-80 overflow-y-auto">
                    {feedItems.map((item, index) => {
                        const colors = colorClasses[item.iconColor] || colorClasses.blue;
                        const animationClass = index === 0 && item.time === 'now' ? 'animate-feed-item-fade-in' : '';
                        return (
                            <div key={item.id} className={`flex items-center space-x-3 space-x-reverse p-3 rounded-lg ${colors.bg} ${animationClass}`}>
                                <div className={`w-8 h-8 ${colors.iconBg} rounded-full flex items-center justify-center`}>
                                    <i className={`${item.icon} text-white text-sm`}></i>
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-900">{item.title}</p>
                                    <p className="text-xs text-gray-500">{item.subtitle}</p>
                                </div>
                                <span className={`text-xs font-medium ${colors.text}`}>{item.time}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default LiveFeed;
