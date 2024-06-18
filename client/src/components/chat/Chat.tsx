import { useRef, useState } from "react";
import useChatQuery from "../../service/useChatQuery";
import { ScrollArea } from "../general.tsx/ScrollArea";
import ChatInput from "./ChatInput";
import useScrollTo from "../../hooks/useScrollTo";
import LoadingSpinner from "../general.tsx/LoadingSpinner";
import ChatList from "./ChatList";

export default function Chat() {
  const { chatData } = useChatQuery();
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = useScrollTo({ scrollAreaRef }, [chatData]);

  return (
    <div className="flex flex-col p-6">
      <div className="flex-1  [&_article]:mb-8 ">
        <ScrollArea
          className="h-0 min-h-full flex flex-col chat-scroll-container"
          ref={scrollAreaRef}
        >
          <ChatList />
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
