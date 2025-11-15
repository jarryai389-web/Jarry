
import React from 'react';

const ProfileScreen: React.FC = () => {
    return (
        <div className="p-8 flex items-center justify-center h-full">
            <div className="max-w-md w-full bg-[#2A2A2A]/50 backdrop-blur-lg border border-[#6A4C32]/50 rounded-2xl p-8 text-center shadow-lg">
                <img
                    src={`https://picsum.photos/seed/jarryuser/128`}
                    alt="User Avatar"
                    className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-[#4DEEEA] shadow-[0_0_20px_#4DEEEA]/50"
                />
                <h1 className="text-3xl font-bold text-[#FEE9B2]">JarryUser</h1>
                <p className="text-[#D4A574] mt-2">jarry.user@example.com</p>
                <p className="text-sm text-[#6A4C32] mt-4">Joined: January 1, 2024</p>

                <button className="mt-8 w-full py-3 font-bold text-[#1C1C1C] bg-[#FFCC66] rounded-lg hover:bg-[#FFB74D] transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_#FFCC66]/50">
                    Edit Profile
                </button>
            </div>
        </div>
    );
};

export default ProfileScreen;
