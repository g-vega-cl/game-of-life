"use client";
import { Navbar } from "./components/organisms/navbar";
import { GameOfLife } from "./components/organisms/gameOfLife/GameOfLife";
import { Box } from "@chakra-ui/react";
export default function Home() {
  return (
    <Box >
      <Navbar />
      <Box className="p-8">
        <GameOfLife />
      </Box>
    </Box>
  );
}
