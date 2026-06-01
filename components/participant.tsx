import {
  useState,
  type Dispatch,
  type SetStateAction,
  type SubmitEvent,
} from "react";

import * as Dialog from "@radix-ui/react-dialog";
import { PencilIcon, XIcon } from "lucide-react";

interface IParticipantParams {
  name: string;
  id: string;
  onRemove?: (id: string) => void;
  onEdit?: (id: string, event: SubmitEvent<HTMLFormElement>) => void;
  setParticipantName: Dispatch<SetStateAction<string>>;
}

export function Participant({
  name,
  id,
  onRemove,
  onEdit,
  setParticipantName,
}: IParticipantParams) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex justify-between items-center bg-zinc-200 hover:bg-zinc-300 transition px-4 py-2 gap-2 rounded-full shadow">
      <span className="text-zinc-900 text-2xl font-bold truncate">{name}</span>

      {onEdit && (
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger asChild>
            <button className="flex items-center justify-center ml-auto bg-indigo-400 hover:bg-indigo-600 transition-colors duration-150 size-8 rounded-full cursor-pointer">
              <PencilIcon className="text-zinc-100" size={18} strokeWidth={3} />
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
                    Editando: {name}
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
                <form
                  onSubmit={(event) => {
                    setOpen(false);
                    onEdit(id, event);
                  }}
                >
                  <label className="font-medium text-zinc-200 w-full">
                    Nome
                  </label>

                  <input
                    type="text"
                    minLength={1}
                    className="h-12 w-full rounded-xl mt-2 border border-zinc-700 bg-zinc-950 px-4 text-white outline-none transition focus:border-green-500"
                    autoFocus
                    onChange={(event) => {
                      setParticipantName(event.target.value);
                    }}
                  />

                  <button
                    // disabled={!participantName.length}
                    className="h-12 w-full rounded-xl bg-green-600 font-medium text-white transition hover:bg-green-500 mt-6"
                    type="submit"
                  >
                    Editar
                  </button>
                </form>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      )}
      {onRemove && (
        <button
          className="flex items-center justify-center bg-red-400 hover:bg-red-600 transition-colors duration-150 size-8 rounded-full cursor-pointer"
          onClick={() => onRemove(id)}
        >
          <XIcon className="text-zinc-100" size={20} strokeWidth={3} />
        </button>
      )}
    </div>
  );
}
