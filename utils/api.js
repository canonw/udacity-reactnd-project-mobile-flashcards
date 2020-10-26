import AsyncStorage from "@react-native-community/async-storage";
import { formatDecks, FLASHCARD_STORAGE_KEY } from "./_decks";

export function fetchDecks() {
  return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY).then(formatDecks);
}
