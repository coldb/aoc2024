import { toInt } from "../lib/string.ts";

export const expected10A = 36;

export const day10A = (textRows: string[]) => {
  const data = textRows.map((row) => row.split("").map(toInt));

  let totalPaths = 0;
  for (let y = 0; y < data.length; y++) {
    for (let x = 0; x < data.length; x++) {
      const value = data[y][x];

      if (value === 0) {
        const possibleDestinations = new Set<string>();
        countPaths(data, x, y, possibleDestinations);

        totalPaths += possibleDestinations.size;
      }
    }
  }
  return totalPaths;
};

const modifiers = [
  { x: 0, y: -1 },
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: -1, y: 0 },
];
function countPaths(
  data: number[][],
  x: number,
  y: number,
  visited: Set<string>,
) {
  const currentValue = data[y][x];

  if (currentValue === 9) {
    visited.add(`${x}-${y}`);
    return;
  }

  for (const modifier of modifiers) {
    const newX = x + modifier.x;
    const newY = y + modifier.y;

    if (newX < 0 || newY < 0 || newX >= data[0].length || newY >= data.length) {
      continue;
    }

    const nextValue = data[newY][newX];

    if (nextValue === currentValue + 1) {
      countPaths(data, newX, newY, visited);
    }
  }
}
