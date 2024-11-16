const express = require("express");
const cookieParser = require("cookie-parser")
const cors = require("cors");


const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

//ROUTES
const userRouter = require("./routes/user.routes")
const rideRouter = require("./routes/ride.routes")
const paymentRouter = require("./routes/payment.routes")

app.use("/api/v1/users", userRouter)
app.use("/api/v1/rides", rideRouter)
app.use("/api/v1/payments", paymentRouter)

module.exports = app;