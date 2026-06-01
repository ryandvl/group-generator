"use client";

import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { getResultsRoute } from "@/lib/api";

import type { Group } from "@/utils/generation";

export default function Result() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);

  const params = useParams<{ code: string }>();

  useEffect(() => {
    async function loadRooms() {
      const response = await getResultsRoute(params.code);

      if (response?.success) {
        setGroups(response.data.result.result.groups);
      }

      setLoaded(true);
    }

    loadRooms();

    const interval = setInterval(loadRooms, 5000);

    return () => clearInterval(interval);
  }, [params.code]);

  if (groups.length == 0 && loaded) {
    notFound();
  }

  if (!loaded) {
    return <></>;
  }

  return (
    <main className="min-h-screen bg-blue-400 text-white h-full">
      <div className="flex flex-col items-center h-full p-12 gap-8 h-full">
        <header className="flex items-center justify-center px-6 py-8">
          <span
            className={`text-3xl uppercase text-zinc-50 font-bungee md:text-6xl`}
          >
            Gerador de Grupos
          </span>
        </header>

        <div className="w-full max-w-7xl mx-auto px-4 pb-24">
          <div
            className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-3

          gap-5
          justify-items-center
        "
          >
            {groups.map((group) => (
              <div
                key={group.id}
                className="
              w-full
              max-w-md

              bg-zinc-900/80
              backdrop-blur-sm

              border
              border-zinc-800

              rounded-3xl

              p-6

              shadow-2xl

              hover:border-cyan-500/50
              hover:-translate-y-1

              transition-all
              duration-200
            "
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-black text-white">
                      Grupo {group.id}
                    </h2>

                    <p className="text-zinc-400 text-sm mt-1">
                      {group.participants.length} participantes
                    </p>
                  </div>

                  <div
                    className="
                  size-12

                  rounded-2xl

                  bg-cyan-500/10
                  border border-cyan-500/20

                  flex items-center justify-center

                  text-cyan-400
                  font-bold
                  text-lg
                "
                  >
                    {group.participants.length}
                  </div>
                </div>

                <div className="h-px bg-zinc-800 my-5" />

                <div className="flex flex-col gap-3">
                  {group.participants.map((member, index) => (
                    <div
                      key={index}
                      className="
                    flex items-center gap-3

                    bg-zinc-950/60

                    border border-zinc-800

                    rounded-2xl

                    px-4 py-3

                    hover:border-zinc-700

                    transition
                  "
                    >
                      <div className="min-w-0">
                        <p
                          className="
                        text-white
                        font-medium

                        truncate
                      "
                        >
                          {member.name}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
