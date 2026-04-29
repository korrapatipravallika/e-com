function UpiOption({ upiId, setUpiId }) {
  return (
    <div className="payment-method-content">
      <h3>UPI (Pay Via Any App)</h3>
      <label className="payment-radio">
        <input type="radio" checked readOnly />
        <span>Pay with any UPI app</span>
      </label>
      <p className="payment-divider">----- or -----</p>
      <label className="payment-field">
        <span>Pay with UPI ID</span>
        <input
          type="text"
          placeholder="example@okicici"
          value={upiId}
          onChange={(event) => setUpiId(event.target.value)}
        />
      </label>
    </div>
  );
}

export default UpiOption;
