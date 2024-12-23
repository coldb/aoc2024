import { splitData, toInt } from "../lib/string.ts";
import type { DaySolution } from "../types.ts";

export const dayPart1 = (textRows: string[]) => {
  const [registersStr, programStr] = splitData(textRows);

  const registers = registersStr.map((register) =>
    toInt(register.split(": ")[1]),
  );

  const program = programStr[0].split(": ")[1].split(",").map(toInt);

  let regA = registers[0];
  let regB = registers[1];
  let regC = registers[2];
  let pointer = 0;

  function comboOperand(value: number) {
    switch (value) {
      case 7:
        throw new Error("INVALID OPERAND");

      case 6:
        return regC;
      case 5:
        return regB;
      case 4:
        return regA;
    }

    return value;
  }

  const output: number[] = [];
  while (pointer < program.length) {
    const opcode = program[pointer];
    const operand = program[pointer + 1];

    // adv
    if (opcode === 0) {
      regA = regA >>> comboOperand(operand);
    }
    // bxl
    else if (opcode === 1) {
      regB = regB ^ operand;
    }
    // bst
    else if (opcode === 2) {
      regB = comboOperand(operand) % 8;
    }
    // jnz
    else if (opcode === 3) {
      if (regA === 0) {
        break;
      }
      pointer = operand;
      continue;
    }
    // bxc
    else if (opcode === 4) {
      regB = regB ^ regC;
    }
    // out
    else if (opcode === 5) {
      output.push(comboOperand(operand) % 8);
    }
    // bdv
    else if (opcode === 6) {
      regB = regA >>> comboOperand(operand);
    }
    // bdv
    else if (opcode === 7) {
      regC = regA >>> comboOperand(operand);
    }

    pointer += 2;
  }

  return output.join(",");
};

export const solution: DaySolution = {
  fn: dayPart1,
  expectedSample: "4,6,3,5,6,3,5,2,1,0",
  expected: "1,3,5,1,7,2,5,1,6",
};
