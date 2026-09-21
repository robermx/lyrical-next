export type Song = {
  id: string;
  title: string;
};

export type GetSongsData = {
  songs: Song[] | null;
};

export type CreateSongData = {
  addSong: Song | null;
};

export type CreateSongVariables = {
  title: string;
};
