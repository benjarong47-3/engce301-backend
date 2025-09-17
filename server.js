// server.js (ฉบับอัปเกรด)
const express = require('express');
const http = require('http'); // << Import http ของ Node
const { Server } = require("socket.io"); // << Import Server จาก socket.io
require('dotenv').config();

const app = express();
const server = http.createServer(app); // << สร้าง server ด้วย http
const io = new Server(server, { // << ผูก socket.io กับ http server
    cors: { origin: "*" } // อนุญาตการเชื่อมต่อจากทุกที่
});

const PORT = process.env.PORT || 3001;

// เสิร์ฟไฟล์ HTML สำหรับ Client
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// จัดการ Event เมื่อมีคนเชื่อมต่อเข้ามา
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // เมื่อได้รับ event 'chat message' จาก client
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        // ส่ง event 'chat message' กลับไปให้ client ทุกคนที่เชื่อมต่ออยู่
        io.emit('chat message', `[${socket.id} says]: ${msg}`);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// จัดการกรณีเกิดข้อผิดพลาดของ server (เช่น พอร์ตถูกใช้งาน)
server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Stop the process using it or set a different PORT in .env`);
        process.exit(1);
    } else {
        console.error('Server error:', err);
        process.exit(1);
    }
});

server.listen(PORT, () => {
    console.log(`🚀 Server with WebSocket running on http://localhost:${PORT}`);
});