import React, { useState } from 'react';
import { FileText, Upload, Download, Clock } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';

const Resume = () => {
    const { user } = useOutletContext(); // Get user from layout
    const [uploading, setUploading] = useState(false);
    const [currentUser, setCurrentUser] = useState(user);

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('resume', file);

        setUploading(true);
        try {
            const res = await fetch('http://localhost:3000/api/auth/candidate/resume', {
                method: 'POST',
                headers: {
                    // 'Content-Type': 'multipart/form-data', // Do NOT set this manually with fetch, browser does it
                },
                credentials: 'include',
                body: formData
            });
            const data = await res.json();
            if (data.success) {
                setCurrentUser(data.user);
                alert('Resume uploaded successfully!');
            } else {
                alert(data.message || 'Upload failed');
            }
        } catch (error) {
            console.error('Upload error:', error);
            alert('Failed to upload resume');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="bg-white border-2 border-black p-6">
            <h1 className="text-2xl font-black uppercase mb-6 flex items-center gap-2">
                <FileText className="w-8 h-8" />
                Resume
            </h1>

            <div className="space-y-6">
                {/* Upload Section */}
                <div className="border-2 border-dashed border-black p-8 text-center bg-gray-50">
                    <input
                        type="file"
                        id="resume-upload"
                        className="hidden"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileUpload}
                        disabled={uploading}
                    />
                    <label
                        htmlFor="resume-upload"
                        className={`cursor-pointer inline-flex flex-col items-center justify-center ${uploading ? 'opacity-50' : 'hover:opacity-75'}`}
                    >
                        <div className="w-16 h-16 bg-black text-white flex items-center justify-center rounded-full mb-4">
                            <Upload className="w-8 h-8" />
                        </div>
                        <span className="text-lg font-bold uppercase mb-2">
                            {uploading ? 'Uploading...' : 'Upload New Resume'}
                        </span>
                        <span className="text-sm text-gray-500 font-medium">
                            Supported formats: PDF, DOC, DOCX (Max 5MB)
                        </span>
                    </label>
                </div>

                {/* Current Resume Display */}
                {currentUser?.resume?.url ? (
                    <div className="border-2 border-black p-6">
                        <h2 className="font-black text-lg uppercase mb-4">Current Resume</h2>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gray-100 border-2 border-black flex items-center justify-center">
                                    <FileText className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="font-bold text-lg">{currentUser.resume.filename || 'Resume.pdf'}</p>
                                    <p className="text-sm text-gray-500 font-medium flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        Uploaded on: {new Date(currentUser.resume.uploadedAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-3 w-full sm:w-auto">
                                <a
                                    href={`http://localhost:3000${currentUser.resume.url}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 sm:flex-none px-4 py-2 bg-black text-white border-2 border-black font-bold uppercase flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
                                >
                                    <Download className="w-4 h-4" />
                                    Download
                                </a>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="p-4 bg-yellow-50 border-2 border-black font-bold text-center">
                        No resume uploaded yet. Upload one to start applying!
                    </div>
                )}
            </div>
        </div>
    );
};

export default Resume;
