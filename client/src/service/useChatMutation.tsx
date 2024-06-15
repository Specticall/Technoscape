import {
  UseQueryResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { BASE_URL, token, userId } from "../utils/config";
import useChatQuery from "./useChatQuery";
import { ChatResponse, RequestChat } from "../utils/types";
import { useCompany } from "../context/CompanyContext";

const mutationFn = (companyId: string) => (message: string) => {
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
  const { selectedCompany } = useCompany();

  const chatMutation = useMutation({
    mutationFn: mutationFn(selectedCompany?.id || ""),
    onMutate: async (message: string) => {
      console.log("SENDING...");
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({
        queryKey: ["chat", userId, selectedCompany?.id],
      });

      // Snapshot the previous value
      const previousMessage = queryClient.getQueryData([
        "chat",
        userId,

        selectedCompany?.id,
      ]);

      const optimisticChat: RequestChat = {
        message,
        dateCreated: new Date().toDateString(),
        companyId: Math.random().toString(),
        id: Math.random(),
      };
      // Optimistically update to the new value
      queryClient.setQueryData(
        ["chat", userId, selectedCompany?.id],
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
      queryClient.setQueryData([
        "chat",
        userId,

        selectedCompany?.id,
        context?.previousMessage,
      ]);
    },
    onSuccess: (data) => {
      console.log("SUCCESS");
      queryClient.invalidateQueries({
        queryKey: ["chat", userId, selectedCompany?.id],
      });
    },
  });

  return chatMutation;
}
