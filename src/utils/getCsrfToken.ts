import Cookies from "js-cookie";

let cachedToken: string | null = null;

export async function getCsrfToken(): Promise<string> {
  if (cachedToken) return cachedToken;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/csrf-token`, {
    credentials: "include",
  });
  const data = await res.json();
  cachedToken = data.csrfToken;
  return cachedToken;
}

export function clearCsrfTokenCache(): void {
  cachedToken = null;
}
