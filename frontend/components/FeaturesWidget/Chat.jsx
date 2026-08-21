import React, { useEffect, useRef, useState } from "react";
import { Send, Bot, User, Loader2 } from "lucide-react";
import "./Chat.css";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);
  

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);
const handleSendQuery = async () => {
  if (!inputValue.trim() || loading) return;

  const query = inputValue;

  setMessages((prev) => [
    ...prev,
    {
      role: "user",
      text: query,
    },
  ]);

  setInputValue("");
  setLoading(true);

  try {
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";
    const response = await fetch(`${BACKEND_URL}/ask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: query,
      }),
    });

    const aiResponse = await response.json();

    // Force fetch to jump into catch block when backend returns 4xx or 5xx status codes
    if (!response.ok) {
      throw new Error(aiResponse.detail || `Server error: ${response.status}`);
    }

    console.log("AI Response:", aiResponse);

    setMessages((prev) => [
      ...prev,
      {
        role: "ai",
        text: aiResponse.answer,
      },
    ]);
  } catch (error) {
    console.error("Chat Error:", error);
    setMessages((prev) => [
      ...prev,
      {
        role: "error",
        text: error.message || "Failed to connect to server.",
      },
    ]);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="chat-container">
      <div className="chat-header">
        <Bot size={20} />
        <span>AI Assistant</span>

        <div className="status">
          <span className="status-dot"></span>
          Online
        </div>
      </div>

      <div className="messages">

        {messages.length === 0 && (
          <div className="empty-state">
            <Bot size={42} />
            <h3>Start a conversation</h3>
            <p>Ask me anything.</p>
          </div>
        )}

        {messages.map((message, index) => (
          <div
            key={index}
            className={`message-row ${
              message.role === "user"
                ? "user-row"
                : message.role === "error"
                ? "error-row"
                : "ai-row"
            }`}
          >
            <div className="message-label">
              {message.role === "user" ? (
                <>
                  <User size={14} />
                  You
                </>
              ) : message.role === "error" ? (
                <>
                  ❌ Error
                </>
              ) : (
                <>
                  <Bot size={14} />
                  AI
                </>
              )}
            </div>

            <div
              className={`message ${
                message.role === "user"
                  ? "user-message"
                  : message.role === "error"
                  ? "error-message"
                  : "ai-message"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="message-row ai-row">
            <div className="message-label">
              <Bot size={14} />
              AI
            </div>

            <div className="message ai-message typing">
              <Loader2 size={16} className="spinner" />
              Thinking...
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="input-area">
        <input
          value={inputValue}
          placeholder="Ask your question..."
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendQuery();
            }
          }}
        />

        <button
          onClick={handleSendQuery}
          disabled={loading}
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}

export default Chat;