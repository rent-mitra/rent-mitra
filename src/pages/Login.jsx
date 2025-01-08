import React, { useState } from "react";
import "./login.css";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const sendOtp = async () => {
    if (phone) {
      try {
        const response = await fetch(
          `http://localhost:8086/otp/send?phonenumber=${encodeURIComponent(phone)}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json", // Ensure this matches your backend expectation
            },
          }
        );

        if (response.ok) {
          const message = await response.text();
          console.log("OTP Sent Successfully:", message);
          setOtpSent(true);
        } else {
          console.error("Error sending OTP:", response.statusText);
          alert("Failed to send OTP. Please try again.");
        }
      } catch (error) {
        console.error("Error sending OTP:", error.message);
        alert("An error occurred while sending the OTP.");
      }
    } else {
      alert("Enter a valid phone number");
    }
  };

  const verifyOtp = async () => {
    if (otp) {
      try {
        const response = await fetch(
          `http://localhost:8086/otp/verifyotp?otp=${encodeURIComponent(otp)}`,
          {
            method: "POST",
          }
        );

        if (response.ok) {
          const result = await response.json();
          console.log("OTP Verified Successfully:", result);

          if (result.message === "Otp varified !") {
            alert(`Login successful! Token: ${result.token}`);
          } else {
            alert(result.message); // Display "Enter a valid otp"
          }
        } else {
          console.error("Error verifying OTP:", response.statusText);
          alert("Failed to verify OTP. Please try again.");
        }
      } catch (error) {
        console.error("Error verifying OTP:", error.message);
        alert("An error occurred while verifying the OTP.");
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
          <button className="login-google" disabled>
            Continue with Google (Not Implemented)
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
