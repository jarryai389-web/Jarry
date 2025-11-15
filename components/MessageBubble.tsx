
import React from 'react';
import { Message } from '../types';

const MessageBubble: React.FC<{ message: Message }> = ({ message }) => {
    const isUser = message.sender === 'user';
    
    const iconProps = {
        strokeWidth: 1.5,
        className: "w-4 h-4 text-[#D4A574] hover:text-[#FFCC66] transition-all",
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(message.text);
    };

    return (
        <div className={`flex items-start gap-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
            {!isUser && (
                <div className="w-10 h-10 rounded-full border-2 border-[#4FC3F7] p-1 flex-shrink-0 shadow-[0_0_10px_#4FC3F7]/50">
                    <svg className="w-full h-full text-[#D4A574]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 1.5a.5.5 0 01.5.5v2a.5.5 0 01-1 0v-2a.5.5 0 01.5-.5zM3.81 4.19a.5.5 0 01.707-.707l1.414 1.414a.5.5 0 11-.707.707L3.81 4.19zM2 12.5a.5.5 0 01.5-.5h2a.5.5 0 010 1h-2a.5.5 0 01-.5-.5zM20 12.5a.5.5 0 01.5-.5h2a.5.5 0 010 1h-2a.5.5 0 01-.5-.5zM18.07 4.19a.5.5 0 01.707.707l-1.414 1.414a.5.5 0 11-.707-.707l1.414-1.414zM12 20.5a.5.5 0 01.5.5v2a.5.5 0 01-1 0v-2a.5.5 0 01.5-.5zM3.81 18.07a.5.5 0 01.707-.707l1.414 1.414a.5.5 0 11-.707.707l-1.414-1.414zM18.07 18.07a.5.5 0 01.707.707l-1.414-1.414a.5.5 0 11-.707-.707l1.414 1.414zM12 6.5a6 6 0 100 12 6 6 0 000-12z"/></svg>
                </div>
            )}
            <div className={`group relative max-w-xl ${isUser ? 'order-1' : 'order-2'}`}>
                <div
                    className={`px-5 py-3 rounded-2xl ${
                        isUser
                            ? 'bg-[#4DEEEA]/10 border border-[#4DEEEA]/30 rounded-br-none text-[#FEE9B2]'
                            : 'bg-[#6A4C32]/20 border border-[#6A4C32]/50 rounded-bl-none backdrop-blur-md text-[#FEE9B2]'
                    }`}
                >
                    <p className="whitespace-pre-wrap">{message.text}</p>

                    {!isUser && message.sources && message.sources.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-[#D4A574]/20">
                            <h4 className="text-xs font-semibold text-[#FFCC66] mb-2">Sources:</h4>
                            <div className="flex flex-wrap gap-2">
                                {message.sources.map((source, index) => (
                                    <a 
                                        key={index}
                                        href={source.uri}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs bg-[#0F1113]/50 px-2 py-1 rounded-md text-[#4FC3F7] hover:underline"
                                    >
                                        {source.title}
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                 {!isUser && (
                     <div className="absolute -bottom-2 -right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                         <button onClick={handleCopy} title="Copy" className="p-1.5 bg-[#0B0C0D] border border-[#6A4C32] rounded-full">
                            <svg {...iconProps} viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                         </button>
                         <button title="Regenerate (UI Only)" className="p-1.5 bg-[#0B0C0D] border border-[#6A4C32] rounded-full">
                            <svg {...iconProps} viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="1 4 1 10 7 10"></polyline><polyline points="23 20 23 14 17 14"></polyline><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path></svg>
                         </button>
                         <button title="Edit (UI Only)" className="p-1.5 bg-[#0B0C0D] border border-[#6A4C32] rounded-full">
                            <svg {...iconProps} viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                         </button>
                     </div>
                 )}
            </div>
        </div>
    );
};

export default MessageBubble;
