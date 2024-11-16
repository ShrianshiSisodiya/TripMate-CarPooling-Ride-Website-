const {Router} = require('express')
const {addRide, searchRide, searchRideById, addPassesnger, getCurrentRides, updateCompleteStatus, getRideHistory, getHostedRides} = require('../controllers/ride.controller.js')
const verifyToken = require('../middleware/verifytoken.middleware.js')

const router = Router()


router.route("/addride").post(verifyToken, addRide)
router.route("/addpassenger").post(verifyToken, addPassesnger)
router.route("/updatecompletestatus").post(updateCompleteStatus)
router.route("/searchride").get(searchRide)
router.route("/searchridebyid").get(searchRideById)
router.route("/getcurrentrides").get(verifyToken, getCurrentRides)
router.route("/gethostedrides").get(verifyToken, getHostedRides)
router.route("/getridehistory").get(verifyToken, getRideHistory)

module.exports = router