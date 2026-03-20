import { useState } from "react";
import { ArrowUp, Bot, Sparkles, Settings2 } from "lucide-react";
import { agents, agentMessages } from "@/data/agentsData";

interface AgentChatPanelProps {
  activeId: string;
}

const AgentChatPanel = ({ activeId }: AgentChatPanelProps) => {
  const [inputValue, setInputValue] = useState("");
  const agent = agents.find((a) => a.id === activeId);
  const chatMessages = agentMessages[activeId] || [];

  return (
    <main className="flex-1 flex flex-col min-w-0">
      {/* Header */}
      <header className="h-16 border-b border-foreground/5 flex items-center px-6 justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Bot className="w-4 h-4 text-primary" />
          </div>
          <div>
            <span className="font-bold text-sm">{agent?.name}</span>
            <p className="text-[11px] text-muted-foreground leading-tight">{agent?.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono-tabular text-[10px] text-muted-foreground bg-surface-low px-2 py-0.5 rounded">
            {agent?.model}
          </span>
          <button className="w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-surface-low transition-colors">
            <Settings2 className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 p-6 space-y-4 overflow-y-auto">
        {chatMessages.map((msg) => (
          <AgentMessageBubble key={msg.id} message={msg} agentInitials={agent?.initials || "AI"} />
        ))}
      </div>

      {/* Input */}
      <footer className="p-4 shadow-input-top shrink-0">
        <div className="bg-surface-low rounded-xl p-2 flex items-center gap-2">
          <button className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
            <Sparkles className="w-4 h-4" />
          </button>
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="bg-transparent flex-1 px-1 py-1 text-body outline-none placeholder:text-muted-foreground"
            placeholder="Ask the agent..."
          />
          <button className="bg-primary text-primary-foreground w-8 h-8 rounded-lg flex items-center justify-center hover:scale-[0.96] transition-transform">
            <ArrowUp className="w-4 h-4" strokeWidth={2} />
          </button>
        </div>
      </footer>
    </main>
  );
};

const AgentMessageBubble = ({ message, agentInitials }: { message: { id: string; text: string; time: string; incoming: boolean }; agentInitials: string }) => {
  if (message.incoming) {
    return (
      <div className="flex flex-col items-start gap-1 max-w-[75%]">
        <div className="flex items-center gap-2">
          <span className="font-mono-tabular text-[10px] text-muted-foreground">{message.time}</span>
          <span className="text-[10px] text-primary font-medium">{agentInitials}</span>
        </div>
        <div className="bg-background border border-foreground/10 p-3 bubble-incoming shadow-architectural">
          <p className="text-body whitespace-pre-line">{message.text}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-end gap-1 max-w-[75%] ml-auto">
      <span className="font-mono-tabular text-[10px] text-muted-foreground mr-1">{message.time}</span>
      <div className="bg-primary text-primary-foreground p-3 bubble-outgoing">
        <p className="text-body whitespace-pre-line">{message.text}</p>
      </div>
    </div>
  );
};

export default AgentChatPanel;
