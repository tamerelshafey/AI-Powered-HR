import React, { useState, useRef, useEffect } from 'react';
import { JobPosting, JobStatus } from '../../../types';
import { GoogleGenAI } from '@google/genai';
import { useFocusTrap } from '../../../hooks/useFocusTrap';

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
  
  const modalRef = useRef<HTMLDivElement>(null);
  useFocusTrap(modalRef, isOpen);

  useEffect(() => {
    const appRoot = document.getElementById('root');
    if (isOpen) {
        appRoot?.setAttribute('aria-hidden', 'true');
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    } else {
        appRoot?.removeAttribute('aria-hidden');
    }
  }, [isOpen, onClose]);


  if (!isOpen) return null;

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
      postedDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    };

    onAddPosting(newPosting);
    onClose(); // Close modal after submission
    
    // Reset form fields
    setTitle('');
    setDepartment('');
    setDescription('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 modal-backdrop z-50 flex items-center justify-center p-4" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="new-posting-modal-title">
      <div ref={modalRef} className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-modal-fade-in" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 id="new-posting-modal-title" className="text-lg font-semibold text-gray-900">إنشاء وظيفة شاغرة جديدة</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600" aria-label="Close">
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>
        </div>
        
        <form className="p-6 space-y-6" onSubmit={handleSubmit}>
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

          <div className="flex justify-end space-x-3 space-x-reverse pt-6 border-t border-gray-200">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              إلغاء
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              حفظ الوظيفة
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPostingModal;