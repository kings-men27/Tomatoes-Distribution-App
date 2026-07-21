import { useState } from "react";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import Button from "../components/ui/Button";
import "./Prediction.css";

const initialState = {
  harvestDate: "",
  harvestTime: "",
  originState: "",
  destinationMarket: "",
  quantity: "",
  ripeness: "",
  damage: "",
  packaging: "",
  storage: "",
  transport: "",
};

export default function Prediction() {
  const [formData, setFormData] = useState(initialState);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Replace with real API call to prediction model once backend/data science endpoint is ready
    // e.g. const response = await api.post("/predict", formData);
    setResult({
      prediction: "Spoiled",
      probability: 78.4,
      riskLevel: "High Risk",
    });
  };

  return (
    <div className="prediction-page">
      <h1 className="prediction-heading">AI Spoilage Risk Prediction</h1>
      <p className="prediction-subtext">
        Enter shipment details to predict the risk of tomato spoilage.
      </p>

      <form onSubmit={handleSubmit} className="prediction-form">
        <div className="prediction-section">
          <h2 className="section-title">Shipment Information</h2>
          <div className="field-grid">
            <Input
              label="HARVEST DATE:"
              name="harvestDate"
              type="date"
              value={formData.harvestDate}
              onChange={handleChange}
            />
            <Input
              label="HARVEST TIME:"
              name="harvestTime"
              type="time"
              value={formData.harvestTime}
              onChange={handleChange}
            />
            <Select
              label="ORIGIN STATE:"
              name="originState"
              value={formData.originState}
              onChange={handleChange}
              options={["Kano", "Kaduna", "Plateau", "Gombe"]}
            />
            <Select
              label="DESTINATION MARKET:"
              name="destinationMarket"
              value={formData.destinationMarket}
              onChange={handleChange}
              options={[
                "Mile 12 Market, Lagos",
                "Bodija Market, Ibadan",
                "Oil Mill Market, Port Harcourt",
                "Onitsha Market",
              ]}
            />
            <Input
              label="QUANTITY (CRATES):"
              name="quantity"
              type="number"
              value={formData.quantity}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="prediction-section">
          <h2 className="section-title">Tomato Condition</h2>
          <div className="field-grid">
            <Select
              label="RIPENESS LEVEL:"
              name="ripeness"
              value={formData.ripeness}
              onChange={handleChange}
              options={["Unripe", "Semi-ripe", "Ripe", "Overripe"]}
            />
            <Select
              label="VISIBLE DAMAGE LEVEL:"
              name="damage"
              value={formData.damage}
              onChange={handleChange}
              options={["None", "Low", "Moderate", "Severe"]}
            />
          </div>
        </div>

        <div className="prediction-section">
          <h2 className="section-title">Packaging and Storage</h2>
          <div className="field-grid">
            <Select
              label="PACKAGING TYPE:"
              name="packaging"
              value={formData.packaging}
              onChange={handleChange}
              options={["Plastic Crate", "Raffia Basket", "Wooden Crate", "Sack"]}
            />
            <Select
              label="STORAGE TYPE:"
              name="storage"
              value={formData.storage}
              onChange={handleChange}
              options={["Cold Storage", "Shaded Storage", "Open Storage", "No Storage"]}
            />
          </div>
        </div>

        <div className="prediction-section">
          <h2 className="section-title">Transport Information</h2>
          <div className="field-grid">
            <Select
              label="TRANSPORT MODE:"
              name="transport"
              value={formData.transport}
              onChange={handleChange}
              options={["Refrigerated Reefer Van", "Covered Truck", "Traditional Open Truck"]}
            />
          </div>
        </div>

        <Button type="submit" variant="primary" className="predict-btn">
          Predict Spoilage Risk
        </Button>
      </form>

      {result && (
        <div className="prediction-result">
          <h2 className="result-heading">Prediction Result</h2>
          <div className="result-cards">
            <div className="result-card">
              <p className="result-label">Prediction</p>
              <p className="result-value result-value-danger">{result.prediction}</p>
            </div>
            <div className="result-card">
              <p className="result-label">Spoilage Probability</p>
              <p className="result-value">{result.probability}%</p>
            </div>
            <div className="result-card">
              <p className="result-label">Risk Level</p>
              <p className="result-value result-value-danger">{result.riskLevel}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
