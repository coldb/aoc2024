import { memoize } from "@std/cache";
import {
  permutations,
  permutationsWithReplacement,
  powerSet,
} from "https://deno.land/x/combinatorics/mod.ts";
import type { DaySolution } from "../types.ts";
import { toInt } from "../lib/string.ts";

const numberKeypad = [
  ["7", "8", "9"],
  ["4", "5", "6"],
  ["1", "2", "3"],
  [null, "0", "A"],
];

const movementKeypad = [
  [null, "^", "A"],
  ["<", "v", ">"],
];

const modifiers = [
  { symbol: "^", x: 0, y: -1 },
  { symbol: ">", x: 1, y: 0 },
  { symbol: "v", x: 0, y: 1 },
  { symbol: "<", x: -1, y: 0 },
];

const numberMoves = calculateAllKeypadMoves(numberKeypad);
const movementMoves = calculateAllKeypadMoves(movementKeypad);

function calculateAllKeypadMoves(keypad: (null | string)[][]) {
  const possibleKeys: { v: string; x: number; y: number }[] = [];
  const moves = new Map<string, string[]>();

  for (let y = 0; y < keypad.length; y++) {
    for (let x = 0; x < keypad[0].length; x++) {
      if (keypad[y][x] === null) {
        continue;
      }

      possibleKeys.push({ v: keypad[y][x], x, y });
    }
  }

  const possibleKeyPairs = permutationsWithReplacement(possibleKeys, 2);

  possibleKeyPairs.forEach((combination) => {
    const combinationMoves = calculateShortestPaths(
      combination[0],
      combination[1],
      keypad,
    );
    moves.set(
      `${combinationMoves.start}${combinationMoves.end}`,
      combinationMoves.moves,
    );
  });

  return moves;
}

function calculateShortestPaths(
  startKey: { v: string; x: number; y: number },
  endKey: { v: string; x: number; y: number },
  keypad: (null | string)[][],
) {
  const nextKeys: {
    key: { v: string; x: number; y: number };
    path: string;
  }[] = [{ key: startKey, path: "" }];

  let minLength = Number.MAX_VALUE;
  const shortestMoves: string[] = [];
  while (nextKeys.length > 0) {
    const current = nextKeys.pop()!;

    if (current.key.v === endKey.v) {
      const path = `${current.path}A`;
      shortestMoves.push(path);

      minLength = path.length;
    }

    if (current.path.length >= minLength) {
      continue;
    }

    modifiers.forEach((modifier) => {
      const newX = current.key.x + modifier.x;
      const newY = current.key.y + modifier.y;

      if (
        newX < 0 ||
        newY < 0 ||
        newX >= keypad[0].length ||
        newY >= keypad.length ||
        keypad[newY][newX] === null
      ) {
        return;
      }

      nextKeys.unshift({
        key: { v: keypad[newY][newX], x: newX, y: newY },
        path: `${current.path}${modifier.symbol}`,
      });
    });
  }

  return { start: startKey.v, end: endKey.v, moves: shortestMoves };
}

const calculateLength = memoize((from: string, to: string, level = 2) => {
  const permutations = movementMoves.get(`${from}${to}`)!;
  // console.log(from, to, permutations, level);

  if (level === 1) {
    return permutations[0].length;
  }

  let minLength = Number.MAX_VALUE;

  permutations.forEach((permutation) => {
    let total = 0;
    const toSolve = "A" + permutation;
    for (let i = 0; i < toSolve.length - 1; i++) {
      total += calculateLength(toSolve[i], toSolve[i + 1], level - 1);
    }

    minLength = Math.min(minLength, total);
  });
  return minLength;
});

export function solveMovementLevels(codesToEnter: string[], levels = 2) {
  let total = 0;
  for (const codeToEnter of codesToEnter) {
    let sequences: string[] = [""];

    const codeToEnterWithPrefix = "A" + codeToEnter;
    for (let i = 0; i < codeToEnterWithPrefix.length - 1; i++) {
      const permutations = numberMoves.get(
        `${codeToEnterWithPrefix[i]}${codeToEnterWithPrefix[i + 1]}`,
      )!;

      sequences = sequences
        .map((sequence) =>
          permutations.map((permutation) => sequence + permutation),
        )
        .flat();
    }

    let minSequence = Number.MAX_VALUE;
    sequences.map((sequence) => {
      let total = 0;
      const toSolve = "A" + sequence;
      for (let i = 0; i < toSolve.length - 1; i++) {
        total += calculateLength(toSolve[i], toSolve[i + 1], levels);
      }

      minSequence = Math.min(minSequence, total);
    });

    total += toInt(codeToEnter.slice(0, -1)) * minSequence;
  }

  return total;
}
export const dayPart1 = (textRows: string[]) => {
  return solveMovementLevels(textRows, 2);
};

export const solution: DaySolution = {
  fn: dayPart1,
  expectedSample: 126384,
  expected: 182844,
};
