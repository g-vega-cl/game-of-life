"use client";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";

interface ISessionProviders {
  children: React.ReactNode;
  session: Session | null;
}

interface IChakraProviders {
  children: React.ReactNode;
}

export const ChakraProviders = ({ children }: IChakraProviders) => {
  return (
    <CacheProvider>
      <ChakraProvider>{children}</ChakraProvider>
    </CacheProvider>
  );
};

export const SessionProviders = ({ children, session }: ISessionProviders) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};
