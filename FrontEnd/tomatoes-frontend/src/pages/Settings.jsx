import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import "./Settings.css";

export default function Settings() {
  const navigate = useNavigate();
  const [openSection, setOpenSection] = useState(null);

  const [profile, setProfile] = useState({ name: "Kalu", email: "kalu@example.com", phone: "" });
  const [bank, setBank] = useState({ bankName: "", accountName: "", accountNumber: "" });
  const [password, setPassword] = useState({ current: "", newPass: "", confirm: "" });

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const saveProfile = (e) => {
    e.preventDefault();
    // TODO: connect to real API
    console.log("Profile saved:", profile);
    setOpenSection(null);
  };

  const saveBank = (e) => {
    e.preventDefault();
    console.log("Bank details saved:", bank);
    setOpenSection(null);
  };

  const savePassword = (e) => {
    e.preventDefault();
    if (password.newPass !== password.confirm) {
      alert("New passwords do not match.");
      return;
    }
    console.log("Password changed");
    setOpenSection(null);
  };

  return (
    <div className="settings-page">
      <h1 className="settings-heading">Settings</h1>

      <div className="settings-profile-card">
        <div className="settings-avatar">User</div>
        <div>
          <p className="settings-name">{profile.name}</p>
          <p className="settings-email">{profile.email}</p>
        </div>
      </div>

      <div className="settings-section">
        <p className="settings-section-title">Account</p>

        <button className="settings-item" onClick={() => toggleSection("profile")}>
          <span>Edit Profile</span>
          <span className="settings-arrow">{openSection === "profile" ? "?" : "›"}</span>
        </button>
        {openSection === "profile" && (
          <form className="settings-form" onSubmit={saveProfile}>
            <Input label="NAME:" name="name" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
            <Input label="EMAIL:" name="email" type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
            <Input label="PHONE:" name="phone" type="tel" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />
            <Button type="submit" variant="primary" className="settings-save-btn">Save Changes</Button>
          </form>
        )}

        <button className="settings-item" onClick={() => toggleSection("bank")}>
          <span>Bank Details</span>
          <span className="settings-arrow">{openSection === "bank" ? "?" : "›"}</span>
        </button>
        {openSection === "bank" && (
          <form className="settings-form" onSubmit={saveBank}>
            <Input label="BANK NAME:" name="bankName" value={bank.bankName} onChange={(e) => setBank({ ...bank, bankName: e.target.value })} />
            <Input label="ACCOUNT NAME:" name="accountName" value={bank.accountName} onChange={(e) => setBank({ ...bank, accountName: e.target.value })} />
            <Input label="ACCOUNT NUMBER:" name="accountNumber" value={bank.accountNumber} onChange={(e) => setBank({ ...bank, accountNumber: e.target.value })} />
            <Button type="submit" variant="primary" className="settings-save-btn">Save Changes</Button>
          </form>
        )}

        <button className="settings-item" onClick={() => toggleSection("password")}>
          <span>Change Password</span>
          <span className="settings-arrow">{openSection === "password" ? "?" : "›"}</span>
        </button>
        {openSection === "password" && (
          <form className="settings-form" onSubmit={savePassword}>
            <Input label="CURRENT PASSWORD:" name="current" type="password" value={password.current} onChange={(e) => setPassword({ ...password, current: e.target.value })} />
            <Input label="NEW PASSWORD:" name="newPass" type="password" value={password.newPass} onChange={(e) => setPassword({ ...password, newPass: e.target.value })} />
            <Input label="CONFIRM NEW PASSWORD:" name="confirm" type="password" value={password.confirm} onChange={(e) => setPassword({ ...password, confirm: e.target.value })} />
            <Button type="submit" variant="primary" className="settings-save-btn">Update Password</Button>
          </form>
        )}
      </div>

      <div className="settings-section">
        <p className="settings-section-title">Preferences</p>

        <button className="settings-item" onClick={() => toggleSection("notifications")}>
          <span>Notifications</span>
          <span className="settings-arrow">{openSection === "notifications" ? "?" : "›"}</span>
        </button>
        {openSection === "notifications" && (
          <div className="settings-form">
            <label className="settings-toggle-row">
              <span>Push Notifications</span>
              <input type="checkbox" defaultChecked />
            </label>
            <label className="settings-toggle-row">
              <span>Email Alerts</span>
              <input type="checkbox" defaultChecked />
            </label>
            <label className="settings-toggle-row">
              <span>SMS Alerts</span>
              <input type="checkbox" />
            </label>
          </div>
        )}

        <button className="settings-item" onClick={() => toggleSection("language")}>
          <span>Language</span>
          <span className="settings-arrow">{openSection === "language" ? "?" : "›"}</span>
        </button>
        {openSection === "language" && (
          <div className="settings-form">
            <label className="settings-radio-row">
              <input type="radio" name="lang" defaultChecked /> English
            </label>
            <label className="settings-radio-row">
              <input type="radio" name="lang" /> Hausa
            </label>
            <label className="settings-radio-row">
              <input type="radio" name="lang" /> Yoruba
            </label>
            <label className="settings-radio-row">
              <input type="radio" name="lang" /> Igbo
            </label>
          </div>
        )}
      </div>

      <button className="settings-logout" onClick={handleLogout}>
        Log Out
      </button>
    </div>
  );
}
