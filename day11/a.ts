import { toInt } from "../lib/string.ts";
import type { DaySolution } from "../types.ts";

type Stone = {
  value: number;
  next?: Stone;
};

export const dayA = (textRows: string[]) => {
  const stonesData = textRows[0].split(" ");

  let startStone: Stone = { value: toInt(stonesData[0]) };
  let previousStone: Stone | undefined = startStone;

  for (let i = 1; i < stonesData.length; i++) {
    const stoneData = stonesData[i];
    const stone = { value: toInt(stoneData) };

    if (startStone === undefined) {
      startStone = stone;
    }

    if (previousStone !== undefined) {
      previousStone.next = stone;
    }

    previousStone = stone;
  }

  for (let i = 1; i <= 25; i++) {
    blink(startStone);
  }

  return count(startStone);
};

function count(stone: Stone) {
  let stonesCount = 0;
  let currentStone: Stone | undefined = stone;
  do {
    stonesCount++;
    currentStone = currentStone.next;
  } while (currentStone !== undefined);

  return stonesCount;
}

function _print(stone: Stone) {
  const stones: number[] = [];
  let currentStone: Stone | undefined = stone;
  do {
    stones.push(currentStone.value);
    currentStone = currentStone.next;
  } while (currentStone !== undefined);
}

function blink(stone: Stone) {
  let currentStone: Stone | undefined = stone;
  do {
    if (currentStone.value === 0) {
      currentStone.value = 1;
    } else if (currentStone.value.toString().length % 2 === 0) {
      const stoneValueString = currentStone.value.toString();
      const stoneValueChars = stoneValueString.length;
      const firstStoneChars = stoneValueString.substring(
        0,
        stoneValueChars / 2,
      );
      const secondStoneChars = stoneValueString.substring(stoneValueChars / 2);

      const newStone: Stone = {
        value: toInt(secondStoneChars),
        next: currentStone.next,
      };

      currentStone.value = toInt(firstStoneChars);
      currentStone.next = newStone;

      currentStone = newStone;
    } else {
      currentStone.value = currentStone.value * 2024;
    }

    currentStone = currentStone.next;
  } while (currentStone !== undefined);
}

export const solution: DaySolution = {
  fn: dayA,
  expectedSample: 55312,
  expected: 207683,
};
