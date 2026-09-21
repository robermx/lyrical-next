"use client";

import { useQuery } from "@apollo/client/react";
import { Plus } from "lucide-react";
import Link from "next/link";

import { GET_SONGS } from "@/lib/constants/songs.constants";


export default function SongsPage() {
  const { data, loading, error } = useQuery(GET_SONGS);

  if (loading) return <p>Loading songs...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) {
    return <p>Songs not found.</p>;
  }

  return (
    <main className="flex flex-col gap-6 p-6 w-4xl mx-auto h-dvh min-h-80">
      <h1 className="text-center text-2xl">Songs List</h1>

      <ul className="bg-indigo-900">
        {data?.songs?.map((song) => (
          <li className="border-b p-2 border-indigo-400" key={song.id}>
            {song.title}
          </li>
        ))}
      </ul>

      <Link href={`/song-create`} className="mt-auto self-end">
        <Plus size={42} className="bg-blue-500 p-1 rounded-full"/>
      </Link>
    </main>
  );
}
