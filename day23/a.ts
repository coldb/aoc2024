import type { DaySolution } from "../types.ts";

type Computer = {
  name: string;
  connectedTo: Set<string>;
};

export const dayPart1 = (textRows: string[]) => {
  const connections = textRows.map((row) => row.split("-"));
  const setsOfThree = new Set<string>();

  const computers = new Map<string, Computer>();

  for (const connection of connections) {
    const [firstName, secondName] = connection;

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

  for (const computer of computers.values()) {
    const computerName = computer.name;
    const connectedTo = Array.from(computer.connectedTo);

    for (let i = 0; i < connectedTo.length; i++) {
      for (let j = 0; j < connectedTo.length; j++) {
        if (i === j) {
          continue;
        }
        const firstRelationName = connectedTo[i];
        const secondRelationName = connectedTo[j];

        if (
          computers
            .get(firstRelationName)
            ?.connectedTo.has(secondRelationName) &&
          [computerName, firstRelationName, secondRelationName].some((name) =>
            name.startsWith("t"),
          )
        ) {
          setsOfThree.add(
            [computerName, firstRelationName, secondRelationName]
              .toSorted()
              .join(","),
          );
        }
      }
    }
  }

  return setsOfThree.size;
};

export const solution: DaySolution = {
  fn: dayPart1,
  expectedSample: 7,
  expected: 1368,
};
