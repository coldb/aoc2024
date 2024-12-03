const regex = /mul\(([0-9]{1,3}),([0-9]{1,3})\)/g;
export const day3A = async (textRows: string[]) => {
  const allMatches = textRows
    .map((row) => [...row.matchAll(regex)])
    .map((match) => {
      let sum = 0;

      for (const singleMul of match) {
        sum += parseInt(singleMul[1], 10) * parseInt(singleMul[2], 10);
      }
      return sum;
    });

  return allMatches.reduce((memo, item) => {
    return memo + item;
  }, 0);
};
