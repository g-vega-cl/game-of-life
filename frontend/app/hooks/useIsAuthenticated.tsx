'use client'

import { useSession } from "next-auth/react";

export const useIsAuthenticated = () => {
    const session = useSession();
    const isAuthenticated = session?.status === "authenticated";
    return isAuthenticated;
}