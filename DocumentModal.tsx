import React, { useState, useEffect, useMemo, useRef } from 'react';
import { CloseIcon, SearchIcon, ChevronUpIcon, ChevronDownIcon, ExplainIcon } from './Icons';
import { useLocalization } from './i18n';

interface DocumentModalProps {
    isOpen: boolean;
    onClose: () => void;
    documentText: string;
    onExplainClause: (clauseText: string) => void;
}

const DocumentModal: React.FC<DocumentModalProps> = ({ isOpen, onClose, documentText, onExplainClause }) => {
    const { t } = useLocalization();
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isCaseSensitive, setIsCaseSensitive] = useState(false);
    const [searchResults, setSearchResults] = useState<number[]>([]);
    const [currentResultIndex, setCurrentResultIndex] = useState(-1);
    const contentRef = useRef<HTMLDivElement>(null);
    const modalBodyRef = useRef<HTMLDivElement>(null);
    
    // State for the floating "Explain" button
    const [explainTooltip, setExplainTooltip] = useState<{ top: number; left: number; text: string } | null>(null);

    // Reset state when modal is closed or document changes
    useEffect(() => {
        if (!isOpen) {
            setIsSearchVisible(false);
            setSearchQuery('');
            setIsCaseSensitive(false);
            setSearchResults([]);
            setCurrentResultIndex(-1);
            setExplainTooltip(null);
        }
    }, [isOpen]);

    // Perform search when query changes
    useEffect(() => {
        if (!searchQuery.trim()) {
            setSearchResults([]);
            setCurrentResultIndex(-1);
            return;
        }

        const flags = isCaseSensitive ? 'g' : 'gi';
        const regex = new RegExp(searchQuery, flags);
        const results: number[] = [];
        let match;
        while ((match = regex.exec(documentText)) !== null) {
            results.push(match.index);
        }
        
        setSearchResults(results);
        setCurrentResultIndex(results.length > 0 ? 0 : -1);
    }, [searchQuery, documentText, isCaseSensitive]);

    // Scroll to the active search result
    useEffect(() => {
        if (currentResultIndex === -1) return;
        
        const element = document.getElementById(`doc-match-${currentResultIndex}`);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        }
    }, [currentResultIndex]);

    const handleNextResult = () => {
        if (searchResults.length === 0) return;
        setCurrentResultIndex((prevIndex) => (prevIndex + 1) % searchResults.length);
    };

    const handlePrevResult = () => {
        if (searchResults.length === 0) return;
        setCurrentResultIndex((prevIndex) => (prevIndex - 1 + searchResults.length) % searchResults.length);
    };
    
    // Handle text selection for the "Explain" feature
    const handleMouseUp = () => {
        const selection = window.getSelection();
        const selectedText = selection?.toString().trim();

        if (selectedText && selection && modalBodyRef.current) {
            const range = selection.getRangeAt(0);
            const rect = range.getBoundingClientRect();
            const modalRect = modalBodyRef.current.getBoundingClientRect();
            
            setExplainTooltip({
                top: rect.top - modalRect.top + modalBodyRef.current.scrollTop - 40, // Position above selection
                left: rect.left - modalRect.left + rect.width / 2, // Center on selection
                text: selectedText,
            });
        } else {
            setExplainTooltip(null);
        }
    };

    const handleExplainClick = () => {
        if (explainTooltip) {
            onExplainClause(explainTooltip.text);
            onClose(); // Close the modal after sending the request
        }
    };

    const highlightedContent = useMemo(() => {
        if (!searchQuery.trim() || searchResults.length === 0) {
            return documentText;
        }

        const flags = isCaseSensitive ? 'g' : 'gi';
        const regex = new RegExp(`(${searchQuery})`, flags);
        const parts = documentText.split(regex);
        let matchCounter = 0;

        return parts.map((part, index) => {
            if (index % 2 === 1) { // This is a match
                const isCurrent = matchCounter === currentResultIndex;
                const matchId = `doc-match-${matchCounter++}`;
                return (
                    <mark
                        key={index}
                        id={matchId}
                        className={`px-0.5 rounded ${isCurrent ? 'bg-yellow-400 text-slate-900 ring-2 ring-yellow-400' : 'bg-yellow-700/50'}`}
                    >
                        {part}
                    </mark>
                );
            }
            return part;
        });
    }, [documentText, searchQuery, isCaseSensitive, currentResultIndex, searchResults]);

    if (!isOpen) return null;

    const closeSearch = () => {
        setIsSearchVisible(false);
        setSearchQuery('');
    };

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 print:hidden" aria-modal="true" role="dialog">
            <div className="bg-slate-800 rounded-lg shadow-xl w-full max-w-4xl m-4 h-[90vh] flex flex-col">
                <div className="flex-shrink-0 p-4 border-b border-slate-700 flex items-center justify-between">
                    {!isSearchVisible ? (
                        <>
                            <h2 className="text-lg font-semibold text-slate-200">{t('docModalTitle')}</h2>
                            <div className="flex items-center gap-2">
                                <button onClick={() => setIsSearchVisible(true)} className="p-1 rounded-full text-slate-400 hover:bg-slate-700" aria-label="Search document">
                                    <SearchIcon className="h-5 w-5" />
                                </button>
                                <button onClick={onClose} className="p-1 rounded-full text-slate-400 hover:bg-slate-700" aria-label="Close">
                                    <CloseIcon className="h-6 w-6" />
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="w-full flex items-center gap-x-2 text-sm">
                            <SearchIcon className="h-5 w-5 text-slate-400 flex-shrink-0" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={(e) => { if (e.key === 'Enter') handleNextResult(); }}
                                placeholder={t('docModalSearchPlaceholder')}
                                autoFocus
                                className="w-full bg-slate-700 text-slate-200 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <button
                                onClick={() => setIsCaseSensitive(!isCaseSensitive)}
                                title="Case sensitive"
                                className={`px-2 py-1 rounded ${isCaseSensitive ? 'bg-indigo-600 text-white' : 'bg-slate-600 text-slate-300'} hover:bg-slate-500`}
                            >
                                Aa
                            </button>
                            <span className="text-slate-400 whitespace-nowrap px-2">
                                {searchResults.length > 0 ? `${currentResultIndex + 1} ${t('docModalResultOf')} ${searchResults.length}` : t('docModalNoResults')}
                            </span>
                            <button
                                onClick={handlePrevResult}
                                disabled={searchResults.length < 2}
                                className="p-1 rounded-full text-slate-300 hover:bg-slate-600 disabled:opacity-40 disabled:cursor-not-allowed"
                                aria-label="Previous result"
                            >
                                <ChevronUpIcon className="h-5 w-5" />
                            </button>
                            <button
                                onClick={handleNextResult}
                                disabled={searchResults.length < 2}
                                className="p-1 rounded-full text-slate-300 hover:bg-slate-600 disabled:opacity-40 disabled:cursor-not-allowed"
                                aria-label="Next result"
                            >
                                <ChevronDownIcon className="h-5 w-5" />
                            </button>
                            <button onClick={closeSearch} className="p-1 rounded-full text-slate-400 hover:bg-slate-700" aria-label="Close search">
                                <CloseIcon className="h-5 w-5" />
                            </button>
                        </div>
                    )}
                </div>
                <div ref={modalBodyRef} onMouseUp={handleMouseUp} onScroll={() => setExplainTooltip(null)} className="flex-grow p-6 overflow-y-auto relative">
                    <p className="text-sm text-slate-300 whitespace-pre-wrap font-mono">
                        {highlightedContent}
                    </p>
                    {explainTooltip && (
                         <button
                            onClick={handleExplainClick}
                            title={t('explainClause')}
                            className="absolute z-10 p-2 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-500 transition-transform transform-gpu animate-fade-in"
                            style={{ top: `${explainTooltip.top}px`, left: `${explainTooltip.left}px`, transform: 'translateX(-50%)' }}
                        >
                            <style>{`
                                @keyframes fade-in {
                                    from { opacity: 0; transform: translateX(-50%) scale(0.8); }
                                    to { opacity: 1; transform: translateX(-50%) scale(1); }
                                }
                                .animate-fade-in { animation: fade-in 0.15s ease-out forwards; }
                            `}</style>
                            <ExplainIcon className="w-5 h-5" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DocumentModal;