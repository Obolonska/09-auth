import { tags } from "@/types/note";
import css from "./page.module.css";
import NoteForm from "@/components/NoteForm/NoteForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Note create",
  description: "Note create",
  openGraph: {
    title: "Note create",
    description: "Note create",
    url: `https://notehub.com/notes/action/create`,
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Note Hub",
      },
    ],
    type: "article",
  },
};

const createNote = () => {
  const allTags = tags;
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm allTags={allTags} />
      </div>
    </main>
  );
};
export default createNote;
