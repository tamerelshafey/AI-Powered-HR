
import React, { useState, useRef, useEffect } from 'react';
import { JobPosting, JobStatus } from '../../../types';
import { GoogleGenAI } from '@google/genai';
import { useI18n } from '../../../context/I18nContext';
import { formatDate } from '../../../utils/formatters';
import Modal, { ModalHeader, ModalBody, ModalFooter } from '../../../components/Modal';

interface NewPostingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPosting: (newPosting: JobPosting) => void;
}

// AI Client Initialization
let ai: GoogleGenAI | null = null;
const getAiClient = () => {
  if (!ai) {
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
  }
  return ai;
};


const NewPostingModal: React.FC<NewPostingModalProps> = ({ isOpen, onClose, onAddPosting }) => {
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('');
  const [description, setDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);
  
  const { language } = useI18n();

  useEffect(() => {
      if (!isOpen) {
          // Reset form on close
          setTitle('');
          setDepartment('');
          setDescription('');
          setGenerationError(null);
      }
  }, [isOpen]);

  const handleGenerateDescription = async () => {
    if (!title || !department) return;

    setIsGenerating(true);
    setGenerationError(null);
    try {
      const client = getAiClient();
      const prompt = `
        بصفتك خبير موارد بشرية متخصص في التوظيف، قم بإنشاء وصف وظيفي احترافي وشامل لوظيفة "${title}" في قسم "${department}".
        يجب أن يتضمن الوصف الأقسام التالية بوضوح:
        1.  **ملخص الوظيفة:** فقرة موجزة عن الدور.
        2.  **المسؤوليات الرئيسية:** قائمة نقطية بالمهام الأساسية.
        3.  **المؤهلات المطلوبة:** قائمة نقطية بالمهارات والخبرات والشهادات الضرورية.
        4.  **المؤهلات المفضلة (اختياري):** قائمة نقطية بالمهارات التي تعتبر ميزة إضافية.
        
        اجعل الوصف جذابًا وواضحًا وموجهًا لجذب أفضل الكفاءات. استخدم تنسيق Markdown.
      `;

      // FIX: Updated deprecated model 'gemini-1.5-flash' to 'gemini-2.5-flash'.
      const response = await client.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      // FIX: Access the generated text directly from the `text` property of the response object.
      const generatedDescription = response.text;
      if (!generatedDescription || generatedDescription.trim() === '') {
        throw new Error("Received an empty description from the AI.");
      }
      
      setDescription(generatedDescription);

    } catch (error) {
      console.error("Error generating job description:", error);
      setGenerationError("فشل في إنشاء الوصف. يرجى المحاولة مرة أخرى.");
    } finally {
      setIsGenerating(false);
    }
  };


  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!title || !department) {
      alert('Please fill in both title and department.');
      return;
    }

    const newPosting: JobPosting = {
      id: `JOB${Date.now()}`,
      title,
      department,
      status: JobStatus.ACTIVE,
      applicantsCount: 0,
      postedDate: formatDate(new Date(), language),
    };

    onAddPosting(newPosting);
    onClose();
  };

  const modalFooter = (
    <div className="flex justify-end space-x-3 space-x-reverse">
        <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
            إلغاء
        </button>
        <button type="submit" form="new-posting-form" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            حفظ الوظيفة
        </button>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="2xl"
    >
      <ModalHeader title="إنشاء وظيفة شاغرة جديدة" onClose={onClose} />
      <ModalBody>
        <form id="new-posting-form" className="space-y-6" onSubmit={handleSubmit}>
            <div>
            <label htmlFor="job-title" className="block text-sm font-medium text-gray-700 mb-2">المسمى الوظيفي</label>
            <input 
                id="job-title"
                type="text" 
                placeholder="مثال: مهندس برمجيات أول" 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required 
            />
            </div>
            <div>
            <label htmlFor="job-department" className="block text-sm font-medium text-gray-700 mb-2">القسم</label>
            <select 
                id="job-department"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500" 
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                required
            >
                <option value="">اختر القسم</option>
                <option value="قسم الهندسة">قسم الهندسة</option>
                <option value="قسم التسويق">قسم التسويق</option>
                <option value="قسم المبيعات">قسم المبيعات</option>
                <option value="الموارد البشرية">الموارد البشرية</option>
                <option value="قسم المالية">قسم المالية</option>
                <option value="قسم التصميم">قسم التصميم</option>
            </select>
            </div>
            <div>
            <div className="flex items-center justify-between mb-2">
                <label htmlFor="job-description" className="block text-sm font-medium text-gray-700">وصف الوظيفة</label>
                <button 
                    type="button" 
                    onClick={handleGenerateDescription}
                    disabled={!title || !department || isGenerating}
                    className="flex items-center space-x-2 space-x-reverse px-3 py-1.5 bg-purple-100 text-purple-700 text-xs font-medium rounded-lg hover:bg-purple-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isGenerating ? (
                        <i className="fas fa-spinner fa-spin"></i>
                    ) : (
                        <i className="fas fa-wand-magic-sparkles"></i>
                    )}
                    <span>{isGenerating ? 'جاري الإنشاء...' : 'إنشاء بالذكاء الاصطناعي'}</span>
                </button>
            </div>
            <textarea
                id="job-description"
                rows={8}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="اكتب تفاصيل عن المسؤوليات والمؤهلات المطلوبة، أو قم بإنشائها تلقائيًا باستخدام الذكاء الاصطناعي."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            {generationError && <p className="mt-2 text-sm text-red-600">{generationError}</p>}
            </div>
        </form>
      </ModalBody>
      <ModalFooter>
        {modalFooter}
      </ModalFooter>
    </Modal>
  );
};

export default NewPostingModal;
