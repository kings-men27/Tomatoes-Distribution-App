import "./Details.css";

const dummyDetail = {
  shipmentId: "SHP-10023",
  route: "Kano to Lagos",
  crates: 45,
  tomatoVariety: "Roma VF",
  quantity: "1,250 kg",
  transportMode: "Refrigerated Reefer Van",
  status: "In Transit",
  packaging: "Plastic Crate",
  storage: "Cold Storage",
  pricePerBasket: "N3,200",
  totalValue: "N144,000",
  driverName: "Musa Ibrahim",
  driverPhone: "080X-XXX-XXXX",
  vehiclePlate: "KN-234-XY",
  notes: "Handle with care. Cold chain must be maintained throughout transit.",
};

const dummyTimeline = [
  { label: "Order Confirmed", time: "Jul 18, 2026 - 8:00 AM", done: true },
  { label: "Picked Up from Farm", time: "Jul 18, 2026 - 10:30 AM", done: true },
  { label: "In Transit", time: "Jul 19, 2026 - 6:15 AM", done: true },
  { label: "Arrived at Checkpoint", time: "Jul 20, 2026 - 2:00 PM", done: false },
  { label: "Delivered", time: "Pending", done: false },
];

export default function Details() {
  return (
    <div className="details-page">
      <h1 className="details-heading">Shipment Details</h1>
      <p className="details-subtext">{dummyDetail.shipmentId}</p>

      <div className="details-card">
        <p className="details-card-title">Shipment Info</p>
        <div className="details-row">
          <span className="details-label">Route</span>
          <span className="details-value">{dummyDetail.route}</span>
        </div>
        <div className="details-row">
          <span className="details-label">Tomato Variety</span>
          <span className="details-value">{dummyDetail.tomatoVariety}</span>
        </div>
        <div className="details-row">
          <span className="details-label">Quantity</span>
          <span className="details-value">{dummyDetail.quantity}</span>
        </div>
        <div className="details-row">
          <span className="details-label">Crates</span>
          <span className="details-value">{dummyDetail.crates}</span>
        </div>
        <div className="details-row">
          <span className="details-label">Packaging</span>
          <span className="details-value">{dummyDetail.packaging}</span>
        </div>
        <div className="details-row">
          <span className="details-label">Storage</span>
          <span className="details-value">{dummyDetail.storage}</span>
        </div>
        <div className="details-row">
          <span className="details-label">Transport Mode</span>
          <span className="details-value">{dummyDetail.transportMode}</span>
        </div>
        <div className="details-row">
          <span className="details-label">Status</span>
          <span className="status-badge status-in-transit">{dummyDetail.status}</span>
        </div>
      </div>

      <div className="details-card">
        <p className="details-card-title">Driver & Vehicle</p>
        <div className="details-row">
          <span className="details-label">Driver Name</span>
          <span className="details-value">{dummyDetail.driverName}</span>
        </div>
        <div className="details-row">
          <span className="details-label">Driver Phone</span>
          <span className="details-value">{dummyDetail.driverPhone}</span>
        </div>
        <div className="details-row">
          <span className="details-label">Vehicle Plate</span>
          <span className="details-value">{dummyDetail.vehiclePlate}</span>
        </div>
      </div>

      <div className="details-card">
        <p className="details-card-title">Pricing</p>
        <div className="details-row">
          <span className="details-label">Price / Basket</span>
          <span className="details-value">{dummyDetail.pricePerBasket}</span>
        </div>
        <div className="details-row">
          <span className="details-label">Total Value</span>
          <span className="details-value details-value-highlight">{dummyDetail.totalValue}</span>
        </div>
      </div>

      <div className="details-card">
        <p className="details-card-title">Shipment Timeline</p>
        <div className="timeline">
          {dummyTimeline.map((step, idx) => (
            <div className="timeline-step" key={idx}>
              <span className={`timeline-dot ${step.done ? "done" : ""}`}></span>
              <div>
                <p className={`timeline-label ${step.done ? "done" : ""}`}>{step.label}</p>
                <p className="timeline-time">{step.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="details-card">
        <p className="details-card-title">Notes</p>
        <p className="details-notes">{dummyDetail.notes}</p>
      </div>
    </div>
  );
}
