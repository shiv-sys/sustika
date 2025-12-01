import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setChat((prev) => [...prev, data]);
    });
  }, []);

  const sendMessage = () => {
    if (!message.trim()) return;
    socket.emit("sendMessage", message);
    setMessage("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Simple Chat App</h2>

      <div style={{
          width: "100%",
          height: "300px",
          border: "1px solid gray",
          padding: 10,
          overflowY: "auto",
        }}>
        {chat.map((msg, i) => (
          <div key={i}>{msg}</div>
        ))}
      </div>

      <input
        style={{ width: "80%", padding: 8, marginTop: 10 }}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type message"
      />

      <button onClick={sendMessage} style={{ padding: 8, marginLeft: 10 }}>
        Send
      </button>
    </div>
  );
}

export default App;
