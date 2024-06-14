import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL, companyId, token, userId } from "../utils/config";
import { SuccessResponse } from "../utils/types";

export type RequestChat = {
  id: number;
  comment: string;
  companyId: string;
  dateCreated: string;
};

export type ResponseChat = {
  id: number;
  message: string;
  companyId: string;
  dateCreated: string;
  tone: number;
  topic: string;
  urgency: number;
};

type ChatResponse = SuccessResponse<(ResponseChat | RequestChat)[]>;

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

  const chatData = chatQuery.data?.data.data;

  return { chatData, chatQuery };
}
