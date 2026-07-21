import "./Notifications.css";

const groupedNotifications = {
  Today: [
    { id: 1, title: "Shipment Delayed", message: "Your shipment to Lagos is delayed due to a checkpoint hold.", time: "10 mins ago", unread: true },
    { id: 2, title: "Payment Received", message: "You received N85,000 for your last delivery.", time: "2 hours ago", unread: true },
    { id: 3, title: "High Spoilage Risk", message: "Shipment SHP-10023 has a high predicted spoilage risk.", time: "4 hours ago", unread: true },
  ],
  Yesterday: [
    { id: 4, title: "Shipment Delivered", message: "Your shipment to Kaduna has been delivered successfully.", time: "Yesterday, 3:20 PM", unread: false },
    { id: 5, title: "New Buyer Order", message: "A buyer placed an order for 20 crates of Roma VF tomatoes.", time: "Yesterday, 11:00 AM", unread: false },
  ],
  "This Week": [
    { id: 6, title: "Price Alert", message: "Tomato prices at Mile 12 Market rose by 8% this week.", time: "3 days ago", unread: false },
    { id: 7, title: "Withdrawal Successful", message: "N50,000 was successfully withdrawn to your bank account.", time: "4 days ago", unread: false },
    { id: 8, title: "Account Verified", message: "Your farmer account has been fully verified.", time: "5 days ago", unread: false },
  ],
};

export default function Notifications() {
  return (
    <div className="notifications-page">
      <h1 className="notifications-heading">Notifications</h1>

      {Object.entries(groupedNotifications).map(([group, items]) => (
        <div className="notifications-group" key={group}>
          <p className="notifications-group-title">{group}</p>
          <div className="notifications-list">
            {items.map((note) => (
              <div className={`notification-card ${note.unread ? "unread" : ""}`} key={note.id}>
                {note.unread && <span className="unread-dot"></span>}
                <div className="notification-content">
                  <p className="notification-title">{note.title}</p>
                  <p className="notification-message">{note.message}</p>
                  <p className="notification-time">{note.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
