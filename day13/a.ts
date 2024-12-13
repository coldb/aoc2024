import { splitData, toInt } from "../lib/string.ts";
import type { DaySolution } from "../types.ts";

export const dayPart1 = (textRows: string[]) => {
  const data = splitData(textRows);

  const finalData = data.map((game) => {
    const buttonAParts = game[0].split(" ");
    const buttonBParts = game[1].split(" ");
    const goalParts = game[2].split(" ");

    const gameData: Game = {
      buttonA: {
        x: toInt(buttonAParts[2].substring(2, buttonAParts[2].length - 1)),
        y: toInt(buttonAParts[3].substring(2)),
      },
      buttonB: {
        x: toInt(buttonBParts[2].substring(2, buttonBParts[2].length - 1)),
        y: toInt(buttonBParts[3].substring(2)),
      },
      goal: {
        x: toInt(goalParts[1].substring(2, goalParts[1].length - 1)),
        y: toInt(goalParts[2].substring(2)),
      },
    };

    const buttonAMax = Math.min(
      Math.floor(gameData.goal.x / gameData.buttonA.x),
      Math.floor(gameData.goal.y / gameData.buttonA.y),
    );

    let lastButtonBAmount = 0;
    let bestPrice = Number.MAX_VALUE;
    for (let i = buttonAMax; i > 0; i--) {
      const surplussX = gameData.goal.x - i * gameData.buttonA.x;
      const surplussY = gameData.goal.y - i * gameData.buttonA.y;

      const buttonBAmount = Math.min(
        Math.floor(surplussX / gameData.buttonB.x),
        Math.floor(surplussY / gameData.buttonB.y),
      );

      if (buttonBAmount === lastButtonBAmount) {
        continue;
      }
      lastButtonBAmount = buttonBAmount;

      const currentPrice = i * 3 + buttonBAmount;

      if (currentPrice > bestPrice) {
        break;
      }

      const isXDivisible = surplussX % gameData.buttonB.x === 0;
      const isYDivisible = surplussY % gameData.buttonB.y === 0;

      const xTotal =
        i * gameData.buttonA.x + buttonBAmount * gameData.buttonB.x;
      const yTotal =
        i * gameData.buttonA.y + buttonBAmount * gameData.buttonB.y;
      if (
        isXDivisible &&
        isYDivisible &&
        xTotal === gameData.goal.x &&
        yTotal === gameData.goal.y
      ) {
        bestPrice = Math.min(currentPrice, bestPrice);
      }
    }

    return bestPrice;
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
  fn: dayPart1,
  expectedSample: 480,
  expected: 36571,
};
