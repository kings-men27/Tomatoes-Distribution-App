import "./Wallet.css";

const dummyTransactions = [
  { id: 1, label: "Transfer from ZeroSpoil", date: "Jul 20, 2026", amount: "+N100,000", type: "credit" },
  { id: 2, label: "Withdrawal to Bank", date: "Jul 18, 2026", amount: "-N50,000", type: "debit" },
  { id: 3, label: "Transfer from ZeroSpoil", date: "Jul 15, 2026", amount: "+N85,000", type: "credit" },
];

export default function Wallet() {
  return (
    <div className="wallet-page">
      <h1 className="wallet-heading">Wallet</h1>

      <div className="wallet-balance-card">
        <p className="wallet-balance-label">Available Balance</p>
        <p className="wallet-balance-value">N500,000.00</p>
        <button className="wallet-withdraw-btn">Withdraw</button>
      </div>

      <div className="wallet-section">
        <div className="wallet-section-header">
          <h2 className="wallet-section-title">Transactions</h2>
          <span className="wallet-view-all">See All</span>
        </div>

        <div className="wallet-transactions-list">
          {dummyTransactions.map((tx) => (
            <div className="wallet-transaction-card" key={tx.id}>
              <div>
                <p className="wallet-transaction-label">{tx.label}</p>
                <p className="wallet-transaction-date">{tx.date}</p>
              </div>
              <span className={`wallet-transaction-amount ${tx.type}`}>{tx.amount}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="wallet-section">
        <h2 className="wallet-section-title">Bank Details</h2>
        <div className="wallet-bank-card">
          <div className="wallet-bank-row">
            <span className="wallet-bank-label">Bank Name</span>
            <span className="wallet-bank-value">Opay Digital Services</span>
          </div>
          <div className="wallet-bank-row">
            <span className="wallet-bank-label">Account Name</span>
            <span className="wallet-bank-value">Kingsley Kalu</span>
          </div>
          <div className="wallet-bank-row">
            <span className="wallet-bank-label">Account Number</span>
            <span className="wallet-bank-value">8023456789</span>
          </div>
        </div>
      </div>
    </div>
  );
}
