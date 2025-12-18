import React from "react";
import { X, ChevronRight, TrendingUp, Star, FileText, Briefcase, List, Users, Award, Heart, Bookmark, Eye, MessageSquare, LayoutDashboard, LogOut, User } from "lucide-react";
import { Link } from "react-router-dom";

export default function Sidebar({ isOpen, onClose, user, isEmployer, isCandidate, onLogout }) {

  const menuItems = [
    { icon: FileText, label: "Registrations/Applications", section: "For Users" },
    // { icon: Briefcase, label: "My Jobs & Internships" },
    { icon: MessageSquare, label: "My Rounds" },
    // { icon: Heart, label: "Watchlist" },
  ];

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed right-0 top-0 h-screen w-80 bg-white shadow-2xl z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b-2 border-gray-200">
        <h2 className="text-xl font-bold">Profile</h2>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded transition"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* Profile Section */}
      <div className="p-6 border-b-2 border-gray-200">
        <div className="flex items-start space-x-4">
          <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center text-white text-2xl font-bold shrink-0">
            <User className="w-8 h-8" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg">{user?.fullName || 'User'}</h3>
            <p className="text-sm text-gray-600">{user?.email || 'user@example.com'}</p>
            <p className="text-xs text-gray-500 uppercase mt-1">
              {isEmployer ? 'Employer' : 'Candidate'}
            </p>
            <Link 
              to={isEmployer ? "/employer-dashboard" : "/candidate-dashboard"}
              onClick={onClose}
              className="text-blue-600 font-semibold text-sm mt-2 flex items-center hover:underline"
            >
              View Profile
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>

        {/* Complete Profile Banner */}
        <div className="mt-4 bg-blue-50 border-2 border-blue-200 p-4 rounded">
          <p className="font-bold text-sm mb-1">You're missing out</p>
          <p className="text-xs text-gray-600 mb-2">
            on opportunities to create an impact!
          </p>
          <button className="text-blue-600 font-semibold text-sm flex items-center hover:underline">
            Complete my profile
            <ChevronRight className="h-4 w-4 ml-1" />
          </button>
        </div>
      </div>

      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-1">
          <p className="text-xs font-bold text-gray-500 uppercase mb-3">Navigation</p>
          
          {isEmployer ? (
            <div className="space-y-2">
              <Link 
                to="/post-job" 
                onClick={onClose}
                className="w-full flex items-center space-x-3 px-3 py-3 hover:bg-gray-100 rounded transition text-left"
              >
                <Briefcase className="h-5 w-5 text-gray-600 shrink-0" />
                <span className="text-sm font-medium text-gray-800 uppercase">Post Job</span>
              </Link>
            </div>
          ) : (
            <div className="space-y-2">
              <Link 
                to="/job-portal" 
                onClick={onClose}
                className="w-full flex items-center space-x-3 px-3 py-3 hover:bg-gray-100 rounded transition text-left"
              >
                <Briefcase className="h-5 w-5 text-gray-600 shrink-0" />
                <span className="text-sm font-medium text-gray-800 uppercase">Browse Jobs</span>
              </Link>
            </div>
          )}

          <div className="mt-6 space-y-1">
            <p className="text-xs font-bold text-gray-500 uppercase mb-3">Quick Links</p>
            
            {menuItems.slice(0, 5).map((item, index) => (
              <button key={index} className="w-full flex items-center space-x-3 px-3 py-3 hover:bg-gray-100 rounded transition text-left">
                <item.icon className="h-5 w-5 text-gray-600 shrink-0" />
                <span className="text-sm font-medium text-gray-800">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t-2 border-gray-200">
        <button 
          onClick={onLogout}
          className="w-full bg-black text-white border-2 border-black font-bold py-3 hover:bg-white cursor-pointer hover:text-black transition flex items-center justify-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </div>
  );
}