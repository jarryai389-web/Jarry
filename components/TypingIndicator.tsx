
import React from 'react';

const TypingIndicator: React.FC = () => {
    return (
        <div className="flex items-center space-x-2">
             <div className="w-10 h-10 rounded-full border-2 border-[#4FC3F7] p-1 flex-shrink-0">
                <svg className="w-full h-full text-[#D4A574]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 1.5a.5.5 0 01.5.5v2a.5.5 0 01-1 0v-2a.5.5 0 01.5-.5zM3.81 4.19a.5.5 0 01.707-.707l1.414 1.414a.5.5 0 11-.707.707L3.81 4.19zM2 12.5a.5.5 0 01.5-.5h2a.5.5 0 010 1h-2a.5.5 0 01-.5-.5zM20 12.5a.5.5 0 01.5-.5h2a.5.5 0 010 1h-2a.5.5 0 01-.5-.5zM18.07 4.19a.5.5 0 01.707.707l-1.414 1.414a.5.5 0 11-.707-.707l1.414-1.414zM12 20.5a.5.5 0 01.5.5v2a.5.5 0 01-1 0v-2a.5.5 0 01.5-.5zM3.81 18.07a.5.5 0 01.707-.707l1.414 1.414a.5.5 0 11-.707.707l-1.414-1.414zM18.07 18.07a.5.5 0 01.707.707l-1.414-1.414a.5.5 0 11-.707-.707l1.414 1.414zM12 6.5a6 6 0 100 12 6 6 0 000-12z"/></svg>
            </div>
            <div className="px-5 py-3 rounded-2xl bg-[#6A4C32]/20 border border-[#6A4C32]/50 rounded-bl-none">
                <div className="flex items-center space-x-1.5">
                    <span className="h-2.5 w-2.5 bg-[#D4A574] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="h-2.5 w-2.5 bg-[#D4A574] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="h-2.5 w-2.5 bg-[#D4A574] rounded-full animate-bounce"></span>
                </div>
            </div>
        </div>
    );
};

export default TypingIndicator;
