import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../api/axiosConfig";  
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";
import GoogleButton from "../../components/ui/GoogleButton";
import Divider from "../../components/ui/Divider";
import "./AuthForm.css";

export default function SignUp() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [searchParams] = useSearchParams();
  const roleFromUrl = searchParams.get("role");

  const [formData, setFormData] = useState({
    role: roleFromUrl === "farmer" || roleFromUrl === "buyer" ? roleFromUrl : "",
    userName: "",
    businessName: "",
    farmLocation: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    securityQuestion: "",
    securityAnswer: "",
    accountNumber: "",
    accountName: "",
    bankName: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.role) {
      setError("Please select whether you are a Farmer or Buyer.");
      return;
    }

    if (
      !formData.userName ||
      !formData.phoneNumber ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.securityQuestion ||
      !formData.securityAnswer
    ) {
      setError("Please fill in all required fields, including security details.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      // POST request to backend signUp endpoint
      const response = await api.post("/auth/register", {
        role: formData.role,
        userName: formData.userName,
        phoneNumber: formData.phoneNumber,
        password: formData.password,
        securityQuestion: formData.securityQuestion,
        securityAnswer: formData.securityAnswer,
        businessName: formData.businessName,
        farmLocation: formData.farmLocation,
        accountNumber: formData.accountNumber,
        accountName: formData.accountName,
        bankName: formData.bankName,
      });

      if (response.data.success) {
        const { token, user } = response.data;

        // Save session state via AuthContext
        login(token, user);
        navigate("/home");
      }
    } catch (err) {
      const serverMessage =
        err.response?.data?.message || "Unable to complete sign up. Please try again.";
      setError(serverMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card">
      <h1 className="auth-title">SIGN UP</h1>

      <form onSubmit={handleSubmit} className="auth-form">
        <Select
          label="I AM A:"
          name="role"
          value={formData.role}
          onChange={handleChange}
          options={["FARMER", "BUYER"]}
          placeholder="Select role"
        />

        <Input
          label="NAME:"
          name="userName"
          value={formData.userName}
          onChange={handleChange}
        />
        <Input
          label="BUSINESS NAME:"
          name="businessName"
          value={formData.businessName}
          onChange={handleChange}
        />
        <Input
          label="FARM LOCATION:"
          name="farmLocation"
          value={formData.farmLocation}
          onChange={handleChange}
        />
        <Input
          label="PHONE NUMBER:"
          name="phoneNumber"
          type="tel"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
        <Input
          label="PASSWORD:"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />
        <Input
          label="CONFIRM PASSWORD:"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />

        <h2 className="auth-subtitle">SECURITY RECOVERY</h2>

        <Input
          label="SECURITY QUESTION:"
          name="securityQuestion"
          placeholder="e.g. What is your pet's name?"
          value={formData.securityQuestion}
          onChange={handleChange}
        />
        <Input
          label="SECURITY ANSWER:"
          name="securityAnswer"
          value={formData.securityAnswer}
          onChange={handleChange}
        />

        <h2 className="auth-subtitle">ACCOUNT DETAILS</h2>

        <Input
          label="ACCOUNT NUMBER:"
          name="accountNumber"
          value={formData.accountNumber}
          onChange={handleChange}
        />
        <Input
          label="ACCOUNT NAME:"
          name="accountName"
          value={formData.accountName}
          onChange={handleChange}
        />
        <Input
          label="BANK NAME:"
          name="bankName"
          value={formData.bankName}
          onChange={handleChange}
        />

        {error && <p className="auth-error">{error}</p>}

        <Button type="submit" disabled={loading} className="auth-submit-btn">
          {loading ? "SIGNING UP..." : "SIGN UP"}
        </Button>
      </form>

      <Divider text="OR" />
      <GoogleButton />

      <p className="auth-switch">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}