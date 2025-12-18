
import React, { useState, useEffect } from 'react';
import {
    User, Mail, Phone, MapPin, Briefcase, GraduationCap,
    Calendar, Upload, Save, Code, Link as LinkIcon,
    Github, Linkedin, Globe, Plus, X, Camera, X as CloseIcon,
    Check
} from 'lucide-react';

const EditProfilePanel = ({ isOpen, onClose, initialData, onSave }) => {
    // Initialize with defaults or initialData
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        bio: '',
        currentJobTitle: '',
        currentCompany: '',
        currentLocation: '',
        yearsOfExperience: '',
        skills: [],
        languages: [],
        educationDetails: [],
        experienceDetails: [],
        socialLinks: [],
        preferredLocations: [],
        ...initialData // Override with actual data
    });

    const [activeSection, setActiveSection] = useState('personal');
    const [isSaving, setIsSaving] = useState(false);

    // Update formData when initialData changes
    useEffect(() => {
        if (initialData) {
            setFormData(prev => ({ ...prev, ...initialData }));
        }
    }, [initialData]);

    if (!isOpen) return null;

    const sections = [
        { id: 'personal', name: 'Personal', icon: User },
        { id: 'professional', name: 'Professional', icon: Briefcase },
        { id: 'education', name: 'Education', icon: GraduationCap },
        { id: 'skills', name: 'Skills', icon: Code },
        { id: 'social', name: 'Social', icon: LinkIcon },
    ];

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    // Helper for arrays (skills, languages)
    const addArrayItem = (field, item) => {
        if (item && !formData[field].includes(item)) {
            setFormData(prev => ({ ...prev, [field]: [...prev[field], item] }));
        }
    };

    const removeArrayItem = (field, item) => {
        setFormData(prev => ({ ...prev, [field]: prev[field].filter(i => i !== item) }));
    };

    // Helper for complex arrays (educationDetails, experienceDetails)
    const addComplexItem = (field, item) => {
        setFormData(prev => ({ ...prev, [field]: [...(prev[field] || []), item] }));
    };

    const removeComplexItem = (field, index) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].filter((_, i) => i !== index)
        }));
    };

    const updateComplexItem = (field, index, subField, value) => {
        setFormData(prev => {
            const newArray = [...(prev[field] || [])];
            newArray[index] = { ...newArray[index], [subField]: value };
            return { ...prev, [field]: newArray };
        });
    };

    const handleSubmit = async () => {
        setIsSaving(true);
        try {
            await onSave(formData);
            onClose();
        } catch (error) {
            console.error("Failed to save", error);
        } finally {
            setIsSaving(false);
        }
    };

    // Render Helpers
    const renderBackdrop = () => (
        <div
            className="fixed inset-0 bg-black/50 z-40 transition-opacity"
            onClick={onClose}
        />
    );

    return (
        <>
            {renderBackdrop()}
            <div className={`fixed top-0 right-0 h-full w-full sm:w-[500px] md:w-[600px] bg-white z-50 shadow-2xl overflow-y-auto transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                {/* Header */}
                <div className="sticky top-0 bg-white z-10 border-b-2 border-black p-4 flex items-center justify-between">
                    <h2 className="text-xl font-black uppercase">Edit Profile</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-6 pb-24">
                    {/* Tabs */}
                    <div className="flex gap-2 overflow-x-auto pb-4 mb-6 border-b border-gray-200">
                        {sections.map(section => {
                            const Icon = section.icon;
                            return (
                                <button
                                    key={section.id}
                                    onClick={() => setActiveSection(section.id)}
                                    className={`flex items-center gap-2 px-4 py-2 text-sm font-bold whitespace-nowrap border-2 transition-colors ${activeSection === section.id
                                            ? 'bg-black text-white border-black'
                                            : 'bg-white text-black border-gray-200 hover:border-black'
                                        }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    {section.name}
                                </button>
                            );
                        })}
                    </div>

                    {/* Content */}
                    <div className="space-y-6">
                        {activeSection === 'personal' && (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-black uppercase mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        value={formData.fullName || ''}
                                        onChange={e => handleInputChange('fullName', e.target.value)}
                                        className="w-full p-2 border-2 border-black font-bold"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-black uppercase mb-1">Bio</label>
                                    <textarea
                                        value={formData.bio || ''}
                                        onChange={e => handleInputChange('bio', e.target.value)}
                                        className="w-full p-2 border-2 border-black font-medium min-h-[100px]"
                                        placeholder="Tell us about yourself..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-black uppercase mb-1">Location</label>
                                    <input
                                        type="text"
                                        value={formData.currentLocation || ''}
                                        onChange={e => handleInputChange('currentLocation', e.target.value)}
                                        className="w-full p-2 border-2 border-black font-bold"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-black uppercase mb-1">Phone</label>
                                    <input
                                        type="text"
                                        value={formData.phone || ''}
                                        onChange={e => handleInputChange('phone', e.target.value)}
                                        className="w-full p-2 border-2 border-black font-bold"
                                    />
                                </div>
                            </div>
                        )}

                        {activeSection === 'professional' && (
                            <div className="space-y-6">
                                {/* Current Role */}
                                <div className="p-4 border-2 border-gray-100 bg-gray-50">
                                    <h3 className="font-black uppercase mb-3 text-sm">Current Role</h3>
                                    <div className="grid grid-cols-1 gap-4">
                                        <div>
                                            <label className="block text-xs font-black uppercase mb-1">Job Title</label>
                                            <input
                                                type="text"
                                                value={formData.currentJobTitle || ''}
                                                onChange={e => handleInputChange('currentJobTitle', e.target.value)}
                                                className="w-full p-2 border-2 border-black font-bold"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-black uppercase mb-1">Company</label>
                                            <input
                                                type="text"
                                                value={formData.currentCompany || ''}
                                                onChange={e => handleInputChange('currentCompany', e.target.value)}
                                                className="w-full p-2 border-2 border-black font-bold"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-black uppercase mb-1">Years of Exp</label>
                                            <input
                                                type="text"
                                                value={formData.yearsOfExperience || ''}
                                                onChange={e => handleInputChange('yearsOfExperience', e.target.value)}
                                                className="w-full p-2 border-2 border-black font-bold"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Experience Array */}
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="font-black uppercase text-sm">Detailed Experience</h3>
                                        <button
                                            onClick={() => addComplexItem('experienceDetails', { title: '', company: '', startDate: '', endDate: '', description: '' })}
                                            className="text-xs bg-black text-white px-2 py-1 font-bold flex items-center gap-1"
                                        >
                                            <Plus className="w-3 h-3" /> Add
                                        </button>
                                    </div>
                                    {formData.experienceDetails?.map((exp, index) => (
                                        <div key={index} className="mb-4 p-4 border-2 border-black relative">
                                            <button
                                                onClick={() => removeComplexItem('experienceDetails', index)}
                                                className="absolute top-2 right-2 p-1 hover:bg-gray-100"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                            <div className="space-y-3">
                                                <input
                                                    placeholder="Job Title"
                                                    value={exp.title || ''}
                                                    onChange={e => updateComplexItem('experienceDetails', index, 'title', e.target.value)}
                                                    className="w-full p-2 border border-black font-bold text-sm"
                                                />
                                                <input
                                                    placeholder="Company"
                                                    value={exp.company || ''}
                                                    onChange={e => updateComplexItem('experienceDetails', index, 'company', e.target.value)}
                                                    className="w-full p-2 border border-black text-sm"
                                                />
                                                <div className="grid grid-cols-2 gap-2">
                                                    <input
                                                        type="date"
                                                        value={exp.startDate ? exp.startDate.split('T')[0] : ''}
                                                        onChange={e => updateComplexItem('experienceDetails', index, 'startDate', e.target.value)}
                                                        className="w-full p-2 border border-black text-sm"
                                                    />
                                                    <input
                                                        type="date"
                                                        value={exp.endDate ? exp.endDate.split('T')[0] : ''}
                                                        onChange={e => updateComplexItem('experienceDetails', index, 'endDate', e.target.value)}
                                                        className="w-full p-2 border border-black text-sm"
                                                    />
                                                </div>
                                                <textarea
                                                    placeholder="Description"
                                                    value={exp.description || ''}
                                                    onChange={e => updateComplexItem('experienceDetails', index, 'description', e.target.value)}
                                                    className="w-full p-2 border border-black text-sm"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeSection === 'education' && (
                            <div className="space-y-6">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="font-black uppercase text-sm">Education History</h3>
                                    <button
                                        onClick={() => addComplexItem('educationDetails', { institution: '', level: '', fieldOfStudy: '', year: '' })}
                                        className="text-xs bg-black text-white px-2 py-1 font-bold flex items-center gap-1"
                                    >
                                        <Plus className="w-3 h-3" /> Add
                                    </button>
                                </div>
                                {formData.educationDetails?.map((edu, index) => (
                                    <div key={index} className="mb-4 p-4 border-2 border-black relative">
                                        <button
                                            onClick={() => removeComplexItem('educationDetails', index)}
                                            className="absolute top-2 right-2 p-1 hover:bg-gray-100"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                        <div className="space-y-3">
                                            <input
                                                placeholder="Institution / School"
                                                value={edu.institution || ''}
                                                onChange={e => updateComplexItem('educationDetails', index, 'institution', e.target.value)}
                                                className="w-full p-2 border border-black font-bold text-sm"
                                            />
                                            <div className="grid grid-cols-2 gap-2">
                                                <input
                                                    placeholder="Level (e.g. B.Tech)"
                                                    value={edu.level || ''}
                                                    onChange={e => updateComplexItem('educationDetails', index, 'level', e.target.value)}
                                                    className="w-full p-2 border border-black text-sm"
                                                />
                                                <input
                                                    placeholder="Year"
                                                    value={edu.year || ''}
                                                    onChange={e => updateComplexItem('educationDetails', index, 'year', e.target.value)}
                                                    className="w-full p-2 border border-black text-sm"
                                                />
                                            </div>
                                            <input
                                                placeholder="Field of Study"
                                                value={edu.fieldOfStudy || ''}
                                                onChange={e => updateComplexItem('educationDetails', index, 'fieldOfStudy', e.target.value)}
                                                className="w-full p-2 border border-black text-sm"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeSection === 'skills' && (
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-black uppercase mb-2">Skills</label>
                                    <div className="flex gap-2 mb-4">
                                        <input
                                            id="skill-input"
                                            type="text"
                                            placeholder="Add a skill"
                                            className="flex-1 p-2 border-2 border-black"
                                            onKeyPress={e => {
                                                if (e.key === 'Enter') {
                                                    addArrayItem('skills', e.target.value);
                                                    e.target.value = '';
                                                }
                                            }}
                                        />
                                        <button
                                            onClick={() => {
                                                const input = document.getElementById('skill-input');
                                                addArrayItem('skills', input.value);
                                                input.value = '';
                                            }}
                                            className="bg-black text-white px-4 font-bold uppercase"
                                        >
                                            Add
                                        </button>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {formData.skills?.map((skill, i) => (
                                            <span key={i} className="bg-gray-100 border border-black px-3 py-1 font-bold text-sm flex items-center gap-2">
                                                {skill}
                                                <button onClick={() => removeArrayItem('skills', skill)}><X className="w-3 h-3" /></button>
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-black uppercase mb-2">Languages</label>
                                    <div className="flex gap-2 mb-4">
                                        <input
                                            id="lang-input"
                                            type="text"
                                            placeholder="Add a language"
                                            className="flex-1 p-2 border-2 border-black"
                                            onKeyPress={e => {
                                                if (e.key === 'Enter') {
                                                    addArrayItem('languages', e.target.value);
                                                    e.target.value = '';
                                                }
                                            }}
                                        />
                                        <button
                                            onClick={() => {
                                                const input = document.getElementById('lang-input');
                                                addArrayItem('languages', input.value);
                                                input.value = '';
                                            }}
                                            className="bg-black text-white px-4 font-bold uppercase"
                                        >
                                            Add
                                        </button>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {formData.languages?.map((lang, i) => (
                                            <span key={i} className="bg-gray-100 border border-black px-3 py-1 font-bold text-sm flex items-center gap-2">
                                                {lang}
                                                <button onClick={() => removeArrayItem('languages', lang)}><X className="w-3 h-3" /></button>
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeSection === 'social' && (
                            <div className="space-y-6">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="font-black uppercase text-sm">Social Links</h3>
                                    <button
                                        onClick={() => addComplexItem('socialLinks', { platform: '', url: '' })}
                                        className="text-xs bg-black text-white px-2 py-1 font-bold flex items-center gap-1"
                                    >
                                        <Plus className="w-3 h-3" /> Add
                                    </button>
                                </div>
                                {formData.socialLinks?.map((link, index) => (
                                    <div key={index} className="mb-4 p-4 border-2 border-black relative bg-gray-50/50">
                                        <button
                                            onClick={() => removeComplexItem('socialLinks', index)}
                                            className="absolute top-2 right-2 p-1 hover:bg-gray-100"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                        <div className="grid grid-cols-1 gap-2">
                                            <select
                                                value={link.platform || ''}
                                                onChange={e => updateComplexItem('socialLinks', index, 'platform', e.target.value)}
                                                className="w-full p-2 border border-black font-bold text-sm"
                                            >
                                                <option value="">Select Platform</option>
                                                <option value="LinkedIn">LinkedIn</option>
                                                <option value="GitHub">GitHub</option>
                                                <option value="Twitter">Twitter</option>
                                                <option value="Portfolio">Portfolio</option>
                                                <option value="Other">Other</option>
                                            </select>
                                            <input
                                                placeholder="URL"
                                                value={link.url || ''}
                                                onChange={e => updateComplexItem('socialLinks', index, 'url', e.target.value)}
                                                className="w-full p-2 border border-black text-sm"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="absolute bottom-0 left-0 w-full bg-white border-t-2 border-black p-4 flex gap-4 justify-end z-10">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 border-2 border-black font-black uppercase text-sm hover:bg-gray-100"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={isSaving}
                        className="px-6 py-2 bg-black text-white border-2 border-black font-black uppercase text-sm hover:bg-gray-800 disabled:opacity-50 flex items-center gap-2"
                    >
                        {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </div>
        </>
    );
};

export default EditProfilePanel;
