import { splitData } from "../lib/string.ts";
import type { DaySolution } from "../types.ts";

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

  const outputs: string[] = [];
  for (const _ of [1, 2, 3, 4]) {
    const currentProgress = firstBadBit(operations);
    let found = false;

    for (const firstOperation of operations.values()) {
      for (const secondOperation of operations.values()) {
        if (firstOperation.outputKey === secondOperation.outputKey) {
          continue;
        }

        const firstOutput = firstOperation.outputKey;
        const secondOutput = secondOperation.outputKey;

        firstOperation.outputKey = secondOutput;
        secondOperation.outputKey = firstOutput;

        operations.set(secondOutput, firstOperation);
        operations.set(firstOutput, secondOperation);

        if (firstBadBit(operations) > currentProgress) {
          outputs.push(firstOutput);
          outputs.push(secondOutput);
          found = true;
          break;
        }

        operations.set(firstOutput, firstOperation);
        operations.set(secondOutput, secondOperation);

        firstOperation.outputKey = firstOutput;
        secondOperation.outputKey = secondOutput;
      }

      if (found) {
        break;
      }
    }
  }

  return outputs.toSorted().join(",");
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
  // console.log("intermediateXor", outputKey, depth);

  const operation = operations.get(outputKey);

  if (operation === undefined) {
    return false;
  }

  return operation.operation === "XOR" && verifyXYParents(operation, depth);
}

function verifyCarryBit(
  operations: OperationMap,
  outputKey: string,
  depth: number,
): boolean {
  // console.log("carryBit", outputKey, depth);

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
  // console.log("directCarry", outputKey, depth);

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
  // console.log("recarry", outputKey, depth);

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
  const operation = operations.get(outputKey)!;

  if (operation.operation !== "AND") {
    return false;
  }

  console.log(
    `${"  ".repeat(level)}${operation.operation} (${operation.outputKey})`,
  );

  printOutputTree(operations, operation.i2, level + 1);
  printOutputTree(operations, operation.i1, level + 1);
}

export const solution: DaySolution = {
  fn: dayPart2,
  expectedSample: -1,
  expected: "fkb,nnr,rdn,rqf,rrn,z16,z31,z37",
};
