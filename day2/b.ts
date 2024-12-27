import { toInt } from "../lib/string.ts";

const isSafe = (numbers: number[]) => {
  const direction = numbers[0] < numbers[1] ? "inc" : "dec";

  for (let j = 0; j < numbers.length - 1; j++) {
    const number1 = numbers[j];
    const number2 = numbers[j + 1];

    const diff = Math.abs(number1 - number2);

    if (diff < 1 || diff > 3) {
      return false;
    }

    if (direction === "inc" && number1 > number2) {
      return false;
    }
    if (direction === "dec" && number1 < number2) {
      return false;
    }
  }

  return true;
};

export const day2B = (textRows: string[]) => {
  let safe = 0;
  for (let i = 0; i < textRows.length; i++) {
    const numbers = textRows[i].split(" ").map(toInt);

    if (isSafe(numbers)) {
      safe++;
    } else {
      for (let j = 0; j < numbers.length; j++) {
        if (isSafe(numbers.toSpliced(j, 1))) {
          safe++;
          break;
        }
      }
    }
  }

  return safe;
};

export const solution: DaySolution = {
  fn: day2B,
  expectedSample: 4,
  expected: 710,
};
