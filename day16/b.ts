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

export const dayPart2 = (textRows: string[]) => {
  const newGraph = createEmptyGraph();
  const maze = textRows.map((row) => row.split(""));

  let start = "";
  let end = "";
  for (let y = 1; y < maze.length - 1; y++) {
    for (let x = 1; x < maze.length - 1; x++) {
      if (maze[y][x] === "S") {
        start = `${x}-${y}|1`;
      }
      if (maze[y][x] === "E") {
        end = `${x}-${y}`;
      }
    }
  }
  // print(maze);
  for (let y = 1; y < maze.length - 1; y++) {
    for (let x = 1; x < maze.length - 1; x++) {
      const connections = directions.map((modifier) =>
        maze[y + modifier.y][x + modifier.x] !== "#"
          ? { x: x + modifier.x, y: y + modifier.y }
          : undefined,
      );
    }
  }
  // console.log(start, end);

  const getNeigbors = (nodeKey) => {
    const [pointStr, directionStr] = nodeKey.split("|");

    const [pointX, pointY] = pointStr.split("-").map(toInt);
    const direction = toInt(directionStr);

    // console.log(pointX, pointY, direction);

    const connections = [0, 1, 2, 3]
      .map((modifierIdx) => {
        const newDirection = (modifierIdx + direction) % 4;
        const modifier = directions[newDirection];
        const turns = modifierIdx === 3 ? 1 : modifierIdx;

        return maze[pointY + modifier.y][pointX + modifier.x] !== "#"
          ? {
              x: pointX + modifier.x,
              y: pointY + modifier.y,
              direction: newDirection,
              cost: turns * 1000 + 1,
            }
          : undefined;
      })
      .filter((connection) => connection !== undefined);

    // console.log(connections);
    return new Map<string, number>(
      connections.map((connection) => [
        `${connection.x}-${connection.y}|${connection.direction}`,
        connection.cost,
      ]),
    );
  };

  const shortestPath = newGraph.djikstra(start, end, getNeigbors);

  const bestCost = shortestPath.cost;

  const allNodes = new Set(shortestPath.path.map((item) => item.split("|")[0]));

  // console.log(shortestPath.path);
  let count = 0;
  for (let i = 1; i < shortestPath.path.length; i++) {
    const maze2 = textRows.map((row) => row.split(""));
    const to = shortestPath.path[i];

    const [pointX, pointY] = shortestPath.path[i]
      .split("|")[0]
      .split("-")
      .map(toInt);
    maze2[pointY][pointX] = "#";
    // console.log(pointX, pointY);
    const getNeigbors2 = (nodeKey) => {
      const [pointStr, directionStr] = nodeKey.split("|");

      const [pointX, pointY] = pointStr.split("-").map(toInt);
      const direction = toInt(directionStr);

      // console.log(pointX, pointY, direction);

      const connections = [0, 1, 2, 3]
        .map((modifierIdx) => {
          const newDirection = (modifierIdx + direction) % 4;
          const modifier = directions[newDirection];
          const turns = modifierIdx === 3 ? 1 : modifierIdx;

          return maze2[pointY + modifier.y][pointX + modifier.x] !== "#"
            ? {
                x: pointX + modifier.x,
                y: pointY + modifier.y,
                direction: newDirection,
                cost: turns * 1000 + 1,
              }
            : undefined;
        })
        .filter((connection) => connection !== undefined);

      // console.log(connections);
      return new Map<string, number>(
        connections.map((connection) => [
          `${connection.x}-${connection.y}|${connection.direction}`,
          connection.cost,
        ]),
      );
    };

    const shortestPath2 = newGraph.djikstra(start, end, getNeigbors2);

    if (shortestPath2.cost === shortestPath.cost) {
      shortestPath2.path.forEach((path) => {
        allNodes.add(path.split("|")[0]);
      });
    }

    count++;
    console.log(count, shortestPath.path.length);
    // console.log(shortestPath2);
  }

  // console.log(allNodes, allNodes.size);
  return allNodes.size + 1;
};

export const solution: DaySolution = {
  fn: dayPart2,
  expectedSample: 45,
  expected: -1,
};
