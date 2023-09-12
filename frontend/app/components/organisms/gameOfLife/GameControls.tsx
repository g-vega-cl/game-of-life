import { Box, Button, useInterval } from "@chakra-ui/react";
import { useState, useCallback, useRef } from "react";
import {
  IGameControls,
  TGrid,
  generateRandomTiles,
  isGridEmpty,
  useGameOfLifeContext,
} from "./GameOfLife";

const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
];

export const GameControls = () => {
  const { running, setRunning, grid, setGrid, numberOfRowsAndColumns } =
    useGameOfLifeContext();

  const { numRows, numCols } = numberOfRowsAndColumns;
  const runningRef = useRef(running);
  runningRef.current = running;

  const generateEmptyGrid = (): TGrid => {
    const rows: TGrid = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => 0));
    }
    return rows;
  };

  const runSimulation = useCallback((grid: TGrid) => {
    if (!runningRef.current) {
      return;
    }

    let gridCopy = JSON.parse(JSON.stringify(grid));
    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        let neighbors = 0;

        operations.forEach(([x, y]) => {
          const newI = i + x;
          const newJ = j + y;

          if (newI >= 0 && newI < numRows && newJ >= 0 && newJ < numCols) {
            neighbors += grid[newI][newJ];
          }
        });

        if (neighbors < 2 || neighbors > 3) {
          gridCopy[i][j] = 0;
        } else if (grid[i][j] === 0 && neighbors === 3) {
          gridCopy[i][j] = 1;
        }
      }
    }

    setGrid(gridCopy);
  }, []);

  useInterval(() => {
    runSimulation(grid);
  }, 150);
  return (
    <Box className="grid grid-cols-3">
      <Button
        className="button start-game mx-2"
        onClick={() => {
          if (isGridEmpty(grid)) {
            setGrid(generateRandomTiles({ numRows, numCols }));
          }
          setRunning(!running);
          if (!running) {
            runningRef.current = true;
          }
        }}
      >
        <span>{running ? "Stop" : "Start"}</span>
      </Button>

      <Button
        onClick={() => {
          setGrid(generateEmptyGrid());

          setRunning(false);
          runningRef.current = false;
        }}
      >
        Clear board
      </Button>

      <Button
        onClick={() => {
          setGrid(generateRandomTiles({ numRows, numCols }));
        }}
      >
        Randomize
      </Button>
    </Box>
  );
};
