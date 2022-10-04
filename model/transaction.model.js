const mongoose = require("mongoose");
const { Schema } = mongoose;

const transactionSchema = new Schema({
  accountNumber: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  transactionFrom: {
    type: String,
    required: true,
  },
  transactionTo: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now(),
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;
