import { useState } from "react";
import GlobalNav, { type AppView } from "@/components/messenger/GlobalNav";
import InboxPanel from "@/components/messenger/InboxPanel";
import ChatPanel from "@/components/messenger/ChatPanel";
import ContextPanel from "@/components/messenger/ContextPanel";
import CloudStoragePanel from "@/components/messenger/CloudStoragePanel";
import MusicPanel from "@/components/messenger/MusicPanel";

const Index = () => {
  const [activeChat, setActiveChat] = useState("1");
  const [activeView, setActiveView] = useState<AppView>("messenger");

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <GlobalNav activeView={activeView} onViewChange={setActiveView} />
      {activeView === "messenger" && (
        <>
          <InboxPanel activeId={activeChat} onSelect={setActiveChat} />
          <ChatPanel activeId={activeChat} />
          <ContextPanel />
        </>
      )}
      {activeView === "cloud" && <CloudStoragePanel />}
      {activeView === "music" && <MusicPanel />}
    </div>
  );
};

export default Index;
