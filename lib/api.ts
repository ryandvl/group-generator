export interface IParticipant {
  name: string;
  id: string;
}

export async function getResultsRoute(code: string) {
  const response = await fetch(`/api/results/${code}`);

  const data = await response.json();

  return data;
}

export async function postResultsRoute(body: string) {
  const response = await fetch(`/api/results`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  if (!response.ok) {
    console.log(response);
    throw new Error("Failed to create result");
  }

  const data = await response.json();

  return data;
}
