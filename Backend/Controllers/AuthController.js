const User = require('../Models/User');
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
const nodemailer = require('nodemailer');

const signup=async (req, res) => {
  try {
    const { username,email, password } = req.body;
    const user=await User.findOne({ email});
    if (user) {
      return res.status(409).json({ message: "User already exists.You can login",success:false });
    }
    const newUser = new User({ username, email, password });
    newUser.password = await bcrypt.hash(password, 10);
    await newUser.save();
    res.status(201).json({ message: "Signup successful!", success: true });
  } catch (error) {

    res.status(500).json({ message: "An error occurred during signup." , success: false});
  }
}

const login=async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials", success: false });
    }
    const token = jwt.sign({ email: user.email,_id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.status(200).json({ 
      message: "Login successful!", 
      success: true, 
      token ,
      email: user.email, 
      username: user.username });
  } catch (error) {
    res.status(500).json({ message: "An error occurred during login.", success: false });
  }
}

const forgotPassword=async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Create reset token
   const token = jwt.sign({ email: user.email,_id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    // Send email (using nodemailer)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // your Gmail
        pass: process.env.EMAIL_PASS, // your Gmail password or App Password
      },
    });

    const resetLink = `http://localhost:5173/reset-password/${token}`;


    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Reset your password",
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password. Link expires in 15 minutes.</p>`,
    });

     res.status(200).json({
      message: "Password reset link sent successfully",
      resetLink: resetLink,
      token: token
    });
  } catch (err) {
    console.error(err); 
    res.status(500).json({ message: "Something went wrong." });
  }
};
const resetPassword = async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);

    if (!user) return res.status(404).json({ message: "Invalid token" });

    // Password hash
    user.password = await bcrypt.hash(password, 10);
    await user.save();

    res.status(200).json({ message: "Password reset successfully." });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Token is invalid or expired." });
  }
};



module.exports = { signup ,login ,forgotPassword,resetPassword};