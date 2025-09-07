import { Server } from 'node:http';
import { Server as IOServer } from 'socket.io';

export function register(server: Server): IOServer {
    const io = new IOServer(server);
    io.on('connection', (socket) => {
        socket.on('chat message', (msg) => {
            io.emit('chat message', msg);
        });
        return io;
    });
    return io;
}