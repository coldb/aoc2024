const regex = /(mul\((\d{1,3}),(\d{1,3})\))|(don't\(\))|(do\(\))/g;
export const day3B = async (textRows: string[]) => {
  let enabled = true;
  const allMatches = textRows
    .map((row) => [...row.matchAll(regex)])
    .map((match) => {
      let sum = 0;

      for (const singleMul of match) {
        if (singleMul[0] === "do()") {
          enabled = true;
        } else if (singleMul[0] === "don't()") {
          enabled = false;
        } else {
          if (enabled) {
            sum += parseInt(singleMul[2], 10) * parseInt(singleMul[3], 10);
          }
        }
      }
      return sum;
    });

  return allMatches.reduce((memo, item) => {
    return memo + item;
  }, 0);
};
