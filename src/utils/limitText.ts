export const limitText = (title: string, limit: number = 12) => {
  if (title.length > limit) return title.slice(0, limit) + "...";
  return title;
};
