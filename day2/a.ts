import { toInt } from "../lib/string.ts";

export const day2A = (textRows: string[]) => {
  let safe = 0;
  for (let i = 0; i < textRows.length; i++) {
    const numbers = textRows[i].split(" ").map(toInt);

    const direction = numbers[0] < numbers[1] ? "inc" : "dec";

    for (let j = 0; j < numbers.length - 1; j++) {
      const number1 = numbers[j];
      const number2 = numbers[j + 1];
      const diff = Math.abs(number1 - number2);

      if (diff < 1 || diff > 3) {
        break;
      }

      if (direction === "inc" && number1 > number2) {
        break;
      }
      if (direction === "dec" && number1 < number2) {
        break;
      }

      if (j === numbers.length - 2) {
        safe++;
      }
    }
  }
  return safe;
};

export const solution: DaySolution = {
  fn: day2A,
  expectedSample: 2,
  expected: 680,
};
