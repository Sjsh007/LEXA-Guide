import React from 'react';
import { useLocalization } from './i18n';
import { mockAnomalyData } from './data';
import { CloseIcon, CubeTransparentIcon } from './Icons';

interface AnomalyDetectionModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AnomalyDetectionModal: React.FC<AnomalyDetectionModalProps> = ({ isOpen, onClose }) => {
    const { t } = useLocalization();
    if (!isOpen) return null;

    const getSeverityClasses = (severity: string) => {
        switch (severity) {
            case 'High': return 'bg-red-900/50 text-red-300';
            case 'Medium': return 'bg-amber-900/50 text-amber-300';
            case 'Low': return 'bg-sky-900/50 text-sky-300';
            default: return 'bg-slate-700 text-slate-300';
        }
    };

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 print:hidden" aria-modal="true" role="dialog">
            <div className="bg-slate-800 rounded-lg shadow-xl w-full max-w-5xl m-4 h-[90vh] flex flex-col">
                <div className="flex-shrink-0 p-4 border-b border-slate-700 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-slate-200 flex items-center gap-2">
                        <CubeTransparentIcon className="h-6 w-6" /> {t('anomalyDetection')}
                    </h2>
                    <button onClick={onClose} className="p-1 rounded-full text-slate-400 hover:bg-slate-700" aria-label="Close">
                        <CloseIcon className="h-6 w-6" />
                    </button>
                </div>
                <div className="flex-grow p-6 overflow-y-auto bg-slate-800/50">
                    <p className="text-sm text-slate-400 mb-6">
                        {t('anomalyReportDesc')}
                    </p>
                    <div className="space-y-4">
                        {mockAnomalyData.map(anomaly => (
                            <div key={anomaly.id} className="bg-slate-700 p-4 rounded-lg shadow border border-slate-600">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="font-semibold text-md text-slate-100">{anomaly.title}</h3>
                                    <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${getSeverityClasses(anomaly.severity)}`}>
                                        {t(anomaly.severity.toLowerCase() + 'Risk')}
                                    </span>
                                </div>
                                <div className="space-y-3 text-sm">
                                    <p className="p-3 bg-slate-800 rounded-md font-mono text-xs text-slate-300 italic">
                                        "{anomaly.clause}"
                                    </p>
                                    <div>
                                        <h4 className="font-semibold text-slate-300">{t('anomalyExplanation')}</h4>
                                        <p className="text-slate-400">{anomaly.explanation}</p>
                                    </div>
                                     <div>
                                        <h4 className="font-semibold text-slate-300">{t('anomalySource')}</h4>
                                        <p className="text-slate-400 font-mono text-xs">{anomaly.source}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="mt-8 text-xs text-center text-slate-400 italic">{t('anomalyDemoNote')}</p>
                </div>
            </div>
        </div>
    );
};
