"use client";

import { useSession } from "next-auth/react";

export const useAuthentication = () => {
  const session = useSession();
  const isAuthenticated = session?.status === "authenticated";
  return { isAuthenticated, session };
};
