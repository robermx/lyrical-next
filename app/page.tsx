import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-black flex flex-col justify-center items-center h-dvh gap-6">
      <h1 className="text-2xl">
        This is an introduction page: Graph QL gets a song list in this route
      </h1>
      <Link className="bg-blue-500 rounded-md px-3 py-1" href={`/songs`}>Songs List</Link>
    </div>
  );
}
