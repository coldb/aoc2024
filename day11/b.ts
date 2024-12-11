import { toInt } from "../lib/string.ts";
import type { DaySolution } from "../types.ts";

export const dayPart2 = (textRows: string[]) => {
  const stonesData = textRows[0].split(" ");

  let stones = new Map<string, number>();

  for (const stoneData of stonesData) {
    stones.set(stoneData, stones.get(stoneData) ?? 1);
  }

  for (let i = 1; i <= 75; i++) {
    stones = blink(stones);
  }

  return Array.from(stones.values()).reduce((memo, item) => memo + item, 0);
};

function blink(stones: Map<string, number>) {
  const blinkedStones = new Map<string, number>();
  for (const [stoneValue, stoneAmount] of stones.entries()) {
    if (stoneValue === "0") {
      blinkedStones.set("1", (blinkedStones.get("1") ?? 0) + stoneAmount);
    } else if (stoneValue.length % 2 === 0) {
      const middleIdx = stoneValue.length / 2;
      const firstStoneChars = stoneValue.substring(0, middleIdx);
      const secondStoneChars = stoneValue.substring(middleIdx);

      blinkedStones.set(
        firstStoneChars,
        (blinkedStones.get(firstStoneChars) ?? 0) + stoneAmount,
      );
      const newSecondValue = toInt(secondStoneChars).toString();

      blinkedStones.set(
        newSecondValue,
        (blinkedStones.get(newSecondValue) ?? 0) + stoneAmount,
      );
    } else {
      const newValue = (toInt(stoneValue) * 2024).toString();
      blinkedStones.set(
        newValue,
        (blinkedStones.get(newValue) ?? 0) + stoneAmount,
      );
    }
  }
  return blinkedStones;
}

export const solution: DaySolution = {
  fn: dayPart2,
  expectedSample: 65601038650482,
  expected: 244782991106220,
};
