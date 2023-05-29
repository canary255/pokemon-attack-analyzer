import { OptionsType } from "../../types/options";

const boost: OptionsType[] = [];
for (let i = 0; i <= 6; i++) {
  if (i === 0) {
    boost.push({ name: "0", value: "0" });
  } else {
    boost.push(
      { name: `+${i}`, value: `+${i}` },
      { name: `-${i}`, value: `-${i}` }
    );
  }
}

boost.sort((a, b) => {
  if (+a.value < +b.value) {
    return 0;
  }
  return -1;
});

export { boost };
