import AsyncStorage from "@react-native-community/async-storage";
import {
  FLASHCARD_STORAGE_KEY,
  _createSeedData,
  _createDeck,
  _createCard,
} from "./_decks";

export async function fetchDecks() {
  // Clear all items for development purpose.
  //await AsyncStorage.clear();

  const item = await AsyncStorage.getItem(FLASHCARD_STORAGE_KEY);

  if (item) {
    return JSON.parse(item);
  } else {
    const seedData = _createSeedData();

    await AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(seedData));

    return seedData;
  }
}

export async function saveDeckInStorage(title) {
  const deck = _createDeck(title);
  await AsyncStorage.mergeItem(
    FLASHCARD_STORAGE_KEY,
    JSON.stringify({ [deck.id]: deck })
  );

  return deck;
}

export async function removeDeckInStorage(deckId) {
  const item = await AsyncStorage.getItem(FLASHCARD_STORAGE_KEY);
  if (item) {
    const decks = JSON.parse(item);
    delete decks[deckId];

    await AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(decks));
    return deckId;
  }
  return {};
}

export async function addCardToDeckInStorage(deckId, cardContent) {
  const item = await AsyncStorage.getItem(FLASHCARD_STORAGE_KEY);
  if (item) {
    const decks = JSON.parse(item);
    const deck = decks[deckId];
    const card = _createCard(cardContent);
    deck.cards = {
      ...deck.cards,
      [card.id]: card,
    };

    await AsyncStorage.mergeItem(
      FLASHCARD_STORAGE_KEY,
      JSON.stringify({ [deck.id]: deck })
    );
    return card;
  }
  return {};
}
