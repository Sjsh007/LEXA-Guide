import React from 'react';
import { useLocalization } from './i18n';
import { mockAdminData, mockAnomalyData } from './data';
import { CloseIcon, ChartBarIcon } from './Icons';

interface AdminDashboardModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({ isOpen, onClose }) => {
    const { t } = useLocalization();
    if (!isOpen) return null;

    const totalDocCount = mockAdminData.documentTypes.reduce((sum, doc) => sum + doc.count, 0);

    const anomalyStats = {
        total: mockAnomalyData.length,
        severity: mockAnomalyData.reduce((acc, anomaly) => {
            acc[anomaly.severity] = (acc[anomaly.severity] || 0) + 1;
            return acc;
        }, {} as Record<string, number>),
        sourceTypes: mockAnomalyData.reduce((acc, anomaly) => {
            const ext = anomaly.source.split('.').pop()?.toLowerCase() || 'unknown';
            acc[ext] = (acc[ext] || 0) + 1;
            return acc;
        }, {} as Record<string, number>),
    };

    const sortedSourceTypes = Object.entries(anomalyStats.sourceTypes).sort(([, a], [, b]) => b - a);

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 print:hidden" aria-modal="true" role="dialog">
            <div className="bg-slate-800 rounded-lg shadow-xl w-full max-w-4xl m-4 h-[90vh] flex flex-col">
                <div className="flex-shrink-0 p-4 border-b border-slate-700 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-slate-200 flex items-center gap-2">
                        <ChartBarIcon className="h-6 w-6" /> {t('adminTitle')}
                    </h2>
                    <button onClick={onClose} className="p-1 rounded-full text-slate-400 hover:bg-slate-700" aria-label="Close">
                        <CloseIcon className="h-6 w-6" />
                    </button>
                </div>
                <div className="flex-grow p-6 overflow-y-auto bg-slate-800/50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-slate-700 p-4 rounded-lg shadow">
                            <h3 className="font-semibold text-slate-300">{t('totalDocsAnalyzed')}</h3>
                            <p className="text-3xl font-bold text-white mt-2">{mockAdminData.totalDocuments}</p>
                        </div>
                        <div className="bg-slate-700 p-4 rounded-lg shadow">
                            <h3 className="font-semibold text-slate-300">{t('avgAnalysisTime')}</h3>
                            <p className="text-3xl font-bold text-white mt-2">{mockAdminData.avgAnalysisTime}s</p>
                        </div>
                    </div>

                    <div className="bg-slate-700 p-4 rounded-lg shadow mt-6">
                        <h3 className="font-semibold text-slate-200 mb-4">{t('docTypeBreakdown')}</h3>
                        <div className="space-y-3">
                            {mockAdminData.documentTypes.map(doc => (
                                <div key={doc.name}>
                                    <div className="flex justify-between items-center text-sm mb-1">
                                        <span className="font-medium text-slate-300">{doc.name}</span>
                                        <span className="text-slate-400">{doc.count}</span>
                                    </div>
                                    <div className="w-full bg-slate-600 rounded-full h-2.5">
                                        <div className={`${doc.color} h-2.5 rounded-full`} style={{ width: `${(doc.count / totalDocCount) * 100}%` }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-slate-700 p-4 rounded-lg shadow mt-6">
                        <h3 className="font-semibold text-slate-200 mb-4">{t('anomalySummary')}</h3>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="bg-slate-800 p-3 rounded-md text-center">
                                <p className="text-sm text-slate-400">{t('totalAnomalies')}</p>
                                <p className="text-2xl font-bold text-white">{anomalyStats.total}</p>
                            </div>
                            <div className="bg-red-900/40 p-3 rounded-md text-center">
                                <p className="text-sm text-red-300">{t('highRisk')}</p>
                                <p className="text-2xl font-bold text-red-200">{anomalyStats.severity.High || 0}</p>
                            </div>
                            <div className="bg-amber-900/40 p-3 rounded-md text-center">
                                <p className="text-sm text-amber-300">{t('mediumRisk')}</p>
                                <p className="text-2xl font-bold text-amber-200">{anomalyStats.severity.Medium || 0}</p>
                            </div>
                            <div className="bg-sky-900/40 p-3 rounded-md text-center">
                                <p className="text-sm text-sky-300">{t('lowRisk')}</p>
                                <p className="text-2xl font-bold text-sky-200">{anomalyStats.severity.Low || 0}</p>
                            </div>
                        </div>
                        <div className="mt-4">
                            <h4 className="font-semibold text-slate-300 text-sm mb-2">{t('topAnomalySources')}</h4>
                            <ul className="space-y-1 text-sm text-slate-400">
                                {sortedSourceTypes.map(([type, count]) => (
                                    <li key={type} className="flex justify-between items-center bg-slate-800 p-2 rounded">
                                        <span className="font-mono text-xs bg-slate-900 px-1.5 py-0.5 rounded">.{type}</span>
                                        <span>{count} {count > 1 ? t('instances') : t('instance')}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                        <div className="bg-slate-700 p-4 rounded-lg shadow">
                             <h3 className="font-semibold text-slate-200 mb-3">{t('commonUserQuestions')}</h3>
                             <ul className="list-disc list-inside space-y-2 text-sm text-slate-300">
                                {mockAdminData.commonQueries.map((query, index) => <li key={index}>{query}</li>)}
                             </ul>
                        </div>
                         <div className="bg-slate-700 p-4 rounded-lg shadow">
                             <h3 className="font-semibold text-slate-200 mb-3">{t('frequentRisks')}</h3>
                             <ul className="list-disc list-inside space-y-2 text-sm text-slate-300">
                                {mockAdminData.frequentRisks.map((risk, index) => <li key={index}>{risk}</li>)}
                             </ul>
                        </div>
                    </div>
                     <p className="mt-8 text-xs text-center text-slate-400 italic">{t('demoDataNote')}</p>
                </div>
            </div>
        </div>
    );
};
