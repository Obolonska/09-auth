"use client";

import { useState } from "react";
import css from "./page.module.css";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";

import { getNotes, NotesResponse } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";

import EmptyState from "@/components/EmptyState/EmptyState";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import Link from "next/link";

interface NotesClientProps {
  initialData: NotesResponse;
  initialTag?: string;
}

export default function NotesClient({
  initialData,
  initialTag,
}: NotesClientProps) {
  const { notes, totalPages } = initialData;
  const [searchQuery, setSearchQuery] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [page, setPage] = useState(1);

  const updateSearchQuery = useDebouncedCallback((value: string) => {
    setSearchQuery(value);
    setPage(1);
  }, 300);

  const handleInputChange = (newValue: string) => {
    setInputValue(newValue); // миттєво показує користувачу
    updateSearchQuery(newValue); // запускає пошук із затримкою
  };

  const { data, isLoading } = useQuery({
    queryKey: ["notes", searchQuery, page, initialTag],
    queryFn: () => getNotes(searchQuery, page, initialTag),
    initialData: { notes, totalPages },
    placeholderData: keepPreviousData,
  });

  const currentTotalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={inputValue} onSearch={handleInputChange} />
        {currentTotalPages > 1 && (
          <Pagination
            totalPages={currentTotalPages}
            page={page}
            onPageChange={setPage}
          />
        )}

        <Link
          className={css.button}
          rel="stylesheet"
          href="/notes/action/create"
        >
          Create note +
        </Link>
      </header>

      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}

      {isLoading && <p>Loading...</p>}

      {data && !isLoading && data.notes.length === 0 && (
        <EmptyState message="No notes found." />
      )}
    </div>
  );
}
