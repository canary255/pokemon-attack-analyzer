export const numberOfHits = (move: string | number[]) => {
  if (move && typeof move === "object") return getArrayHits(move);
  if (move && typeof move === "number") return getArrayHits([1, move]);
  return [1];
};

const getArrayHits = (hits: number[]) => {
  const array = [];
  for (let i = hits[0]; i <= hits[1]; i++) {
    array.push(String(i));
  }
  return array;
};
