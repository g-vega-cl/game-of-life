import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { GameOfLife } from "../GameOfLife";
import { GameGrid, handleGridClick } from "../GameGrid";
import {
  GameOfLifeContext,
  emptyGameOfLifeContext,
} from "../GameOfLifeContext";
import { buttonNames } from "../constants";

describe("GameOfLife", () => {
  it("Start button changes to 'Stop' after click and vice versa", async () => {
    render(<GameOfLife />);

    const startButton = screen.getByText(buttonNames.start);
    expect(startButton).toBeInTheDocument();

    fireEvent.click(startButton);
    await waitFor(() => {
      // TODO, make this values constants.
      expect(startButton).toHaveTextContent(buttonNames.stop);
    });

    fireEvent.click(startButton);
    await waitFor(() => {
      expect(startButton).toHaveTextContent(buttonNames.start);
    });
  });

  it("Clear board button clears the grid", () => {
    const { container } = render(<GameOfLife />);
    const clearButton = screen.getByText(buttonNames.clear);
    expect(clearButton).toBeInTheDocument();
    fireEvent.click(clearButton);
    // Check that all grid cells are empty (i.e., have "bg-white" class and not "bg-pink-400")
    const cells = container.querySelectorAll(".w-6.h-6");
    cells.forEach((cell) => {
      expect(cell.classList.contains("bg-white")).toBe(true);
      expect(cell.classList.contains("bg-pink-400")).toBe(false);
    });
  });

  it("Randomize button randomizes the grid", () => {
    const { container } = render(<GameOfLife />);

    const firstCells = Array.from(container.querySelectorAll(".w-6.h-6"));
    const firstCellsState = firstCells.map((cell) =>
      cell.classList.contains("bg-pink-400")
    );

    const randomizeButton = screen.getByText(buttonNames.randomize);
    expect(randomizeButton).toBeInTheDocument();
    fireEvent.click(randomizeButton);

    const secondCells = Array.from(container.querySelectorAll(".w-6.h-6"));
    const secondCellsState = secondCells.map((cell) =>
      cell.classList.contains("bg-pink-400")
    );

    // Check that firstCellsState and secondCellsState are different
    let areDifferent = false;
    for (let i = 0; i < firstCellsState.length; i++) {
      if (firstCellsState[i] !== secondCellsState[i]) {
        areDifferent = true;
        break;
      }
    }

    expect(areDifferent).toBe(true);
  });

  it("Clear button pauses the game", async () => {
    render(<GameOfLife />);

    const startButton = screen.getByText(buttonNames.start);
    expect(startButton).toBeInTheDocument();

    fireEvent.click(startButton);
    await waitFor(() => {
      expect(startButton).toHaveTextContent(buttonNames.stop);
    });

    const clearButton = screen.getByText(buttonNames.clear);
    fireEvent.click(clearButton);
    await waitFor(() => {
      expect(startButton).toHaveTextContent(buttonNames.start);
    });
  });

  it("Start button creates a random grid if the grid is empty and then starts the game", async () => {
    const { container } = render(<GameOfLife />);

    const startButton = screen.getByText(buttonNames.start);
    expect(startButton).toBeInTheDocument();

    fireEvent.click(startButton);
    await waitFor(() => {
      expect(startButton).toHaveTextContent(buttonNames.stop);
    });

    // Check that some grid cells are not empty (i.e., have "bg-pink-400" class)
    const cells = Array.from(container.querySelectorAll(".w-6.h-6"));
    const areSomeCellsNotEmpty = cells.some((cell) =>
      cell.classList.contains("bg-pink-400")
    );
    expect(areSomeCellsNotEmpty).toBe(true);
  });
});

describe("GameGrid", () => {
  it("Renders an empty grid when the grid is empty", () => {
    const { container } = render(
      <GameOfLifeContext.Provider value={emptyGameOfLifeContext}>
        <GameGrid />
      </GameOfLifeContext.Provider>
    );

    // Check that all grid cells are empty (i.e., have "bg-white" class and not "bg-pink-400")
    const cells = container.querySelectorAll(".w-6.h-6");
    cells.forEach((cell) => {
      expect(cell.classList.contains("bg-white")).toBe(true);
      expect(cell.classList.contains("bg-pink-400")).toBe(false);
    });
  });
});

describe("handleGridClick", () => {
  it("should toggle the value of the clicked cell and call setGrid with the updated grid", () => {
    // Mock a 3x3 grid for this test
    const mockGrid = [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0],
    ];

    const expectedGridAfterClick = [
      [0, 1, 0],
      [1, 0, 1], // Notice the value at [1][1] toggled from 1 to 0
      [0, 0, 0],
    ];

    // Mock setGrid function
    const mockSetGrid = jest.fn();

    handleGridClick({
      rowIndex: 1,
      columnIndex: 1,
      grid: mockGrid,
      setGrid: mockSetGrid,
    });

    expect(mockSetGrid).toHaveBeenCalledWith(expectedGridAfterClick);
  });

  it("should not modify the grid if grid is not provided", () => {
    const mockSetGrid = jest.fn();

    handleGridClick({
      rowIndex: 1,
      columnIndex: 1,
      grid: undefined,
      setGrid: mockSetGrid,
    });

    expect(mockSetGrid).not.toHaveBeenCalled();
  });
});
