import { User, UserRequest } from "@/types/user";
import type { Note, NewNote, NotesResponse } from "@/types/note";
import { nextServer } from "./api";

export const getNotes = async (
  search: string,
  page: number,
  tag?: string,
  perPage: number = 12
): Promise<NotesResponse> => {
  const response = await nextServer.get<NotesResponse>(`/notes`, {
    params: {
      ...(search !== "" ? { search } : {}),
      tag,
      page,
      perPage,
    },
  });

  return response.data;
};
export const getSingleNote = async (id: string) => {
  const res = await nextServer.get<Note>(`/notes/${id}`);
  return res.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const res = await nextServer.delete<Note>(`/notes/${noteId}`);
  return res.data;
};

export const addNote = async (noteData: NewNote): Promise<Note> => {
  const res = await nextServer.post<Note>(`/notes`, noteData);
  return res.data;
};

type CheckSessionRequest = {
  success: boolean;
};

export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionRequest>(`/auth/session`);
  return res.data.success;
};
export const getMe = async () => {
  const res = await nextServer.get<User>(`/users/me`);
  return res.data;
};
export const logout = async (): Promise<void> => {
  const res = await nextServer.post(`/auth/logout`);
  return res.data.success;
};

export const updateMe = async (user: Partial<User>) => {
  const res = await nextServer.patch<User>("/users/me", user);
  return res.data;
};

export const register = async (user: UserRequest) => {
  const res = await nextServer.post<User>(`/auth/register`, user);
  return res.data;
};

export const login = async (user: UserRequest) => {
  const res = await nextServer.post<User>(`/auth/login`, user);
  return res.data;
};
