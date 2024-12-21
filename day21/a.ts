import { toInt } from "../lib/string.ts";
import type { DaySolution } from "../types.ts";

const movementPadKeys = new Map<string, NumberPadKey>([
  [
    "<",
    {
      symbol: "<",
      adjecent: [{ symbol: "v", direction: ">" }],
    },
  ],
  [
    "v",
    {
      symbol: "v",
      adjecent: [
        { symbol: "<", direction: "<" },
        { symbol: ">", direction: ">" },
        { symbol: "^", direction: "^" },
      ],
    },
  ],
  [
    ">",
    {
      symbol: ">",
      adjecent: [
        { symbol: "v", direction: "<" },
        { symbol: "A", direction: "^" },
      ],
    },
  ],
  [
    "^",
    {
      symbol: "^",
      adjecent: [
        { symbol: "v", direction: "v" },
        { symbol: "A", direction: ">" },
      ],
    },
  ],
  [
    "A",
    {
      symbol: "A",
      adjecent: [
        { symbol: "^", direction: "<" },
        { symbol: ">", direction: "v" },
      ],
    },
  ],
]);

const numberPadKeys = new Map<string, NumberPadKey>([
  [
    "0",
    {
      symbol: "0",
      adjecent: [
        { symbol: "A", direction: ">" },
        { symbol: "2", direction: "^" },
      ],
    },
  ],
  [
    "1",
    {
      symbol: "1",
      adjecent: [
        { symbol: "2", direction: ">" },
        { symbol: "4", direction: "^" },
      ],
    },
  ],
  [
    "2",
    {
      symbol: "2",
      adjecent: [
        { symbol: "0", direction: "v" },
        { symbol: "1", direction: "<" },
        { symbol: "3", direction: ">" },
        { symbol: "5", direction: "^" },
      ],
    },
  ],
  [
    "3",
    {
      symbol: "3",
      adjecent: [
        { symbol: "2", direction: "<" },
        { symbol: "6", direction: "^" },
        { symbol: "A", direction: "v" },
      ],
    },
  ],
  [
    "4",
    {
      symbol: "4",
      adjecent: [
        { symbol: "1", direction: "v" },
        { symbol: "5", direction: ">" },
        { symbol: "7", direction: "^" },
      ],
    },
  ],
  [
    "5",
    {
      symbol: "5",
      adjecent: [
        { symbol: "2", direction: "v" },
        { symbol: "4", direction: "<" },
        { symbol: "6", direction: ">" },
        { symbol: "8", direction: "^" },
      ],
    },
  ],
  [
    "6",
    {
      symbol: "6",
      adjecent: [
        { symbol: "3", direction: "v" },
        { symbol: "5", direction: "<" },
        { symbol: "9", direction: "^" },
      ],
    },
  ],
  [
    "7",
    {
      symbol: "7",
      adjecent: [
        { symbol: "4", direction: "v" },
        { symbol: "8", direction: ">" },
      ],
    },
  ],
  [
    "8",
    {
      symbol: "8",
      adjecent: [
        { symbol: "5", direction: "v" },
        { symbol: "7", direction: "<" },
        { symbol: "9", direction: ">" },
      ],
    },
  ],
  [
    "9",
    {
      symbol: "9",
      adjecent: [
        { symbol: "6", direction: "v" },
        { symbol: "8", direction: "<" },
      ],
    },
  ],
  [
    "A",
    {
      symbol: "A",
      adjecent: [
        { symbol: "0", direction: "<" },
        { symbol: "3", direction: "^" },
      ],
    },
  ],
]);

type NumberPadKey = {
  symbol: string;
  adjecent: { symbol: string; direction: "<" | "v" | ">" | "^" }[];
};

function findPossibleNumbersPath(
  targetCode: string[],
  currentKeySymbol: string,
  possiblePaths: Map<number, string[]>,
  minLength: { count: number },
  visited: string[] = [],
  movements: string[] = [],
) {
  if (minLength.count < movements.length) {
    return;
  }

  if (targetCode.length === 0) {
    const path = movements.join("");
    const sameLengthPaths = possiblePaths.get(path.length);

    if (sameLengthPaths !== undefined) {
      sameLengthPaths.push(path);
    } else {
      possiblePaths.set(path.length, [path]);
    }

    minLength.count = Math.min(minLength.count, movements.length);
    return;
  }

  const target = targetCode[0];
  const keyDetails = numberPadKeys.get(currentKeySymbol)!;

  keyDetails.adjecent.forEach((adjecentKey) => {
    if (visited.includes(adjecentKey.symbol)) {
      return;
    }
    if (adjecentKey.symbol === target) {
      findPossibleNumbersPath(
        targetCode.slice(1),
        adjecentKey.symbol,
        possiblePaths,
        minLength,
        [],
        [...movements, adjecentKey.direction, "A"],
      );
    } else {
      findPossibleNumbersPath(
        targetCode,
        adjecentKey.symbol,
        possiblePaths,
        minLength,
        [...visited, currentKeySymbol],
        [...movements, adjecentKey.direction],
      );
    }
  });
}

