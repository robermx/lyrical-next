"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client/react";
import { Controller, useForm } from "react-hook-form";
import { ArrowBigLeft, Home } from "lucide-react";

import { ADD_SONG, GET_SONGS } from "@/lib/constants/songs.constants";
import { IFormInput } from "@/lib/interfaces/form-input.interface";
import Link from "next/link";

const SongCreate = () => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>({
    defaultValues: {
      songTitle: "",
    },
  });

  const [createSong, { loading, error }] = useMutation(ADD_SONG, {
    /** onCompleted data */
    // onCompleted: (data) => {
    //   console.log(data)
    // }

    /** updated cache, no server calls */
    update(cache, { data }) {
      const createdSong = data?.addSong;

      if (!createdSong) return;

      cache.updateQuery({ query: GET_SONGS }, (current) => {
        if (!current) return current;
        return { ...current, songs: [...(current?.songs ?? []), createdSong] };
      });
    },
  });

  const onSubmit = async ({ songTitle }: IFormInput) => {
    const title = songTitle.trim();
    if (!title) return;

    try {
      await createSong({
        variables: { title },
        /** another call from server */
        // refetchQueries: [{ query: GET_SONGS }],
        // awaitRefetchQueries: true,
      });
      reset();
      router.push("/songs");
    } catch {
      // Apollo exposes the error through `error`.
    }
  };

  return (
    <main className="flex flex-col gap-6 p-6 w-4xl mx-auto h-dvh min-h-80">
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
      <h2 className="text-2xl">Create a New Song</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-6">
        <div className="flex-1 relative">
          <Controller
            name="songTitle"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="title"
                className="w-full py-1 px-3 border border-indigo-500 rounded-lg"
              />
            )}
          />
          {errors.songTitle && (
            <p className="absolute -bottom-6 text-sm text-red-400">
              This field is required.
            </p>
          )}
        </div>

        <button
          type="submit"
          className="bg-indigo-500 w-30 py-1 px-3 rounded-lg cursor-pointer"
          disabled={loading}
        >
          Create
        </button>
        {error && <p className="text-sm text-red-400">{error.message}</p>}
      </form>
    </main>
  );
};

export default SongCreate;
