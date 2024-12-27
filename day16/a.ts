import type { DaySolution } from "../types.ts";
import { BinaryHeap } from "jsr:@std/data-structures";

const directions = [
  { symbol: "^", x: 0, y: -1 },
  { symbol: ">", x: 1, y: 0 },
  { symbol: "v", x: 0, y: 1 },
  { symbol: "<", x: -1, y: 0 },
];

export function nodeKey({ x, y, dir }: { x: number; y: number; dir: number }) {
  return `${x}-${y}-${dir}`;
}

export const dayPart1 = (textRows: string[]) => {
  const heap = new BinaryHeap<{
    cost: number;
    x: number;
    y: number;
    dir: number;
  }>((a, b) => a.cost - b.cost);

  const maze = textRows.map((row) => row.split(""));

  let startX = -1;
  let startY = -1;
  for (let y = 1; y < maze.length - 1; y++) {
    for (let x = 1; x < maze.length - 1; x++) {
      if (maze[y][x] === "S") {
        startX = x;
        startY = y;
        break;
      }
    }
  }

  heap.push({ cost: 0, x: startX, y: startY, dir: 1 });
  const seen = new Set<string>([nodeKey({ x: startX, y: startY, dir: 1 })]);

  while (!heap.isEmpty()) {
    const currentNode = heap.pop()!;
    seen.add(nodeKey(currentNode));

    if (maze[currentNode.y][currentNode.x] === "E") {
      return currentNode.cost;
    }

    for (let dirChange = 0; dirChange <= 3; dirChange++) {
      const newDirection = (currentNode.dir + dirChange) % 4;
      const modifier = directions[newDirection];
      const turns = dirChange === 3 ? 1 : dirChange;
      const newCost = currentNode.cost + turns * 1000 + 1;

      const newX = currentNode.x + modifier.x;
      const newY = currentNode.y + modifier.y;

      if (maze[newY][newX] === "#") {
        continue;
      }

      if (seen.has(nodeKey({ x: newX, y: newY, dir: newDirection }))) {
        continue;
      }

      heap.push({ cost: newCost, x: newX, y: newY, dir: newDirection });
    }
  }

  return -1;
};

export const solution: DaySolution = {
  fn: dayPart1,
  expectedSample: 7036,
  expected: 130536,
};
