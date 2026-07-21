import "./StatCard.css";

export default function StatCard({ label, value, icon, accent = "green" }) {
  return (
    <div className={`stat-card accent-${accent}`}>
      {icon && <div className="stat-card-icon">{icon}</div>}
      <div>
        <p className="stat-card-label">{label}</p>
        <p className="stat-card-value">{value}</p>
      </div>
    </div>
  );
}
