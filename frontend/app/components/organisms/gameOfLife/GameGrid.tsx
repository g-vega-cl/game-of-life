"use client";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { Box } from "@chakra-ui/react";

const numRows = 25;
const numCols = 25;

export type TGrid = (0 | 1)[][];

const generateRandomTiles = () => {
  const grid: TGrid = [];
  for (let i = 0; i < numRows; i++) {
    grid.push(Array.from(Array(numCols), () => (Math.random() > 0.7 ? 1 : 0))); // returns a live cell 70% of the time
  }
  return grid;
};


export const GameGrid = () => {
    const [grid, setGrid] = useState<TGrid>();
  
    useEffect(() => {
      const initialGrid = generateRandomTiles();
      // Comment, first refresh
      setGrid(initialGrid);
    }, []);
  
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
              <div
                // Comment, classNames is a library that allows you to conditionally add classes to an element.
                className={classNames(
                  "w-6 h-6 border-solid border-gray-500",
                  grid[i][k] ? "bg-pink-400" : "bg-white",
                  roundedClass,
                  'border-[.5px]'
                )}
                key={`${i}-${k}`}
              />
            );
          })
        )}
      </Box>
    );
  };
  