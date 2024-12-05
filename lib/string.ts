export const toInt = (text: string) => parseInt(text, 10);

export const splitData = (data: string[], char: string = "") => {
  let batchNr = 0;
  const batches = new Map<number, string[]>();

  for (let i = 0; i < data.length; i++) {
    if (data[i] === char) {
      batchNr++;
      continue;
    }

    const currentData = batches.get(batchNr);

    if (currentData === undefined) {
      batches.set(batchNr, [data[i]]);
    } else {
      currentData.push(data[i]);
    }
  }

  return Array.from(batches.values());
};
