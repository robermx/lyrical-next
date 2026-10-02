import { gql, TypedDocumentNode } from "@apollo/client";

import {
  AddLyricToSongData,
  AddLyricToSongVariables,
  CreateSongData,
  CreateSongVariables,
  DeleteSongData,
  DeleteSongVariable,
  GetSongData,
  GetSongsData,
  LikeLyricsData,
  LikeLyricVariables,
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
      lyrics {
        id
        content
        likes
      }
    }
  }
`;

export const ADD_SONG: TypedDocumentNode<CreateSongData, CreateSongVariables> =
  gql`
    mutation AddSong($title: String!) {
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

export const ADD_LYRIC_TO_SONG: TypedDocumentNode<
  AddLyricToSongData,
  AddLyricToSongVariables
> = gql`
  mutation AddLyricToSong($content: String!, $songId: ID!) {
    addLyricToSong(content: $content, songId: $songId) {
      id
      lyrics {
        id
        likes
        content
      }
    }
  }
`;

export const LIKE_LYRICS: TypedDocumentNode<
  LikeLyricsData,
  LikeLyricVariables
> = gql`
  mutation LikeLyric($id: ID) {
    likeLyric(id: $id) {
      id
      likes
    }
  }
`;
