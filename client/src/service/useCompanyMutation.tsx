import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL, token, userId } from "../utils/config";
import { usePopup } from "../components/general.tsx/Popup";

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

const deleteCompany = ({ companyId }: { companyId: string }) => {
  return axios.delete(`${BASE_URL}/company?companyId=${companyId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const toggleCompanyStar = ({ companyId }: { companyId: string }) => {
  return axios.put(`${BASE_URL}/company?companyId=${companyId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default function useCompanyMutation() {
  const queryClient = useQueryClient();
  const { notify } = usePopup();

  const createMutation = useMutation({
    mutationFn: createCompany(userId),
    onError() {
      console.log("CREATE COMPANY ERROR");
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["company", userId] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCompany,
    onError: () => {},
    onSuccess: () => {
      notify("Company Deleted");
      queryClient.invalidateQueries({ queryKey: ["company", userId] });
    },
  });

  return { createMutation, deleteMutation };
}
