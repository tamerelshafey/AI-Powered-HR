

import React, { useState, useEffect } from 'react';
import { Payslip, Employee, PayrollRun } from '../../../types';
import { useI18n } from '../../../context/I18nContext';
import { formatCurrency } from '../../../utils/formatters';
import Modal, { ModalBody, ModalFooter } from '../../../components/Modal';
import { generatePayslipForEmployee } from '../../../services/payslipGenerator';
import { getAttendanceSettings } from '../../../services/api';
import LoadingSpinner from '../../../components/LoadingSpinner';

interface PayslipModalProps {
  isOpen: boolean;
  onClose: () => void;
  payslipInfo: { employee: Employee, run: PayrollRun } | null;
}

const PayslipModal: React.FC<PayslipModalProps> = ({ isOpen, onClose, payslipInfo }) => {
  const { language } = useI18n();
  const [payslip, setPayslip] = useState<Payslip | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && payslipInfo) {
      setLoading(true);
      const generate = async () => {
        try {
          const { defaultSettings, branchSettings } = await getAttendanceSettings();
          const branchOverride = branchSettings[payslipInfo.employee.branch] || {};
          const finalSettings = { ...defaultSettings, ...branchOverride };
          
          const generatedPayslip = generatePayslipForEmployee(payslipInfo.employee, payslipInfo.run, finalSettings);
          setPayslip(generatedPayslip);
        } catch (error) {
          console.error("Failed to generate payslip", error);
        } finally {
          setLoading(false);
        }
      };
      generate();
    }
  }, [isOpen, payslipInfo]);
  
  const renderContent = () => {
    if (loading || !payslip) {
        return (
            <div className="h-96 flex items-center justify-center">
                <LoadingSpinner />
            </div>
        );
    }
    return (
        <div id="payslip-content">
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
    );
  };


  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalBody>
            {renderContent()}
        </ModalBody>
        <ModalFooter>
            <div className="flex justify-end space-x-3 space-x-reverse">
                <button onClick={onClose} className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100">إغلاق</button>
                <button onClick={() => window.print()} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    <i className="fas fa-print me-2"></i>طباعة
                </button>
            </div>
        </ModalFooter>
    </Modal>
  );
};

export default PayslipModal;
