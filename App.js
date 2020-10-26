import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "./reducers";
import middleware from "./middleware";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import DeckListScreen from "./components/DeckListScreen";
import DeckScreen from "./components/DeckScreen";
import NewCardScreen from "./components/NewCardScreen";
import NewDeckScreen from "./components/NewDeckScreen.js";
import QuizScreen from "./components/QuizScreen";

const store = createStore(reducer, middleware);

const Stack = createStackNavigator();

export default function App() {
  // TODO: Replace other with theme
  // https://reactnavigation.org/docs/themes/
  const AppTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: "rgb(255, 45, 85)",
    },
  };

  return (
    <Provider store={store}>
      <NavigationContainer theme={AppTheme}>
        <Stack.Navigator>
          <Stack.Screen
            name="DeckList"
            component={DeckListScreen}
            options={({ route }) => ({
              headerTitle: "Home",
            })}
          />
          <Stack.Screen
            name="Deck"
            component={DeckScreen}
            options={({ route }) => ({
              headerTitle: "Deck",
            })}
          />
          <Stack.Screen
            name="NewCard"
            component={NewCardScreen}
            options={({ route }) => ({
              headerTitle: "Add New Card",
            })}
          />
          <Stack.Screen
            name="NewDeck"
            component={NewDeckScreen}
            options={({ route }) => ({
              headerTitle: "Add New Deck",
            })}
          />
          <Stack.Screen
            name="Quiz"
            component={QuizScreen}
            options={({ route }) => ({
              headerTitle: "Quiz",
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
