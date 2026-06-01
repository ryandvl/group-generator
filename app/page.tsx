export default function Home() {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="flex flex-col justify-center items-center h-full p-12 gap-32">
        {/* <Header /> */}

        <a
          href="/generate"
          className="text-3xl text-zinc-50 bg-blue-500 p-4 font-bold rounded-md"
        >
          Criar
        </a>
      </div>
    </div>
  );
}
