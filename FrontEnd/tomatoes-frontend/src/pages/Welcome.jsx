import { useNavigate } from "react-router-dom";
import logo from "../assets/images/ZeroSpoil_icon.svg";
import heroImage from "../assets/images/land-image.jpg";
import "./Welcome.css";

const TrackIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="6" cy="12" r="2"></circle>
    <circle cx="18" cy="6" r="2"></circle>
    <path d="M8 12h4l4-4"></path>
  </svg>
);

const WalletIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="6" width="20" height="14" rx="2"></rect>
    <path d="M2 10h20"></path>
    <circle cx="16" cy="15" r="1.5"></circle>
  </svg>
);

const BellIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
  </svg>
);

const FarmerIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4"></circle>
    <path d="M4 21v-1a8 8 0 0 1 16 0v1"></path>
  </svg>
);

const BuyerIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 8h12l-1.5 11a2 2 0 0 1-2 2h-5a2 2 0 0 1-2-2z"></path>
    <path d="M9 8V6a3 3 0 0 1 6 0v2"></path>
  </svg>
);

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z"></path>
  </svg>
);

const LeafIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 20A7 7 0 0 1 4 13c0-4 3-9 8-11 5 2 8 7 8 11a7 7 0 0 1-7 7"></path>
    <path d="M12 20V9"></path>
  </svg>
);

const PeopleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="8" r="3"></circle>
    <path d="M2 21v-1a6 6 0 0 1 12 0v1"></path>
    <circle cx="17" cy="9" r="2.5"></circle>
    <path d="M15 21v-1a5 5 0 0 1 7-4.5"></path>
  </svg>
);

const ChartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 17 9 11 13 15 21 6"></polyline>
    <polyline points="15 6 21 6 21 12"></polyline>
  </svg>
);

export default function Welcome() {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    navigate(`/signup?role=${role}`);
  };

  const scrollToRoles = () => {
    document.getElementById("role-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="welcome-page">
      <div className="welcome-hero">
        <div className="welcome-hero-top">
          <div className="welcome-logo">
            <img src={logo} alt="ZeroSpoil logo" className="welcome-logo-img" />
            <span className="welcome-logo-text">ZeroSpoil</span>
          </div>
          <button className="welcome-login-btn" onClick={() => navigate("/login")}>
            Log in
          </button>
        </div>

        <div className="welcome-hero-content">
          <div className="welcome-hero-text">
            <h1 className="welcome-headline">
              Preserve it.<br />
              Keep it <span className="highlight-green">fresh.</span><br />
              Earn <span className="highlight-orange">more.</span>
            </h1>
            <p className="welcome-subtext">
              ZeroSpoil helps farmers and buyers reduce tomato losses with smart
              tracking, secure payments, and real-time logistics alerts.
            </p>
            <button className="get-started-btn" onClick={scrollToRoles}>
              Get Started <ArrowIcon />
            </button>
          </div>
          <div className="welcome-hero-image-wrap">
            <img src={heroImage} alt="Fresh tomatoes" className="welcome-hero-image" loading="lazy" />
          </div>
        </div>
      </div>

      <div className="welcome-body">
        <div className="section-heading">
          <span className="heading-divider"></span>
          <h2>Why ZeroSpoil?</h2>
          <span className="heading-divider"></span>
        </div>

        <div className="welcome-cards">
          <div className="welcome-card">
            <div className="welcome-card-icon icon-green">
              <TrackIcon />
            </div>
            <h3 className="welcome-card-title">Track Your Produce</h3>
            <p className="welcome-card-text">
              Follow your tomatoes from farm to market in real time, every step of the way.
            </p>
            <span className="card-underline underline-green"></span>
          </div>

          <div className="welcome-card">
            <div className="welcome-card-icon icon-orange">
              <WalletIcon />
            </div>
            <h3 className="welcome-card-title">Get Paid Faster</h3>
            <p className="welcome-card-text">
              Receive payments instantly through secure escrow, no more waiting on buyers.
            </p>
            <span className="card-underline underline-orange"></span>
          </div>

          <div className="welcome-card">
            <div className="welcome-card-icon icon-green">
              <BellIcon />
            </div>
            <h3 className="welcome-card-title">Cut Spoilage</h3>
            <p className="welcome-card-text">
              Smart logistics alerts help you avoid delays and keep your harvest fresh.
            </p>
            <span className="card-underline underline-green"></span>
          </div>
        </div>

        <div id="role-section" className="section-heading role-heading">
          <span className="heading-divider"></span>
          <h2>Select Your Role to Continue</h2>
          <span className="heading-divider"></span>
        </div>

        <div className="welcome-role-cards">
          <button className="role-card role-card-farmer" onClick={() => handleRoleSelect("farmer")}>
            <div className="role-card-icon"><FarmerIcon /></div>
            <p className="role-card-label">I'm a</p>
            <p className="role-card-name">FARMER</p>
            <p className="role-card-tagline">Grow. Track. Sell. Thrive.</p>
            <span className="role-card-arrow"><ArrowIcon /></span>
          </button>

          <button className="role-card role-card-buyer" onClick={() => handleRoleSelect("buyer")}>
            <div className="role-card-icon"><BuyerIcon /></div>
            <p className="role-card-label">I'm a</p>
            <p className="role-card-name">BUYER</p>
            <p className="role-card-tagline">Source fresh. Buy better.</p>
            <span className="role-card-arrow"><ArrowIcon /></span>
          </button>
        </div>

        <div className="trust-footer">
          <p className="trust-heading">
            <ShieldIcon /> Trusted. Transparent. Built for freshness.
          </p>
          <div className="trust-badges">
            <span><ShieldIcon /> Secure & Reliable</span>
            <span><LeafIcon /> Reduce Food Loss</span>
            <span><PeopleIcon /> Empower Communities</span>
            <span><ChartIcon /> Increase Profits</span>
          </div>
        </div>
      </div>
    </div>
  );
}
