"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowBigLeft, Home } from "lucide-react";
import { GET_SONG } from "@/lib/constants/songs.constants";
import { useQuery } from "@apollo/client/react";
import LyricCreate from "@/components/common/LyricCreate";
import LyricList from "@/components/common/LyricList";

const SongDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading, error } = useQuery(GET_SONG, { variables: { id } });

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
      <h2 className="text-2xl text-blue-400">
        {loading ? `Loading song...` : data?.song?.title || "Song not found"}
      </h2>

      {error ? (
        <p className="text-red-400 text-sm">Error: {error.message}</p>
      ) : (
        <>
          <LyricList lyrics={data?.song.lyrics || []} />
          <LyricCreate songId={id} />
        </>
      )}
    </main>
  );
};

export default SongDetail;
