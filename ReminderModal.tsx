import React, { useState, useEffect } from 'react';
import { useLocalization } from './i18n';
import { CloseIcon, BellIcon } from './Icons';

interface ReminderModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (details: { title: string; date: string; time: string }) => void;
    contextText: string;
}

export const ReminderModal: React.FC<ReminderModalProps> = ({ isOpen, onClose, onSubmit, contextText }) => {
    const { t } = useLocalization();
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    
    useEffect(() => {
        if(isOpen) {
            setTitle('');
            // Set default date to tomorrow
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            setDate(tomorrow.toISOString().split('T')[0]);
            setTime('09:00');
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ title, date, time });
    };

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 print:hidden" aria-modal="true" role="dialog">
            <div className="bg-slate-800 rounded-lg shadow-xl p-8 w-full max-w-lg m-4 relative">
                <button onClick={onClose} className="absolute top-3 right-3 p-1 rounded-full text-slate-400 hover:bg-slate-700" aria-label="Close">
                    <CloseIcon className="h-6 w-6" />
                </button>
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-center text-white flex items-center justify-center gap-2">
                        <BellIcon className="h-6 w-6 text-amber-400" /> {t('setReminder')}
                    </h2>
                    <p className="text-center text-sm text-slate-400 mt-2">
                        {t('reminderDescription')}
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                     <div>
                        <label htmlFor="reminder-title" className="block text-sm font-medium text-slate-300">{t('title')}</label>
                        <input type="text" id="reminder-title" value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="e.g., Contract Renewal" className="mt-1 block w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="reminder-date" className="block text-sm font-medium text-slate-300">{t('date')}</label>
                            <input type="date" id="reminder-date" value={date} onChange={(e) => setDate(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                        </div>
                        <div>
                            <label htmlFor="reminder-time" className="block text-sm font-medium text-slate-300">{t('time')}</label>
                            <input type="time" id="reminder-time" value={time} onChange={(e) => setTime(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="reminder-context" className="block text-sm font-medium text-slate-300">{t('context')}</label>
                        <textarea
                            id="reminder-context"
                            rows={4}
                            value={contextText}
                            readOnly
                            className="mt-1 block w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-md shadow-sm placeholder-slate-400 text-slate-400 cursor-not-allowed"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={!title || !date || !time}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-slate-500"
                    >
                        {t('saveReminder')}
                    </button>
                </form>
            </div>
        </div>
    );
};
