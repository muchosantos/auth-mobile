import { router } from "expo-router";

export type AlertConfigKey =
  | "ENTER_CREDENTIALS"
  | "ENTER_PASSWORD"
  | "INCORRECT_CREDENTIALS"
  | "WEAK_PASSWORD"
  | "CONFIRM_PASSWORD"
  | "MATCH_PASSWORDS"
  | "ACCOUNT_EXIST";

export const alertConfigs = {
  ENTER_CREDENTIALS: {
    title: "Enter your credentials",
    message: "Enter your username or email address to log in",
    buttons: [
      {
        text: "OK",
        onPress: () => {},
        backgroundColor: "#4285F4",
      },
      {
        text: "Create new account",
        onPress: () => {
          router.push("/(auth)/register");
        },
        backgroundColor: "#8D8D8D",
      },
    ],
    layout: "vertical" as const,
  },
  ENTER_PASSWORD: {
    title: "Enter your password",
    message: "Please enter your password to continue.",
    buttons: [
      {
        text: "Ok",
        onPress: () => {},
        backgroundColor: "#4285F4",
      },
    ],
    layout: "horizontal" as const,
  },
  INCORRECT_CREDENTIALS: {
    title: "Incorrect email or password",
    message:
      "The email or password you entered is incorrect. Please try again, or sign up if you don’t have an account.",
    buttons: [
      {
        text: "Sign up",
        onPress: () => {
          router.push("/(auth)/register");
        },
        backgroundColor: "#4285F4",
      },
      {
        text: "Try again",
        onPress: () => {},
        backgroundColor: "#8D8D8D",
      },
    ],
    layout: "horizontal" as const,
  },
  WEAK_PASSWORD: {
    title: "Password too weak",
    message:
      "Your password must be at least 6 characters long and include at least one number and one uppercase letter.",
    buttons: [
      {
        text: "Try again",
        onPress: () => {},
        backgroundColor: "#4285F4",
      },
    ],
    layout: "horizontal" as const,
  },
  CONFIRM_PASSWORD: {
    title: "Confirm your password",
    message: "Please re-enter your password to continue.",
    buttons: [
      {
        text: "Try again",
        onPress: () => {},
        backgroundColor: "#4285F4",
      },
    ],
    layout: "horizontal" as const,
  },
  MATCH_PASSWORDS: {
    title: "Passwords don’t match",
    message: "Please make sure both password fields match.",
    buttons: [
      {
        text: "Try again",
        onPress: () => {},
        backgroundColor: "#4285F4",
      },
    ],
    layout: "horizontal" as const,
  },
  ACCOUNT_EXIST: {
    title: "Account already exists",
    message:
      "This email is already associated with an account. Please login or use a different email.",
    buttons: [
      {
        text: "OK",
        onPress: () => {},
        backgroundColor: "#4285F4",
      },
      {
        text: "Login to your account",
        onPress: () => {
          router.push("/(auth)");
        },
        backgroundColor: "#8D8D8D",
      },
    ],
    layout: "vertical" as const,
  },
};
