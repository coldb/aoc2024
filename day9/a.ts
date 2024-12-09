import { toInt } from "../lib/string.ts";

export const day9A = (textRows: string[]) => {
  const diskMap = textRows[0].split("").map(toInt);

  const spacesIdx: number[] = [];
  const data: { idx: number; value: number }[] = [];
  let currentIdx = 0;
  let currentValue = 0;

  for (let i = 0; i < diskMap.length; i++) {
    const value = diskMap[i];

    // file
    if (i % 2 === 0) {
      for (let j = 0; j < value; j++) {
        data.push({ idx: currentIdx, value: currentValue });
        currentIdx++;
      }

      currentValue++;
    }
    // space
    else {
      for (let j = 0; j < value; j++) {
        spacesIdx.push(currentIdx);
        currentIdx++;
      }
    }
  }

  for (let i = 0; i < spacesIdx.length; i++) {
    const lastData = data[data.length - 1 - i];
    const nextSpaceIdx = spacesIdx[i];

    if (nextSpaceIdx > lastData.idx) {
      break;
    }
    lastData.idx = spacesIdx[i];
  }

  const checksum = data.reduce((memo, item) => {
    return memo + item.idx * item.value;
  }, 0);

  return checksum;
};
