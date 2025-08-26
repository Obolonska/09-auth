import { RegisterRequest, User } from "@/types/user";
import axios from "axios";
import type { Note, NewNote } from "@/types/note";

const baseURL = process.env.NEXT_PUBLIC_API_URL + `/api`;

export const nextServer = axios.create({
  baseURL: baseURL,
  withCredentials: true, // дозволяє axios працювати з cookie
});

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export const getNotes = async (
  search: string,
  page: number,
  tag?: string
): Promise<NotesResponse> => {
  const response = await nextServer.get<NotesResponse>(`/notes`, {
    params: {
      ...(search !== "" ? { search } : {}),
      tag,
      page,
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
  await nextServer.post(`/auth/logout`);
};

export const login = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>(`/auth/login`, data);
  return res.data;
};

export type UpdateUserRequest = {
  userName?: string;
  photoUrl?: string;
};

export const updateMe = async (payload: UpdateUserRequest) => {
  const res = await nextServer.patch<User>("/users/me", payload);
  return res.data;
};
