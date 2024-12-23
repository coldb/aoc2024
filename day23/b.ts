import {
  permutations as permutationsFn,
  powerSet,
} from "https://deno.land/x/combinatorics/mod.ts";
import type { DaySolution } from "../types.ts";

type Computer = {
  name: string;
  connectedTo: Set<string>;
};

export const dayPart2 = (textRows: string[]) => {
  const connections = textRows.map((row) => row.split("-"));

  const setsOfTwo = new Set<string>();
  const computers = new Map<string, Computer>();

  for (const connection of connections) {
    const [firstName, secondName] = connection;

    setsOfTwo.add(`${firstName}-${secondName}`);
    setsOfTwo.add(`${secondName}-${firstName}`);

    const firstComputer = computers.get(firstName);

    if (firstComputer !== undefined) {
      firstComputer.connectedTo.add(secondName);
    } else {
      computers.set(firstName, {
        name: firstName,
        connectedTo: new Set([secondName]),
      });
    }

    const secondComputer = computers.get(secondName);

    if (secondComputer !== undefined) {
      secondComputer.connectedTo.add(firstName);
    } else {
      computers.set(secondName, {
        name: secondName,
        connectedTo: new Set([firstName]),
      });
    }
  }

  let biggestLan = 0;
  let biggestLanComputers: string[] = [];

  for (const computer of computers.values()) {
    const connectedTo = Array.from(computer.connectedTo);
    connectedTo.push(computer.name);
    const permutations = powerSet(connectedTo);

    for (const permutation of permutations) {
      if (permutation.length > biggestLan) {
        const allCombinations = permutationsFn(permutation, 2);

        if (
          allCombinations.every(([first, second]) =>
            setsOfTwo.has(`${first}-${second}`),
          )
        ) {
          biggestLan = permutation.length;
          biggestLanComputers = permutation;
        }
      }
    }
  }

  return biggestLanComputers.toSorted().join(",");
};
export const solution: DaySolution = {
  fn: dayPart2,
  expectedSample: "co,de,ka,ta",
  expected: "dd,ig,il,im,kb,kr,pe,ti,tv,vr,we,xu,zi",
};
