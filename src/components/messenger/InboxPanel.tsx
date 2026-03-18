import { Search } from "lucide-react";
import { contacts, type Contact } from "@/data/mockData";

interface InboxPanelProps {
  activeId: string;
  onSelect: (id: string) => void;
}

const InboxPanel = ({ activeId, onSelect }: InboxPanelProps) => {
  const totalUnread = contacts.reduce((s, c) => s + c.unread, 0);

  return (
    <aside className="w-80 border-r border-foreground/5 flex flex-col shrink-0">
      <header className="p-4 h-16 flex items-center justify-between shrink-0">
        <h1 className="font-bold text-lg tracking-tight">Messages</h1>
        {totalUnread > 0 && (
          <span className="font-mono-tabular text-[11px] bg-primary text-primary-foreground px-1.5 py-0.5 rounded">
            {totalUnread}
          </span>
        )}
      </header>

      <div className="px-3 pb-3 shrink-0">
        <div className="bg-surface-low rounded-lg flex items-center gap-2 px-3 py-2">
          <Search className="w-3.5 h-3.5 text-muted-foreground" />
          <input
            className="bg-transparent flex-1 text-body outline-none placeholder:text-muted-foreground"
            placeholder="Search conversations..."
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {contacts.map((c) => (
          <InboxItem key={c.id} contact={c} active={c.id === activeId} onClick={() => onSelect(c.id)} />
        ))}
      </div>
    </aside>
  );
};

const InboxItem = ({ contact, active, onClick }: { contact: Contact; active: boolean; onClick: () => void }) => (
  <div
    onClick={onClick}
    className={`px-4 py-3 flex gap-3 cursor-pointer transition-colors duration-150 ${
      active ? "bg-primary text-primary-foreground" : "hover:bg-surface-low"
    }`}
  >
    <div
      className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 text-[13px] font-semibold ${
        active ? "bg-primary-foreground/20 text-primary-foreground" : "bg-surface-mid text-foreground"
      }`}
    >
      {contact.initials}
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex justify-between items-baseline">
        <span className="font-semibold text-sm truncate">{contact.name}</span>
        <span className={`font-mono-tabular text-[10px] shrink-0 ml-2 ${active ? "opacity-60" : "text-muted-foreground"}`}>
          {contact.time}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <p className={`text-xs truncate ${active ? "opacity-80" : "text-muted-foreground"}`}>{contact.lastMessage}</p>
        {!active && contact.unread > 0 && (
          <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
        )}
      </div>
    </div>
  </div>
);

export default InboxPanel;
