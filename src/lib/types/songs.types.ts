type TypeName = {
  __typename?: string;
};

export type Lyric = TypeName & {
  id: string;
  likes: number;
  content?: string;
};

export type Song = TypeName & {
  id: string;
  title: string;
  lyrics: Lyric[];
};

export type GetSongsData = {
  songs: Song[] | null;
};

export type GetSongData = {
  song: Song;
};

export type CreateSongData = {
  addSong: Song | null;
};

export type CreateSongVariables = {
  title: string;
};

export type DeleteSongData = {
  deleteSong: Song | null;
};

export type DeleteSongVariable = {
  id: string;
};

export type AddLyricToSongData = {
  addLyricToSong: Lyric | null;
};

export type AddLyricToSongVariables = {
  content: string;
  songId: string;
};

export type LikeLyricsData = {
  likeLyric: Lyric | null;
};

export type LikeLyricVariables = {
  id: string;
};
