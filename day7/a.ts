import { toInt } from "../lib/string.ts";

export const day7A = (textRows: string[]) => {
  const data = textRows
    .map((row) => row.split(": "))
    .map(([total, parts]) => ({
      total: toInt(total),
      parts: parts.split(" ").map(toInt),
    }));

  let total = 0;
  for (const equation of data) {
    if (isValidEquation(equation.total, equation.parts)) {
      total += equation.total;
    }
  }
  return total;
};

function isValidEquation(
  expectedTotal: number,
  parts: number[],
  accumulatedTotal: number = 0,
) {
  if (parts.length === 0) {
    return accumulatedTotal === expectedTotal;
  }

  if (
    isValidEquation(expectedTotal, parts.slice(1), accumulatedTotal + parts[0])
  ) {
    return true;
  }

  if (
    isValidEquation(expectedTotal, parts.slice(1), accumulatedTotal * parts[0])
  ) {
    return true;
  }

  return false;
}

export const solution: DaySolution = {
  fn: day7A,
  expectedSample: -1,
  expected: -1,
};
