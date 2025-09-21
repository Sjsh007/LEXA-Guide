import React, { useState, useCallback, useRef, useEffect } from 'react';
import { createChatSession, translateText, getDetailedSummary, getRiskAnalysis } from './services/geminiService';
import type { Chat } from '@google/genai';
import { ChatWindow, Message } from './ChatWindow';
import { CuteChatbotWidget } from './CuteChatbotWidget';
import { useLocalization, languageMap, supportedLanguages } from './i18n';
import Robot3D from './Robot3D';
import DocumentModal from './DocumentModal';
import InputForm from './InputForm';
import { AppHeader } from './AppHeader';
import { AuthModal } from './AuthModal';
import { FeedbackModal } from './FeedbackModal';
import { ConsultModal } from './ConsultModal';
import { PrivacyModal } from './PrivacyModal';
import { AdminDashboardModal } from './AdminDashboardModal';
import { AnomalyDetectionModal } from './AnomalyDetectionModal';
import { UserProfileModal } from './UserProfileModal';
import { ReminderModal } from './ReminderModal';
import { sampleDocumentText, initialAiResponse, initialSuggestedQuestions } from './data';


// --- Main App Component ---

const REMINDERS_STORAGE_KEY = 'lexaguide_reminders';
interface Reminder {
    id: number;
    title: string;
    dateTime: string; // ISO string
    context: string;
}

