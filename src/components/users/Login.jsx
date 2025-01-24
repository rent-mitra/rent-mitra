import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import AlertMessage from "./AlertMessage";
import { useDispatch } from "react-redux";
import { login } from "../../Redux/Slice/authSlice";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sendOtp = async () => {
    if (phone) {
      try {
        const response = await fetch(
          `http://localhost:8086/otp/send?phonenumber=${encodeURIComponent(
            phone
          )}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const message = await response.text();
          console.log("OTP Sent Successfully:", message);
          setOtpSent(true);
          setAlert({ type: "success", message: "OTP sent successfully" });
        } else {
          console.error("Error sending OTP:", response.statusText);
          setAlert({
            type: "error",
            message: "Failed to send OTP. Please try again.",
          });
        }
      } catch (error) {
        console.error("Error sending OTP:", error.message);
        setAlert({
          type: "error",
          message: "An error occurred while sending the OTP.",
        });
      }
    } else {
      setAlert({ type: "error", message: "Enter a valid phone number" });
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
            setAlert({ type: "success", message: "Login Successfully!" });
            dispatch(login({ token: result.token }));
            setTimeout(() => navigate("/"), 2000);
          } else {
            setAlert({ type: "error", message: result.message });
          }
        } else {
          console.error("Error verifying OTP:", response.statusText);
          setAlert({
            type: "error",
            message: "Failed to verify OTP. Please try again.",
          });
        }
      } catch (error) {
        console.error("Error verifying OTP:", error.message);
        setAlert({
          type: "error",
          messgae: "An error occurred while verifying the OTP.",
        });
      }
    } else {
      setAlert({ type: "error", message: "Enter the OTP" });
    }
  };

  return (
    <div className="login-page">
      <div className="login-options">
        <div className="go-back" onClick={() => window.history.back()}>
          &#8592;Back
        </div>

        <div className="login-form">
          <h2 className="login-title">Login</h2>
          {alert.message && (
            <AlertMessage type={alert.type} message={alert.message} />
          )}

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
