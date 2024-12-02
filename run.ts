import { day1A } from "./day1/a.ts";
import { day1B } from "./day1/b.ts";
import { day2A } from "./day2/a.ts";
import { day2B } from "./day2/b.ts";
import { day3A } from "./day3/a.ts";
import { day3B } from "./day3/b.ts";
import { readData } from "./lib/file.ts";
import { parseArgs } from "jsr:@std/cli/parse-args";

const runners: {
  [key: number]: {
    a: (data: string[]) => Promise<string | number>;
    b: (data: string[]) => Promise<string | number>;
  };
} = {
  1: { a: day1A, b: day1B },
  2: { a: day2A, b: day2B },
  3: { a: day3A, b: day3B },
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

const dayNr = parseInt(flags.day, 10);
const data = await readData(dayNr, flags.data);

if (flags.debug) {
  console.log("data:", data);
}

const result = await runners[dayNr]?.[step](data);

console.log("-----------------------");
console.log("Result:", result);
