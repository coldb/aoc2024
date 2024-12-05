import { splitData, toInt } from "../lib/string.ts";
import { isCorrectlyOrdered } from "./a.ts";

export const day5B = (textRows: string[]) => {
  const [rulesText, orderingText] = splitData(textRows);

  const rulesMap = new Map<string, string[]>();

  for (let i = 0; i < rulesText.length; i++) {
    const [before, after] = rulesText[i].split("|");
    const existingRules = rulesMap.get(before);

    if (existingRules === undefined) {
      rulesMap.set(before, [after]);
    } else {
      existingRules.push(after);
    }
  }

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

function fixOrdering(
  rules: Map<string, string[]>,
  orderToCheck: string[],
  level: number = 0,
) {
  if (level > 1000) {
    throw new Error("To much recursion");
  }

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
