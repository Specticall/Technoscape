import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL, companyId, token, userId } from "../utils/config";
import { ChatResponse } from "../utils/types";

export default function useChatQuery() {
  const chatQuery = useQuery({
    queryFn: () => {
      return axios.get<ChatResponse>(
        `${BASE_URL}/chat?userId=${userId}&companyId=${companyId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    queryKey: ["chat", userId],
  });

  const chatData = chatQuery.data?.data?.data || [];

  return { chatData, chatQuery };
}
