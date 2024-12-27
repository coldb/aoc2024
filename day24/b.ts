import { splitData, toInt } from "../lib/string.ts";
import type { DaySolution } from "../types.ts";

type Operartion = {
  i1: string;
  i2: string;
  outputKey: string;
  operation: "AND" | "XOR" | "OR";
};

function solve(allOperations: Operartion[], startValues: Map<string, number>) {
  const operations = Array.from(allOperations);
  const values = new Map(startValues);

  let lastOperationsCount = operations.length;
  do {
    for (let i = operations.length - 1; i >= 0; i--) {
      const operation = operations[i];

      if (values.has(operation.i1) && values.has(operation.i2)) {
        operations.splice(i, 1);

        const i1Value = values.get(operation.i1);
        const i2Value = values.get(operation.i2);
        if (operation.operation === "AND") {
          values.set(
            operation.outputKey,
            i1Value === 1 && i1Value === i2Value ? 1 : 0,
          );
        } else if (operation.operation === "OR") {
          values.set(
            operation.outputKey,
            i1Value === 0 && i2Value === 0 ? 0 : 1,
          );
        } else if (operation.operation === "XOR") {
          values.set(operation.outputKey, i1Value !== i2Value ? 1 : 0);
        }
      }
    }

    if (lastOperationsCount === operations.length) {
      return undefined;
    }

    lastOperationsCount = operations.length;
  } while (operations.length > 0);

  return Array.from(values.entries())
    .filter(([key]) => key.startsWith("z"))
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([, v]) => v)
    .reverse();
}

type OperationMap = Map<
  string,
  {
    i1: string;
    i2: string;
    outputKey: string;
    operation: string;
  }
>;
export const dayPart2 = (textRows: string[]) => {
  const [, operationsStr] = splitData(textRows);

  const operations: OperationMap = new Map(
    operationsStr.map((operationStr) => {
      const result = /^(.+?) (.+?) (.+?) -> (.+?)$/.exec(operationStr);

      if (result !== null) {
        const [, i1, operation, i2, outputKey] = result;
        return [outputKey, { i1, i2, outputKey, operation }];
      }

      throw new Error("Problem mapping");
    }),
  );

  console.log(operations);

  console.log("----");

  const operationsList = [...operations.values()];

  console.log(operationsList);
  for (const _ of [1, 2, 3, 4]) {
    const currentProgress = firstBadBit(operations);
    let found = false;
    console.log(currentProgress);
    for (let i = 0; i < operationsList.length; i++) {
      for (let y = 0; y < operationsList.length; y++) {
        if (i === y) {
          continue;
        }

        const firstOperation = operationsList[i];
        const secondOperation = operationsList[y];

        const firstOutput = firstOperation.outputKey;
        const secondOutput = secondOperation.outputKey;

        firstOperation.outputKey = secondOutput;
        secondOperation.outputKey = firstOutput;

        // console.log("b", firstBadBit(operations));

        if (firstBadBit(operations) > currentProgress) {
          console.log(firstOutput, secondOutput);
          found = true;
          break;
        }

        firstOperation.outputKey = firstOutput;
        secondOperation.outputKey = secondOutput;
      }

      if (found) {
        break;
      }
    }
  }
  // for (let i = 0; i <= 45; i++) {
  //   if (!verifyOutput(operations, i)) {
  //     console.log(i);
  //     break;
  //   }
  // }
};

function firstBadBit(operations: OperationMap) {
  for (let i = 0; i <= 45; i++) {
    if (!verifyOutput(operations, i)) {
      return i;
    }
  }

  return -1;
}
function numberToWire(prefix: string, number: number) {
  return `${prefix}${number.toString().padStart(2, "0")}`;
}

function verifyXYParents(
  operation: { i1: string; i2: string },
  number: number,
) {
  const xOutputKey = numberToWire("x", number);
  const yOutputKey = numberToWire("y", number);
  return (
    (operation.i1 === xOutputKey && operation.i2 === yOutputKey) ||
    (operation.i1 === yOutputKey && operation.i2 === xOutputKey)
  );
}

