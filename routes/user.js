const express = require('express')
const { getAllUsers, getTransactions, transferAmount } = require('../cantroller')
const { authVerify } = require('../middleware/authVerify')
const router = express.Router()

router.route("/").get(authVerify, getAllUsers)
router.route("/transactions").get(authVerify, getTransactions)
router.route("/transfer").post(authVerify, transferAmount)

module.exports = router