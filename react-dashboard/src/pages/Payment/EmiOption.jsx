function EmiOption() {
  return (
    <div className="payment-method-content">
      <h3>EMI</h3>
      <p className="payment-method-hint payment-method-hint--dark">
        EMI options are available for select cards and order values.
      </p>
      <label className="payment-field">
        <span>Choose tenure</span>
        <select defaultValue="3 months">
          <option>3 months</option>
          <option>6 months</option>
          <option>9 months</option>
          <option>12 months</option>
        </select>
      </label>
    </div>
  );
}

export default EmiOption;
