import { Platform } from "react-native";

let firebase;

if (Platform && Platform.OS === "web") {
  firebase = require("./firebase.web");
} else {
  firebase = require("./firebase.native");
}

export const app = firebase.app;
export const auth = firebase.auth;
export const db = firebase.db;
