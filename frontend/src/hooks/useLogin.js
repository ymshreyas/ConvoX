import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { login } from "../lib/api";

const useLogin = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] }),
        toast.success("Logged in successfully!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Login failed");
    },
  });
  return { loginMutation: mutate, isPending };
};

export default useLogin;
