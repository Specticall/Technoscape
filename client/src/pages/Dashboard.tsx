import { useState } from "react";
import Top from "../components/Top";
import Chat from "../components/chat/Chat";
import Aside from "../components/dashboard/Aside";
import { cn } from "../utils/helper";

export default function Dashboard() {
  const [showAside, setShowAside] = useState(true);

  return (
    <div
      className={cn(
        "grid grid-cols-[2fr_5fr] grid-rows-[auto_1fr] min-h-full transition-all duration-500",
        !showAside && "grid-cols-[0fr_5fr]"
      )}
    >
      <Aside onHide={() => setShowAside(false)} hidden={!showAside} />
      <Top />
      <Chat />
    </div>
  );
}
