import "./StatCard.css";

export default function StatCard({ label, value, className = "" }) {
  return (
    <div className={`stat-card ${className}`}>
      <p className="stat-card-label">{label}</p>
      <p className="stat-card-value">{value}</p>
    </div>
  );
}
