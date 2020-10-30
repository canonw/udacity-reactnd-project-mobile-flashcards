import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { connect } from "react-redux";
import { Button, Icon, Input, ListItem } from "react-native-elements";

import { styles } from "../utils/styles";
import { handleAddCard } from "../actions";

function NewCardScreen({ dispatch, navigation, route, decks }) {
  const { deckId } = route.params;
  const deck = decks ? decks[deckId] : null;

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const onSubmit = (deckId) => {
    dispatch(handleAddCard(deckId, { question, answer }));

    //navigation.goBack();
    navigation.navigate("Deck", {
      deckId,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView enabled>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <ListItem bottomDivider>
              <Icon name="folder" type="font-awesome" />
              <ListItem.Content>
                <ListItem.Title>{deck ? deck.title : ""}</ListItem.Title>
                <ListItem.Subtitle>Create a new card to deck</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
            <Input
              autoFocus={true}
              placeholder="Enter Card Question"
              leftIcon={{ type: "font-awesome", name: "question-circle" }}
              value={question}
              onChangeText={(value) => setQuestion(value)}
            />
            <Input
              placeholder="Enter Card Answer"
              leftIcon={{ type: "font-awesome", name: "info-circle" }}
              value={answer}
              onChangeText={(value) => setAnswer(value)}
            />
            <View style={styles.buttonContainer}>
              <Button
                title="Submit"
                style={styles.button}
                disabled={
                  !(
                    question &&
                    question.trim().length > 0 &&
                    answer &&
                    answer.trim().length > 0
                  )
                }
                onPress={() => onSubmit(deck.id)}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const mapStateToProps = (decks) => {
  return { decks };
};

export default connect(mapStateToProps)(NewCardScreen);
