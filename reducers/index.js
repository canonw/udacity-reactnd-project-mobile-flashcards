import {
  RECEIVE_DECKS,
  ADD_DECK,
  DELETE_DECK,
  ADD_CARD_TO_DECK,
} from "../actions/index";

function decks(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks,
      };
    case ADD_DECK:
      return {
        ...state,
        [action.deck.id]: action.deck,
      };
    case DELETE_DECK:
      delete state[action.deckId];
      return {
        ...state,
      };
    case ADD_CARD_TO_DECK:
      return {
        ...state,
        [action.deckId]: {
          ...state[action.deckId],
          cards: {
            ...state[action.deckId].cards,
            [action.card.id]: action.card,
          },
        },
      };
    default:
      return state;
  }
}

export default decks;
