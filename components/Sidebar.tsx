import React from 'react';
import { Page } from '../types';

interface SidebarProps {
    currentPage: Page;
    setCurrentPage: (page: Page) => void;
    onLogout: () => void;
}

const NavItem: React.FC<{
    // FIX: Replaced JSX.Element with React.ReactElement to resolve missing namespace error.
    icon: React.ReactElement;
    label: string;
    isActive: boolean;
    onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`flex items-center w-full px-4 py-3 rounded-lg text-left transition-all duration-200 ${
            isActive
                ? 'bg-[#FFB74D]/20 text-[#FFCC66] shadow-[0_0_15px_#FFB74D]/30'
                : 'text-[#D4A574] hover:bg-[#6A4C32]/30 hover:text-[#FEE9B2]'
        }`}
    >
        <span className="w-6 h-6 mr-4">{icon}</span>
        <span className="font-semibold">{label}</span>
    </button>
);

const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage, onLogout }) => {
    
    const iconProps = {
        strokeWidth: 2,
        className: "w-6 h-6",
    };

    const navItems = [
        { id: 'chat', label: 'New Chat', icon: <svg {...iconProps} viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg> },
        { id: 'canvas', label: 'Canvas', icon: <svg {...iconProps} viewBox="0 0 24 24" fill="none" stroke="currentColor"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"></polygon><line x1="12" y1="22" x2="12" y2="15.5"></line><polyline points="22 8.5 12 15.5 2 8.5"></polyline><line x1="12" y1="2" x2="12" y2="8.5"></line></svg> },
        { id: 'projects', label: 'Projects', icon: <svg {...iconProps} viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg> },
        { id: 'memory', label: 'Vector Memory', icon: <svg {...iconProps} viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21.5 12c0-5.25-4.25-9.5-9.5-9.5S2.5 6.75 2.5 12s4.25 9.5 9.5 9.5s9.5-4.25 9.5-9.5z"></path><path d="M12 18c3.31 0 6-2.69 6-6s-2.69-6-6-6"></path></svg> },
        { id: 'tools', label: 'Tools', icon: <svg {...iconProps} viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg> },
    ];
    
    return (
        <aside className="w-72 bg-[#2A2A2A]/50 backdrop-blur-xl border-r border-[#6A4C32]/20 p-6 flex flex-col h-full">
            <div className="flex items-center space-x-3 mb-10">
                <div className="w-12 h-12 rounded-full border-2 border-[#4DEEEA] p-1 shadow-[0_0_15px_#4DEEEA]">
                    <svg className="w-full h-full text-[#D4A574]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 1.5a.5.5 0 01.5.5v2a.5.5 0 01-1 0v-2a.5.5 0 01.5-.5zM3.81 4.19a.5.5 0 01.707-.707l1.414 1.414a.5.5 0 11-.707.707L3.81 4.19zM2 12.5a.5.5 0 01.5-.5h2a.5.5 0 010 1h-2a.5.5 0 01-.5-.5zM20 12.5a.5.5 0 01.5-.5h2a.5.5 0 010 1h-2a.5.5 0 01-.5-.5zM18.07 4.19a.5.5 0 01.707.707l-1.414 1.414a.5.5 0 11-.707-.707l1.414-1.414zM12 20.5a.5.5 0 01.5.5v2a.5.5 0 01-1 0v-2a.5.5 0 01.5-.5zM3.81 18.07a.5.5 0 01.707-.707l1.414 1.414a.5.5 0 11-.707.707l-1.414-1.414zM18.07 18.07a.5.5 0 01.707.707l-1.414-1.414a.5.5 0 11-.707-.707l1.414 1.414zM12 6.5a6 6 0 100 12 6 6 0 000-12z"/></svg>
                </div>
                <div>
                    <h1 className="text-2xl font-black text-[#FEE9B2]">JARRY</h1>
                    <p className="text-xs text-[#D4A574]">Your Chaotic AI Brother</p>
                </div>
            </div>

            <nav className="flex-1 space-y-2">
                {navItems.map(item => (
                    <NavItem
                        key={item.id}
                        label={item.label}
                        icon={item.icon}
                        isActive={currentPage === item.id}
                        onClick={() => setCurrentPage(item.id as Page)}
                    />
                ))}
            </nav>

            <div className="mt-auto space-y-2">
                 <NavItem
                    icon={<svg {...iconProps} viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>}
                    label="Settings"
                    isActive={currentPage === 'settings'}
                    onClick={() => setCurrentPage('settings')}
                />
                 <NavItem
                    icon={<svg {...iconProps} viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>}
                    label="About"
                    isActive={currentPage === 'about'}
                    onClick={() => setCurrentPage('about')}
                />
                <div className="border-t border-[#6A4C32]/30 my-2"></div>
                 <NavItem
                    icon={<svg {...iconProps} viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>}
                    label="Profile"
                    isActive={currentPage === 'profile'}
                    onClick={() => setCurrentPage('profile')}
                />
                 <NavItem
                    icon={<svg {...iconProps} viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>}
                    label="Logout"
                    isActive={false}
                    onClick={onLogout}
                />
            </div>
        </aside>
    );
};

export default Sidebar;