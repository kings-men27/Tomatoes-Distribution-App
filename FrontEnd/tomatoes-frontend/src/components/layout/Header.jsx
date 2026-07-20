import { Link } from "react-router-dom";
import logo from "../../assets/images/ZeroSpoil_icon.svg";
import "./Header.css";

export default function Header({ onMenuClick }) {
  return (
    <header className="app-header">
      <div className="header-left">
        <button className="hamburger-btn" onClick={onMenuClick} aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <img src={logo} alt="ZeroSpoil logo" className="header-logo-img" />
      </div>

      <Link to="/settings" className="profile-btn" aria-label="Profile">
        <div className="profile-icon">User</div>
      </Link>
    </header>
  );
}
