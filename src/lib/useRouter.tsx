// useCustomRouter.ts

import { useRouter as useNextRouter } from "next/router";

export function useRouter() {
  const router = useNextRouter();

  // Add any custom logic here if needed

  return router;
}
