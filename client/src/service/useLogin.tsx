import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../utils/config";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

type LoginResponse = {
  status: string;
  token: string;
};

export default function useLogin() {
  const navigate = useNavigate();
  const { handleSetToken } = useAuth();

  const loginMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) => {
      return axios.post<LoginResponse>(`${BASE_URL}/auth/login`, {
        email,
        password,
      });
    },
    onError: (err) => {
      console.log("ERRORED", err);
    },
    onSuccess: (data) => {
      handleSetToken(data.data.token);
      navigate("/app/dashboard/inbox");
    },
  });

  return loginMutation;
}
