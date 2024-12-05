import { splitData, toInt } from "../lib/string.ts";

export const day5A = (textRows: string[]) => {
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
    if (isCorrectlyOrdered(rulesMap, orderToCheck)) {
      sum += toInt(orderToCheck[Math.floor((orderToCheck.length - 1) / 2)]);
    }
  }
  return sum;
};

function isCorrectlyOrdered(
  rules: Map<string, string[]>,
  orderToCheck: string[],
  allowedItems?: string[],
  checkedItems: string[] = [],
) {
  if (orderToCheck.length === 0) {
    return true;
  }

  const currentPage = orderToCheck[0];
  const currentOrderRules = rules.get(currentPage) ?? [];

  for (const checkedPage of checkedItems) {
    if (currentOrderRules.includes(checkedPage)) {
      return false;
    }
  }

  if (allowedItems === undefined) {
    if (currentOrderRules === undefined) {
      return false;
    } else {
      return isCorrectlyOrdered(
        rules,
        orderToCheck.slice(1),
        currentOrderRules,
        [...checkedItems, currentPage],
      );
    }
  }

  if (allowedItems.includes(currentPage)) {
    return isCorrectlyOrdered(
      rules,
      orderToCheck.slice(1),
      [...allowedItems, ...currentOrderRules],
      [...checkedItems, currentPage],
    );
  }

  return false;
}
