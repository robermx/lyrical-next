"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowBigLeft, Home } from "lucide-react";
import { GET_SONG } from "@/lib/constants/songs.constants";
import { useQuery } from "@apollo/client/react";

const SongDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading, error } = useQuery(GET_SONG, { variables: { id } });

  if (loading) return <p>Loading song...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data?.song?.title) return <p>Song not found.</p>;

  return (
    <main className="flex flex-col gap-6 p-6 w-full max-w-3xl mx-auto h-dvh min-h-80">
      <div className="flex gap-3">
        <Link href={`/songs`}>
          <ArrowBigLeft
            size={32}
            className="text-blue-400 bg-blue-500 p-1 rounded-lg"
          />
        </Link>
        <Link href={`/`}>
          <Home
            size={32}
            className="text-blue-400 bg-blue-500 p-1 rounded-lg"
          />
        </Link>
      </div>
      <h2>{data.song.title}</h2>
    </main>
  );
};

export default SongDetail;
