import { arrayToMultiMap } from "../lib/array.ts";
import type { DaySolution } from "../types.ts";

const directions: { x: number; y: number; type: FenceType }[] = [
  { x: 0, y: -1, type: "H1" },
  { x: 1, y: 0, type: "V1" },
  { x: 0, y: 1, type: "H2" },
  { x: -1, y: 0, type: "V2" },
];
export const dayPart2 = (textRows: string[]) => {
  const data = textRows.map((row) => row.split(""));

  const visited = new Set<string>();
  let total = 0;

  for (let y = 0; y < textRows.length; y++) {
    for (let x = 0; x < textRows[0].length; x++) {
      const result = {
        plantType: data[y][x],
        area: 0,
        fenceParts: [],
      };

      findArea(data, data[y][x], x, y, undefined, visited, result);

      let bulkFences = 0;
      bulkFences += countBulkFences(
        result.fenceParts,
        "V1",
        (part) => part.x,
        (part) => part.y,
      );

      bulkFences += countBulkFences(
        result.fenceParts,
        "V2",
        (part) => part.x,
        (part) => part.y,
      );
      bulkFences += countBulkFences(
        result.fenceParts,
        "H1",
        (part) => part.y,
        (part) => part.x,
      );

      bulkFences += countBulkFences(
        result.fenceParts,
        "H2",
        (part) => part.y,
        (part) => part.x,
      );
      total += result.area * bulkFences;
    }
  }
  return total;
};

type FenceType = "H1" | "H2" | "V1" | "V2";

function countBulkFences(
  fenceParts: { x: number; y: number; type: FenceType | undefined }[],
  type: FenceType,
  map1: (item: { x: number; y: number }) => number,
  map2: (item: { x: number; y: number }) => number,
) {
  const activeParts = fenceParts.filter((part) => part.type === type);

  const mappedDirection = arrayToMultiMap(activeParts, map1, map2);

  let count = 0;

  for (const singleSlice of mappedDirection.values()) {
    const sortedSingleSlice = singleSlice.toSorted((a, b) => a - b);

    count++;
    for (let i = 0; i < sortedSingleSlice.length - 1; i++) {
      if (sortedSingleSlice[i] !== sortedSingleSlice[i + 1] - 1) {
        count++;
      }
    }
  }

  return count;
}

function findArea(
  map: string[][],
  plantType: string,
  x: number,
  y: number,
  directionType: FenceType | undefined,
  visited: Set<string>,
  output: {
    fenceParts: { x: number; y: number; type: FenceType | undefined }[];
    area: number;
  },
) {
  if (x < 0 || y < 0 || y >= map.length || x >= map[0].length) {
    output.fenceParts.push({ x, y, type: directionType });
    return;
  }

  if (plantType !== map[y][x]) {
    output.fenceParts.push({ x, y, type: directionType });
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

    findArea(map, plantType, newX, newY, direction.type, visited, output);
  }
}

function mapPoint(x: number, y: number) {
  return `${x}-${y}`;
}

export const solution: DaySolution = {
  fn: dayPart2,
  expectedSample: 1206,
  expected: 902742,
};
