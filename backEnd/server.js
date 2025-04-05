const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/User");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// OTP Routes
const otpRoutes = require("./routes/otpRoutes");
app.use("/api", otpRoutes); // Use OTP routes

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

app.post("/api/google-signup", async (req, res) => {
  console.log("📩 Received Google signup request:", req.body); 

  const { email, name, picture, sub } = req.body; // sub = unique Google user ID

  try {
    // Check if user already exists
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        email,
        name,
        picture,
        googleId: sub,
      });
      await user.save();
      console.log("✅ New user saved:", user);
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error saving Google user:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

