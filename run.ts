import { day1A } from "./day1/a.ts";
import { day1B } from "./day1/b.ts";
import { day2A } from "./day2/a.ts";
import { day2B } from "./day2/b.ts";
import { day3A } from "./day3/a.ts";
import { day3B } from "./day3/b.ts";
import { day4A } from "./day4/a.ts";
import { day4B } from "./day4/b.ts";
import { day5A } from "./day5/a.ts";
import { day5B } from "./day5/b.ts";
import { day6A } from "./day6/a.ts";
import { day6B } from "./day6/b.ts";
import { day7A } from "./day7/a.ts";
import { day7B } from "./day7/b.ts";
import { day8A } from "./day8/a.ts";
import { day8B } from "./day8/b.ts";
import { day9A, expected9A } from "./day9/a.ts";
import { day9B } from "./day9/b.ts";
import { day10A, expected10A } from "./day10/a.ts";
import { day10B, expected10B } from "./day10/b.ts";
import { readData } from "./lib/file.ts";
import { parseArgs } from "jsr:@std/cli/parse-args";
import { toInt } from "./lib/string.ts";

const RED = "\x1b[31m";
const GREEN = "\x1b[32m";

const badResult = `${RED}\uf46e`;
const goodResult = `${GREEN}\uf058`;

const runners: {
  [key: number]: {
    runners: {
      a: (data: string[]) => string | number;
      b: (data: string[]) => string | number;
    };
    expected?: {
      a?: string | number;
      b?: string | number;
    };
  };
} = {
  1: {
    runners: { a: day1A, b: day1B },
    // expected: { a: expected1A, b: expected1B },
  },
  2: {
    runners: { a: day2A, b: day2B },
    // expected: { a: expected2A, b: expected2B },
  },
  3: {
    runners: { a: day3A, b: day3B },
    // expected: { a: expected3A, b: expected3B },
  },
  4: {
    runners: { a: day4A, b: day4B },
    // expected: { a: expected4A, b: expected4B },
  },
  5: {
    runners: { a: day5A, b: day5B },
    // expected: { a: expected5A, b: expected5B },
  },
  6: {
    runners: { a: day6A, b: day6B },
    // expected: { a: expected6A, b: expected6B },
  },
  7: {
    runners: { a: day7A, b: day7B },
    // expected: { a: expected7A, b: expected7B },
  },
  8: {
    runners: { a: day8A, b: day8B },
    // expected: { a: expected8A, b: expected8B },
  },
  9: {
    runners: { a: day9A, b: day9B },
    expected: { a: expected9A },
  },
  10: {
    runners: { a: day10A, b: day10B },
    expected: { a: expected10A, b: expected10B },
  },
};

const flags = parseArgs(Deno.args, {
  boolean: ["debug"],
  string: ["day", "data", "step"],
  default: { day: "1", data: "", step: "a" },
});

console.log("day:", flags.day);
console.log("step:", flags.step);
console.log("data:", flags.data);
console.log("debug:", flags.debug);
console.log("-----------------------");

const step = flags.step === "a" ? "a" : "b";

const dayNr = toInt(flags.day);
const data = await readData(dayNr, flags.data);

if (flags.debug) {
  console.log("data:", data);
}

const result = runners[dayNr]?.runners[step](data);
const expectedResult = runners[dayNr]?.expected?.[step];

console.log("-----------------------");

if (expectedResult !== undefined) {
  if (expectedResult === result) {
    console.log(`${goodResult} : ${result}`);
  } else {
    console.log(`${badResult} : ${result} (expected: ${expectedResult})`);
  }
} else {
  console.log("Result:", result);
}
