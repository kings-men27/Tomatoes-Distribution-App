import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../api/axiosConfig"; 
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import GoogleButton from "../../components/ui/GoogleButton";
import Divider from "../../components/ui/Divider";
import "./AuthForm.css";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    phoneNumber: "",
    password: "",
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

    setLoading(true);

    try {
      
      const response = await api.post("/auth/login", {
        phoneNumber: formData.phoneNumber,
        password: formData.password,
      });

      if (response.data.success) {
        const { token, user } = response.data;

        // Persist token & user state in AuthContext
        login(token, user);
        navigate("/home");
      }
    } catch (err) {
      const serverMessage =
        err.response?.data?.message || "Unable to connect to server. Please try again.";
      setError(serverMessage);
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