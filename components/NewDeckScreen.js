import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { connect } from "react-redux";
import { Button, Input } from "react-native-elements";

import { styles } from "../utils/styles";
import { _createDeck } from "../utils/_decks";
import { handleNewDeck } from "../actions";

function NewDeckScreen({ dispatch, navigation }) {
  const [title, setTitle] = useState("");

  const onSubmit = () => {
    const deck = _createDeck({ title });
    dispatch(handleNewDeck(deck));

    navigation.navigate("Deck", {
      deckId: deck.id,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView enabled>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <Input
              autoFocus={true}
              placeholder="Enter Deck Title"
              leftIcon={{ type: "font-awesome", name: "folder" }}
              value={title}
              onChangeText={(value) => setTitle(value)}
            />
            <View style={styles.buttonContainer}>
              <Button
                title="Submit"
                style={styles.button}
                disabled={!title}
                onPress={() => onSubmit()}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function mapStateToProps(decks) {
  return {
    decks,
  };
}

export default connect(mapStateToProps)(NewDeckScreen);
