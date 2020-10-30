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

import { handleNewDeck } from "../actions";
import { styles } from "../utils/styles";

function NewDeckScreen({ dispatch, navigation }) {
  const [title, setTitle] = useState("");

  const onSubmit = () => {
    dispatch(handleNewDeck({ title }));

    navigation.goBack();
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
