import { type Group } from "@/utils/generation";
import { supabase } from "./supabase";

export async function getResult(id: string) {
  const { data } = await supabase
    .from("results")
    .select("*")
    .eq("code", id)
    .single();

  return data;
}

export async function createResult(groups: Group[]): Promise<string> {
  let code = "";
  let exists = true;

  while (exists) {
    code = generateRoomCode();

    const { data } = await supabase
      .from("results")
      .select("code")
      .eq("code", code)
      .single();

    exists = !!data;
  }

  const { error } = await supabase.from("results").insert({
    code,
    result: {
      groups,
    },
  });

  if (error) {
    throw error;
  }

  return code;
}

function generateRoomCode(length: number = 18) {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  return Array.from(crypto.getRandomValues(new Uint8Array(length)))
    .map((x) => chars[x % chars.length])
    .join("");
}
