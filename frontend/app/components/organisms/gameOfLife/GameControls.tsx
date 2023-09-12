"use client";
import { Box, Button, useInterval } from "@chakra-ui/react";
import { useCallback } from "react";
import {
  TGrid,
  generateRandomTiles,
  isGridEmpty,
} from "./GameOfLife";
import { useGameOfLifeContext } from "./GameOfLifeContext";
import { buttonNames } from "./constants";

// This array represents the eight neighbors surrounding a cell.
const neighborsPosition = [
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

  const { numRows, numColumns } = numberOfRowsAndColumns;

  const generateEmptyGrid = (): TGrid => {
    const rows: TGrid = [];
    for (let rowIndex = 0; rowIndex < numRows; rowIndex++) {
      rows.push(Array.from(Array(numColumns), () => 0));
    }
    return rows;
  };

  // Use useCallback to prevent our function from being created every time
  // The App component is rendered.
  const runSimulation = useCallback(
    (grid: TGrid) => {
      if (!running) {
        return;
      }

      let gridCopy = JSON.parse(JSON.stringify(grid));
      for (let rowNumber = 0; rowNumber < numRows; rowNumber++) {
        for (let columnNumber = 0; columnNumber < numColumns; columnNumber++) {
          let neighbors = 0;
          // Calculate the number of alive cells surrounding the current cell.
          neighborsPosition.forEach(([x, y]) => {
            const newRowNumber = rowNumber + x;
            const newColumnNumber = columnNumber + y;

            if (
              newRowNumber >= 0 &&
              newRowNumber < numRows &&
              newColumnNumber >= 0 &&
              newColumnNumber < numColumns
            ) {
              neighbors += grid[newRowNumber][newColumnNumber];
            }
          });

          // If there are less than 2 or more than 3 neighbors, the cell dies.
          if (neighbors < 2 || neighbors > 3) {
            gridCopy[rowNumber][columnNumber] = 0;
          } else if (grid[rowNumber][columnNumber] === 0 && neighbors === 3) {
            // If the cell is dead and has exactly 3 neighbors, the cell comes to life.
            gridCopy[rowNumber][columnNumber] = 1;
          }
        }
      }

      setGrid(gridCopy);
    },
    [running]
  );

  useInterval(() => {
    runSimulation(grid);
    // TODO, add a slider to control the speed of the simulation.
  }, 150);

  return (
    // TODO, improve this interface and make mobile friendly.
    <Box className="grid grid-cols-3">
      <Button
        className="button start-game mx-2"
        onClick={() => {
          if (isGridEmpty(grid)) {
            setGrid(generateRandomTiles({ numRows, numColumns }));
          }
          setRunning(!running);
        }}
      >
        <span>{running ? buttonNames.stop : buttonNames.start}</span>
      </Button>

      <Button
        onClick={() => {
          setGrid(generateEmptyGrid());
          setRunning(false);
        }}
      >
        {buttonNames.clear}
      </Button>

      <Button
        onClick={() => {
          setGrid(generateRandomTiles({ numRows, numColumns }));
        }}
      >
        {buttonNames.randomize}
      </Button>
    </Box>
  );
};
