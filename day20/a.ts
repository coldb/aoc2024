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

export const dayPart1 = (textRows: string[]) => {
  const maze = textRows.map((row) => row.split(""));
  // print(maze);

  let start = "";
  let end = "";
  for (let y = 1; y < maze.length - 1; y++) {
    for (let x = 1; x < maze.length - 1; x++) {
      if (maze[y][x] === "S") {
        start = `${x}-${y}`;
      }
      if (maze[y][x] === "E") {
        end = `${x}-${y}`;
        maze[y][x] = ".";
      }
    }
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
        newX < maze[0].length &&
        newY < maze.length &&
        maze[newY][newX] !== "#"
      ) {
        memo.set(`${newX}-${newY}`, 1);
      }

      return memo;
    }, new Map<string, number>());
  };

  const shortestPath = newGraph.djikstra(start, end, getNeigbors);

  // console.log(start, end);
  console.log(shortestPath.path);
  console.log(shortestPath.cost);

  const pathPoints = shortestPath.path.map((point) =>
    point.split("-").map(toInt),
  );

  // console.log(start);
  pathPoints.push(start.split("-").map(toInt));

  // console.log(pathPoints);

  pathPoints.reverse();
  let maxJump = 0;
  let jump: number[][] = [];
  const jumps = new Map<number, number>();
  for (let i = 0; i < pathPoints.length; i++) {
    const jumpStart = pathPoints[i];
    for (let j = i + 1; j < pathPoints.length; j++) {
      const jumpEnd = pathPoints[j];

      const jumpLength = j - i - 2;
      const startX = jumpStart[0];
      const startY = jumpStart[1];
      const endX = jumpEnd[0];
      const endY = jumpEnd[1];

      if (
        startX === endX &&
        (maze[startY + 1][startX] === "#" ||
          maze[startY - 1][startX] === "#") &&
        (startY === endY + 2 || startY === endY - 2)
      ) {
        if (jumpLength > maxJump) {
          maxJump = jumpLength;
          jump = [jumpStart, jumpEnd, i, j];
        }
        // maxJump = Math.max(maxJump, j - i - 2);
        // console.log("up/down", j - i + 2);
        jumps.set(jumpLength, (jumps.get(jumpLength) ?? 0) + 1);
      }

      if (
        startY === endY &&
        (maze[startY][startX - 1] === "#" ||
          maze[startY][startX + 1] === "#") &&
        (startX === endX + 2 || startX === endX - 2)
      ) {
        if (jumpLength > maxJump) {
          maxJump = jumpLength;
          jump = [jumpStart, jumpEnd, i, j];
        }
        // console.log("left/right", j - i);
        // maxJump = Math.max(maxJump, j - i - 2);
        jumps.set(jumpLength, (jumps.get(jumpLength) ?? 0) + 1);
      }
    }
  }
  console.log(maxJump);
  console.log(jumps);
  console.log(jump);
  console.log(shortestPath.cost);

  for (let i = 1; i <= jump[2]; i++) {
    const point = pathPoints[i];

    maze[point[1]][point[0]] = "X";
  }

  for (let i = jump[3]; i < pathPoints.length; i++) {
    const point = pathPoints[i];

    maze[point[1]][point[0]] = "O";
  }
  print(maze);
  return shortestPath.cost - maxJump;
};

export const solution: DaySolution = {
  fn: dayPart1,
  expectedSample: 20,
  expected: -1,
};
