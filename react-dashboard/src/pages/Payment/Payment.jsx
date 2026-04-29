import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartItems, selectCartTotals } from "../../features/cart/selectors";
import { formatCurrency } from "../../utils/formatters";
import "../Address/Address.css";
import "./Payment.css";
import CashOnDeliveryOption from "./CashOnDeliveryOption";
import UpiOption from "./UpiOption";
import CardOption from "./CardOption";
import EmiOption from "./EmiOption";

const checkoutSteps = [
  { number: 1, label: "My Cart", status: "done", path: "/cart" },
  { number: 2, label: "Address", status: "done", path: "/address" },
  { number: 3, label: "Payment", status: "active", path: "/payment" },
  { number: 4, label: "Order Confirm", status: "upcoming", path: "/order-confirm" },
];

function Payment() {
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const totals = useSelector(selectCartTotals);
  const [selectedMethod, setSelectedMethod] = useState("cod");
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  const isCardNumberValid = /^\d{16}$/.test(cardNumber.replace(/\s+/g, ""));

  const paymentModes = [
    { key: "cod", label: "Cash On Delivery" },
    { key: "upi", label: "UPI (Pay Via Any App)" },
    { key: "card", label: "Credit / Debit Cards" },
    { key: "emi", label: "EMI" },
  ];

  const actionLabel = selectedMethod === "cod" ? "Continue" : "Pay Now";
  const isPaymentActionDisabled =
    cartItems.length === 0 || (selectedMethod === "card" && !isCardNumberValid);

  const handleConfirm = () => {
    navigate("/order-confirm");
  };

  const methodPanels = {
    cod: <CashOnDeliveryOption />,
    upi: <UpiOption upiId={upiId} setUpiId={setUpiId} />,
    card: (
      <CardOption
        cardNumber={cardNumber}
        setCardNumber={setCardNumber}
        cardName={cardName}
        setCardName={setCardName}
        cardExpiry={cardExpiry}
        setCardExpiry={setCardExpiry}
        cardCvv={cardCvv}
        setCardCvv={setCardCvv}
      />
    ),
    emi: <EmiOption />,
  };

  return (
    <section className="address-page">
      <div className="address-shell">
        <div className="address-intro">
          <div>
            <p className="eyebrow">Checkout flow</p>
            <h2>Payment</h2>
            <p className="address-subtitle">
              Review your amount and continue to confirm the order.
            </p>
          </div>
          <Link className="ghost-button address-back-link" to="/address">
            Back to address
          </Link>
        </div>

        <div className="checkout-steps">
          {checkoutSteps.map((step) => (
            <Link
              key={step.number}
              className={`checkout-step checkout-step--${step.status}`}
              to={step.path}
            >
              <span className="checkout-step__number">{step.number}</span>
              <span className="checkout-step__label">{step.label}</span>
            </Link>
          ))}
        </div>

        <div className="address-layout payment-layout">
          <section className="address-card payment-card">
            <h3 className="payment-title">Choose Payment Mode</h3>
            <div className="payment-body">
              <div className="payment-mode-list">
                {paymentModes.map((mode) => (
                  <button
                    key={mode.key}
                    className={`payment-mode-button ${
                      selectedMethod === mode.key ? "payment-mode-button--active" : ""
                    }`}
                    type="button"
                    onClick={() => setSelectedMethod(mode.key)}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>
              {methodPanels[selectedMethod]}
            </div>

            <button
              className="address-button payment-cta"
              disabled={isPaymentActionDisabled}
              onClick={handleConfirm}
              type="button"
            >
              {actionLabel}
            </button>
          </section>

          <aside className="address-summary">
            <section className="address-card address-summary-card">
              <p className="address-card__eyebrow">Estimates Delivery Time</p>
              <h3>27 Dec 2025</h3>

              <div className="address-summary__rows">
                <div className="address-summary__row">
                  <span>Price ({itemCount} items)</span>
                  <strong>{formatCurrency(totals.subtotal)}</strong>
                </div>
                <div className="address-summary__row">
                  <span>Discount</span>
                  <strong className="payment-discount">-{formatCurrency(totals.discount)}</strong>
                </div>
                <div className="address-summary__row">
                  <span>Platform Fee</span>
                  <strong>{formatCurrency(totals.delivery)}</strong>
                </div>
                <div className="address-summary__row address-summary__row--total">
                  <span>Total Amount</span>
                  <strong>{formatCurrency(totals.grandTotal)}</strong>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default Payment;
