import React, { useState, useEffect } from 'react';
import {
    Search, Bell, MessageSquare, Edit2, FileText, Settings,
    LogOut, Users, Briefcase, Bookmark
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getSocket } from '../utils/socket';

const CandidateSidebar = ({ user, isSidebarOpen, setIsSidebarOpen }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [sidebarStats, setSidebarStats] = useState({
        appliedJobs: 0,
        savedJobs: 0,
        notifications: 0,
        messages: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/auth/candidate/sidebar-stats', { credentials: 'include' });
                const data = await res.json();
                if (data.success) {
                    setSidebarStats(data.stats);
                }
            } catch (error) {
                console.error("Failed to fetch sidebar stats", error);
            }
        };
        fetchStats();

        // Socket listeners for real-time updates
        const socket = getSocket();
        if (socket) {
            socket.on('notification', () => {
                setSidebarStats(prev => ({ ...prev, notifications: prev.notifications + 1 }));
            });
            socket.on('message', () => {
                setSidebarStats(prev => ({ ...prev, messages: prev.messages + 1 }));
            });
        }

        return () => {
            if (socket) {
                socket.off('notification');
                socket.off('message');
            }
        };
    }, [location.pathname]); // Refetch on navigation

    const isActive = (path) => location.pathname === path;

    return (
        <aside className={`lg:w-64 bg-white border-2 border-black p-4 h-fit lg:block ${isSidebarOpen ? 'fixed inset-0 z-50 w-full overflow-y-auto' : 'hidden'}`}>
            <div className="flex justify-between items-start lg:hidden mb-4">
                <h2 className="text-xl font-black uppercase">Menu</h2>
                <button onClick={() => setIsSidebarOpen(false)} className="p-1">
                    <LogOut className="w-6 h-6 rotate-180" />
                </button>
            </div>

            <div className="flex items-center gap-3 mb-6 pb-6 border-b-2 border-black">
                <div className="w-12 h-12 bg-black border-2 border-black flex items-center justify-center text-white font-black uppercase text-xl shrink-0 overflow-hidden">
                    {user?.profilePhoto ? (
                        <img
                            src={user.profilePhoto}
                            alt={user?.fullName || 'User'}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        user?.fullName?.charAt(0) || 'U'
                    )}
                </div>
                <div className="overflow-hidden">
                    <h3 className="font-black text-black truncate">{user?.fullName || 'User'}</h3>
                    <p className="text-xs text-black font-bold truncate">{user?.email || 'email@example.com'}</p>
                </div>
            </div>

            <nav className="space-y-2">
                <div className="mb-4">
                    <h4 className="text-xs font-black text-black mb-3 uppercase border-b border-black pb-1">Profile</h4>
                    <div className="space-y-1">
                        <Link
                            to="/profile"
                            onClick={() => setIsSidebarOpen(false)}
                            className={`w-full flex items-center gap-3 px-3 py-2 text-black border-2 border-black font-bold text-sm ${isActive('/profile') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                        >
                            <Users className="w-4 h-4" />
                            <span>View Profile</span>
                        </Link>
                        <Link // Edit Profile typically is a modal on Profile page, or we can make it a route. Keeping it as Profile link for now or handle separate route? User said "Opens edit panel". 
                            // If we are on /profile, it opens panel. If elsewhere, maybe go to /profile?
                            // PROPOSAL: Just go to /profile?edit=true for simplicity, or keep it handled in Profile.
                            // The prompt says "Opens profile editor". If I am on AppliedJobs, I probably go to Profile and open editor.
                            to="/profile?edit=true"
                            onClick={(renderBackdrop) => setIsSidebarOpen(false)}
                            className="w-full flex items-center gap-3 px-3 py-2 text-black border-2 border-black font-bold text-sm hover:bg-black hover:text-white transition-colors"
                        >
                            <Edit2 className="w-4 h-4" />
                            <span>Edit Profile</span>
                        </Link>
                        <Link
                            to="/resume"
                            onClick={() => setIsSidebarOpen(false)}
                            className={`w-full flex items-center gap-3 px-3 py-2 text-black border-2 border-black font-bold text-sm hover:bg-black hover:text-white transition-colors ${isActive('/resume') ? 'bg-black text-white' : ''}`}
                        >
                            <FileText className="w-4 h-4" />
                            <span>Resume</span>
                        </Link>
                    </div>
                </div>

                <div className="mb-4">
                    <h4 className="text-xs font-black text-black mb-3 uppercase border-b border-black pb-1">Jobs</h4>
                    <div className="space-y-1">
                        <Link
                            to="/jobs/applied"
                            onClick={() => setIsSidebarOpen(false)}
                            className={`flex items-center gap-3 px-3 py-2 text-black border-2 border-black font-bold text-sm ${isActive('/jobs/applied') ? 'bg-gray-200' : ''}`}
                        >
                            <Briefcase className="w-4 h-4" />
                            <span>Applied Jobs</span>
                            {sidebarStats.appliedJobs > 0 && <span className="ml-auto bg-black text-white text-xs px-2 py-0.5 font-black">{sidebarStats.appliedJobs}</span>}
                        </Link>
                        <Link
                            to="/jobs/saved"
                            onClick={() => setIsSidebarOpen(false)}
                            className={`flex items-center gap-3 px-3 py-2 text-black border-2 border-black font-bold text-sm ${isActive('/jobs/saved') ? 'bg-gray-200' : ''}`}
                        >
                            <Bookmark className="w-4 h-4" />
                            <span>Saved Jobs</span>
                            {sidebarStats.savedJobs > 0 && <span className="ml-auto bg-black text-white text-xs px-2 py-0.5 font-black">{sidebarStats.savedJobs}</span>}
                        </Link>
                        <Link
                            to="/job-alerts"
                            onClick={() => setIsSidebarOpen(false)}
                            className={`flex items-center gap-3 px-3 py-2 text-black border-2 border-black font-bold text-sm ${isActive('/job-alerts') ? 'bg-gray-200' : ''}`}
                        >
                            <Search className="w-4 h-4" />
                            <span>Job Alerts</span>
                        </Link>
                    </div>
                </div>

                <div>
                    <h4 className="text-xs font-black text-black mb-3 uppercase border-b border-black pb-1">Activity</h4>
                    <div className="space-y-1">
                        <Link
                            to="/messages"
                            onClick={() => setIsSidebarOpen(false)}
                            className={`flex items-center gap-3 px-3 py-2 text-black border-2 border-black font-bold text-sm ${isActive('/messages') ? 'bg-gray-200' : ''}`}
                        >
                            <MessageSquare className="w-4 h-4" />
                            <span>Messages</span>
                            {sidebarStats.messages > 0 && <span className="ml-auto bg-black text-white text-xs px-2 py-0.5 font-black">{sidebarStats.messages}</span>}
                        </Link>
                        <Link
                            to="/notifications"
                            onClick={() => setIsSidebarOpen(false)}
                            className={`flex items-center gap-3 px-3 py-2 text-black border-2 border-black font-bold text-sm ${isActive('/notifications') ? 'bg-gray-200' : ''}`}
                        >
                            <Bell className="w-4 h-4" />
                            <span>Notifications</span>
                            {sidebarStats.notifications > 0 && <span className="ml-auto bg-black text-white text-xs px-2 py-0.5 font-black">{sidebarStats.notifications}</span>}
                        </Link>
                    </div>
                </div>
            </nav>

            <button onClick={logout} className="w-full mt-6 px-4 py-2 border-2 border-black text-sm flex items-center justify-center gap-2 bg-black text-white font-black uppercase hover:bg-gray-800 transition-colors">
                <LogOut className="w-4 h-4" />
                Logout
            </button>
        </aside>
    );
};

export default CandidateSidebar;
