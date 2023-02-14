const nature = [
  { name: "nature.adamant", value: "adamant" },
  { name: "nature.brave", value: "brave" },
  { name: "nature.naughty", value: "naughty" },
  { name: "nature.bold", value: "bold" },
  { name: "nature.relaxed", value: "relaxed" },
  { name: "nature.impish", value: "impish" },
  { name: "nature.lax", value: "lax" },
  { name: "nature.timid", value: "timid" },
  { name: "nature.hasty", value: "hasty" },
  { name: "nature.jolly", value: "jolly" },
  { name: "nature.naive", value: "naive" },
  { name: "nature.modest", value: "modest" },
  { name: "nature.mild", value: "mild" },
  { name: "nature.quiet", value: "quiet" },
  { name: "nature.rash", value: "rash" },
  { name: "nature.calm", value: "calm" },
  { name: "nature.gentle", value: "gentle" },
  { name: "nature.sassy", value: "sassy" },
  { name: "nature.careful", value: "careful" },
  { name: "nature.docile", value: "docile" },
  { name: "nature.hardy", value: "hardy" },
  { name: "nature.bashful", value: "bashful" },
  { name: "nature.quirky", value: "quirky" },
  { name: "nature.lonely", value: "lonely" },
  { name: "nature.serious", value: "serious" },
].sort((a, b) => {
  if (a.name < b.name) {
    return -1;
  }
  return 0;
});

export { nature };
