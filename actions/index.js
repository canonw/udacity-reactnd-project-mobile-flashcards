import {
  saveDeckInStorage,
  removeDeckInStorage,
  addCardToDeckInStorage,
} from "../utils/api";

export const RECEIVE_DECKS = "RECEIVE_DECKS";
export const ADD_DECK = "ADD_DECK";
export const DELETE_DECK = "DELETE_DECK";
export const ADD_CARD_TO_DECK = "ADD_CARD_TO_DECK";

export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  };
}

export function saveDeckInRedux(deck) {
  return {
    type: ADD_DECK,
    deck,
  };
}

export const handleNewDeck = (title) => {
  return (dispatch) => {
    saveDeckInStorage(title).then((deck) => {
      dispatch(saveDeckInRedux(deck));
      return deck;
    });
  };
};

export function removeDeckInRedux(deckId) {
  return {
    type: DELETE_DECK,
    deckId,
  };
}

export const handleDeleteDeck = (deckId) => {
  return (dispatch) => {
    removeDeckInStorage(deckId).then((deckId) =>
      dispatch(removeDeckInRedux(deckId))
    );
  };
};

export function saveCardInDeckInRedux(deckId, card) {
  return {
    type: ADD_CARD_TO_DECK,
    deckId,
    card,
  };
}

export function addCardToDeckInRedux(deckId, card) {
  return {
    type: ADD_CARD_TO_DECK,
    deckId,
    card,
  };
}

export const handleAddCard = (deckId, card) => {
  return (dispatch) => {
    addCardToDeckInStorage(deckId, card).then((card) =>
      dispatch(addCardToDeckInRedux(deckId, card))
    );
  };
};
