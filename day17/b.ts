import { splitData, toInt } from "../lib/string.ts";
import type { DaySolution } from "../types.ts";

export const dayPart2 = (textRows: string[]) => {
  const [registersStr, programStr] = splitData(textRows);

  const registers = registersStr.map((register) =>
    toInt(register.split(": ")[1]),
  );

  const program = programStr[0].split(": ")[1].split(",").map(toInt);
  const expected = [...program];

  function tryRegA(value: number) {
    let regA = value;
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

    // console.log([regA, regB, regC], program);

    const output: number[] = [];
    while (pointer < program.length) {
      const opcode = program[pointer];
      const operand = program[pointer + 1];

      let jumped = false;
      // console.log(opcode);

      switch (opcode) {
        case 0: // adv
          regA = Math.floor(regA / Math.pow(2, comboOperand(operand)));
          break;
        case 1: // bxl
          regB = regB ^ operand;
          break;
        case 2: // bst
          regB = comboOperand(operand) % 8;
          break;
        case 3: // jnz
          if (regA === 0) {
            break;
          }
          pointer = operand;
          if (pointer % 2 === 1) {
            throw new Error("asdf");
          }
          jumped = true;
          break;
        case 4: // bxc
          regB = regB ^ regC;
          break;
        case 5: // out
          output.push(comboOperand(operand) % 8);

          if (output[output.length - 1] !== expected[output.length - 1]) {
            return undefined;
          }
          break;
        case 6: // bdv
          regB = Math.floor(regA / Math.pow(2, comboOperand(operand)));
          break;
        case 7: // bdv
          regC = Math.floor(regA / Math.pow(2, comboOperand(operand)));
          break;
      }

      // console.log([regA, regB, regC], program);

      if (jumped === false) {
        pointer += 2;
      }
    }

    if (JSON.stringify(expected) !== JSON.stringify(output)) {
      return undefined;
    }

    return value;
  }

  let counter = 1;
  let result = tryRegA(counter);

  console.log(result);

  while (result === undefined) {
    counter++;
    result = tryRegA(counter);
  }

  return result;
};

export const solution: DaySolution = {
  fn: dayPart2,
  expectedSample: "4,6,3,5,6,3,5,2,1,0",
  expected: "1,3,5,1,7,2,5,1,6",
};
