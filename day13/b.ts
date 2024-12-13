import type { DaySolution } from "../types.ts";
import { parseGameData } from "./a.ts";

export const dayPart2 = (textRows: string[]) => {
  const finalData = parseGameData(textRows, 10000000000000).map((gameData) => {
    const buttonATimes =
      (gameData.buttonB.y * gameData.goal.x -
        gameData.buttonB.x * gameData.goal.y) /
      (gameData.buttonA.x * gameData.buttonB.y -
        gameData.buttonA.y * gameData.buttonB.x);
    const buttonBTimes =
      (-1 * gameData.buttonA.y * gameData.goal.x +
        gameData.buttonA.x * gameData.goal.y) /
      (gameData.buttonA.x * gameData.buttonB.y -
        gameData.buttonA.y * gameData.buttonB.x);

    if (
      Math.floor(buttonATimes) === buttonATimes &&
      Math.floor(buttonBTimes) === buttonBTimes
    ) {
      return buttonATimes * 3 + buttonBTimes;
    }

    return Number.MAX_VALUE;
  });
  return finalData
    .filter((value) => value !== Number.MAX_VALUE)
    .reduce((memo, item) => memo + item, 0);
};

type Game = {
  buttonA: { x: number; y: number };
  buttonB: { x: number; y: number };
  goal: { x: number; y: number };
};

export const solution: DaySolution = {
  fn: dayPart2,
  expectedSample: 875318608908,
  expected: 85527711500010,
};
