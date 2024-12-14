import { toInt } from "../lib/string.ts";
import type { DaySolution } from "../types.ts";

const areaWidth = 101;
const areaHeight = 103;

type RobotData = {
  pos: { x: number; y: number };
  vel: { x: number; y: number };
};

export const dayPart2 = (textRows: string[]) => {
  const robotsData: RobotData[] = textRows.map((row) => {
    const rowParts = row.split(" ");

    const positionParts = rowParts[0].split("=")[1].split(",").map(toInt);
    const velocityParts = rowParts[1].split("=")[1].split(",").map(toInt);

    return {
      pos: { x: positionParts[0], y: positionParts[1] },
      vel: { x: velocityParts[0], y: velocityParts[1] },
    };
  });

  for (let i = 1; i < 10000000; i++) {
    if (areAllRobotsAlone(robotsData, i)) {
      return i;
    }
  }

  return -1;
};

function areAllRobotsAlone(robots: RobotData[], seconds: number) {
  const positons = new Set<string>();

  for (const robotData of robots) {
    const xPos = (robotData.pos.x + seconds * robotData.vel.x) % areaWidth;
    const yPos = (robotData.pos.y + seconds * robotData.vel.y) % areaHeight;

    const xFinal = xPos < 0 ? areaWidth + xPos : xPos;
    const yFinal = yPos < 0 ? areaHeight + yPos : yPos;

    if (positons.has(`${xFinal}-${yFinal}`)) {
      return false;
    }

    positons.add(`${xFinal}-${yFinal}`);
  }

  return true;
}

export const solution: DaySolution = {
  fn: dayPart2,
  expectedSample: -1,
  expected: 7502,
};
