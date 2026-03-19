import { useState, useEffect, useRef } from "react";
import { Paperclip, ArrowUp, Mic, Play, Pause } from "lucide-react";
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
          <button className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
            <Mic className="w-4 h-4" />
          </button>
          <button className="bg-primary text-primary-foreground w-8 h-8 rounded-lg flex items-center justify-center hover:scale-[0.96] transition-transform">
            <ArrowUp className="w-4 h-4" strokeWidth={2} />
          </button>
        </div>
      </footer>
    </main>
  );
};

const VoiceMessage = ({ message }: { message: Message }) => {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const duration = message.voiceDuration || 5;

  useEffect(() => {
    if (playing) {
      const step = 100 / (duration * 20);
      intervalRef.current = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            setPlaying(false);
            return 0;
          }
          return p + step;
        });
      }, 50);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [playing, duration]);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const currentTime = (progress / 100) * duration;
  const isIncoming = message.incoming;

  // Generate fake waveform bars
  const bars = Array.from({ length: 28 }, (_, i) => {
    const h = 20 + Math.sin(i * 0.8) * 40 + Math.cos(i * 1.3) * 30;
    return Math.max(15, Math.min(90, h));
  });

  return (
    <div className="flex items-center gap-3 min-w-[220px]">
      <button
        onClick={() => setPlaying(!playing)}
        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
          isIncoming
            ? "bg-foreground/10 text-foreground hover:bg-foreground/20"
            : "bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/30"
        }`}
      >
        {playing ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
      </button>
      <div className="flex-1 flex flex-col gap-1.5">
        <div className="flex items-end gap-[2px] h-6">
          {bars.map((h, i) => {
            const filled = (i / bars.length) * 100 <= progress;
            return (
              <div
                key={i}
                className={`w-[3px] rounded-full transition-colors duration-75 ${
                  isIncoming
                    ? filled ? "bg-foreground/70" : "bg-foreground/20"
                    : filled ? "bg-primary-foreground/90" : "bg-primary-foreground/30"
                }`}
                style={{ height: `${h}%` }}
              />
            );
          })}
        </div>
        <span className={`font-mono-tabular text-[10px] ${
          isIncoming ? "text-muted-foreground" : "text-primary-foreground/70"
        }`}>
          {playing ? formatTime(currentTime) : formatTime(duration)}
        </span>
      </div>
    </div>
  );
};

const MessageBubble = ({ message }: { message: Message }) => {
  const isVoice = message.type === "voice";

  if (message.incoming) {
    return (
      <div className="flex flex-col items-start gap-1 max-w-[70%]">
        <span className="font-mono-tabular text-[10px] text-muted-foreground ml-1">{message.time}</span>
        <div className="bg-background border border-foreground/10 p-3 bubble-incoming shadow-architectural">
          {isVoice ? <VoiceMessage message={message} /> : <p className="text-body">{message.text}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-end gap-1 max-w-[70%] ml-auto">
      <span className="font-mono-tabular text-[10px] text-muted-foreground mr-1">{message.time}</span>
      <div className="bg-primary text-primary-foreground p-3 bubble-outgoing">
        {isVoice ? <VoiceMessage message={message} /> : <p className="text-body">{message.text}</p>}
      </div>
    </div>
  );
};

export default ChatPanel;
