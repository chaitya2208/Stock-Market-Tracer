const express = require("express");
const router = express.Router();
const sgMail = require("@sendgrid/mail");
const OTP = require("../models/otpModel"); // Import the OTP model
require("dotenv").config();

// Set SendGrid API Key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Generate a 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// API to send OTP
router.post("/send-otp", async (req, res) => {
    const { email } = req.body;

    if (!email) return res.status(400).json({ error: "Email is required" });

    try {
        const otp = generateOTP();
        const otpExpires = new Date(Date.now() + 5 * 60000); // Expires in 5 mins

        // Remove any existing OTP for the email
        await OTP.deleteMany({ email });

        // Save new OTP in MongoDB
        await OTP.create({ email, otp, otpExpires });

        // Send OTP via SendGrid
        const msg = {
            to: email,
            from: process.env.FROM_EMAIL, // Use the verified sender email
            subject: "Your OTP for Verification",
            text: `Your OTP is: ${otp}. It expires in 5 minutes.`,
            html: `<p>Your OTP is: <strong>${otp}</strong>. It expires in 5 minutes.</p>`,
        };

        await sgMail.send(msg);
        res.json({ success: true, message: "OTP sent successfully via SendGrid" });
    } catch (error) {
        console.error("Error sending OTP:", error);
        res.status(500).json({ error: "Error sending OTP" });
    }
});

// API to verify OTP
router.post("/verify-otp", async (req, res) => {
    const { email, otp } = req.body;
    console.log("🔍 Verifying OTP for:", email, "with OTP:", otp); // Debugging

    try {
        const otpRecord = await OTP.findOne({ email, otp: otp.toString() });

        console.log("📝 OTP Record from DB:", otpRecord); // Debugging

        if (!otpRecord) {
            return res.status(400).json({ message: "OTP not found" });
        }

        if (otpRecord.otp !== otp.toString()) {
            console.log("❌ Mismatch OTP. Expected:", otpRecord.otp, "Received:", otp.toString()); // Debugging
            return res.status(400).json({ message: "Invalid OTP" });
        }

        if (new Date() > otpRecord.otpExpires) {
            console.log("❌ OTP Expired at:", otpRecord.otpExpires); // Debugging
            return res.status(400).json({ message: "Expired OTP" });
        }

        // OTP verified, remove OTP from DB
        await OTP.deleteOne({ _id: otpRecord._id });        

        res.json({ success: true, message: "OTP verified successfully" });
    } catch (error) {
        console.error("❌ Server error verifying OTP:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;