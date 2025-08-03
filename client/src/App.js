import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("https://chat-app-gpt-6iq0.onrender.com");

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on("chat-message", (msg) => {
      setChat((prev) => [...prev, msg]);
    });
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("chat-message", message);
      setMessage("");
    }
  };

  return (
    <div>
      <h1>Chat App</h1>
      <div>
        {chat.map((msg, i) => (
          <p key={i}>{msg}</p>
        ))}
      </div>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      />
      <button onClick={sendMessage}>Yuborish</button>
    </div>
  );
}

export default App;
