import { splitData, toInt } from "../lib/string.ts";
import type { DaySolution } from "../types.ts";

function runProgram(programStr: string, registerA: number) {
  const program = programStr.split(",").map(toInt);
  let regA = registerA;
  let regB = 0;
  let regC = 0;
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
      // Needs arithmetic to work since number goes over 32bit
      regA = Math.floor(regA / Math.pow(2, comboOperand(operand)));
      // regA = regA >>> comboOperand(operand);
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
}

const options = [0, 1, 2, 3, 4, 5, 6, 7];
function solve(program: string, aRegister: number): number {
  for (const option of options) {
    const newA = aRegister * Math.pow(2, 3) + option;

    const result = runProgram(program, newA);

    if (result === program) {
      return newA;
    }

    if (program.endsWith(result)) {
      const solved = solve(program, newA);

      if (solved > -1) {
        return solved;
      }
    }
  }

  return -1;
}

export const dayPart2 = (textRows: string[]) => {
  const [_, programStr] = splitData(textRows);

  const program = programStr[0].split(": ")[1];

  return solve(program, 0);
  /*
   2, 4: b = a % 8
   1, 3: b = b ^ 3
   7, 5: c = a >>> b
   4, 7: b = b ^ c
   0, 3: a = a >>> 3
   1, 5: b = b ^ 5
   5, 5: out b % 8
   3, 0: if a !== 0 jump to 0
   */
};

export const solution: DaySolution = {
  fn: dayPart2,
  expectedSample: -1,
  expected: 236555997372013,
};
