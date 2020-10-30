import React, { useState, useEffect } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  View,
} from "react-native";
import { connect } from "react-redux";
import { Button, Divider, Icon, ListItem, Text } from "react-native-elements";

import { styles } from "../utils/styles";

const renderQuizPage = (
  deck,
  { cardIds, thisCardIndex, doShowAnswer },
  handleShowAnswer,
  handleCardReply
) => {
  const cardCount = cardIds ? cardIds.length : 0;
  const cardId =
    cardCount > 0 && cardIds.length > thisCardIndex
      ? cardIds[thisCardIndex]
      : null;
  const card = cardId && deck ? deck.cards[cardId] : null;
  const pendingCount = Math.max(0, cardCount - thisCardIndex - 1);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView false>
        <View>
          <ListItem bottomDivider>
            <Icon name="folder" type="font-awesome" />
            <ListItem.Content>
              <ListItem.Title>{deck ? deck.title : ""}</ListItem.Title>
              <ListItem.Subtitle>
                {cardCount} {cardCount > 1 ? "cards" : "card"} found.
              </ListItem.Subtitle>
              <ListItem.Subtitle>
                {pendingCount} {pendingCount > 1 ? "cards" : "card"} to go.
              </ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
          <Divider />
          {/* Question */}
          <ListItem bottomDivider>
            <Icon name="question-circle" type="font-awesome" />
            <ListItem.Content>
              <ListItem.Title>{card ? card.question : ""}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
          {/* Answer */}
          <ListItem bottomDivider>
            <Icon name="info-circle" type="font-awesome" />
            <ListItem.Content>
              {doShowAnswer ? (
                <ListItem.Title>{card ? card.answer : ""}</ListItem.Title>
              ) : (
                <Button title="Show Answer" onPress={handleShowAnswer} />
              )}
            </ListItem.Content>
          </ListItem>
          <Divider />
          {/* Correct or Incorrect */}
          <View style={styles.buttonContainer}>
            <Button
              title="Correct"
              icon={
                <Icon
                  name="check"
                  type="font-awesome"
                  style={[styles.buttonIcon]}
                />
              }
              onPress={() => handleCardReply(true)}
            />
            <Button
              title="Incorrect"
              icon={
                <Icon
                  name="times"
                  type="font-awesome"
                  style={[styles.buttonIcon]}
                />
              }
              onPress={() => handleCardReply(false)}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const renderQuizScore = (
  deck,
  { cardIds, correctCount },
  handleReplayQuiz,
  handleQuitQuiz
) => {
  const cardCount = cardIds ? cardIds.length : 0;

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView false>
        <View>
          <ListItem bottomDivider>
            <Icon name="folder" type="font-awesome" />
            <ListItem.Content>
              <ListItem.Title>{deck ? deck.title : ""}</ListItem.Title>
              <ListItem.Subtitle>
                {cardCount} {cardCount > 1 ? "cards" : "card"} found.
              </ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
          <Divider />
          <ListItem bottomDivider>
            <Icon name="trophy" type="font-awesome" />
            <ListItem.Content>
              <ListItem.Title>
                {correctCount} out of {cardCount} answered correctly.
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
          <Divider />

          {/* Replay or Back buttons */}
          <View style={styles.buttonContainer}>
            <Button
              title="Replay Quiz"
              icon={
                <Icon
                  name="repeat"
                  type="font-awesome"
                  style={[styles.buttonIcon]}
                />
              }
              onPress={handleReplayQuiz}
            />
            <Button
              title="Back to Deck"
              icon={
                <Icon
                  name="chevron-left"
                  type="font-awesome"
                  style={[styles.buttonIcon]}
                />
              }
              onPress={handleQuitQuiz}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const initQuizParameter = (deck) => {
  return {
    cardIds: deck ? Object.keys(deck.cards) : [],
    thisCardIndex: 0,
    correctCount: 0,
    doShowAnswer: false,
  };
};

function QuizScreen({ navigation, route, decks }) {
  const { deckId } = route.params;
  const deck = decks ? decks[deckId] : null;

  const [quizParameter, setQuizParameter] = useState(initQuizParameter());

  const handleShowAnswer = () => {
    const newParam = { ...quizParameter };
    newParam.doShowAnswer = !quizParameter.doShowAnswer;
    setQuizParameter(newParam);
  };

  const handleCardReply = (isCorrect) => {
    const newParam = { ...quizParameter };

    if (isCorrect) newParam.correctCount += 1;

    // Display next card
    newParam.thisCardIndex += 1;

    // Don't show answer on next
    newParam.doShowAnswer = false;

    setQuizParameter(newParam);
  };

  const handleReplayQuiz = () => {
    const quizParameter = initQuizParameter(deck);
    setQuizParameter(quizParameter);
  };

  const handleQuitQuiz = () => {
    navigation.navigate("Deck", {
      deckId,
    });
  };

  useEffect(() => {
    const quizParameter = initQuizParameter(deck);
    setQuizParameter(quizParameter);
  }, []);

  const pendingCount = Math.max(
    0,
    quizParameter.cardIds.length - quizParameter.thisCardIndex
  );
  return pendingCount > 0
    ? renderQuizPage(
        deck,
        { ...quizParameter },
        handleShowAnswer,
        handleCardReply
      )
    : renderQuizScore(
        deck,
        { ...quizParameter },
        handleReplayQuiz,
        handleQuitQuiz
      );
}

function mapStateToProps(decks) {
  return {
    decks,
  };
}

export default connect(mapStateToProps)(QuizScreen);
