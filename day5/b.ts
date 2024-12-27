import { arrayToMultiMap } from "../lib/array.ts";
import { splitData, toInt } from "../lib/string.ts";
import { isCorrectlyOrdered } from "./a.ts";

export const day5B = (textRows: string[]) => {
  const [rulesText, orderingText] = splitData(textRows);

  const rulesMap = arrayToMultiMap(
    rulesText.map((item) => item.split("|")),
    ([key]) => key,
    ([, value]) => value,
  );

  let sum = 0;
  for (let i = 0; i < orderingText.length; i++) {
    const orderToCheck = orderingText[i].split(",");

    if (!isCorrectlyOrdered(rulesMap, orderToCheck)) {
      const fixedOrdering = fixOrdering(rulesMap, orderToCheck);

      sum += toInt(fixedOrdering[Math.floor((fixedOrdering.length - 1) / 2)]);
    }
  }
  return sum;
};

function fixOrdering(rules: Map<string, string[]>, orderToCheck: string[]) {
  const itemsLeft = [...orderToCheck];
  const placedItems: string[] = [];

  for (let i = 0; i < orderToCheck.length; i++) {
    for (const itemToCheck of itemsLeft) {
      const itemToCheckRules = rules.get(itemToCheck) ?? [];

      if (
        itemsLeft.every(
          (item) => item === itemToCheck || itemToCheckRules.includes(item),
        )
      ) {
        placedItems.push(itemToCheck);

        itemsLeft.splice(itemsLeft.indexOf(itemToCheck), 1);
        break;
      }
    }
  }

  return placedItems;
}

export const solution: DaySolution = {
  fn: day5B,
  expectedSample: 123,
  expected: 4151,
};
