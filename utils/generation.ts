type Participant = {
  name: string;
  id: string;
};

export type Group = {
  id: number;
  participants: Participant[];
};

export function generateGroups(
  participants: Participant[],
  idealSize: number,
  minPerGroup: number,
  maxPerGroup: number,
): Group[] {
  const shuffled = [...participants].sort(() => Math.random() - 0.5);

  const groups: Group[] = [];

  const groupCount = Math.ceil(shuffled.length / idealSize);

  for (let i = 0; i < groupCount; i++) {
    groups.push({
      id: i + 1,
      participants: [],
    });
  }

  shuffled.forEach((participant, index) => {
    groups[index % groupCount].participants.push(participant);
  });

  const validGroups = groups.filter(
    (group) =>
      group.participants.length >= minPerGroup &&
      group.participants.length <= maxPerGroup,
  );

  return validGroups;
}

export function generateRandomId(length: number = 8) {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  return Array.from(crypto.getRandomValues(new Uint8Array(length)))
    .map((x) => chars[x % chars.length])
    .join("");
}
