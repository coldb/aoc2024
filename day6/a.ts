const directions = [
  { x: 0, y: -1 },
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: -1, y: 0 },
];
export const day6A = (textRows: string[]) => {
  const map = textRows.map((row) => row.split(""));

  const visitedLocations = new Set<string>();

  const startY = map.findIndex((row) => row.includes("^"));
  const startX = map[startY].indexOf("^");

  visitedLocations.add(`${startX}-${startY}`);

  let currentX = startX;
  let currentY = startY;

  let directionCounter = 0;

  while (true) {
    const currentDirection = directions[directionCounter % 4];
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

  return visitedLocations.size;
};
