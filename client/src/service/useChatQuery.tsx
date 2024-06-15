import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL, companyId, token, userId } from "../utils/config";
import { ChatResponse } from "../utils/types";
import { useCompany } from "../context/CompanyContext";
import useCompanyQuery from "./useCompanyQuery";

export default function useChatQuery() {
  const { selectedCompany } = useCompany();
  const { companyData } = useCompanyQuery();
  // console.log(
  //   `${BASE_URL}/chat?userId=${userId}&${
  //     selectedCompany ? "companyId=" + String(selectedCompany?.id) : ""
  //   }`
  // );
  const chatQuery = useQuery({
    queryFn: () => {
      return axios.get<ChatResponse>(
        `${BASE_URL}/chat?userId=${userId}&${
          "companyId=" + String(selectedCompany?.id)
        }`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    queryKey: ["chat", userId, selectedCompany?.id],
    enabled: Boolean(companyData) && Boolean(selectedCompany),
  });

  const chatData = chatQuery.data?.data?.data || [];

  return { chatData, chatQuery };
}
