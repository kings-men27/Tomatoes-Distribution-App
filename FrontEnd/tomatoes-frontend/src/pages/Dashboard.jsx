import { useState, useEffect } from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import StatCard from "../components/ui/StatCard";
import "./Dashboard.css";

const MOCK_RESPONSE = {
  success: true,
  data: {
    kpis: {
      totalFoodSavedKg: -1629.58,
      totalRevenueDeliveredNgn: 0,
      platformSpoilageRatePercent: 23.33,
    },
    corridorLeaderboard: [
      { originState: "Kaduna", destinationState: "Lagos", avgDelayHours: 0, avgTempC: 25 },
      { originState: "Gombe", destinationState: "Onitsha", avgDelayHours: 0, avgTempC: 25 },
      { originState: "Plateau", destinationState: "Ibadan", avgDelayHours: 0, avgTempC: 25 },
      { originState: "Kaduna", destinationState: "Port Harcourt", avgDelayHours: 0, avgTempC: 25 },
      { originState: "Kaduna", destinationState: "Ibadan", avgDelayHours: 0, avgTempC: 25 },
      { originState: "Gombe", destinationState: "Port Harcourt", avgDelayHours: 0, avgTempC: 25 },
      { originState: "Plateau", destinationState: "Port Harcourt", avgDelayHours: 0, avgTempC: 25 },
      { originState: "Plateau", destinationState: "Lagos", avgDelayHours: 0, avgTempC: 25 },
      { originState: "Plateau", destinationState: "Onitsha", avgDelayHours: 0, avgTempC: 25 },
      { originState: "Kano", destinationState: "Ibadan", avgDelayHours: 0, avgTempC: 25 },
      { originState: "Kano", destinationState: "Lagos", avgDelayHours: 0, avgTempC: 25 },
      { originState: "Kano", destinationState: "Port Harcourt", avgDelayHours: 0, avgTempC: 25 },
      { originState: "Gombe", destinationState: "Ibadan", avgDelayHours: 0, avgTempC: 25 },
      { originState: "Kaduna", destinationState: "Onitsha", avgDelayHours: 0, avgTempC: 25 },
      { originState: "Kano", destinationState: "Onitsha", avgDelayHours: 0, avgTempC: 25 },
      { originState: "Gombe", destinationState: "Lagos", avgDelayHours: 0, avgTempC: 25 },
    ],
    seasonalityTrends: [
      { season: "Rainy Season", avgPricePerCrate: 0 },
      { season: "Dry Season", avgPricePerCrate: 0 },
    ],
  },
};

function formatNaira(value) {
  return `\u20A6${Number(value).toLocaleString()}`;
}

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        setLoading(true);
        setError(null);

        // TODO: swap this block for the real API call once endpoint is available
        // const response = await api.get("/dashboard/summary");
        // setDashboardData(response.data.data);
        await new Promise((resolve) => setTimeout(resolve, 400));
        setDashboardData(MOCK_RESPONSE.data);
      } catch (err) {
        setError("Failed to load dashboard data. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="dashboard-page">
        <p className="dashboard-status-text">Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-page">
        <p className="dashboard-status-text dashboard-error-text">{error}</p>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="dashboard-page">
        <p className="dashboard-status-text">No dashboard data available.</p>
      </div>
    );
  }

  const { kpis, corridorLeaderboard, seasonalityTrends } = dashboardData;

  const routeChartData = corridorLeaderboard.map((item) => ({
    route: `${item.originState} to ${item.destinationState}`,
    avgDelayHours: item.avgDelayHours,
    avgTempC: item.avgTempC,
  }));

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>ZEROSPOILS EXECUTIVE DASHBOARD</h1>
      </div>

      <div className="dashboard-kpi-row">
        <StatCard label="Delivered Revenue" value={formatNaira(kpis.totalRevenueDeliveredNgn)} />
        <StatCard label="Total Food Saved (KG)" value={kpis.totalFoodSavedKg.toLocaleString()} />
        <StatCard label="Platform Spoilage %" value={`${kpis.platformSpoilageRatePercent}%`} />
      </div>

      <div className="dashboard-chart-row">
        <div className="chart-placeholder">
          <h2>Corridor Leaderboard</h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={routeChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="route" tick={{ fontSize: 9 }} angle={-30} textAnchor="end" height={70} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="avgDelayHours" name="Avg Delay (hrs)" fill="#1b4332" />
              <Bar dataKey="avgTempC" name="Avg Temp (C)" fill="#95c99a" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-placeholder">
          <h2>Seasonality Price Trend</h2>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={seasonalityTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="season" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Line type="monotone" dataKey="avgPricePerCrate" name="Avg Price/Crate" stroke="#1b4332" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="dashboard-map-section">
        <h2>Map Section</h2>
        <p className="chart-empty-text">Map coming in Phase 4 (react-leaflet)</p>
      </div>
    </div>
  );
}
