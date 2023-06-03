const currentDate = new Date();
let year = currentDate.getFullYear();
let previousMonth = currentDate.getMonth();
if (previousMonth === 0) {
  previousMonth = 12;
  year--;
}

export const setPreviousDate = () => {
  previousMonth--;
  if (previousMonth <= 0) {
    previousMonth += 12;
    year--;
  }
};

export const getDate = () => {
  return { year, month: previousMonth };
};
