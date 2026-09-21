import { gql, TypedDocumentNode } from "@apollo/client";

import {
  CreateSongData,
  CreateSongVariables,
  GetSongsData,
} from "@/lib/types/songs.types";

export const GET_SONGS: TypedDocumentNode<GetSongsData> = gql`
  query GetSongs {
    songs {
      id
      title
    }
  }
`;

export const CREATE_SONG: TypedDocumentNode<
  CreateSongData,
  CreateSongVariables
> = gql`
  mutation CreateSong($title: String!) {
    addSong(title: $title) {
      id
      title
    }
  }
`;
