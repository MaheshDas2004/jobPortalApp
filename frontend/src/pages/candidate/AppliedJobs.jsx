import React, { useState, useEffect } from 'react';
import { Briefcase, MapPin, Calendar, Building } from 'lucide-react';

const AppliedJobs = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAppliedJobs = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/auth/candidate/applied-jobs', { credentials: 'include' });
                const data = await res.json();
                if (data.success) {
                    setApplications(data.applications);
                }
            } catch (error) {
                console.error("Fetch applied jobs error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAppliedJobs();
    }, []);

    if (loading) return <div className="p-8 font-black text-xl text-center">LOADING...</div>;

    return (
        <div className="bg-white border-2 border-black p-6 min-h-[50vh]">
            <h1 className="text-2xl font-black uppercase mb-6 flex items-center gap-2">
                <Briefcase className="w-8 h-8" />
                Applied Jobs ({applications.length})
            </h1>

            {applications.length > 0 ? (
                <div className="space-y-4">
                    {applications.map((app) => (
                        <div key={app._id} className="border-2 border-black p-4 hover:bg-gray-50 transition-colors">
                            <div className="flex flex-col sm:flex-row justify-between gap-4">
                                <div>
                                    <h2 className="text-xl font-black uppercase mb-1">{app.jobId?.jobTitle || 'Unknown Job'}</h2>
                                    <div className="flex flex-wrap items-center gap-4 text-sm font-bold text-gray-700 mb-2">
                                        <span className="flex items-center gap-1">
                                            <Building className="w-4 h-4" />
                                            {app.jobId?.company}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <MapPin className="w-4 h-4" />
                                            {app.jobId?.location}
                                        </span>
                                    </div>
                                    <div className="inline-block px-2 py-1 bg-black text-white text-xs font-bold uppercase">
                                        Status: {app.status}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs font-bold text-gray-500 flex items-center justify-end gap-1">
                                        <Calendar className="w-3 h-3" />
                                        Applied: {new Date(app.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 border-2 border-dashed border-black">
                    <Briefcase className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <h3 className="font-black text-xl uppercase mb-2">No Applications Yet</h3>
                    <p className="text-gray-600 font-medium">Start exploring jobs and apply to your dream roles!</p>
                </div>
            )}
        </div>
    );
};

export default AppliedJobs;
