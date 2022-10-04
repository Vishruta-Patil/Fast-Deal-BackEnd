const express = require('express')
const { totalAmountInBank } = require('../cantroller')
const { authVerify } = require('../middleware/authVerify')
const router = express.Router()

router.route("/bankAmount").get(authVerify, totalAmountInBank)

module.exports = router