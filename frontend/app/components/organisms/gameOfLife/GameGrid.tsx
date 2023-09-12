"use client";
import { useCallback, useEffect, useState } from "react";
import classNames from "classnames";
import { Box } from "@chakra-ui/react";
import { TGrid, useGameOfLifeContext } from "./GameOfLife";

export const GameGrid = () => {

  const { grid, setGrid, numberOfRowsAndColumns } = useGameOfLifeContext();
  const { numRows, numCols } = numberOfRowsAndColumns;

  const handleGridClick = useCallback(
    ({ rowIndex, columnIndex }: { rowIndex: number; columnIndex: number }) => {
      if (!grid) return;
      let newGrid = JSON.parse(JSON.stringify(grid));
      newGrid[rowIndex][columnIndex] = grid[rowIndex][columnIndex] ? 0 : 1;
      setGrid(newGrid);
    },
    [grid]
  );



  return (
    <Box
      // Tailwind is buggy when setting custom grid-cols-[repeat(${numCols},1fr)] so we use inline styles
      style={{
        gridTemplateColumns: `repeat(${numCols}, 1fr)`,
      }}
      className={`grid w-fit rounded`}
    >
      {grid?.map((rows, i) =>
        rows.map((col, k) => {
          let roundedClass = "";

          if (i === 0 && k === 0) {
            roundedClass = "rounded-tl";
          } else if (i === 0 && k === numCols - 1) {
            roundedClass = "rounded-tr";
          } else if (i === grid.length - 1 && k === 0) {
            roundedClass = "rounded-bl";
          } else if (i === grid.length - 1 && k === numCols - 1) {
            roundedClass = "rounded-br";
          }

          return (
            <Box
              // Comment, classNames is a library that allows you to conditionally add classes to an element.
              className={classNames(
                "w-6 h-6 border-solid border-gray-500",
                grid[i][k] ? "bg-pink-400" : "bg-white",
                roundedClass,
                "border-[.5px]"
              )}
              key={`${i}-${k}`}
              onClick={() => handleGridClick({ rowIndex: i, columnIndex: k })}
            />
          );
        })
      )}
    </Box>
  );
};
