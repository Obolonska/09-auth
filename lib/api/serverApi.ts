import { User } from "@/types/user";
import { cookies } from "next/headers";
import { nextServer } from "./api";
import { Note, NotesResponse } from "@/types/note";

export async function checkSessionServer() {
  const cookieStore = await cookies();
  const { data } = await nextServer.get("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
}

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<User>("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};
export const getNotes = async (
  search: string,
  page: number,
  tag?: string,
  perPage: number = 12
): Promise<NotesResponse> => {
  const cookieStore = await cookies();
  const response = await nextServer.get<NotesResponse>(`/notes`, {
    params: {
      ...(search !== "" ? { search } : {}),
      tag,
      page,
      perPage,
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return response.data;
};
export const getSingleNote = async (id: string) => {
  const cookieStore = await cookies();
  const res = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res.data;
};
