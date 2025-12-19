import React, { useState, useEffect } from 'react';
import {
    Briefcase, Users, TrendingUp, Bell, MessageSquare, Edit2, FileText, Settings,
    LogOut, PlusCircle, Eye, Target
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const EmployerSidebar = ({ user, isSidebarOpen, setIsSidebarOpen }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [sidebarStats, setSidebarStats] = useState({
        activeJobs: 0,
        totalApplications: 0,
        pendingReviews: 0,
        messages: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/auth/employer/sidebar-stats', { credentials: 'include' });
                const data = await res.json();
                if (data.success) {
                    setSidebarStats(data.stats);
                }
            } catch (error) {
                console.error("Failed to fetch employer sidebar stats", error);
            }
        };
        fetchStats();
    }, [location.pathname]); // Refetch on navigation

    const isActive = (path) => location.pathname === path;

    return (
        <aside className={`lg:w-64 bg-white border-2 border-black p-4 h-fit lg:block ${isSidebarOpen ? 'fixed inset-0 z-50 w-full overflow-y-auto' : 'hidden'}`}>
            <div className="flex justify-between items-start lg:hidden mb-4">
                <h2 className="text-xl font-black uppercase">Employer Menu</h2>
                <button onClick={() => setIsSidebarOpen(false)} className="p-1">
                    <LogOut className="w-6 h-6 rotate-180" />
                </button>
            </div>

            <div className="flex items-center gap-3 mb-6 pb-6 border-b-2 border-black">
                <div className="w-12 h-12 bg-black border-2 border-black flex items-center justify-center text-white font-black uppercase text-xl shrink-0">
                    {user?.companyName?.charAt(0) || user?.fullName?.charAt(0) || 'E'}
                </div>
                <div className="overflow-hidden">
                    <h3 className="font-black text-black truncate">{user?.companyName || user?.fullName || 'Employer'}</h3>
                    <p className="text-xs text-black font-bold truncate">{user?.email || 'email@example.com'}</p>
                    <p className="text-xs text-green-600 font-bold uppercase">Employer</p>
                </div>
            </div>

            <nav className="space-y-2">
                <div className="mb-4">
                    <h4 className="text-xs font-black text-black mb-3 uppercase border-b border-black pb-1">Dashboard</h4>
                    <div className="space-y-1">
                        <Link
                            to="/employer-dashboard"
                            onClick={() => setIsSidebarOpen(false)}
                            className={`w-full flex items-center gap-3 px-3 py-2 text-black border-2 border-black font-bold text-sm ${isActive('/employer-dashboard') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                        >
                            <TrendingUp className="w-4 h-4" />
                            <span>Dashboard</span>
                        </Link>
                        <Link
                            to="/company-profile"
                            onClick={() => setIsSidebarOpen(false)}
                            className="w-full flex items-center gap-3 px-3 py-2 text-black border-2 border-black font-bold text-sm hover:bg-black hover:text-white transition-colors"
                        >
                            <Edit2 className="w-4 h-4" />
                            <span>Company Profile</span>
                        </Link>
                    </div>
                </div>

                <div className="mb-4">
                    <h4 className="text-xs font-black text-black mb-3 uppercase border-b border-black pb-1">Job Management</h4>
                    <div className="space-y-1">
                        <Link
                            to="/post-job"
                            onClick={() => setIsSidebarOpen(false)}
                            className={`flex items-center gap-3 px-3 py-2 text-black border-2 border-black font-bold text-sm ${isActive('/post-job') ? 'bg-gray-200' : ''}`}
                        >
                            <PlusCircle className="w-4 h-4" />
                            <span>Post New Job</span>
                        </Link>
                        <Link
                            to="/view-jobs"
                            onClick={() => setIsSidebarOpen(false)}
                            className={`flex items-center gap-3 px-3 py-2 text-black border-2 border-black font-bold text-sm ${isActive('/view-jobs') ? 'bg-gray-200' : ''}`}
                        >
                            <Briefcase className="w-4 h-4" />
                            <span>My Jobs</span>
                            {sidebarStats.activeJobs > 0 && <span className="ml-auto bg-black text-white text-xs px-2 py-0.5 font-black">{sidebarStats.activeJobs}</span>}
                        </Link>
                    </div>
                </div>

                <div className="mb-4">
                    <h4 className="text-xs font-black text-black mb-3 uppercase border-b border-black pb-1">Applications</h4>
                    <div className="space-y-1">
                        <Link
                            to="/manage-applications"
                            onClick={() => setIsSidebarOpen(false)}
                            className={`flex items-center gap-3 px-3 py-2 text-black border-2 border-black font-bold text-sm ${isActive('/manage-applications') ? 'bg-gray-200' : ''}`}
                        >
                            <Users className="w-4 h-4" />
                            <span>Applications</span>
                            {sidebarStats.totalApplications > 0 && <span className="ml-auto bg-black text-white text-xs px-2 py-0.5 font-black">{sidebarStats.totalApplications}</span>}
                        </Link>
                        <Link
                            to="/shortlisted-candidates"
                            onClick={() => setIsSidebarOpen(false)}
                            className={`flex items-center gap-3 px-3 py-2 text-black border-2 border-black font-bold text-sm ${isActive('/shortlisted-candidates') ? 'bg-gray-200' : ''}`}
                        >
                            <Target className="w-4 h-4" />
                            <span>Shortlisted</span>
                        </Link>
                    </div>
                </div>

                <div>
                    <h4 className="text-xs font-black text-black mb-3 uppercase border-b border-black pb-1">Communication</h4>
                    <div className="space-y-1">
                        <Link
                            to="/employer-messages"
                            onClick={() => setIsSidebarOpen(false)}
                            className={`flex items-center gap-3 px-3 py-2 text-black border-2 border-black font-bold text-sm ${isActive('/employer-messages') ? 'bg-gray-200' : ''}`}
                        >
                            <MessageSquare className="w-4 h-4" />
                            <span>Messages</span>
                            {sidebarStats.messages > 0 && <span className="ml-auto bg-black text-white text-xs px-2 py-0.5 font-black">{sidebarStats.messages}</span>}
                        </Link>
                        <Link
                            to="/employer-notifications"
                            onClick={() => setIsSidebarOpen(false)}
                            className={`flex items-center gap-3 px-3 py-2 text-black border-2 border-black font-bold text-sm ${isActive('/employer-notifications') ? 'bg-gray-200' : ''}`}
                        >
                            <Bell className="w-4 h-4" />
                            <span>Notifications</span>
                            {sidebarStats.pendingReviews > 0 && <span className="ml-auto bg-black text-white text-xs px-2 py-0.5 font-black">{sidebarStats.pendingReviews}</span>}
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

export default EmployerSidebar;