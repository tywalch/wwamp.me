import { Server } from 'node:http';
import { Server as IOServer } from 'socket.io';

export function register(server: Server): IOServer {
    const io = new IOServer(server);
    io.on('connection', (socket) => {
        // socket.onAny((event, ...args) => {});          
        socket.on('join', (evt) => {
            console.log('socket.on join', evt, typeof evt);
            io.emit('join', JSON.parse(evt));
        });
        socket.on('leave', (evt) => {
            console.log('socket.on leave', evt, typeof evt);
            io.emit('leave', JSON.parse(evt));
        });
        socket.on('sound', (evt) => {
            console.log('socket.on sound', evt, typeof evt);
            io.emit('sound', JSON.parse(evt));
        });
        socket.on('suppressed', (evt) => {
            console.log('socket.on suppressed', evt, typeof evt);
            io.emit('suppressed', JSON.parse(evt));
        });
        return io;
    });
    return io;
}