import { gql, TypedDocumentNode } from "@apollo/client";

import {
  CreateSongData,
  CreateSongVariables,
  DeleteSongData,
  DeleteSongVariable,
  GetSongData,
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

export const GET_SONG: TypedDocumentNode<GetSongData> = gql`
  query getSong($id: ID!) {
    song(id: $id) {
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

export const DELETE_SONG: TypedDocumentNode<
  DeleteSongData,
  DeleteSongVariable
> = gql`
  mutation DeleteSong($id: ID!) {
    deleteSong(id: $id) {
      id
      title
    }
  }
`;
