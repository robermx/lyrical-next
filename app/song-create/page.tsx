const SongCreate = () => {
  return (
    <main className="flex flex-col gap-6 p-6 w-4xl mx-auto h-dvh min-h-80">
      <h2 className="text-2xl">Create a New Song</h2>
      <form className="flex gap-6">
        <input
          type="text"
          placeholder="title"
          className="py-1 px-3 border border-indigo-500 rounded-lg flex-1"
        />
        <button className="bg-indigo-500 w-30 py-1 px-3 rounded-lg">
          Create
        </button>
      </form>
    </main>
  );
};

export default SongCreate;
