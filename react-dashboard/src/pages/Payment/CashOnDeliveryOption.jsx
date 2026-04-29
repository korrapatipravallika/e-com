function CashOnDeliveryOption() {
  return (
    <div className="payment-method-content">
      <h3>Cash On Delivery</h3>
      <label className="payment-radio">
        <input type="radio" checked readOnly />
        <span>Cash on Delivery</span>
      </label>
      <p className="payment-method-hint">
        A fee of ₹10 is applicable for this option. Online payment can help you avoid this fee.
      </p>
    </div>
  );
}

export default CashOnDeliveryOption;
