import { Settings, User, MessageSquare, Archive, Cloud, Music, Bot } from "lucide-react";

export type AppView = "messenger" | "agents" | "cloud" | "music";

interface GlobalNavProps {
  activeView: AppView;
  onViewChange: (view: AppView) => void;
}

const GlobalNav = ({ activeView, onViewChange }: GlobalNavProps) => {
  return (
    <nav className="w-16 flex flex-col items-center py-4 border-r border-foreground/5 bg-surface-low shrink-0">
      <div className="w-10 h-10 bg-primary rounded-xl mb-8 flex items-center justify-center">
        <span className="text-primary-foreground font-bold text-sm">R</span>
      </div>

      <div className="flex flex-col items-center gap-1 mb-auto">
        <NavIcon icon={MessageSquare} active={activeView === "messenger"} onClick={() => onViewChange("messenger")} />
        <NavIcon icon={Bot} active={activeView === "agents"} onClick={() => onViewChange("agents")} />
        <NavIcon icon={Cloud} active={activeView === "cloud"} onClick={() => onViewChange("cloud")} />
        <NavIcon icon={Music} active={activeView === "music"} onClick={() => onViewChange("music")} />
        <NavIcon icon={Archive} />
      </div>

      <div className="flex flex-col items-center gap-1">
        <NavIcon icon={User} />
        <NavIcon icon={Settings} />
      </div>
    </nav>
  );
};

const NavIcon = ({ icon: Icon, active = false, onClick }: { icon: React.ElementType; active?: boolean; onClick?: () => void }) => (
  <button
    onClick={onClick}
    className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-150 ${
      active ? "bg-primary text-primary-foreground" : "text-foreground/40 hover:text-foreground hover:bg-surface-mid"
    }`}
  >
    <Icon className="w-[18px] h-[18px]" strokeWidth={1.8} />
  </button>
);

export default GlobalNav;
