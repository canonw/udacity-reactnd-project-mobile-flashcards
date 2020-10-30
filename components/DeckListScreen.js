import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import { connect } from "react-redux";
import { AppLoading } from "expo";
import { Button, Icon, ListItem, Text } from "react-native-elements";
import { fetchDecks } from "../utils/api";
import { styles } from "../utils/styles";
import { receiveDecks } from "../actions/index";

function DeckListScreen({ dispatch, navigation, decks }) {
  const [isReady, setIsReady] = useState(false);
  const numberOfDecks = decks ? Object.values(decks).length : 0;

  useEffect(() => {
    fetchDecks()
      .then((d) => dispatch(receiveDecks(d)))
      .then(() => setIsReady(true));
  }, []);

  const renderItem = ({ item }) => {
    return (
      <ListItem
        key={item.id}
        onPress={() => {
          navigation.navigate("Deck", {
            deckId: item.id,
          });
        }}
        bottomDivider
      >
        <Icon name="folder" type="font-awesome" />
        <ListItem.Content>
          <ListItem.Title>{item.title}</ListItem.Title>
          <ListItem.Subtitle>
            Number of Cards:
            {item && item.cards ? Object.keys(item.cards).length : 0}
          </ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    );
  };

  const onAddDeck = () => {
    navigation.navigate("NewDeck", {});
  };

  return (
    <SafeAreaView style={styles.container}>
      {isReady ? (
        <View>
          {numberOfDecks > 0 ? (
            <FlatList
              data={decks ? Object.values(decks) : []}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
          ) : (
            <Text h3>No Deck Defined</Text>
          )}
          <View style={styles.buttonContainer}>
            <Button
              title="Add New Deck"
              style={styles.button}
              onPress={() => onAddDeck()}
            />
          </View>
        </View>
      ) : (
        <AppLoading />
      )}
    </SafeAreaView>
  );
}

function mapStateToProps(decks) {
  return {
    decks,
  };
}

export default connect(mapStateToProps)(DeckListScreen);
