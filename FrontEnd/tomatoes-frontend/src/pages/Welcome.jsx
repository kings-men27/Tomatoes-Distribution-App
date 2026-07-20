import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import logo from "../assets/images/ZeroSpoil_icon.svg";
import "./Welcome.css";

const LeafIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 20A7 7 0 0 1 4 13c0-4 3-9 8-11 5 2 8 7 8 11a7 7 0 0 1-7 7"></path>
    <path d="M12 20V9"></path>
  </svg>
);

const CoinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9"></circle>
    <path d="M12 7v10M9 9.5c0-1.4 1.3-2.5 3-2.5s3 1.1 3 2.5-1.3 2-3 2.5-3 1.1-3 2.5 1.3 2.5 3 2.5 3-1.1 3-2.5"></path>
  </svg>
);

const TrendDownIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 17 13.5 8.5 8.5 13.5 2 7"></polyline>
    <polyline points="16 17 22 17 22 11"></polyline>
  </svg>
);

export default function Welcome() {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    navigate(`/signup?role=${role}`);
  };

  return (
    <div className="welcome-page">
      <div className="welcome-hero">
        <div className="welcome-logo">
          <img src={logo} alt="ZeroSpoil logo" className="welcome-logo-img" />
          <span className="welcome-logo-text">ZeroSpoil</span>
        </div>
        <p className="welcome-tagline">Preserve it. Keep it fresh. Earn more.</p>
      </div>

      <div className="welcome-body">
        <ul className="welcome-features">
          <li>
            <span className="welcome-feature-icon"><LeafIcon /></span>
            Track your produce from farm to market
          </li>
          <li>
            <span className="welcome-feature-icon"><CoinIcon /></span>
            Get paid faster with instant escrow
          </li>
          <li>
            <span className="welcome-feature-icon"><TrendDownIcon /></span>
            Cut spoilage with smart logistics alerts
          </li>
        </ul>

        <div className="welcome-role-section">
          <h2 className="welcome-select-role">SELECT ROLE TO CONTINUE</h2>
          <div className="welcome-role-buttons">
            <Button
              variant="primary"
              className="welcome-role-btn"
              onClick={() => handleRoleSelect("farmer")}
            >
              FARMER
            </Button>
            <Button
              variant="buyer"
              className="welcome-role-btn"
              onClick={() => handleRoleSelect("buyer")}
            >
              BUYER
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
