import mongoose from "mongoose";

export const DBConnection = () => {
  mongoose
    .connect(process.env.MONGO_URL!)
    .then((value) => {})
    .catch((e) => {
      console.log(`Error: ${e.message}`.red);
    });
};
