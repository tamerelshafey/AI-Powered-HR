// utils/formatters.ts
type Language = 'en' | 'ar';

export const formatCurrency = (
    amount: number, 
    lang: Language, 
    options: Intl.NumberFormatOptions = {}
): string => {
    const currency = lang === 'ar' ? 'EGP' : 'USD';
    const locale = lang === 'ar' ? 'ar-EG' : 'en-US';
    
    const defaultOptions: Intl.NumberFormatOptions = {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    };
    
    return new Intl.NumberFormat(locale, { ...defaultOptions, ...options }).format(amount);
};

export const formatDate = (
    dateString: string | Date, 
    lang: Language, 
    options?: Intl.DateTimeFormatOptions
): string => {
    const locale = lang === 'ar' ? 'ar-EG' : 'en-US';
    const defaultOptions: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    return new Intl.DateTimeFormat(locale, { ...defaultOptions, ...options }).format(date);
};

export const formatTime = (
    date: Date,
    lang: Language,
    options?: Intl.DateTimeFormatOptions
): string => {
    const locale = lang === 'ar' ? 'ar-EG' : 'en-US';
    const defaultOptions: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    };
    return new Intl.DateTimeFormat(locale, { ...defaultOptions, ...options }).format(date);
};


export const formatTimeFromString = (
    timeString: string | null,
    lang: Language,
    options?: Intl.DateTimeFormatOptions
): string => {
    if (!timeString) return '--:--';
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours, 10));
    date.setMinutes(parseInt(minutes, 10));
    
    const locale = lang === 'ar' ? 'ar-EG' : 'en-US';
    const defaultOptions: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    };
    return new Intl.DateTimeFormat(locale, { ...defaultOptions, ...options }).format(date);
};


// Centralized version of the timeSince function from TicketListItem
export const formatTimeSince = (dateString: string): string => {
    const seconds = Math.floor((new Date().getTime() - new Date(dateString).getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return `منذ ${Math.floor(interval)} سنوات`;
    interval = seconds / 2592000;
    if (interval > 1) return `منذ ${Math.floor(interval)} أشهر`;
    interval = seconds / 86400;
    if (interval > 1) return `منذ ${Math.floor(interval)} أيام`;
    interval = seconds / 3600;
    if (interval > 1) return `منذ ${Math.floor(interval)} ساعات`;
    interval = seconds / 60;
    if (interval > 1) return `منذ ${Math.floor(interval)} دقائق`;
    return 'الآن';
};