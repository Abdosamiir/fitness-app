import { useState } from "react";
import { Send, SlidersHorizontal, Pencil } from "lucide-react";
import { askSmartCoach, type ChatMessage } from "../services/ai-coach";

export function SmartCoachWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { sender: "bot", text: "Hello How Can I Assist You Today ?" },
  ]);

const handleSend = async () => {
  if (!input.trim() || loading) return;

  const userMsg = input.trim();
  const userMsgObj: ChatMessage = { sender: "user", text: userMsg }; // Explicitly typed
  const updatedHistory = [...messages, userMsgObj];

  setMessages(updatedHistory);
  setInput("");
  setLoading(true);

  const botResponse = await askSmartCoach(messages, userMsg);
  
  const botMsgObj: ChatMessage = { sender: "bot", text: botResponse }; // Explicitly typed
  setMessages([...updatedHistory, botMsgObj]);
  setLoading(false);
};

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Expanded Modal Window */}
      {isOpen && (
        <div className="relative mb-3 flex h-[520px] w-80 sm:w-96 flex-col overflow-hidden rounded-2xl border border-primary/40 bg-background/95 backdrop-blur-md shadow-2xl">
          {/* Top Robot Badge & Toggle Button */}
          <div className="flex items-center justify-between border-b border-white/10 p-4">
            <h2 className="text-lg font-bold text-foreground">Smart Coach</h2>
            <SlidersHorizontal className="h-5 w-5 text-muted-foreground" />
          </div>

          {/* Chat Messages Log */}
          <div className="flex-1 space-y-4 overflow-y-auto p-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-2 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.sender === "bot" && (
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-bold">
                    🤖
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                    msg.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && <div className="text-xs text-muted-foreground">Smart Coach is thinking...</div>}
          </div>

          {/* Input Field */}
          <div className="p-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2 rounded-full border border-white/20 bg-muted/50 px-4 py-2"
            >
              <Pencil className="h-4 w-4 text-primary" />
              <input
                type="text"
                placeholder="Ask Me Any Things..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full bg-transparent text-sm focus:outline-none"
              />
              <button type="submit" disabled={loading} className="text-primary hover:opacity-80">
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Trigger Button with Your Custom Robot Design */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close Smart Coach" : "Ask Smart Coach"}
        className="group flex flex-col items-center outline-none cursor-pointer"
      >
        {/* Robot */}
        <div className="relative w-20 sm:w-24 motion-safe:animate-[assistant-float_4s_ease-in-out_infinite] motion-reduce:animate-none">
          {/* Glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-1/2 -z-10 size-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/30 blur-2xl transition-all duration-500 group-hover:scale-125 group-hover:bg-primary/45 sm:size-24"
          />

          <img
            src="/images/ask-me.png"
            alt="Smart Coach Robot"
            draggable={false}
            className="relative block h-auto w-full object-contain drop-shadow-[0_8px_20px_rgba(255,70,20,0.25)] transition-transform duration-300 ease-out select-none group-hover:scale-105 group-hover:-rotate-2 motion-reduce:transition-none"
          />
        </div>

        {/* Button Label */}
        <span className="relative z-10 -mt-2 inline-flex items-center justify-center rounded-full bg-primary px-4 py-1.5 font-brand text-xs font-bold text-primary-foreground shadow-lg shadow-primary/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:scale-105 group-hover:shadow-xl group-hover:shadow-primary/40 after:absolute after:inset-0 after:-z-10 after:rounded-full after:bg-primary/40 after:opacity-60 after:blur-md after:transition-opacity after:duration-300 group-hover:after:opacity-100">
          {isOpen ? "Tap To Close" : "Hey Ask Me"}
        </span>
      </button>
    </div>
  );
}