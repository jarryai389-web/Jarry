
import React from 'react';

const AboutScreen: React.FC = () => {
    return (
        <div className="p-8 md:p-12">
            <div className="max-w-4xl mx-auto bg-[#0B0C0D]/40 border border-[#6A4C32]/30 rounded-xl p-8 md:p-12">
                <div className="flex items-center space-x-4 mb-8">
                    <div className="w-16 h-16 rounded-full border-2 border-[#BB86FC] p-1 shadow-[0_0_20px_#BB86FC]">
                         <svg className="w-full h-full text-[#D4A574]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3.5 4.5a2 2 0 012-2h13a2 2 0 012 2v2.5a2 2 0 01-2 2h-4.5a0.5 0.5 0 00-.5.5v1a0.5 0.5 0 00.5.5h2a2 2 0 012 2v2.5a2 2 0 01-2 2h-13a2 2 0 01-2-2v-11z" /><path d="M15 15.5a2 2 0 002-2v-2.5" /><path d="M11 13.5v-2" /></svg>
                    </div>
                    <div>
                        <h1 className="text-4xl font-black text-[#FEE9B2]">About JARRY</h1>
                        <p className="text-lg text-[#D4A574]">Your Chaotic AI Brother</p>
                    </div>
                </div>
                
                <div className="prose prose-invert prose-lg text-[#FEE9B2] max-w-none prose-p:text-[#D4A574] prose-headings:text-[#FFCC66]">
                    <h2>What is JARRY?</h2>
                    <p>
                        JARRY is not just another AI assistant. He's your digital younger brother, your developer mentor, and your partner in productive chaos. Inspired by the clever and mischievous spirit of Jerry the rat from "Tom & Jerry," JARRY brings a unique blend of fun, wit, and Hinglish-speaking charm to your workflow.
                    </p>
                    
                    <h2>Origin & Personality</h2>
                    <p>
                        Born from a love for classic cartoons and a need for an AI that feels more like a friend than a tool, JARRY embodies a "chaotic good" alignment. He's sweet but sassy, incredibly smart but never boring. He's the one who'll help you debug complex code and then immediately roast you for a typo in your comments. This mix of high-level intelligence and playful energy is what makes him special.
                    </p>
                    
                    <h2>Purpose</h2>
                    <p>
                        JARRY is designed to be an "AI Operating System"—a central hub for your projects, ideas, and conversations. Whether you're writing code, brainstorming on a canvas, managing projects, or just need a laugh, JARRY is here to assist, entertain, and push you to be more creative. Welcome to a more chaotic, and ultimately more fun, way of working.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutScreen;