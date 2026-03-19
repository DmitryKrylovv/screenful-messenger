import { useState, useEffect, useRef } from "react";
import {
  Paperclip, ArrowUp, Mic, Play, Pause,
  FileText, Download, ExternalLink, MapPin, Image as ImageIcon, Type,
} from "lucide-react";
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

/* ─── Voice Message ─── */

const VoiceMessage = ({ message }: { message: Message }) => {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showTranscript, setShowTranscript] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const duration = message.voiceDuration || 5;

  useEffect(() => {
    if (playing) {
      const step = 100 / (duration * 20);
      intervalRef.current = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) { setPlaying(false); return 0; }
          return p + step;
        });
      }, 50);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [playing, duration]);

  const fmt = (sec: number) => `${Math.floor(sec / 60)}:${Math.floor(sec % 60).toString().padStart(2, "0")}`;
  const currentTime = (progress / 100) * duration;
  const isIncoming = message.incoming;

  const bars = Array.from({ length: 28 }, (_, i) => {
    const h = 20 + Math.sin(i * 0.8) * 40 + Math.cos(i * 1.3) * 30;
    return Math.max(15, Math.min(90, h));
  });

  return (
    <div className="flex flex-col gap-2 min-w-[220px]">
      <div className="flex items-center gap-3">
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
          <div className="flex items-center justify-between">
            <span className={`font-mono-tabular text-[10px] ${isIncoming ? "text-muted-foreground" : "text-primary-foreground/70"}`}>
              {playing ? fmt(currentTime) : fmt(duration)}
            </span>
            {message.voiceTranscript && (
              <button
                onClick={() => setShowTranscript(!showTranscript)}
                className={`flex items-center gap-1 text-[10px] font-medium transition-colors ${
                  isIncoming
                    ? "text-muted-foreground hover:text-foreground"
                    : "text-primary-foreground/60 hover:text-primary-foreground"
                }`}
              >
                <Type className="w-3 h-3" />
                {showTranscript ? "Hide" : "Transcript"}
              </button>
            )}
          </div>
        </div>
      </div>
      {showTranscript && message.voiceTranscript && (
        <p className={`text-[11px] leading-relaxed pt-1 border-t ${
          isIncoming ? "border-foreground/10 text-muted-foreground" : "border-primary-foreground/20 text-primary-foreground/80"
        }`}>
          {message.voiceTranscript}
        </p>
      )}
    </div>
  );
};

/* ─── Image Message ─── */

const ImageMessage = ({ message }: { message: Message }) => (
  <div className="rounded-lg overflow-hidden max-w-[280px] -m-1">
    <img
      src={message.imageUrl}
      alt="Shared image"
      className="w-full h-auto object-cover rounded-lg"
      loading="lazy"
    />
  </div>
);

/* ─── File Message ─── */

const fileExtColors: Record<string, string> = {
  pdf: "bg-destructive/10 text-destructive",
  json: "bg-accent text-accent-foreground",
  fig: "bg-accent text-accent-foreground",
  md: "bg-accent text-accent-foreground",
};

