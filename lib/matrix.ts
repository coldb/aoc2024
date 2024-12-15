export function print(data: string[][]) {
  for (const row of data.map((row) => row.join(""))) {
    console.log(row);
  }
}
