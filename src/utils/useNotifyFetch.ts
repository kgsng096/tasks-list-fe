import { useNotification } from "@/context/NotificationContext";
import { authFetch } from "./authFetch";

export function useNotifyFetch() {
  const { notify } = useNotification();

  // Wrapper for authFetch that notifies on error/success
  const notifyFetch = async (
    input: RequestInfo,
    init: RequestInit = {},
    options?: { successMsg?: string; errorMsg?: string }
  ) => {
    try {
      const res = await authFetch(input, init);
      if (!res.ok) {
        let errMsg = options?.errorMsg || "Something went wrong.";
        try {
          const data = await res.json();
          errMsg = data.message || errMsg;
        } catch {}
        notify(errMsg, "error");
      } else if (options?.successMsg) {
        notify(options.successMsg, "success");
      }
      return res;
    } catch (e) {
      notify(options?.errorMsg || "Network error.", "error");
      throw e;
    }
  };

  return notifyFetch;
}