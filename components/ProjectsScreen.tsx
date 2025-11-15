
import React, { useState } from 'react';
import { Project } from '../types';

const mockProjects: Project[] = [
    { id: 'proj1', name: 'JARRY Frontend UI', status: 'Active', files: [], notes: '', tasks: [], metadata: {}},
    { id: 'proj2', name: 'Chaos Engine v2', status: 'Draft', files: [], notes: '', tasks: [], metadata: {}},
    { id: 'proj3', name: 'Global Cheese Database', status: 'Archived', files: [], notes: '', tasks: [], metadata: {}},
];

const StatusBadge: React.FC<{ status: Project['status'] }> = ({ status }) => {
    const colorMap = {
        Active: 'bg-[#4DEEEA]/20 text-[#4DEEEA]',
        Draft: 'bg-[#FFCC66]/20 text-[#FFCC66]',
        Archived: 'bg-[#6A4C32]/50 text-[#D4A574]',
    };
    return <span className={`px-3 py-1 text-xs font-semibold rounded-full ${colorMap[status]}`}>{status}</span>;
}

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
    <div className="bg-[#0B0C0D]/50 backdrop-blur-lg border border-[#6A4C32]/50 rounded-xl p-6 transition-all duration-300 hover:border-[#FFB74D] hover:shadow-[0_0_20px_#FFB74D]/20">
        <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold text-[#FEE9B2]">{project.name}</h3>
            <StatusBadge status={project.status} />
        </div>
        <p className="text-sm text-[#D4A574] mt-2">Contains 3 files, 5 notes, 8 tasks.</p>
        <div className="mt-6 flex space-x-2">
            <button className="px-4 py-2 text-sm bg-transparent border border-[#6A4C32] rounded-lg hover:bg-[#6A4C32]/50">Open</button>
            <button className="px-4 py-2 text-sm bg-transparent border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/20">Delete</button>
        </div>
    </div>
);

const ProjectRow: React.FC<{ project: Project }> = ({ project }) => (
     <div className="bg-[#0B0C0D]/50 backdrop-blur-lg border border-[#6A4C32]/50 rounded-xl p-4 transition-all duration-300 hover:border-[#FFB74D] hover:shadow-[0_0_20px_#FFB74D]/20 flex items-center justify-between">
        <div className="flex items-center">
            <h3 className="text-lg font-bold text-[#FEE9B2] w-64">{project.name}</h3>
            <StatusBadge status={project.status} />
        </div>
        <p className="text-sm text-[#D4A574]">Contains 3 files, 5 notes, 8 tasks.</p>
        <div className="flex space-x-2">
            <button className="px-4 py-2 text-sm bg-transparent border border-[#6A4C32] rounded-lg hover:bg-[#6A4C32]/50">Open</button>
            <button className="px-4 py-2 text-sm bg-transparent border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/20">Delete</button>
        </div>
    </div>
)


const ProjectsScreen: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>(mockProjects);
    const [view, setView] = useState<'grid' | 'list'>('grid');

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-black text-[#FEE9B2]">Projects</h1>
                <div className="flex items-center space-x-4">
                    <div className="flex items-center bg-[#0B0C0D] border border-[#6A4C32] rounded-lg p-1">
                        <button onClick={() => setView('grid')} className={`px-3 py-1 rounded-md ${view === 'grid' ? 'bg-[#FFCC66] text-[#1C1C1C]' : 'text-[#D4A574]'}`}>Grid</button>
                        <button onClick={() => setView('list')} className={`px-3 py-1 rounded-md ${view === 'list' ? 'bg-[#FFCC66] text-[#1C1C1C]' : 'text-[#D4A574]'}`}>List</button>
                    </div>
                    <button className="px-5 py-2 bg-[#FFCC66] text-[#1C1C1C] font-bold rounded-lg hover:bg-[#FFB74D] transition-all shadow-[0_0_10px_#FFCC66]/50">
                        New Project
                    </button>
                </div>
            </div>
            
            {view === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map(p => <ProjectCard key={p.id} project={p} />)}
                </div>
            ) : (
                <div className="space-y-4">
                    {projects.map(p => <ProjectRow key={p.id} project={p} />)}
                </div>
            )}
        </div>
    );
};

export default ProjectsScreen;
