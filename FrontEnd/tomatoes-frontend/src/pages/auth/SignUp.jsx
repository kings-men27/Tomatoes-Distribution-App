import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
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
    name: "",
    businessName: "",
    farmLocation: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    accountNumber: "",
    accountName: "",
    bankName: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!formData.role) {
      setError("Please select whether you are a Farmer or Buyer.");
      return;
    }

    if (
      !formData.name ||
      !formData.phoneNumber ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill in all required fields.");
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

    // TODO: Replace with real API call once backend endpoint is ready
    // e.g. const response = await api.post("/auth/signup", formData);
    // login(response.data.token, formData.role);
    setTimeout(() => {
      login("fake-signup-token", formData.role);
      setLoading(false);
      navigate("/home");
    }, 800);
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
          options={["farmer", "buyer"]}
          placeholder="Select role"
        />

        <Input
          label="NAME:"
          name="name"
          value={formData.name}
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
