import AsyncStorage from "@react-native-community/async-storage";

export const FLASHCARD_STORAGE_KEY = "MOBILE_FLASHCARDS:STORAGE_KEY";

let seedDeckData = {
  "4a01204bf7e00e21a32b8184": {
    id: "4a01204bf7e00e21a32b8184",
    title: "Adding Number",
    questions: {
      "036e4c0c4221f6a3882100a0": {
        id: "036e4c0c4221f6a3882100a0",
        question: "1+1",
        answer: "2",
      },
      "3bc993dbcfea27162be90cde": {
        id: "3bc993dbcfea27162be90cde",
        question: "2+1",
        answer: "3",
      },
    },
  },
  "98832771be1757e8fa82a1ef": {
    id: "98832771be1757e8fa82a1ef",
    title: "Subtracting Number",
    questions: {
      "7154d6aa975f6812198403d4": {
        id: "7154d6aa975f6812198403d4",
        question: "7-1",
        answer: "6",
      },
      "0dc8058fda64f52a0bfc9515": {
        id: "0dc8058fda64f52a0bfc9515",
        question: "4-7",
        answer: "-3",
      },
    },
  },
};

function generateUID() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

export function formatDecks(results) {
  return results === null ? JSON.parse(JSON.stringify(seedDeckData)) : results;
}
