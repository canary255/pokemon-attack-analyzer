export const getBoostMultiplier = (boost: string) => {
  const numericBoost = +boost;
  if (numericBoost === -6) return 0.25;
  if (numericBoost === -5) return 7 / 24;
  if (numericBoost === -4) return 8 / 24;
  if (numericBoost === -3) return 0.4;
  if (numericBoost === -2) return 0.5;
  if (numericBoost === -1) return 16 / 24;
  if (numericBoost === 1) return 1.5;
  if (numericBoost === 2) return 2;
  if (numericBoost === 3) return 2.5;
  if (numericBoost === 4) return 3;
  if (numericBoost === 5) return 3.5;
  if (numericBoost === 6) return 4;
  return 1;
};
