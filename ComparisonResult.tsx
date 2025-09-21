import React from 'react';
import { useLocalization } from './i18n';
import { RestartIcon, DocumentIcon } from './Icons';
import type { DocumentState } from './ComparisonInputForm';

interface ClauseComparison {
    clauseName: string;
    documentA_summary: string;
    documentB_summary: string;
    differenceAnalysis: string;
    riskLevel: 'Low' | 'Medium' | 'High';
}

export interface ComparisonData {
    overallSummary: string;
    clauseComparison: ClauseComparison[];
}

interface ComparisonResultProps {
    result: ComparisonData | null;
    documentA: DocumentState | null;
    documentB: DocumentState | null;
    error: string | null;
    onReset: () => void;
}

const getRiskClasses = (riskLevel: string) => {
    switch (riskLevel) {
        case 'High': return 'bg-red-900/50 text-red-300 border-red-700/50';
        case 'Medium': return 'bg-amber-900/50 text-amber-300 border-amber-700/50';
        case 'Low': return 'bg-sky-900/50 text-sky-300 border-sky-700/50';
        default: return 'bg-slate-700 text-slate-300 border-slate-600';
    }
};

export const ComparisonResult: React.FC<ComparisonResultProps> = ({ result, documentA, documentB, error, onReset }) => {
    const { t } = useLocalization();

    return (
        <div className="flex flex-col h-full w-full max-w-7xl mx-auto">
            <div className="flex-shrink-0 p-4 border-b border-slate-700 flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">{t('comparisonResults')}</h2>
                <button onClick={onReset} title={t('newComparison')} className="flex items-center gap-2 text-sm text-slate-300 hover:text-indigo-400">
                    <RestartIcon className="w-5 h-5" />
                    {t('newComparison')}
                </button>
            </div>

            {error && (
                <div className="flex-grow flex items-center justify-center text-red-400 p-6">
                    <p><strong>Error:</strong> {error}</p>
                </div>
            )}

            {!error && result && (
                <div className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-4 p-4">
                    {/* Document A Column */}
                    <div className="lg:flex flex-col bg-slate-800/50 rounded-lg overflow-hidden border border-slate-700">
                        <h3 className="flex-shrink-0 p-3 font-semibold text-slate-300 border-b border-slate-700 text-sm truncate" title={documentA?.file?.name}>
                            {t('document1')}: {documentA?.file?.name}
                        </h3>
                        <div className="flex-grow p-4 overflow-y-auto text-xs text-slate-400 whitespace-pre-wrap font-mono">
                            {documentA?.text}
                        </div>
                    </div>

                    {/* Center Analysis Column */}
                    <div className="flex flex-col bg-slate-900/30 rounded-lg overflow-hidden border border-slate-700">
                        <div className="flex-grow p-4 overflow-y-auto space-y-6">
                            <div>
                                <h3 className="font-bold text-lg text-indigo-400 mb-2">{t('overallSummary')}</h3>
                                <p className="text-sm text-slate-300">{result.overallSummary}</p>
                            </div>
                            <div className="border-t border-slate-700 pt-4">
                                <h3 className="font-bold text-lg text-indigo-400 mb-4">{t('clauseComparison')}</h3>
                                <div className="space-y-4">
                                    {result.clauseComparison.map((item, index) => (
                                        <div key={index} className={`border rounded-lg p-4 ${getRiskClasses(item.riskLevel)}`}>
                                            <div className="flex justify-between items-center mb-3">
                                                <h4 className="font-semibold text-md text-slate-100">{item.clauseName}</h4>
                                                <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${getRiskClasses(item.riskLevel)}`}>
                                                    {t(item.riskLevel.toLowerCase() + 'Risk')}
                                                </span>
                                            </div>
                                            <div className="space-y-3 text-sm">
                                                <div className="p-3 bg-slate-800 rounded-md">
                                                    <p className="font-semibold text-slate-300 mb-1">{t('document1')}</p>
                                                    <p className="text-slate-400 text-xs italic">"{item.documentA_summary}"</p>
                                                </div>
                                                 <div className="p-3 bg-slate-800 rounded-md">
                                                    <p className="font-semibold text-slate-300 mb-1">{t('document2')}</p>
                                                    <p className="text-slate-400 text-xs italic">"{item.documentB_summary}"</p>
                                                </div>
                                                <div>
                                                    <h5 className="font-semibold text-slate-200 mb-1">{t('differenceAnalysis')}</h5>
                                                    <p className="text-slate-300">{item.differenceAnalysis}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Document B Column */}
                     <div className="lg:flex flex-col bg-slate-800/50 rounded-lg overflow-hidden border border-slate-700">
                        <h3 className="flex-shrink-0 p-3 font-semibold text-slate-300 border-b border-slate-700 text-sm truncate" title={documentB?.file?.name}>
                           {t('document2')}: {documentB?.file?.name}
                        </h3>
                        <div className="flex-grow p-4 overflow-y-auto text-xs text-slate-400 whitespace-pre-wrap font-mono">
                           {documentB?.text}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};