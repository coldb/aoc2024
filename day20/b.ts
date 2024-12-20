import type { DaySolution } from "../types.ts";

const directions = [
  { symbol: "^", x: 0, y: -1 },
  { symbol: ">", x: 1, y: 0 },
  { symbol: "v", x: 0, y: 1 },
  { symbol: "<", x: -1, y: 0 },
];

export const dayPart2 = (textRows: string[]) => {
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

  const jumps = new Map<number, number>();
  for (let i = 0; i < stepsTaken.length; i++) {
    const jumpStart = stepsTaken[i];
    for (let j = i + 1; j < stepsTaken.length; j++) {
      const jumpEnd = stepsTaken[j];

      const jumpLength =
        Math.abs(jumpEnd.x - jumpStart.x) + Math.abs(jumpEnd.y - jumpStart.y);

      if (jumpLength <= 20) {
        const savedLength = j - i - jumpLength;
        jumps.set(savedLength, (jumps.get(savedLength) ?? 0) + 1);
      }
    }
  }

  const totalAbove100Saved = Array.from(jumps.entries()).reduce(
    (memo, item) => memo + (item[0] >= 100 ? item[1] : 0),
    0,
  );

  return totalAbove100Saved;
};

export const solution: DaySolution = {
  fn: dayPart2,
  expectedSample: -1,
  expected: 977665,
};
