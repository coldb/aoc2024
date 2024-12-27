import { toInt } from "../lib/string.ts";

const regex = /mul\(([0-9]{1,3}),([0-9]{1,3})\)/g;
export const day3A = (textRows: string[]) => {
  const allMatches = textRows
    .map((row) => [...row.matchAll(regex)])
    .map((match) => {
      let sum = 0;

      for (const singleMul of match) {
        sum += toInt(singleMul[1]) * toInt(singleMul[2]);
      }
      return sum;
    });

  return allMatches.reduce((memo, item) => {
    return memo + item;
  }, 0);
};

export const solution: DaySolution = {
  fn: day3A,
  expectedSample: 161,
  expected: 178794710,
};
