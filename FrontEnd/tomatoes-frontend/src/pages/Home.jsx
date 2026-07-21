import { useState } from "react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import StatCard from "../components/ui/StatCard";
import tomatoImage from "../assets/images/home-image.jpg";
import "./Home.css";

const dummyShipments = [
  { id: 1, route: "Kano to Lagos", crates: 45, status: "In Transit" },
  { id: 2, route: "Kaduna to Abuja", crates: 20, status: "Delivered" },
  { id: 3, route: "Plateau to Port Harcourt", crates: 30, status: "Pending" },
];

const CrateIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2"></rect>
    <path d="M3 9h18M9 3v18"></path>
  </svg>
);

const TruckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="6" width="14" height="10" rx="1"></rect>
    <path d="M15 10h4l3 3v3h-7z"></path>
    <circle cx="6" cy="18" r="2"></circle>
    <circle cx="18" cy="18" r="2"></circle>
  </svg>
);

const WalletIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="6" width="20" height="14" rx="2"></rect>
    <path d="M2 10h20"></path>
    <circle cx="16" cy="15" r="1.5"></circle>
  </svg>
);

const RouteIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="6" cy="12" r="2"></circle>
    <circle cx="18" cy="12" r="2"></circle>
    <path d="M8 12h8"></path>
  </svg>
);

function StatusBadge({ status }) {
  const statusClass = status.toLowerCase().replace(" ", "-");
  return <span className={`status-badge status-${statusClass}`}>{status}</span>;
}

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    harvestDate: "",
    availableQuantity: "",
    pricePerBasket: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDone = () => {
    // TODO: Replace with real API call once backend endpoint is ready
    // e.g. await api.post("/tomatoes", formData);
    console.log("Listing submitted:", formData);
    setShowForm(false);
  };

  return (
    <div className="home-page">
      <img src={tomatoImage} alt="Fresh tomatoes" className="home-image" loading="lazy" />

      <button
        className="list-toggle-btn"
        onClick={() => setShowForm(!showForm)}
      >
        <span>LIST TOMATOES</span>
        <span className={`toggle-circle ${showForm ? "toggle-on" : ""}`}></span>
      </button>

      {showForm && (
        <div className="home-form">
          <Input
            label="HARVEST DATE:"
            name="harvestDate"
            type="date"
            value={formData.harvestDate}
            onChange={handleChange}
          />
          <Input
            label="AVAILABLE QUANTITY:"
            name="availableQuantity"
            type="number"
            value={formData.availableQuantity}
            onChange={handleChange}
          />
          <Input
            label="PRICE/BASKET:"
            name="pricePerBasket"
            type="number"
            value={formData.pricePerBasket}
            onChange={handleChange}
          />

          <Button variant="primary" className="done-btn" onClick={handleDone}>
            DONE
          </Button>
        </div>
      )}

      <div className="home-stats-row">
        <StatCard label="Total Crates" value="500" icon={<CrateIcon />} accent="green" />
        <StatCard label="Sold Out" value="300" icon={<TruckIcon />} accent="orange" />
        <StatCard label="Active Shipments" value="2" icon={<TruckIcon />} accent="orange" />
        <StatCard label="Total Revenue" value="N142,000" icon={<WalletIcon />} accent="blue" />
      </div>

      <div className="shipments-section">
        <h2 className="shipments-heading">
          Ongoing Shipments
          <span className="view-all-link">View All</span>
        </h2>

        <div className="shipments-list">
          {dummyShipments.map((shipment) => (
            <div className="shipment-card" key={shipment.id}>
              <div className="shipment-info">
                <span className="shipment-route-icon"><RouteIcon /></span>
                <div>
                  <p className="shipment-route">{shipment.route}</p>
                  <p className="shipment-crates">{shipment.crates} crates</p>
                </div>
              </div>
              <StatusBadge status={shipment.status} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
