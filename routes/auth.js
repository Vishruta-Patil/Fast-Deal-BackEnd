const express = require('express')
const {  login, signIn } = require('../cantroller')
const router = express.Router()

router.route("/login").post(login)
router.route("/sigin").post(signIn)

module.exports = router