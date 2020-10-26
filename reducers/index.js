import { RECEIVE_DECKS } from "../actions/index";

function decks(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks,
      };
    // case ADD_DECK:
    //   return {
    //     ...state,
    //     ...action.deck,
    //   };
    default:
      return state;
  }
}

export default decks;
