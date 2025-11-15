
import React, { useState } from 'react';

const SettingSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-[#2A2A2A]/40 border border-[#6A4C32]/30 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-[#FFCC66] mb-6 border-b border-[#6A4C32]/50 pb-3">{title}</h2>
        <div className="space-y-6">{children}</div>
    </div>
);

const Slider: React.FC<{ label: string; value: number; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }> = ({ label, value, onChange }) => (
    <div>
        <label className="block text-sm font-medium text-[#D4A574] mb-2">{label}</label>
        <div className="flex items-center space-x-4">
            <input type="range" min="0" max="100" value={value} onChange={onChange} className="w-full h-2 bg-[#1C1C1C] rounded-lg appearance-none cursor-pointer" />
            <span className="text-sm font-mono text-[#FEE9B2] w-12 text-center">{value}</span>
        </div>
    </div>
);

const SettingsScreen: React.FC = () => {
    const [personality, setPersonality] = useState({
        humor: 75,
        roast: 20,
        hinglish: 60,
        formality: 10,
        empathy: 80,
        chaos: 90,
    });

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>, key: keyof typeof personality) => {
        setPersonality(prev => ({ ...prev, [key]: Number(e.target.value) }));
    };

    return (
        <div className="p-8 space-y-8">
            <h1 className="text-4xl font-black text-[#FEE9B2]">Settings</h1>
            
            <SettingSection title="AI Settings">
                <div>
                    <label className="block text-sm font-medium text-[#D4A574] mb-2">Model Selector</label>
                    <select className="w-full px-4 py-3 bg-[#1C1C1C] border border-[#6A4C32] rounded-lg text-[#FEE9B2] focus:outline-none focus:ring-2 focus:ring-[#FFCC66]">
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
                        <Slider key={key} label={key.charAt(0).toUpperCase() + key.slice(1)} value={value} onChange={(e) => handleSliderChange(e, key as keyof typeof personality)} />
                    ))}
                </div>
                <div className="border-t border-[#6A4C32]/50 pt-6">
                    <h3 className="text-lg font-semibold text-[#D4A574] mb-4">Presets</h3>
                    <div className="flex flex-wrap gap-2">
                        {['Default JARRY', 'Wise JARRY', 'Silent JARRY', 'Angry JARRY', 'Childish JARRY'].map(preset => (
                            <button key={preset} className="px-4 py-2 bg-transparent border border-[#6A4C32] rounded-lg hover:bg-[#6A4C32]/50 transition-all text-sm font-semibold">{preset}</button>
                        ))}
                    </div>
                </div>
            </SettingSection>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <SettingSection title="Display Settings">
                    <div>
                        <label className="block text-sm font-medium text-[#D4A574] mb-2">Theme</label>
                        <select className="w-full px-4 py-3 bg-[#1C1C1C] border border-[#6A4C32] rounded-lg text-[#FEE9B2] focus:outline-none focus:ring-2 focus:ring-[#FFCC66]">
                            <option>Dark</option>
                            <option>Dim</option>
                            <option>Ultra Black</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#D4A574] mb-2">Font Size</label>
                         <select className="w-full px-4 py-3 bg-[#1C1C1C] border border-[#6A4C32] rounded-lg text-[#FEE9B2] focus:outline-none focus:ring-2 focus:ring-[#FFCC66]">
                            <option>Small</option>
                            <option>Medium</option>
                            <option>Large</option>
                        </select>
                    </div>
                </SettingSection>

                <SettingSection title="Audio Settings (UI Only)">
                     <div>
                        <label className="block text-sm font-medium text-[#D4A574] mb-2">Input Device</label>
                         <select className="w-full px-4 py-3 bg-[#1C1C1C] border border-[#6A4C32] rounded-lg text-[#FEE9B2] focus:outline-none focus:ring-2 focus:ring-[#FFCC66]">
                            <option>Default Microphone</option>
                        </select>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-[#D4A574] mb-2">Output Device</label>
                         <select className="w-full px-4 py-3 bg-[#1C1C1C] border border-[#6A4C32] rounded-lg text-[#FEE9B2] focus:outline-none focus:ring-2 focus:ring-[#FFCC66]">
                            <option>Default Speakers</option>
                        </select>
                    </div>
                </SettingSection>
            </div>
        </div>
    );
};

export default SettingsScreen;
