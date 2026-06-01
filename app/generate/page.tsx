"use client";

import { useRouter } from "next/navigation";
import { useState, type SubmitEvent } from "react";

import * as Dialog from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";

import { Participant } from "@/components/participant";
import { postResultsRoute, type IParticipant } from "@/lib/api";
import { generateRandomId } from "@/utils/generation";

export default function Generate() {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [participantName, setParticipantName] = useState("");
  const [step, setStep] = useState<number>(0);
  const [participants, setParticipants] = useState<IParticipant[]>([]);
  const [idealSize, setIdealSize] = useState(1);
  const [minGroup, setMinGroup] = useState(1);
  const [maxGroup, setMaxGroup] = useState(1);

  function handleOnAddParticipant(event: SubmitEvent<HTMLFormElement>) {
    setOpen(false);
    event.preventDefault();

    setParticipants([
      ...participants,
      {
        name: participantName,
        id: generateRandomId(),
      },
    ]);
  }

  function handleOnRemoveParticipant(id: string) {
    const result = participants.filter((participant) => participant.id != id);
    setParticipants(result);
  }

  function handleOnRemoveAllParticipants() {
    setParticipants([]);
  }

  function handleOnEditParticipant(
    id: string,
    event: SubmitEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    const result = [];
    for (const participant of participants) {
      if (participant.id == id)
        result.push({
          ...participant,
          name: participantName,
        });
      else result.push(participant);
    }

    setParticipants(result);
  }

  async function handleOnNextStep() {
    setStep(step + 1);

    if (step == 1) {
      const result = await postResultsRoute(
        JSON.stringify({
          participants,
          idealSize,
          minGroup,
          maxGroup,
        }),
      );
      router.push(`/results/${result.data.code}`);
    }
  }

  return (
    <main className="min-h-screen bg-blue-400 text-white">
      <header className="flex items-center justify-center px-6 py-8">
        <span
          className={`text-3xl uppercase text-zinc-50 font-bungee md:text-6xl`}
        >
          Gerador de Grupos
        </span>
      </header>

      <div className="max-w-2xl lg:max-w-6xl mx-auto h-full">
        {step == 0 && (
          <>
            <span
              className={`flex items-center justify-center text-2xl uppercase text-yellow-200 font-bebas-neue font-bold md:text-4xl`}
            >
              Participantes ({participants.length})
            </span>
            <div className="h-full overflow-y-auto p-4 pb-28 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {participants.map(({ id, name }) => (
                <Participant
                  id={id}
                  key={id}
                  name={name}
                  onEdit={handleOnEditParticipant}
                  onRemove={handleOnRemoveParticipant}
                  setParticipantName={setParticipantName}
                />
              ))}
            </div>

            <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full p-4 max-w-2xl">
              <Dialog.Root open={open} onOpenChange={setOpen}>
                <Dialog.Trigger asChild>
                  <button className="w-full bg-green-500 hover:bg-green-400 active:scale-[0.98] transition rounded-2xl py-4 text-lg font-bold">
                    Adicionar
                  </button>
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay
                    className="
            fixed inset-0 bg-black/60
            backdrop-blur-sm
            animate-in fade-in
          "
                  />
                  <Dialog.Content
                    className="
            fixed left-1/2 top-1/2 w-[90vw] max-w-md
            -translate-x-1/2 -translate-y-1/2

            rounded-3xl border border-zinc-800
            bg-zinc-800 p-6 shadow-2xl

            animate-in zoom-in-95
            outline-none
          "
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <Dialog.Title className="text-xl font-semibold text-white">
                          Adicionar participante
                        </Dialog.Title>
                      </div>

                      <Dialog.Close asChild>
                        <button
                          className="
                  rounded-lg p-2 text-zinc-400
                  transition hover:bg-zinc-800
                  hover:text-white
                "
                        >
                          <XIcon size={24} />
                        </button>
                      </Dialog.Close>
                    </div>

                    <div className="mt-2 space-y-8">
                      <form onSubmit={handleOnAddParticipant}>
                        <label className="font-medium text-zinc-200 w-full">
                          Nome
                        </label>

                        <input
                          type="text"
                          minLength={1}
                          className="h-12 w-full rounded-xl mt-2 border border-zinc-700 bg-zinc-950 px-4 text-white outline-none transition focus:border-green-500"
                          autoFocus
                          onChange={(event) =>
                            setParticipantName(event.target.value)
                          }
                        />

                        <button
                          disabled={!participantName.length}
                          className="h-12 w-full rounded-xl bg-green-600 font-medium text-white transition hover:bg-green-500 mt-6"
                          type="submit"
                        >
                          Adicionar
                        </button>
                      </form>
                    </div>
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>

              <button
                className="w-full bg-red-500 hover:bg-cyan-400 active:scale-[0.98] transition rounded-2xl py-4 text-lg font-bold mt-4"
                onClick={handleOnRemoveAllParticipants}
              >
                Remover todos
              </button>

              <button
                className="w-full bg-yellow-500 hover:bg-yellow-400 active:scale-[0.98] transition rounded-2xl py-4 text-lg font-bold mt-4 disabled:cursor-not-allowed"
                onClick={handleOnNextStep}
                disabled={!participants.length}
              >
                Próxima etapa
              </button>
            </div>
          </>
        )}

        {step == 1 && (
          <>
            <div className="h-full overflow-y-auto p-4 pb-28 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-zinc-300">
                  Tamanho ideal
                </label>

                <input
                  type="number"
                  placeholder="Ex: 5"
                  defaultValue={idealSize}
                  className="
        bg-zinc-900
        border border-zinc-800
        rounded-xl

        px-4 py-3

        outline-none

        focus:border-cyan-500
        focus:ring-2
        focus:ring-cyan-500/20

        transition
      "
                  onChange={(event) => {
                    const result = event.target.value.replace(/\D/g, "");

                    event.target.value = result;
                    setIdealSize(parseInt(result) || 0);
                  }}
                  onBlur={(event) => {
                    event.target.value = parseInt(
                      event.target.value,
                    ).toString();
                  }}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-zinc-300">
                  Mínimo por grupo
                </label>

                <input
                  type="number"
                  placeholder="Ex: 3"
                  defaultValue={minGroup}
                  className="
        bg-zinc-900
        border border-zinc-800
        rounded-xl

        px-4 py-3

        outline-none

        focus:border-cyan-500
        focus:ring-2
        focus:ring-cyan-500/20

        transition
      "
                  onChange={(event) => {
                    const result = event.target.value.replace(/\D/g, "");

                    event.target.value = result;
                    setMinGroup(parseInt(result) || 0);
                  }}
                  onBlur={(event) => {
                    event.target.value = parseInt(
                      event.target.value,
                    ).toString();
                  }}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-zinc-300">
                  Máximo por grupo
                </label>

                <input
                  type="number"
                  placeholder="Ex: 7"
                  defaultValue={maxGroup}
                  className="
        bg-zinc-900
        border border-zinc-800
        rounded-xl

        px-4 py-3

        outline-none

        focus:border-cyan-500
        focus:ring-2
        focus:ring-cyan-500/20

        transition
      "
                  onChange={(event) => {
                    const result = event.target.value.replace(/\D/g, "");

                    event.target.value = result;
                    setMaxGroup(parseInt(result) || 0);
                  }}
                  onBlur={(event) => {
                    event.target.value = parseInt(
                      event.target.value,
                    ).toString();
                  }}
                />
              </div>
            </div>

            <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full p-4 max-w-2xl">
              <button
                className="w-full bg-yellow-500 hover:bg-yellow-400 active:scale-[0.98] transition rounded-2xl py-4 text-lg font-bold mt-4"
                onClick={handleOnNextStep}
              >
                Gerar
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
