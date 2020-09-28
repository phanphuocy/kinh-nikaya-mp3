import collections from "../../database/collections.json";
import groups from "../../database/groups.json";
import suttas from "../../database/suttas.json";
import suttasText from "../../database/suttasText.json";
import tidyVietnamese from "../../helpers/tidyVietnamese";
import { FILTER_SUTTAS, CLEAR_FILTERED_SUTTAS } from "../types";

const initialState = {
  collections: collections,
  groups: groups,
  suttas: suttas,
  suttasText: suttasText,
  filteredSuttas: [],
  filteringTerm: "",
};

const systemReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILTER_SUTTAS:
      let term = action.payload.term;
      if (term.length <= 0) {
        return {
          ...state,
          filteredSuttas: [],
          filteringTerm: "",
        };
      }
      let regrex = new RegExp(term, "gi");
      let matchedIds = state.suttas.allIds.filter((id) => {
        let sutta = state.suttas.byIds[id];
        if (sutta.name && tidyVietnamese(sutta.name).match(regrex)) {
          return true;
        } else if (
          sutta.paliName &&
          tidyVietnamese(sutta.paliName).match(regrex)
        ) {
          return true;
        } else if (
          sutta.codeName &&
          tidyVietnamese(sutta.codeName).match(regrex)
        ) {
          return true;
        } else {
          return false;
        }
      });
      return {
        ...state,
        filteredSuttas: matchedIds.map((id) => state.suttas.byIds[id]),
        filteringTerm: term,
      };
    case CLEAR_FILTERED_SUTTAS:
      return state;
    default:
      return state;
  }
};

export default systemReducer;
