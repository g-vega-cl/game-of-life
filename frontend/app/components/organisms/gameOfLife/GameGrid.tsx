"use client";
import classNames from "classnames";
import { Box } from "@chakra-ui/react";
import { useGameOfLifeContext } from "./GameOfLifeContext";
import { TGrid } from "./GameOfLife";

export const handleGridClick = ({
  rowIndex,
  columnIndex,
  grid,
  setGrid,
}: {
  rowIndex: number;
  columnIndex: number;
  grid: TGrid;
  setGrid: (value: TGrid) => void;
}) => {
  if (!grid) return;
  // Clone the grid array into a newGrid.
  let newGrid = JSON.parse(JSON.stringify(grid));
  // Find the clicked cell by it's index and check if it's alive or dead,
  // If the cell is currently alive, it make it dead and vice versa,
  newGrid[rowIndex][columnIndex] = grid[rowIndex][columnIndex] ? 0 : 1;
  // Update the state with the modified newGrid.
  setGrid(newGrid);
};

export const GameGrid = () => {
  const { grid, setGrid, numberOfRowsAndColumns } = useGameOfLifeContext();
  const { numColumns } = numberOfRowsAndColumns;

  return (
    <Box
      // Tailwind is buggy when setting custom grid-cols-[repeat(${numColumns},1fr)] so we use inline styles
      style={{
        gridTemplateColumns: `repeat(${numColumns}, 1fr)`,
      }}
      className={`grid w-fit rounded`}
    >
      {grid?.map((rows, rowIndex) =>
        rows.map((_, columnIndex) => {
          let roundedClass = "";

          if (rowIndex === 0 && columnIndex === 0) {
            roundedClass = "rounded-tl";
          } else if (rowIndex === 0 && columnIndex === numColumns - 1) {
            roundedClass = "rounded-tr";
          } else if (rowIndex === grid.length - 1 && columnIndex === 0) {
            roundedClass = "rounded-bl";
          } else if (
            rowIndex === grid.length - 1 &&
            columnIndex === numColumns - 1
          ) {
            roundedClass = "rounded-br";
          }

          return (
            <Box
              className={classNames(
                "w-6 h-6 border-solid border-gray-500",
                grid[rowIndex][columnIndex] ? "bg-pink-400" : "bg-white",
                roundedClass,
                "border-[.5px]"
              )}
              key={`${rowIndex}-${columnIndex}`}
              onClick={() =>
                handleGridClick({ rowIndex, columnIndex, grid, setGrid })
              }
            />
          );
        })
      )}
    </Box>
  );
};
