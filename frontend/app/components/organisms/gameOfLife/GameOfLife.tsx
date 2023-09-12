"use client";
import { createContext, useContext, useEffect, useState } from "react";
import classNames from "classnames";
import { Box, Spinner } from "@chakra-ui/react";
import { GameGrid } from "./GameGrid";
import { GameControls } from "./GameControls";

export type TGrid = (0 | 1)[][];
// This is too much state for one component.
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
  numCols: number;
}

export const generateRandomTiles = ({
  numRows,
  numCols,
}: INumberOfRowsAndColumns) => {
  const grid: TGrid = [];
  for (let i = 0; i < numRows; i++) {
    grid.push(Array.from(Array(numCols), () => (Math.random() > 0.7 ? 1 : 0))); // returns a live cell 70% of the time
  }
  return grid;
};

export const isGridEmpty = (grid: TGrid): boolean => {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] !== 0) {
        return false; // Found a non-empty cell
      }
    }
  }
  return true; // If loop completes, then all cells are empty
};

const GameOfLifeContext = createContext<IGameControls>({
  running: false,
  setRunning: () => {},
  grid: [],
  setGrid: () => {},
  numberOfRowsAndColumns: {
    numRows: 0,
    numCols: 0,
  },
  setNumberOfRowsAndColumns: () => {},
});

export const useGameOfLifeContext = () => {
  return useContext(GameOfLifeContext);
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
      numCols: defaultNumberOfRowsAndColumns,
    });

    setGrid(initialGrid);
    setNumberOfRowsAndColumns({ numRows: 25, numCols: 25 });
  }, []);
  console.log('running')

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
