import React, { useState, useCallback, useRef } from 'react';
import { useLocalization } from './i18n';
import { UploadIcon, Loader, DocumentIcon, CloseIcon, EyeIcon, EyeSlashIcon } from './Icons';
import { parsePdf, parseDocx } from './services/fileParser';

export interface DocumentState {
    file: File | null;
    text: string | null;
    status: 'idle' | 'parsing' | 'success' | 'error';
    message: string;
}

interface ComparisonInputFormProps {
    onCompare: (docA: DocumentState, docB: DocumentState) => void;
    isLoading: boolean;
    parsingLibsReady: boolean;
    documentA: DocumentState | null;
    setDocumentA: (state: DocumentState | null) => void;
    documentB: DocumentState | null;
    setDocumentB: (state: DocumentState | null) => void;
}

const FileInputArea: React.FC<{
    docState: DocumentState | null;
    setDocState: (state: DocumentState | null) => void;
    title: string;
    parsingLibsReady: boolean;
    disabled: boolean;
}> = ({ docState, setDocState, title, parsingLibsReady, disabled }) => {
    const { t } = useLocalization();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isPreviewVisible, setIsPreviewVisible] = useState(false);

    const handleFileChange = async (file: File | null) => {
        if (!file || disabled) return;

        const MAX_SIZE = 5 * 1024 * 1024;
        const allowedExtensions = ['.txt', '.pdf', '.docx'];
        const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();

        if (file.size > MAX_SIZE) {
            setDocState({ file, text: null, status: 'error', message: t('fileTooLarge') });
            return;
        }
        if (!allowedExtensions.includes(fileExtension)) {
            setDocState({ file, text: null, status: 'error', message: t('unsupportedFileType') });
            return;
        }

        setDocState({ file, text: null, status: 'parsing', message: t('parsingFile', { fileName: file.name }) });

        try {
            let text = '';
            switch (fileExtension) {
                case '.txt':
                    text = await file.text();
                    break;
                case '.pdf':
                    text = await parsePdf(file, (status) => setDocState({ file, text: null, status: 'parsing', message: status }), t);
                    break;
                case '.docx':
                    text = await parseDocx(file);
                    break;
            }
            setDocState({ file, text, status: 'success', message: file.name });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
            setDocState({ file, text: null, status: 'error', message: t('errorParsing', { errorMessage }) });
        }
    };
    
    const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (disabled) return;
        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            handleFileChange(files[0]);
        }
    };

    const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };
    
    const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if(!disabled) setIsDragging(true);
    };
    
    const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleRemoveFile = (e: React.MouseEvent) => {
        e.stopPropagation();
        setDocState(null);
        setIsPreviewVisible(false);
        if(fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };
    
    const handleTogglePreview = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsPreviewVisible(prev => !prev);
    };

    const statusColor = docState?.status === 'error' ? 'text-red-400 border-red-500' : 'text-slate-400 border-slate-600';
    const idleDropzoneClassName = `relative flex flex-col items-center justify-center w-full min-h-32 border-2 ${statusColor} border-dashed rounded-lg cursor-pointer bg-slate-800/50 hover:bg-slate-700/50`;
    
    return (
        <div className="flex-1">
            <h3 className="text-lg font-semibold text-slate-200 mb-2">{title}</h3>
            <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => handleFileChange(e.target.files ? e.target.files[0] : null)}
                accept=".txt,.pdf,.docx"
                className="hidden"
                disabled={disabled}
            />
            <div
                className="relative"
                onDrop={onDrop}
                onDragOver={onDragOver}
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
            >
                {isDragging && (
                    <div className="absolute inset-0 bg-indigo-900/80 border-2 border-dashed border-indigo-500 rounded-lg flex items-center justify-center pointer-events-none z-10">
                        <div className="text-center text-indigo-200 font-semibold">
                            <UploadIcon className="w-10 h-10 mx-auto mb-2" />
                            <p>{t('dropDocument')}</p>
                        </div>
                    </div>
                )}
                <div className={`transition-opacity ${isDragging ? 'opacity-30' : ''}`}>
                    {!docState || docState.status === 'idle' ? (
                        <div 
                            className={idleDropzoneClassName}
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <div className="text-center">
                                <UploadIcon className="w-8 h-8 mx-auto text-slate-500 mb-2" />
                                <p className="text-sm text-slate-400">{t('dropOrClick')}</p>
                                <p className="text-xs text-slate-500">{t('supportedFileTypesFull')}</p>
                            </div>
                        </div>
                    ) : (
                        <div className={`relative w-full min-h-32 p-4 border rounded-lg ${statusColor} bg-slate-800/50 flex flex-col cursor-pointer hover:bg-slate-700/50`} onClick={() => fileInputRef.current?.click()}>
                             <div className="flex items-start w-full">
                                {docState.status === 'parsing' && <Loader className="w-6 h-6 mr-4 flex-shrink-0 mt-1" />}
                                {docState.status === 'success' && <DocumentIcon className="w-6 h-6 mr-4 text-green-500 flex-shrink-0 mt-1" />}
                                {docState.status === 'error' && <CloseIcon className="w-6 h-6 mr-4 text-red-500 flex-shrink-0 mt-1" />}
                                <div className="overflow-hidden flex-grow">
                                     <p className="text-sm text-slate-200 font-medium truncate" title={docState.file?.name}>{docState.file?.name}</p>
                                     <p className={`text-xs mt-1 truncate ${docState.status === 'error' ? 'text-red-400' : 'text-slate-400'}`} title={docState.message}>
                                        {docState.message}
                                     </p>
                                </div>
                                <div className="flex-shrink-0 flex items-center ml-2 z-20">
                                     {docState.status === 'success' && (
                                        <button
                                            type="button"
                                            onClick={handleTogglePreview}
                                            title={isPreviewVisible ? t('hidePreview') : t('showPreview')}
                                            className="p-1 text-slate-400 hover:text-white rounded-full"
                                        >
                                            {isPreviewVisible ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                                        </button>
                                     )}
                                     <button
                                         type="button"
                                         onClick={handleRemoveFile}
                                         className="p-1 text-slate-400 hover:text-white rounded-full"
                                     >
                                        <CloseIcon className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                            {isPreviewVisible && docState.status === 'success' && (
                                <div className="mt-3 w-full bg-slate-900/70 p-2 rounded-md border border-slate-700 z-20" onClick={(e) => e.stopPropagation()}>
                                     <pre className="text-xs text-slate-300 font-mono whitespace-pre-wrap break-words max-h-40 overflow-y-auto">
                                        {docState.text}
                                     </pre>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};


export const ComparisonInputForm: React.FC<ComparisonInputFormProps> = ({ onCompare, isLoading, parsingLibsReady, documentA, setDocumentA, documentB, setDocumentB }) => {
    const { t } = useLocalization();
    const canCompare = documentA?.status === 'success' && documentB?.status === 'success' && !isLoading;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (canCompare) {
            onCompare(documentA, documentB);
        }
    };
    
    return (
        <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto flex flex-col space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
                <FileInputArea 
                   title={t('document1')}
                   docState={documentA}
                   setDocState={setDocumentA}
                   parsingLibsReady={parsingLibsReady}
                   disabled={isLoading}
                />
                <FileInputArea 
                   title={t('document2')}
                   docState={documentB}
                   setDocState={setDocumentB}
                   parsingLibsReady={parsingLibsReady}
                   disabled={isLoading}
                />
            </div>
            <button
                type="submit"
                disabled={!canCompare}
                className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-slate-500 disabled:cursor-not-allowed transition-colors"
            >
                {isLoading ? <Loader /> : t('compareDocuments')}
            </button>
        </form>
    );
};