import React from 'react';
import { useLocalization } from './i18n';
import { CloseIcon } from './Icons';

interface PrivacyModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
    const { t } = useLocalization();
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 print:hidden" aria-modal="true" role="dialog">
            <div className="bg-slate-800 rounded-lg shadow-xl p-8 w-full max-w-2xl m-4 relative h-[80vh] flex flex-col">
                <button onClick={onClose} className="absolute top-3 right-3 p-1 rounded-full text-slate-400 hover:bg-slate-700" aria-label="Close">
                    <CloseIcon className="h-6 w-6" />
                </button>
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-center text-white">{t('privacyTitle')}</h2>
                    <p className="text-center text-sm text-slate-400 mt-1">
                        {t('privacySubtitle')}
                    </p>
                </div>
                <div className="flex-grow overflow-y-auto pr-4 -mr-4 text-slate-300 space-y-4 text-sm">
                    <h3 className="font-semibold text-lg text-slate-100">{t('privacyHandlingTitle')}</h3>
                    <p>{t('privacyHandlingText')}</p>
                    
                    <h3 className="font-semibold text-lg text-slate-100 mt-4">{t('privacySecureTitle')}</h3>
                    <p>{t('privacySecureText')}</p>
                    
                    <h3 className="font-semibold text-lg text-slate-100 mt-4">{t('privacyDeletionTitle')}</h3>
                    <p>{t('privacyDeletionText')}</p>
                    <ul className="list-disc list-inside space-y-2 pl-4">
                        <li>{t('privacyDeletionListItem1')}</li>
                        <li>{t('privacyDeletionListItem2')}</li>
                    </ul>
                    <p>{t('privacyDeletionConclusion')}</p>

                    <h3 className="font-semibold text-lg text-slate-100 mt-4">{t('privacyCookiesTitle')}</h3>
                    <p>{t('privacyCookiesText')}</p>
                    
                    <p className="mt-6 italic text-xs text-slate-400">{t('privacyDisclaimer')}</p>
                </div>
            </div>
        </div>
    );
};
