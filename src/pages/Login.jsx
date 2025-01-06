import React, { useState } from "react";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import "./login.css";

const firebaseConfig = {
  apiKey: "AIzaSyD8AIu9YpcCGNbRH9Nniy2bCKPef3dnK3U",
  authDomain: "rentmitra-3d0ba.firebaseapp.com",
  projectId: "rentmitra-3d0ba",
  storageBucket: "rentmitra-3d0ba.firebasestorage.app",
  messagingSenderId: "517693843746",
  appId: "1:517693843746:web:5785a00f0f958b4b0bdd7b",
  measurementId: "G-HKM7HYGJ9Y",
};
initializeApp(firebaseConfig);

const Login = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const auth = getAuth();

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Google Login Successful", result.user);
    } catch (error) {
      console.error("Error logging in with Google:", error.message);
    }
  };

  const sendOtp = async () => {
    if (phone) {
      try {
        const appVerifier = new RecaptchaVerifier(
          "recaptcha-container",
          {},
          auth
        );
        const confirmationResult = await signInWithPhoneNumber(
          auth,
          phone,
          appVerifier
        );
        window.confirmationResult = confirmationResult;
        setOtpSent(true);
        console.log("OTP Sent Successfully");
      } catch (error) {
        console.error("Error sending OTP:", error.message);
      }
    } else {
      alert("Enter a valid phone number");
    }
  };

  const verifyOtp = async () => {
    if (otp) {
      try {
        const result = await window.confirmationResult.confirm(otp);
        console.log("Phone Login Successful", result.user);
      } catch (error) {
        console.error("Error verifying OTP:", error.message);
      }
    } else {
      alert("Enter the OTP");
    }
  };

  return (
    <div className="login-page">
      <div className="login-options">
        {/* Back Button */}
        <div className="go-back" onClick={() => window.history.back()}>
          &#8592;Back
        </div>

        <div className="login-form">
          <h2 className="login-title">Login</h2>
          {!otpSent ? (
            <>
              <input
                type="text"
                placeholder="Enter phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <button onClick={sendOtp}>Send OTP</button>
              <div id="recaptcha-container"></div>
            </>
          ) : (
            <>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <button onClick={verifyOtp}>Verify OTP</button>
            </>
          )}

          <div className="or-divider">OR</div>
          <button className="login-google" onClick={handleGoogleLogin}>
            Continue with Google
          </button>

          <div className="terms">
            <p>All your personal details are safe with us.</p>
            <p>
              If you continue, you accept{" "}
              <a href="#" style={{ color: "dodgerblue" }}>
                Rentmitra Terms and Conditions and Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
