"use client";
import { Navbar } from "./components/organisms/navbar";
import { GameOfLife } from "./components/organisms/gameOfLife/GameOfLife";
import { Box } from "@chakra-ui/react";
export default function Home() {
  return (
    <main className="h-full w-full min-h-screen	min-w-screen bg-white overflow-x-scroll">
      <Navbar />
      <Box className="p-8">
        <GameOfLife />
      </Box>
    </main>
  );
}
