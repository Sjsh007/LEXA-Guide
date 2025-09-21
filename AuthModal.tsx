import React, { useState, useEffect } from 'react';
import { useLocalization } from './i18n';
import { CloseIcon } from './Icons';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLogin: (email: string, pass: string) => void;
    onSignUp: (email: string, pass: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin, onSignUp }) => {
    const { t } = useLocalization();
    const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (isOpen) {
            setEmail('');
            setPassword('');
            setError('');
            setAuthMode('login');
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            setError(t('errorEnterEmailPass'));
            return;
        }
        setError('');
        if (authMode === 'login') {
            onLogin(email, password);
        } else {
            onSignUp(email, password);
        }
    };

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 print:hidden" aria-modal="true" role="dialog">
            <div className="bg-slate-800 rounded-lg shadow-xl p-8 w-full max-w-md m-4 relative">
                <button onClick={onClose} className="absolute top-3 right-3 p-1 rounded-full text-slate-400 hover:bg-slate-700" aria-label="Close">
                    <CloseIcon className="h-6 w-6" />
                </button>
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-center text-white">
                        {authMode === 'login' ? t('welcomeBack') : t('createAccount')}
                    </h2>
                    <p className="text-center text-sm text-slate-400 mt-1">
                        {authMode === 'login' ? t('signInToHistory') : t('getStarted')}
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-300">{t('emailAddress')}</label>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                    <div>
                        <label htmlFor="password"className="block text-sm font-medium text-slate-300">{t('password')}</label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                    {error && <p className="text-sm text-red-500">{error}</p>}
                    <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        {authMode === 'login' ? t('signIn') : t('signUp')}
                    </button>
                </form>
                <div className="text-center mt-6">
                    <button onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')} className="text-sm text-indigo-400 hover:underline">
                        {authMode === 'login' ? t('needAccount') : t('alreadyHaveAccount')}
                    </button>
                </div>
            </div>
        </div>
    );
};
