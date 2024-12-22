import { arraySum } from "../lib/array.ts";
import { toInt } from "../lib/string.ts";
import type { DaySolution } from "../types.ts";

export const dayPart1 = (textRows: string[]) => {
  const startNumbers = textRows.map(toInt);

  const newSecrets = startNumbers.map((startNumber) => {
    let newSecret = startNumber;
    for (let i = 0; i < 2000; i++) {
      newSecret = calculateNext(newSecret);
    }

    return newSecret;
  });

  return arraySum(newSecrets);
};

const MOD = 16777216;

function calculateNext(currentValue: number) {
  const step1Value = (currentValue ^ (currentValue * 64)) % MOD;
  const step2Value = (step1Value ^ Math.floor(step1Value / 32)) % MOD;
  return ((step2Value ^ (step2Value * 2048)) >>> 0) % MOD;
}

export const solution: DaySolution = {
  fn: dayPart1,
  expectedSample: 37327623,
  expected: 15006633487,
};
