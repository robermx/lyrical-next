export type Lyric = {
  content: string;
  id: string
  likes: number
};

export type Song = {
  id: string;
  title: string;
  lyrics: Lyric[]
};



export type GetSongsData = {
  songs: Song[] | null;
};

export type GetSongData = {
  song: Song
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
  addLyricToSong: Song | null;
};

export type AddLyricToSongVariable = {
  content: string;
  songId: string;
};
