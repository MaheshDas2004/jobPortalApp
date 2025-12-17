import React, { useState } from 'react';
import { 
  Search, Bell, MessageSquare, Edit2, Share2, Eye, 
  Briefcase, FileText, Award, BookOpen, Settings, 
  LogOut, Users, Target, Bookmark, Clock, GraduationCap,
  Plus, ChevronRight, MapPin, Calendar, Code
} from 'lucide-react';

const Profile = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Mahesh Das',
    username: '@mahesdas1690',
    email: 'mahesh.das2205@gmail.com',
    university: 'lovely proffesional university',
    about: 'Currently pursuing my B.Tech in Engineering, I am eager to apply my foundational knowledge. While I am building my professional profile, I am keen on exploring various aspects of the industry. I am also looking forward to...',
    gpa: '8.11',
    fieldOfInterest: '',
    workLocation: ''
  });

  const [skills, setSkills] = useState([
    'HTML', 'Javascript', 'ReactJs', 'PHP', 'Data Structures and Algorithms',
    'Mathematical Proficiency', 'MySQL', 'REST API', 'Django', 
    'Tailwindcss', 'MERN Stack'
  ]);

  const [newSkill, setNewSkill] = useState('');

  const handleProfileUpdate = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleFormSubmit = () => {
    console.log('Profile Updated:', profileData);
    alert('Profile updated successfully!');
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-none mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <aside className="lg:w-64 bg-white border-2 border-black p-4 h-fit">
              <div className="flex items-center gap-3 mb-6 pb-6 border-b-2 border-black">
                <div className="w-12 h-12 bg-black border-2 border-black flex items-center justify-center text-white font-black">
                  {profileData.name.charAt(0)}{profileData.name.split(' ')[1]?.charAt(0) || ''}
                </div>
                <div>
                  <h3 className="font-black text-black">{profileData.name}</h3>
                  <p className="text-xs text-black font-bold">{profileData.email}</p>
                </div>
              </div>            <nav className="space-y-2">
              <div className="mb-4">
                <h4 className="text-xs font-black text-black mb-3 uppercase border-b border-black pb-1">Profile</h4>
                <div className="space-y-1">
                  <a href="#" className="flex items-center gap-3 px-3 py-2 text-black border-2 border-black font-bold text-sm">
                    <Users className="w-4 h-4" />
                    <span>View Profile</span>
                  </a>
                  <a href="#" className="flex items-center gap-3 px-3 py-2 text-black border-2 border-black font-bold text-sm">
                    <Edit2 className="w-4 h-4" />
                    <span>Edit Profile</span>
                  </a>
                  <a href="#" className="flex items-center gap-3 px-3 py-2 text-black border-2 border-black font-bold text-sm">
                    <FileText className="w-4 h-4" />
                    <span>Resume</span>
                  </a>
                </div>
              </div>
              
              <div className="mb-4">
                <h4 className="text-xs font-black text-black mb-3 uppercase border-b border-black pb-1">Jobs</h4>
                <div className="space-y-1">
                  <a href="#" className="flex items-center gap-3 px-3 py-2 text-black border-2 border-black font-bold text-sm">
                    <Briefcase className="w-4 h-4" />
                    <span>Applied Jobs</span>
                    <span className="ml-auto bg-black text-white text-xs px-2 py-0.5 font-black">5</span>
                  </a>
                  <a href="#" className="flex items-center gap-3 px-3 py-2 text-black border-2 border-black font-bold text-sm">
                    <Bookmark className="w-4 h-4" />
                    <span>Saved Jobs</span>
                    <span className="ml-auto bg-black text-white text-xs px-2 py-0.5 font-black">12</span>
                  </a>
                  <a href="#" className="flex items-center gap-3 px-3 py-2 text-black border-2 border-black font-bold text-sm">
                    <Search className="w-4 h-4" />
                    <span>Job Alerts</span>
                  </a>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-black text-black mb-3 uppercase border-b border-black pb-1">Activity</h4>
                <div className="space-y-1">
                  <a href="#" className="flex items-center gap-3 px-3 py-2 text-black border-2 border-black font-bold text-sm">
                    <MessageSquare className="w-4 h-4" />
                    <span>Messages</span>
                    <span className="ml-auto bg-black text-white text-xs px-2 py-0.5 font-black">3</span>
                  </a>
                  <a href="#" className="flex items-center gap-3 px-3 py-2 text-black border-2 border-black font-bold text-sm">
                    <Bell className="w-4 h-4" />
                    <span>Notifications</span>
                  </a>
                  <a href="#" className="flex items-center gap-3 px-3 py-2 text-black border-2 border-black font-bold text-sm">
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </a>
                </div>
              </div>
            </nav>

            <button className="w-full mt-6 px-4 py-2 border-2 border-black text-sm flex items-center justify-center gap-2 bg-black text-white font-black uppercase">
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Banner */}
            <div className="h-32 sm:h-40 relative overflow-hidden border-2 border-black">
              <img 
                src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=300&q=80" 
                alt="Profile Banner" 
                className="w-full h-full object-cover"
              />
              <button className="absolute top-4 right-4 p-2 bg-white border-2 border-black">
                <Edit2 className="w-4 h-4" />
              </button>
            </div>

            {/* Profile Card */}
            <div className="bg-white border-2 border-black p-4 sm:p-6 mt-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      {isEditing ? (
                        <>
                          <input 
                            type="text" 
                            value={profileData.name}
                            onChange={(e) => handleProfileUpdate('name', e.target.value)}
                            className="text-2xl font-black text-black border-2 border-black px-2 py-1 w-full mb-2"
                          />
                          <input 
                            type="text" 
                            value={profileData.username}
                            onChange={(e) => handleProfileUpdate('username', e.target.value)}
                            className="text-black font-bold border-2 border-black px-2 py-1 w-full mb-2"
                          />
                          <div className="flex items-center gap-2 mt-2 text-sm">
                            <GraduationCap className="w-4 h-4" />
                            <input 
                              type="text" 
                              value={profileData.university}
                              onChange={(e) => handleProfileUpdate('university', e.target.value)}
                              className="text-black font-bold border-2 border-black px-2 py-1 flex-1"
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <h1 className="text-2xl font-black text-black">{profileData.name}</h1>
                          <p className="text-black font-bold">{profileData.username}</p>
                          <div className="flex items-center gap-2 mt-2 text-sm text-black font-bold">
                            <GraduationCap className="w-4 h-4" />
                            <span>{profileData.university}</span>
                          </div>
                        </>
                      )}
                      <button className="flex items-center gap-2 text-black text-sm mt-2 font-bold">
                        <FileText className="w-4 h-4" />
                        Resume
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <button className="p-2 border-2 border-black">
                        <Share2 className="w-5 h-5" />
                      </button>
                      <button className="p-2 border-2 border-black">
                        <Eye className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => setIsEditing(!isEditing)}
                        className="px-4 py-2 bg-black text-white border-2 border-black flex items-center gap-2 font-black uppercase">
                        <Edit2 className="w-4 h-4" />
                        {isEditing ? 'Save Profile' : 'Edit Profile'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* About Section */}
              <div className="mt-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-black uppercase">About</h2>
                  <button className="text-black p-2 border-2 border-black">
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>
                {isEditing ? (
                  <textarea 
                    value={profileData.about}
                    onChange={(e) => handleProfileUpdate('about', e.target.value)}
                    className="w-full p-2 border-2 border-black text-black font-medium h-24 resize-none"
                    placeholder="Write about yourself..."
                  />
                ) : (
                  <>
                    <p className="text-black leading-relaxed font-medium">
                      {profileData.about}
                    </p>
                    <button className="text-black text-sm mt-2 font-bold">Read more</button>
                  </>
                )}
              </div>

              {/* Resume Section */}
              <div className="mt-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-black uppercase">Resume</h2>
                  <button className="text-black p-2 border-2 border-black">
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center gap-3 p-4 border-2 border-black cursor-pointer">
                  <div className="w-10 h-10 bg-black border-2 border-black flex items-center justify-center">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-black font-bold">Mahesh Das-resume</span>
                </div>
              </div>

              {/* Skills Section */}
              <div className="mt-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-black uppercase">Skills</h2>
                  <button className="text-black p-2 border-2 border-black">
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {skills.map((skill, index) => (
                    <span key={index} className="px-4 py-2 bg-white border-2 border-black text-black text-sm font-bold flex items-center gap-2">
                      {skill}
                      {isEditing && (
                        <button onClick={() => removeSkill(skill)} className="text-red-600 font-bold">
                          ×
                        </button>
                      )}
                    </span>
                  ))}
                </div>
                {isEditing && (
                  <div className="flex gap-2">
                    <input 
                      type="text"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      placeholder="Add new skill"
                      className="flex-1 px-3 py-2 border-2 border-black font-bold"
                      onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                    />
                    <button 
                      onClick={addSkill}
                      className="px-4 py-2 bg-black text-white border-2 border-black font-bold">
                      ADD
                    </button>
                  </div>
                )}
              </div>

              {/* Education Section */}
              <div className="mt-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-black uppercase">Education</h2>
                  <button className="text-black p-2 border-2 border-black">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex gap-4 p-4 border-2 border-black">
                  <div className="w-12 h-12 bg-black border-2 border-black flex items-center justify-center flex-shrink-0">
                    <span className="font-black text-white">LO</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-black text-black">lovely proffesional university</h3>
                    <p className="text-sm text-black font-medium mt-1">
                      B.E Student in Computer Science and Engineering at Lovely Professional University, commencing in 2023 and anticipated to conclude in 2027.
                    </p>
                    <p className="text-sm text-black font-medium mt-2">
                      This program equips me with a strong foundation in computer science principles.
                    </p>
                    <div className="flex items-center gap-4 mt-3 text-sm text-black font-bold">
                      <div className="flex items-center gap-1">
                        <GraduationCap className="w-4 h-4" />
                        <span>Graduation - Collaborative Architecture</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>Computer Science and Engineering</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>2023 - Present Full-time</span>
                      </div>
                    </div>
                    <div className="mt-3 text-sm">
                      <span className="font-black text-black">8.11</span>
                    </div>
                    <div className="mt-3 text-xs text-black">
                      <p className="font-black mb-1">Skills Acquired</p>
                      <p className="font-bold">C • C++ • HTML • TailwindCSS • Javascript • ReactJs • PHP • MySQL • Data Structures and Algorithms</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Empty States */}
              <div className="space-y-6 mt-8">
                {['Work Experience', 'Responsibilities', 'Certificate', 'Projects', 'Achievements'].map((section) => (
                  <div key={section} className="border-2 border-black p-6 text-center">
                    <div className="w-16 h-16 bg-black border-2 border-black mx-auto mb-4 flex items-center justify-center">
                      <Plus className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-black text-black mb-2 uppercase">{section}</h3>
                    <p className="text-sm text-black mb-4 font-medium">
                      {section === 'Work Experience' && 'Narrate your professional journey and fast-track your way to new career heights!'}
                      {section === 'Responsibilities' && "Please add the responsibilities you've undertaken to demonstrate your leadership and expertise!"}
                      {section === 'Certificate' && "Upload your certifications and show recruiters that you've a head ahead in your field!"}
                      {section === 'Projects' && 'Reveal your projects to the world and pave your path to professional greatness!'}
                      {section === 'Achievements' && 'Broadcast your triumphs and make a remarkable impression on industry leaders!'}
                    </p>
                    <button className="text-black text-sm font-bold uppercase">
                      Add {section}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </main>

          {/* Right Sidebar */}
          <aside className="lg:w-80">
            <div className="bg-white border-2 border-black p-6 mb-6">
              <div className="bg-black border-2 border-black p-4 text-white mb-4">
                <h3 className="font-black mb-2 uppercase">Create your Resume</h3>
                <p className="text-sm text-white mb-4 font-medium">
                  Career goals, ftw! In 12-15 months, where do you see yourself being a pro?
                </p>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-black text-black block mb-2 uppercase">Field of Interest</label>
                  <select 
                    value={profileData.fieldOfInterest}
                    onChange={(e) => handleProfileUpdate('fieldOfInterest', e.target.value)}
                    className="w-full px-3 py-2 border-2 border-black text-sm font-bold focus:bg-black focus:text-white">
                    <option value="">Select Your Field of Interest</option>
                    <option value="Software Development">Software Development</option>
                    <option value="Data Science">Data Science</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Product Management">Product Management</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-black text-black block mb-2 uppercase">Preferred Work Location</label>
                  <select 
                    value={profileData.workLocation}
                    onChange={(e) => handleProfileUpdate('workLocation', e.target.value)}
                    className="w-full px-3 py-2 border-2 border-black text-sm font-bold focus:bg-black focus:text-white">
                    <option value="">Select Location</option>
                    <option value="Remote">Remote</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Hyderabad">Hyderabad</option>
                  </select>
                </div>
                <button 
                  onClick={handleFormSubmit}
                  className="w-full py-2 bg-black text-white border-2 border-black font-black uppercase">
                  Save Preferences
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Profile;