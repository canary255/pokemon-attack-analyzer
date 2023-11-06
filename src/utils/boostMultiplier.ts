export const getBoostMultiplier = (boost: string) => {
  const numericBoost = Number(boost);
  if (numericBoost === -6) return 1 / 4;
  if (numericBoost === -5) return 2 / 7;
  if (numericBoost === -4) return 1 / 3;
  if (numericBoost === -3) return 2 / 5;
  if (numericBoost === -2) return 1 / 2;
  if (numericBoost === -1) return 2 / 3;
  if (numericBoost === 1) return 3 / 2;
  if (numericBoost === 2) return 2;
  if (numericBoost === 3) return 5 / 2;
  if (numericBoost === 4) return 3;
  if (numericBoost === 5) return 7 / 2;
  if (numericBoost === 6) return 4;
  return 1;
};
