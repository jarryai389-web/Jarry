
import React from 'react';
import { Message } from '../types';

const MessageBubble: React.FC<{ message: Message }> = ({ message }) => {
    const isUser = message.sender === 'user';
    
    const iconProps = {
        strokeWidth: 1.5,
        className: "w-4 h-4 text-[#D4A574] hover:text-[#FFCC66] transition-all",
    };

    return (
        <div className={`flex items-start gap-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
            {!isUser && (
                <div className="w-10 h-10 rounded-full border-2 border-[#4FC3F7] p-1 shadow-[0_0_10px_#4FC3F7]/50 flex-shrink-0">
                    <svg className="w-full h-full text-[#D4A574]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 1.5a.5.5 0 01.5.5v2a.5.5 0 01-1 0v-2a.5.5 0 01.5-.5zM3.81 4.19a.5.5 0 01.707-.707l1.414 1.414a.5.5 0 11-.707.707L3.81 4.19zM2 12.5a.5.5 0 01.5-.5h2a.5.5 0 010 1h-2a.5.5 0 01-.5-.5zM20 12.5a.5.5 0 01.5-.5h2a.5.5 0 010 1h-2a.5.5 0 01-.5-.5zM18.07 4.19a.5.5 0 01.707.707l-1.414 1.414a.5.5 0 11-.707-.707l1.414-1.414zM12 20.5a.5.5 0 01.5.5v2a.5.5 0 01-1 0v-2a.5.5 0 01.5-.5zM3.81 18.07a.5.5 0 01.707-.707l1.414 1.414a.5.5 0 11-.707.707l-1.414-1.414zM18.07 18.07a.5.5 0 01.707.707l-1.414-1.414a.5.5 0 11-.707-.707l1.414 1.414zM12 6.5a6 6 0 100 12 6 6 0 000-12z"/></svg>
                </div>
            )}
            <div className={`max-w-xl md:max-w-2xl ${isUser ? 'order-1' : ''}`}>
                <div className={`px-5 py-3 rounded-2xl shadow-lg ${isUser 
                    ? 'bg-[#BB86FC]/20 backdrop-blur-md border border-[#BB86FC]/50 rounded-br-none' 
                    : 'bg-[#6A4C32]/20 backdrop-blur-md border border-[#6A4C32]/50 rounded-bl-none'
                }`}>
                    <p className="text-white whitespace-pre-wrap">{message.text}</p>
                </div>
                {message.sources && message.sources.length > 0 && (
                    <div className="mt-2 text-xs text-[#6A4C32]">
                        <h4 className="font-bold text-[#D4A574]">Sources:</h4>
                        <ul className="list-disc list-inside">
                            {message.sources.map(source => (
                                <li key={source.uri}>
                                    <a href={source.uri} target="_blank" rel="noopener noreferrer" className="text-[#4FC3F7] hover:underline">
                                        {source.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                <div className="mt-2 flex items-center space-x-3 text-xs text-[#6A4C32]">
                     <div className="flex space-x-2">
                        <button title="Copy"><svg {...iconProps} viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg></button>
                        <button title="Read Aloud"><svg {...iconProps} viewBox="0 0 24 24" fill="none" stroke="currentColor"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg></button>
                        {!isUser && <button title="Regenerate"><svg {...iconProps} viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="1 4 1 10 7 10"></polyline><polyline points="23 20 23 14 17 14"></polyline><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path></svg></button>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MessageBubble;
