const {Router} = require('express')
const {createOrder, verifyPayment, createContact, createFundAccount, initiatePayout, getAccessToken, addBeneficiary} =require('../controllers/payment.controller')

const router = Router()

router.route("/createorder").post(createOrder)
router.route("/verifypayment").post(verifyPayment)
// router.route("/createcontact").post(createContact)
// router.route("/createfundaccount").post(createFundAccount)
router.route("/initiatepayout").post(initiatePayout)
router.route("/getaccesstoken").post(getAccessToken)
router.route("/addbenficiary").post(addBeneficiary)

module.exports = router