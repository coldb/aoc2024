import { BinaryHeap } from "jsr:@std/data-structures";
import type { DaySolution } from "../types.ts";
import { nodeKey } from "./a.ts";

const directions = [
  { symbol: "^", x: 0, y: -1 },
  { symbol: ">", x: 1, y: 0 },
  { symbol: "v", x: 0, y: 1 },
  { symbol: "<", x: -1, y: 0 },
];

export const dayPart2 = (textRows: string[]) => {
  const heap = new BinaryHeap<{
    cost: number;
    x: number;
    y: number;
    dir: number;
    parent?: string;
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
  const minCost = new Map<string, number>([
    [nodeKey({ x: startX, y: startY, dir: 1 }), 0],
  ]);
  const endNodeKeys = new Set<string>();

  const backtrack = new Map<string, Set<string>>();
  let bestCost = Number.MAX_VALUE;

  while (!heap.isEmpty()) {
    const currentNode = heap.pop()!;
    const currentNodeKey = nodeKey(currentNode);

    if (currentNode.cost > (minCost.get(currentNodeKey) ?? Number.MAX_VALUE)) {
      continue;
    }

    minCost.set(currentNodeKey, currentNode.cost);

    if (maze[currentNode.y][currentNode.x] === "E") {
      if (currentNode.cost > bestCost) {
        break;
      }

      bestCost = currentNode.cost;

      endNodeKeys.add(currentNodeKey);
    }

    if (currentNode.parent) {
      const currentBacktrack = backtrack.get(currentNodeKey);

      if (currentBacktrack !== undefined) {
        currentBacktrack.add(currentNode.parent);
      } else {
        backtrack.set(
          currentNodeKey,
          new Set(currentNode.parent !== undefined ? [currentNode.parent] : []),
        );
      }
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

      const newNode = {
        cost: newCost,
        x: newX,
        y: newY,
        dir: newDirection,
        parent: currentNodeKey,
      };
      const newNodeKey = nodeKey(newNode);

      if (newCost > (minCost.get(newNodeKey) ?? Number.MAX_VALUE)) {
        continue;
      }

      heap.push(newNode);
    }
  }

  const seen = new Set<string>();
  const queue: string[] = Array.from(endNodeKeys.values());

  const uniqueNodes = new Set<string>(
    Array.from(endNodeKeys).map((end) => end.split("-").slice(0, 2).join("-")),
  );

  while (queue.length > 0) {
    const current = queue.shift()!;

    const currentBacktrack = Array.from(
      backtrack.get(current) ?? new Set<string>(),
    );

    currentBacktrack.forEach((item) => {
      if (seen.has(item)) {
        return;
      }

      seen.add(item);
      uniqueNodes.add(item.split("-").slice(0, 2).join("-"));
      queue.push(item);
    });
  }

  return uniqueNodes.size;
};

export const solution: DaySolution = {
  fn: dayPart2,
  expectedSample: 45,
  expected: 1024,
};
