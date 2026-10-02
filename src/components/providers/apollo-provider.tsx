"use client";

import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { PropsWithChildren } from "react";

const client = new ApolloClient({
  link: new HttpLink({ uri: "http://localhost:3000/graphql" }),
  cache: new InMemoryCache(),
});

export const ApolloWrapper = ({ children }: PropsWithChildren) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
