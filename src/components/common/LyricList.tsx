import { Lyric } from "@/lib/types/songs.types";
import { ThumbsUp } from "lucide-react";
import { FC } from "react";

interface LyricListProps {
  lyrics: Lyric[];
}

const LyricList: FC<LyricListProps> = ({ lyrics }) => {
  return (
    Object.keys(lyrics).length > 0 && (
      <ul>
        {lyrics.map((lyric) => (
          <li className="flex items-center bg-gray-800 border-b border-gray-700 py-2 px-4 last:border-b-0" key={lyric.id}>
            <span className="flex-1">{lyric.content}</span>
            <span className="flex  gap-2">
              <ThumbsUp size={18} />
              {lyric.likes}
            </span>
          </li>
        ))}
      </ul>
    )
  );
};

export default LyricList;
