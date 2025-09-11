import React, { useState, useEffect } from 'react';

interface RunPayrollModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateRun: () => void;
}

const RunPayrollModal: React.FC<RunPayrollModalProps> = ({ isOpen, onClose, onCreateRun }) => {
  const [step, setStep] = useState(1);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncResults, setSyncResults] = useState<{ unpaidLeave: number; attendanceViolations: number } | null>(null);

  useEffect(() => {
    // Reset state when modal is closed/reopened
    if (!isOpen) {
      setTimeout(() => {
        setStep(1);
        setIsSyncing(false);
        setSyncResults(null);
      }, 300); // delay to allow for closing animation
    }
  }, [isOpen]);

  const handleSync = () => {
    setIsSyncing(true);
    setSyncResults(null);
    setTimeout(() => {
        // Simulate finding data
        setSyncResults({ unpaidLeave: 2, attendanceViolations: 5 });
        setIsSyncing(false);
    }, 2500);
  };
  
  const handleFinish = () => {
    onCreateRun();
    onClose();
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">اختر فترة الرواتب</label>
              <div className="grid grid-cols-2 gap-4">
                 <select className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500">
                    <option>يوليو</option>
                    <option>أغسطس</option>
                 </select>
                 <select className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500">
                    <option>2024</option>
                 </select>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
              <p className="font-medium text-gray-800">سيتم إنشاء مسير رواتب لفترة <span className="font-bold">يوليو 2024</span>.</p>
            </div>
          </>
        );
      case 2:
        return (
            <div>
                <div className="text-center">
                    {isSyncing ? (
                         <>
                            <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
                            <p className="mt-4 text-gray-700 font-medium">جاري المزامنة مع الوحدات الأخرى...</p>
                            <p className="text-sm text-gray-500">فحص الإجازات غير مدفوعة الأجر ومخالفات الحضور</p>
                         </>
                    ) : syncResults ? (
                        <div className="space-y-4">
                            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full mx-auto flex items-center justify-center">
                               <i className="fas fa-check-circle text-3xl"></i>
                            </div>
                            <h4 className="font-semibold text-lg text-gray-800">اكتملت المزامنة</h4>
                             <div className="grid grid-cols-2 gap-4 text-start">
                                <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
                                    <p className="font-bold text-orange-700">{syncResults.unpaidLeave} أيام</p>
                                    <p className="text-sm text-orange-600">إجازة غير مدفوعة</p>
                                </div>
                                <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                                    <p className="font-bold text-red-700">{syncResults.attendanceViolations} مخالفات</p>
                                    <p className="text-sm text-red-600">حضور تستدعي الخصم</p>
                                </div>
                            </div>
                            <div className="mt-2 p-3 bg-blue-50 text-blue-800 rounded-lg text-sm flex items-center">
                                <i className="fas fa-info-circle me-2"></i>
                                <span>تم تطبيق معدلات العمل الإضافي الجديدة (2.0x للعطلات) بناءً على القانون رقم 14.</span>
                            </div>
                            <p className="text-sm text-gray-600 pt-2">سيتم تطبيق الخصومات تلقائيًا. يمكنك مراجعتها في الخطوة التالية.</p>
                        </div>
                    ) : (
                         <>
                            <i className="fas fa-sync-alt text-4xl text-blue-600 mb-4"></i>
                            <h4 className="font-semibold text-lg text-gray-800">مزامنة البيانات</h4>
                            <p className="text-sm text-gray-600">سيقوم النظام الآن بمزامنة البيانات من وحدتي الإجازات والحضور لتطبيق أي خصومات تلقائية.</p>
                         </>
                    )}
                </div>
            </div>
        );
      case 3:
        return (
             <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full mx-auto flex items-center justify-center">
                   <i className="fas fa-file-invoice-dollar text-3xl"></i>
                </div>
                <h4 className="font-semibold text-lg text-gray-800 mt-4">تم إنشاء مسودة مسير الرواتب</h4>
                <p className="text-sm text-gray-600 mt-2">
                    تم إنشاء مسير الرواتب لشهر يوليو 2024 بنجاح. يمكنك الآن مراجعة التفاصيل، وتعديل أي بنود، ثم تأكيد المسير لبدء عملية الدفع.
                </p>
             </div>
        )
      default:
        return null;
    }
  };
  
  const renderButtons = () => {
      switch (step) {
          case 1:
              return <button type="button" onClick={() => setStep(2)} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">التالي</button>;
          case 2:
              return (
                  isSyncing ? (
                      <button type="button" className="px-4 py-2 bg-blue-300 text-white rounded-lg cursor-not-allowed" disabled>جاري المزامنة...</button>
                  ) : syncResults ? (
                      <button type="button" onClick={() => setStep(3)} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">إنشاء المسودة</button>
                  ) : (
                      <button type="button" onClick={handleSync} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">بدء المزامنة</button>
                  )
              );
          case 3:
              return <button type="button" onClick={handleFinish} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">إنهاء والمراجعة</button>;
          default:
              return null;
      }
  }


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 modal-backdrop z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">تشغيل مسير رواتب جديد</h3>
              <p className="text-sm text-gray-500">الخطوة {step} من 3</p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>
        </div>
        
        <div className="p-8 min-h-[20rem] flex items-center justify-center">
            {renderStepContent()}
        </div>

        <div className="flex justify-between items-center p-6 bg-gray-50 rounded-b-xl border-t">
          <button 
            type="button" 
            onClick={() => setStep(s => s - 1)} 
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={step === 1}
          >
            السابق
          </button>
          {renderButtons()}
        </div>
      </div>
    </div>
  );
};

export default RunPayrollModal;