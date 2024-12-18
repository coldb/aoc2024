import { print } from "../lib/matrix.ts";
import { createEmptyGraph } from "../lib/shortest_path.ts";
import { toInt } from "../lib/string.ts";
import type { DaySolution } from "../types.ts";

const directions = [
  { symbol: "^", x: 0, y: -1 },
  { symbol: ">", x: 1, y: 0 },
  { symbol: "v", x: 0, y: 1 },
  { symbol: "<", x: -1, y: 0 },
];

export const dayPart1 = (textRows: string[], dataName?: string) => {
  const data = textRows.map((row) => row.split(",").map(toInt));

  const runData =
    dataName === "sample" ? data.slice(0, 12) : data.slice(0, 1024);
  const roomSize = dataName === "sample" ? 7 : 71;

  const room: string[][] = [];

  for (let y = 0; y <= roomSize; y++) {
    const row: string[] = [];
    for (let x = 0; x <= roomSize; x++) {
      row.push(".");
    }

    room.push(row);
  }

  for (const corruptPoint of runData) {
    room[corruptPoint[1]][corruptPoint[0]] = "#";
  }

  const newGraph = createEmptyGraph();

  const getNeigbors = (nodeKey: string) => {
    const [pointX, pointY] = nodeKey.split("-").map(toInt);

    return directions.reduce((memo, modifier) => {
      const newX = pointX + modifier.x;
      const newY = pointY + modifier.y;

      if (
        newX >= 0 &&
        newY >= 0 &&
        newX < roomSize &&
        newY < roomSize &&
        room[newY][newX] === "."
      ) {
        memo.set(`${newX}-${newY}`, 1);
      }

      return memo;
    }, new Map<string, number>());
  };

  const shortestPath = newGraph.djikstra(
    "0-0",
    `${roomSize - 1}-${roomSize - 1}`,
    getNeigbors,
  );

  return shortestPath.cost;
};

export const solution: DaySolution = {
  fn: dayPart1,
  expectedSample: 22,
  expected: 284,
};
