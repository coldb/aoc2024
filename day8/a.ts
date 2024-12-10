import { arrayToMultiMap } from "../lib/array.ts";

export const day8A = (textRows: string[]) => {
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
        towers[i].x - modifierX,
        towers[i].y - modifierY,
      );
      addAntinode(
        antinodes,
        data,
        towers[i].x + modifierX,
        towers[i].y + modifierY,
      );

      antinodes.delete(`${towers[i].x}-${towers[i].y}`);
      antinodes.delete(`${towers[j].x}-${towers[j].y}`);
    }
  }

  return antinodes;
}

function addAntinode(
  antinodes: Set<string>,
  data: string[][],
  x: number,
  y: number,
) {
  if (x >= 0 && y >= 0 && y < data.length && x < data[0].length) {
    antinodes.add(`${x}-${y}`);
  }
}

export const solution: DaySolution = {
  fn: day8A,
  expectedSample: -1,
  expected: -1,
};
