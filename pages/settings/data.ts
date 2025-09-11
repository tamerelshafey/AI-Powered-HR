
import { LeaveTypeSetting, PublicHoliday, SalaryComponent, SalaryComponentType, LeaveCategory, AttendanceSettings, LeaveType } from '../../types';

export const leaveTypeSettingsData: LeaveTypeSetting[] = [
    { id: 'lts_01', name: LeaveType.VACATION, balanceDays: 21, color: 'blue', category: LeaveCategory.STANDARD, isDeductedFromAnnual: false },
    { id: 'lts_02', name: LeaveType.SICK, balanceDays: 14, color: 'orange', category: LeaveCategory.STANDARD, isDeductedFromAnnual: false },
    { id: 'lts_06', name: LeaveType.CASUAL, balanceDays: 7, color: 'yellow', category: LeaveCategory.CASUAL, isDeductedFromAnnual: true, maxDaysPerRequest: 2 },
    { id: 'lts_04', name: LeaveType.MATERNITY, balanceDays: 120, color: 'pink', category: LeaveCategory.SPECIAL, isDeductedFromAnnual: false, maxTimesInService: 3 },
    { id: 'lts_07', name: LeaveType.PILGRIMAGE, balanceDays: 30, color: 'green', category: LeaveCategory.SPECIAL, isDeductedFromAnnual: false, eligibilityYears: 5, maxTimesInService: 1 },
    { id: 'lts_05', name: LeaveType.UNPAID, balanceDays: 0, color: 'gray', category: LeaveCategory.STANDARD, isDeductedFromAnnual: false },
    { id: 'lts_08', name: LeaveType.EXAMINATION, balanceDays: 0, color: 'purple', category: LeaveCategory.SPECIAL, isDeductedFromAnnual: false },
    { id: 'lts_09', name: LeaveType.NEWBORN, balanceDays: 1, color: 'teal', category: LeaveCategory.SPECIAL, isDeductedFromAnnual: false, maxTimesInService: 3 },
    { id: 'lts_10', name: LeaveType.SPECIAL_NEEDS, balanceDays: 45, color: 'indigo', category: LeaveCategory.SPECIAL, isDeductedFromAnnual: false },
];

export const publicHolidaysData: PublicHoliday[] = [
    { id: 'ph_01', name: 'عيد الفطر', date: '2025-03-30' },
    { id: 'ph_02', name: 'عيد الأضحى', date: '2025-06-05' },
    { id: 'ph_03', name: 'عيد القوات المسلحة', date: '2025-10-06' },
    { id: 'ph_04', name: 'ثورة 25 يناير', date: '2025-01-25' },
    { id: 'ph_05', name: 'عيد العمال', date: '2025-05-01' },
    { id: 'ph_06', name: 'رأس السنة الهجرية', date: '2025-06-26' },
];

export const salaryComponentsData: SalaryComponent[] = [
    { id: 'sc_01', name: 'الراتب الأساسي', type: SalaryComponentType.EARNING, isTaxable: true },
    { id: 'sc_02', name: 'بدل انتقال', type: SalaryComponentType.EARNING, isTaxable: false },
    { id: 'sc_03', name: 'بدل سكن', type: SalaryComponentType.EARNING, isTaxable: false },
    { id: 'sc_04', name: 'التأمينات الاجتماعية (حصة الموظف)', type: SalaryComponentType.DEDUCTION, isTaxable: false },
    { id: 'sc_05', name: 'ضريبة كسب العمل', type: SalaryComponentType.DEDUCTION, isTaxable: false },
    { id: 'sc_06', name: 'سلفة', type: SalaryComponentType.DEDUCTION, isTaxable: false },
    { id: 'sc_07', name: 'تسوية عهدة', type: SalaryComponentType.DEDUCTION, isTaxable: false },
    { id: 'sc_08', name: 'مصاريف نثرية', type: SalaryComponentType.DEDUCTION, isTaxable: false },
    { id: 'sc_09', name: 'خصم انتقالات', type: SalaryComponentType.DEDUCTION, isTaxable: false },
];

export const defaultAttendanceSettings: Required<AttendanceSettings> = {
    workStartTime: '09:00',
    workEndTime: '17:00',
    lateGracePeriodMinutes: 15,
    lateDeductionPolicyEnabled: true,
    lateDeductionRules: [
        { id: 1, fromMinutes: 16, toMinutes: 30, deductMinutes: 30 },
        { id: 2, fromMinutes: 31, toMinutes: 45, deductMinutes: 45 },
    ],
    overtimeEnabled: true,
    overtimeMinimumMinutes: 30,
    overtimeRateWeekday: 1.5,
    overtimeRateWeekend: 2.0,
    overtimeRateHoliday: 2.0,
    weekendDays: ['Friday', 'Saturday'],
    allowedIpAddresses: ['192.168.1.100', '10.0.0.5'],
};

export const branchAttendanceSettings: Record<string, AttendanceSettings> = {
    'branch_jed': { // Jeddah has different working hours and stricter lateness policy
      workStartTime: '08:00',
      workEndTime: '16:00',
      lateGracePeriodMinutes: 10,
      lateDeductionRules: [
        { id: 1, fromMinutes: 11, toMinutes: 20, deductMinutes: 30 },
      ],
      overtimeEnabled: false,
    }
  };
