import React, { useState, useEffect } from 'react';
import { Search, Bell, MessageSquare, CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import axios from 'axios';
import { getSocket } from '../../utils/socket';

// Empty Page for Job Alerts (kept as is)
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

// Full Notifications Component with data fetching
export const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:3000/api/auth/notifications', {
                    withCredentials: true
                });
                if (response.data.success) {
                    setNotifications(response.data.notifications || []);
                }
            } catch (err) {
                console.error('Error fetching notifications:', err);
                setError('Failed to load notifications');
            } finally {
                setLoading(false);
            }
        };
        fetchNotifications();

        // Socket listener for real-time notifications
        const socket = getSocket();
        if (socket) {
            socket.on('notification', (newNotification) => {
                setNotifications(prev => [newNotification, ...prev]);
            });
        }

        return () => {
            if (socket) {
                socket.off('notification');
            }
        };
    }, []);

    const getIcon = (type) => {
        switch (type) {
            case 'success':
                return <CheckCircle className="w-6 h-6 text-green-600" />;
            case 'warning':
                return <AlertCircle className="w-6 h-6 text-yellow-600" />;
            case 'error':
                return <X className="w-6 h-6 text-red-600" />;
            default:
                return <Info className="w-6 h-6 text-blue-600" />;
        }
    };

    const getBgColor = (type) => {
        switch (type) {
            case 'success':
                return 'bg-green-50 border-green-300';
            case 'warning':
                return 'bg-yellow-50 border-yellow-300';
            case 'error':
                return 'bg-red-50 border-red-300';
            default:
                return 'bg-blue-50 border-blue-300';
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 60) return `${diffMins} min ago`;
        if (diffHours < 24) return `${diffHours} hours ago`;
        if (diffDays < 7) return `${diffDays} days ago`;
        return date.toLocaleDateString();
    };

    return (
        <div className="bg-white border-2 border-black p-6 min-h-[50vh]">
            <h1 className="text-2xl font-black uppercase mb-6 flex items-center gap-2">
                <Bell className="w-8 h-8" />
                Notifications
            </h1>

            {loading ? (
                <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-4 border-black"></div>
                    <span className="ml-3 font-semibold">Loading notifications...</span>
                </div>
            ) : error ? (
                <div className="text-center py-12 border-2 border-dashed border-red-300 bg-red-50">
                    <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-400" />
                    <p className="text-red-600 font-medium">{error}</p>
                </div>
            ) : notifications.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-black bg-gray-50">
                    <Bell className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <h3 className="font-black text-xl uppercase mb-2">No Notifications Yet</h3>
                    <p className="text-gray-600 font-medium">You're all caught up! No new notifications.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {notifications.map((notification) => (
                        <div
                            key={notification._id}
                            className={`p-4 border-2 ${getBgColor(notification.type)} ${notification.read ? 'opacity-60' : ''}`}
                        >
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 mt-1">
                                    {getIcon(notification.type)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-black text-lg mb-1">{notification.title}</h3>
                                    <p className="text-gray-700 font-medium whitespace-pre-wrap">{notification.message}</p>
                                    <p className="text-xs text-gray-500 mt-2 font-semibold">
                                        {formatDate(notification.createdAt)}
                                    </p>
                                </div>
                                {!notification.read && (
                                    <div className="flex-shrink-0">
                                        <span className="w-3 h-3 bg-blue-600 rounded-full block"></span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

// Full Messages Component with data fetching
export const Messages = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:3000/api/auth/messages', {
                    withCredentials: true
                });
                if (response.data.success) {
                    setMessages(response.data.messages || []);
                }
            } catch (err) {
                console.error('Error fetching messages:', err);
                setError('Failed to load messages');
            } finally {
                setLoading(false);
            }
        };
        fetchMessages();

        // Socket listener for real-time messages
        const socket = getSocket();
        if (socket) {
            socket.on('message', (newMessage) => {
                setMessages(prev => [newMessage, ...prev]);
            });
        }

        return () => {
            if (socket) {
                socket.off('message');
            }
        };
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 60) return `${diffMins} min ago`;
        if (diffHours < 24) return `${diffHours} hours ago`;
        if (diffDays < 7) return `${diffDays} days ago`;
        return date.toLocaleDateString();
    };

    return (
        <div className="bg-white border-2 border-black p-6 min-h-[50vh]">
            <h1 className="text-2xl font-black uppercase mb-6 flex items-center gap-2">
                <MessageSquare className="w-8 h-8" />
                Messages
            </h1>

            {loading ? (
                <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-4 border-black"></div>
                    <span className="ml-3 font-semibold">Loading messages...</span>
                </div>
            ) : error ? (
                <div className="text-center py-12 border-2 border-dashed border-red-300 bg-red-50">
                    <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-400" />
                    <p className="text-red-600 font-medium">{error}</p>
                </div>
            ) : messages.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-black bg-gray-50">
                    <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <h3 className="font-black text-xl uppercase mb-2">No Messages Yet</h3>
                    <p className="text-gray-600 font-medium">Your inbox is empty. Start a conversation!</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {messages.map((message) => (
                        <div
                            key={message._id}
                            className={`p-4 border-2 border-black ${message.read ? 'bg-gray-50' : 'bg-white'}`}
                        >
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-black text-white flex items-center justify-center font-black flex-shrink-0">
                                    E
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-black">Employer</span>
                                        {!message.read && (
                                            <span className="px-2 py-0.5 text-xs bg-blue-600 text-white font-bold">NEW</span>
                                        )}
                                    </div>
                                    <p className="text-gray-700 font-medium whitespace-pre-wrap">{message.content}</p>
                                    <p className="text-xs text-gray-500 mt-2 font-semibold">
                                        {formatDate(message.createdAt)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export const JobAlerts = () => <EmptyPage title="Job Alerts" icon={Search} message="You haven't set up any job alerts." />;
