import React from 'react';
import { useLocalization } from './i18n';
import { CloseIcon, UserCircleIcon } from './Icons';

interface UserProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    userEmail: string | null;
    onLogout: () => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({ isOpen, onClose, userEmail, onLogout }) => {
    const { t } = useLocalization();
    if (!isOpen) return null;

    const handleChangePassword = () => {
        alert("Password change functionality requires backend integration.");
    };

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 print:hidden" aria-modal="true" role="dialog">
            <div className="bg-slate-800 rounded-lg shadow-xl p-8 w-full max-w-sm m-4 relative">
                <button onClick={onClose} className="absolute top-3 right-3 p-1 rounded-full text-slate-400 hover:bg-slate-700" aria-label="Close">
                    <CloseIcon className="h-6 w-6" />
                </button>
                <div className="text-center">
                    <UserCircleIcon className="w-16 h-16 mx-auto text-slate-400 mb-4" />
                    <h2 className="text-xl font-bold text-white">{t('userProfile')}</h2>
                    <p className="text-sm text-slate-400 mt-2 break-all">{userEmail || 'No email provided'}</p>
                </div>
                <div className="mt-6 space-y-3">
                    <button onClick={handleChangePassword} className="w-full flex justify-center py-2 px-4 border border-slate-600 rounded-md shadow-sm text-sm font-medium text-slate-200 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        {t('changePassword')}
                    </button>
                    <button onClick={onLogout} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                        {t('signOut')}
                    </button>
                </div>
            </div>
        </div>
    );
};
