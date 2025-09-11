import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../../../types';
import { getChatbotResponse } from '../../../services/api';

interface AiChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onViewArticle: (articleId: string) => void;
}

const AiChatbotModal: React.FC<AiChatbotModalProps> = ({ isOpen, onClose, onViewArticle }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([
        { role: 'bot', text: 'أهلاً بك! أنا مساعد "بُكرة" الذكي. كيف يمكنني مساعدتك اليوم؟' }
    ]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            // Reset state when modal opens to ensure a fresh start and prevent bugs
            setMessages([{ role: 'bot', text: 'أهلاً بك! أنا مساعد "بُكرة" الذكي. كيف يمكنني مساعدتك اليوم؟' }]);
            setUserInput('');
            setIsLoading(false);
        }
    }, [isOpen]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    if (!isOpen) return null;

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userInput.trim() || isLoading) return;

        const userMessage: ChatMessage = { role: 'user', text: userInput };
        setMessages(prev => [...prev, userMessage]);
        setUserInput('');
        setIsLoading(true);

        const botResponse = await getChatbotResponse(userInput);
        
        setMessages(prev => [...prev, botResponse]);
        setIsLoading(false);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-10 z-50" onClick={onClose} aria-hidden={!isOpen}>
            <div 
                className="bg-white rounded-xl shadow-2xl w-full max-w-md h-[70vh] flex flex-col transform transition-all duration-300 animate-slide-in" 
                onClick={e => e.stopPropagation()}
                style={{ position: 'absolute', right: '2rem', bottom: '6.5rem' }}
                role="dialog"
                aria-modal="true"
                aria-labelledby="chatbot-title"
            >
                <div className="p-4 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
                    <div className="flex items-center space-x-3 space-x-reverse">
                         <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center">
                            <i className="fas fa-brain text-white text-lg"></i>
                        </div>
                        <div>
                            <h3 id="chatbot-title" className="text-lg font-semibold text-gray-900">مساعد "بُكرة" الذكي</h3>
                            <p className="text-xs text-green-600 font-medium flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full me-1.5"></span>متصل</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100" aria-label="إغلاق المحادثة">
                        <i className="fas fa-times text-lg"></i>
                    </button>
                </div>

                <div className="flex-1 p-4 overflow-y-auto space-y-4">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-xs lg:max-w-sm px-4 py-2 rounded-2xl ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-lg' : 'bg-gray-100 text-gray-800 rounded-bl-lg'}`}>
                                <p className="text-sm" dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br />') }}></p>
                                {msg.articleLink && (
                                    <button 
                                        onClick={() => onViewArticle(msg.articleLink!)}
                                        className="text-xs mt-2 font-semibold text-blue-200 hover:underline"
                                    >
                                        عرض المقال الكامل
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start">
                             <div className="max-w-xs lg:max-w-sm px-4 py-2 rounded-2xl bg-gray-100 text-gray-800 rounded-bl-lg">
                                <div className="flex items-center space-x-2 space-x-reverse">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                                </div>
                             </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 bg-white flex-shrink-0">
                    <div className="relative">
                        <input
                            type="text"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            placeholder="اسأل أي شيء..."
                            className="w-full ps-4 pe-12 py-2.5 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500"
                            disabled={isLoading}
                            aria-label="Chat input"
                        />
                        <button type="submit" className="absolute end-1.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300 flex items-center justify-center" disabled={isLoading || !userInput.trim()} aria-label="إرسال الرسالة">
                            <i className="fas fa-paper-plane"></i>
                        </button>
                    </div>
                </form>
            </div>
             <style>{`
                @keyframes slide-in {
                    from { transform: translateY(50px) scale(0.95); opacity: 0; }
                    to { transform: translateY(0) scale(1); opacity: 1; }
                }
                .animate-slide-in { animation: slide-in 0.3s ease-out forwards; }
             `}</style>
        </div>
    );
};

export default AiChatbotModal;
