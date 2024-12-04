function getText(data: string[][], cordinate: { x: number; y: number }) {
  const text: string[] = [];

  text.push(data[cordinate.y - 1][cordinate.x - 1]);
  text.push(data[cordinate.y - 1][cordinate.x + 1]);
  text.push(data[cordinate.y + 1][cordinate.x + 1]);
  text.push(data[cordinate.y + 1][cordinate.x - 1]);

  return text.join("");
}

const validTexts = ["MSSM", "MMSS", "SMMS", "SSMM"];
export const day4B = (textRows: string[]) => {
  const data = textRows.map((row) => row.split(""));

  const width = data[0].length;
  const height = data.length;
  let total = 0;

  for (let x = 1; x < width - 1; x++) {
    for (let y = 1; y < height - 1; y++) {
      const letter = data[y][x];

      if (letter !== "A") {
        continue;
      }

      if (validTexts.includes(getText(data, { x, y }))) {
        total++;
      }
    }
  }
  return total;
};
