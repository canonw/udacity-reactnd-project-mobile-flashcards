import { Platform } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";

export const NOTIFICATION_KEY = "MOBILE_FLASHCARDS:NOTIFICATION_KEY";

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(() => {
    if (doSupportNotification())
      Notifications.cancelAllScheduledNotificationsAsync();
  });
}

export function setLocalNotification() {
  // Clear items for development purpose.
  //AsyncStorage.removeItem(NOTIFICATION_KEY);
  //AsyncStorage.clear();

  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status === "granted") {
            if (doSupportNotification()) {
              Notifications.cancelAllScheduledNotificationsAsync();

              // API reference: https://docs.expo.io/versions/latest/sdk/notifications/#schedulenotificationasyncnotificationrequest-notificationrequestinput-promisestring
              Notifications.scheduleNotificationAsync({
                content: createNotification(),
                trigger: createTrigger(),
              });
            }

            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
          }
        });
      }
    });
}

function doSupportNotification() {
  // Create this method as a work around with new expo-notifications package.
  // The new package doesn't seem to support web browser
  return Platform.OS === "ios" || Platform.OS === "android";
}

function createNotification() {
  return {
    title: "Test a deck!",
    body: "👋 don't forget to take a quiz for today!",

    // android
    //priority: Notifications.AndroidNotificationPriority.HIGH,
  };
}

function createTrigger() {
  // Use DailyTriggerInput setting
  // API https://docs.expo.io/versions/latest/sdk/notifications/#dailytriggerinput
  return {
    hour: 20,
    minute: 0,
    // seconds: 60 * 2,
    repeats: true,
  };
}
