import { RegisterRequest, User } from "@/types/user";
import { nextServer } from "./clientApi";
import { cookies } from "next/headers";

export const checkServerSession = async () => {
  // Дістаємо поточні cookie
  const cookieStore = await cookies();
  const res = await nextServer.get("/auth/session", {
    headers: {
      // передаємо кукі далі
      Cookie: cookieStore.toString(),
    },
  });
  // Повертаємо повний респонс, щоб middleware мав доступ до нових cookie
  return res;
};

export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>(`/auth/register`, data);
  return res.data;
};
export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};
