export const nameConverter = (name: string) => {
  if (
    name === "Tornadus" ||
    name === "Thundurus" ||
    name === "Landorus" ||
    name === "Enamorus"
  ) {
    return name + "-Incarnate";
  }
  if (name === "Urshifu") {
    return name + "-Single-Strike";
  }
  if (name === "Indeedee-F") {
    return "Indeedee-Female";
  }
  if (name === "Indeedee") {
    return "Indeedee-Male";
  }
  if (name === "Basculegion") {
    return "Basculegion-Male";
  }
  if (name === "Basculegion-F") {
    return "Basculegion-Female";
  }
  if (name === "Basculin") {
    return name + "-Blue-Striped";
  }
  if (name === "Mimikyu") {
    return name + "-Disguised";
  }
  if (
    name === "Tauros-Paldea-Combat" ||
    name === "Tauros-Paldea-Aqua" ||
    name === "Tauros-Paldea-Blaze"
  ) {
    return name + "-Breed";
  }
  if (name === "Lycanroc") {
    return name + "-Midday";
  }
  if (name === "Toxtricity") {
    return name + "-Amped";
  }
  if (name === "Eiscue") {
    return name + "-Ice";
  }
  if (name === "Oinkologne-F") {
    return "Oinkologne-Female";
  }
  if (name === "Oricorio") {
    return name + "-Baile";
  }
  if (name === "Oricorio-Pa'u") {
    return "Oricorio-Pau";
  }
  if (name === "Flabébé") {
    return "Flabebe";
  }
  if (name === "Morpeko") {
    return name + "-Full-Belly";
  }

  return name;
};