export default function App() {
    const { t, language, setLanguage } = useLocalization();
    const [chatSession, setChatSession] = useState<Chat | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isResultView, setIsResultView] = useState(false);
    const originalDocumentRef = useRef<string>('');
    const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>([]);
    const [parsingLibsReady, setParsingLibsReady] = useState(false);
    
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
    const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);
    const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false);
    const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
    const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);
    const [isAnomalyModalOpen, setIsAnomalyModalOpen] = useState(false);
    const [isChatWidgetOpen, setIsChatWidgetOpen] = useState(false);

    const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);
    const [reminderContext, setReminderContext] = useState<string>('');
    const scheduledTimeouts = useRef<number[]>([]);

    const showNotification = (reminder: Reminder) => {
        new Notification(reminder.title, {
            body: reminder.context.substring(0, 100) + '...',
            icon: '/vite.svg',
        });
        const storedReminders = JSON.parse(localStorage.getItem(REMINDERS_STORAGE_KEY) || '[]') as Reminder[];
        const updatedReminders = storedReminders.filter(r => r.id !== reminder.id);
        localStorage.setItem(REMINDERS_STORAGE_KEY, JSON.stringify(updatedReminders));
    };

    const scheduleReminder = (reminder: Reminder) => {
        const now = new Date();
        const reminderTime = new Date(reminder.dateTime);
        const delay = reminderTime.getTime() - now.getTime();
        
        if (delay > 0) {
            const timeoutId = window.setTimeout(() => {
                showNotification(reminder);
            }, delay);
            scheduledTimeouts.current.push(timeoutId);
        }
    };

    useEffect(() => {
        try {
            setChatSession(createChatSession());
        } catch (e) {
            setError(e instanceof Error ? e.message : 'An unknown error occurred.');
            console.error(e);
        }

        // Check for parsing libraries to be ready
        const checkLibs = () => {
            if ((window as any).pdfjsLib && (window as any).mammoth && (window as any).Tesseract) {
                setParsingLibsReady(true);
            } else {
                setTimeout(checkLibs, 200); // Check again shortly
            }
        };
        checkLibs();

        if (Notification.permission === 'granted') {
            const storedReminders = JSON.parse(localStorage.getItem(REMINDERS_STORAGE_KEY) || '[]') as Reminder[];
            storedReminders.forEach(scheduleReminder);
        }

        return () => {
            scheduledTimeouts.current.forEach(clearTimeout);
        };
    }, []);
    
    // Effect for auto-translating new messages when language changes
    useEffect(() => {
        const languageName = supportedLanguages.find(l => l.code === language)?.name || 'English';
        if (languageName === 'English') return;
    
        const translateExistingMessages = async () => {
            const messagesToUpdate = messages
                .map((msg, index) => ({ msg, index }))
                .filter(({ msg }) => msg.role === 'model' && (!msg.translation || !msg.translation[languageName]));
    
            if (messagesToUpdate.length === 0) return;
    
            setMessages(currentMessages =>
                currentMessages.map((msg, i) =>
                    messagesToUpdate.some(({ index }) => index === i)
                        ? { ...msg, isTranslating: languageName }
                        : msg
                )
            );
    
            await Promise.all(messagesToUpdate.map(async ({ msg, index }) => {
                try {
                    const translatedText = await translateText(msg.text, languageName);
                    setMessages(currentMessages =>
                        currentMessages.map((m, i) =>
                            i === index
                                ? { ...m, isTranslating: undefined, translation: { ...(m.translation || {}), [languageName]: translatedText } }
                                : m
                        )
                    );
                } catch (err) {
                    console.error(`Translation to ${languageName} failed for message index ${index}`, err);
                    setMessages(currentMessages =>
                        currentMessages.map((m, i) =>
                            i === index ? { ...m, isTranslating: undefined } : m
                        )
                    );
                }
            }));
        };
        
        translateExistingMessages();
    }, [language, messages]);


    const handleReset = () => {
        setIsResultView(false);
        setMessages([]);
        setError(null);
        originalDocumentRef.current = '';
        setSuggestedQuestions([]);
        
        try {
            setChatSession(createChatSession());
        } catch (e) {
            setError(e instanceof Error ? e.message : 'An unknown error occurred.');
            console.error(e);
        }
    };
    
    const handleLogin = (email: string, pass: string) => {
        console.log(`Logging in with ${email}`);
        setIsLoggedIn(true);
        setUserEmail(email);
        setIsAuthModalOpen(false);
        handleReset();
    };

    const handleSignUp = (email: string, pass: string) => {
        console.log(`Signing up with ${email}`);
        setIsLoggedIn(true);
        setUserEmail(email);
        setIsAuthModalOpen(false);
        handleReset();
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUserEmail(null);
        setIsProfileModalOpen(false);
        handleReset();
    };
    
    const handleFeedbackSubmit = (feedback: string) => {
        console.log("Feedback submitted:", feedback);
    };

    const handleMessageFeedback = useCallback((messageIndex: number, feedback: 'up' | 'down') => {
        setMessages(currentMessages => {
            const newMessages = [...currentMessages];
            const message = newMessages[messageIndex];
            message.feedback = message.feedback === feedback ? undefined : feedback;
            console.log(`Feedback for message ${messageIndex}: ${message.feedback}`);
            return newMessages;
        });
    }, []);

    const handleConsultationRequest = (details: { name: string; email: string; issue: string }) => {
        console.log("Consultation Request Submitted:", details);
    };

    const handleSetReminder = (context: string) => {
        setReminderContext(context);
        setIsReminderModalOpen(true);
    };

    const handleSaveReminder = async (details: { title: string; date: string; time: string }) => {
        const { title, date, time } = details;
        if (!title || !date || !time) {
            alert('Please fill in all reminder details.');
            return;
        }

        let permission = Notification.permission;
        if (permission === 'default') {
            permission = await Notification.requestPermission();
        }

        if (permission !== 'granted') {
            alert('Notification permission is required to set reminders. Please enable it in your browser settings.');
            return;
        }
        
        const dateTime = new Date(`${date}T${time}`);
        if (isNaN(dateTime.getTime()) || dateTime <= new Date()) {
            alert('Please select a valid date and time in the future.');
            return;
        }

        const newReminder: Reminder = {
            id: Date.now(),
            title,
            dateTime: dateTime.toISOString(),
            context: reminderContext,
        };

        const storedReminders = JSON.parse(localStorage.getItem(REMINDERS_STORAGE_KEY) || '[]') as Reminder[];
        storedReminders.push(newReminder);
        localStorage.setItem(REMINDERS_STORAGE_KEY, JSON.stringify(storedReminders));

        scheduleReminder(newReminder);
        
        alert(`Reminder set for ${dateTime.toLocaleString()}!`);
        setIsReminderModalOpen(false);
    };


    const handleSendMessage = useCallback(async (text: string, isInitial: boolean = false) => {
        if (!chatSession) {
            setError('Chat session is not initialized.');
            return;
        }

        setIsLoading(true);
        setError(null);
        setSuggestedQuestions([]);

        if (isInitial) {
            originalDocumentRef.current = text;
             // Clear initial demo messages
            setMessages([]);
        } else {
            setMessages(prev => [...prev, { role: 'user', text }]);
        }

        let promptToSend = text;
        if (isInitial) {
            promptToSend = `${text}\n\n---\nINSTRUCTIONS: Analyze the document above. Your entire response must be a single, valid JSON object with two keys: "analysis" (a string containing your full analysis following your standard format: TL;DR, Key Clauses, Red Flags, disclaimer) and "suggestions" (an array of 3-4 suggested follow-up question strings).`;
        }

        try {
            const stream = await chatSession.sendMessageStream({ message: promptToSend });
            
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

            if (isInitial) {
                try {
                    const parsedResponse = JSON.parse(responseText);
                    const { analysis, suggestions } = parsedResponse;

                    if (typeof analysis === 'string' && Array.isArray(suggestions)) {
                        setMessages(prev => {
                            const newMessages = [...prev];
                            newMessages[newMessages.length - 1].text = analysis;
                            return newMessages;
                        });
                        setSuggestedQuestions(suggestions.filter(s => typeof s === 'string'));
                        responseText = analysis; // Use the analysis for translation
                    }
                } catch (parseError) {
                    console.warn("Could not parse initial AI response as JSON. Falling back to text.", parseError);
                    // Fallback: responseText is already set, and suggestions will remain empty.
                }
            }
            
            if (isInitial) setIsResultView(true);
            
            const targetLanguageName = supportedLanguages.find(l => l.code === language)?.name || 'English';
            if (targetLanguageName !== 'English') {
                try {
                    const translatedText = await translateText(responseText, targetLanguageName);
                    setMessages(prev => {
                        const newMessages = [...prev];
                        const lastMessage = newMessages[newMessages.length - 1];
                        if (lastMessage && lastMessage.role === 'model') {
                            lastMessage.translation = { [targetLanguageName]: translatedText };
                        }
                        return newMessages;
                    });
                } catch (e) {
                    console.error(`Auto-translation to ${targetLanguageName} failed`, e);
                }
            }

        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred during chat.';
            setError(`Sorry, something went wrong. ${errorMessage}`);
            if (!isInitial) setMessages(prev => prev.slice(0, -1)); // Remove user message if AI fails
            setMessages(prev => prev.filter(m => m.text)); // Clean up empty model message
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    }, [chatSession, language]);

    const handleClarify = (legalText: string) => {
        handleSendMessage(legalText, true);
    };

    const handleExplainClause = (clauseText: string) => {
        setIsDocumentModalOpen(false);
        const prompt = `Explain this for me: "${clauseText}"`;
        handleSendMessage(prompt);
    };

    const handleGenericAiRequest = async (
        requestFn: (text: string) => Promise<string>,
        docText: string,
        loadingMessage: string
    ) => {
        setIsLoading(true);
        setError(null);
        setMessages(prev => [...prev, { role: 'user', text: loadingMessage, isAction: true } as Message]);

        try {
            const resultText = await requestFn(docText);
            setMessages(prev => [...prev, { role: 'model', text: resultText }]);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
            setError(`Sorry, something went wrong. ${errorMessage}`);
            setMessages(prev => prev.slice(0, -1)); // Remove loading message on error
        } finally {
            setIsLoading(false);
        }
    };

    const handleGetSummary = () => {
        handleGenericAiRequest(getDetailedSummary, originalDocumentRef.current, "Generating detailed summary...");
    };

    const handleGetRiskAnalysis = () => {
        handleGenericAiRequest(getRiskAnalysis, originalDocumentRef.current, "Performing risk analysis...");
    };

    return (
        <div className="relative isolate flex flex-col h-screen font-sans text-slate-200">
            <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]" aria-hidden="true">
                <div
                  className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
                  style={{
                    clipPath:
                      'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                  }}
                />
            </div>
            <AppHeader
                isLoggedIn={isLoggedIn}
                onOpenAuthModal={() => setIsAuthModalOpen(true)}
                onOpenProfileModal={() => setIsProfileModalOpen(true)}
                onOpenFeedbackModal={() => setIsFeedbackModalOpen(true)}
                onOpenAdminDashboard={() => setIsAdminDashboardOpen(true)}
                onOpenAnomalyModal={() => setIsAnomalyModalOpen(true)}
                onOpenHelpWidget={() => setIsChatWidgetOpen(true)}
            />
            <main className="flex-grow flex flex-col p-4 md:p-6 overflow-y-auto print:p-0 print:overflow-visible">
                {!isResultView ? (
                    <div className="flex-grow flex flex-col items-center justify-center text-center">
                        <div className="w-full h-48 md:h-64 flex items-center justify-center">
                           <Robot3D />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold mt-4">{t('lexaGreeting')}</h2>
                        <div className="w-full mt-8">
                            <p className="mt-2 mb-6 text-slate-400 max-w-lg mx-auto">{t('lexaDescription')}</p>
                            <InputForm 
                                onClarify={handleClarify} 
                                isLoading={isLoading} 
                                parsingLibsReady={parsingLibsReady}
                            />
                        </div>
                        <footer className="mt-8 text-xs text-slate-400 print:hidden">
                            <button onClick={() => setIsPrivacyModalOpen(true)} className="hover:underline">
                                {t('privacySecurity')}
                            </button>
                        </footer>
                    </div>
                ) : (
                    <ChatWindow 
                        messages={messages} 
                        isLoading={isLoading && messages.length > 0} 
                        error={error} 
                        onSendMessage={handleSendMessage}
                        onMessageFeedback={handleMessageFeedback}
                        onOpenConsultModal={() => setIsConsultModalOpen(true)}
                        onSetReminder={handleSetReminder}
                        onReset={handleReset}
                        onViewDocument={() => setIsDocumentModalOpen(true)}
                        originalDocumentText={originalDocumentRef.current}
                        suggestedQuestions={suggestedQuestions}
                        onGetSummary={handleGetSummary}
                        onGetRiskAnalysis={handleGetRiskAnalysis}
                    />
                )}
            </main>
            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} onLogin={handleLogin} onSignUp={handleSignUp} />
            <FeedbackModal isOpen={isFeedbackModalOpen} onClose={() => setIsFeedbackModalOpen(false)} onSubmit={handleFeedbackSubmit} />
            <ConsultModal isOpen={isConsultModalOpen} onClose={() => setIsConsultModalOpen(false)} onSubmit={handleConsultationRequest} documentContext={originalDocumentRef.current} />
            <DocumentModal isOpen={isDocumentModalOpen} onClose={() => setIsDocumentModalOpen(false)} documentText={originalDocumentRef.current} onExplainClause={handleExplainClause} />
            <PrivacyModal isOpen={isPrivacyModalOpen} onClose={() => setIsPrivacyModalOpen(false)} />
            <AdminDashboardModal isOpen={isAdminDashboardOpen} onClose={() => setIsAdminDashboardOpen(false)} />
            <AnomalyDetectionModal isOpen={isAnomalyModalOpen} onClose={() => setIsAnomalyModalOpen(false)} />
            <UserProfileModal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} userEmail={userEmail} onLogout={handleLogout} />
            <ReminderModal isOpen={isReminderModalOpen} onClose={() => setIsReminderModalOpen(false)} onSubmit={handleSaveReminder} contextText={reminderContext} />
            <CuteChatbotWidget isOpen={isChatWidgetOpen} setIsOpen={setIsChatWidgetOpen} />
        </div>
    );
}