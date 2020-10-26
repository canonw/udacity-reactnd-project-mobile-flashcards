import React, { useEffect, useState } from "react";
import {
  Button,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Text,
  TextInput,
  View,
} from "react-native";
import { connect } from "react-redux";
import { useTheme } from "@react-navigation/native";

function NewCardScreen({ dispatch, navigation, route }) {
  const { deck } = route.params;
  const { colors } = useTheme();

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const onAddCard = (deckId) => {
    // TODO: Add Card
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.card }]}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View>
          <Text style={{ color: colors.text }}>{deck.id}</Text>
          <Text style={{ color: colors.text }}>{deck.title}</Text>
        </View>
        <KeyboardAvoidingView enabled>
          <View style={[styles.container, { backgroundColor: colors.card }]}>
            <TextInput
              autoFocus={true}
              style={[styles.title, { color: colors.text }]}
              placeholder="Enter Question"
              value={question}
              onChangeText={(text) => setQuestion(text)}
            />
            <TextInput
              style={{ color: colors.text }}
              placeholder="Enter Answer"
              value={answer}
              onChangeText={(text) => setAnswer(text)}
            />
            <Button title="Add Card" onPress={() => onAddCard(deck.Id)} />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleStyle: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  textInputStyle: {
    flexDirection: "row",
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
});

// function mapStateToProps(decks) {
//   return {
//     decks,
//   };
// }

// export default connect(mapStateToProps)(NewCardScreen);
export default NewCardScreen;
