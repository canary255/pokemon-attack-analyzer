enum NatureNames {
  ADAMANT = "adamant",
  BRAVE = "brave",
  NAUGHTY = "naughty",
  LONELY = "lonely",
  BOLD = "bold",
  TIMID = "timid",
  MODEST = "modest",
  CALM = "calm",
  MILD = "mild",
  RASH = "rash",
  QUIET = "quiet",
  IMPISH = "impish",
  JOLLY = "jolly",
  CAREFUL = "careful",
  HASTY = "hasty",
  NAIVE = "naive",
  RELAXED = "relaxed",
  SASSY = "sassy",
}

export const getPhysicalNatureMultiplier = (nature: string) => {
  switch (nature?.toLowerCase()) {
    case NatureNames.ADAMANT:
    case NatureNames.BRAVE:
    case NatureNames.NAUGHTY:
    case NatureNames.LONELY:
      return 1.1;
    case NatureNames.BOLD:
    case NatureNames.TIMID:
    case NatureNames.MODEST:
    case NatureNames.CALM:
      return 0.9;
    default:
      return 1;
  }
};

export const getSpecialNatureMultiplier = (nature: string) => {
  switch (nature?.toLowerCase()) {
    case NatureNames.MODEST:
    case NatureNames.QUIET:
    case NatureNames.MILD:
    case NatureNames.RASH:
      return 1.1;
    case NatureNames.JOLLY:
    case NatureNames.ADAMANT:
    case NatureNames.IMPISH:
    case NatureNames.CAREFUL:
      return 0.9;
    default:
      return 1;
  }
};

export const getSpeedNatureMultiplier = (nature: string) => {
  switch (nature?.toLowerCase()) {
    case NatureNames.TIMID:
    case NatureNames.HASTY:
    case NatureNames.JOLLY:
    case NatureNames.NAIVE:
      return 1.1;
    case NatureNames.BRAVE:
    case NatureNames.RELAXED:
    case NatureNames.QUIET:
    case NatureNames.SASSY:
      return 0.9;
    default:
      return 1;
  }
};

export const getNatureMultiplier = (evName: string, nature: string) => {
  if (evName === "evAtk") {
    return getPhysicalNatureMultiplier(nature);
  }

  if (evName === "evSpa") {
    return getSpecialNatureMultiplier(nature);
  }

  return getSpeedNatureMultiplier(nature);
};
