# สรุปผลการทดลอง (Lab)

จาก lab นี้ได้เรียนรู้และลงมือทำจริงดังนี้

- ติดตั้งและใช้งาน Express เพื่อสร้าง HTTP server และ route พื้นฐาน (GET/POST)
- ใช้ dotenv อ่านค่าคอนฟิกจากไฟล์ .env (เช่น PORT, APP_NAME)
- เปิดใช้งาน CORS เพื่ออนุญาตการเข้าถึงข้าม origin
- เพิ่มความปลอดภัยเบื้องต้นด้วย helmet
- ใช้ express.json() เพื่ออ่าน JSON body ของคำขอ POST
- ตรวจสอบความถูกต้องของข้อมูลด้วย Joi (สร้าง schema และตอบ 400 เมื่อข้อมูลไม่ผ่าน)
- สร้าง WebSocket แบบเรียลไทม์ด้วย socket.io (เชื่อมผ่าน HTTP server เดียวกัน, ส่ง/รับ event chat message)
- จัดการข้อผิดพลาดของ server เช่น ตรวจจับ EADDRINUSE (พอร์ตถูกใช้งาน)
- เสิร์ฟไฟล์ client (index.html) เพื่อทดสอบการเชื่อมต่อ WebSocket

ไฟล์สำคัญ
- server.js — โค้ดเซิร์ฟเวอร์หลัก (HTTP + WebSocket + middleware + validation)
- index.html — ตัวอย่าง client สำหรับทดสอบ socket.io (ถ้ามี)
- .env — ค่าคอนฟิก (อย่า commit ไฟล์นี้)

การรัน (ตัวอย่าง)
1. ติดตั้ง dependency:
   npm install
2. ตั้งค่าไฟล์ .env เช่น:
   PORT=3001
3. เริ่มเซิร์ฟเวอร์:
   node server.js
4. ทดสอบ:
   - เปิด http://localhost:3001 เพื่อดู client หรือหน้า test
   - POST /api/users ด้วย JSON เพื่อทดสอบ Joi validation
   - เชื่อม socket.io จาก client แล้วส่ง/รับ event 'chat message'

ปัญหาและแนวทางแก้ไขที่เจอ
- ถ้าเจอ EADDRINUSE: พอร์ตถูกใช้งาน ให้หยุด process ที่ใช้พอร์ตหรือเปลี่ยนค่า PORT ใน .env
  ตัวอย่างคำสั่งตรวจสอบ/ฆ่า process:
  - sudo lsof -i :3001
  - sudo fuser -k 3001/tcp

ข้อเสนอแนะต่อไป
- เพิ่มการจัดการ errors แบบรวมศูนย์ (error middleware)
- เพิ่ม logging ที่เป็นระบบ (เช่น winston)
- เพิ่มการทดสอบอัตโนมัติสำหรับ route และ schema validation