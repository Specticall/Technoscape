import { useRef } from "react";
import useChatQuery from "../../service/useChatQuery";
import { ScrollArea } from "../general.tsx/ScrollArea";
import ChatAI from "./ChatAI";
import ChatInput from "./ChatInput";
import ChatUser from "./ChatUser";
import { RequestChat, ResponseChat } from "../../utils/types";
import useScrollTo from "../../hooks/useScrollTo";
import useRegenerateMutation from "../../service/useRegenerateMutation";

function isAIChat(
  chatInput: ResponseChat | RequestChat
): chatInput is ResponseChat {
  return "tone" in chatInput;
}

export default function Chat() {
  const { chatData } = useChatQuery();
  // const chatMutation = useChatMutation();
  const regenerateMutation = useRegenerateMutation();
  const scrollAreaRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = useScrollTo({ scrollAreaRef }, [chatData]);

  const chatLength = chatData.length;

  const handleRegenerate = (responseId: string) => {
    // Find the latest user chat
    let userChat: RequestChat;
    for (let i = chatLength - 1; i >= 0; i--) {
      if (!isAIChat(chatData[i])) {
        userChat = chatData[i];
        break;
      }
    }

    // huhhh
    if (!userChat!)
      throw new Error(
        "The latest user chat was not found while trying to regenerate"
      );

    regenerateMutation.mutate({ requestId: userChat.id, responseId });
  };

  return (
    <div className="flex flex-col p-6">
      <div className="flex-1  [&_article]:mb-8 ">
        <ScrollArea
          className="h-0 min-h-full flex flex-col chat-scroll-container"
          ref={scrollAreaRef}
        >
          {chatData?.map((chat, i) => {
            if (isAIChat(chat)) {
              const canRegenerate =
                i === chatLength - 1 || i === chatLength - 2;
              return (
                <ChatAI
                  key={`${chat.id}-${chat.dateCreated}`}
                  onRegenerate={handleRegenerate}
                  canRegenerate={canRegenerate}
                  message={chat.message}
                  topic={chat.topic}
                  id={chat.id}
                />
              );
            }

            return <ChatUser message={chat.message} />;
          })}
        </ScrollArea>
      </div>
      <ChatInput onSendChat={scrollToBottom} />
    </div>
  );
}
