import React, { useState, useEffect } from 'react';
import { Bookmark, MapPin, Building, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const SavedJobs = () => {
    const [savedJobs, setSavedJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSavedJobs = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/auth/candidate/saved-jobs', { credentials: 'include' });
                const data = await res.json();
                if (data.success) {
                    setSavedJobs(data.savedJobs);
                }
            } catch (error) {
                console.error("Fetch saved jobs error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSavedJobs();
    }, []);

    if (loading) return <div className="p-8 font-black text-xl text-center">LOADING...</div>;

    return (
        <div className="bg-white border-2 border-black p-6 min-h-[50vh]">
            <h1 className="text-2xl font-black uppercase mb-6 flex items-center gap-2">
                <Bookmark className="w-8 h-8" />
                Saved Jobs ({savedJobs.length})
            </h1>

            {savedJobs.length > 0 ? (
                <div className="space-y-4">
                    {savedJobs.map((job) => (
                        <div key={job._id} className="border-2 border-black p-4 relative hover:bg-gray-50 transition-colors">
                            <div className="pr-10">
                                <Link to={`/jobs/${job._id}`} className="block group">
                                    <h2 className="text-xl font-black uppercase mb-1 group-hover:underline">{job.jobTitle}</h2>
                                </Link>
                                <div className="flex flex-wrap items-center gap-4 text-sm font-bold text-gray-700">
                                    <span className="flex items-center gap-1">
                                        <Building className="w-4 h-4" />
                                        {job.company}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <MapPin className="w-4 h-4" />
                                        {job.location}
                                    </span>
                                    <span className="bg-gray-100 px-2 py-0.5 border border-black text-xs">
                                        {job.jobType}
                                    </span>
                                </div>
                            </div>
                            <button className="absolute top-4 right-4 p-2 text-red-600 hover:bg-red-50 transition-colors" title="Remove">
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 border-2 border-dashed border-black">
                    <Bookmark className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <h3 className="font-black text-xl uppercase mb-2">No Saved Jobs</h3>
                    <p className="text-gray-600 font-medium">Jobs you save will appear here for quick access.</p>
                </div>
            )}
        </div>
    );
};

export default SavedJobs;
