
import React, { useState, useEffect } from 'react';
import {
    User, Mail, Phone, MapPin, Briefcase, GraduationCap,
    Calendar, Upload, Save, Code, Link as LinkIcon,
    Github, Linkedin, Globe, Plus, X, Camera, X as CloseIcon,
    Check,
    Link2Icon
} from 'lucide-react';

// TagInput component for skills and languages
const TagInput = ({ label, items = [], onAdd, onRemove, placeholder }) => {
    const [value, setValue] = React.useState('');

    const handleAdd = () => {
        const trimmed = value.trim();
        if (!trimmed || items.includes(trimmed)) return;
        onAdd(trimmed);
        setValue('');
    };

    return (
        <div className="space-y-3">
            <label className="block text-sm font-black uppercase">
                {label}
            </label>

            <div className="flex gap-2">
                <input
                    type="text"
                    value={value}
                    placeholder={placeholder}
                    onChange={e => setValue(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleAdd()}
                    className="flex-1 p-2 border-2 border-black font-medium"
                />
                <button
                    onClick={handleAdd}
                    className="px-4 py-2 bg-black text-white font-black uppercase text-sm hover:bg-gray-800"
                >
                    Add
                </button>
            </div>

            {items.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {items.map((item, i) => (
                        <span
                            key={i}
                            className="flex items-center gap-2 px-3 py-1 border-2 border-black bg-gray-100 font-bold text-sm"
                        >
                            {item}
                            <button
                                onClick={() => onRemove(item)}
                                className="hover:text-red-600"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </span>
                    ))}
                </div>
            )}

            <p className="text-xs text-gray-500">
                Press Enter or click Add
            </p>
        </div>
    );
};

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

    // Lock body scroll when panel is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const sections = [
        { id: 'personal', name: 'Personal', icon: User },
        { id: 'experience', name: 'Experience', icon: Briefcase },
        { id: 'education', name: 'Education', icon: GraduationCap },
        { id: 'skills', name: 'Skills', icon: Code },
        { id: 'social', name: 'Social', icon: LinkIcon },
        { id: 'preferences', name: 'Preferences', icon: LinkIcon },
    ];

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleArrayChange = (field, value) => {
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
            className="fixed inset-0 bg-black/50 z-[60] transition-opacity"
            onClick={onClose}
        />
    );

    return (
        <>
            {renderBackdrop()}
            <div className={`fixed top-0 right-0 h-full w-[60vw] bg-white z-[70] shadow-2xl overflow-y-auto transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
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
                            <div className="space-y-6">
                                {/* Profile Photo */}
                                <div>
                                    <label className="block text-sm font-black uppercase mb-3">
                                        Profile Photo
                                    </label>

                                    <div className="flex items-center gap-6">
                                        {/* Preview */}
                                        <div className="w-32 h-32 border-2 border-black rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
                                            {formData.profilePhoto ? (
                                                <img
                                                    src={formData.profilePhoto}
                                                    alt="Profile"
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <span className="text-xs font-bold text-gray-500 text-center px-2">
                                                    No Photo
                                                </span>
                                            )}
                                        </div>

                                        {/* Upload Button */}
                                        <div>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                id="profilePhotoInput"
                                                className="hidden"
                                                onChange={(e) => {
                                                    const file = e.target.files[0];
                                                    if (!file) return;

                                                    const reader = new FileReader();
                                                    reader.onloadend = () => {
                                                        handleInputChange('profilePhoto', reader.result);
                                                    };
                                                    reader.readAsDataURL(file);
                                                }}
                                            />

                                            <label
                                                htmlFor="profilePhotoInput"
                                                className="inline-block px-4 py-2 border-2 border-black font-black uppercase text-sm cursor-pointer hover:bg-gray-100"
                                            >
                                                {formData.profilePhoto ? 'Change Photo' : 'Upload Photo'}
                                            </label>

                                            <p className="text-xs text-gray-500 mt-1">
                                                JPG, PNG • Max 2MB
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Info Fields */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Full Name */}
                                    <div>
                                        <label className="block text-sm font-black uppercase mb-1">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.fullName || ''}
                                            onChange={e => handleInputChange('fullName', e.target.value)}
                                            className="w-full p-2 border-2 border-black font-bold"
                                        />
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="block text-sm font-black uppercase mb-1">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            value={formData.email || ''}
                                            disabled
                                            className="w-full p-2 border-2 border-black font-bold bg-gray-200 text-gray-600 cursor-not-allowed"
                                        />
                                    </div>

                                    {/* Phone */}
                                    <div>
                                        <label className="block text-sm font-black uppercase mb-1">
                                            Phone
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.phone || ''}
                                            onChange={e => handleInputChange('phone', e.target.value)}
                                            className="w-full p-2 border-2 border-black font-bold"
                                        />
                                    </div>

                                    {/* Location */}
                                    <div>
                                        <label className="block text-sm font-black uppercase mb-1">
                                            Location
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.currentLocation || ''}
                                            onChange={e => handleInputChange('currentLocation', e.target.value)}
                                            className="w-full p-2 border-2 border-black font-bold"
                                        />
                                    </div>
                                </div>

                                {/* Bio */}
                                <div>
                                    <label className="block text-sm font-black uppercase mb-1">
                                        Bio
                                    </label>
                                    <textarea
                                        value={formData.bio || ''}
                                        onChange={e => handleInputChange('bio', e.target.value)}
                                        className="w-full p-2 border-2 border-black font-medium min-h-[120px]"
                                        placeholder="Tell us about yourself..."
                                    />
                                </div>
                            </div>
                        )}


                        {activeSection === 'experience' && (
                            <div className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <h3 className="font-black uppercase text-sm">Experience</h3>
                                    <button
                                        onClick={() =>
                                            addComplexItem('experienceDetails', {
                                                title: '',
                                                company: '',
                                                startDate: '',
                                                endDate: '',
                                                description: '',
                                                isCurrent: false,
                                            })
                                        }
                                        className="text-xs bg-black text-white px-3 py-1 font-bold flex items-center gap-1"
                                    >
                                        <Plus className="w-3 h-3" /> Add Experience
                                    </button>
                                </div>

                                {formData.experienceDetails?.map((exp, index) => (
                                    <div
                                        key={index}
                                        className="relative p-5 border-2 border-black bg-gray-50/60 space-y-4"
                                    >
                                        {/* Remove */}
                                        <button
                                            onClick={() => removeComplexItem('experienceDetails', index)}
                                            className="absolute top-3 right-3 p-1 hover:bg-gray-200"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>

                                        {/* Job Title */}
                                        <div>
                                            <label className="block text-xs font-black uppercase mb-1">
                                                Job Title
                                            </label>
                                            <input
                                                value={exp.title || ''}
                                                onChange={e =>
                                                    updateComplexItem('experienceDetails', index, 'title', e.target.value)
                                                }
                                                placeholder="e.g. Frontend Developer"
                                                className="w-full p-2 border-2 border-black font-bold text-sm"
                                            />
                                        </div>

                                        {/* Company */}
                                        <div>
                                            <label className="block text-xs font-black uppercase mb-1">
                                                Company
                                            </label>
                                            <input
                                                value={exp.company || ''}
                                                onChange={e =>
                                                    updateComplexItem('experienceDetails', index, 'company', e.target.value)
                                                }
                                                placeholder="Company Name"
                                                className="w-full p-2 border-2 border-black text-sm"
                                            />
                                        </div>

                                        {/* Dates */}
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-xs font-black uppercase mb-1">
                                                    Start Date
                                                </label>
                                                <input
                                                    type="date"
                                                    value={exp.startDate ? exp.startDate.split('T')[0] : ''}
                                                    onChange={e =>
                                                        updateComplexItem('experienceDetails', index, 'startDate', e.target.value)
                                                    }
                                                    className="w-full p-2 border-2 border-black text-sm"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-xs font-black uppercase mb-1">
                                                    End Date
                                                </label>
                                                <input
                                                    type="date"
                                                    disabled={exp.isCurrent}
                                                    value={
                                                        exp.isCurrent
                                                            ? ''
                                                            : exp.endDate
                                                                ? exp.endDate.split('T')[0]
                                                                : ''
                                                    }
                                                    onChange={e =>
                                                        updateComplexItem('experienceDetails', index, 'endDate', e.target.value)
                                                    }
                                                    className="w-full p-2 border-2 border-black text-sm disabled:bg-gray-200 disabled:cursor-not-allowed"
                                                />
                                            </div>
                                        </div>

                                        {/* Current Job Toggle */}
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={exp.isCurrent || false}
                                                onChange={e =>
                                                    updateComplexItem(
                                                        'experienceDetails',
                                                        index,
                                                        'isCurrent',
                                                        e.target.checked
                                                    )
                                                }
                                                className="w-4 h-4 border-2 border-black"
                                            />
                                            <span className="text-sm font-bold">
                                                I currently work here
                                            </span>
                                        </div>

                                        {/* Description */}
                                        <div>
                                            <label className="block text-xs font-black uppercase mb-1">
                                                Description
                                            </label>
                                            <textarea
                                                value={exp.description || ''}
                                                onChange={e =>
                                                    updateComplexItem(
                                                        'experienceDetails',
                                                        index,
                                                        'description',
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Describe your role, responsibilities, achievements, tools, impact, etc."
                                                className="w-full p-2 border-2 border-black text-sm min-h-[110px]"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                        )}

                        {activeSection === 'education' && (
                            <div className="space-y-6">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="font-black uppercase text-sm">Education History</h3>
                                    <button
                                        onClick={() =>
                                            addComplexItem('educationDetails', {
                                                institution: '',
                                                level: '',
                                                fieldOfStudy: '',
                                                startYear: '',
                                                endYear: '',
                                                grade: '',
                                                location: '',
                                            })
                                        }
                                        className="text-xs bg-black text-white px-2 py-1 font-bold flex items-center gap-1"
                                    >
                                        <Plus className="w-3 h-3" /> Add
                                    </button>
                                </div>

                                {formData.educationDetails?.map((edu, index) => (
                                    <div
                                        key={index}
                                        className="mb-4 p-4 border-2 border-black relative bg-gray-50/50"
                                    >
                                        <button
                                            onClick={() => removeComplexItem('educationDetails', index)}
                                            className="absolute top-2 right-2 p-1 hover:bg-gray-100"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>

                                        <div className="space-y-4">
                                            {/* Institution */}
                                            <div>
                                                <label className="block text-xs font-black uppercase mb-1">
                                                    Institution / School
                                                </label>
                                                <input
                                                    value={edu.institution || ''}
                                                    onChange={e =>
                                                        updateComplexItem(
                                                            'educationDetails',
                                                            index,
                                                            'institution',
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full p-2 border border-black font-bold text-sm"
                                                />
                                            </div>

                                            {/* Degree & Field */}
                                            <div className="grid grid-cols-2 gap-3">
                                                <div>
                                                    <label className="block text-xs font-black uppercase mb-1">
                                                        Degree / Level
                                                    </label>
                                                    <input
                                                        value={edu.level || ''}
                                                        onChange={e =>
                                                            updateComplexItem(
                                                                'educationDetails',
                                                                index,
                                                                'level',
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="e.g. B.Tech, M.Sc"
                                                        className="w-full p-2 border border-black text-sm"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-xs font-black uppercase mb-1">
                                                        Field of Study
                                                    </label>
                                                    <input
                                                        value={edu.fieldOfStudy || ''}
                                                        onChange={e =>
                                                            updateComplexItem(
                                                                'educationDetails',
                                                                index,
                                                                'fieldOfStudy',
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="e.g. Computer Science"
                                                        className="w-full p-2 border border-black text-sm"
                                                    />
                                                </div>
                                            </div>

                                            {/* Years */}
                                            <div className="grid grid-cols-2 gap-3">
                                                <div>
                                                    <label className="block text-xs font-black uppercase mb-1">
                                                        Start Year
                                                    </label>
                                                    <input
                                                        value={edu.startYear || ''}
                                                        onChange={e =>
                                                            updateComplexItem(
                                                                'educationDetails',
                                                                index,
                                                                'startYear',
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="e.g. 2019"
                                                        className="w-full p-2 border border-black text-sm"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-xs font-black uppercase mb-1">
                                                        End Year
                                                    </label>
                                                    <input
                                                        value={edu.endYear || ''}
                                                        onChange={e =>
                                                            updateComplexItem(
                                                                'educationDetails',
                                                                index,
                                                                'endYear',
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="e.g. 2023 / Present"
                                                        className="w-full p-2 border border-black text-sm"
                                                    />
                                                </div>
                                            </div>

                                            {/* Grade & Location */}
                                            <div className="grid grid-cols-2 gap-3">
                                                <div>
                                                    <label className="block text-xs font-black uppercase mb-1">
                                                        Grade / CGPA
                                                    </label>
                                                    <input
                                                        value={edu.grade || ''}
                                                        onChange={e =>
                                                            updateComplexItem(
                                                                'educationDetails',
                                                                index,
                                                                'grade',
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="e.g. 8.2 CGPA"
                                                        className="w-full p-2 border border-black text-sm"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-xs font-black uppercase mb-1">
                                                        Location
                                                    </label>
                                                    <input
                                                        value={edu.location || ''}
                                                        onChange={e =>
                                                            updateComplexItem(
                                                                'educationDetails',
                                                                index,
                                                                'location',
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="City, Country"
                                                        className="w-full p-2 border border-black text-sm"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        )}

                        {activeSection === 'skills' && (
                            <div className="space-y-6">
                                <TagInput
                                    label="Skills"
                                    items={formData.skills || []}
                                    onAdd={(item) => addArrayItem('skills', item)}
                                    onRemove={(item) => removeArrayItem('skills', item)}
                                    placeholder="e.g. React, JavaScript, Node.js"
                                />
                                <TagInput
                                    label="Languages"
                                    items={formData.languages || []}
                                    onAdd={(item) => addArrayItem('languages', item)}
                                    onRemove={(item) => removeArrayItem('languages', item)}
                                    placeholder="e.g. English, Hindi"
                                />
                            </div>
                        )}

                        {activeSection === 'social' && (
                            <div className="space-y-6">
                                <h3 className="font-black uppercase text-sm mb-2">Social Links</h3>

                                {['LinkedIn', 'GitHub', 'Twitter', 'Portfolio', 'Other'].map((platform) => {
                                    const existingIndex = formData.socialLinks?.findIndex(
                                        (link) => link.platform === platform
                                    );

                                    const existingLink =
                                        existingIndex !== -1 ? formData.socialLinks[existingIndex] : null;

                                    return (
                                        <div
                                            key={platform}
                                            className="flex items-center gap-2 p-3 border-2 border-black bg-gray-50/50"
                                        >
                                            <div className="w-28 font-bold text-sm">
                                                {platform}
                                            </div>

                                            <input
                                                placeholder={`${platform} URL`}
                                                value={existingLink?.url || ''}
                                                onChange={(e) => {
                                                    if (existingIndex === -1) {
                                                        addComplexItem('socialLinks', {
                                                            platform,
                                                            url: e.target.value,
                                                        });
                                                    } else {
                                                        updateComplexItem(
                                                            'socialLinks',
                                                            existingIndex,
                                                            'url',
                                                            e.target.value
                                                        );
                                                    }
                                                }}
                                                className="flex-1 p-2 border border-black text-sm"
                                            />

                                            {existingIndex === -1 ? (
                                                <button
                                                    onClick={() =>
                                                        addComplexItem('socialLinks', {
                                                            platform,
                                                            url: '',
                                                        })
                                                    }
                                                    className="p-2 border-2 border-black bg-black text-white hover:bg-gray-800"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() =>
                                                        removeComplexItem('socialLinks', existingIndex)
                                                    }
                                                    className="p-2 border-2 border-black hover:bg-gray-100"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                        {activeSection === 'preferences' && (
                            <div className="space-y-8">
                                {/* Preferred Job Roles */}
                                <TagInput
                                    label="Preferred Job Roles"
                                    items={formData.preferredRoles || []}
                                    onAdd={(item) => addArrayItem('preferredRoles', item)}
                                    onRemove={(item) => removeArrayItem('preferredRoles', item)}
                                    placeholder="e.g. Frontend Developer, Backend Engineer"
                                />

                                {/* Preferred Job Areas / Domains */}
                                <TagInput
                                    label="Preferred Job Areas"
                                    items={formData.preferredAreas || []}
                                    onAdd={(item) => addArrayItem('preferredAreas', item)}
                                    onRemove={(item) => removeArrayItem('preferredAreas', item)}
                                    placeholder="e.g. Web Development, Data Science"
                                />

                                {/* Preferred Locations */}
                                <TagInput
                                    label="Preferred Locations"
                                    items={formData.preferredLocations || []}
                                    onAdd={(item) => addArrayItem('preferredLocations', item)}
                                    onRemove={(item) => removeArrayItem('preferredLocations', item)}
                                    placeholder="e.g. Bangalore, Remote, Delhi NCR"
                                />

                                {/* Expected Package */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-black uppercase">
                                        Expected Package (CTC)
                                    </label>

                                    <select
                                        value={formData.expectedPackage || ''}
                                        onChange={e =>
                                            handleInputChange('expectedPackage', e.target.value)
                                        }
                                        className="w-1/2 p-2 border-2 border-black font-bold bg-white"
                                    >
                                        <option value="">Select Expected Package</option>
                                        <option value="Below 3 LPA">Below 3 LPA</option>
                                        <option value="3–5 LPA">3–5 LPA</option>
                                        <option value="5–8 LPA">5–8 LPA</option>
                                        <option value="8–12 LPA">8–12 LPA</option>
                                        <option value="12–20 LPA">12–20 LPA</option>
                                        <option value="20+ LPA">20+ LPA</option>
                                        <option value="Negotiable">Negotiable</option>
                                    </select>

                                    <p className="text-xs text-gray-500">
                                        This helps recruiters match suitable roles
                                    </p>
                                </div>
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
