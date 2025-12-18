import React from 'react';
import { Search, Bell, MessageSquare } from 'lucide-react';

const EmptyPage = ({ title, icon: Icon, message }) => (
    <div className="bg-white border-2 border-black p-6 min-h-[50vh]">
        <h1 className="text-2xl font-black uppercase mb-6 flex items-center gap-2">
            <Icon className="w-8 h-8" />
            {title}
        </h1>
        <div className="text-center py-12 border-2 border-dashed border-black bg-gray-50">
            <Icon className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <h3 className="font-black text-xl uppercase mb-2">No {title} Yet</h3>
            <p className="text-gray-600 font-medium">{message}</p>
        </div>
    </div>
);

export const JobAlerts = () => <EmptyPage title="Job Alerts" icon={Search} message="You haven't set up any job alerts." />;
export const Notifications = () => <EmptyPage title="Notifications" icon={Bell} message="You're all caught up! No new notifications." />;
export const Messages = () => <EmptyPage title="Messages" icon={MessageSquare} message="Your inbox is empty. Start a conversation!" />;
