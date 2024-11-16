const {Router} = require('express')
const {signupUser, loginUser, getUser, logoutUser, addBankAccount} = require('../controllers/user.controller.js')
const verifyToken = require('../middleware/verifytoken.middleware.js')

const router = Router()

router.route("/signupuser").post(signupUser)
router.route("/loginuser").post(loginUser)
router.route("/getuser").get(verifyToken, getUser)
router.route("/addbankaccount").post(addBankAccount)
router.route("/logoutuser").get(logoutUser)

module.exports = router