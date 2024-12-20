import type { DaySolution } from "../types.ts";

const directions = [
  { symbol: "^", x: 0, y: -1 },
  { symbol: ">", x: 1, y: 0 },
  { symbol: "v", x: 0, y: 1 },
  { symbol: "<", x: -1, y: 0 },
];

export const dayPart1 = (textRows: string[]) => {
  const maze = textRows.map((row) => row.split(""));

  let startX = -1;
  let startY = -1;
  for (let y = 1; y < maze.length - 1; y++) {
    for (let x = 1; x < maze.length - 1; x++) {
      if (maze[y][x] === "S") {
        startX = x;
        startY = y;
      }
    }
  }

  let currentX = startX;
  let currentY = startY;
  let currentChar = maze[currentY][currentX];
  let steps = 0;
  const visited = new Set<string>([`${currentX}-${currentY}`]);
  const stepsTaken: { x: number; y: number }[] = [{ x: currentX, y: currentY }];

  while (currentChar !== "E") {
    const nextDirection = directions.find((direction) => {
      const nextX = currentX + direction.x;
      const nextY = currentY + direction.y;

      if (visited.has(`${nextX}-${nextY}`)) {
        return false;
      }

      const currentChar = maze[nextY][nextX];

      return currentChar === "." || currentChar === "E";
    });

    if (nextDirection === undefined) {
      throw new Error("No path found");
    }

    steps++;
    currentX = currentX + nextDirection.x;
    currentY = currentY + nextDirection.y;
    visited.add(`${currentX}-${currentY}`);
    stepsTaken.push({ x: currentX, y: currentY });
    currentChar = maze[currentY][currentX];
  }

  let countAbove100 = 0;
  for (let i = 0; i < stepsTaken.length; i++) {
    const jumpStart = stepsTaken[i];
    for (let j = i + 1; j < stepsTaken.length; j++) {
      const jumpEnd = stepsTaken[j];

      const stepsSaved = j - i - 2;

      if (
        jumpStart.x === jumpEnd.x &&
        (jumpStart.y === jumpEnd.y + 2 || jumpStart.y === jumpEnd.y - 2)
      ) {
        if (stepsSaved >= 100) {
          countAbove100++;
        }
      }

      if (
        jumpStart.y === jumpEnd.y &&
        (jumpStart.x === jumpEnd.x + 2 || jumpStart.x === jumpEnd.x - 2)
      ) {
        if (stepsSaved >= 100) {
          countAbove100++;
        }
      }
    }
  }

  return countAbove100;
};

export const solution: DaySolution = {
  fn: dayPart1,
  expectedSample: -1,
  expected: 1296,
};
