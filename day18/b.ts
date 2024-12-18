import { createEmptyGraph } from "../lib/shortest_path.ts";
import { toInt } from "../lib/string.ts";
import type { DaySolution } from "../types.ts";

const directions = [
  { symbol: "^", x: 0, y: -1 },
  { symbol: ">", x: 1, y: 0 },
  { symbol: "v", x: 0, y: 1 },
  { symbol: "<", x: -1, y: 0 },
];

export const dayPart2 = (textRows: string[], dataName?: string) => {
  const data = textRows.map((row) => row.split(",").map(toInt));

  const fromIndex = dataName === "sample" ? 12 : 1024;
  const runData = data.slice(0, fromIndex);
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

  for (
    let nextCorruptIdx = fromIndex;
    nextCorruptIdx < data.length;
    nextCorruptIdx++
  ) {
    const nextCorruptByte = data[nextCorruptIdx];
    room[nextCorruptByte[1]][nextCorruptByte[0]] = "#";

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

    if (shortestPath.cost === 0) {
      return nextCorruptByte.join(",");
    }
  }

  return 0;
};

export const solution: DaySolution = {
  fn: dayPart2,
  expectedSample: "6,1",
  expected: -1, // 51,50
};
