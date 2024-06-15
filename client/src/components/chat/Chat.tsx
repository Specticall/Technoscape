import { useCallback, useEffect, useRef } from "react";
import useChatQuery from "../../service/useChatQuery";
import { ScrollArea } from "../general.tsx/ScrollArea";
import ChatAI from "./ChatAI";
import ChatInput from "./ChatInput";
import ChatUser from "./ChatUser";
import { RequestChat, ResponseChat } from "../../utils/types";

function isAIChat(
  chatInput: ResponseChat | RequestChat
): chatInput is ResponseChat {
  return "tone" in chatInput;
}

export default function Chat() {
  const { chatData } = useChatQuery();

  const scrollAreaRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (!scrollAreaRef.current) return;

    const scrollElement = scrollAreaRef.current.querySelector("div>div");

    if (!scrollElement) return;

    scrollElement.scrollTo({
      top: scrollElement.scrollHeight,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [chatData, scrollToBottom]);

  return (
    <div className="flex flex-col p-6">
      <div className="flex-1  [&_article]:mb-8 ">
        <ScrollArea
          className="h-0 min-h-full flex flex-col chat-scroll-container"
          ref={scrollAreaRef}
        >
          {chatData?.map((chat) => {
            if (isAIChat(chat)) {
              return <ChatAI message={chat.message} topic={chat.topic} />;
            }

            return <ChatUser message={chat.message} />;
          })}
        </ScrollArea>
      </div>
      <ChatInput onSendChat={scrollToBottom} />
    </div>
  );
}
