import { toInt } from "../lib/string.ts";
import type { DaySolution } from "../types.ts";

export const day1A = (textRows: string[]) => {
  const list1: number[] = [];
  const list2: number[] = [];
  for (let i = 0; i < textRows.length; i++) {
    const splitRow = textRows[i].split("   ");
    list1.push(toInt(splitRow[0]));
    list2.push(toInt(splitRow[1]));
  }
  const sortedList1 = list1.sort();
  const sortedList2 = list2.sort();

  let sum = 0;
  for (let j = 0; j < sortedList1.length; j++) {
    sum += Math.abs(sortedList1[j] - sortedList2[j]);
  }

  return sum;
};

export const solution: DaySolution = {
  fn: day1A,
  expectedSample: 11,
  expected: 1197984,
};
