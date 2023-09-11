"use client";
<<<<<<< Updated upstream

import { useSession } from "next-auth/react";

const Navbar = () => {
  const session = useSession();
=======
import { signIn, signOut, useSession } from "next-auth/react";
import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { LogInButton, LogOutButton } from "@/app/components/atoms";
import { useAuthentication } from "@/app/hooks/useIsAuthenticated";

export function Navbar() {
  const {isAuthenticated, session} = useAuthentication();
>>>>>>> Stashed changes
  return (
    // TODO, this is just a placeholder
    // Will delete and make a proper navbar later
    <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-xl tracking-tight">
          {session?.data?.user?.name}
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
