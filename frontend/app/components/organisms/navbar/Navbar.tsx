"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { LogInButton, LogOutButton } from "@/app/components/atoms";
import { useIsAuthenticated } from "@/app/hooks/useIsAuthenticated";

export function Navbar() {
  const session = useSession();
  const isAuthenticated = useIsAuthenticated();
  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        className="content-center border-gray-200 border-solid border-b p-2 gap-x-4 justify-end"
      >
        {isAuthenticated ? <LogOutButton /> : <LogInButton />}
        <Text className="text-sm font-bold flex items-center">
          {session.data?.user?.name}
        </Text>
      </Flex>
    </Box>
  );
}
