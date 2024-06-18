import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { userId } from "../utils/config";
import { ChatResponse, UserMessage } from "../utils/types";
import { useCompany } from "../context/CompanyContext";
import { API } from "./Auth/API";

const mutationFn = (companyId: string) => (message: string) => {
  return API.post(`/chat`, {
    requestMessage: message,
    companyId,
  });
};

export default function useChatMutation() {
  const queryClient = useQueryClient();
  const { selectedCompany } = useCompany();

  const chatMutation = useMutation({
    mutationFn: mutationFn(selectedCompany?.id || ""),
    onMutate: async (message: string) => {
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

      const optimisticChat: UserMessage = {
        message,
        dateCreated: new Date().toDateString(),
        companyId: Math.random().toString(),
        id: Math.random().toString(),
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

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["chat", userId, selectedCompany?.id],
      });
    },
  });

  return chatMutation;
}
