import { arrayToMultiMap } from "../lib/array.ts";

export const day8B = (textRows: string[]) => {
  const data = textRows.map((row) => row.split(""));

  const towers: { frequency: string; x: number; y: number }[] = [];
  for (let y = 0; y < data.length; y++) {
    for (let x = 0; x < data[0].length; x++) {
      const value = data[y][x];

      if (value !== ".") {
        towers.push({ frequency: value, x, y });
      }
    }
  }
  const frequencyMap = arrayToMultiMap(towers, ({ frequency }) => frequency);

  const uniqueAntinodes = new Set<string>();
  for (const frequencyTowers of frequencyMap.values()) {
    for (const antinode of createAntinodes(data, frequencyTowers).values()) {
      uniqueAntinodes.add(antinode);
    }
  }
  return uniqueAntinodes.size;
};

function createAntinodes(data: string[][], towers: { x: number; y: number }[]) {
  const antinodes = new Set<string>();
  for (let i = 0; i < towers.length; i++) {
    for (let j = 0; j < towers.length; j++) {
      if (i === j) {
        continue;
      }

      const modifierX = towers[i].x - towers[j].x;
      const modifierY = towers[i].y - towers[j].y;

      addAntinode(
        antinodes,
        data,
        towers[i].x,
        towers[i].y,
        modifierX * -1,
        modifierY * -1,
      );
    }
  }

  return antinodes;
}

function addAntinode(
  antinodes: Set<string>,
  data: string[][],
  pointX: number,
  pointY: number,
  modifierX: number,
  modifierY: number,
) {
  let antinodeX = pointX + modifierX;
  let antinodeY = pointY + modifierY;
  let count = 2;

  while (
    antinodeX >= 0 &&
    antinodeY >= 0 &&
    antinodeY < data.length &&
    antinodeX < data[0].length
  ) {
    antinodes.add(`${antinodeX}-${antinodeY}`);

    antinodeX = pointX + modifierX * count;
    antinodeY = pointY + modifierY * count;
    count++;
  }
}
