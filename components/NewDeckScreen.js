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

function NewDeckScreen({ dispatch, navigation, route }) {
  const { deck } = route.params;
  const { colors } = useTheme();

  const [name, setName] = useState("");

  const onAddDeck = () => {
    // TODO: Add Deck
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.card }]}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <KeyboardAvoidingView enabled>
          <View style={[styles.container, { backgroundColor: colors.card }]}>
            <TextInput
              autoFocus={true}
              style={[styles.title, { color: colors.text }]}
              placeholder="Enter Deck Name"
              value={name}
              onChangeText={(text) => setName(text)}
            />
            <Button title="Add Deck" onPress={() => onAddDeck()} />
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

// export default connect(mapStateToProps)(NewDeckScreen);
export default NewDeckScreen;
