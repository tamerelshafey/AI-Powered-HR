
import React, { useState, useEffect, useMemo } from 'react';
import { PerformanceReview, PerformanceStatus, IndividualDevelopmentPlan, ReviewMetric } from '../../../types';
import SuggestedTraining from './SuggestedTraining';
import ToastNotification from '../../../components/ToastNotification';
import CompensationSuggestion from './CompensationSuggestion';
import { generateDevelopmentPlan } from '../../../services/api';
import DevelopmentPlanSuggestion from './DevelopmentPlanSuggestion';
import Modal, { ModalBody, ModalFooter } from '../../../components/Modal';

interface PerformanceReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  review: PerformanceReview | null;
  onSave: (review: PerformanceReview) => void;
}

type ModalStep = 'review' | 'compensation' | 'development' | 'completed';

const PerformanceReviewModal: React.FC<PerformanceReviewModalProps> = ({ isOpen, onClose, review, onSave }) => {
  const [editedReview, setEditedReview] = useState<PerformanceReview | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);
  const [isCompensationSubmitted, setCompensationSubmitted] = useState(false);
  const [step, setStep] = useState<ModalStep>('review');
  const [developmentPlan, setDevelopmentPlan] = useState<IndividualDevelopmentPlan | null>(null);
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);

  useEffect(() => {
    if (review) {
      setEditedReview(JSON.parse(JSON.stringify(review)));
      setCompensationSubmitted(false); // Reset on new review
      setDevelopmentPlan(null);
      setStep(review.status === PerformanceStatus.COMPLETED ? 'compensation' : 'review');
    }
  }, [review]);

  const overallScore = useMemo(() => {
      if (!editedReview || editedReview.metrics.length === 0) return 0;
      const scoredMetrics = editedReview.metrics.filter(m => m.score && m.score > 0);
      if (scoredMetrics.length === 0) return 0;
      const totalScore = scoredMetrics.reduce((sum, m) => sum + (m.score || 0), 0);
      return parseFloat((totalScore / scoredMetrics.length).toFixed(1));
  }, [editedReview]);

  if (!isOpen || !editedReview) return null;

  const handleMetricChange = (metricName: string, field: 'score' | 'managerComments', value: number | string) => {
    setEditedReview(prev => {
        if (!prev) return null;
        const updatedMetrics = prev.metrics.map(m => 
            m.name === metricName ? { ...m, [field]: value } : m
        );
        return { ...prev, metrics: updatedMetrics };
    });
  };
  
  const handleGeneratePlan = async () => {
    setIsGeneratingPlan(true);
    const plan = await generateDevelopmentPlan(editedReview);
    setDevelopmentPlan(plan);
    setIsGeneratingPlan(false);
  };

  const handleEnroll = (courseTitle: string) => {
    setToast({ message: `تم تسجيل ${review?.employee.firstName} في دورة "${courseTitle}"`, type: 'success' });
    setTimeout(() => setToast(null), 4000);
  };
  
  const handleCompensationSubmit = (details: { increase: number, bonus: number, justification: string }) => {
    console.log("Compensation submitted", details);
    setCompensationSubmitted(true);
    setToast({ message: `تم إرسال طلب التعويض بنجاح للموافقة.`, type: 'success' });
    handleGeneratePlan(); // Automatically generate plan after submitting compensation
    setStep('development');
  };
  
  const handleApprovePlan = () => {
      setToast({ message: `تمت مشاركة الخطة التطويرية مع ${editedReview.employee.firstName}.`, type: 'success' });
      // In a real app, you'd save this plan to the database here.
      onClose(); // Close the modal after the final step.
  };

  const handleSave = (finalStatus?: PerformanceStatus) => {
      const reviewToSave = { 
          ...editedReview,
          status: finalStatus || editedReview.status,
          overallScore: finalStatus === PerformanceStatus.COMPLETED ? overallScore : editedReview.overallScore
      };
      onSave(reviewToSave);
  };


  const StarRatingInput: React.FC<{ score: number; onChange: (newScore: number) => void }> = ({ score, onChange }) => {
    return (
        <div className="flex items-center space-x-1 space-x-reverse text-xl">
            {[...Array(5)].map((_, i) => (
                <button key={i} type="button" onClick={() => onChange(i + 1)}>
                    <i className={`fas fa-star cursor-pointer transition-colors ${i < score ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-300'}`}></i>
                </button>
            ))}
        </div>
    );
  };

  const isReviewComplete = editedReview.status === PerformanceStatus.COMPLETED;

  const CustomHeader = () => (
    <div className="p-6 border-b border-gray-200">
        <div className="flex items-start justify-between">
            <div>
                <h3 className="text-xl font-bold text-gray-900">{editedReview.reviewType}</h3>
                <p className="text-gray-600 mt-1">لـ: {editedReview.employee.firstName} {editedReview.employee.lastName}</p>
                <p className="text-sm text-gray-500">تاريخ المراجعة: {editedReview.reviewDate}</p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                <i className="fas fa-times text-xl"></i>
            </button>
        </div>
    </div>
  );

  return (
    <>
      {toast && <ToastNotification message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <Modal isOpen={isOpen} onClose={onClose} size="3xl">
        <CustomHeader />
          
        <ModalBody className="space-y-6">
            {/* Metrics Section */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">تقييم الكفاءات</h4>
              <div className="space-y-4">
                {editedReview.metrics.map(metric => (
                  <div key={metric.name} className="p-3 border rounded-lg bg-gray-50">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-800">{metric.name}</span>
                      <StarRatingInput 
                          score={metric.score || 0} 
                          onChange={(newScore) => handleMetricChange(metric.name, 'score', newScore)} 
                      />
                    </div>
                    <div className="mt-2">
                       <label className="text-sm font-medium text-gray-700">تعليق المدير:</label>
                       <input 
                          type="text" 
                          value={metric.managerComments}
                          onChange={(e) => handleMetricChange(metric.name, 'managerComments', e.target.value)}
                          placeholder="أضف تعليقًا..."
                          className="w-full mt-1 px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                       />
                    </div>
                    {metric.score && metric.score <= 2 && (
                        <SuggestedTraining skill={metric.name} onEnroll={handleEnroll} />
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Employee Comments Section */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">التقييم الذاتي للموظف</h4>
              <div className="p-3 border rounded-lg bg-blue-50 text-blue-800 text-sm">
                {editedReview.employeeComments || 'لم يقدم الموظف تعليقات.'}
              </div>
            </div>

            {/* Compensation Section */}
            {isReviewComplete && step === 'compensation' && (
                <div>
                    <h4 className="font-semibold text-gray-800 mb-3">توصيات التعويضات</h4>
                    <div className="p-4 bg-purple-50 border-s-4 border-purple-500 rounded-e-lg">
                        {isCompensationSubmitted ? (
                            <div className="flex items-center text-green-700">
                                <i className="fas fa-check-circle me-2"></i>
                                <span>تم إرسال طلب التعويض بنجاح وهو الآن قيد المراجعة.</span>
                            </div>
                        ) : (
                            <CompensationSuggestion review={editedReview} onSubmit={handleCompensationSubmit} />
                        )}
                    </div>
                </div>
            )}
            
            {/* Development Plan Section */}
            {isReviewComplete && step === 'development' && (
                 <div>
                    <h4 className="font-semibold text-gray-800 mb-3">خطة التطوير المقترحة بالذكاء الاصطناعي</h4>
                     {isGeneratingPlan ? (
                         <div className="flex items-center justify-center h-40 text-gray-600">
                            <i className="fas fa-spinner fa-spin me-3 text-2xl"></i>
                            <span>جاري إنشاء خطة التطوير...</span>
                        </div>
                     ) : developmentPlan ? (
                         <DevelopmentPlanSuggestion plan={developmentPlan} onApprove={handleApprovePlan} />
                     ) : (
                         <div className="text-center p-6 bg-gray-50 rounded-lg">
                            <p>حدث خطأ أثناء إنشاء الخطة. حاول مرة أخرى.</p>
                            <button onClick={handleGeneratePlan} className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg">
                                إعادة المحاولة
                            </button>
                         </div>
                     )}
                </div>
            )}
        </ModalBody>
          
        <ModalFooter>
            <div className="flex justify-between items-center">
                <div className="text-sm">
                    { !isReviewComplete &&
                        <span>النتيجة الإجمالية: <span className="font-bold text-blue-600">{overallScore}/5</span></span>
                    }
                </div>
                <div className="flex justify-end space-x-3 space-x-reverse">
                <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100">
                    إغلاق
                </button>
                {!isReviewComplete && (
                    <>
                        <button type="button" onClick={() => handleSave()} className="px-4 py-2 text-blue-700 bg-blue-100 rounded-lg hover:bg-blue-200">
                            حفظ كمسودة
                        </button>
                        <button type="button" onClick={() => handleSave(PerformanceStatus.COMPLETED)} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                            إتمام المراجعة
                        </button>
                    </>
                )}
                </div>
            </div>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default PerformanceReviewModal;
