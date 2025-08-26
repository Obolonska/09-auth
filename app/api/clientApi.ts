import { RegisterRequest, User } from "@/types/user";
import { nextServer } from "@/lib/api";

export const login = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>(`/auth/login`, data);
  return res.data;
};
