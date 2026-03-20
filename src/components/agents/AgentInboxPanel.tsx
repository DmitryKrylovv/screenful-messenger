import { Search, Plus, Bot } from "lucide-react";
import { agents, type Agent } from "@/data/agentsData";

interface AgentInboxPanelProps {
  activeId: string;
  onSelect: (id: string) => void;
}

const AgentInboxPanel = ({ activeId, onSelect }: AgentInboxPanelProps) => {
  const totalUnread = agents.reduce((s, a) => s + a.unread, 0);

  return (
    <aside className="w-80 border-r border-foreground/5 flex flex-col shrink-0">
      <header className="p-4 h-16 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <Bot className="w-4 h-4 text-primary" />
          <h1 className="font-bold text-lg tracking-tight">AI Agents</h1>
        </div>
        <div className="flex items-center gap-2">
          {totalUnread > 0 && (
            <span className="font-mono-tabular text-[11px] bg-primary text-primary-foreground px-1.5 py-0.5 rounded">
              {totalUnread}
            </span>
          )}
          <button className="w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-surface-mid transition-colors">
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </header>

      <div className="px-3 pb-3 shrink-0">
        <div className="bg-surface-low rounded-lg flex items-center gap-2 px-3 py-2">
          <Search className="w-3.5 h-3.5 text-muted-foreground" />
          <input
            className="bg-transparent flex-1 text-body outline-none placeholder:text-muted-foreground"
            placeholder="Search agents..."
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {agents.map((a) => (
          <AgentItem key={a.id} agent={a} active={a.id === activeId} onClick={() => onSelect(a.id)} />
        ))}
      </div>
    </aside>
  );
};

const AgentItem = ({ agent, active, onClick }: { agent: Agent; active: boolean; onClick: () => void }) => (
  <div
    onClick={onClick}
    className={`px-4 py-3 flex gap-3 cursor-pointer transition-colors duration-150 ${
      active ? "bg-primary text-primary-foreground" : "hover:bg-surface-low"
    }`}
  >
    <div className="relative">
      <div
        className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 text-[13px] font-semibold ${
          active ? "bg-primary-foreground/20 text-primary-foreground" : "bg-surface-mid text-foreground"
        }`}
      >
        {agent.initials}
      </div>
      {agent.online && (
        <div className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 ${
          active ? "border-primary bg-primary-foreground" : "border-background bg-primary"
        }`} />
      )}
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex justify-between items-baseline">
        <span className="font-semibold text-sm truncate">{agent.name}</span>
        <span className={`font-mono-tabular text-[10px] shrink-0 ml-2 ${active ? "opacity-60" : "text-muted-foreground"}`}>
          {agent.time}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <p className={`text-xs truncate ${active ? "opacity-80" : "text-muted-foreground"}`}>{agent.lastMessage}</p>
        {!active && agent.unread > 0 && (
          <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
        )}
      </div>
    </div>
  </div>
);

export default AgentInboxPanel;
