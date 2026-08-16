const API_URL = "https://canary-api.inspeksirumah.id";

export async function getInspections(token: string) {
  const response = await fetch(`${API_URL}/inspections`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch inspections");
  }

  return response.json();
}

export async function getInspectors(token: string) {
  const response = await fetch(`${API_URL}/inspectors`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch inspectors");
  }

  return response.json();
}