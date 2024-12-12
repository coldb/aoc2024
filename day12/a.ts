import type { DaySolution } from "../types.ts";

const directions = [
  { x: 0, y: -1 },
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: -1, y: 0 },
];
export const dayPart1 = (textRows: string[]) => {
  const data = textRows.map((row) => row.split(""));

  const visited = new Set<string>();
  let total = 0;

  for (let y = 0; y < textRows.length; y++) {
    for (let x = 0; x < textRows[0].length; x++) {
      const result = { plantType: data[y][x], fences: 0, area: 0 };

      findArea(data, data[y][x], x, y, visited, result);

      total += result.area * result.fences;
    }
  }
  return total;
};

function findArea(
  map: string[][],
  plantType: string,
  x: number,
  y: number,
  visited: Set<string>,
  output: { fences: number; area: number },
) {
  if (x < 0 || y < 0 || y >= map.length || x >= map[0].length) {
    output.fences += 1;
    return;
  }

  if (plantType !== map[y][x]) {
    output.fences += 1;
    return;
  }

  if (visited.has(mapPoint(x, y))) {
    return;
  }
  output.area += 1;

  visited.add(mapPoint(x, y));

  for (const direction of directions) {
    const newX = x + direction.x;
    const newY = y + direction.y;

    findArea(map, plantType, newX, newY, visited, output);
  }
}

function mapPoint(x: number, y: number) {
  return `${x}-${y}`;
}

export const solution: DaySolution = {
  fn: dayPart1,
  expectedSample: 1930,
  expected: -1,
};
