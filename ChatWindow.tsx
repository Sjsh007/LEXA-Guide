import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useLocalization, supportedLanguages } from './i18n';
import {
    DocumentIcon, RestartIcon, SearchIcon, CloseIcon, ChevronUpIcon, ChevronDownIcon,
    RoboIcon, ThumbsUpIcon, ThumbsDownIcon, Loader, UserIcon,
    BriefcaseIcon, SendIcon, MicrophoneIcon, ExportIcon, BellIcon,
    InfoIcon, ListChecksIcon, AlertTriangleIcon, ShieldExclamationIcon,
    DocumentTextIcon, ShieldCheckIcon, ChatBubbleLeftRightIcon
} from './Icons';

// --- Fix: Web Speech API Type Definitions ---
interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    start(): void;
    stop(): void;
    abort(): void;
    onresult: (event: SpeechRecognitionEvent) => void;
    onerror: (event: SpeechRecognitionErrorEvent) => void;
    onend: () => void;
}

interface SpeechRecognitionEvent extends Event {
    readonly resultIndex: number;
    readonly results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
    readonly length: number;
    item(index: number): SpeechRecognitionResult;
    [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
    readonly isFinal: boolean;
    readonly length: number;
    item(index: number): SpeechRecognitionAlternative;
    [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
    readonly transcript: string;
    readonly confidence: number;
}

interface SpeechRecognitionErrorEvent extends Event {
    readonly error: string;
    readonly message: string;
}

export interface Message {
    role: 'user' | 'model';
    text: string;
    translation?: { [key: string]: string };
    isTranslating?: string;
    feedback?: 'up' | 'down';
    isAction?: boolean; // To style user-initiated action messages differently
}

export interface ChatWindowProps {
    messages: Message[];
    isLoading: boolean;
    error: string | null;
    onSendMessage: (message: string) => void;
    onMessageFeedback: (messageIndex: number, feedback: 'up' | 'down') => void;
    onOpenConsultModal: () => void;
    onSetReminder: (messageText: string) => void;
    onReset: () => void;
    onViewDocument: () => void;
    originalDocumentText: string;
    suggestedQuestions: string[];
    onGetSummary: () => void;
    onGetRiskAnalysis: () => void;
}

const TypingIndicator = () => (
    <div className="flex items-center space-x-1.5 p-1">
        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
    </div>
);

// --- New Component for Collapsible Analysis ---
interface AnalysisSection {
    tldr: string;
    keyClauses: string;
    redFlags: string;
    disclaimer: string;
}

const CollapsibleAnalysis: React.FC<{ text: string }> = ({ text }) => {
    const { t } = useLocalization();
    const [openSections, setOpenSections] = useState({
        tldr: true,
        keyClauses: true,
        redFlags: true,
        disclaimer: false,
    });

    const parsedAnalysis = useMemo((): AnalysisSection => {
        const sections: AnalysisSection = { tldr: '', keyClauses: '', redFlags: '', disclaimer: '' };
        
        const tldrMatch = text.match(/\*\*TL;DR\*\*([\s\S]*?)(?=\*\*Key Clauses\*\*|$)/i);
        if (tldrMatch) sections.tldr = tldrMatch[1].trim();

        const keyClausesMatch = text.match(/\*\*Key Clauses\*\*([\s\S]*?)(?=\*\*Potential Red Flags\*\*|$)/i);
        if (keyClausesMatch) sections.keyClauses = keyClausesMatch[1].trim();

        const redFlagsMatch = text.match(/\*\*Potential Red Flags\*\*([\s\S]*?)(?=Remember, I'm an AI assistant|$)/i);
        if (redFlagsMatch) sections.redFlags = redFlagsMatch[1].trim();
        
        const disclaimerMatch = text.match(/Remember, I'm an AI assistant([\s\S]*)/i);
        if (disclaimerMatch) sections.disclaimer = `Remember, I'm an AI assistant${disclaimerMatch[1]}`.trim();

        if (!tldrMatch && !keyClausesMatch && !redFlagsMatch && !disclaimerMatch) {
            return { tldr: text, keyClauses: '', redFlags: '', disclaimer: '' }; // Fallback for plain text
        }

        return sections;
    }, [text]);

    const toggleSection = (section: keyof typeof openSections) => {
        setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const sectionsConfig = [
        { id: 'tldr', title: t('analysisTldr'), icon: InfoIcon, content: parsedAnalysis.tldr, color: 'text-sky-400' },
        { id: 'keyClauses', title: t('analysisKeyClauses'), icon: ListChecksIcon, content: parsedAnalysis.keyClauses, color: 'text-indigo-400' },
        { id: 'redFlags', title: t('analysisRedFlags'), icon: AlertTriangleIcon, content: parsedAnalysis.redFlags, color: 'text-amber-400' },
        { id: 'disclaimer', title: t('analysisDisclaimer'), icon: ShieldExclamationIcon, content: parsedAnalysis.disclaimer, color: 'text-slate-400' }
    ] as const;


    return (
        <div className="bg-slate-700 rounded-2xl rounded-bl-none p-1 space-y-1">
            {sectionsConfig.map(section => section.content && (
                <div key={section.id} className="bg-slate-800/50 rounded-lg overflow-hidden">
                    <button
                        onClick={() => toggleSection(section.id)}
                        className="w-full flex items-center justify-between p-3 text-left font-semibold"
                        aria-expanded={openSections[section.id]}
                    >
                        <div className={`flex items-center gap-3 ${section.color}`}>
                           <section.icon className="w-6 h-6 flex-shrink-0" />
                           <span className="text-slate-100">{section.title}</span>
                        </div>
                        {openSections[section.id] ? <ChevronUpIcon className="w-5 h-5 text-slate-400" /> : <ChevronDownIcon className="w-5 h-5 text-slate-400" />}
                    </button>
                    {openSections[section.id] && (
                        <div className="px-4 pb-4 pt-1 text-sm text-slate-300">
                             <p dangerouslySetInnerHTML={{ __html: section.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br />') }} />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};


export const ChatWindow: React.FC<ChatWindowProps> = ({ messages, isLoading, error, onSendMessage, onMessageFeedback, onOpenConsultModal, onSetReminder, onReset, onViewDocument, originalDocumentText, suggestedQuestions, onGetSummary, onGetRiskAnalysis }) => {
    const { t, language } = useLocalization();
    const chatEndRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const exportMenuRef = useRef<HTMLDivElement>(null);
    const searchContainerRef = useRef<HTMLDivElement>(null);

    const [newMessage, setNewMessage] = useState('');
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isCaseSensitive, setIsCaseSensitive] = useState(false);
    const [searchResults, setSearchResults] = useState<{ messageIndex: number; matchIndex: number }[]>([]);
    const [currentResultIndex, setCurrentResultIndex] = useState(-1);
    const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);
    const [searchHistory, setSearchHistory] = useState<string[]>([]);
    const [isHistoryVisible, setIsHistoryVisible] = useState(false);
    const [activeFeature, setActiveFeature] = useState<'qa' | 'summary' | 'risk'>('qa');

    const recognitionRef = useRef<SpeechRecognition | null>(null);
    const [isListening, setIsListening] = useState(false);
    const [isSpeechSupported, setIsSpeechSupported] = useState(false);
    
    const targetLanguageName = supportedLanguages.find(l => l.code === language)?.name || 'English';

    useEffect(() => {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (SpeechRecognition) {
            setIsSpeechSupported(true);
            const recognition: SpeechRecognition = new SpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.onresult = (event: SpeechRecognitionEvent) => setNewMessage(prev => (prev ? prev + ' ' : '') + event.results[0][0].transcript);
            recognition.onerror = (event: SpeechRecognitionErrorEvent) => { 
                if (event.error !== 'aborted') {
                    console.error("Speech recognition error", event.error); 
                }
                setIsListening(false); 
            };
            recognition.onend = () => setIsListening(false);
            recognitionRef.current = recognition;

            return () => {
                if (recognitionRef.current) {
                    recognitionRef.current.abort();
                }
            };
        }
    }, []);

    useEffect(() => {
        if (!isSearchVisible) chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading, isSearchVisible]);

    useEffect(() => {
        if (!searchQuery.trim()) {
            setSearchResults([]);
            setCurrentResultIndex(-1);
            return;
        }
        const results: { messageIndex: number; matchIndex: number }[] = [];
        const flags = isCaseSensitive ? 'g' : 'gi';
        const regex = new RegExp(searchQuery, flags);
        messages.forEach((msg, messageIndex) => {
            const textToSearch = (targetLanguageName !== 'English' && msg.translation?.[targetLanguageName]) || msg.text;
            [...textToSearch.matchAll(regex)].forEach((_, matchIndex) => results.push({ messageIndex, matchIndex }));
        });
        setSearchResults(results);
        setCurrentResultIndex(results.length > 0 ? 0 : -1);
    }, [searchQuery, messages, isCaseSensitive, targetLanguageName]);

    useEffect(() => {
        if (currentResultIndex === -1 || searchResults.length === 0) return;
        document.getElementById(`match-${searchResults[currentResultIndex].messageIndex}-${searchResults[currentResultIndex].matchIndex}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, [currentResultIndex, searchResults]);

    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            const { scrollHeight } = textarea;
            const maxHeight = 200;
            textarea.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
            textarea.style.overflowY = scrollHeight > maxHeight ? 'auto' : 'hidden';
        }
    }, [newMessage]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (exportMenuRef.current && !exportMenuRef.current.contains(event.target as Node)) {
                setIsExportMenuOpen(false);
            }
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
                setIsHistoryVisible(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const formatTranscript = (includeOriginalDoc = false) => {
        let transcript = `LexaGuide Chat Transcript\n${new Date().toLocaleString()}\n\n`;
        if (includeOriginalDoc) {
            transcript += `--- ORIGINAL DOCUMENT ---\n${originalDocumentText}\n\n--- END OF DOCUMENT ---\n\n`;
        }
        transcript += messages.map(msg => {
            const prefix = msg.role === 'model' ? 'Lexa' : 'You';
            const text = (targetLanguageName !== 'English' && msg.translation?.[targetLanguageName]) || msg.text;
            return `${prefix}:\n${text}`;
        }).join('\n\n---\n\n');
        return transcript;
    };

    const handleDownloadTxt = () => {
        const transcript = formatTranscript(true);
        const blob = new Blob([transcript], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `LexaGuide-Transcript-${Date.now()}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        setIsExportMenuOpen(false);
    };

    const handleSavePdf = () => {
        setIsExportMenuOpen(false);
        setTimeout(() => window.print(), 100);
    };

    const handleEmailTranscript = () => {
        const transcript = formatTranscript(true);
        const subject = 'Your LexaGuide Chat Transcript';
        const body = `Here is your chat transcript from LexaGuide:\n\n${transcript}`;
        if (body.length > 1800) {
            alert("The transcript is too long to email directly. Please download it as a TXT file instead.");
            return;
        }
        const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.open(mailtoLink, '_blank');
        setIsExportMenuOpen(false);
    };

    const handleAddToHistory = (query: string) => {
        const trimmedQuery = query.trim();
        if (trimmedQuery && !searchHistory.includes(trimmedQuery)) {
            setSearchHistory(prev => [trimmedQuery, ...prev.slice(0, 9)]);
        }
    };

    const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleAddToHistory(searchQuery);
            setIsHistoryVisible(false);
        }
    };
    
    const renderMessageContent = (msg: Message, messageIndex: number) => {
        const textToDisplay = (targetLanguageName !== 'English' && msg.translation?.[targetLanguageName]) || msg.text;

        // The first model message is the special analysis
        if (msg.role === 'model' && messageIndex === 0) {
            return <CollapsibleAnalysis text={textToDisplay} />;
        }

        let content = textToDisplay.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        if (searchQuery.trim()) {
            const flags = isCaseSensitive ? 'g' : 'gi';
            const regex = new RegExp(`(${searchQuery})`, flags);
            let matchCounter = 0;
            content = content.split(regex).map((part, index) => {
                if (index % 2 === 1) {
                    const resultIndex = searchResults.findIndex(r => r.messageIndex === messageIndex && r.matchIndex === matchCounter);
                    const isCurrent = resultIndex === currentResultIndex;
                    const matchId = `match-${messageIndex}-${matchCounter++}`;
                    return `<mark id="${matchId}" class="rounded px-0.5 ${isCurrent ? 'bg-yellow-500 ring-2 ring-yellow-500' : 'bg-yellow-700'}">${part}</mark>`;
                }
                return part;
            }).join('');
        }
        return <p className="text-sm" dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br />') }} />;
    };
    
    const handleFormSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (newMessage.trim() && !isLoading) {
            onSendMessage(newMessage.trim());
            setNewMessage('');
        }
    };
    
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleFormSubmit();
        }
    };

    const handleToggleListening = () => {
        if (!recognitionRef.current) return;
        if (isListening) recognitionRef.current.stop();
        else { recognitionRef.current.start(); setIsListening(true); }
    };

    return (
        <div className="bg-slate-800/50 backdrop-blur-sm flex flex-col h-full rounded-lg shadow-xl w-full max-w-5xl mx-auto print:shadow-none print:rounded-none print:h-auto">
            <div className="flex-shrink-0 p-4 border-b border-slate-700 flex items-center justify-between print:hidden">
                <div className="flex items-center gap-x-3">
                    <button onClick={onViewDocument} title={t('viewDocument')} className="flex items-center gap-2 text-sm text-slate-300 hover:text-indigo-400"><DocumentIcon className="w-5 h-5"/>{t('viewDocument')}</button>
                    <button onClick={onReset} title={t('newChat')} className="flex items-center gap-2 text-sm text-slate-300 hover:text-indigo-400"><RestartIcon className="w-5 h-5"/>{t('newChat')}</button>
                </div>
                <div className="flex items-center gap-x-2">
                    <button onClick={() => setIsSearchVisible(!isSearchVisible)} title={t('searchConversation')} className={`p-2 rounded-full transition-colors ${isSearchVisible ? 'bg-indigo-900 text-indigo-300' : 'text-slate-400 hover:bg-slate-700'}`}>
                        <SearchIcon className="h-5 w-5" />
                    </button>
                    <div className="relative">
                        <button onClick={() => setIsExportMenuOpen(!isExportMenuOpen)} title={t('exportOrDownload')} className="p-2 rounded-full text-slate-400 hover:bg-slate-700">
                             <ExportIcon className="h-5 w-5" />
                        </button>
                        {isExportMenuOpen && (
                             <div ref={exportMenuRef} className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-slate-700 ring-1 ring-black ring-opacity-5 focus:outline-none z-20">
                                 <button onClick={handleDownloadTxt} className="w-full text-left block px-4 py-2 text-sm text-slate-200 hover:bg-slate-600" role="menuitem">{t('downloadAsTxt')}</button>
                                 <button onClick={handleSavePdf} className="w-full text-left block px-4 py-2 text-sm text-slate-200 hover:bg-slate-600" role="menuitem">{t('saveAsPdf')}</button>
                                 <button onClick={handleEmailTranscript} className="w-full text-left block px-4 py-2 text-sm text-slate-200 hover:bg-slate-600" role="menuitem">{t('emailTranscript')}</button>
                             </div>
                        )}
                    </div>
                </div>
            </div>

            {isSearchVisible && (
                <div className="flex-shrink-0 p-2 border-b border-slate-700 bg-slate-800 flex items-center gap-x-3 gap-y-2 flex-wrap print:hidden">
                    <div className="relative flex-grow" ref={searchContainerRef}>
                        <input 
                            type="text" 
                            value={searchQuery} 
                            onChange={(e) => setSearchQuery(e.target.value)} 
                            onFocus={() => setIsHistoryVisible(true)}
                            onKeyDown={handleSearchKeyDown}
                            placeholder={t('search')} 
                            autoFocus 
                            className="w-full bg-slate-700 text-slate-200 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 min-w-[120px]"
                        />
                         {isHistoryVisible && searchHistory.length > 0 && (
                             <div className="absolute top-full left-0 right-0 mt-1 bg-slate-600 border border-slate-500 rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
                                <div className="px-3 py-1 text-xs text-slate-400 font-semibold border-b border-slate-500 flex justify-between items-center">
                                    <span>{t('recentSearches')}</span>
                                    <button 
                                        className="text-xs text-slate-400 hover:text-white hover:underline"
                                        onClick={() => setSearchHistory([])}
                                        title={t('clearHistory')}
                                    >
                                        {t('clear')}
                                    </button>
                                </div>
                                <ul className="py-1">
                                    {searchHistory.map((item, index) => (
                                        <li key={index} className="flex items-center justify-between group hover:bg-slate-500">
                                            <button
                                                className="w-full text-left px-3 py-1.5 text-sm text-slate-200"
                                                onClick={() => {
                                                    setSearchQuery(item);
                                                    setIsHistoryVisible(false);
                                                }}
                                            >
                                                {item}
                                            </button>
                                            <button
                                                className="p-1 rounded-full text-slate-400 hover:text-white mr-2 opacity-0 group-hover:opacity-100 focus:opacity-100"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSearchHistory(prev => prev.filter(h => h !== item));
                                                }}
                                                title={t('removeSearchItem')}
                                            >
                                                <CloseIcon className="w-3 h-3" />
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center space-x-1.5 text-sm"><input type="checkbox" id="case-sensitive-search" checked={isCaseSensitive} onChange={(e) => setIsCaseSensitive(e.target.checked)} className="h-4 w-4 rounded border-slate-600 text-indigo-600 focus:ring-indigo-500" /><label htmlFor="case-sensitive-search" className="cursor-pointer select-none">{t('caseSensitive')}</label></div>
                    <div className="flex items-center gap-2 ml-auto">
                        {searchQuery && <span className="text-sm text-slate-500 whitespace-nowrap">{searchResults.length > 0 ? `${currentResultIndex + 1} ${t('of')} ${searchResults.length}` : `0 ${t('results')}`}</span>}
                        {searchResults.length > 1 && (<><button title={t('previous')} onClick={() => setCurrentResultIndex((p) => (p - 1 + searchResults.length) % searchResults.length)} className="p-1 rounded"><ChevronUpIcon className="h-5 w-5"/></button><button title={t('next')} onClick={() => setCurrentResultIndex((p) => (p + 1) % searchResults.length)} className="p-1 rounded"><ChevronDownIcon className="h-5 w-5"/></button></>)}
                        <button title={t('closeSearch')} onClick={() => setIsSearchVisible(false)} className="p-1 rounded"><CloseIcon className="h-5 w-5"/></button>
                    </div>
                </div>
            )}

            <div className="flex-grow p-6 overflow-y-auto print:overflow-visible print:p-4">
                {error && <div className="flex items-center justify-center h-full text-red-400"><p><strong>Error:</strong> {error}</p></div>}
                <div className="space-y-6">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex items-start gap-3 group ${msg.role === 'user' ? 'justify-end' : ''}`}>
                            {msg.role === 'model' && <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-900 flex items-center justify-center print:hidden"><RoboIcon className="w-5 h-5 text-indigo-300"/></div>}
                            <div className={`max-w-xl relative ${msg.role === 'user' ? (msg.isAction ? 'text-center w-full' : 'bg-blue-500 text-white rounded-2xl rounded-br-none px-4 py-3') : ''}`}>
                                {msg.role === 'user' && msg.isAction && <p className="text-sm italic text-slate-400">{msg.text}</p>}
                                {msg.role === 'model' && !msg.text && isLoading ? (
                                    <div className="bg-slate-700 rounded-2xl rounded-bl-none px-4 py-3"><TypingIndicator /></div>
                                ) : (
                                    <>
                                        {msg.isTranslating && <div className="absolute inset-0 bg-slate-800/50 flex items-center justify-center rounded-2xl z-10"><Loader className="h-5 w-5 text-slate-500" /></div>}
                                        {msg.role !== 'user' || !msg.isAction ? renderMessageContent(msg, index) : null}
                                    </>
                                )}
                            </div>
                            
                            {msg.role === 'model' && (
                                <div className="flex-shrink-0 flex items-center self-center space-x-0.5 ml-1 print:hidden">
                                    <button title={t('setReminderForThis')} onClick={() => onSetReminder(msg.text)} className="p-1 rounded-full text-slate-400 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all hover:text-amber-400"><BellIcon className="w-4 h-4" /></button>
                                    <button title={t('goodResponse')} onClick={() => onMessageFeedback(index, 'up')} className={`p-1 rounded-full text-slate-400 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all hover:text-green-400 ${msg.feedback === 'up' ? 'opacity-100 text-green-500 bg-green-900/50' : ''}`}><ThumbsUpIcon className="w-4 h-4" isFilled={msg.feedback === 'up'} /></button>
                                    <button title={t('badResponse')} onClick={() => onMessageFeedback(index, 'down')} className={`p-1 rounded-full text-slate-400 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all hover:text-red-400 ${msg.feedback === 'down' ? 'opacity-100 text-red-500 bg-red-900/50' : ''}`}><ThumbsDownIcon className="w-4 h-4" isFilled={msg.feedback === 'down'} /></button>
                                </div>
                            )}
                            {msg.role === 'user' && !msg.isAction && <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center print:hidden"><UserIcon className="w-5 h-5 text-slate-300"/></div>}
                        </div>
                    ))}
                </div>
                <div ref={chatEndRef} />
            </div>
            
            <div className="px-6 pb-4 space-y-4 print:hidden">
                {/* Feature Bar */}
                {messages.length > 0 && !isLoading && (
                    <div className="border-t border-slate-700 pt-4">
                        <div className="flex justify-center items-center gap-2 mb-4">
                             <span className="text-sm font-semibold text-slate-400">{t('actions')}:</span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                             <button onClick={() => { setActiveFeature('summary'); onGetSummary(); }} className={`flex items-center justify-center gap-2 p-2 rounded-lg text-sm transition-colors ${activeFeature === 'summary' ? 'bg-indigo-600 text-white' : 'bg-slate-700 hover:bg-slate-600'}`}><DocumentTextIcon className="w-5 h-5"/>{t('featureSummary')}</button>
                             <button onClick={() => { setActiveFeature('risk'); onGetRiskAnalysis(); }} className={`flex items-center justify-center gap-2 p-2 rounded-lg text-sm transition-colors ${activeFeature === 'risk' ? 'bg-indigo-600 text-white' : 'bg-slate-700 hover:bg-slate-600'}`}><ShieldCheckIcon className="w-5 h-5"/>{t('featureRiskAnalysis')}</button>
                             <button onClick={() => setActiveFeature('qa')} className={`flex items-center justify-center gap-2 p-2 rounded-lg text-sm transition-colors ${activeFeature === 'qa' ? 'bg-indigo-600 text-white' : 'bg-slate-700 hover:bg-slate-600'}`}><ChatBubbleLeftRightIcon className="w-5 h-5"/>{t('featureQA')}</button>
                        </div>
                    </div>
                )}
                
                 {activeFeature === 'qa' && suggestedQuestions.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2">
                        {suggestedQuestions.map((q, i) => (
                            <button 
                                key={i} 
                                onClick={() => onSendMessage(q)}
                                className="px-3 py-1.5 text-sm text-indigo-200 bg-slate-700/50 border border-slate-600 rounded-full hover:bg-slate-700 hover:border-indigo-500 transition-colors"
                            >
                                {q}
                            </button>
                        ))}
                    </div>
                 )}

                {activeFeature === 'qa' && (
                    <div>
                        <div className="flex justify-end mb-2">
                            <button onClick={onOpenConsultModal} className="flex items-center gap-2 text-sm text-indigo-400 hover:underline"><BriefcaseIcon className="w-4 h-4" />{t('consultAProfessional')}</button>
                        </div>
                        <form onSubmit={handleFormSubmit} className="flex items-end space-x-2">
                            <div className="relative flex-grow">
                                 <textarea ref={textareaRef} rows={1} value={newMessage} onChange={(e) => setNewMessage(e.target.value)} onKeyDown={handleKeyDown} placeholder={isListening ? t('listening') : t('askFollowUp')} disabled={isLoading} className="w-full p-3 pr-12 border border-slate-600 rounded-2xl shadow-sm focus:ring-indigo-500 bg-slate-800 disabled:opacity-50 resize-none" />
                                {isSpeechSupported && (<button type="button" onClick={handleToggleListening} disabled={isLoading} title={isListening ? t('stopDictation') : t('dictateDocument')} className={`absolute inset-y-0 right-0 flex items-center pr-3 rounded-full text-slate-500 hover:text-indigo-400 disabled:opacity-30 ${isListening ? 'text-red-500' : ''}`}><MicrophoneIcon className="w-5 h-5" /></button>)}
                            </div>
                            <button type="submit" disabled={isLoading || !newMessage.trim()} className="flex-shrink-0 p-3 rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-slate-500"><SendIcon className="w-6 h-6" /></button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};