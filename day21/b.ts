import type { DaySolution } from "../types.ts";
import { solveMovementLevels } from "./a.ts";

export const dayPart2 = (textRows: string[]) => {
  return solveMovementLevels(textRows, 25);
};

export const solution: DaySolution = {
  fn: dayPart2,
  expectedSample: -1,
  expected: 226179529377982,
};
