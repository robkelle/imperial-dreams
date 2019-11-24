import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Fix deprecation warnings
mongoose.set("useFindAndModify", false);

module.exports = mongoose.model(
  "users",
  new Schema({
    username: String,
    created: Date,
    accessToken: String,
    refreshToken: String,
    password: String
  })
);
