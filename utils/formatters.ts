// utils/formatters.ts
type Language = 'en' | 'ar';

export const formatCurrency = (
    amount: number, 
    lang: Language, 
    options: Intl.NumberFormatOptions = {}
): string => {
    // FIX: Hardcode currency to EGP as per user request, regardless of language.
    const currency = 'EGP'; 
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

export const formatDaysString = (
    count: number,
    t: (key: string, params?: { [key: string]: string | number }) => string,
    lang: Language
): string => {
    const roundedCount = Math.floor(count);
    if (lang === 'en') {
        return roundedCount === 1 ? t('common.days_singular', { count: roundedCount }) : t('common.days_plural', { count: roundedCount });
    }
    // Arabic
    if (roundedCount === 1) return t('common.days_singular');
    if (roundedCount === 2) return t('common.days_dual');
    if (roundedCount >= 3 && roundedCount <= 10) return t('common.days_plural_few', { count: roundedCount });
    return t('common.days_plural_many', { count: roundedCount });
};

export const formatDaysRemainingString = (
    count: number,
    t: (key: string, params?: { [key: string]: string | number }) => string,
    lang: Language
): string => {
    const roundedCount = Math.floor(count);
     if (lang === 'en') {
        if (roundedCount === 0) return t('page.leaves.leaveBalance.daysRemaining.zero');
        return roundedCount === 1 
            ? t('page.leaves.leaveBalance.daysRemaining.singular', { count: roundedCount }) 
            : t('page.leaves.leaveBalance.daysRemaining.plural', { count: roundedCount });
    }
    // Arabic
    if (roundedCount === 0) return t('page.leaves.leaveBalance.daysRemaining.zero');
    if (roundedCount === 1) return t('page.leaves.leaveBalance.daysRemaining.singular');
    if (roundedCount === 2) return t('page.leaves.leaveBalance.daysRemaining.dual');
    if (roundedCount >= 3 && roundedCount <= 10) return t('page.leaves.leaveBalance.daysRemaining.plural_few', { count: roundedCount });
    return t('page.leaves.leaveBalance.daysRemaining.plural_many', { count: roundedCount });
};