const { Server } = require('socket.io');

let io;
const userSocketMap = new Map(); // userId -> socketId

const initSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST"],
            credentials: true
        }
    });

    io.on('connection', (socket) => {
        const userId = socket.handshake.query.userId;

        if (userId && userId !== 'undefined') {
            userSocketMap.set(userId, socket.id);
            console.log(`User connected: ${userId} with socket ID: ${socket.id}`);
        }

        socket.on('disconnect', () => {
            if (userId) {
                userSocketMap.delete(userId);
                console.log(`User disconnected: ${userId}`);
            }
        });
    });

    return io;
};

const getIo = () => {
    if (!io) {
        throw new Error('Socket.io not initialized!');
    }
    return io;
};

const sendToUser = (userId, event, data) => {
    const socketId = userSocketMap.get(userId);
    if (socketId) {
        io.to(socketId).emit(event, data);
        return true;
    }
    return false;
};

module.exports = {
    initSocket,
    getIo,
    sendToUser
};
