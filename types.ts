export type DaySolution = {
  fn: (data: string[], dataName?: string) => string | number;
  expected: string | number;
  expectedSample: string | number;
};
