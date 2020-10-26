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
import { AppLoading } from "expo";
import { useTheme } from "@react-navigation/native";
import { fetchDecks } from "../utils/api";
import { receiveDecks } from "../actions/index";

function DeckListScreen({ dispatch, navigation, decks }) {
  const [isReady, setIsReady] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const { colors } = useTheme();

  useEffect(() => {
    fetchDecks()
      .then((d) => dispatch(receiveDecks(d)))
      .then(() => setIsReady(true));
  }, []);

  const Item = ({ item, onPress, colors }) => (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.item, { backgroundColor: colors.card }]}
    >
      <Text style={[styles.title, { color: colors.text }]}>
        {item.title} ({Object.keys(item.questions).length})
      </Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => {
    return (
      <Item
        item={item}
        onPress={() => {
          navigation.navigate("Deck", {
            deckId: item.id,
          });
        }}
        colors={colors}
      />
    );
  };

  const onAddDeck = () => {
    navigation.navigate("NewDeck", {});
  };

  return (
    <SafeAreaView style={styles.container}>
      {isReady ? (
        <View>
          <FlatList
            data={decks ? Object.values(decks) : []}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            extraData={selectedId}
          />
          <Button title="Add Deck" onPress={() => onAddDeck()} />
        </View>
      ) : (
        <AppLoading />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  row: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
});

function mapStateToProps(decks) {
  return {
    decks,
  };
}

export default connect(mapStateToProps)(DeckListScreen);
