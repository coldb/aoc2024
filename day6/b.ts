import { toInt } from "../lib/string.ts";

const directions = [
  { x: 0, y: -1 },
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: -1, y: 0 },
];
export const day6B = (textRows: string[]) => {
  const map = textRows.map((row) => row.split(""));

  const visitedLocations = new Set<string>();

  const startY = map.findIndex((row) => row.includes("^"));
  const startX = map[startY].indexOf("^");

  visitedLocations.add(`${startX}-${startY}:0`);

  let currentX = startX;
  let currentY = startY;

  let directionCounter = 0;

  while (true) {
    const nextDirectionIdx = directionCounter % 4;
    const currentDirection = directions[nextDirectionIdx];
    const nextX = currentX + currentDirection.x;
    const nextY = currentY + currentDirection.y;

    if (
      nextX < 0 ||
      nextY < 0 ||
      nextX >= map[0].length ||
      nextY >= map.length
    ) {
      break;
    }
    if (map[nextY][nextX] === "#") {
      directionCounter++;
      continue;
    } else {
      visitedLocations.add(`${nextX}-${nextY}`);
      currentX = nextX;
      currentY = nextY;
      continue;
    }
  }

  visitedLocations.delete(`${startX}-${startY}`);

  let loopCount = 0;
  for (const visitedLocation of visitedLocations) {
    const [obstacleX, obstacleY] = visitedLocation.split("-").map(toInt);

    if (
      isLoop(
        map,
        directions,
        { x: obstacleX, y: obstacleY },
        { x: startX, y: startY },
      )
    ) {
      loopCount++;
    }
  }

  return loopCount;
};

function isLoop(
  map: string[][],
  directions: { x: number; y: number }[],
  newObstacle: { x: number; y: number },
  startPosition: { x: number; y: number },
) {
  const visitedLocations = new Set<string>();

  let currentX = startPosition.x;
  let currentY = startPosition.y;
  let directionCounter = 0;

  visitedLocations.add(`${currentX}-${currentY}:0`);

  while (true) {
    const nextDirectionIdx = directionCounter % 4;
    const currentDirection = directions[nextDirectionIdx];
    const nextX = currentX + currentDirection.x;
    const nextY = currentY + currentDirection.y;

    if (
      nextX < 0 ||
      nextY < 0 ||
      nextX >= map[0].length ||
      nextY >= map.length
    ) {
      return false;
    }
    if (
      map[nextY][nextX] === "#" ||
      (nextX === newObstacle.x && nextY === newObstacle.y)
    ) {
      directionCounter++;
      continue;
    } else {
      const nextVisitedLocation = `${nextX}-${nextY}:${nextDirectionIdx}`;

      if (visitedLocations.has(nextVisitedLocation)) {
        return true;
      }

      visitedLocations.add(nextVisitedLocation);
      currentX = nextX;
      currentY = nextY;
      continue;
    }
  }
}

export const solution: DaySolution = {
  fn: day6B,
  expectedSample: -1,
  expected: -1,
};
