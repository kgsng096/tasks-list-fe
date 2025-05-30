import Cookies from "js-cookie";

let cachedToken: string | null = null;

export async function getCsrfToken(): Promise<string> {
  if (cachedToken) return cachedToken;
  const res = await fetch("/api/csrf-token");
  const data = await res.json();
  cachedToken = data.csrfToken;
  if (!cachedToken) {
    throw new Error("CSRF token not found");
  }
  return cachedToken;
}

export function clearCsrfTokenCache(): void {
  cachedToken = null;
}
