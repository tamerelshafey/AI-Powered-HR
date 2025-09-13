
import React, { useState, useEffect, useCallback } from 'react';
import { TicketDepartment, TicketPriority, HelpCenterArticle } from '../../../types';
import { getAiSuggestedArticles } from '../../../services/api';
import ArticleModal from '../../help_center/components/ArticleModal';
import Modal, { ModalHeader, ModalBody, ModalFooter } from '../../../components/Modal';

interface NewTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const useDebounce = (value: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debouncedValue;
};

const NewTicketModal: React.FC<NewTicketModalProps> = ({ isOpen, onClose }) => {
  const [subject, setSubject] = useState('');
  const [suggestions, setSuggestions] = useState<HelpCenterArticle[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<HelpCenterArticle | null>(null);

  const debouncedSubject = useDebounce(subject, 500);

  useEffect(() => {
    if (debouncedSubject.length > 3) {
      const fetchSuggestions = async () => {
        setIsLoadingSuggestions(true);
        const results = await getAiSuggestedArticles(debouncedSubject);
        setSuggestions(results);
        setIsLoadingSuggestions(false);
      };
      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [debouncedSubject]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    alert('تم إنشاء طلب الدعم بنجاح!');
    onClose();
  };

  const handleArticleClick = (article: HelpCenterArticle) => {
    setSelectedArticle(article);
  };

  return (
    <>
        <Modal isOpen={isOpen} onClose={onClose} size="2xl">
            <ModalHeader title="إنشاء طلب دعم جديد" onClose={onClose} />
            <ModalBody>
                <form id="new-ticket-form" className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">القسم المسؤول</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white">
                        <option value={TicketDepartment.GENERAL}>{TicketDepartment.GENERAL}</option>
                        {Object.values(TicketDepartment).map(d => d !== TicketDepartment.GENERAL && <option key={d} value={d}>{d}</option>)}
                    </select>
                    </div>
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">الأولوية</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white">
                        {Object.values(TicketPriority).map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">الموضوع</label>
                    <input 
                        type="text" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required 
                    />
                </div>

                {(isLoadingSuggestions || suggestions.length > 0) && (
                    <div className="p-4 bg-purple-50 border-s-4 border-purple-500 rounded-e-lg">
                        <h4 className="font-semibold text-purple-800 mb-3 flex items-center text-sm">
                            <i className="fas fa-brain text-purple-600 me-2"></i>
                            مقالات قد تساعدك
                        </h4>
                        {isLoadingSuggestions ? (
                            <p className="text-sm text-purple-700">جاري البحث...</p>
                        ) : (
                            <div className="space-y-2">
                            {suggestions.map(article => (
                                <button key={article.id} type="button" onClick={() => handleArticleClick(article)} className="w-full text-start p-2 bg-white rounded-md border hover:bg-gray-50">
                                    <p className="text-sm font-medium text-gray-800">{article.title}</p>
                                </button>
                            ))}
                            </div>
                        )}
                    </div>
                )}

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">شرح المشكلة</label>
                    <textarea rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-lg"></textarea>
                </div>
                </form>
            </ModalBody>
            <ModalFooter>
                <div className="flex justify-end space-x-3 space-x-reverse">
                    <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">إلغاء</button>
                    <button type="submit" form="new-ticket-form" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">إنشاء الطلب</button>
                </div>
            </ModalFooter>
        </Modal>
        {selectedArticle && (
            <ArticleModal
                isOpen={!!selectedArticle}
                onClose={() => setSelectedArticle(null)}
                article={selectedArticle}
            />
        )}
    </>
  );
};

export default NewTicketModal;
