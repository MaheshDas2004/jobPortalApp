import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:3000';

let socket;

export const initSocket = (userId) => {
    if (socket) return socket;

    socket = io(SOCKET_URL, {
        query: { userId },
        transports: ['websocket', 'polling'],
        withCredentials: true
    });

    socket.on('connect', () => {
        console.log('Connected to socket server');
    });

    socket.on('disconnect', () => {
        console.log('Disconnected from socket server');
    });

    return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};
