import { toInt } from "../lib/string.ts";
import type { DaySolution } from "../types.ts";

export const dayPart2 = (textRows: string[]) => {
  const startNumbers = textRows.map(toInt);

  const combinations = new Map<string, number>();

  startNumbers.forEach((startNumber) => {
    mapCombinations(startNumber, combinations);
  });

  const mostPossibleBananas = Array.from(combinations.values()).reduce(
    (memo, item) => Math.max(memo, item),
    0,
  );
  return mostPossibleBananas;
};

const MOD = 16777216;

function mapCombinations(
  startNumber: number,
  combinationTotals: Map<string, number>,
) {
  let newSecret = startNumber;
  const sequences = new Set<string>();
  const finalNumbers: number[] = [];
  const deltaNumbers: number[] = [];
  for (let i = 0; i < 2000; i++) {
    const lastSecret = newSecret;
    newSecret = calculateNext(newSecret);
    finalNumbers.push(newSecret % 10);
    deltaNumbers.push((newSecret % 10) - (lastSecret % 10));

    if (i > 3) {
      const sequenceKey = deltaNumbers.slice(i - 4, i).join(",");

      if (!sequences.has(sequenceKey)) {
        sequences.add(sequenceKey);

        combinationTotals.set(
          sequenceKey,
          (combinationTotals.get(sequenceKey) ?? 0) + finalNumbers[i - 1],
        );
      }
    }
  }
}

function calculateNext(currentValue: number) {
  const step1Value = (currentValue ^ (currentValue * 64)) % MOD;
  const step2Value = (step1Value ^ Math.floor(step1Value / 32)) % MOD;
  return ((step2Value ^ (step2Value * 2048)) >>> 0) % MOD;
}

export const solution: DaySolution = {
  fn: dayPart2,
  expectedSample: -1,
  expected: 1710,
};
