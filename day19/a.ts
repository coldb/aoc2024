import { splitData } from "../lib/string.ts";
import type { DaySolution } from "../types.ts";

export const dayPart1 = (textRows: string[]) => {
  const [towelsStr, patterns] = splitData(textRows);

  const towels = towelsStr[0].split(", ");

  let count = 0;
  for (const pattern of patterns) {
    if (isPatternPossible(pattern, towels)) {
      count++;
    }
  }
  return count;
};

function isPatternPossible(
  pattern: string,
  towels: string[],
  pointer: number = 0,
) {
  if (pointer === pattern.length) {
    return true;
  }

  for (const towel of towels) {
    if (pattern.substring(pointer).startsWith(towel)) {
      if (isPatternPossible(pattern, towels, pointer + towel.length)) {
        return true;
      }
    }
  }

  return false;
}

export const solution: DaySolution = {
  fn: dayPart1,
  expectedSample: 6,
  expected: 263,
};
