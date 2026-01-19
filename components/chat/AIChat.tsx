"use client";

import { useState } from "react";

export const AIChat = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<
    { role: "user" | "ai"; text: string }[]
  >([]);
  const [typing, setTyping] = useState(false);

  const typeText = async (text: string) => {
    let current = "";
    for (let char of text) {
      current += char;
      setChat((prev) => [
        ...prev.slice(0, -1),
        { role: "ai", text: current },
      ]);
      await new Promise((r) => setTimeout(r, 20));
    }
    setTyping(false);
  };

  const sendMessage = async () => {
    if (!message.trim()) return;

    setChat((prev) => [...prev, { role: "user", text: message }]);
    setMessage("");
    setTyping(true);

    const res = await fetch("http://localhost:8000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();

    setChat((prev) => [...prev, { role: "ai", text: "" }]);
    typeText(data.reply);
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-black/60 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-6 shadow-xl">
      <h2 className="text-2xl font-semibold text-purple-400 mb-4">
        Indra AI — Personal Assistant
      </h2>

      <div className="h-80 overflow-y-auto space-y-4 mb-4">
        {chat.map((msg, i) => (
          <div
            key={i}
            className={`p-3 rounded-xl max-w-[80%] ${
              msg.role === "user"
                ? "ml-auto bg-purple-600 text-white"
                : "mr-auto bg-gray-800 text-gray-200"
            }`}
          >
            {msg.text}
          </div>
        ))}
        {typing && (
          <div className="mr-auto bg-gray-800 text-gray-400 p-3 rounded-xl">
            Indra AI is typing...
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <input
          className="flex-1 bg-gray-900 border border-purple-500/40 rounded-lg px-4 py-2 text-white outline-none"
          placeholder="Ask me anything about Indra..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />

        <button
          onClick={sendMessage}
          className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg text-white font-medium transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};
