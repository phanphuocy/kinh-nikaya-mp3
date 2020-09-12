import collections from "../../database/collections.json";
import groups from "../../database/groups.json";
import suttas from "../../database/suttas.json";

const initialState = {
  collections: collections,
  groups: groups,
  suttas: suttas,
};

const systemReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default systemReducer;