function findPossibleMovementsPath(
  targetCode: string[],
  currentKeySymbol: string,
  possiblePaths: Map<number, string[]>,
  minLength: { count: number },
  visited: string[] = [],
  movements: string[] = [],
) {
  if (minLength.count < movements.length) {
    return;
  }

  if (targetCode.length === 0) {
    const path = movements.join("");
    const sameLengthPaths = possiblePaths.get(path.length);

    if (sameLengthPaths !== undefined) {
      sameLengthPaths.push(path);
    } else {
      possiblePaths.set(path.length, [path]);
    }

    minLength.count = Math.min(minLength.count, movements.length);
    return;
  }

  const target = targetCode[0];
  const keyDetails = movementPadKeys.get(currentKeySymbol)!;

  if (target === currentKeySymbol) {
    findPossibleMovementsPath(
      targetCode.slice(1),
      currentKeySymbol,
      possiblePaths,
      minLength,
      [],
      [...movements, "A"],
    );
  }
  keyDetails.adjecent.forEach((adjecentKey) => {
    if (visited.includes(adjecentKey.symbol)) {
      return;
    }
    if (adjecentKey.symbol === target) {
      findPossibleMovementsPath(
        targetCode.slice(1),
        adjecentKey.symbol,
        possiblePaths,
        minLength,
        [],
        [...movements, adjecentKey.direction, "A"],
      );
    } else {
      findPossibleMovementsPath(
        targetCode,
        adjecentKey.symbol,
        possiblePaths,
        minLength,
        [...visited, currentKeySymbol],
        [...movements, adjecentKey.direction],
      );
    }
  });
}

function addKeyPadLevel(combinations: string[]) {
  let shortestCodes = Number.MAX_VALUE;
  let shortestCombinations = new Set<string>();
  const minLength = { count: Number.MAX_VALUE };
  combinations.forEach((path) => {
    const possiblePaths = new Map<number, string[]>();

    findPossibleMovementsPath(path.split(""), "A", possiblePaths, minLength);

    if (minLength.count < shortestCodes) {
      shortestCombinations = new Set(possiblePaths.get(minLength.count));
      shortestCodes = minLength.count;
    } else if (minLength.count === shortestCodes) {
      possiblePaths.get(minLength.count)?.forEach((combination) => {
        shortestCombinations.add(combination);
      });
    }
  });

  return Array.from(shortestCombinations.values());
}

function calculatePaths(paths: string[]) {
  const cache = new Map<string, string[]>();

  let shortestPath = Number.MAX_VALUE;
  for (const path of paths) {
    const segments = path
      .split("A")
      .slice(0, -1)
      .map((segment) => `${segment}A`);

    let pathTotal = 0;
    for (const segment of segments) {
      pathTotal += calculateSegment(segment, cache, 2);
    }

    if (pathTotal < shortestPath) {
      shortestPath = pathTotal;
    }
  }

  return shortestPath;
}
function calculateSegment(
  segment: string,
  cache: Map<string, string[]>,
  level: number,
) {
  if (level === 0) {
    return segment.length;
  }

  const cachedSegment = cache.get(segment);
  let minLength = Number.MAX_VALUE;

  if (cachedSegment !== undefined) {
    for (const path of cachedSegment) {
      const segments = path
        .split("A")
        .slice(0, -1)
        .map((segment) => `${segment}A`);

      let pathLength = 0;
      for (const segment of segments) {
        pathLength += calculateSegment(segment, cache, level - 1);
      }

      if (pathLength < minLength) {
        minLength = pathLength;
      }
    }
  } else {
    const segmentNextLevel = addKeyPadLevel([segment]);
    cache.set(segment, segmentNextLevel);

    for (const path of segmentNextLevel) {
      const segments = path
        .split("A")
        .slice(0, -1)
        .map((segment) => `${segment}A`);

      let pathLength = 0;
      for (const segment of segments) {
        pathLength += calculateSegment(segment, cache, level - 1);
      }

      if (pathLength < minLength) {
        minLength = pathLength;
      }
    }
  }
  return minLength;
}
export const dayPart1 = (textRows: string[]) => {
  const codesToEnter = textRows.map((row) => row.split(""));

  let total = 0;
  codesToEnter.forEach((codeToEnter) => {
    const possiblePaths = new Map<number, string[]>();
    const minLength = { count: Number.MAX_VALUE };

    findPossibleNumbersPath(codeToEnter, "A", possiblePaths, minLength);
    const movements = possiblePaths.get(minLength.count)!;

    const minLength2 = calculatePaths(movements);
    const number = toInt(codeToEnter.slice(0, codeToEnter.length - 1).join(""));

    total += number * minLength2;
  });

  return total;
};

export const solution: DaySolution = {
  fn: dayPart1,
  expectedSample: 126384,
  expected: 182844,
};
