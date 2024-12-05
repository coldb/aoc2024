export const readData = async (dayNr: number, data: string) => {
  const text = await Deno.readTextFile(
    `./day${dayNr}/data${data !== "" ? "-" + data : ""}.txt`,
  );

  const rows = text.split("\n");

  if (rows[rows.length - 1].trim() === "") {
    return rows.slice(0, rows.length - 1);
  }

  return rows;
};
