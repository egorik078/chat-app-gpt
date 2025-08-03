const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

// MongoDB ulanish
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB ulandi"))
  .catch(err => console.error("❌ MongoDB ulanishda xatolik:", err));

// Socket hodisalar
io.on("connection", (socket) => {
  console.log("🟢 Client ulanmoqda:", socket.id);

  socket.on("chat-message", (msg) => {
    console.log("✉️ Xabar:", msg);
    io.emit("chat-message", msg);
  });

  socket.on("disconnect", () => {
    console.log("🔴 Client uzildi:", socket.id);
  });
});

// Serverni ishga tushirish
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server ${PORT}-portda ishlayapti`);
});
