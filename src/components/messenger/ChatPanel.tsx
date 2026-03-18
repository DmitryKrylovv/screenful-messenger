import { useState } from "react";
import { Paperclip, ArrowUp } from "lucide-react";
import { messages, contacts, type Message } from "@/data/mockData";

interface ChatPanelProps {
  activeId: string;
}

const ChatPanel = ({ activeId }: ChatPanelProps) => {
  const [inputValue, setInputValue] = useState("");
  const contact = contacts.find((c) => c.id === activeId);

  return (
    <main className="flex-1 flex flex-col min-w-0">
      {/* Header */}
      <header className="h-16 border-b border-foreground/5 flex items-center px-6 justify-between shrink-0">
        <div className="flex items-center gap-3">
          {contact?.online && <div className="w-2 h-2 rounded-full bg-primary" />}
          <span className="font-bold text-sm">{contact?.name}</span>
          <span className="text-muted-foreground text-[11px]">
            {contact?.online ? "Online" : "Last seen 2m ago"}
          </span>
        </div>
        <span className="font-mono-tabular text-[10px] text-muted-foreground tracking-wide uppercase">Encrypted</span>
      </header>

      {/* Messages */}
      <div className="flex-1 p-6 space-y-4 overflow-y-auto">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
      </div>

      {/* Input */}
      <footer className="p-4 shadow-input-top shrink-0">
        <div className="bg-surface-low rounded-xl p-2 flex items-center gap-2">
          <button className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
            <Paperclip className="w-4 h-4" />
          </button>
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="bg-transparent flex-1 px-1 py-1 text-body outline-none placeholder:text-muted-foreground"
            placeholder="Write a message..."
          />
          <button className="bg-primary text-primary-foreground w-8 h-8 rounded-lg flex items-center justify-center hover:scale-[0.96] transition-transform">
            <ArrowUp className="w-4 h-4" strokeWidth={2} />
          </button>
        </div>
      </footer>
    </main>
  );
};

const MessageBubble = ({ message }: { message: Message }) => {
  if (message.incoming) {
    return (
      <div className="flex flex-col items-start gap-1 max-w-[70%]">
        <span className="font-mono-tabular text-[10px] text-muted-foreground ml-1">{message.time}</span>
        <div className="bg-background border border-foreground/10 p-3 bubble-incoming shadow-architectural">
          <p className="text-body">{message.text}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-end gap-1 max-w-[70%] ml-auto">
      <span className="font-mono-tabular text-[10px] text-muted-foreground mr-1">{message.time}</span>
      <div className="bg-primary text-primary-foreground p-3 bubble-outgoing">
        <p className="text-body">{message.text}</p>
      </div>
    </div>
  );
};

export default ChatPanel;
