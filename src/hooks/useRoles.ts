import { useEffect, useState } from "react";

export type Role = {
  id: number;
  name: string;
};

export function useRoles(fetchOnMount = true) {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(fetchOnMount);

  useEffect(() => {
    if (fetchOnMount && roles.length === 0) {
      setLoading(true);
      fetch(`${process.env.NEXT_PUBLIC_API_HOST}/roles`)
        .then((res) => res.json())
        .then((data) => setRoles(data))
        .catch(() => setRoles([]))
        .finally(() => setLoading(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchOnMount]);

  return { roles, loading };
}