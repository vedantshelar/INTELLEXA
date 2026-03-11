const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs")
const User = require("../models/User");
const { generateToken } = require('../uitls/methods');
const jwt = require("jsonwebtoken");


//new user register route
router.post("/register", async (req, res) => {
  try {
    const { name, email, mobileNo, password } = req.body;

    let user = await User.findOne({ email });

    if (user) {
      return res.json({
        success: false,
        message: "User already exists"
      });
    }

    // 🔐 hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    user = await User.create({
      name,
      email,
      mobileNo,
      password: hash
    });

    // ✅ Generate JWT
    const token = generateToken(user._id);

    // ✅ Send token as COOKIE
    res.cookie("token", token, {
      httpOnly: true, // JS cannot access cookie
      secure: false, // true in production (HTTPS)
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    return res.json({
      success: true,
      message: "User registered & logged in successfully"
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email"
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password"
      });
    }

    // Generate token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Send cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true in production
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      success: true,
      message: "Login successful"
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});

router.get("/isUserLoggedIn", async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "User is not logged in"
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not logged in"
      });
    }

    return res.json({
      success: true,
      message: "User is already logged in",
      user
    });

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token"
    });
  }
});

router.post("/logout", (req, res) => {
  try {

    res.clearCookie("token", {
      httpOnly: true,
      secure: false, // true in production (https)
      sameSite: "lax"
    });

    res.json({
      success: true,
      message: "User logged out successfully"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Logout failed"
    });

  }
});


module.exports = router;