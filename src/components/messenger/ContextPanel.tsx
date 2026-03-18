import { FileText, Image, Lock } from "lucide-react";
import { contactDetails, sharedMedia } from "@/data/mockData";

const ContextPanel = () => {
  return (
    <aside className="w-72 bg-surface-low border-l border-foreground/5 p-6 flex flex-col gap-8 shrink-0 overflow-y-auto">
      {/* Profile */}
      <div className="flex flex-col items-center text-center gap-3">
        <div className="w-16 h-16 rounded-xl bg-surface-mid flex items-center justify-center text-xl font-bold">
          {contactDetails.initials}
        </div>
        <div>
          <h2 className="font-bold text-sm">{contactDetails.name}</h2>
          <p className="text-[11px] text-muted-foreground">{contactDetails.members} members</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <StatBlock label="Messages" value={contactDetails.messageCount} />
        <StatBlock label="Shared" value={contactDetails.sharedSize} />
      </div>

      {/* Security */}
      <div className="flex items-center gap-2 px-3 py-2 bg-surface-mid rounded-lg">
        <Lock className="w-3.5 h-3.5 text-muted-foreground" />
        <span className="text-[11px] font-medium">{contactDetails.status}</span>
      </div>

      {/* Shared Media */}
      <section>
        <SectionLabel>Shared Media</SectionLabel>
        <div className="grid grid-cols-2 gap-2">
          {sharedMedia.map((item) => (
            <div
              key={item.id}
              className="aspect-square bg-surface-mid rounded-lg border border-foreground/5 flex flex-col items-center justify-center gap-1 p-2 cursor-pointer hover:border-foreground/20 transition-colors"
            >
              {item.label.endsWith(".fig") || item.label.endsWith(".pdf") ? (
                <Image className="w-5 h-5 text-muted-foreground" />
              ) : (
                <FileText className="w-5 h-5 text-muted-foreground" />
              )}
              <span className="text-[9px] text-muted-foreground truncate w-full text-center font-mono-tabular">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Members */}
      <section>
        <SectionLabel>Members</SectionLabel>
        <div className="space-y-2">
          {["Alex M.", "Kira T.", "Erik L.", "You"].map((name) => (
            <div key={name} className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-surface-mid flex items-center justify-center text-[10px] font-semibold">
                {name.charAt(0)}
              </div>
              <span className="text-body">{name}</span>
            </div>
          ))}
        </div>
      </section>
    </aside>
  );
};

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-3">{children}</h3>
);

const StatBlock = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-surface-mid rounded-lg p-3">
    <p className="font-mono-tabular text-sm font-bold">{value}</p>
    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{label}</p>
  </div>
);

export default ContextPanel;
