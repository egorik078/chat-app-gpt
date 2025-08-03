const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const { Server } = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB ulanish
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB muvaffaqiyatli ulandi'))
.catch((err) => console.error('❌ MongoDB ulanishda xatolik:', err));

// Socket.io
const io = new Server(server, {
  cors: {
    origin: "*",
  }
});

io.on('connection', (socket) => {
  console.log(`🔌 Client ulandi: ${socket.id}`);

  socket.on('send_message', (data) => {
    socket.broadcast.emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log(`❌ Client uzildi: ${socket.id}`);
  });
});

// Root route
app.get('/', (req, res) => {
  res.send('💬 Chat server ishlayapti!');
});

// Port
const PORT = process.env.PORT || 10000;
server.listen(PORT, () => {
  console.log(`🚀 Server ishga tushdi: http://localhost:${PORT}`);
});
