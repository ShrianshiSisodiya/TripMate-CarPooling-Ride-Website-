const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile: String,
  password: String,
  role: { type: String, enum: ["passenger", "owner"], default: "passenger" },
  totalEarnings: {
    type: Number,
    default: 0, // Tracks total earnings from rides
  },
  availableBalance: {
    type: Number,
    default: 0, // Tracks how much is currently available for withdrawal
  },
  bankDetails: {
    accountNumber: { type: String },
    ifsc: { type: String },
  },
  razorpayContactId: { type: String },
  razorpayFundAccountId: { type: String },
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

module.exports = mongoose.model("User", userSchema);
