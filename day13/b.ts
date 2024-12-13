import { splitData, toInt } from "../lib/string.ts";
import type { DaySolution } from "../types.ts";

export const dayPart2 = (textRows: string[]) => {
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
        x:
          10000000000000 +
          toInt(goalParts[1].substring(2, goalParts[1].length - 1)),
        y: 10000000000000 + toInt(goalParts[2].substring(2)),
        // x: toInt(goalParts[1].substring(2, goalParts[1].length - 1)),
        // y: toInt(goalParts[2].substring(2)),
      },
    };

    // console.log(gameData);
    const buttonAMax = Math.min(
      Math.floor(gameData.goal.x / gameData.buttonA.x),
      Math.floor(gameData.goal.y / gameData.buttonA.y),
    );

    // let lastButtonBAmount = 0;
    let bestPrice = Number.MAX_VALUE;

    console.log(gameData);

    const xSum = gameData.buttonA.x + gameData.buttonB.x;
    const ySum = gameData.buttonA.y + gameData.buttonB.y;

    const xMin = Math.floor(gameData.goal.x / xSum);
    const yMin = Math.floor(gameData.goal.y / xSum);

    const maxShared = Math.max(xMin, yMin);
    console.log(maxShared);

    for (let i = maxShared; i >= Math.max(0, maxShared - 10000000); i--) {
      const surplussX = gameData.goal.x - i * xSum;
      const surplussY = gameData.goal.y - i * ySum;

      if (
        surplussX % gameData.buttonB.x === 0 &&
        surplussY % gameData.buttonB.y === 0 &&
        surplussX / gameData.buttonB.x === surplussY / gameData.buttonB.y
      ) {
        // console.log(i, i + surplussX / gameData.buttonB.x);
        const buttonACount = i;
        const buttonBCount = i + surplussX / gameData.buttonB.x;

        const currentPrice = buttonACount * 3 + buttonBCount;

        if (currentPrice < bestPrice) {
          bestPrice = currentPrice;
        } else {
          break;
        }
      } else if (
        surplussX % gameData.buttonA.x === 0 &&
        surplussY % gameData.buttonA.y === 0 &&
        surplussX / gameData.buttonA.x === surplussY / gameData.buttonA.y
      ) {
        // console.log(i + surplussX / gameData.buttonA.x, i);
        const buttonACount = i + surplussX / gameData.buttonA.x;
        const buttonBCount = i;

        const currentPrice = buttonACount * 3 + buttonBCount;

        if (currentPrice < bestPrice) {
          bestPrice = currentPrice;
        } else {
          break;
        }
      }
    }
    // for (let i = 1; i <= 10; i++) {
    //   const surplussX = i * xSum;
    //   const surplussY = i * ySum;
    //
    //   console.log(
    //     i,
    //     surplussX % gameData.buttonA.x,
    //     surplussX % gameData.buttonB.y,
    //   );
    // }
    // for (let i = 0; i <= buttonAMax; i++) {
    //   const surplussX = gameData.goal.x - i * gameData.buttonA.x;
    //   const surplussY = gameData.goal.y - i * gameData.buttonA.y;
    //
    //   const buttonBAmount = Math.min(
    //     Math.floor(surplussX / gameData.buttonB.x),
    //     Math.floor(surplussY / gameData.buttonB.y),
    //   );
    //
    //   // console.log(i, lastButtonBAmount, buttonBAmount);
    //   // if (buttonBAmount === lastButtonBAmount) {
    //   //   continue;
    //   // }
    //   // lastButtonBAmount = buttonBAmount;
    //
    //   const currentPrice = i * 3 + buttonBAmount;
    //
    //   if (currentPrice > bestPrice) {
    //     break;
    //   }
    //
    //   const isXDivisible = surplussX % gameData.buttonB.x === 0;
    //   const isYDivisible = surplussY % gameData.buttonB.y === 0;
    //
    //   const xTotal =
    //     i * gameData.buttonA.x + buttonBAmount * gameData.buttonB.x;
    //   const yTotal =
    //     i * gameData.buttonA.y + buttonBAmount * gameData.buttonB.y;
    //   if (
    //     isXDivisible &&
    //     isYDivisible &&
    //     xTotal === gameData.goal.x &&
    //     yTotal === gameData.goal.y
    //   ) {
    //     bestPrice = Math.min(currentPrice, bestPrice);
    //   }
    // }
    // console.log(bestPrice);
    return bestPrice;
  });
  // console.log(finalData);
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
  expectedSample: 480,
  expected: 36571,
};
