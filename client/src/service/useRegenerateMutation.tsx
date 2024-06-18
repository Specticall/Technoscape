import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userId } from "../utils/config";
import { API } from "./Auth/API";

const mutationFn = ({
  messageId,
  responseId,
}: {
  messageId?: string;
  responseId?: string;
}) => {
  return API.put(`/chat/regenerate`, {
    messageId,
    responseId,
  });
};

export default function useRegenerateMutation() {
  const queryClient = useQueryClient();

  const regenerateMutation = useMutation({
    mutationFn,
    onMutate: () => {
      console.log("SENDING...");
    },
    onError: (err) => {
      console.log("error", err);
    },
    onSuccess: () => {
      console.log("SUCCESS");
      queryClient.invalidateQueries({
        queryKey: ["chat", userId],
      });
    },
  });

  return regenerateMutation;
}
