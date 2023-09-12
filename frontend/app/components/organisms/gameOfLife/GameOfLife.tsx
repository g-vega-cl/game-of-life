"use client";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { Box } from "@chakra-ui/react";
import { GameGrid } from "./GameGrid";

export const GameOfLife = () => {
  return (
    <Box className="grid gap-4" style={{ gridTemplateColumns: "1fr 1fr" }}>
      <GameGrid />
      <Box className="h-80 w-80 bg-black"></Box>
    </Box>
  );
};
