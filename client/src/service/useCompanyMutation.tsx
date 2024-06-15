import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL, token, userId } from "../utils/config";

const createCompany =
  (userId: string) =>
  ({ companyName }: { companyName: string }) => {
    return axios.post(
      `${BASE_URL}/company`,
      {
        companyName,
        userId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

export default function useCompanyMutation() {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createCompany(userId),
    onError() {
      console.log("CREATE COMPANY ERROR");
    },
    onSuccess() {
      console.log("SUCCESS");
      queryClient.invalidateQueries({ queryKey: ["company", userId] });
    },
  });

  return { createMutation };
}
