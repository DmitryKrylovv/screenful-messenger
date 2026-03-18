import { useState } from "react";
import GlobalNav from "@/components/messenger/GlobalNav";
import InboxPanel from "@/components/messenger/InboxPanel";
import ChatPanel from "@/components/messenger/ChatPanel";
import ContextPanel from "@/components/messenger/ContextPanel";

const Index = () => {
  const [activeChat, setActiveChat] = useState("1");

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <GlobalNav />
      <InboxPanel activeId={activeChat} onSelect={setActiveChat} />
      <ChatPanel activeId={activeChat} />
      <ContextPanel />
    </div>
  );
};

export default Index;