const FileMessage = ({ message }: { message: Message }) => {
  const ext = message.fileExt || "file";
  const colorClass = fileExtColors[ext] || "bg-accent text-accent-foreground";
  const isIncoming = message.incoming;

  return (
    <div className="flex items-center gap-3 min-w-[200px]">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
        isIncoming ? colorClass : "bg-primary-foreground/15 text-primary-foreground"
      }`}>
        <FileText className="w-4.5 h-4.5" />
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-[12px] font-semibold truncate ${isIncoming ? "" : "text-primary-foreground"}`}>
          {message.fileName}
        </p>
        <p className={`font-mono-tabular text-[10px] ${
          isIncoming ? "text-muted-foreground" : "text-primary-foreground/60"
        }`}>
          {message.fileSize} · .{ext.toUpperCase()}
        </p>
      </div>
      <button className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 transition-colors ${
        isIncoming
          ? "hover:bg-foreground/10 text-muted-foreground"
          : "hover:bg-primary-foreground/20 text-primary-foreground/60"
      }`}>
        <Download className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

/* ─── Link Preview Message ─── */

const LinkMessage = ({ message }: { message: Message }) => {
  const isIncoming = message.incoming;

  return (
    <div className={`rounded-lg overflow-hidden min-w-[240px] border ${
      isIncoming ? "border-foreground/10 bg-surface-low" : "border-primary-foreground/15 bg-primary-foreground/10"
    }`}>
      <div className="p-3 flex flex-col gap-1">
        <div className="flex items-center gap-1.5">
          <ExternalLink className={`w-3 h-3 shrink-0 ${isIncoming ? "text-muted-foreground" : "text-primary-foreground/60"}`} />
          <span className={`font-mono-tabular text-[10px] truncate ${isIncoming ? "text-muted-foreground" : "text-primary-foreground/60"}`}>
            {message.linkDomain}
          </span>
        </div>
        <p className={`text-[12px] font-semibold leading-tight ${isIncoming ? "" : "text-primary-foreground"}`}>
          {message.linkTitle}
        </p>
        {message.linkDescription && (
          <p className={`text-[11px] leading-snug line-clamp-2 ${
            isIncoming ? "text-muted-foreground" : "text-primary-foreground/70"
          }`}>
            {message.linkDescription}
          </p>
        )}
      </div>
    </div>
  );
};

/* ─── Location Message ─── */

const LocationMessage = ({ message }: { message: Message }) => {
  const isIncoming = message.incoming;

  return (
    <div className="min-w-[220px]">
      {/* Map placeholder */}
      <div className={`h-28 rounded-lg mb-2 flex items-center justify-center relative overflow-hidden ${
        isIncoming ? "bg-surface-mid" : "bg-primary-foreground/10"
      }`}>
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0z' fill='none'/%3E%3Cpath d='M0 20h40M20 0v40' stroke='%23888' stroke-width='0.5' opacity='0.3'/%3E%3C/svg%3E")`,
          backgroundSize: "40px 40px",
        }} />
        <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${
          isIncoming ? "bg-foreground text-background" : "bg-primary-foreground text-primary"
        }`}>
          <MapPin className="w-5 h-5" />
        </div>
      </div>
      <p className={`text-[12px] font-semibold ${isIncoming ? "" : "text-primary-foreground"}`}>
        {message.locationName}
      </p>
      <p className={`text-[11px] ${isIncoming ? "text-muted-foreground" : "text-primary-foreground/60"}`}>
        {message.locationAddress}
      </p>
    </div>
  );
};

/* ─── Message Bubble ─── */

const renderContent = (message: Message) => {
  switch (message.type) {
    case "voice": return <VoiceMessage message={message} />;
    case "image": return <ImageMessage message={message} />;
    case "file": return <FileMessage message={message} />;
    case "link": return <LinkMessage message={message} />;
    case "location": return <LocationMessage message={message} />;
    default: return <p className="text-body">{message.text}</p>;
  }
};

const MessageBubble = ({ message }: { message: Message }) => {
  const isImage = message.type === "image";
  const padClass = isImage ? "p-1" : "p-3";

  if (message.incoming) {
    return (
      <div className="flex flex-col items-start gap-1 max-w-[70%]">
        <span className="font-mono-tabular text-[10px] text-muted-foreground ml-1">{message.time}</span>
        <div className={`bg-background border border-foreground/10 ${padClass} bubble-incoming shadow-architectural`}>
          {renderContent(message)}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-end gap-1 max-w-[70%] ml-auto">
      <span className="font-mono-tabular text-[10px] text-muted-foreground mr-1">{message.time}</span>
      <div className={`bg-primary text-primary-foreground ${padClass} bubble-outgoing`}>
        {renderContent(message)}
      </div>
    </div>
  );
};

export default ChatPanel;
