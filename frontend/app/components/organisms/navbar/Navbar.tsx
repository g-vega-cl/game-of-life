"use client";
import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { LogInButton, LogOutButton } from "@/app/components/atoms";
import { useAuthentication } from "@/app/hooks/useIsAuthenticated";

export const Navbar = () => {
  const { isAuthenticated, session } = useAuthentication();
  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        className="content-center border-gray-200 border-solid border-b p-2  justify-between"
      >
        <Text className="text-lg font-bold flex items-center">
          Conway's Game of Life
        </Text>
        <Flex className="gap-x-4">
          {isAuthenticated ? <LogOutButton /> : <LogInButton />}
          <Text className="text-sm font-bold flex items-center">
            {session.data?.user?.name}
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
}
