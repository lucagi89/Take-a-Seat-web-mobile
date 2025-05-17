import "dotenv/config";
import withTM from "next-transpile-modules";
import path from "path";
import type { NextConfig } from "next";

const withTranspileModules = withTM([
  "react-native",
  "react-native-web",
  "expo",
]);

const nextConfig: NextConfig = {
  reactStrictMode: true,

  env: {
    EXPO_PUBLIC_FIREBASE_API_KEY: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
    EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
    EXPO_PUBLIC_FIREBASE_PROJECT_ID: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
    EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
    EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    EXPO_PUBLIC_FIREBASE_APP_ID: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  },

  webpack: (config) => {
    config.resolve.alias["@firebase"] = path.resolve(__dirname, "../../packages/firebase/firebase.ts");
    return config;
  },
};

export default withTranspileModules(nextConfig);
