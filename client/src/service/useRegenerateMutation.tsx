import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL, token, userId } from "../utils/config";
import { useCompany } from "../context/CompanyContext";
import { useAuth } from "../context/AuthContext";

const mutationFn = ({
  requestId,
  responseId,
}: {
  requestId?: string;
  responseId?: string;
}) => {
  return axios.put(
    `${BASE_URL}/chat/regenerate`,
    {
      requestId,
      responseId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export default function useRegenerateMutation() {
  const queryClient = useQueryClient();
  const { token } = useAuth();

  const regenerateMutation = useMutation({
    mutationFn,
    onMutate: () => {
      console.log("SENDING...");
    },
    onError: (err) => {
      console.log("error", err);
    },
    onSuccess: (data) => {
      console.log("SUCCESS");
      queryClient.invalidateQueries({
        queryKey: ["chat", userId],
      });
    },
  });

  return regenerateMutation;
}
