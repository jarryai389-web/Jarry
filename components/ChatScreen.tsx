
import React, { useState, useRef, useEffect } from 'react';
import { useChat } from '../hooks/useChat';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';

const ChatScreen: React.FC = () => {
    const { messages, isLoading, handleSendMessage } = useChat();
    const [inputText, setInputText] = useState('');
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSendMessage(inputText);
        setInputText('');
    };
    
    const iconProps = {
        strokeWidth: 2,
        className: "w-6 h-6 text-[#D4A574] hover:text-[#FFCC66] transition-all",
    };

    return (
        <div className="flex flex-col h-full bg-[#1C1C1C] relative">
            <div className="absolute top-0 left-0 w-full h-full bg-grid-[#6A4C32]/10 [mask-image:linear-gradient(to_bottom,white_50%,transparent_100%)]"></div>
            <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 relative">
                {messages.map((msg, index) => (
                    <MessageBubble key={msg.id} message={msg} />
                ))}
                {isLoading && <TypingIndicator />}
                <div ref={chatEndRef} />
            </div>

            <div className="p-4 md:p-8 sticky bottom-0 z-10">
                <form onSubmit={handleSubmit} className="relative">
                    <textarea
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSubmit(e);
                            }
                        }}
                        placeholder="Ask JARRY anything..."
                        rows={1}
                        className="w-full pl-14 pr-28 py-4 bg-[#2A2A2A]/70 backdrop-blur-md border border-[#6A4C32] rounded-2xl text-[#FEE9B2] placeholder-[#6A4C32] resize-none focus:outline-none focus:ring-2 focus:ring-[#FFCC66] transition-all duration-300"
                    />
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 flex space-x-2">
                        <button type="button" title="Upload File (UI Only)">
                           <svg {...iconProps} viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>
                        </button>
                        <button type="button" title="Use Microphone (UI Only)">
                           <svg {...iconProps} viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line></svg>
                        </button>
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading || !inputText.trim()}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[#FFCC66] disabled:bg-[#6A4C32] text-[#1C1C1C] hover:bg-[#FFB74D] transition-all transform hover:scale-110 disabled:scale-100"
                    >
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatScreen;
