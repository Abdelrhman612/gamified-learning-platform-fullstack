"use client";
import { useState, useRef, useEffect } from "react";
import { sendMessageToGemini } from "@/app/lib/endpoints/gemini";
import { Message } from "./gemini.intrface";

export default function GeminiChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        150
      )}px`;
    }
  }, [input]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const processText = (text: string): string => {
    return text
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/\*(.*?)\*/g, "$1")
      .replace(/_(.*?)_/g, "$1")
      .replace(/`(.*?)`/g, "$1");
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      role: "user",
      text: input,
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setError(null);
    setLoading(true);

    try {
      const res = await sendMessageToGemini(input, sessionId || undefined);
      setSessionId(res.sessionId);

      const modelMessage: Message = {
        role: "model",
        text: processText(res.result),
        timestamp: new Date(),
      };

      setMessages([...updatedMessages, modelMessage]);
    } catch (err) {
      console.error("Error:", err);
      setError("حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.");

      const errorMessage: Message = {
        role: "model",
        text: "عذرًا، حدث خطأ في المعالجة. يرجى المحاولة مرة أخرى لاحقًا.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([]);
    setSessionId(null);
    setError(null);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("ar-EG", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4 flex">
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
        <header className="py-4 flex justify-center items-center relative">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 text-center">
            دردشة Gemini
          </h1>
          {messages.length > 0 && (
            <button
              onClick={clearChat}
              className="absolute left-0 px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-500 transition-colors flex items-center"
            >
              🗑️ جديد
            </button>
          )}
        </header>

        {error && (
          <div className="mb-4 p-3 bg-red-900 text-red-100 rounded-lg">
            {error}
          </div>
        )}

        <div className="flex-1 overflow-y-auto space-y-4 mb-4 p-4 bg-gray-800 bg-opacity-50 rounded-xl backdrop-blur-sm border border-gray-700 custom-scrollbar">
          {messages.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <div className="text-6xl mb-4">🤖</div>
              <p className="text-2xl mb-2">مرحبًا! أنا مساعدك Gemini</p>
              <p className="text-lg">كيف يمكنني مساعدتك اليوم؟</p>
            </div>
          ) : (
            messages.map((msg, i) => (
              <div
                key={i}
                className={`flex flex-col ${
                  msg.role === "user" ? "items-start" : "items-end"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`text-xs ${
                      msg.role === "user" ? "text-blue-300" : "text-purple-300"
                    }`}
                  >
                    {msg.role === "user" ? "أنت" : "Gemini"}
                  </span>
                  <span className="text-xs text-gray-400">
                    {formatTime(msg.timestamp)}
                  </span>
                </div>
                <div
                  className={`p-4 rounded-2xl max-w-lg ${
                    msg.role === "user"
                      ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-bl-none"
                      : "bg-gradient-to-r from-gray-700 to-gray-800 text-gray-100 rounded-br-none"
                  } shadow-md`}
                >
                  {msg.text.split("\n").map((line, idx) => (
                    <p key={idx} className="mb-2 last:mb-0">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))
          )}
          {loading && (
            <div className="flex items-center gap-2 text-gray-400">
              <div className="animate-pulse">💭</div>
              <span>جاري الكتابة...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="flex flex-col gap-2 bg-gray-800 p-4 rounded-xl shadow-lg">
          <div className="flex gap-3">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="اكتب رسالتك هنا..."
              rows={1}
              className="flex-1 p-4 rounded-xl bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              disabled={loading}
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transition-all duration-200 disabled:opacity-50 self-end flex items-center justify-center"
            >
              {loading ? (
                <span className="flex items-center">
                  <span className="animate-spin mr-2">⏳</span>
                  ...
                </span>
              ) : (
                <span className="flex items-center">
                  <span className="ml-2">إرسال</span>
                  <span>📤</span>
                </span>
              )}
            </button>
          </div>
          <p className="text-xs text-gray-400 text-right mt-1">
            اضغط على Enter للإرسال، Shift+Enter للسطر الجديد
          </p>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(75, 85, 99, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(96, 165, 250, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(96, 165, 250, 0.7);
        }
      `}</style>
    </div>
  );
}
