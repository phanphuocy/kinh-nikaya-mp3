import { FILTER_SUTTAS, CLEAR_FILTERED_SUTTAS } from "../types";

export const filterSuttas = (term) => {
  return {
    type: FILTER_SUTTAS,
    payload: {
      term: term,
    },
  };
};

export const clearFilteredSutta = () => {
  return {
    type: CLEAR_FILTERED_SUTTAS,
  };
};
