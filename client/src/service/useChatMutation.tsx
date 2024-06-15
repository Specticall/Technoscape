import {
  UseQueryResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { BASE_URL, companyId, token, userId } from "../utils/config";
import useChatQuery from "./useChatQuery";
import { ChatResponse, RequestChat } from "../utils/types";

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

  const chatMutation = useMutation({
    mutationFn,
    onMutate: async (message: string) => {
      console.log("SENDING...");
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ["chat", userId] });

      // Snapshot the previous value
      const previousMessage = queryClient.getQueryData(["chat", userId]);

      const optimisticChat: RequestChat = {
        message,
        dateCreated: new Date().toDateString(),
        companyId: Math.random().toString(),
        id: Math.random(),
      };
      // Optimistically update to the new value
      queryClient.setQueryData(
        ["chat", userId],
        (current: AxiosResponse<ChatResponse, unknown>) => {
          const currentData = current?.data ? current.data?.data : [];
          return {
            data: {
              data: [...currentData, optimisticChat],
            },
          };
        }
      );

      // Return a context with the previous and new todo
      return { previousMessage, optimisticChat };
    },
    onError: (err, newTodo, context) => {
      console.log("error", err);
      queryClient.setQueryData(["chat", userId], context?.previousMessage);
    },
    onSuccess: (data) => {
      console.log("SUCCESS");
      queryClient.invalidateQueries({ queryKey: ["chat", userId] });
    },
  });

  return chatMutation;
}
