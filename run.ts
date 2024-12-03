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
import { readData } from "./lib/file.ts";
import { parseArgs } from "jsr:@std/cli/parse-args";
import { toInt } from "./lib/string.ts";

const runners: {
  [key: number]: {
    a: (data: string[]) => string | number;
    b: (data: string[]) => string | number;
  };
} = {
  1: { a: day1A, b: day1B },
  2: { a: day2A, b: day2B },
  3: { a: day3A, b: day3B },
  4: { a: day4A, b: day4B },
  5: { a: day5A, b: day5B },
  6: { a: day6A, b: day6B },
  7: { a: day7A, b: day7B },
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

const result = await runners[dayNr]?.[step](data);

console.log("-----------------------");
console.log("Result:", result);
