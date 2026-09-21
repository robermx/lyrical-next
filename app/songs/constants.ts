import { gql, TypedDocumentNode } from "@apollo/client";
import { GetSongsData } from "./types";

export const GET_SONGS: TypedDocumentNode<GetSongsData> = gql`
  query GetSongs {
    songs {
      id
      title
    }
  }
`;
