import Cookies from "js-cookie";

export async function authFetch(input: RequestInfo, init: RequestInit = {}) {
  const accessToken = Cookies.get("accessToken");
  const isApiRoute =
    typeof input === "string"
      ? input.includes("/api/")
      : input.url.includes("/api/");

  if (isApiRoute && accessToken) {
    init.headers = {
      ...(init.headers || {}),
      Authorization: `Bearer ${accessToken}`,
    };
  }

  init.credentials = init.credentials || "include";
  return fetch(input, init);
}
