
import React, { useState, useEffect } from 'react';
import {
  Search, Bell, MessageSquare, Edit2, Share2, Eye,
  Briefcase, FileText, Award, BookOpen, Settings,
  LogOut, Users, Target, Bookmark, Clock, GraduationCap,
  Plus, ChevronRight, MapPin, Calendar, Code, Link as LinkIcon
} from 'lucide-react';
import EditProfilePanel from '../../components/EditProfilePanel';

import { useAuth } from '../../context/AuthContext';

const Profile = () => {
  const { user: authUser } = useAuth();
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const fetchProfile = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/auth/candidate/profile', { credentials: 'include' });
      const data = await res.json();
      if (data.success) {
        setUser(data.user);
      } else {
        console.error("Fetch profile failed:", data.message);
      }
    } catch (error) {
      console.error("Failed to fetch profile", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authUser) {
      setUser(authUser);
    }
    fetchProfile();
  }, [authUser]);

  const handleProfileSave = async (updatedData) => {
    try {
      const res = await fetch('http://localhost:3000/api/auth/candidate/profile', {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
      });
      const data = await res.json();
      if (data.success) {
        setUser(data.user);
      }
    } catch (error) {
      console.error("Failed to update profile", error);
    }
  };

  if (loading) {
    return <div className="min-h-[50vh] flex items-center justify-center font-black text-xl">LOADING...</div>;
  }

  if (!user) {
    return <div className="min-h-[50vh] flex items-center justify-center font-black text-xl">User not found</div>;
  }

  return (
    <div className="bg-white">
      {/* Banner */}
      <div className="h-32 sm:h-40 relative overflow-hidden border-2 border-black">
        <img
          src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=300&q=80"
          alt="Profile Banner"
          className="w-full h-full object-cover"
        />
        <button
          onClick={() => setIsPanelOpen(true)}
          className="absolute top-4 right-4 p-2 bg-white border-2 border-black hover:bg-black hover:text-white transition-colors"
        >
          <Edit2 className="w-4 h-4" />
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 mt-4">
        {/* Main Profile Content */}
        <div className="flex-1">
          {/* Profile Card */}
          <div className="bg-white border-2 border-black p-4 sm:p-6 mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              {/* Profile Photo */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-black border-2 border-black flex items-center justify-center text-white font-black uppercase text-3xl shrink-0 overflow-hidden">
                {user.profilePhoto ? (
                  <img
                    src={user.profilePhoto}
                    alt={user.fullName || 'User'}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  user.fullName?.charAt(0) || 'U'
                )}
              </div>
              <div className="flex-1 w-full">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-black text-black uppercase">{user.fullName}</h1>
                    <p className="text-black font-bold text-sm">{user.currentJobTitle || 'Open to Work'}</p>
                    <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-black font-bold">
                      {user.currentLocation && (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{user.currentLocation}</span>
                        </div>
                      )}
                      {user.educationDetails && user.educationDetails.length > 0 && (
                        <div className="flex items-center gap-1">
                          <GraduationCap className="w-4 h-4" />
                          <span>{user.educationDetails[0].institution}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2 mt-3">
                      {user.socialLinks?.map((link, i) => (
                        <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs border border-black px-2 py-1 font-bold hover:bg-black hover:text-white transition-colors">
                          <LinkIcon className="w-3 h-3" />
                          {link.platform}
                        </a>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button className="p-2 border-2 border-black hover:bg-gray-100">
                      <Share2 className="w-5 h-5" />
                    </button>
                    <button className="p-2 border-2 border-black hover:bg-gray-100">
                      <Eye className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setIsPanelOpen(true)}
                      className="px-4 py-2 bg-black text-white border-2 border-black flex items-center gap-2 font-black uppercase hover:bg-gray-800 transition-colors">
                      <Edit2 className="w-4 h-4" />
                      Edit Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-black uppercase">About</h2>
              </div>
              <p className="text-black leading-relaxed font-medium">
                {user.bio || 'No bio added yet.'}
              </p>
            </div>

            {/* Skills Section */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-black uppercase">Skills</h2>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {user.skills?.length > 0 ? (
                  user.skills.map((skill, index) => (
                    <span key={index} className="px-4 py-2 bg-white border-2 border-black text-black text-sm font-bold flex items-center gap-2">
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="text-sm font-medium text-gray-500">No skills added.</span>
                )}
              </div>
            </div>

            {/* Experience Section */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-black uppercase">Experience</h2>
                <button onClick={() => setIsPanelOpen(true)} className="text-black p-2 border-2 border-black hover:bg-gray-100">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              {user.experienceDetails?.length > 0 ? (
                <div className="space-y-4">
                  {user.experienceDetails.map((exp, i) => (
                    <div key={i} className="flex gap-4 p-4 border-2 border-black">
                      <div className="w-12 h-12 bg-black border-2 border-black flex items-center justify-center flex-shrink-0 text-white font-black">
                        {exp.company?.charAt(0) || 'C'}
                      </div>
                      <div>
                        <h3 className="font-black text-black">{exp.title}</h3>
                        <p className="font-bold text-sm">{exp.company}</p>
                        <div className="flex items-center gap-4 mt-1 text-xs font-bold text-gray-600">
                          <span>{exp.startDate ? new Date(exp.startDate).getFullYear() : ''} - {exp.endDate ? new Date(exp.endDate).getFullYear() : 'Present'}</span>
                          <span>{exp.location}</span>
                        </div>
                        <p className="mt-2 text-sm font-medium">{exp.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="border-2 border-black p-6 text-center">
                  <h3 className="font-black text-black mb-2 uppercase">Work Experience</h3>
                  <p className="text-sm text-black mb-4 font-medium">Narrate your professional journey!</p>
                  <button onClick={() => setIsPanelOpen(true)} className="text-black text-sm font-bold uppercase underline">Add Experience</button>
                </div>
              )}
            </div>

            {/* Education Section */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-black uppercase">Education</h2>
                <button onClick={() => setIsPanelOpen(true)} className="text-black p-2 border-2 border-black hover:bg-gray-100">
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {user.educationDetails?.length > 0 ? (
                <div className="space-y-4">
                  {user.educationDetails.map((edu, i) => (
                    <div key={i} className="flex gap-4 p-4 border-2 border-black">
                      <div className="w-12 h-12 bg-black border-2 border-black flex items-center justify-center flex-shrink-0 text-white font-black">
                        {edu.institution?.charAt(0) || 'U'}
                      </div>
                      <div>
                        <h3 className="font-black text-black">{edu.institution}</h3>
                        <p className="font-bold text-sm">{edu.level} - {edu.fieldOfStudy}</p>
                        <div className="flex items-center gap-4 mt-1 text-xs font-bold text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{edu.year || (edu.startDate && new Date(edu.startDate).getFullYear())}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="border-2 border-black p-6 text-center">
                  <h3 className="font-black text-black mb-2 uppercase">Education</h3>
                  <p className="text-sm text-black mb-4 font-medium">Add your educational background.</p>
                  <button onClick={() => setIsPanelOpen(true)} className="text-black text-sm font-bold uppercase underline">Add Education</button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar (Career Goal) */}
        <aside className="lg:w-80 h-fit">
          <div className="bg-white border-2 border-black p-6 mb-6">
            <div className="bg-black border-2 border-black p-4 text-white mb-4">
              <h3 className="font-black mb-2 uppercase">Your Career Goal</h3>
              <p className="text-sm text-white mb-4 font-medium">
                Keep your preferences updated to get the best matches.
              </p>
            </div>
            <div className="space-y-4">
              <div>
                <span className="text-sm font-black text-black block mb-1 uppercase">Field of Interest</span>
                <div className="font-bold border-b-2 border-gray-100 pb-1">{user.fieldOfStudy || 'Not set'}</div>
              </div>
              <div>
                <span className="text-sm font-black text-black block mb-1 uppercase">Preferred Location</span>
                <div className="flex flex-wrap gap-1">
                  {user.preferredLocations?.length > 0 ? user.preferredLocations.map(l => (
                    <span key={l} className="text-xs bg-gray-100 px-2 py-1 font-bold">{l}</span>
                  )) : 'Not set'}
                </div>
              </div>
              <button
                onClick={() => setIsPanelOpen(true)}
                className="w-full py-2 bg-black text-white border-2 border-black font-black uppercase hover:bg-gray-800 transition-colors">
                Update Preferences
              </button>
            </div>
          </div>
        </aside>
      </div>

      {/* Edit Panel */}
      <EditProfilePanel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        initialData={user}
        onSave={handleProfileSave}
      />
    </div>
  );
};


export default Profile;