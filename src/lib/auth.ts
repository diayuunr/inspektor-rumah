const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function getCurrentUser() {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    return null;
  }

  try {
    const response = await fetch(`${API_URL}/auth/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    console.log("AUTH RESPONSE:", response.status);

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("AUTH ERROR:", error);
    return null;
  }
}