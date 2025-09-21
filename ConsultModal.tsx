import React, { useState, useEffect } from 'react';
import { useLocalization } from './i18n';
import { CloseIcon, Loader } from './Icons';

interface ConsultModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (details: { name: string; email: string; issue: string }) => void;
    documentContext: string;
}

export const ConsultModal: React.FC<ConsultModalProps> = ({ isOpen, onClose, onSubmit, documentContext }) => {
    const { t } = useLocalization();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [issue, setIssue] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setName('');
            setEmail('');
            setIssue(`I need help understanding the following document:\n\n---\n${documentContext.substring(0, 500)}...\n---`);
            setIsSubmitted(false);
            setIsSubmitting(false);
        }
    }, [isOpen, documentContext]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !email.trim() || !issue.trim() || isSubmitting) return;

        setIsSubmitting(true);
        onSubmit({ name, email, issue });
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
            setTimeout(() => {
                onClose();
            }, 2500);
        }, 1000);
    };

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 print:hidden" aria-modal="true" role="dialog">
            <div className="bg-slate-800 rounded-lg shadow-xl p-8 w-full max-w-lg m-4 relative">
                <button onClick={onClose} className="absolute top-3 right-3 p-1 rounded-full text-slate-400 hover:bg-slate-700" aria-label="Close">
                    <CloseIcon className="h-6 w-6" />
                </button>
                
                {isSubmitted ? (
                    <div className="text-center py-8">
                        <svg className="w-16 h-16 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        <h2 className="text-2xl font-bold text-white mt-4">{t('requestSent')}</h2>
                        <p className="text-slate-400 mt-1">{t('requestSentDescription')}</p>
                    </div>
                ) : (
                    <>
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-center text-white">{t('consultTitle')}</h2>
                            <p className="text-center text-sm text-slate-400 mt-2">
                                {t('consultDescription')}
                            </p>
                            <p className="text-center text-xs text-slate-500 mt-3 p-2 bg-slate-700/50 rounded-md">
                                {t('consultDisclaimer')}
                            </p>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="consult-name" className="block text-sm font-medium text-slate-300">{t('fullName')}</label>
                                    <input type="text" id="consult-name" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                                </div>
                                <div>
                                    <label htmlFor="consult-email" className="block text-sm font-medium text-slate-300">{t('emailAddress')}</label>
                                    <input type="email" id="consult-email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="consult-issue" className="block text-sm font-medium text-slate-300">{t('briefDescription')}</label>
                                <textarea
                                    id="consult-issue"
                                    rows={8}
                                    value={issue}
                                    onChange={(e) => setIssue(e.target.value)}
                                    required
                                    className="mt-1 block w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting || !name.trim() || !email.trim() || !issue.trim()}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-slate-500"
                            >
                                {isSubmitting ? <Loader className="h-5 w-5" /> : t('requestConsultation')}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};
