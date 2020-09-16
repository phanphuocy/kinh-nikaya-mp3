import { ADD_NEW_READING_SUTTA } from "../types";

const initialState = {
  read: {
    byIds: {},
    allIds: [],
  },
  reading: {
    byIds: {},
    allIds: [],
  },
};

const personalReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEW_READING_SUTTA:
      let indexOfSutta = state.reading.allIds.indexOf(action.payload.id);
      if (indexOfSutta <= -1) {
        return {
          ...state,
          reading: {
            ...state.reading,
            byIds: {
              ...state.reading.byIds,
              [action.payload.id]: { ...action.payload.sutta },
            },
            allIds: [action.payload.id, ...state.reading.allIds],
          },
        };
      } else {
        let newAllIds = state.reading.allIds
          .slice(0, indexOfSutta)
          .concat(state.reading.allIds.slice(indexOfSutta + 1));
        console.log(newAllIds);
        return {
          ...state,
          reading: {
            ...state.reading,
            byIds: {
              ...state.reading.byIds,
              [action.payload.id]: { ...action.payload.sutta },
            },
            allIds: [action.payload.id, ...newAllIds],
          },
        };
      }
    default:
      return state;
  }
};

export default personalReducer;
