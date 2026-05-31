
export const API_URL  = import.meta.env.VITE_API_URL  ?? "http://localhost:3000";
export const AUTH_URL = import.meta.env.VITE_AUTH_URL ?? "http://localhost:3001";

async function request<T>(url: string, options: RequestInit = {}): Promise<T> {
  let res: Response;

  try {
    res = await fetch(url, {
      headers: { "Content-Type": "application/json", ...options.headers },
      credentials: "include",
      ...options,
    });
  } catch {
    throw new Error("Server nicht erreichbar. Bitte Verbindung prüfen.");
  }

  // Server kann in Fehlerfällen auch HTML zurückgeben (z.B. bei Crash)
  const contentType = res.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    throw new Error(`Unerwartete Server-Antwort (${res.status})`);
  }

  const data = await res.json();

  if (!res.ok) {
    const message = (data as { message?: string }).message ?? `Fehler ${res.status}`;
    throw new Error(message);
  }

  return data as T;
}

export function apiGet<T>(path: string, base = API_URL) {
  return request<T>(`${base}${path}`);
}

export function apiPost<T>(path: string, body: unknown, base = API_URL) {
  return request<T>(`${base}${path}`, {
    method: "POST",
    body: JSON.stringify(body),
  });
}
