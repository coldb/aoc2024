import { toInt } from "../lib/string.ts";
import type { DaySolution } from "../types.ts";

export const day1B = (textRows: string[]) => {
  const list1: number[] = [];
  const list2Counts: Map<number, number> = new Map();
  for (let i = 0; i < textRows.length; i++) {
    const splitRow = textRows[i].split("   ");

    const firstNumber = toInt(splitRow[0]);
    const secondNumber = toInt(splitRow[1]);
    list1.push(firstNumber);

    list2Counts.set(secondNumber, (list2Counts.get(secondNumber) ?? 0) + 1);
  }

  let sum = 0;
  for (let j = 0; j < list1.length; j++) {
    sum += list1[j] * (list2Counts.get(list1[j]) ?? 0);
  }

  return sum;
};

export const solution: DaySolution = {
  fn: day1B,
  expectedSample: 31,
  expected: 23387399,
};
