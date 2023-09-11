"use client";
import { Box } from "@chakra-ui/react";
import { Navbar } from "./components/organisms/navbar";
export default function Home() {
  return (
    <main className="h-full w-full bg-white">
      <Navbar />
      <Box className="w-screen h-screen">

      </Box>
    </main>
  );
}
