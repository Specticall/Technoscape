import useRegenerateMutation from "../../service/useRegenerateMutation";
import { AIResponse, UserMessage } from "../../utils/types";
import ChatAI from "./ChatAI";
import ChatStatistics from "./ChatStatistics";
import ChatUser from "./ChatUser";
import useChatQuery from "../../service/useChatQuery";
import ChatSkeleton from "./ChatSkeleton";

function isAIChat(
  chatInput: AIResponse | UserMessage
): chatInput is AIResponse {
  return "tone" in chatInput;
}

export default function ChatList() {
  const { chatData, chatQuery } = useChatQuery();
  const regenerateMutation = useRegenerateMutation();

  const chatLength = chatData.length;

  const handleRegenerate = (responseId: string) => {
    // Find the latest user chat
    let userChat: UserMessage;
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

    regenerateMutation.mutate({ messageId: userChat.id, responseId });
  };

  if (chatQuery.isLoading) return <ChatSkeleton />;

  return chatData?.map((chat, i) => {
    if (isAIChat(chat)) {
      const canRegenerate = i === chatLength - 1 || i === chatLength - 2;

      return (
        <>
          <ChatStatistics sentiment={+chat.tone} urgency={+chat.urgency} />
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

    return <ChatUser message={chat.message} key={chat.id} />;
  });
}
