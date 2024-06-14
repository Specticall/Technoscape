import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL, companyId, token, userId } from "../utils/config";
import useChatQuery from "./useChatQuery";

const mutationFn = (message: string) => {
  return axios.post(
    `${BASE_URL}/chat`,
    {
      reqMessage: message,
      companyId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export default function useChatMutation() {
  const queryClient = useQueryClient();
  const { chatData } = useChatQuery();

  const chatMutation = useMutation({
    mutationFn,
    onMutate: async (message: string) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ["chat", userId] });

      // Snapshot the previous value
      const previousMessage = queryClient.getQueryData(["chat", userId]);

      // Optimistically update to the new value
      queryClient.setQueryData(["chat", userId], message);

      // Return a context with the previous and new todo
      return { previousMessage, message };
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(["chat", userId], context?.previousMessage);
    },
    onSuccess: (data) => {
      console.log("SUCCESS");
      queryClient.invalidateQueries({ queryKey: ["chat", userId] });
    },
  });

  return chatMutation;
}
