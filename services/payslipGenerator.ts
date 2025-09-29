
import { Employee, PayrollRun, Payslip, PayslipItem, AttendanceSettings } from '../types';

// This is a mock service to demonstrate dynamic payslip generation.
// In a real application, this would involve complex calculations based on attendance,
// salary structure, loans, etc.

export const generatePayslipForEmployee = (
  employee: Employee,
  run: PayrollRun,
  settings: Required<AttendanceSettings>
): Payslip => {
  // 1. Base Salary & Allowances (mocked static values for demo)
  const baseSalary = 30000 + (employee.id.charCodeAt(5) % 5) * 2000;
  const housingAllowance = 5000;
  const transportAllowance = 2000;

  const earnings: PayslipItem[] = [
    { name: 'الراتب الأساسي', amount: baseSalary },
    { name: 'بدل سكن', amount: housingAllowance },
    { name: 'بدل انتقال', amount: transportAllowance },
  ];

  // 2. Dynamic Overtime Calculation (mocked hours)
  if (settings.overtimeEnabled) {
    const weekdayOvertimeHours = Math.floor(Math.random() * 10);
    const weekendOvertimeHours = Math.random() > 0.5 ? Math.floor(Math.random() * 8) : 0;
    
    const hourlyRate = baseSalary / 30 / 8; // Simplified calculation

    if (weekdayOvertimeHours > 0) {
      const weekdayPay = weekdayOvertimeHours * hourlyRate * settings.overtimeRateWeekday;
      earnings.push({ name: `عمل إضافي (${weekdayOvertimeHours} ساعة)`, amount: parseFloat(weekdayPay.toFixed(2)) });
    }
    if (weekendOvertimeHours > 0) {
      const weekendPay = weekendOvertimeHours * hourlyRate * settings.overtimeRateWeekend;
      earnings.push({ name: `عمل إضافي عطلة (${weekendOvertimeHours} ساعة)`, amount: parseFloat(weekendPay.toFixed(2)) });
    }
  }

  // 3. Deductions (mocked static values)
  const socialInsurance = -(baseSalary * 0.11);
  const incomeTax = -(baseSalary * 0.15); // Simplified tax

  const deductions: PayslipItem[] = [
    { name: 'التأمينات الاجتماعية', amount: socialInsurance },
    { name: 'ضريبة كسب العمل', amount: incomeTax },
  ];

  // Mock lateness deduction if applicable
  if(settings.lateDeductionPolicyEnabled && Math.random() > 0.6) {
      deductions.push({ name: 'خصم تأخير', amount: -250 });
  }

  // 4. Calculate Totals
  const grossPay = earnings.reduce((sum, item) => sum + item.amount, 0);
  const totalDeductions = deductions.reduce((sum, item) => sum + item.amount, 0);
  const netPay = grossPay + totalDeductions;

  return {
    employee,
    run,
    earnings,
    deductions,
    grossPay,
    totalDeductions,
    netPay,
  };
};
