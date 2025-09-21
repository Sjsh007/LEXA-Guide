import React from 'react';

export const RoboIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0112 2zM18.75 6a.75.75 0 000-1.5h-1.5a.75.75 0 000 1.5h1.5zM5.25 6a.75.75 0 000-1.5h-1.5a.75.75 0 000 1.5h1.5z" />
        <path fillRule="evenodd" d="M12 4.5a8.25 8.25 0 00-8.25 8.25c0 2.213.89 4.233 2.34 5.756a.75.75 0 001.06-.03l.15-.17a.75.75 0 00-.03-1.06A5.25 5.25 0 016.75 12.75a.75.75 0 00-1.5 0 6.75 6.75 0 001.9 4.717.75.75 0 00.985.276l.043-.017a8.25 8.25 0 0010.744 0l.043.017a.75.75 0 00.986-.276 6.75 6.75 0 001.9-4.717.75.75 0 00-1.5 0 5.25 5.25 0 01-2.06 4.043.75.75 0 00-.03 1.06l.15.17a.75.75 0 001.06.03A8.25 8.25 0 0012 4.5zM9 12.75a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM15 11.25a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" clipRule="evenodd" />
    </svg>
);

export const UserIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
    </svg>
);

export const UserCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
    </svg>
);
  
export const RestartIcon: React.FC<{ className?: string }> = ({ className }) => (
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-4.518a.75.75 0 00-.75.75v4.518l1.903-1.903a5.997 5.997 0 00-9.664 2.531.75.75 0 01-1.422-.434zm15.633 2.531a.75.75 0 01-.434 1.422A5.997 5.997 0 008.336 9.664l-1.903-1.903v4.518a.75.75 0 00.75.75h4.518l-1.903-1.903a7.5 7.5 0 0111.286-4.432z" clipRule="evenodd" />
</svg>
);

export const SendIcon: React.FC<{ className?: string }> = ({ className }) => (
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
</svg>
);

export const MicrophoneIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M8.25 4.5a3.75 3.75 0 117.5 0v8.25a3.75 3.75 0 11-7.5 0V4.5z" />
        <path d="M6 10.5a.75.75 0 01.75.75v1.5a5.25 5.25 0 1010.5 0v-1.5a.75.75 0 011.5 0v1.5a6.75 6.75 0 11-13.5 0v-1.5A.75.75 0 016 10.5z" />
    </svg>
);

