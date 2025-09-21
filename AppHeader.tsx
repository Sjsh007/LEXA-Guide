import React, { useState, useRef, useEffect } from 'react';
import { useLocalization, supportedLanguages } from './i18n';
import { RoboIcon, UserCircleIcon, FeedbackIcon, ChartBarIcon, CubeTransparentIcon, TranslateIcon, HelpIcon } from './Icons';

export interface AppHeaderProps {
    isLoggedIn: boolean;
    onOpenAuthModal: () => void;
    onOpenProfileModal: () => void;
    onOpenFeedbackModal: () => void;
    onOpenAdminDashboard: () => void;
    onOpenAnomalyModal: () => void;
    onOpenHelpWidget: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ isLoggedIn, onOpenAuthModal, onOpenProfileModal, onOpenFeedbackModal, onOpenAdminDashboard, onOpenAnomalyModal, onOpenHelpWidget }) => {
    const { t, language, setLanguage } = useLocalization();
    const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
    const langMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
                setIsLangMenuOpen(false);
            }
        };
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsLangMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    const handleLanguageSelect = (langCode: string) => {
        setLanguage(langCode);
        setIsLangMenuOpen(false);
    };

    return (
        <header className="w-full bg-slate-800/50 backdrop-blur-sm border-b border-white/10 shadow-md p-4 flex items-center justify-between flex-shrink-0 z-10 print:hidden">
            <div className="flex items-center">
                <RoboIcon className="h-8 w-8 text-slate-300 mr-3" />
                <h1 className="text-2xl font-bold text-white">{t('appTitle')}</h1>
            </div>
            <div className="flex items-center space-x-1 md:space-x-2">
                <button
                    onClick={onOpenAnomalyModal}
                    title={t('anomalyDetection')}
                    aria-label={t('anomalyDetection')}
                    className="p-1.5 rounded-full text-slate-300 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-white"
                >
                    <CubeTransparentIcon className="h-6 w-6" />
                </button>
                 <button
                    onClick={onOpenAdminDashboard}
                    title={t('adminAnalytics')}
                    aria-label={t('adminAnalytics')}
                    className="p-1.5 rounded-full text-slate-300 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-white"
                >
                    <ChartBarIcon className="h-6 w-6" />
                </button>
                <button
                    onClick={onOpenFeedbackModal}
                    title={t('submitFeedback')}
                    aria-label={t('submitFeedback')}
                    className="p-1.5 rounded-full text-slate-300 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-white"
                >
                    <FeedbackIcon className="h-6 w-6" />
                </button>
                <button
                    onClick={onOpenHelpWidget}
                    title={t('helpSupport')}
                    aria-label={t('helpSupport')}
                    className="p-1.5 rounded-full text-slate-300 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-white"
                >
                    <HelpIcon className="h-6 w-6" />
                </button>
                 <div className="relative" ref={langMenuRef}>
                    <button
                        type="button"
                        onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                        title={t('changeLanguage')}
                        aria-label={t('changeLanguage')}
                        className="p-1.5 rounded-full text-slate-300 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-white"
                    >
                        <TranslateIcon className="h-6 w-6" />
                    </button>
                    {isLangMenuOpen && (
                        <div
                            className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg py-1 bg-slate-700 ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                            role="menu"
                            aria-orientation="vertical"
                        >
                            {supportedLanguages.map(lang => (
                                <button
                                    key={lang.code}
                                    onClick={() => handleLanguageSelect(lang.code)}
                                    className={`w-full text-left block px-4 py-2 text-sm ${language === lang.code ? 'font-semibold text-indigo-400' : 'text-slate-200'} hover:bg-slate-600`}
                                    role="menuitem"
                                >
                                    {lang.name}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
                {isLoggedIn ? (
                    <button
                        type="button"
                        onClick={onOpenProfileModal}
                        title={t('openUserProfile')}
                        className="p-1.5 rounded-full text-slate-300 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-white"
                    >
                        <span className="sr-only">{t('openUserProfile')}</span>
                        <UserCircleIcon className="h-7 w-7" />
                    </button>
                ) : (
                    <button
                        onClick={onOpenAuthModal}
                        className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        {t('signIn')}
                    </button>
                )}
            </div>
        </header>
    );
};
