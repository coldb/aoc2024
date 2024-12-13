import { splitData, toInt } from "../lib/string.ts";
import type { DaySolution } from "../types.ts";

export const dayPart1 = (textRows: string[]) => {
  const data = splitData(textRows);

  const finalData: number | undefined = data
    .map((game) => {
      const buttonAParts = game[0].split(" ");
      const buttonBParts = game[1].split(" ");
      const goalParts = game[2].split(" ");

      const bestCost = { best: Number.MAX_VALUE };
      solve(
        {
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
        },
        bestCost,
        new Set<string>(),
      );

      return bestCost.best;
    })
    .filter((value) => value !== Number.MAX_VALUE)
    .reduce((memo, item) => memo + item, 0);

  return finalData;
};

type Game = {
  buttonA: { x: number; y: number };
  buttonB: { x: number; y: number };
  goal: { x: number; y: number };
};

function solve(
  game: Game,
  bestCost: { best: number },
  calculated: Set<string>,
  aPressed: number = 0,
  bPressed: number = 0,
) {
  const currentCost = aPressed * 3 + bPressed;

  if (calculated.has(`${aPressed}-${bPressed}`)) {
    return true;
  }

  calculated.add(`${aPressed}-${bPressed}`);

  if (currentCost > bestCost.best) {
    // return Number.MAX_VALUE;
    return true;
  }

  const xSum = aPressed * game.buttonA.x + bPressed * game.buttonB.x;
  const ySum = aPressed * game.buttonA.y + bPressed * game.buttonB.y;

  if (game.goal.x === xSum && game.goal.y === ySum) {
    bestCost.best = Math.min(currentCost, bestCost.best);
    // return aPressed * 3 + bPressed;
    return true;
  }

  if (xSum >= game.goal.x || ySum >= game.goal.y) {
    // return Number.MAX_VALUE;
    return true;
  }

  solve(game, bestCost, calculated, aPressed + 1, bPressed);
  solve(game, bestCost, calculated, aPressed, bPressed + 1);
}

export const solution: DaySolution = {
  fn: dayPart1,
  expectedSample: 480,
  expected: 36571,
};
