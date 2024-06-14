import Top from "../components/Top";
import Chat from "../components/chat/Chat";
import Aside from "../components/dashboard/Aside";

export default function Dashboard() {
  return (
    <div className="grid grid-cols-[2fr_5fr] grid-rows-[auto_1fr] min-h-full">
      <Aside />
      <Top />
      <Chat />
    </div>
  );
}
