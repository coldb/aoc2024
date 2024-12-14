import { arrayToMultiMap } from "../lib/array.ts";
import { toInt } from "../lib/string.ts";
import type { DaySolution } from "../types.ts";

export const dayPart1 = (textRows: string[], dataName?: string) => {
  const areaWidth = dataName === "sample" ? 11 : 101;
  const areaHeight = dataName === "sample" ? 7 : 103;

  const seconds = 100;
  const newRobotPositions = textRows
    .map((row) => {
      const rowParts = row.split(" ");

      const positionParts = rowParts[0].split("=")[1].split(",").map(toInt);
      const velocityParts = rowParts[1].split("=")[1].split(",").map(toInt);

      return {
        pos: { x: positionParts[0], y: positionParts[1] },
        vel: { x: velocityParts[0], y: velocityParts[1] },
      };
    })
    .map((robotData) => {
      const xPos = (robotData.pos.x + seconds * robotData.vel.x) % areaWidth;
      const yPos = (robotData.pos.y + seconds * robotData.vel.y) % areaHeight;

      const xFinal = xPos < 0 ? areaWidth + xPos : xPos;
      const yFinal = yPos < 0 ? areaHeight + yPos : yPos;

      return `${xFinal}-${yFinal}`;
    });

  const robotsMap = arrayToMultiMap(newRobotPositions, (item) => item);

  const verticalMiddle = Math.floor(areaWidth / 2);
  const horizontalMiddle = Math.floor(areaHeight / 2);
  const quadrantTotals = [0, 0, 0, 0];
  for (let y = 0; y < areaHeight; y++) {
    for (let x = 0; x < areaWidth; x++) {
      const robotsInPosition = robotsMap.get(`${x}-${y}`)?.length ?? 0;

      if (x < verticalMiddle && y < horizontalMiddle) {
        quadrantTotals[0] += robotsInPosition;
      }
      if (x > verticalMiddle && y < horizontalMiddle) {
        quadrantTotals[1] += robotsInPosition;
      }
      if (x < verticalMiddle && y > horizontalMiddle) {
        quadrantTotals[2] += robotsInPosition;
      }
      if (x > verticalMiddle && y > horizontalMiddle) {
        quadrantTotals[3] += robotsInPosition;
      }
    }
  }

  return quadrantTotals
    .slice(1)
    .reduce((memo, item) => memo * item, quadrantTotals[0]);
};

export const solution: DaySolution = {
  fn: dayPart1,
  expectedSample: 12,
  expected: 226179492,
};
