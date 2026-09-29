"use client";

import { useMutation, useQuery } from "@apollo/client/react";
import { Home, Plus, Trash2Icon } from "lucide-react";
import Link from "next/link";

import { DELETE_SONG, GET_SONGS } from "@/lib/constants/songs.constants";
import useDialog from "@/store/useDialog";

export default function SongsPage() {
  const { data, loading, error } = useQuery(GET_SONGS);
  const [deleteSong] = useMutation(DELETE_SONG, {
    update(cache, { data }) {
      const deletedId = data?.deleteSong?.id;

      if (!deletedId) return;

      cache.updateQuery({ query: GET_SONGS }, (current) => {
        if (!current) return current;

        return {
          ...current,
          songs: (current.songs ?? []).filter((song) => song.id !== deletedId),
        };
      });
    },
  });
  const setDialog = useDialog((state) => state.setDialog);

  if (loading) return <p>Loading songs...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return <p>Songs not found.</p>;

  const handleDelete = async (id: string) => {
    await deleteSong({
      variables: { id },
      // refetchQueries: [{ query: GET_SONGS }],
      // awaitRefetchQueries: true,
    });
  };

  const confirmDelete = (id: string, title: string) => {
    setDialog({
      title: "Delete song?",
      description: (
        <p>
          Are you sure you want to delete{" "}
          <span className="font-bold text-indigo-600">“{title}”</span>? This
          action cannot be undone.
        </p>
      ),
      submitButtonText: "Delete",
      onSubmit: () => handleDelete(id),
    });
  };

  return (
    <>
      <main className="flex flex-col gap-6 p-6 w-full max-w-3xl mx-auto h-dvh min-h-80">
        <Link href={`/`}>
          <Home
            size={32}
            className="text-blue-400 bg-blue-500 p-1 rounded-lg"
          />
        </Link>
        <h1 className="text-center text-2xl">Songs List</h1>

        <ul className="bg-indigo-900">
          {data?.songs?.map((song) => (
            <li
              className="flex items-center border-b py-2 px-4 border-indigo-400"
              key={song.id}
            >
              <Link
                href={`/songs/${song.id}`}
                className="flex-1 hover:underline"
              >
                {song.title}
              </Link>
              <div>
                <Trash2Icon
                  onClick={() => confirmDelete(song.id, song.title)}
                  size={20}
                  className="text-red-400 cursor-pointer hover:text-red-700"
                />
              </div>
            </li>
          ))}
        </ul>

        <Link href={`/songs/create`} className="mt-auto self-end pb-6">
          <Plus size={42} className="bg-blue-500 p-1 rounded-full" />
        </Link>
      </main>
    </>
  );
}
