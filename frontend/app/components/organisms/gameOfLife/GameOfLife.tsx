"use client";
import { useEffect, useState } from "react";
import { Box, Spinner } from "@chakra-ui/react";
import { GameGrid } from "./GameGrid";
import { GameControls } from "./GameControls";
import { GameOfLifeContext } from "./GameOfLifeContext";

export type TGrid = (0 | 1)[][];

export interface IGameControls {
  running: boolean;
  setRunning: (value: boolean) => void;
  grid: TGrid;
  setGrid: (value: TGrid) => void;
  numberOfRowsAndColumns: INumberOfRowsAndColumns;
  setNumberOfRowsAndColumns: (value: INumberOfRowsAndColumns) => void;
}

interface INumberOfRowsAndColumns {
  numRows: number;
  numColumns: number;
}

export const generateRandomTiles = ({
  numRows,
  numColumns,
}: INumberOfRowsAndColumns) => {
  const grid: TGrid = [];
  for (let rowNumber = 0; rowNumber < numRows; rowNumber++) {
    // returns a live cell 70% of the time
    grid.push(Array.from(Array(numColumns), () => (Math.random() > 0.7 ? 1 : 0)));
  }
  return grid;
};

export const isGridEmpty = (grid: TGrid): boolean => {
  for (let rowNumber = 0; rowNumber < grid.length; rowNumber++) {
    for (
      let columnNumber = 0;
      columnNumber < grid[rowNumber].length;
      columnNumber++
    ) {
      if (grid[rowNumber][columnNumber] !== 0) {
        return false; // Found a non-empty cell
      }
    }
  }
  return true; // If loop completes, then all cells are empty
};

export const GameOfLife = () => {
  const [running, setRunning] = useState(false);
  const [grid, setGrid] = useState<TGrid>();
  const [numberOfRowsAndColumns, setNumberOfRowsAndColumns] =
    useState<INumberOfRowsAndColumns>();

  useEffect(() => {
    const defaultNumberOfRowsAndColumns = 25;
    const initialGrid = generateRandomTiles({
      numRows: defaultNumberOfRowsAndColumns,
      numColumns: defaultNumberOfRowsAndColumns,
    });

    setGrid(initialGrid);
    setNumberOfRowsAndColumns({ numRows: 25, numColumns: 25 });
  }, []);

  if (!grid || !numberOfRowsAndColumns) return <Spinner />;

  const contextValue: IGameControls = {
    running,
    setRunning,
    grid,
    setGrid,
    numberOfRowsAndColumns,
    setNumberOfRowsAndColumns,
  };

  return (
    <GameOfLifeContext.Provider value={contextValue}>
      <Box className="grid gap-4" style={{ gridTemplateColumns: "1fr 1fr" }}>
        <GameGrid />
        <GameControls />
      </Box>
    </GameOfLifeContext.Provider>
  );
};
