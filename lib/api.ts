import axios from "axios";

import type { Note, NewNote } from "../types/note";

const baseURL = process.env.NEXT_PUBLIC_API_URL + `/api`;
// axios.defaults.baseURL = "https://notehub-api.goit.study";

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
