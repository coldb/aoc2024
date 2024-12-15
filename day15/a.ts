import { splitData } from "../lib/string.ts";
import type { DaySolution } from "../types.ts";

const directions = [
  { symbol: "^", x: 0, y: -1 },
  { symbol: ">", x: 1, y: 0 },
  { symbol: "v", x: 0, y: 1 },
  { symbol: "<", x: -1, y: 0 },
];

export const dayPart1 = (textRows: string[]) => {
  const [roomRawData, movementRawData] = splitData(textRows);

  const roomData = roomRawData.map((row) => row.split(""));

  let robotPos: { x: number; y: number } | undefined = undefined;

  for (let y = 0; y < roomData.length; y++) {
    for (let x = 0; x < roomData[0].length; x++) {
      if (roomData[y][x] === "@") {
        robotPos = { x, y };
        break;
      }
    }
  }

  if (robotPos === undefined) {
    throw new Error("Robot not found");
  }

  const movementData = movementRawData
    .join("")
    .split("")
    .map((movement) => {
      return {
        symbol: movement,
        idx: directions.findIndex((direction) => direction.symbol === movement),
      };
    });
  // .slice(0, 5);

  for (const movement of movementData) {
    const modifier = directions[movement.idx];

    let nextX = robotPos.x + modifier.x;
    let nextY = robotPos.y + modifier.y;
    let nextContents = roomData[nextY][nextX];

    if (nextContents === ".") {
      roomData[robotPos.y][robotPos.x] = ".";
      roomData[nextY][nextX] = "@";
      robotPos.x = nextX;
      robotPos.y = nextY;
    } else if (nextContents === "O") {
      let totalMoves = 0;
      while (nextContents !== "#") {
        if (nextContents === ".") {
          for (let i = 0; i < totalMoves; i++) {
            roomData[nextY][nextX] = "O";
            nextX = nextX + modifier.x * -1;
            nextY = nextY + modifier.y * -1;
          }

          roomData[nextY][nextX] = "@";
          robotPos.x = nextX;
          robotPos.y = nextY;
          nextX = nextX + modifier.x * -1;
          nextY = nextY + modifier.y * -1;
          roomData[nextY][nextX] = ".";
          break;
        }
        totalMoves++;
        nextX = nextX + modifier.x;
        nextY = nextY + modifier.y;
        nextContents = roomData[nextY][nextX];
      }
    }
  }

  let sum = 0;
  for (let y = 0; y < roomData.length; y++) {
    for (let x = 0; x < roomData[0].length; x++) {
      if (roomData[y][x] === "O") {
        sum += y * 100 + x;
      }
    }
  }

  return sum;
};

export const solution: DaySolution = {
  fn: dayPart1,
  expectedSample: 10092,
  expected: 1509863,
};
