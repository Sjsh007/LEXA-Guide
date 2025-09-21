import React, { useState, useEffect } from 'react';
import { useLocalization } from './i18n';
import { CloseIcon, Loader } from './Icons';

interface FeedbackModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (feedback: string) => void;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const { t } = useLocalization();
    const [feedback, setFeedback] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setFeedback('');
            setIsSubmitted(false);
            setIsSubmitting(false);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!feedback.trim() || isSubmitting) return;

        setIsSubmitting(true);
        onSubmit(feedback);
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
            setTimeout(() => {
                onClose();
            }, 1500);
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
                        <h2 className="text-2xl font-bold text-white mt-4">{t('thankYou')}</h2>
                        <p className="text-slate-400 mt-1">{t('feedbackSubmitted')}</p>
                    </div>
                ) : (
                    <>
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-center text-white">{t('shareFeedback')}</h2>
                            <p className="text-center text-sm text-slate-400 mt-1">
                                {t('feedbackDescription')}
                            </p>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="feedback-textarea" className="sr-only">{t('yourFeedback')}</label>
                                <textarea
                                    id="feedback-textarea"
                                    rows={6}
                                    value={feedback}
                                    onChange={(e) => setFeedback(e.target.value)}
                                    placeholder={t('feedbackPlaceholder')}
                                    required
                                    className="mt-1 block w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting || !feedback.trim()}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-slate-500"
                            >
                                {isSubmitting ? <Loader className="h-5 w-5" /> : t('submit')}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};
