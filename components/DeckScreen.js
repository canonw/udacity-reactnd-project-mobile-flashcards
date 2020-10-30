import React from "react";
import { Alert, SafeAreaView, View } from "react-native";
import { connect } from "react-redux";
import { Button, Divider, ListItem, Icon } from "react-native-elements";

import { styles } from "../utils/styles";
import { handleDeleteDeck } from "../actions";

function DeckScreen({ dispatch, navigation, route, decks }) {
  const { deckId } = route.params;
  const deck = decks ? decks[deckId] : null;

  const onAddCard = (deckId) => {
    navigation.navigate("NewCard", { deckId: deckId });
  };

  const onStartQuiz = (deckId) => {
    navigation.navigate("Quiz", { deckId: deckId });
  };

  const onDeleteDeck = (deckId) => {
    Alert.alert(
      "Remove Deck",
      `Press OK to remove ${deck.title} from flashcards`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "OK",
          onPress: () => {
            dispatch(handleDeleteDeck(deckId));
            navigation.goBack();
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ListItem bottomDivider>
        <Icon name="folder" type="font-awesome" />
        <ListItem.Content>
          <ListItem.Title>{deck ? deck.title : ""}</ListItem.Title>
          <ListItem.Subtitle>
            Number of Cards: {deck ? Object.keys(deck.cards).length : 0}
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
      <View style={styles.buttonContainer}>
        <Button
          style={styles.button}
          title="Add Card"
          onPress={() => onAddCard(deckId)}
        />
        <Divider />
        <Button
          style={styles.button}
          title="Start Quiz"
          disabled={deck ? Object.keys(deck.cards).length <= 0 : false}
          onPress={() => onStartQuiz(deckId)}
        />
        <Divider />
        <Button
          style={styles.button}
          title="Delete Deck"
          onPress={() => onDeleteDeck(deck.id)}
        />
      </View>
    </SafeAreaView>
  );
}

const mapStateToProps = (decks) => {
  return { decks };
};

export default connect(mapStateToProps)(DeckScreen);
