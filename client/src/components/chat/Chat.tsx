import { useEffect, useRef, useState } from "react";
import useChatQuery from "../../service/useChatQuery";
import { ScrollArea } from "../general.tsx/ScrollArea";
import ChatAI from "./ChatAI";
import ChatInput from "./ChatInput";
import ChatUser from "./ChatUser";
import { RequestChat, ResponseChat } from "../../utils/types";
import useScrollTo from "../../hooks/useScrollTo";
import useRegenerateMutation from "../../service/useRegenerateMutation";
import ChatStatistics from "./ChatStatistics";
import LoadingSpinner from "../general.tsx/LoadingSpinner";
import useChatMutation from "../../service/useChatMutation";

function isAIChat(
  chatInput: ResponseChat | RequestChat
): chatInput is ResponseChat {
  return "tone" in chatInput;
}

export default function Chat() {
  const { chatData } = useChatQuery();
  const [isLoading, setIsLoading] = useState(false);
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
                <>
                  <ChatStatistics
                    sentiment={+chat.tone}
                    urgency={+chat.urgency}
                  />
                  <ChatAI
                    key={`${chat.id}-${chat.dateCreated}`}
                    onRegenerate={handleRegenerate}
                    canRegenerate={canRegenerate}
                    message={chat.message}
                    topic={chat.topic}
                    id={chat.id}
                  />
                </>
              );
            }

            return <ChatUser message={chat.message} />;
          })}
          {isLoading && (
            <div className="flex gap-2 items-center justify-center w-full mb-6">
              <div>
                <LoadingSpinner size={"sm"} />
              </div>
              <p>Generating Response...</p>
            </div>
          )}
        </ScrollArea>
      </div>
      <ChatInput
        onSendChat={() => {
          scrollToBottom();
          setIsLoading(true);
        }}
        onSuccess={() => {
          setIsLoading(false);
        }}
      />
    </div>
  );
}
