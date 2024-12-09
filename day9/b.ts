import { toInt } from "../lib/string.ts";

export const day9B = (textRows: string[]) => {
  const diskMap = textRows[0].split("").map(toInt);

  const spaces: { startIdx: number; length: number }[] = [];
  const data: { idx: number; value: number }[] = [];
  const dataParts: {
    length: number;
    values: { idx: number; value: number }[];
  }[] = [];

  let currentIdx = 0;
  let currentValue = 0;

  for (let i = 0; i < diskMap.length; i++) {
    const value = diskMap[i];

    // file
    if (i % 2 === 0) {
      if (value > 0) {
        const dataPart: dataParts["values"] = { length: value, values: [] };
        for (let j = 0; j < value; j++) {
          const singleData = { idx: currentIdx, value: currentValue };

          data.push(singleData);
          dataPart.values.push(singleData);
          currentIdx++;
        }
        dataParts.push(dataPart);
      }

      currentValue++;
    }
    // space
    else {
      if (value === 0) {
        continue;
      }

      spaces.push({ startIdx: currentIdx, length: value });
      currentIdx += value;
    }
  }

  for (let i = 0; i < dataParts.length; i++) {
    const currentDataPart = dataParts[dataParts.length - 1 - i];

    for (let j = 0; j < spaces.length; j++) {
      const space = spaces[j];

      if (currentDataPart.values[0].idx < space.startIdx) {
        break;
      }

      if (space.length >= currentDataPart.length) {
        for (let k = 0; k < currentDataPart.length; k++) {
          currentDataPart.values[k].idx = space.startIdx + k;
        }

        space.length -= currentDataPart.length;
        space.startIdx += currentDataPart.length;
        break;
      }
    }
  }

  const checksum = data.reduce((memo, item) => {
    return memo + item.idx * item.value;
  }, 0);

  return checksum;
};
