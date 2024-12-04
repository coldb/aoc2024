function getText(
  data: string[][],
  cordinate: { x: number; y: number },
  modifiers: { x: number; y: number },
) {
  const text: string[] = [];

  for (let i = 0; i < 4; i++) {
    const x = cordinate.x + modifiers.x * i;
    const y = cordinate.y + modifiers.y * i;
    if (x < 0 || y < 0) {
      break;
    }
    const row = data[y];
    if (row === undefined || row[x] === undefined) {
      break;
    }
    text.push(row[x]);
  }

  return text.join("");
}
const modifiers = [
  { x: 0, y: -1 }, // Up
  { x: 1, y: 0 }, // Right
  { x: 0, y: 1 }, // Down
  { x: -1, y: 0 }, // Left
  { x: 1, y: -1 }, // Up Right
  { x: 1, y: 1 }, // Down Right
  { x: -1, y: 1 }, // Down Left
  { x: -1, y: -1 }, // Up Left
];
export const day4A = (textRows: string[]) => {
  const data = textRows.map((row) => row.split(""));

  // console.log(data);
  const width = data[0].length;
  const height = data.length;
  let total = 0;

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const letter = data[y][x];

      if (letter !== "X") {
        continue;
      }

      for (const modifier of modifiers) {
        if (getText(data, { x, y }, modifier) === "XMAS") {
          total++;
        }
      }
    }
  }
  return total;
};
