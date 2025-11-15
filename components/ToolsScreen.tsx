
import React, { useState, useEffect } from 'react';
import { fetchTools, runTool } from '../services/api';

interface Tool {
    name: string;
    description: string;
    params: string[];
}

const ToolCard: React.FC<{ tool: Tool; onTest: (tool: Tool) => void }> = ({ tool, onTest }) => (
    <div className="bg-[#2A2A2A]/50 backdrop-blur-lg border border-[#6A4C32]/50 rounded-xl p-6 flex flex-col">
        <h3 className="text-xl font-bold text-[#FEE9B2]">{tool.name}</h3>
        <p className="text-sm text-[#D4A574] mt-2 flex-grow">{tool.description}</p>
        <div className="mt-4">
            <span className="text-xs font-semibold text-[#FFCC66]">PARAMETERS: {tool.params.join(', ') || 'None'}</span>
        </div>
        <button onClick={() => onTest(tool)} className="mt-6 w-full py-2 bg-[#4DEEEA]/80 text-[#1C1C1C] font-bold rounded-lg hover:bg-[#4DEEEA] transition-all shadow-[0_0_10px_#4DEEEA]/50">
            Test Tool
        </button>
    </div>
);


const ToolsScreen: React.FC = () => {
    const [tools, setTools] = useState<Tool[]>([]);
    const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
    const [params, setParams] = useState<Record<string, string>>({});
    const [output, setOutput] = useState<string>('');
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        const loadTools = async () => {
            const data = await fetchTools();
            setTools(data);
        };
        loadTools();
    }, []);
    
    const handleTest = (tool: Tool) => {
        setSelectedTool(tool);
        setParams({});
        setOutput('');
    };
    
    const handleRun = async () => {
        if (!selectedTool) return;
        setIsRunning(true);
        const result = await runTool(selectedTool.name, params);
        setOutput(JSON.stringify(result, null, 2));
        setIsRunning(false);
    };

    return (
        <div className="p-8 h-full flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2 lg:w-2/3">
                <h1 className="text-4xl font-black text-[#FEE9B2] mb-8">Tools</h1>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {tools.map(t => <ToolCard key={t.name} tool={t} onTest={handleTest} />)}
                </div>
            </div>
            
            <div className="md:w-1/2 lg:w-1/3 bg-[#2A2A2A]/50 border border-[#6A4C32]/50 rounded-xl p-6 flex flex-col">
                <h2 className="text-2xl font-bold text-[#FEE9B2] border-b border-[#6A4C32] pb-4 mb-4">Execution Panel</h2>
                {selectedTool ? (
                    <div className="flex flex-col flex-grow">
                        <h3 className="text-lg font-semibold text-[#FFCC66]">{selectedTool.name}</h3>
                        <div className="my-4 space-y-4">
                            {selectedTool.params.map(p => (
                                <input
                                    key={p}
                                    type="text"
                                    placeholder={`Parameter: ${p}`}
                                    onChange={(e) => setParams(prev => ({ ...prev, [p]: e.target.value }))}
                                    className="w-full px-4 py-2 bg-[#1C1C1C] border border-[#6A4C32] rounded-lg text-[#FEE9B2] placeholder-[#6A4C32] focus:outline-none focus:ring-1 focus:ring-[#FFCC66]"
                                />
                            ))}
                        </div>
                        <button onClick={handleRun} disabled={isRunning} className="w-full py-2 bg-[#FFCC66] text-[#1C1C1C] font-bold rounded-lg hover:bg-[#FFB74D] disabled:bg-[#6A4C32] transition-all">
                            {isRunning ? 'Running...' : 'Run'}
                        </button>
                        <div className="mt-4 flex-grow">
                            <h4 className="font-semibold text-[#D4A574]">Output:</h4>
                            <pre className="mt-2 p-4 bg-[#1C1C1C] rounded-lg text-sm text-[#4DEEEA] whitespace-pre-wrap overflow-auto h-48">{output}</pre>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-full text-[#6A4C32] font-semibold">
                        Select a tool to test
                    </div>
                )}
            </div>
        </div>
    );
};

export default ToolsScreen;
