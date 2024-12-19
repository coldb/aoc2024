import { splitData, toInt } from "../lib/string.ts";
import type { DaySolution } from "../types.ts";

export const dayPart2 = (textRows: string[]) => {
  const [towelsStr, patterns] = splitData(textRows);

  const towels = towelsStr[0].split(", ");

  let count = 0;
  for (const pattern of patterns) {
    count += findCharMatches(pattern, towels);
  }

  return count;
};

function findCharMatches(pattern: string, towels: string[]) {
  const permutationsPerLength = new Map<number, number>();

  for (let i = 0; i < pattern.length; i++) {
    const remainingPattern = pattern.substring(i);
    for (const towel of towels) {
      if (remainingPattern.startsWith(towel)) {
        if (i === 0) {
          permutationsPerLength.set(
            towel.length,
            (permutationsPerLength.get(towel.length) ?? 0) + 1,
          );
        } else {
          const newLength = i + towel.length;

          permutationsPerLength.set(
            newLength,
            (permutationsPerLength.get(i) ?? 0) +
              (permutationsPerLength.get(newLength) ?? 0),
          );
        }
      }
    }
  }

  return permutationsPerLength.get(pattern.length) ?? 0;
}

export const solution: DaySolution = {
  fn: dayPart2,
  expectedSample: 16,
  expected: 723524534506343,
};
