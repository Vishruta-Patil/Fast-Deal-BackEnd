const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  accountNo: {
    type: String,
    required: true,
  },
  accountBalance: {
    type: Number,
    required: true,
  },
  userType: {
    type: String,
    required: true,
    default: "user"
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
