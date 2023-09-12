import { createContext, useContext } from "react";
import { IGameControls } from "./GameOfLife";

export const useGameOfLifeContext = () => {
  return useContext(GameOfLifeContext);
};

export const emptyGameOfLifeContext: IGameControls = {
  running: false,
  setRunning: () => {},
  grid: [],
  setGrid: () => {},
  numberOfRowsAndColumns: {
    numRows: 0,
    numColumns: 0,
  },
  setNumberOfRowsAndColumns: () => {},
};

export const GameOfLifeContext = createContext<IGameControls>(
  emptyGameOfLifeContext
);
