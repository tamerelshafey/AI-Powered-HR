
import React, { useState } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import { Employee, DocumentType } from '../../../types';
import { useI18n } from '../../../context/I18nContext';
import Modal, { ModalHeader, ModalBody, ModalFooter } from '../../../components/Modal';

interface UploadDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  employees: Employee[];
  defaultEmployeeId?: string;
}

// Helper function to convert a File object to a GoogleGenerativeAI.Part object.
async function fileToGenerativePart(file: File) {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
}


const UploadDocumentModal: React.FC<UploadDocumentModalProps> = ({ isOpen, onClose, employees, defaultEmployeeId }) => {
  const { t } = useI18n();

  // Form State
  const [formData, setFormData] = useState({
    employeeId: defaultEmployeeId || '',
    documentType: DocumentType.OTHER,
    documentNumber: '',
    issueDate: '',
    expiryDate: '',
  });
  
  // File & AI State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);


  if (!isOpen) return null;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setAnalysisError(null);
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({...prev, [name]: value}));
  }

  const handleAnalyzeDocument = async () => {
    if (!selectedFile || isAnalyzing) return;

    setIsAnalyzing(true);
    setAnalysisError(null);

    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
        const imagePart = await fileToGenerativePart(selectedFile);
        
        const prompt = `Analyze the document image and extract the following details. Respond ONLY with a valid JSON object.
        - documentType: Identify the type (PASSPORT, NATIONAL_ID, DRIVING_LICENSE, VISA, CONTRACT, OTHER).
        - documentNumber: The main identification number.
        - issueDate: The date of issue in YYYY-MM-DD format.
        - expiryDate: The expiry date in YYYY-MM-DD format.`;
        
        // FIX: Updated deprecated model 'gemini-1.5-pro' to 'gemini-2.5-flash'.
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts: [imagePart, { text: prompt }] },
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        documentType: { type: Type.STRING, enum: Object.values(DocumentType) },
                        documentNumber: { type: Type.STRING },
                        issueDate: { type: Type.STRING, description: "Format: YYYY-MM-DD" },
                        expiryDate: { type: Type.STRING, description: "Format: YYYY-MM-DD" },
                    },
                },
            }
        });

        // FIX: Access the generated text directly from the `text` property of the response object and trim it.
        const jsonText = response.text.trim();
        const data = JSON.parse(jsonText);

        setFormData(prev => ({
            ...prev,
            documentType: data.documentType || prev.documentType,
            documentNumber: data.documentNumber || prev.documentNumber,
            issueDate: data.issueDate || prev.issueDate,
            expiryDate: data.expiryDate || prev.expiryDate
        }));

    } catch (error) {
        console.error("Error analyzing document:", error);
        setAnalysisError(t('page.documents.uploadModal.analysisError'));
    } finally {
        setIsAnalyzing(false);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    alert('تم رفع المستند بنجاح!');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalHeader title="رفع مستند جديد" onClose={onClose} />
        <ModalBody>
             <form id="upload-doc-form" className="space-y-6" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">إرفاق ملف</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                        <i className="fas fa-file-image mx-auto h-12 w-12 text-gray-400"></i>
                        <div className="flex text-sm text-gray-600">
                            <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                            <span>اختر ملف صورة</span>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/*" />
                            </label>
                            <p className="ps-1">أو اسحبه وأفلته هنا</p>
                        </div>
                        <p className="text-xs text-gray-500">{selectedFile ? selectedFile.name : 'PNG, JPG, WEBP حتى 10MB'}</p>
                        </div>
                    </div>
                    </div>
                    
                    <div className="text-center">
                        <button 
                            type="button" 
                            onClick={handleAnalyzeDocument}
                            disabled={!selectedFile || isAnalyzing}
                            className="flex items-center justify-center w-full space-x-2 space-x-reverse px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:bg-purple-300 disabled:cursor-not-allowed text-base font-semibold"
                        >
                            {isAnalyzing ? (
                                <i className="fas fa-spinner fa-spin"></i>
                            ) : (
                                <i className="fas fa-wand-magic-sparkles"></i>
                            )}
                            <span>{isAnalyzing ? t('page.documents.uploadModal.analyzing') : t('page.documents.uploadModal.analyzeWithAI')}</span>
                        </button>
                        {analysisError && <p className="mt-2 text-sm text-red-600">{analysisError}</p>}
                    </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">الموظف</label>
                    <select 
                        name="employeeId"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                        value={formData.employeeId}
                        onChange={handleInputChange}
                        disabled={!!defaultEmployeeId}
                    >
                        <option value="">اختر موظفًا</option>
                        {employees.map(emp => (
                        <option key={emp.id} value={emp.id}>{`${emp.firstName} ${emp.lastName}`}</option>
                        ))}
                    </select>
                    </div>
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">نوع المستند</label>
                    <select name="documentType" value={formData.documentType} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500">
                        {Object.values(DocumentType).map(type => <option key={type} value={type}>{t(`enum.documentType.${type}`)}</option>)}
                    </select>
                    </div>
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('page.documents.uploadModal.documentNumber')}</label>
                    <input type="text" name="documentNumber" value={formData.documentNumber} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">تاريخ الإصدار</label>
                        <input type="date" name="issueDate" value={formData.issueDate} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">تاريخ الانتهاء (اختياري)</label>
                    <input type="date" name="expiryDate" value={formData.expiryDate} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                    </div>
                </div>
            </form>
        </ModalBody>
        <ModalFooter>
             <div className="flex justify-end space-x-3 space-x-reverse">
                <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                إلغاء
                </button>
                <button type="submit" form="upload-doc-form" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                حفظ المستند
                </button>
            </div>
        </ModalFooter>
    </Modal>
  );
};

export default UploadDocumentModal;
