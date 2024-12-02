export const readData = async (dayNr: number, data: string) => {
  const text = await Deno.readTextFile(
    `./day${dayNr}/data${data !== "" ? "-" + data : ""}.txt`,
  );

  return text.split("\n").filter((row) => row.trim() !== "");
};
