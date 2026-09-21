export type Song = {
  id: string;
  title: string;
};

export type GetSongsData = {
  songs: Song[] | null;
}