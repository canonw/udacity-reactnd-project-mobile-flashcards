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

function QuizScreen({ dispatch, navigation, route }) {
  const { deckId } = route.params;
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.card }]}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <KeyboardAvoidingView enabled>
          <View style={[styles.container, { backgroundColor: colors.card }]}>
            <Text style={{ color: colors.text }}>Quiz Screen</Text>
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

// export default connect(mapStateToProps)(QuizScreen);
export default QuizScreen;