function verifyOutput(operations: OperationMap, depth: number): boolean {
  const outputKey = numberToWire("z", depth);
  // console.log("veri", outputKey, depth);
  const operation = operations.get(outputKey);
  if (operation === undefined) {
    return false;
  }
  if (operation.operation !== "XOR") {
    return false;
  }

  if (depth === 0) {
    const parents = [operation.i1, operation.i2].toSorted();

    if (parents[0] === "x00" && parents[1] === "y00") {
      return true;
    }
  }

  return (
    (verifyIntermediateXor(operations, operation.i1, depth) &&
      verifyCarryBit(operations, operation.i2, depth)) ||
    (verifyIntermediateXor(operations, operation.i2, depth) &&
      verifyCarryBit(operations, operation.i1, depth))
  );
}

function verifyIntermediateXor(
  operations: OperationMap,
  outputKey: string,
  depth: number,
): boolean {
  // console.log("vx", outputKey, depth);

  const operation = operations.get(outputKey)!;

  return operation.operation === "XOR" && verifyXYParents(operation, depth);
}

function verifyCarryBit(
  operations: OperationMap,
  outputKey: string,
  depth: number,
): boolean {
  // console.log("vc", outputKey, depth);

  const operation = operations.get(outputKey);

  if (operation === undefined) {
    return false;
  }

  if (depth === 1) {
    return operation.operation === "AND" && verifyXYParents(operation, 0);
  }

  if (operation.operation !== "OR") {
    return false;
  }

  return (
    (verifyDirectCarry(operations, operation.i1, depth - 1) &&
      verifyRecarry(operations, operation.i2, depth - 1)) ||
    (verifyDirectCarry(operations, operation.i2, depth - 1) &&
      verifyRecarry(operations, operation.i1, depth - 1))
  );
}
function verifyDirectCarry(
  operations: OperationMap,
  outputKey: string,
  depth: number,
): boolean {
  // console.log("vd", outputKey, depth);

  const operation = operations.get(outputKey);

  if (operation === undefined) {
    return false;
  }

  return operation.operation === "AND" && verifyXYParents(operation, depth);
}

function verifyRecarry(
  operations: OperationMap,
  outputKey: string,
  depth: number,
): boolean {
  // console.log("vr", outputKey, depth);

  const operation = operations.get(outputKey)!;

  if (operation.operation !== "AND") {
    return false;
  }

  return (
    (verifyIntermediateXor(operations, operation.i1, depth) &&
      verifyCarryBit(operations, operation.i2, depth)) ||
    (verifyIntermediateXor(operations, operation.i2, depth) &&
      verifyCarryBit(operations, operation.i1, depth))
  );
}

function printOutputTree(
  operations: OperationMap,
  outputKey: string,
  level = 0,
) {
  if (outputKey.startsWith("x") || outputKey.startsWith("y")) {
    console.log(`${"  ".repeat(level)}(${outputKey})`);
    return;
  }
  const operation = operations.get(outputKey);
  if (operation.operation !== "AND") {
    return false;
  }
  console.log(
    `${"  ".repeat(level)}${operation.operation} (${operation.outputKey})`,
  );

  printOutputTree(operations, operation.i2, level + 1);
  printOutputTree(operations, operation.i1, level + 1);
}

function switchPair(
  operations: Operartion[],
  values: Map<string, number>,
  expected: string,
  bestProgress: number,
  level: number,
) {
  if (level === 0) {
    return false;
  }

  for (let i = 0; i < operations.length; i++) {
    for (let y = 0; y < operations.length; y++) {
      if (i === y) {
        continue;
      }

      const firstOperation = operations[i];
      const secondOperation = operations[y];

      const firstOutput = firstOperation.outputKey;
      const secondOutput = secondOperation.outputKey;
      firstOperation.outputKey = secondOutput;
      secondOperation.outputKey = firstOutput;

      const newProgress = progress(operations, values, expected);

      if (newProgress === -1) {
        console.log(firstOutput, secondOutput, level);
        return true;
      }

      if (newProgress > bestProgress) {
        if (
          switchPair(operations, values, expected, newProgress, level - 1) ===
          true
        ) {
          console.log(firstOutput, secondOutput, level);
          return true;
        }
      }

      firstOperation.outputKey = firstOutput;
      secondOperation.outputKey = secondOutput;
    }
  }

  return false;
}

export const solution: DaySolution = {
  fn: dayPart2,
  expectedSample: -1,
  expected: -1,
};
