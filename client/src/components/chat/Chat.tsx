import { ScrollArea } from "../general.tsx/ScrollArea";
import ChatAI from "./ChatAI";
import ChatInput from "./ChatInput";
import ChatUser from "./ChatUser";

export default function Chat() {
  return (
    <div className="flex flex-col p-6">
      <div className="flex-1  [&_article]:mb-8 ">
        <ScrollArea className="h-0 min-h-full flex flex-col ">
          <ChatAI />
          <ChatUser />
          <ChatUser />
          <ChatUser />
          <ChatUser />
        </ScrollArea>
      </div>
      <ChatInput />
    </div>
  );
}
