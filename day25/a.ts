import { splitData } from "../lib/string.ts";
import type { DaySolution } from "../types.ts";

export const dayPart1 = (textRows: string[]) => {
  const items = splitData(textRows);

  const locks = items.filter((item) => item[0][0] === "#").map(tranformLock);
  const keys = items.filter((item) => item[0][0] === ".").map(tranformKey);

  let count = 0;
  for (const lock of locks) {
    for (const key of keys) {
      if (isKeyLockPair(key, lock)) {
        count++;
      }
    }
  }
  return count;
};

function isKeyLockPair(key: number[], lock: number[]) {
  for (let i = 0; i < key.length; i++) {
    if (key[i] + lock[i] > 5) {
      return false;
    }
  }

  return true;
}

function tranformLock(item: string[]) {
  const heights: number[] = [];

  for (let x = 0; x < item[0].length; x++) {
    let height = 0;

    for (let y = 1; y < item.length - 1; y++) {
      if (item[y][x] === "#") {
        height++;
      }
    }

    heights.push(height);
  }

  return heights;
}

function tranformKey(item: string[]) {
  const heights: number[] = [];

  for (let x = 0; x < item[0].length; x++) {
    let height = 0;

    for (let y = item.length - 2; y >= 1; y--) {
      if (item[y][x] === "#") {
        height++;
      }
    }

    heights.push(height);
  }

  return heights;
}

export const solution: DaySolution = {
  fn: dayPart1,
  expectedSample: 3,
  expected: 3146,
};
