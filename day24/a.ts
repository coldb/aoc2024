import { splitData, toInt } from "../lib/string.ts";
import type { DaySolution } from "../types.ts";

type Operartion = {
  i1: string;
  i2: string;
  outputKey: string;
  operation: "AND" | "XOR" | "OR";
};
export const dayPart1 = (textRows: string[]) => {
  const [initialValues, operationsStr] = splitData(textRows);

  const values = new Map<string, number>();
  const operations: {
    i1: string;
    i2: string;
    outputKey: string;
    operation: "AND" | "XOR" | "OR";
  }[] = operationsStr.map((operationStr) => {
    const [, i1, operation, i2, outputKey] =
      /^(.+?) (.+?) (.+?) -> (.+?)$/.exec(operationStr);

    return { i1, i2, outputKey, operation };
  });

  initialValues.forEach((valueStr) => {
    const [key, value] = valueStr.split(": ");
    values.set(key, toInt(value));
  });

  let count = 0;

  do {
    for (let i = operations.length - 1; i >= 0; i--) {
      const operation = operations[i];

      if (values.has(operation.i1) && values.has(operation.i2)) {
        operations.splice(i, 1);

        const i1Value = values.get(operation.i1);
        const i2Value = values.get(operation.i2);
        if (operation.operation === "AND") {
          values.set(operation.outputKey, i1Value === 1 && i1Value === i2Value ? 1 : 0);
        } else if (operation.operation === "OR") {
          values.set(
            operation.outputKey,
            i1Value === 0 && i2Value === 0 ? 0 : 1,
          );
        } else if (operation.operation === "XOR") {
          values.set(operation.outputKey, i1Value !== i2Value ? 1 : 0);
        }
      }
      // console.log(operation);
    }

    // console.log(operations, operations.length);
    // count++;
    // if (count > 3) {
    //   break;
    // }
  } while (operations.length > 0);
  console.log(Array.from(values.entries())
        .filter(([key]) => key.startsWith("z")).sort((a, b) => a[0].localeCompare(b[0])))

      console.log(Array.from(values.entries())
        .filter(([key]) => key.startsWith("z"))
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([, v]) => v)
        .reverse()
        .join(""))

  return (
    parseInt(
      Array.from(values.entries())
        .filter(([key]) => key.startsWith("z"))
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([, v]) => v)
        .reverse()
        .join(""),
       2),
  );
};

export const solution: DaySolution = {
  fn: dayPart1,
  expectedSample: 2024,
  expected: 53325321422566, // 54699814766890 to high
};
