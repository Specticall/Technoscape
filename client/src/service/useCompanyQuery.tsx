import { useQuery } from "@tanstack/react-query";
import { userId } from "../utils/config";
import { SuccessResponse } from "../utils/types";
import { API } from "./Auth/API";

export type Company = {
  id: string;
  name: string;
  userId: string;
  starred: boolean;
  archived: boolean;
};

export default function useCompanyQuery() {
  const companyQuery = useQuery({
    queryFn: () =>
      API.get<SuccessResponse<Company[]>>(`/company?userId=${userId}`),
    queryKey: ["company", userId],
  });

  const companyData = companyQuery.data?.data.data;

  return { companyData, companyQuery };
}
