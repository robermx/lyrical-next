import { Controller, useForm } from "react-hook-form";
import { useMutation } from "@apollo/client/react";

import { ADD_LYRIC_TO_SONG } from "@/lib/constants/songs.constants";
import { IFormLyric } from "@/lib/interfaces/form-input.interface";
import { FC } from "react";

interface LyricCreateProps {
  songId: string;
}

const LyricCreate: FC<LyricCreateProps> = ({ songId }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormLyric>({
    defaultValues: {
      lyric: "",
    },
  });

  const [addLyricToSong, { loading, error }] = useMutation(ADD_LYRIC_TO_SONG, {
    /** with this update there are just one call to server */
    // update(cache, { data }) {
    //   const newLyrics = data?.addLyricToSong?.lyrics;
    //   if (!newLyrics) return;
    //   cache.updateQuery(
    //     { query: GET_SONG, variables: { id: songId } },
    //     (current) => {
    //       if (!current) return;
    //       return {
    //         ...current,
    //       };
    //     },
    //   );
    // },
  });

  const onSubmit = async ({ lyric }: IFormLyric) => {
    const content = lyric.trim();
    if (!content || !songId) return;

    try {
      await addLyricToSong({
        variables: { content, songId },
        /** another call from server */
        // refetchQueries: [{ query: GET_SONG, variables: { id: songId } }],
        // awaitRefetchQueries: true,
      });
      reset();
    } catch {
      // Apollo exposes the error through `error`.
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-6">
      <div className="flex-1 relative">
        <Controller
          name="lyric"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              placeholder="Content"
              className="w-full py-1 px-3 border border-indigo-500 rounded-lg"
            />
          )}
        />
        {errors.lyric && (
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
        Create lyric
      </button>
      {error && <p className="text-sm text-red-400">{error.message}</p>}
    </form>
  );
};

export default LyricCreate;
