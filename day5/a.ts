import { arrayToMultiMap } from "../lib/array.ts";
import { splitData, toInt } from "../lib/string.ts";

export const day5A = (textRows: string[]) => {
  const [rulesText, orderingText] = splitData(textRows);

  const rulesMap = arrayToMultiMap(
    rulesText.map((item) => item.split("|")),
    ([key]) => key,
    ([, value]) => value,
  );

  let sum = 0;
  for (let i = 0; i < orderingText.length; i++) {
    const orderToCheck = orderingText[i].split(",");
    if (isCorrectlyOrdered(rulesMap, orderToCheck)) {
      sum += toInt(orderToCheck[Math.floor((orderToCheck.length - 1) / 2)]);
    }
  }
  return sum;
};

export function isCorrectlyOrdered(
  rules: Map<string, string[]>,
  orderToCheck: string[],
) {
  const checkedPages = [orderToCheck[0]];

  for (let i = 1; i < orderToCheck.length; i++) {
    const currentPage = orderToCheck[i];
    const currentPageRules = rules.get(currentPage) ?? [];

    for (const checkedPage of checkedPages) {
      if (currentPageRules.includes(checkedPage)) {
        return false;
      }
    }

    checkedPages.push(currentPage);
  }

  return true;
}

export const solution: DaySolution = {
  fn: day5A,
  expectedSample: 143,
  expected: 7024,
};
