import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MessageSquare, User, Search, Send, Clock, Briefcase, ChevronLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const API_BASE = 'http://localhost:3000/api';

const EmployerMessages = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [conversations, setConversations] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isSending, setIsSending] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchMessages();
    }, [user]);

    const fetchMessages = async () => {
        try {
            const response = await axios.get(`${API_BASE}/auth/messages`, { withCredentials: true });
            if (response.data.success) {
                // Group messages by conversation (based on the other person)
                const grouped = groupMessages(response.data.messages);
                setConversations(grouped);
                if (grouped.length > 0 && !selectedConversation) {
                    setSelectedConversation(grouped[0]);
                    setMessages(grouped[0].messages);
                }
            }
        } catch (error) {
            console.error('Error fetching messages:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const groupMessages = (allMessages) => {
        const conversationMap = new Map();

        allMessages.forEach(msg => {
            const otherPersonId = msg.senderId === user?._id ? msg.receiverId : msg.senderId;
            const otherPerson = msg.senderId === user?._id
                ? { id: msg.receiverId, name: 'Candidate', model: msg.receiverModel }
                : { id: msg.senderId, name: msg.senderId?.fullName || 'Candidate', model: msg.senderModel };

            if (!conversationMap.has(otherPersonId)) {
                conversationMap.set(otherPersonId, {
                    id: otherPersonId,
                    name: otherPerson.name,
                    messages: [],
                    lastMessage: msg,
                    jobTitle: msg.jobId?.jobTitle || 'General Discussion'
                });
            }
            conversationMap.get(otherPersonId).messages.push(msg);
        });

        // Convert map to array and sort by last message date
        return Array.from(conversationMap.values()).sort((a, b) =>
            new Date(b.lastMessage.createdAt) - new Date(a.lastMessage.createdAt)
        );
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !selectedConversation || isSending) return;

        setIsSending(true);
        try {
            const response = await axios.post(`${API_BASE}/auth/messages`, {
                receiverId: selectedConversation.id,
                receiverModel: 'Candidate',
                content: newMessage,
                jobId: selectedConversation.lastMessage?.jobId?._id,
                applicationId: selectedConversation.lastMessage?.applicationId?._id
            }, { withCredentials: true });

            if (response.data.success) {
                setMessages(prev => [response.data.message, ...prev]);
                setNewMessage('');
                // Update conversation's last message
                setConversations(prev => prev.map(conv =>
                    conv.id === selectedConversation.id
                        ? { ...conv, lastMessage: response.data.message, messages: [response.data.message, ...conv.messages] }
                        : conv
                ));
            }
        } catch (error) {
            console.error('Error sending message:', error);
        } finally {
            setIsSending(false);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString([], { hour: '2-digit', minute: '2-digit' });
    };

    const filteredConversations = conversations.filter(conv =>
        conv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        conv.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isLoading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-black border-t-transparent"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <div className="bg-white border-b-2 border-black p-4 flex items-center gap-4">
                <button onClick={() => navigate('/employer-dashboard')} className="p-2 hover:bg-gray-100 border-2 border-transparent hover:border-black transition-all">
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <h1 className="text-2xl font-black uppercase flex items-center gap-2">
                    <MessageSquare className="w-6 h-6" /> Messages
                </h1>
            </div>

            <div className="flex-1 flex overflow-hidden">
                {/* Conversations Sidebar */}
                <div className="w-full sm:w-80 lg:w-96 bg-white border-r-2 border-black flex flex-col">
                    <div className="p-4 border-b-2 border-black bg-gray-50">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search candidates..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border-2 border-black font-bold text-sm focus:outline-none focus:bg-white"
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        {filteredConversations.length === 0 ? (
                            <div className="p-8 text-center text-gray-500 font-bold uppercase text-xs">
                                No conversations found
                            </div>
                        ) : (
                            filteredConversations.map(conv => (
                                <button
                                    key={conv.id}
                                    onClick={() => {
                                        setSelectedConversation(conv);
                                        setMessages(conv.messages);
                                    }}
                                    className={`w-full p-4 border-b-2 border-black flex items-start gap-3 transition-colors ${selectedConversation?.id === conv.id ? 'bg-black text-white' : 'hover:bg-gray-50'
                                        }`}
                                >
                                    <div className={`w-12 h-12 border-2 flex items-center justify-center shrink-0 ${selectedConversation?.id === conv.id ? 'bg-white text-black border-white' : 'bg-gray-200 border-black'
                                        }`}>
                                        <User className="w-6 h-6" />
                                    </div>
                                    <div className="flex-1 min-w-0 text-left">
                                        <div className="flex justify-between items-start mb-1">
                                            <h3 className="font-black truncate text-sm uppercase">{conv.name}</h3>
                                            <span className={`text-[10px] font-bold ${selectedConversation?.id === conv.id ? 'text-gray-400' : 'text-gray-500'
                                                }`}>
                                                {formatDate(conv.lastMessage.createdAt)}
                                            </span>
                                        </div>
                                        <p className={`text-xs font-bold truncate mb-1 ${selectedConversation?.id === conv.id ? 'text-gray-300' : 'text-black'
                                            }`}>
                                            {conv.jobTitle}
                                        </p>
                                        <p className={`text-xs truncate ${selectedConversation?.id === conv.id ? 'text-gray-400' : 'text-gray-600'
                                            }`}>
                                            {conv.lastMessage.content}
                                        </p>
                                    </div>
                                </button>
                            ))
                        )}
                    </div>
                </div>

                {/* Message Content */}
                <div className="hidden sm:flex flex-1 bg-white flex-col">
                    {selectedConversation ? (
                        <>
                            {/* Chat Header */}
                            <div className="p-4 border-b-2 border-black flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gray-200 border-2 border-black flex items-center justify-center">
                                        <User className="w-5 h-5 text-gray-500" />
                                    </div>
                                    <div>
                                        <h2 className="font-black uppercase text-sm">{selectedConversation.name}</h2>
                                        <p className="text-xs font-bold text-gray-600 flex items-center gap-1">
                                            <Briefcase className="w-3 h-3" /> {selectedConversation.jobTitle}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Messages Area */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-4 flex flex-col-reverse bg-gray-50">
                                {messages.map(msg => {
                                    const isMe = msg.senderId === user?._id;
                                    return (
                                        <div key={msg._id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                                            <div className={`max-w-[70%] p-3 border-2 border-black ${isMe ? 'bg-black text-white' : 'bg-white text-black'
                                                }`}>
                                                <p className="text-sm font-medium">{msg.content}</p>
                                                <div className={`text-[10px] mt-1 font-bold ${isMe ? 'text-gray-400' : 'text-gray-500'
                                                    }`}>
                                                    {formatDate(msg.createdAt)}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Message Input */}
                            <form onSubmit={handleSendMessage} className="p-4 border-t-2 border-black bg-white">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Type your message..."
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        className="flex-1 px-4 py-2 border-2 border-black font-bold focus:outline-none"
                                    />
                                    <button
                                        type="submit"
                                        disabled={!newMessage.trim() || isSending}
                                        className="bg-black text-white px-6 py-2 border-2 border-black font-black uppercase hover:bg-gray-800 disabled:opacity-50 transition-colors flex items-center gap-2"
                                    >
                                        <Send className="w-4 h-4" />
                                        {isSending ? '...' : 'Send'}
                                    </button>
                                </div>
                            </form>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-gray-50">
                            <div className="w-20 h-20 bg-gray-200 border-2 border-black flex items-center justify-center mb-4">
                                <MessageSquare className="w-10 h-10 text-gray-400" />
                            </div>
                            <h2 className="text-xl font-black uppercase mb-2">Select a Conversation</h2>
                            <p className="text-gray-500 font-bold max-w-sm uppercase text-xs">
                                Choose a candidate from the left to start messaging about their application.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EmployerMessages;
