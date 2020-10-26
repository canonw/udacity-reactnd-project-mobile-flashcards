import React, { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import { connect } from "react-redux";
import { useTheme } from "@react-navigation/native";

function DeckScreen({ dispatch, navigation, route, decks }) {
  const { deckId } = route.params;
  const { colors } = useTheme();

  const onAddCard = (deckId) => {
    navigation.navigate("NewCard", { deck: decks[deckId] });
  };

  const onStartQuiz = (id) => {
    navigation.navigate("Quiz", { deck: decks[deckId] });
  };

  const onDeleteDeck = () => {
    // TODO: Delete this.
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ color: colors.text }}>Deck View</Text>
      <Text style={{ color: colors.text }}>{decks[deckId].title}</Text>
      <Button title="Add Card" onPress={() => onAddCard(deckId)} />
      <Button title="Start Quiz" onPress={() => onStartQuiz(deckId)} />
      <Button title="Delete Deck" onPress={onDeleteDeck} />
    </View>
  );
}

function mapStateToProps(decks) {
  return {
    decks,
  };
}

export default connect(mapStateToProps)(DeckScreen);
