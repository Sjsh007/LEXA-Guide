import React, { useState, useEffect, useRef } from 'react';
import { createCuteChatSession } from './services/geminiService';
import type { Chat } from '@google/genai';
import { useLocalization } from './i18n';

// --- Local Icons for the Widget ---

const ChatBubbleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.026 3.348 3.97v6.02c0 1.944-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.75.75 0 00-.626.63c-.158.524-.343 1.033-.546 1.533a.75.75 0 01-1.32.083A49.48 49.48 0 0112 15.75c-.653 0-1.303.02-1.95.06a.75.75 0 01-.626-.63c-.158-.524-.343-1.033-.546-1.533a.75.75 0 00-1.32-.083 49.48 49.48 0 00-3.032 4.075.75.75 0 01-1.28-.53v-2.38a.75.75 0 00-.598-.74 48.901 48.901 0 01-3.476-.384c-1.978-.29-3.348-2.026-3.348-3.97V6.74c0-1.944 1.37-3.68 3.348-3.97zM6.75 8.25a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H7.5z" clipRule="evenodd" />
    </svg>
);

const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
    </svg>
);

const SendIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
    </svg>
);

const Loader: React.FC<{ className?: string }> = ({ className = "h-5 w-5 text-white" }) => (
    <svg className={`animate-spin ${className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);


interface CuteChatbotWidgetProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

interface ChatMessage {
    role: 'user' | 'model';
    text: string;
}

export const CuteChatbotWidget: React.FC<CuteChatbotWidgetProps> = ({ isOpen, setIsOpen }) => {
    const { t } = useLocalization();
    const [chatSession, setChatSession] = useState<Chat | null>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        try {
            setChatSession(createCuteChatSession());
        } catch (e) {
            console.error("Failed to create cute chat session", e);
        }
    }, []);
    
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        const text = userInput.trim();
        if (!text || isLoading || !chatSession) return;

        setUserInput('');
        setMessages(prev => [...prev, { role: 'user', text }]);
        setIsLoading(true);

        try {
            const stream = await chatSession.sendMessageStream({ message: text });
            let responseText = '';
            setMessages(prev => [...prev, { role: 'model', text: '' }]);
            
            for await (const chunk of stream) {
                responseText += chunk.text;
                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1].text = responseText;
                    return newMessages;
                });
            }
        } catch (error) {
            console.error("Error sending message to cute chat:", error);
            setMessages(prev => [
                ...prev, 
                { role: 'model', text: "Oops! I'm having a little trouble connecting. Please try again in a moment! 🛠️" }
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className={`fixed bottom-5 right-5 z-40 transition-transform duration-300 ${isOpen ? 'translate-y-24 opacity-0 scale-50' : ''}`}>
                <button
                    onClick={() => setIsOpen(true)}
                    className="p-4 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500"
                    aria-label={t('chatWithChip')}
                >
                    <ChatBubbleIcon className="h-8 w-8" />
                </button>
            </div>
            {isOpen && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-end justify-end" onClick={() => setIsOpen(false)}>
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="bg-slate-800 w-full max-w-sm h-[70vh] m-5 rounded-xl shadow-2xl flex flex-col border border-slate-700 animate-slide-in"
                    >
                         <style>{`
                            @keyframes slide-in {
                                from { transform: translateY(50px); opacity: 0; }
                                to { transform: translateY(0); opacity: 1; }
                            }
                            .animate-slide-in { animation: slide-in 0.3s ease-out forwards; }
                        `}</style>
                        <header className="flex items-center justify-between p-4 border-b border-slate-700 flex-shrink-0">
                            <h3 className="text-lg font-bold text-white">{t('chatWithChip')}</h3>
                            <button onClick={() => setIsOpen(false)} className="p-1 rounded-full text-slate-400 hover:bg-slate-700" aria-label="Close chat">
                                <CloseIcon className="h-6 w-6" />
                            </button>
                        </header>
                        <div className="flex-grow p-4 overflow-y-auto">
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-900 flex items-center justify-center"><span className="text-lg">🤖</span></div>
                                    <div className="max-w-xs px-4 py-3 rounded-2xl bg-slate-700 text-slate-200 rounded-bl-none">
                                        <p className="text-sm">{t('chipGreeting')}</p>
                                    </div>
                                </div>
                                {messages.map((msg, index) => (
                                    <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                                        {msg.role === 'model' && <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-900 flex items-center justify-center"><span className="text-lg">🤖</span></div>}
                                        <div className={`max-w-xs px-4 py-3 rounded-2xl ${msg.role === 'user' ? 'bg-blue-500 text-white rounded-br-none' : 'bg-slate-700 text-slate-200 rounded-bl-none'}`}>
                                            <p className="text-sm">{msg.text}</p>
                                        </div>
                                    </div>
                                ))}
                                {isLoading && (
                                     <div className="flex items-start gap-3">
                                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-900 flex items-center justify-center"><span className="text-lg">🤖</span></div>
                                        <div className="px-4 py-3 rounded-2xl bg-slate-700 text-slate-200 rounded-bl-none flex items-center">
                                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s] mr-1"></div>
                                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s] mr-1"></div>
                                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                                        </div>
                                    </div>
                                )}
                                <div ref={chatEndRef} />
                            </div>
                        </div>
                        <footer className="p-4 border-t border-slate-700 flex-shrink-0">
                            <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                                <input
                                    type="text"
                                    value={userInput}
                                    onChange={(e) => setUserInput(e.target.value)}
                                    placeholder={t('typeAMessage')}
                                    disabled={isLoading}
                                    className="flex-grow w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-full shadow-sm placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:opacity-50"
                                />
                                <button type="submit" disabled={isLoading || !userInput.trim()} className="flex-shrink-0 p-2.5 rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none disabled:bg-slate-500">
                                    {isLoading ? <Loader className="w-5 h-5" /> : <SendIcon className="w-5 h-5" />}
                                </button>
                            </form>
                        </footer>
                    </div>
                </div>
            )}
        </>
    );
};
