
import "dotenv/config";

export default {
  expo: {
    name: "Take a Seat",
    slug: "take-a-seat",
    extra: {
      firebaseApiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
    }
  }
};
