
import React, { useState, useCallback } from 'react';
import { Page } from './types';
import Sidebar from './components/Sidebar';
import ChatScreen from './components/ChatScreen';
import CanvasEditor from './components/CanvasEditor';
import ProjectsScreen from './components/ProjectsScreen';
import MemoryScreen from './components/MemoryScreen';
import ToolsScreen from './components/ToolsScreen';
import SettingsScreen from './components/SettingsScreen';
import ProfileScreen from './components/ProfileScreen';
import AboutScreen from './components/AboutScreen';

// A simple login component for demonstration purposes
const LoginScreen: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-[#1C1C1C] bg-grid-gray-700/[0.2]">
            <div className="w-full max-w-md p-8 space-y-8 bg-[#2A2A2A]/50 backdrop-blur-xl border border-[#D4A574]/20 rounded-2xl shadow-2xl shadow-[#1C1C1C]">
                <div className="text-center">
                    <div className="mx-auto w-24 h-24 mb-4 rounded-full border-2 border-[#4FC3F7] p-2 shadow-[0_0_20px_#4FC3F7]">
                         <svg className="w-full h-full text-[#D4A574]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1.5a.5.5 0 01.5.5v2a.5.5 0 01-1 0v-2a.5.5 0 01.5-.5zM3.81 4.19a.5.5 0 01.707-.707l1.414 1.414a.5.5 0 11-.707.707L3.81 4.19zM2 12.5a.5.5 0 01.5-.5h2a.5.5 0 010 1h-2a.5.5 0 01-.5-.5zM20 12.5a.5.5 0 01.5-.5h2a.5.5 0 010 1h-2a.5.5 0 01-.5-.5zM18.07 4.19a.5.5 0 01.707.707l-1.414 1.414a.5.5 0 11-.707-.707l1.414-1.414zM12 20.5a.5.5 0 01.5.5v2a.5.5 0 01-1 0v-2a.5.5 0 01.5-.5zM3.81 18.07a.5.5 0 01.707-.707l1.414 1.414a.5.5 0 11-.707.707l-1.414-1.414zM18.07 18.07a.5.5 0 01.707.707l-1.414-1.414a.5.5 0 11-.707-.707l1.414 1.414zM12 6.5a6 6 0 100 12 6 6 0 000-12z"/></svg>
                    </div>
                    <h1 className="text-4xl font-black text-[#FEE9B2] tracking-tighter">JARRY</h1>
                    <p className="mt-2 text-[#D4A574]">Your Chaotic AI Brother</p>
                </div>
                <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
                    <input className="w-full px-4 py-3 bg-[#1C1C1C] border border-[#6A4C32] rounded-lg text-[#FEE9B2] placeholder-[#6A4C32] focus:outline-none focus:ring-2 focus:ring-[#FFCC66] transition-all" type="text" placeholder="Username" required />
                    <input className="w-full px-4 py-3 bg-[#1C1C1C] border border-[#6A4C32] rounded-lg text-[#FEE9B2] placeholder-[#6A4C32] focus:outline-none focus:ring-2 focus:ring-[#FFCC66] transition-all" type="password" placeholder="Password" required />
                    <button type="submit" className="w-full py-3 font-bold text-[#1C1C1C] bg-[#FFCC66] rounded-lg hover:bg-[#FFB74D] transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_#FFCC66]/50">Login</button>
                    <div className="text-center text-[#6A4C32]">or</div>
                    <button type="button" className="w-full py-3 font-bold text-[#FEE9B2] bg-transparent border-2 border-[#4FC3F7] rounded-lg hover:bg-[#4FC3F7]/20 transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_#4FC3F7]/50">Continue with Google</button>
                </form>
            </div>
        </div>
    );
};


const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<Page>('chat');

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setCurrentPage('chat');
    };

    const renderContent = () => {
        switch (currentPage) {
            case 'chat': return <ChatScreen />;
            case 'canvas': return <CanvasEditor />;
            case 'projects': return <ProjectsScreen />;
            case 'memory': return <MemoryScreen />;
            case 'tools': return <ToolsScreen />;
            case 'settings': return <SettingsScreen />;
            case 'profile': return <ProfileScreen />;
            case 'about': return <AboutScreen />;
            default: return <ChatScreen />; // Fallback
        }
    };

    if (!isAuthenticated) {
        return <LoginScreen onLogin={handleLogin} />;
    }

    return (
        <div className="flex h-screen bg-[#1C1C1C] text-[#FEE9B2] overflow-hidden">
            <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} onLogout={handleLogout} />
            <main className="flex-1 overflow-y-auto">
                {renderContent()}
            </main>
        </div>
    );
};

export default App;
