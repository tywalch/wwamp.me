import { serialize, parse } from "cookie";
import { Server } from 'node:http';

import { Server as IOServer } from 'socket.io';
import { randomUUID as uuid } from 'node:crypto';

export function register(server: Server): IOServer {
    const io = new IOServer(server);

    io.engine.on("initial_headers", (headers) => {
        const cookies = parse(headers.cookie ?? '');
        if (!cookies.user_id) {
            headers["set-cookie"] = serialize("user_id", uuid(), { sameSite: "strict", httpOnly: true });
        }
    });

    io.engine.on("headers", (headers, request) => {
        if (!request.headers.cookie) {
            return
        };
        
        const cookies = parse(request.headers.cookie);
        let userId = cookies.user_id;

        console.log('socket.on headers', cookies.user_id);

        request.user = {
            id: userId
        };
    });

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