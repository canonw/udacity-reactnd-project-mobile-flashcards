import React, { useContext } from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { NavigationContainer } from "@react-navigation/native";
import { Platform } from "react-native";
import { colors, ThemeContext, ThemeProvider } from "react-native-elements";
import { createStackNavigator } from "@react-navigation/stack";
import reducer from "./reducers";
import middleware from "./middleware";
import DeckListScreen from "./components/DeckListScreen";
import DeckScreen from "./components/DeckScreen";
import NewCardScreen from "./components/NewCardScreen";
import NewDeckScreen from "./components/NewDeckScreen.js";
import QuizScreen from "./components/QuizScreen";

const store = createStore(reducer, middleware);

const Stack = createStackNavigator();

const AppTheme = {
  colors: {
    ...Platform.select({
      default: colors.platform.android,
      ios: colors.platform.ios,
    }),
  },
};

export default function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <Provider store={store}>
      <ThemeProvider theme={AppTheme}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: theme.colors.primary,
              },
            }}
          >
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
      </ThemeProvider>
    </Provider>
  );
}
