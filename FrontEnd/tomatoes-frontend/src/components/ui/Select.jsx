import "./Select.css";

export default function Select({
  label,
  name,
  value,
  onChange,
  options = [],
  placeholder = "Select",
  className = "",
}) {
  return (
    <div className={`input-group ${className}`}>
      {label && <label className="input-label">{label}</label>}
      <select name={name} value={value} onChange={onChange} className="select-field">
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
