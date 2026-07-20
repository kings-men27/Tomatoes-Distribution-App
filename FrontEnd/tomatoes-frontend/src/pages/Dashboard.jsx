import StatCard from "../components/ui/StatCard";
import "./Dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>ZEROSPOILS EXECUTIVE DASHBOARD</h1>
      </div>

      <div className="dashboard-kpi-row">
        <StatCard label="Delivered Revenue" value="N0" />
        <StatCard label="Total Food Saved (KG)" value="0" />
        <StatCard label="Platform Spoilage %" value="0%" />
      </div>

      <div className="dashboard-chart-row">
        <div className="chart-placeholder">
          <h2>Route Leaderboard</h2>
          <p className="chart-empty-text">Chart coming in Phase 3</p>
        </div>

        <div className="chart-placeholder">
          <h2>Seasonality Price Trend</h2>
          <p className="chart-empty-text">Chart coming in Phase 3</p>
        </div>
      </div>

      <div className="dashboard-chart-row">
        <div className="chart-placeholder full-width">
          <h2>Spoilage Rate by Packaging Type</h2>
          <p className="chart-empty-text">Chart coming in Phase 3</p>
        </div>
      </div>

      <div className="dashboard-map-section">
        <h2>Map Section</h2>
        <p className="chart-empty-text">Map coming in Phase 4</p>
      </div>
    </div>
  );
}
