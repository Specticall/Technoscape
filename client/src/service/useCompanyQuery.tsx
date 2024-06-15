import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL, token, userId } from "../utils/config";
import { SuccessResponse } from "../utils/types";

export type Company = {
  id: string;
  name: string;
  userId: string;
  starred: boolean;
  archived: boolean;
};

export default function useCompanyQuery() {
  const companyQuery = useQuery({
    queryFn: () => {
      return axios.get<SuccessResponse<Company[]>>(
        `${BASE_URL}/company?userId=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    queryKey: ["company", userId],
  });

  const companyData = companyQuery.data?.data.data;

  return { companyData, companyQuery };
}
