

import React, { useRef, useEffect } from 'react';
import { Payslip } from '../../../types';
import { useFocusTrap } from '../../../hooks/useFocusTrap';
import { useModalAccessibility } from '../../../hooks/useModalAccessibility';
import { useI18n } from '../../../context/I18nContext';
import { formatCurrency } from '../../../utils/formatters';

interface PayslipModalProps {
  isOpen: boolean;
  onClose: () => void;
  payslip: Payslip | null;
}

const PayslipModal: React.FC<PayslipModalProps> = ({ isOpen, onClose, payslip }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { language } = useI18n();
  useFocusTrap(modalRef, isOpen);
  useModalAccessibility(isOpen, onClose);

  if (!isOpen || !payslip) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 modal-backdrop z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        ref={modalRef}
        className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col" 
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="payslip-title"
      >
        <div id="payslip-content" className="p-8 overflow-y-auto">
            {/* Header */}
            <div className="flex justify-between items-start pb-4 border-b">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Bokra HRMS</h2>
                    <p className="text-gray-500">123 شارع النيل، القاهرة، مصر</p>
                </div>
                <div className="text-end">
                    <h3 id="payslip-title" className="text-xl font-semibold text-gray-800">كشف راتب</h3>
                    <p className="text-gray-500">{payslip.run.period}</p>
                </div>
            </div>

            {/* Employee Details */}
            <div className="grid grid-cols-2 gap-4 my-6 text-sm">
                <div>
                    <p className="font-semibold text-gray-800">{`${payslip.employee.firstName} ${payslip.employee.lastName}`}</p>
                    <p className="text-gray-500">{payslip.employee.jobTitle}</p>
                    <p className="text-gray-500">{payslip.employee.department}</p>
                </div>
                <div className="text-end">
                    <p><span className="font-medium text-gray-600">تاريخ الدفع:</span> {payslip.run.payDate}</p>
                    <p><span className="font-medium text-gray-600">الرقم الوظيفي:</span> {payslip.employee.id}</p>
                </div>
            </div>

            {/* Earnings and Deductions */}
            <div className="grid grid-cols-2 gap-8">
                <div>
                    <h4 className="font-semibold text-green-600 border-b-2 border-green-200 pb-1 mb-2">الإيرادات</h4>
                    <div className="space-y-1 text-sm">
                        {payslip.earnings.map(item => (
                             <div key={item.name} className="flex justify-between">
                                <span className="text-gray-700">{item.name}</span>
                                <span className="font-mono text-gray-800">{formatCurrency(item.amount, language)}</span>
                            </div>
                        ))}
                    </div>
                </div>
                 <div>
                    <h4 className="font-semibold text-red-600 border-b-2 border-red-200 pb-1 mb-2">الخصومات</h4>
                    <div className="space-y-1 text-sm">
                        {payslip.deductions.map(item => (
                             <div key={item.name} className="flex justify-between">
                                <span className="text-gray-700">{item.name}</span>
                                <span className="font-mono text-gray-800">{formatCurrency(item.amount, language)}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Totals */}
            <div className="mt-6 pt-4 border-t-2">
                 <div className="space-y-2 max-w-sm ms-auto text-sm">
                     <div className="flex justify-between font-medium">
                        <span className="text-gray-800">إجمالي الإيرادات:</span>
                        <span className="font-mono text-gray-900">{formatCurrency(payslip.grossPay, language)}</span>
                    </div>
                    <div className="flex justify-between font-medium">
                        <span className="text-gray-800">إجمالي الخصومات:</span>
                        <span className="font-mono text-gray-900">{formatCurrency(payslip.totalDeductions, language)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg bg-gray-100 p-2 rounded-md">
                        <span className="text-gray-900">صافي الراتب:</span>
                        <span className="font-mono text-blue-600">{formatCurrency(payslip.netPay, language)}</span>
                    </div>
                 </div>
            </div>
        </div>

        <div className="p-4 border-t mt-auto bg-gray-50 rounded-b-xl">
            <div className="flex justify-end space-x-3 space-x-reverse">
                <button onClick={onClose} className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100">إغلاق</button>
                <button onClick={() => window.print()} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    <i className="fas fa-print me-2"></i>طباعة
                </button>
            </div>
        </div>
        <style>{`
            @media print {
                body * {
                    visibility: hidden;
                }
                #payslip-content, #payslip-content * {
                    visibility: visible;
                }
                #payslip-content {
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                }
            }
        `}</style>
      </div>
    </div>
  );
};

export default PayslipModal;