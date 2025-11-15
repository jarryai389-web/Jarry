
import React, { useState } from 'react';

const SettingSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-[#0B0C0D]/40 border border-[#6A4C32]/30 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-[#FFCC66] mb-6 border-b border-[#6A4C32]/50 pb-3">{title}</h2>
        <div className="space-y-6">{children}</div>
    </div>
);

const Slider: React.FC<{ label: string; value: number; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }> = ({ label, value, onChange }) => (
    <div>
        <label className="block text-sm font-medium text-[#D4A574] mb-2 capitalize">{label.replace('_', ' ')}</label>
        <div className="flex items-center space-x-4">
            <input type="range" min="0" max="100" value={value} onChange={onChange} className="w-full h-2 bg-[#0F1113] rounded-lg appearance-none cursor-pointer accent-[#FFCC66]" />
            <span className="text-sm font-mono text-[#FEE9B2] w-12 text-center">{value}</span>
        </div>
    </div>
);

const SettingsScreen: React.FC = () => {
    const initialPersonality = {
        humor: 75,
        roast_intensity: 20,
        hinglish_amount: 60,
        formality: 10,
        empathy: 80,
        chaos_level: 90,
    };
    const [personality, setPersonality] = useState(initialPersonality);
    const [apiKey, setApiKey] = useState('');

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>, key: keyof typeof personality) => {
        setPersonality(prev => ({ ...prev, [key]: Number(e.target.value) }));
    };

    const setPreset = (preset: string) => {
        switch (preset) {
            case 'wise': setPersonality({ humor: 20, roast_intensity: 5, hinglish_amount: 10, formality: 80, empathy: 90, chaos_level: 10 }); break;
            case 'silent': setPersonality({ humor: 0, roast_intensity: 0, hinglish_amount: 0, formality: 50, empathy: 50, chaos_level: 0 }); break;
            case 'angry': setPersonality({ humor: 80, roast_intensity: 95, hinglish_amount: 40, formality: 5, empathy: 10, chaos_level: 95 }); break;
            case 'childish': setPersonality({ humor: 90, roast_intensity: 10, hinglish_amount: 80, formality: 5, empathy: 60, chaos_level: 80 }); break;
            default: setPersonality(initialPersonality);
        }
    };

    return (
        <div className="p-8 space-y-8">
            <h1 className="text-4xl font-black text-[#FEE9B2]">Settings</h1>
            
            <SettingSection title="AI Settings">
                <div>
                     <label className="block text-sm font-medium text-[#D4A574] mb-2">Gemini API Key</label>
                     <input 
                        type="password"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder="Enter your Gemini API Key"
                        className="w-full px-4 py-3 bg-[#0F1113] border border-[#6A4C32] rounded-lg text-[#FEE9B2] placeholder-[#6A4C32] focus:outline-none focus:ring-2 focus:ring-[#FFCC66]"
                     />
                </div>
                <div>
                    <label className="block text-sm font-medium text-[#D4A574] mb-2">Model Selector</label>
                    <select className="w-full px-4 py-3 bg-[#0F1113] border border-[#6A4C32] rounded-lg text-[#FEE9B2] focus:outline-none focus:ring-2 focus:ring-[#FFCC66]">
                        <option>gemini-2.5-flash</option>
                        <option>gemini-2.5-pro</option>
                        <option>jarry-custom-model</option>
                        <option>gemini-2.5-flash-lite</option>
                    </select>
                </div>
                <Slider label="Temperature" value={70} onChange={() => {}} />
                <Slider label="Max Tokens" value={50} onChange={() => {}} />
            </SettingSection>

            <SettingSection title="Personality Controls">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(personality).map(([key, value]) => (
                        <Slider key={key} label={key} value={value} onChange={(e) => handleSliderChange(e, key as keyof typeof personality)} />
                    ))}
                </div>
                <div className="border-t border-[#6A4C32]/50 pt-6">
                    <h3 className="text-lg font-semibold text-[#D4A574] mb-4">Presets</h3>
                    <div className="flex flex-wrap gap-2">
                        {['Default JARRY', 'Wise JARRY', 'Silent JARRY', 'Angry JARRY', 'Childish JARRY'].map(preset => (
                            <button key={preset} onClick={() => setPreset(preset.split(' ')[0].toLowerCase())} className="px-4 py-2 bg-transparent border border-[#6A4C32] rounded-lg hover:bg-[#6A4C32]/50 transition-all text-sm font-semibold">{preset}</button>
                        ))}
                    </div>
                </div>
            </SettingSection>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <SettingSection title="Display Settings">
                    <div>
                        <label className="block text-sm font-medium text-[#D4A574] mb-2">Theme</label>
                        <select className="w-full px-4 py-3 bg-[#0F1113] border border-[#6A4C32] rounded-lg text-[#FEE9B2] focus:outline-none focus:ring-2 focus:ring-[#FFCC66]">
                            <option>Dark</option>
                            <option>Dim</option>
                            <option>Ultra Black</option>
                        </select>
                    </div>
                </SettingSection>

                <SettingSection title="Keyboard Shortcuts (UI Only)">
                    <ul className="text-[#D4A574] space-y-2 text-sm">
                        <li className="flex justify-between"><span>Voice Mode Toggle</span> <kbd className="font-sans font-semibold">Ctrl+Shift+V</kbd></li>
                        <li className="flex justify-between"><span>New Chat</span> <kbd className="font-sans font-semibold">Ctrl+Shift+N</kbd></li>
                    </ul>
                </SettingSection>
            </div>
        </div>
    );
};

export default SettingsScreen;
