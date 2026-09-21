# Lyrical Web Client

The web client for **Lyrical**, a small full-stack GraphQL application for managing songs and their lyrics. It is built with Next.js, React, TypeScript, Tailwind CSS, and Apollo Client.

The application connects to the GraphQL API provided by the sibling `lyrical-server` project. During local development, the API is expected to run at `http://localhost:3000/graphql` and the Next.js app runs at `http://localhost:3001`.

## Architecture

```text
Browser
  │
  ├── Next.js App Router (port 3001)
  │     └── Apollo Client
  │
  └── GraphQL request → GraphQL Yoga API (port 3000)
                              └── MongoDB Atlas
```

`app/providers/apollo-provider.tsx` is a Client Component that creates the Apollo Client instance and makes it available to interactive client components through `ApolloProvider`. The root layout remains a Server Component and renders this provider around the application.

## Features

- Landing page with navigation to the song list.
- `/songs` route that queries and renders the available songs.
- Typed GraphQL document for the `GetSongs` query.
- `/song-create` route containing the initial song-creation form UI.
- Lucide icons for lightweight, tree-shakable SVG icons.

## Prerequisites

- Node.js and pnpm.
- The [Lyrical server](../lyrical-server/README.md) running locally.

## Getting Started

Install dependencies:

```bash
pnpm install
```

Start the development server:

```bash
pnpm dev
```

Open [http://localhost:3001](http://localhost:3001).

Before visiting the songs page, start the API from the `lyrical-server` directory. The Apollo `HttpLink` currently targets:

```text
http://localhost:3000/graphql
```

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Introduction page and entry point to the application. |
| `/songs` | Fetches and displays the song list through Apollo Client. |
| `/song-create` | Initial UI for the create-song workflow. |

## GraphQL Usage

The songs page uses Apollo's `useQuery` hook with a typed document:

```graphql
query GetSongs {
  songs {
    id
    title
  }
}
```

The query and its TypeScript result type live in `app/songs/constants.ts` and `app/songs/types.ts`. Keeping the query document typed allows Apollo and TypeScript to infer the type of `data` without manually passing generics to `useQuery`.

## Useful Commands

```bash
pnpm dev     # Start Next.js on port 3001
pnpm lint    # Run ESLint
pnpm build   # Create a production build
pnpm start   # Run the production server on port 3001
```

## Notes for Deployment

- Replace the local GraphQL endpoint with an environment-specific URL before deployment.
- Do not expose database credentials or server-only secrets through `NEXT_PUBLIC_*` variables.
- Keep API access controls and CORS configuration aligned with the deployed frontend origin.
