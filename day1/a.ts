export const day1A = (textRows: string[]) => {
  const list1: number[] = [];
  const list2: number[] = [];
  for (let i = 0; i < textRows.length; i++) {
    const splitRow = textRows[i].split("   ");
    list1.push(parseInt(splitRow[0], 10));
    list2.push(parseInt(splitRow[1], 10));
  }
  const sortedList1 = list1.sort();
  const sortedList2 = list2.sort();

  let sum = 0;
  for (let j = 0; j < sortedList1.length; j++) {
    sum += Math.abs(sortedList1[j] - sortedList2[j]);
  }

  return sum;
};
