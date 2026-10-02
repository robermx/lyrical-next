import { LIKE_LYRICS } from "@/lib/constants/songs.constants";
import { Lyric } from "@/lib/types/songs.types";
import { useMutation } from "@apollo/client/react";
import { ThumbsUp } from "lucide-react";
import { FC } from "react";

interface LyricListProps {
  lyrics: Lyric[];
}

const LyricList: FC<LyricListProps> = ({ lyrics }) => {
  const [likeLyrics] = useMutation(LIKE_LYRICS);

  const handleThumbsUpClick = async (id: string, likes: number) => {
    if (!id) return;

    try {
      await likeLyrics({
        variables: { id },
        optimisticResponse: {
          likeLyric: {
            id,
            __typename: "LyricType",
            likes: likes + 1,
          },
        },
      });
    } catch {
      // Apollo exposes the error through `error`.
    }
  };

  return (
    Object.keys(lyrics).length > 0 && (
      <ul>
        {lyrics.map((lyric) => (
          <li
            className="flex bg-gray-800 border-b border-gray-700 py-2 px-4 last:border-b-0"
            key={lyric.id}
          >
            <span className="flex-1">{lyric.content}</span>
            <button
              onClick={() => handleThumbsUpClick(lyric.id, lyric.likes)}
              className="flex gap-3 cursor-pointer"
            >
              <ThumbsUp size={18} className="relative top-0.5" />
              <span>{lyric.likes}</span>
            </button>
          </li>
        ))}
      </ul>
    )
  );
};

export default LyricList;