export const ThumbsUpIcon: React.FC<{ className?: string, isFilled?: boolean }> = ({ className, isFilled }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={isFilled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={1.5} className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.422 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H6.5" />
    </svg>
);

export const ThumbsDownIcon: React.FC<{ className?: string, isFilled?: boolean }> = ({ className, isFilled }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={isFilled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={1.5} className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.367 13.5c-.806 0-1.533.422-2.031 1.08a9.041 9.041 0 01-2.861 2.4c-.723.384-1.35.956-1.653 1.715a4.498 4.498 0 00-.322 1.672V21a.75.75 0 01-.75.75A2.25 2.25 0 017.5 19.5c0-1.152.26-2.243.723-3.218.266-.558-.107-1.282-.725-1.282H3.375c-1.026 0-1.945-.694-2.054-1.715A12.134 12.134 0 011.25 12c0-2.25.632-4.363 1.733-6.21a11.95 11.95 0 012.649-7.521c.388-.482.987-.729 1.605-.729H10.52c.483 0 .964.078 1.423.23l3.114 1.04a4.501 4.501 0 001.423.23h2.633" />
    </svg>
);

export const TranslateIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12.23 13.52a.75.75 0 01.936.438l.823 2.181a.75.75 0 01-1.42.538l-.348-.923a2.392 2.392 0 00-4.444 0l-.348.923a.75.75 0 01-1.42-.538l.823-2.181a.75.75 0 01.936-.438c.67.147 1.334.22 2.01.22s1.34-.073 2.01-.22zM8.91 16.512a1 1 0 00-1.82 0h1.82zM12 14.25c-.29 0-.573-.02-.85-.058a1 1 0 01.12-1.993c.243.033.493.051.75.051s.507-.018.75-.051a1 1 0 01.12 1.993c-.277.038-.56.058-.85.058z" />
        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM11.663 3.988a.75.75 0 01.674 0 10.375 10.375 0 005.151 1.094.75.75 0 01.423.966c-.332 1.018-.74 2.01-1.205 2.952a.75.75 0 01-1.229-.627 12.016 12.016 0 00-.737-2.31L14.2 8.25h-1.532a.75.75 0 01-.692-1.042 12.05 12.05 0 00-1.28-2.22zM5.53 5.082a10.375 10.375 0 005.151-1.094.75.75 0 01.674 0 10.375 10.375 0 015.152 1.094.75.75 0 01.423.966 12.1 12.1 0 01-1.205 2.952.75.75 0 01-1.229-.627 12.016 12.016 0 00-.737-2.31L13.25 6h-2.5l-.54 1.513a12.016 12.016 0 00-.737 2.31.75.75 0 01-1.229.627A12.1 12.1 0 014.106 6.048a.75.75 0 01.423-.966zM3.868 9.31a.75.75 0 01.966-.423 10.375 10.375 0 003.88 2.319.75.75 0 010 1.328 10.375 10.375 0 00-3.88 2.319.75.75 0 01-.966-.423 12.053 12.053 0 010-5.12zM19.165 9.31a.75.75 0 01.966.423 12.053 12.053 0 010 5.12.75.75 0 01-.966.423A10.375 10.375 0 0015.285 13a.75.75 0 010-1.328 10.375 10.375 0 003.88-2.362z" clipRule="evenodd" />
    </svg>
);

export const Loader: React.FC<{ className?: string }> = ({ className = "h-5 w-5 text-white" }) => (
    <svg className={`animate-spin ${className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

export const SearchIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
    </svg>
);

export const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
    </svg>
);

export const ChevronUpIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M11.47 7.72a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5-7.5z" clipRule="evenodd" />
    </svg>
);

export const ChevronDownIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z" clipRule="evenodd" />
    </svg>
);

export const FeedbackIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.026 3.348 3.97v6.02c0 1.944-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.75.75 0 00-.626.63c-.158.524-.343 1.033-.546 1.533a.75.75 0 01-1.32.083A49.48 49.48 0 0112 15.75c-.653 0-1.303.02-1.95.06a.75.75 0 01-.626-.63c-.158-.524-.343-1.033-.546-1.533a.75.75 0 00-1.32-.083 49.48 49.48 0 00-3.032 4.075.75.75 0 01-1.28-.53v-2.38a.75.75 0 00-.598-.74 48.901 48.901 0 01-3.476-.384c-1.978-.29-3.348-2.026-3.348-3.97V6.74c0-1.944 1.37-3.68 3.348-3.97zM6.75 8.25a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H7.5z" clipRule="evenodd" />
    </svg>
);

export const BriefcaseIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M9.75 4.125a2.25 2.25 0 014.5 0v2.25h-4.5V4.125z" />
      <path fillRule="evenodd" d="M8.25 3A3.75 3.75 0 0112 1.5h.75a3.75 3.75 0 013.75 3.75v.375h.75A2.25 2.25 0 0119.5 7.5v12A2.25 2.25 0 0117.25 21.75H6.75A2.25 2.25 0 014.5 19.5v-12A2.25 2.25 0 016.75 5.625h.75v-.375A3.75 3.75 0 0111.25 1.5H12zM6 7.5a.75.75 0 01.75-.75h10.5a.75.75 0 01.75.75v12a.75.75 0 01-.75-.75H6.75a.75.75 0 01-.75-.75v-12z" clipRule="evenodd" />
    </svg>
);

export const DocumentIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625zM7.5 15a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 017.5 15zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H8.25z" clipRule="evenodd" />
        <path d="M12.971 1.816A5.23 5.23 0 0114.25 1.5a.75.75 0 01.75.75v3.75c0 .414.336.75.75.75h3.75a.75.75 0 01.75.75c0 .488-.12.955-.345 1.382A5.25 5.25 0 0015.75 9h-1.875a3.375 3.375 0 01-3.375-3.375V3.75c0-.488.12-.955.345-1.382l.251-.552z" />
    </svg>
);

export const ExportIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2.25a.75.75 0 01.75.75v11.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V3a.75.75 0 01.75-.75z" />
      <path d="M3.75 12a.75.75 0 01.75.75v6c0 .414.336.75.75.75h13.5a.75.75 0 00.75-.75v-6a.75.75 0 011.5 0v6A2.25 2.25 0 0118.75 21H5.25A2.25 2.25 0 013 18.75v-6a.75.75 0 01.75-.75z" />
    </svg>
);

export const ChartBarIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M3 3v18h18V3H3zm8 16H5v-6h6v6zm0-8H5V5h6v6zm8 8h-6v-4h6v4zm0-6h-6V5h6v6z"/>
    </svg>
);

export const CubeTransparentIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071 1.071L12 3.429 1.396 9.854a.75.75 0 00-.163 1.09l.163.181 10.4 10.428a.75.75 0 001.07 0l10.4-10.428a.75.75 0 000-1.272L12.963 2.286zM12 5.571L3.687 11.07l8.162 8.188L20.313 11.07 12 5.571z" clipRule="evenodd" />
        <path d="M11.3 2.286a.75.75 0 011.272 0l10.604 6.429a.75.75 0 01-.163 1.09l-1.34 1.518-9.425-9.462-1.34-1.518z" />
        <path d="M12.963 21.714a.75.75 0 01-1.272 0L1.087 15.286a.75.75 0 01.163-1.09l1.34-1.518 9.425 9.462 1.34 1.518z" />
    </svg>
);

export const HelpIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm1.125 14.25a1.125 1.125 0 10-2.25 0 1.125 1.125 0 002.25 0zm.425-5.912a.75.75 0 00-1.042-.998 3.75 3.75 0 01-4.116-3.033.75.75 0 00-1.48-.213 5.25 5.25 0 007.41 4.59.75.75 0 00-.232-1.336z" clipRule="evenodd" />
    </svg>
);

export const BellIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M12 2.25c-2.42 0-4.64.956-6.306 2.512a.75.75 0 01-.96-1.152A11.22 11.22 0 0112 0c5.132 0 9.53 3.42 10.983 8.016a.75.75 0 01-1.467.368A9.723 9.723 0 0012 2.25zM12 21.75a2.25 2.25 0 01-2.25-2.25v-.323c0-1.928.9-3.705 2.375-4.922a.75.75 0 011.164.945 3.738 3.738 0 00-1.289 3.033v.323a.75.75 0 00.75.75h3a.75.75 0 00.75-.75v-.323a3.738 3.738 0 00-1.289-3.033.75.75 0 011.164-.945c1.475 1.217 2.375 2.994 2.375 4.922v.323a2.25 2.25 0 01-2.25 2.25H12z" clipRule="evenodd" />
        <path d="M14.25 8.25a.75.75 0 00-1.5 0v.168c0 .351.07.69.202.998a.75.75 0 001.096.342 4.469 4.469 0 01-1.226-2.502.75.75 0 00-.522-.522 4.469 4.469 0 01-2.502-1.226.75.75 0 00-.342-1.096c-.308-.132-.647-.202-.998-.202h-.168a.75.75 0 000 1.5h.168c.159 0 .313.03.459.088a.75.75 0 00.512.921 2.97 2.97 0 001.688 1.688.75.75 0 00.921.512c.058.146.088.3.088.459v.168a.75.75 0 001.5 0v-.168a2.953 2.953 0 00-.088-.459.75.75 0 00-.512-.921 2.97 2.97 0 00-1.688-1.688.75.75 0 00-.921-.512c-.146-.058-.3-.088-.459-.088h-.168a.75.75 0 00-1.5 0h.168c.351 0 .69.07.998.202a.75.75 0 00.342 1.096 4.469 4.469 0 011.226 2.502c.03.159.044.32.044.484v.168a.75.75 0 001.5 0v-.168c0-.164.015-.325.044-.484a4.469 4.469 0 011.226-2.502.75.75 0 00.342-1.096c.132-.308.202-.647.202-.998V8.25z" />
    </svg>
);

export const ExplainIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M5.337 21.728a.75.75 0 01-1.075-1.05l6.368-6.502a.75.75 0 01.999-.085l.024.018a3.75 3.75 0 004.998-4.997l-.018-.024a.75.75 0 01.085-1l6.502-6.368a.75.75 0 011.05 1.075L17.228 9.89l-.086.042a5.25 5.25 0 01-6.997 6.997l-.042.086L2.272 17.84a.75.75 0 00-.533.16l-.001.001L1.25 18.5a.75.75 0 000 1.06l2.122 2.121a.75.75 0 001.06 0l.518-.517.001-.001a.75.75 0 00.16-.534l.825-4.852z" clipRule="evenodd" />
        <path d="M10.5 12a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
    </svg>
);

export const InfoIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
    </svg>
);

export const ListChecksIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
      <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM8.25 9.75a.75.75 0 01.75-.75h6a.75.75 0 010 1.5h-6a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5h6a.75.75 0 000-1.5h-6z" clipRule="evenodd" />
    </svg>
);

export const AlertTriangleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
    </svg>
);

export const ShieldExclamationIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3V12.75a3 3 0 00-3-3v-3A5.25 5.25 0 0012 1.5zm-3.75 6.75v3a1.5 1.5 0 001.5 1.5h4.5a1.5 1.5 0 001.5-1.5v-3a3.75 3.75 0 10-7.5 0zM12 13.5a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75zm0 4.5a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
    </svg>
);

export const EyeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
      <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113C21.185 17.024 16.97 20.25 12 20.25c-4.97 0-9.185-3.223-10.675-7.69a.75.75 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clipRule="evenodd" />
    </svg>
);

export const EyeSlashIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM22.676 12.553a11.249 11.249 0 01-2.631 4.31l-3.099-3.099a5.25 5.25 0 00-6.71-6.71L7.759 4.577a11.217 11.217 0 014.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113z" />
      <path d="M15.75 12c0 .18-.013.357-.037.53l-5.432-5.432a5.25 5.25 0 015.469 4.902z" />
      <path d="M9.75 12a2.25 2.25 0 002.25 2.25c.18 0 .357-.013.53-.037l-2.742-2.742A2.25 2.25 0 009.75 12z" />
      <path d="M1.323 11.447C2.811 6.976 7.028 3.75 12 3.75a11.217 11.217 0 014.242.827l-2.292 2.292a5.25 5.25 0 00-6.71 6.71L4.631 16.86a11.249 11.249 0 01-2.631-4.31.75.75 0 010-1.113z" />
    </svg>
);

// FIX: Add missing UploadIcon component
export const UploadIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M11.47 2.47a.75.75 0 011.06 0l4.5 4.5a.75.75 0 01-1.06 1.06l-3.22-3.22V16.5a.75.75 0 01-1.5 0V4.81L8.03 8.03a.75.75 0 01-1.06-1.06l4.5-4.5zM3 15.75a.75.75 0 01.75.75v2.25a1.5 1.5 0 001.5 1.5h10.5a1.5 1.5 0 001.5-1.5V16.5a.75.75 0 011.5 0v2.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V16.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
    </svg>
);

// --- New Icons for Feature Bar ---

export const DocumentTextIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M4.5 2.25a.75.75 0 000 1.5v16.5a.75.75 0 001.5 0V3.75a.75.75 0 00-1.5 0zM7.5 2.25a.75.75 0 000 1.5v16.5a.75.75 0 001.5 0V3.75a.75.75 0 00-1.5 0zM11.25 3a.75.75 0 01.75-.75h8.25a.75.75 0 010 1.5H12a.75.75 0 01-.75-.75zM11.25 6a.75.75 0 01.75-.75h8.25a.75.75 0 010 1.5H12a.75.75 0 01-.75-.75zM11.25 9a.75.75 0 01.75-.75h8.25a.75.75 0 010 1.5H12a.75.75 0 01-.75-.75zM11.25 12a.75.75 0 01.75-.75h8.25a.75.75 0 010 1.5H12a.75.75 0 01-.75-.75zM11.25 15a.75.75 0 01.75-.75h8.25a.75.75 0 010 1.5H12a.75.75 0 01-.75-.75zM11.25 18a.75.75 0 01.75-.75h8.25a.75.75 0 010 1.5H12a.75.75 0 01-.75-.75z" clipRule="evenodd" />
    </svg>
);

export const ShieldCheckIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3V12.75a3 3 0 00-3-3v-3A5.25 5.25 0 0012 1.5zm-1.04 13.353a.75.75 0 001.08.023l3-2.5a.75.75 0 10-1.06-1.06l-2.47 2.057-1.47-1.47a.75.75 0 00-1.06 1.06l2 2z" clipRule="evenodd" />
    </svg>
);

export const ChatBubbleLeftRightIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M16.14 3.36a10.22 10.22 0 014.288 8.167 10.22 10.22 0 01-4.288 8.167.75.75 0 01-.784-1.285 8.72 8.72 0 003.572-6.882 8.72 8.72 0 00-3.572-6.882.75.75 0 01.784-1.285zM8.644 3.36a.75.75 0 01.784 1.285 8.72 8.72 0 00-3.572 6.882 8.72 8.72 0 003.572 6.882.75.75 0 01-.784 1.285A10.22 10.22 0 013.57 11.527a10.22 10.22 0 015.074-8.167z" clipRule="evenodd" />
        <path d="M12 2.25a3 3 0 00-3 3v.375a.75.75 0 01-1.5 0V5.625a4.5 4.5 0 019 0v.375a.75.75 0 01-1.5 0V5.625a3 3 0 00-3-3zM12.75 21a.75.75 0 00-1.5 0v.106a4.505 4.505 0 002.126 3.896.75.75 0 001.298-.925A3.004 3.004 0 0112.75 21.106V21z" />
    </svg>
);