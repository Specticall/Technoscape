import { useQuery } from "@tanstack/react-query";
import { userId } from "../utils/config";
import { ChatResponse } from "../utils/types";
import { useCompany } from "../context/CompanyContext";
import useCompanyQuery from "./useCompanyQuery";
import { API } from "./Auth/API";

export default function useChatQuery() {
  const { selectedCompany } = useCompany();
  const { companyData } = useCompanyQuery();

  const chatQuery = useQuery({
    queryFn: () => {
      return API.get<ChatResponse>(
        `/chat?userId=${userId}&${"companyId=" + String(selectedCompany?.id)}`
      );
    },
    queryKey: ["chat", userId, selectedCompany?.id],
    enabled: Boolean(companyData) && Boolean(selectedCompany),
  });

  const chatData = chatQuery.data?.data?.data || [];

  return { chatData, chatQuery };
}
