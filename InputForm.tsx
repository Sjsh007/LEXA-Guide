import React, { useRef, useState, useEffect } from 'react';
import { useLocalization } from './i18n';
import { MicrophoneIcon, Loader, UploadIcon, DocumentIcon, CloseIcon } from './Icons';
import { parsePdf, parseDocx } from './services/fileParser';


// --- Web Speech API Type Definitions ---
interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    start(): void;
    stop(): void;
    abort(): void;
    onresult: (event: SpeechRecognitionEvent) => void;
    onerror: (event: SpeechRecognitionErrorEvent) => void;
    onend: () => void;
}

interface SpeechRecognitionEvent extends Event {
    readonly resultIndex: number;
    readonly results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
    readonly length: number;
    item(index: number): SpeechRecognitionResult;
    [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
    readonly isFinal: boolean;
    readonly length: number;
    item(index: number): SpeechRecognitionAlternative;
    [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
    readonly transcript: string;
    readonly confidence: number;
}

interface SpeechRecognitionErrorEvent extends Event {
    readonly error: string;
    readonly message: string;
}

interface InputFormProps {
    onClarify: (legalText: string) => void;
    isLoading: boolean;
    parsingLibsReady: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ onClarify, isLoading, parsingLibsReady }) => {
    const { t } = useLocalization();
    const [text, setText] = useState('');
    const recognitionRef = useRef<SpeechRecognition | null>(null);
    const initialTextOnListen = useRef<string>('');
    const [isListening, setIsListening] = useState(false);
    const [isSpeechSupported, setIsSpeechSupported] = useState(false);

    // File Upload State
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [fileStatus, setFileStatus] = useState<'idle' | 'parsing' | 'success' | 'error'>('idle');
    const [fileMessage, setFileMessage] = useState('');


    useEffect(() => {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (SpeechRecognition) {
            setIsSpeechSupported(true);
            const recognition: SpeechRecognition = new SpeechRecognition();
            recognitionRef.current = recognition;

            recognition.continuous = true;
            recognition.interimResults = true;

            recognition.onresult = (event: SpeechRecognitionEvent) => {
                let transcript = '';
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    transcript += event.results[i][0].transcript;
                }
                const baseText = initialTextOnListen.current;
                const separator = baseText.length > 0 && !/\s$/.test(baseText) ? ' ' : '';
                setText(baseText + separator + transcript);
            };

            recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
                if (event.error !== 'aborted') {
                    console.error("Speech recognition error", event.error, event.message);
                }
                setIsListening(false);
            };

            recognition.onend = () => {
                setIsListening(false);
            };

            return () => {
                recognitionRef.current?.abort();
            };
        }
    }, []);

    const handleFileChange = async (selectedFile: File | null) => {
        if (!selectedFile || isLoading) return;

        const MAX_SIZE = 5 * 1024 * 1024;
        const allowedExtensions = ['.txt', '.pdf', '.docx'];
        const fileExtension = '.' + selectedFile.name.split('.').pop()?.toLowerCase();
        
        setFile(selectedFile);

        if (selectedFile.size > MAX_SIZE) {
            setFileStatus('error');
            setFileMessage(t('fileTooLarge'));
            return;
        }
        if (!allowedExtensions.includes(fileExtension)) {
            setFileStatus('error');
            setFileMessage(t('unsupportedFileType'));
            return;
        }

        setFileStatus('parsing');
        setFileMessage(t('parsingFile', { fileName: selectedFile.name }));
        setText('');

        try {
            let parsedText = '';
            switch (fileExtension) {
                case '.txt':
                    parsedText = await selectedFile.text();
                    break;
                case '.pdf':
                    parsedText = await parsePdf(selectedFile, (status) => setFileMessage(status), t);
                    break;
                case '.docx':
                    parsedText = await parseDocx(selectedFile);
                    break;
            }
            setText(parsedText);
            setFileStatus('success');
            setFileMessage(selectedFile.name);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
            setFileStatus('error');
            setFileMessage(t('errorParsing', { errorMessage }));
        }
    };
    
    const handleRemoveFile = () => {
        setFile(null);
        setFileStatus('idle');
        setFileMessage('');
        setText('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };
    
    const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (isLoading) return;
        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            handleFileChange(files[0]);
        }
    };

    const onDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault();
    const onDragEnter = () => !isLoading && setIsDragging(true);
    const onDragLeave = () => setIsDragging(false);


    const handleToggleListening = () => {
        if (!recognitionRef.current || isLoading) return;
        if (isListening) {
            recognitionRef.current.stop();
        } else {
            handleRemoveFile(); // Clear file if user starts dictating
            initialTextOnListen.current = text;
            recognitionRef.current.start();
            setIsListening(true);
        }
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!text.trim() || isLoading) return;
        onClarify(text);
    };
    
    let placeholderText = t('inputPlaceholder');
    if (isListening) placeholderText = t('listening');

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto flex flex-col space-y-4">
            <div className="flex-grow flex flex-col">
                <div className="flex items-center justify-between mb-2">
                    <label htmlFor="legal-text-editor" className="block text-sm font-medium text-slate-300">
                        {t('inputFormLabel')}
                    </label>
                    <div className="flex items-center space-x-1">
                        {isSpeechSupported && (
                            <button type="button" onClick={handleToggleListening} disabled={isLoading} title={isListening ? t('stopDictation') : t('dictateDocument')} className={`p-1.5 rounded-full transition-colors text-slate-400 hover:text-indigo-400 disabled:opacity-30 ${isListening ? 'bg-red-900/50 text-red-400' : ''}`}>
                                <MicrophoneIcon className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                </div>

                {fileStatus !== 'idle' && (
                    <div className="flex items-center p-2 mb-2 rounded-md bg-slate-700/50 border border-slate-600">
                        {fileStatus === 'parsing' && <Loader className="w-5 h-5 mr-3 text-slate-400 flex-shrink-0" />}
                        {fileStatus === 'success' && <DocumentIcon className="w-5 h-5 mr-3 text-green-500 flex-shrink-0" />}
                        {fileStatus === 'error' && <CloseIcon className="w-5 h-5 mr-3 text-red-500 flex-shrink-0" />}
                        <p className={`text-sm truncate ${fileStatus === 'error' ? 'text-red-400' : 'text-slate-300'}`} title={fileMessage}>
                            {fileMessage}
                        </p>
                        <button type="button" onClick={handleRemoveFile} className="ml-auto p-1 text-slate-400 hover:text-white rounded-full flex-shrink-0">
                           <CloseIcon className="w-4 h-4" />
                        </button>
                    </div>
                )}

                <div 
                    onDrop={onDrop} 
                    onDragOver={onDragOver} 
                    onDragEnter={onDragEnter} 
                    onDragLeave={onDragLeave}
                    className="relative flex-grow"
                >
                    {isDragging && (
                        <div className="absolute inset-0 bg-indigo-900/80 border-2 border-dashed border-indigo-500 rounded-lg flex items-center justify-center pointer-events-none z-10">
                            <div className="text-center text-indigo-200 font-semibold">
                                <UploadIcon className="w-10 h-10 mx-auto mb-2" />
                                <p>{t('dropOrClick')}</p>
                            </div>
                        </div>
                    )}
                    <textarea
                        id="legal-text-editor"
                        value={text}
                        onChange={(e) => {
                            setText(e.target.value);
                            handleRemoveFile(); // Clear file if user types
                        }}
                        placeholder={placeholderText}
                        disabled={isListening}
                        className={`w-full h-full p-3 border border-slate-600 rounded-md bg-slate-800 text-slate-200 overflow-auto focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 resize-none placeholder:text-slate-400 placeholder:italic disabled:bg-slate-800 ${isListening ? 'placeholder:text-indigo-400 placeholder:animate-pulse' : ''}`}
                        style={{minHeight: '250px'}}
                        aria-multiline="true"
                    />
                     <div className="absolute bottom-2 right-2">
                        <button 
                            type="button" 
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isLoading || !parsingLibsReady}
                            title={parsingLibsReady ? t('dropOrClick') : "Initializing parsers..."}
                            className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-300 bg-slate-700/80 border border-slate-600 rounded-full hover:bg-slate-700 disabled:opacity-50 disabled:cursor-wait"
                         >
                            <UploadIcon className="w-4 h-4" />
                            <span>{t('supportedFileTypes')}</span>
                         </button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={(e) => handleFileChange(e.target.files ? e.target.files[0] : null)}
                            accept=".txt,.pdf,.docx"
                            className="hidden"
                            disabled={isLoading || !parsingLibsReady}
                        />
                    </div>
                </div>
            </div>
            <button type="submit" disabled={isLoading || !parsingLibsReady || !text.trim()} className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-slate-500 disabled:cursor-not-allowed transition-colors">
                {isLoading ? <Loader /> : (parsingLibsReady ? t('clarifyDocument') : 'Initializing...')}
            </button>
        </form>
    );
};

export default InputForm;