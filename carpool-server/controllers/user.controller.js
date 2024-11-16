const User = require("../models/user.models")
const jwt = require('jsonwebtoken');


const signupUser = async (req, res) => {
    const { name, mobile, email, password} = req.body;

    try {

        if (!(name || email || password || mobile)) {
            return res.status(400).json({ message: 'Invalid Data', success: false });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists', success: false });
        }
        // Create new user
        const newUser = new User({
            name,
            mobile,
            email,
            password,
        });

        // Save the user to the database
        await newUser.save();

        // Generate JWT token
        const token = jwt.sign({ id: newUser._id, email: newUser.email }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        // Send HTTP-only cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600000, // 1 hour
        });

        const loggedInUser = await User.findById(newUser._id).select("-password")

        res.status(201).json({ message: 'User registered successfully', user: loggedInUser, success: true });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', success: false });
    }
};


const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!(email || password)) {
            return res.status(400).json({ message: 'Invalid Data', success: false });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'User doesnt exists', success: false });
        }

        const isPasswordValid = await user.isPasswordCorrect(password)

        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid Password', success: false });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600000, // 1 hour
        });

        const loggedInUser = await User.findById(user._id).select("-password")

        res.status(201).json({ message: 'User logged in successfully', user: loggedInUser, success: true });




    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', success: false });
    }
}


const getUser = async (req, res) => {
    try {

        // console.log(req.user)

        const user = await User.findById(req.user.id).select('-password'); // Exclude password field
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        res.status(201).json({ message: 'User validated', user: user, success: true });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', success: false });
    }
}

const logoutUser = async(req,res) => {
    res.cookie('token', '', {
        httpOnly: true,
        expires: new Date(0), // Expire the cookie immediately
       
        secure: process.env.NODE_ENV === 'production' // Use this if your app is served over HTTPS
      });

      res.status(201).json({ message: 'User logged out successfully', success: true });
}

const addBankAccount = async(req, res)  => {
    const { userId, accountNumber, ifsc } = req.body;

  try {
    // Validate input
    if (!userId || !accountNumber || !ifsc) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user's bank details
    user.bankDetails = {
      accountNumber,
      ifsc,
    };

    await user.save();

    res.status(200).json({ message: "Bank details added successfully", success: true });
  } catch (error) {
    console.error("Error adding bank details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { signupUser, loginUser, getUser, logoutUser, addBankAccount }