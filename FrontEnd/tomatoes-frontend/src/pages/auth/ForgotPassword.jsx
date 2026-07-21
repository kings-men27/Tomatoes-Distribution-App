import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axiosConfig"; 
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import "./AuthForm.css";

export default function ForgotPassword() {
  const navigate = useNavigate();

  
  const [step, setStep] = useState(1);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

 
  const handleFetchQuestion = async (e) => {
    e.preventDefault();
    setError("");

    if (!phoneNumber) {
      setError("Please enter your phone number.");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/getRecoveryQuestion", { phoneNumber });

      if (response.data.success) {
        setSecurityQuestion(response.data.securityQuestion);
        setStep(2);
      }
    } catch (err) {
      const message =
        err.response?.data?.message || "No security question configured or phone number not found.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  // STEP 2: Submit Answer and Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");

    if (!securityAnswer || !newPassword || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/resetPassword", {
        phoneNumber,
        securityAnswer,
        newPassword,
      });

      if (response.data.success) {
        setSuccessMsg("Password reset successful! Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (err) {
      const message =
        err.response?.data?.message || "Invalid answer or recovery credentials.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card">
      <h1 className="auth-title">FORGOT PASSWORD</h1>

      {successMsg ? (
        <p className="auth-success" style={{ textAlign: "center", color: "#4CAF50" }}>
          {successMsg}
        </p>
      ) : step === 1 ? (
        /* STEP 1: Enter Phone Number */
        <form onSubmit={handleFetchQuestion} className="auth-form">
          <Input
            label="PHONE NUMBER:"
            name="phoneNumber"
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />

          {error && <p className="auth-error">{error}</p>}

          <Button type="submit" disabled={loading} className="auth-submit-btn">
            {loading ? "SEARCHING..." : "GET SECURITY QUESTION"}
          </Button>
        </form>
      ) : (
        /* STEP 2: Security Question & Password Form */
        <form onSubmit={handleResetPassword} className="auth-form">
          <div className="security-question-box" style={{ marginBottom: "1rem" }}>
            <p style={{ fontWeight: "bold", fontSize: "0.9rem" }}>
              QUESTION: {securityQuestion}
            </p>
          </div>

          <Input
            label="YOUR ANSWER:"
            name="securityAnswer"
            type="text"
            value={securityAnswer}
            onChange={(e) => setSecurityAnswer(e.target.value)}
          />

          <Input
            label="NEW PASSWORD:"
            name="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <Input
            label="CONFIRM NEW PASSWORD:"
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {error && <p className="auth-error">{error}</p>}

          <Button type="submit" disabled={loading} className="auth-submit-btn">
            {loading ? "RESETTING..." : "RESET PASSWORD"}
          </Button>
        </form>
      )}

      <p className="auth-switch">
        Remembered it? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}