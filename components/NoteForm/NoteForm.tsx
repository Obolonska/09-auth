"use client";
import { NewNote, NoteTag } from "@/types/note";
import css from "./NoteForm.module.css";
import { addNote } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { initialDraft, useNoteDraft } from "@/lib/store/noteStore";
import { ChangeEvent } from "react";

type CreateFormProps = {
  allTags: NoteTag[];
};

const NoteForm = ({ allTags }: CreateFormProps) => {
  const { draft, setDraft, clearDraft } = useNoteDraft();
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: addNote,
    onSuccess: () => {
      clearDraft();
      router.push("/notes/filter/all");
    },
  });

  const formValues: NewNote = draft ?? initialDraft;

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setDraft({
      ...(draft as NewNote),
      [e.target.name as keyof NewNote]: e.target.value,
    });
  };
  const handleSubmit = (formData: FormData) => {
    const data = Object.fromEntries(formData) as NewNote;
    mutate(data);
  };
  return (
    <form className={css.form} action={handleSubmit}>
      <label htmlFor="title">Title</label>
      <input
        id="title"
        type="text"
        name="title"
        className={css.input}
        onChange={handleChange}
        defaultValue={formValues.title}
      />
      <label htmlFor="content">Content</label>
      <textarea
        id="content"
        name="content"
        rows={8}
        className={css.textarea}
        onChange={handleChange}
        defaultValue={formValues.content}
      />
      <label htmlFor="tag">Tag</label>
      <select
        id="tag"
        name="tag"
        className={css.select}
        onChange={handleChange}
        defaultValue={formValues.tag}
      >
        {allTags.map((tag) => (
          <option key={tag} value={tag}>
            {tag}
          </option>
        ))}
      </select>
      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={() => router.back()}
        >
          Cancel
        </button>
        <button type="submit" className={css.submitButton} disabled={isPending}>
          {isPending ? "Creating..." : "Create note"}
        </button>
      </div>
    </form>
  );
};
export default NoteForm;
