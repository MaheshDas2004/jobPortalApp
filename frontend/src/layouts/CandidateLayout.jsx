import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import CandidateSidebar from '../components/CandidateSidebar';
import { useAuth } from '../context/AuthContext';
import { Users } from 'lucide-react';

const CandidateLayout = () => {
    const { user, isLoading } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    if (isLoading) return <div>Loading...</div>;
    if (!user) return <div>Please log in</div>;

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-none mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex flex-col lg:flex-row gap-6">

                    <CandidateSidebar
                        user={user}
                        isSidebarOpen={isSidebarOpen}
                        setIsSidebarOpen={setIsSidebarOpen}
                    />

                    {/* Mobile Toggle */}
                    <div className="lg:hidden mb-4">
                        <button onClick={() => setIsSidebarOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-black font-bold text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
                            <Users className="w-4 h-4" />
                            <span>Menu</span>
                        </button>
                    </div>

                    {/* Main Content Area */}
                    <main className="flex-1">
                        <Outlet context={{ user }} />
                    </main>
                </div>
            </div>
        </div>
    );
};

export default CandidateLayout;
