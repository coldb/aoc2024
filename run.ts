import { solution as day1Part1 } from "./day1/a.ts";
import { solution as day1Part2 } from "./day1/b.ts";
import { solution as day2Part1 } from "./day2/a.ts";
import { solution as day2Part2 } from "./day2/b.ts";
import { solution as day3Part1 } from "./day3/a.ts";
import { solution as day3Part2 } from "./day3/b.ts";
import { solution as day4Part1 } from "./day4/a.ts";
import { solution as day4Part2 } from "./day4/b.ts";
import { solution as day5Part1 } from "./day5/a.ts";
import { solution as day5Part2 } from "./day5/b.ts";
import { solution as day6Part1 } from "./day6/a.ts";
import { solution as day6Part2 } from "./day6/b.ts";
import { solution as day7Part1 } from "./day7/a.ts";
import { solution as day7Part2 } from "./day7/b.ts";
import { solution as day8Part1 } from "./day8/a.ts";
import { solution as day8Part2 } from "./day8/b.ts";
import { solution as day9Part1 } from "./day9/a.ts";
import { solution as day9Part2 } from "./day9/b.ts";
import { solution as day10Part1 } from "./day10/a.ts";
import { solution as day10Part2 } from "./day10/b.ts";
import { readData } from "./lib/file.ts";
import { parseArgs } from "jsr:@std/cli/parse-args";
import { toInt } from "./lib/string.ts";
import type { DaySolution } from "./types.ts";

const RESET = "\x1b[0m";
const RED = "\x1b[31m";
const ORANGE = "\x1b[38;5;208m";
const GREEN = "\x1b[32m";

const badResult = `${RED}\uf46e`;
const goodResult = `${GREEN}\uf058`;

const solutions: {
  [key: number]: [DaySolution, DaySolution];
} = {
  1: [day1Part1, day1Part2],
  2: [day2Part1, day2Part2],
  3: [day3Part1, day3Part2],
  4: [day4Part1, day4Part2],
  5: [day5Part1, day5Part2],
  6: [day6Part1, day6Part2],
  7: [day7Part1, day7Part2],
  8: [day8Part1, day8Part2],
  9: [day9Part1, day9Part2],
  10: [day10Part1, day10Part2],
};

const flags = parseArgs(Deno.args, {
  boolean: ["debug"],
  string: ["day", "data", "step"],
  default: { day: "", data: "", step: "1" },
});

if (flags.day !== "") {
  await runDay(flags.day, flags.step, flags.data);
} else {
  await runDays();
}

async function runDays() {
  for (let dayNr = 1; dayNr <= Object.keys(solutions).length; dayNr++) {
    const [solutionPart1, solutionPart2] = solutions[dayNr];

    if (solutionPart1.expectedSample !== -1) {
      const data = await readData(dayNr, "sample");

      const result = solutionPart1.fn(data);

      printResult(dayNr, 1, solutionPart1.expectedSample, result, "sample");
    }

    if (solutionPart1.expected !== -1) {
      const data = await readData(dayNr, "");

      const result = solutionPart1.fn(data);

      printResult(dayNr, 1, solutionPart1.expected, result, "");
    }

    if (solutionPart2.expectedSample !== -1) {
      const data = await readData(dayNr, "sample");

      const result = solutionPart2.fn(data);

      printResult(dayNr, 2, solutionPart2.expectedSample, result, "sample");
    }

    if (solutionPart2.expected !== -1) {
      const data = await readData(dayNr, "");

      const result = solutionPart2.fn(data);

      printResult(dayNr, 2, solutionPart2.expected, result, "");
    }
  }
}

function printResult(
  dayNr: number,
  part: number,
  expected: string | number,
  result: string | number,
  data: string,
) {
  if (expected === result) {
    console.log(
      `${RESET}day ${dayNr} (Part ${part}): ${goodResult} ${RESET}: ${ORANGE}${result}${RESET}${data === "sample" ? " (sample)" : ""}`,
    );
  } else {
    console.log(
      `${RESET}day ${dayNr} (Part ${part}): ${badResult} ${RESET}: ${ORANGE}${result}${RESET} (expected: ${expected})${data === "sample" ? " (sample)" : ""}`,
    );
  }
}

async function runDay(day: string, step: string, data: string) {
  console.log("day:", day);
  console.log("step:", step);
  console.log("data:", data);
  console.log("debug:", flags.debug);
  console.log("-----------------------");

  const dayNr = toInt(flags.day);
  const dayData = await readData(dayNr, data);

  if (flags.debug) {
    console.log("data:", dayData);
  }

  const [part1Solution, part2Solution] = solutions[dayNr];

  const activePartSolution = step === "1" ? part1Solution : part2Solution;

  console.log("-----------------------");

  const result = activePartSolution.fn(dayData);
  const expectedResult =
    data === ""
      ? activePartSolution.expected
      : data === "sample"
        ? activePartSolution.expectedSample
        : undefined;

  if (expectedResult !== undefined && expectedResult !== -1) {
    if (expectedResult === result) {
      console.log(
        `day ${dayNr}: ${goodResult} ${RESET}: ${ORANGE}${result}${RESET}${data === "sample" ? " (sample)" : ""}`,
      );
    } else {
      console.log(
        `day ${dayNr}: ${badResult} ${RESET}: ${ORANGE}${result}${RESET} (expected: ${expectedResult})${data === "sample" ? " (sample)" : ""}`,
      );
    }
  } else {
    console.log(`day ${dayNr}: ${ORANGE}${result}`);
  }
}
