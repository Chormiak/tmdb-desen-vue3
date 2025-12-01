const keywordGroups = {
  default: {
    name: "Zumbis gerais",
    ids: [12377, 360877, 360949, 362494, 325470, 325469, 356202],
  },
  options: {
    apocalypse: {
      name: "Apocalipse",
      ids: [186565, 356202, 9744],
    },
    infection: {
      name: "Infecção / Vírus",
      ids: [188957, 14675, 4884, 9744],
    },
    undead: {
      name: "Mortos-vivos",
      ids: [10327, 362495],
    },
    animals: {
      name: "Animais zumbis",
      ids: [9925, 310175, 355493],
    },
    science: {
      name: "Ciência / Laboratório",
      ids: [312469, 188957, 14675, 4884],
    },
    necromancy: {
      name: "Magia / Necromancia",
      ids: [321509, 2343, 249692, 254356, 195269],
    },
  },
} as const;

export default keywordGroups;