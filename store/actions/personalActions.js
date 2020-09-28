import { ADD_NEW_READING_SUTTA } from "../types";

const sanitizeSuttaForReadingList = (sutta, position, offset) => {
  return {
    name: sutta.name,
    paliName: sutta.paliName,
    slug: sutta.slug,
    codeName: sutta.codeName,
    position: position,
    offset: offset,
    timestamp: Date.now(),
  };
};

export const addNewReadingSutta = (id, sutta, position, offset) => {
  //   console.log("ID", id);
  //   console.log("SUTTA", sutta);
  //   console.log("POSITION", position);
  return {
    type: ADD_NEW_READING_SUTTA,
    payload: {
      id: id,
      sutta: sanitizeSuttaForReadingList(sutta, position, offset),
    },
  };
};
