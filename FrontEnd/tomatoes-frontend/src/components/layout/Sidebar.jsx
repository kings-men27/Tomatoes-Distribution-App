import { useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/images/ZeroSpoil_icon.svg";
import "./Sidebar.css";

export default function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    onClose();
    navigate("/login");
  };

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose}></div>}

      <nav className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-brand">
          <img src={logo} alt="ZeroSpoil logo" className="sidebar-logo-img" />
          <span className="sidebar-brand-text">ZeroSpoil</span>
        </div>

        <ul className="sidebar-list">
          <li>
            <NavLink to="/dashboard" onClick={onClose} className="sidebar-link">
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/home" onClick={onClose} className="sidebar-link">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/details" onClick={onClose} className="sidebar-link">
              Details
            </NavLink>
          </li>
          <li>
            <NavLink to="/notifications" onClick={onClose} className="sidebar-link">
              Notifications
            </NavLink>
          </li>
          <li>
            <NavLink to="/prediction" onClick={onClose} className="sidebar-link">
              Prediction
            </NavLink>
          </li>
          <li>
            <NavLink to="/wallet" onClick={onClose} className="sidebar-link">
              Wallet
            </NavLink>
          </li>
          <li>
            <NavLink to="/settings" onClick={onClose} className="sidebar-link">
              Settings
            </NavLink>
          </li>
          <li className="sidebar-divider"></li>
          <li>
            <button className="sidebar-link sidebar-logout" onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}
