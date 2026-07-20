import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import api from "../../api/axiosConfig";
import GoogleButton from "../../components/ui/GoogleButton";
import Divider from "../../components/ui/Divider";
import "./AuthForm.css";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.phoneNumber || !formData.password) {
      setError("Please enter your phone number and password.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
try {
  const response = await api.post("/api/auth/login",{
    phoneNumber: formData.phoneNumber,
    password: formData.password,
  });
  

  if (response.data.error) {
    setError(response.data.error);
    setLoading(false);
  } else {
    localStorage.setItem("token", response.data.token);
    //takes you home if sign in successful
    navigate("/home");   
} 
} catch (err) {
  console.error("Login failed", err);

  const errorMessage = err.response?.data?.error || "Internal server error. Please try again.";
  setError(errorMessage);
  setLoading(false);
} finally {
  setLoading(false);
}
  };

  return (
    <div className="auth-card">
      <h1 className="auth-title">LOGIN</h1>

      <form onSubmit={handleSubmit} className="auth-form">
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

        {error && <p className="auth-error">{error}</p>}

        <Button type="submit" disabled={loading} className="auth-submit-btn">
          {loading ? "LOGGING IN..." : "LOGIN"}
        </Button>
      </form>

      <Divider text="OR" />
      <GoogleButton />

      <Link to="/forgot-password" className="forget-password-btn">
        FORGET PASSWORD?
      </Link>

      <p className="auth-switch">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
}
