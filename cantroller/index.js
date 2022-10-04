const Transaction = require("../model/transaction.model");
const User = require("../model/user.model");
const {
  validatePassword,
  encryptPassword,
} = require("../utils/encryptPassword");
const jwtToken = require("../utils/jwtToken");

// @desc    Get all Users
// @route   GET api/users
// @access  Private
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ userType: "user" });
    if (!users || users.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No users found" });
    }
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all Transactions of the user
// @route   GET api/users/transactions
// @access  Private
exports.getTransactions = async (req, res) => {
  const { accountNumber } = req.body;
  try {
    const transaction = await Transaction.find({ accountNumber });
    res.json({ success: true, transaction });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Transfer specific amount
// @route   POST api/users/transfer
// @access  Private
exports.transferAmount = async (req, res) => {
  try {
    const { transactionFrom, transactionTo, amount } = req.body;
    const debitAmount = await User.findOneAndUpdate(
      { accountNo: transactionFrom },
      { $inc: { accountBalance: -amount } },
      { new: true }
    );
    const creditAmount = await User.findOneAndUpdate(
      { accountNo: transactionTo },
      { $inc: { accountBalance: amount } },
      { new: true }
    );
    const transaction = await Transaction.create({
      accountNumber: transactionFrom,
      amount,
      transactionFrom,
      transactionTo,
    });
    res.json({ success: true, debitAmount, creditAmount, transaction });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get total amount in bank
// @route   POST api/admin/bankAmount
// @access  Private
exports.totalAmountInBank = async (req, res) => {
  try {
    const totalAmount = await User.aggregate([
      { $match: { userType: "user" } },
      { $group: { _id: null, amount: { $sum: "$accountBalance" } } },
    ]);
    res.json({ success: true, totalAmount });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Login
// @route   POST api/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ status: false, message: "Please fill all the details" });
    }

    const isUser = await User.exists({ email });
    if (!isUser) {
      return res
        .status(400)
        .json({ status: false, message: "Email does not exists" });
    }

    const user = await User.find({ email });
    const token = jwtToken({ _id: user.accountNo });
    const isPasswordValidated = await validatePassword(
      password,
      user[0].password
    );

    if (!isPasswordValidated) {
      return res.json({ status: false, message: "Invalid email or password" });
    }

    res.json({
      status: true,
      message: "User logged in successfully",
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

// @desc    Signin
// @route   POST api/signin
// @access  Public
exports.signIn = async (req, res) => {
  try {
    const { name, email, password, accountBalance, userType } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ status: false, message: "Please fill all the details" });
    }

    const isUser = await User.exists({ email });
    if (isUser) {
      return res
        .status(400)
        .json({ status: false, message: "User already exists" });
    }

    const encryptedPassword = await encryptPassword(password);
    const accountNo = Math.random().toFixed(16).split(".")[1];
    const user = await User.create({
      name,
      email,
      password: encryptedPassword,
      accountNo,
      accountBalance,
      userType,
    });
    const token = jwtToken({ _id: user.accountNo });

    res.json({
      staus: true,
      message: "User created successfully",
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};
