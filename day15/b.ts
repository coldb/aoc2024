import { splitData } from "../lib/string.ts";
import type { DaySolution } from "../types.ts";

const directions = [
  { symbol: "^", x: 0, y: -1 },
  { symbol: ">", x: 1, y: 0 },
  { symbol: "v", x: 0, y: 1 },
  { symbol: "<", x: -1, y: 0 },
];

function expand(value: string) {
  switch (value) {
    case "#":
      return "##";
    case "O":
      return "[]";
    case ".":
      return "..";
    case "@":
      return "@.";
  }
}
export const dayPart2 = (textRows: string[]) => {
  const [roomRawData, movementRawData] = splitData(textRows);

  const roomData = roomRawData.map((row) =>
    row.split("").map(expand).join("").split(""),
  );

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

  for (const movement of movementData) {
    const modifier = directions[movement.idx];

    // console.log(modifier, robotPos);
    let nextX = robotPos.x + modifier.x;
    let nextY = robotPos.y + modifier.y;
    let nextContents = roomData[nextY][nextX];

    if (nextContents === ".") {
      // console.log("a");
      roomData[robotPos.y][robotPos.x] = ".";
      roomData[nextY][nextX] = "@";
      robotPos.x = nextX;
      robotPos.y = nextY;
    } else if (nextContents === "#") {
      continue;
    } else if (modifier.symbol === "<" || modifier.symbol === ">") {
      if (nextContents === "]" || nextContents === "[") {
        let totalMoves = 0;
        while (nextContents !== "#") {
          if (nextContents === ".") {
            for (let i = 0; i <= totalMoves; i++) {
              roomData[nextY][nextX] =
                roomData[nextY + modifier.y * -1][nextX + modifier.x * -1];
              nextX = nextX + modifier.x * -1;
              nextY = nextY + modifier.y * -1;
            }
            robotPos.x = robotPos.x + modifier.x;
            robotPos.y = robotPos.y + modifier.y;

            roomData[nextY][nextX] = ".";
            break;
          }
          totalMoves++;
          nextX = nextX + modifier.x;
          nextY = nextY + modifier.y;
          nextContents = roomData[nextY][nextX];
        }
      }
    } else {
      const canMoveBoxes = moveBoxesUpOrDown(
        roomData,
        robotPos.x,
        robotPos.y,
        modifier,
      );

      if (canMoveBoxes) {
        robotPos.x = robotPos.x + modifier.x;
        robotPos.y = robotPos.y + modifier.y;
      }
    }
  }

  let sum = 0;
  for (let y = 0; y < roomData.length; y++) {
    for (let x = 0; x < roomData[0].length; x++) {
      if (roomData[y][x] === "[") {
        sum += y * 100 + x;
      }
    }
  }

  return sum;
};

function moveBoxesUpOrDown(
  roomData: string[][],
  robotX: number,
  robotY: number,
  modifier: { x: number; y: number },
) {
  const nodesToCheck: { x: number; y: number }[] = [];
  const nodesToMove: { x: number; y: number }[] = [];
  const movedNodes = new Set<string>();

  const nextX = robotX + modifier.x;
  const nextY = robotY + modifier.y;
  const nextContents = roomData[nextY][nextX];
  if (nextContents === "[") {
    nodesToCheck.push({ x: nextX, y: nextY }, { x: nextX + 1, y: nextY });
    nodesToMove.push({ x: nextX, y: nextY }, { x: nextX + 1, y: nextY });
  } else if (nextContents === "]") {
    nodesToCheck.push({ x: nextX, y: nextY }, { x: nextX - 1, y: nextY });
    nodesToMove.push({ x: nextX, y: nextY }, { x: nextX - 1, y: nextY });
  }

  while (nodesToCheck.length > 0) {
    const nodeToCheck = nodesToCheck.pop();

    const nextX = nodeToCheck!.x + modifier.x;
    const nextY = nodeToCheck!.y + modifier.y;

    const nextContents = roomData[nextY][nextX];

    if (nextContents === "#") {
      return false;
    }

    if (nextContents === "[") {
      nodesToCheck.push({ x: nextX, y: nextY }, { x: nextX + 1, y: nextY });
      nodesToMove.push({ x: nextX, y: nextY }, { x: nextX + 1, y: nextY });
    } else if (nextContents === "]") {
      nodesToCheck.push({ x: nextX, y: nextY }, { x: nextX - 1, y: nextY });
      nodesToMove.push({ x: nextX, y: nextY }, { x: nextX - 1, y: nextY });
    }
  }

  while (nodesToMove.length > 0) {
    const nodeToMove = nodesToMove.pop() as { x: number; y: number };
    if (movedNodes.has(`${nodeToMove.x}-${nodeToMove.y}`)) {
      continue;
    }

    movedNodes.add(`${nodeToMove.x}-${nodeToMove.y}`);

    roomData[nodeToMove.y + modifier.y][nodeToMove.x + modifier.x] =
      roomData[nodeToMove.y][nodeToMove.x];
    roomData[nodeToMove.y][nodeToMove.x] = ".";
  }

  roomData[robotY + modifier.y][robotX + modifier.x] = "@";
  roomData[robotY][robotX] = ".";

  return true;
}

export const solution: DaySolution = {
  fn: dayPart2,
  expectedSample: 9021,
  expected: 1548815,
};
