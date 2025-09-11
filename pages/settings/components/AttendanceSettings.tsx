import React, { useState, useEffect, useMemo } from 'react';
import { defaultAttendanceSettings, branchAttendanceSettings as branchSettingsData } from '../data';
import { AttendanceSettings as AttendanceSettingsType, LateDeductionRule, Branch } from '../../../types';
import { getBranches } from '../../../services/api';

const WEEKDAYS: Required<AttendanceSettingsType>['weekendDays'] = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const WEEKDAY_NAMES_AR: Record<typeof WEEKDAYS[number], string> = {
    Saturday: 'السبت',
    Sunday: 'الأحد',
    Monday: 'الاثنين',
    Tuesday: 'الثلاثاء',
    Wednesday: 'الأربعاء',
    Thursday: 'الخميس',
    Friday: 'الجمعة',
};


const AttendanceSettings: React.FC = () => {
    const [settings, setSettings] = useState<Required<AttendanceSettingsType>>(defaultAttendanceSettings);
    const [newIp, setNewIp] = useState('');

    const [branches, setBranches] = useState<Branch[]>([]);
    const [loadingBranches, setLoadingBranches] = useState(true);
    const [selectedBranchId, setSelectedBranchId] = useState<string>('default');
    const [allBranchSettings, setAllBranchSettings] = useState(branchSettingsData);
    const [isCustomized, setIsCustomized] = useState(false);


    useEffect(() => {
        getBranches().then(data => {
            setBranches(data);
            setLoadingBranches(false);
        });
    }, []);

    useEffect(() => {
        if (selectedBranchId === 'default') {
            setSettings(defaultAttendanceSettings);
            setIsCustomized(true);
        } else {
            const branchOverride = allBranchSettings[selectedBranchId];
            if (branchOverride) {
                setSettings({ ...defaultAttendanceSettings, ...branchOverride });
                setIsCustomized(true);
            } else {
                setSettings(defaultAttendanceSettings);
                setIsCustomized(false);
            }
        }
    }, [selectedBranchId, allBranchSettings]);

    const handleCustomizationToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;
        setIsCustomized(checked);
        if (!checked) {
            setSettings(defaultAttendanceSettings);
        }
    };
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const isCheckbox = type === 'checkbox';
        const checked = isCheckbox ? (e.target as HTMLInputElement).checked : undefined;
    
        setSettings(prev => ({ ...prev, [name]: isCheckbox ? checked : value }));
    };
    
    const handleRuleChange = (id: number, field: keyof Omit<LateDeductionRule, 'id'>, value: number) => {
        setSettings(prev => ({
            ...prev,
            lateDeductionRules: prev.lateDeductionRules.map(rule =>
                rule.id === id ? { ...rule, [field]: value } : rule
            ),
        }));
    };

    const addRule = () => {
        setSettings(prev => ({
            ...prev,
            lateDeductionRules: [...prev.lateDeductionRules, { id: Date.now(), fromMinutes: 0, toMinutes: 0, deductMinutes: 0 }]
        }));
    };

    const removeRule = (id: number) => {
        setSettings(prev => ({
            ...prev,
            lateDeductionRules: prev.lateDeductionRules.filter(rule => rule.id !== id)
        }));
    };

    const handleWeekendChange = (day: typeof WEEKDAYS[number]) => {
        setSettings(prev => {
            const weekendDays = prev.weekendDays.includes(day)
                ? prev.weekendDays.filter(d => d !== day)
                : [...prev.weekendDays, day];
            return { ...prev, weekendDays };
        });
    };

    const handleAddIp = () => {
        if (newIp && !settings.allowedIpAddresses.includes(newIp)) {
            setSettings(prev => ({ ...prev, allowedIpAddresses: [...prev.allowedIpAddresses, newIp] }));
            setNewIp('');
        }
    };

    const handleRemoveIp = (ipToRemove: string) => {
        setSettings(prev => ({
            ...prev,
            allowedIpAddresses: prev.allowedIpAddresses.filter(ip => ip !== ipToRemove),
        }));
    };
    
    const isBranchSelected = selectedBranchId !== 'default';
    const formDisabled = isBranchSelected && !isCustomized;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedBranchId === 'default') {
            // In a real app, this would be an API call to update default settings.
            console.log('Saving default settings:', settings);
        } else {
            if (isCustomized) {
                // Save or update the override for the selected branch
                const newBranchSettings = { ...allBranchSettings, [selectedBranchId]: settings };
                setAllBranchSettings(newBranchSettings);
                console.log("Saving override for branch:", selectedBranchId, settings);
            } else {
                // Remove the override for the selected branch if it exists
                const { [selectedBranchId]: _, ...remainingSettings } = allBranchSettings;
                setAllBranchSettings(remainingSettings);
                console.log("Removing override for branch:", selectedBranchId);
            }
        }
        alert('تم حفظ إعدادات الحضور بنجاح!');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="space-y-8">
                 {/* Branch Selector Card */}
                 <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <label htmlFor="branch-selector" className="block text-base font-semibold text-gray-800 mb-3">
                        عرض الإعدادات لـ:
                    </label>
                    <select
                        id="branch-selector"
                        value={selectedBranchId}
                        onChange={e => setSelectedBranchId(e.target.value)}
                        className="w-full max-w-sm px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500"
                        disabled={loadingBranches}
                    >
                        <option value="default">الإعدادات الافتراضية للشركة</option>
                        {branches.map(branch => (
                            <option key={branch.id} value={branch.id}>{branch.name}</option>
                        ))}
                    </select>
                     {isBranchSelected && (
                        <div className="mt-4 border-t pt-4">
                            <label className="flex items-center space-x-3 space-x-reverse cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    checked={isCustomized}
                                    onChange={handleCustomizationToggle}
                                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                                />
                                <span className="text-sm font-medium text-gray-700">
                                    تخصيص إعدادات الحضور لهذا الفرع
                                </span>
                            </label>
                            <p className="text-xs text-gray-500 mt-1">عند التعطيل، سيستخدم هذا الفرع الإعدادات الافتراضية للشركة.</p>
                        </div>
                    )}
                </div>

                {/* Working Hours Card */}
                <fieldset disabled={formDisabled} className="disabled:opacity-50">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                        <div className="p-6 border-b"><h3 className="text-lg font-semibold text-gray-900">أوقات العمل الرسمية</h3></div>
                        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">وقت بدء الدوام</label>
                                <input type="time" name="workStartTime" value={settings.workStartTime} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg"/>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">وقت انتهاء الدوام</label>
                                <input type="time" name="workEndTime" value={settings.workEndTime} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg"/>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">تحديد عطلة نهاية الأسبوع</label>
                                <div className="flex flex-wrap gap-x-4 gap-y-2 pt-2">
                                    {WEEKDAYS.map(day => (
                                        <label key={day} className="flex items-center space-x-2 space-x-reverse cursor-pointer">
                                            <input type="checkbox" checked={settings.weekendDays.includes(day)} onChange={() => handleWeekendChange(day)} className="w-4 h-4 text-blue-600 rounded"/>
                                            <span className="text-sm">{WEEKDAY_NAMES_AR[day]}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </fieldset>

                {/* Lateness Policy Card */}
                 <fieldset disabled={formDisabled} className="disabled:opacity-50">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                        <div className="p-6 border-b"><h3 className="text-lg font-semibold text-gray-900">سياسة التأخير</h3></div>
                        <div className="p-6 space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">فترة السماح (بالدقائق)</label>
                                <input type="number" name="lateGracePeriodMinutes" value={settings.lateGracePeriodMinutes} onChange={handleInputChange} className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-lg"/>
                                <p className="text-xs text-gray-500 mt-1">لن يتم تسجيل الموظف كـ "متأخر" إذا حضر خلال هذه الفترة.</p>
                            </div>
                            <div className="border-t pt-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-gray-800">تفعيل سياسة خصم التأخير</p>
                                        <p className="text-sm text-gray-500">تطبيق خصومات تلقائية على أساس مدة التأخير بعد فترة السماح.</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" name="lateDeductionPolicyEnabled" checked={settings.lateDeductionPolicyEnabled} onChange={handleInputChange} className="sr-only peer"/>
                                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>
                                {settings.lateDeductionPolicyEnabled && (
                                    <div className="mt-4 space-y-3">
                                        {settings.lateDeductionRules.map(rule => (
                                            <div key={rule.id} className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-center">
                                                <div className="flex items-center text-sm">
                                                    <span className="me-2">من</span>
                                                    <input type="number" value={rule.fromMinutes} onChange={(e) => handleRuleChange(rule.id, 'fromMinutes', parseInt(e.target.value))} className="w-full px-2 py-1 border border-gray-300 rounded-md"/>
                                                    <span className="ms-2">دقيقة</span>
                                                </div>
                                                <div className="flex items-center text-sm">
                                                    <span className="me-2">إلى</span>
                                                    <input type="number" value={rule.toMinutes} onChange={(e) => handleRuleChange(rule.id, 'toMinutes', parseInt(e.target.value))} className="w-full px-2 py-1 border border-gray-300 rounded-md"/>
                                                    <span className="ms-2">دقيقة</span>
                                                </div>
                                                <div className="flex items-center text-sm">
                                                    <span className="me-2 text-red-600 font-medium">خصم</span>
                                                    <input type="number" value={rule.deductMinutes} onChange={(e) => handleRuleChange(rule.id, 'deductMinutes', parseInt(e.target.value))} className="w-full px-2 py-1 border border-gray-300 rounded-md"/>
                                                    <span className="ms-2">دقيقة</span>
                                                </div>
                                                <button type="button" onClick={() => removeRule(rule.id)} className="text-red-500 hover:text-red-700 text-sm justify-self-end">
                                                    <i className="fas fa-trash-alt me-1"></i> إزالة
                                                </button>
                                            </div>
                                        ))}
                                        <button type="button" onClick={addRule} className="text-sm font-medium text-blue-600 hover:text-blue-800 mt-2">
                                            <i className="fas fa-plus me-1"></i> إضافة شريحة جديدة
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </fieldset>

                {/* Overtime Policy Card and IP Restrictions */}
                <fieldset disabled={formDisabled} className="disabled:opacity-50 space-y-8">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                        <div className="p-6 border-b"><h3 className="text-lg font-semibold text-gray-900">سياسة العمل الإضافي</h3></div>
                        <div className="p-6 space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-gray-800">تفعيل احتساب العمل الإضافي</p>
                                    <p className="text-sm text-gray-500">السماح باحتساب ساعات العمل الإضافية للموظفين.</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" name="overtimeEnabled" checked={settings.overtimeEnabled} onChange={handleInputChange} className="sr-only peer"/>
                                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                            </div>
                            {settings.overtimeEnabled && (
                                <div className="border-t pt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                    <div><label className="block text-sm font-medium text-gray-700 mb-2">الحد الأدنى للاحتساب (دقائق)</label><input type="number" name="overtimeMinimumMinutes" value={settings.overtimeMinimumMinutes} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg"/></div>
                                    <div><label className="block text-sm font-medium text-gray-700 mb-2">معدل أيام العمل (x)</label><input type="number" step="0.1" name="overtimeRateWeekday" value={settings.overtimeRateWeekday} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg"/></div>
                                    <div><label className="block text-sm font-medium text-gray-700 mb-2">معدل عطلة الأسبوع (x)</label><input type="number" step="0.1" name="overtimeRateWeekend" value={settings.overtimeRateWeekend} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg"/></div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">معدل العطلات (x)</label>
                                        <input type="number" step="0.1" name="overtimeRateHoliday" value={settings.overtimeRateHoliday} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg"/>
                                        <p className="text-xs text-gray-500 mt-1">(قيمة '2' تعادل يومي أجر وفقًا للقانون الجديد)</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                     <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                        <div className="p-6 border-b"><h3 className="text-lg font-semibold text-gray-900">القيود والتحقق</h3></div>
                        <div className="p-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">تقييد الحضور بعناوين IP</label>
                            <p className="text-xs text-gray-500 mb-3">أضف عناوين IP المسموح بها لتسجيل الحضور. اتركها فارغة للسماح بالتسجيل من أي مكان.</p>
                            <div className="flex items-center gap-2 mb-3"><input type="text" value={newIp} onChange={(e) => setNewIp(e.target.value)} placeholder="XXX.XXX.XXX.XXX" className="flex-grow px-3 py-2 border border-gray-300 rounded-lg"/><button type="button" onClick={handleAddIp} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">إضافة</button></div>
                            <div className="flex flex-wrap gap-2">{settings.allowedIpAddresses.map(ip => (<div key={ip} className="flex items-center bg-gray-100 rounded-full ps-3 pe-2 py-1 text-sm"><span>{ip}</span><button type="button" onClick={() => handleRemoveIp(ip)} className="ms-2 text-gray-400 hover:text-red-500"><i className="fas fa-times-circle"></i></button></div>))}</div>
                        </div>
                    </div>
                </fieldset>

                {/* Save Bar */}
                <div className="p-4 bg-white border-t sticky bottom-0">
                    <div className="flex justify-end">
                        <button type="submit" className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                            حفظ التغييرات
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default AttendanceSettings;