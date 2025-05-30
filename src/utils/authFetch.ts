import Cookies from "js-cookie";
import { getCsrfToken } from "./getCsrfToken";

export async function authFetch(input: RequestInfo, init: RequestInit = {}) {
  const accessToken = Cookies.get("accessToken");
  const isApiRoute =
    typeof input === "string"
      ? input.includes("/api/")
      : input.url.includes("/api/");

  let headers: Record<string, string> = {};
  if (init.headers instanceof Headers) {
    init.headers.forEach((value, key) => {
      headers[key] = value;
    });
  } else if (init.headers) {
    headers = { ...init.headers } as Record<string, string>;
  }

  if (isApiRoute) {
    if (accessToken) headers["Authorization"] = `Bearer ${accessToken}`;

    try {
      const csrfToken = await getCsrfToken();
      if (csrfToken) headers["X-CSRF-Token"] = csrfToken;
    } catch (error) {
      console.error("Failed to fetch CSRF token:", error);
    }

    init.credentials = "include";
  }

  init.headers = headers;
  const response = await fetch(input, init);

  // Store user in cookies if fetching profile
  const url = typeof input === "string" ? input : input.url;
  if (url.includes("/api/users/me") && response.ok) {
    try {
      const user = await response.clone().json();
      Cookies.set("user", JSON.stringify(user), { expires: 7 });
    } catch (e) {
      // Ignore JSON parse errors
    }
  }

  return response;
}
