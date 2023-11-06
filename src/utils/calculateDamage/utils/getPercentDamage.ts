export const getPercentDamage = (num: number, maxHP: number) => {
  const percent = (num / maxHP) * 100 ?? 0;
  return percent;
};
