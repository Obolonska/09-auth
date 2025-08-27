import { getNotes } from "@/lib/api/clientApi";
import { Metadata } from "next";
import NotesClient from "./Notes.client";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug?.[0];

  const tagLabel = tag === "all" || !tag ? "All Notes" : `${tag} Notes`;

  return {
    title: tagLabel,
    description: `Browse ${tagLabel} on NoteHub`,
    openGraph: {
      title: tagLabel,
      description: `Browse ${tagLabel} on NoteHub`,
      url: `https://notehub-api.goit.study/notes/${tag ?? "all"}`,
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
}

export default async function NotesPage({ params }: Props) {
  const { slug } = await params;

  const tagNote = slug[0] === "all" ? undefined : slug[0];

  const { notes, totalPages } = await getNotes("", 1, tagNote);

  return (
    <section>
      <NotesClient initialData={{ notes, totalPages }} initialTag={tagNote} />
    </section>
  );
}
