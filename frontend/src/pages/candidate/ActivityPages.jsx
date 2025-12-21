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
                const response = await axios.get('http://localhost:3000/api/notifications', {
                    withCredentials: true
                });
                if (response.data.success) {
                    setNotifications(response.data.notifications || []);
                }

                // Mark all notifications as read when page is visited
                await axios.patch('http://localhost:3000/api/notifications/mark-all-read', {}, {
                    withCredentials: true
                });
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

// Full Messages Component with chatbox-style grouped conversations
export const Messages = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedConversation, setExpandedConversation] = useState(null);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:3000/api/messages', {
                    withCredentials: true
                });
                if (response.data.success) {
                    setMessages(response.data.messages || []);
                }

                // Mark all messages as read when page is visited
                await axios.patch('http://localhost:3000/api/messages/mark-all-read', {}, {
                    withCredentials: true
                });
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

    // Group messages by sender (employer)
    const groupMessagesBySender = (messages) => {
        const grouped = {};
        messages.forEach(msg => {
            const senderId = msg.senderId?._id || msg.senderId;
            const senderName = msg.senderId?.fullName || 'Employer';
            if (!grouped[senderId]) {
                grouped[senderId] = {
                    senderId,
                    senderName,
                    messages: [],
                    latestMessage: null,
                    unreadCount: 0
                };
            }
            grouped[senderId].messages.push(msg);
            if (!msg.read) grouped[senderId].unreadCount++;
            // Track latest message for sorting
            if (!grouped[senderId].latestMessage || new Date(msg.createdAt) > new Date(grouped[senderId].latestMessage.createdAt)) {
                grouped[senderId].latestMessage = msg;
            }
        });
        // Sort by latest message date descending
        return Object.values(grouped).sort((a, b) =>
            new Date(b.latestMessage?.createdAt) - new Date(a.latestMessage?.createdAt)
        );
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

    const conversations = groupMessagesBySender(messages);

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
            ) : conversations.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-black bg-gray-50">
                    <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <h3 className="font-black text-xl uppercase mb-2">No Messages Yet</h3>
                    <p className="text-gray-600 font-medium">Your inbox is empty. Messages from employers will appear here.</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {conversations.map((conversation) => (
                        <div key={conversation.senderId} className="border-2 border-black">
                            {/* Conversation Header - Click to expand */}
                            <button
                                onClick={() => setExpandedConversation(
                                    expandedConversation === conversation.senderId ? null : conversation.senderId
                                )}
                                className={`w-full p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors ${expandedConversation === conversation.senderId ? 'bg-gray-100' : 'bg-white'
                                    }`}
                            >
                                <div className="w-12 h-12 bg-black text-white flex items-center justify-center font-black flex-shrink-0 text-lg">
                                    {conversation.senderName?.charAt(0)?.toUpperCase() || 'E'}
                                </div>
                                <div className="flex-1 min-w-0 text-left">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-black text-lg">{conversation.senderName}</span>
                                        {conversation.unreadCount > 0 && (
                                            <span className="px-2 py-0.5 text-xs bg-blue-600 text-white font-bold">
                                                {conversation.unreadCount} NEW
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-gray-600 font-medium text-sm truncate">
                                        {conversation.latestMessage?.content}
                                    </p>
                                </div>
                                <div className="text-right flex-shrink-0">
                                    <p className="text-xs text-gray-500 font-semibold">
                                        {formatDate(conversation.latestMessage?.createdAt)}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">
                                        {conversation.messages.length} message{conversation.messages.length !== 1 ? 's' : ''}
                                    </p>
                                </div>
                            </button>

                            {/* Expanded Messages - Chatbox style */}
                            {expandedConversation === conversation.senderId && (
                                <div className="border-t-2 border-black bg-gray-50 p-4 max-h-80 overflow-y-auto">
                                    <div className="space-y-3">
                                        {conversation.messages
                                            .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
                                            .map((msg) => (
                                                <div
                                                    key={msg._id}
                                                    className="bg-white border border-gray-200 p-3 rounded"
                                                >
                                                    <p className="text-gray-800 font-medium whitespace-pre-wrap">
                                                        {msg.content}
                                                    </p>
                                                    <p className="text-xs text-gray-400 mt-2 font-semibold">
                                                        {formatDate(msg.createdAt)}
                                                    </p>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export const JobAlerts = () => <EmptyPage title="Job Alerts" icon={Search} message="You haven't set up any job alerts." />;
