import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartItems, selectCartTotals } from "../../features/cart/selectors";
import { formatCurrency } from "../../utils/formatters";
import "../Address/Address.css";

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
  const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

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

        <div className="address-layout">
          <section className="address-card">
            <div className="address-card__header">
              <div>
                <p className="address-card__eyebrow">Payment method</p>
                <h3>Cash on Delivery</h3>
              </div>
            </div>
            <p className="address-subtitle">
              Payment will be collected when the order is delivered.
            </p>
          </section>

          <aside className="address-summary">
            <section className="address-card address-summary-card">
              <p className="address-card__eyebrow">Order total</p>
              <h3>{formatCurrency(totals.grandTotal)}</h3>

              <div className="address-summary__rows">
                <div className="address-summary__row">
                  <span>Price ({itemCount} items)</span>
                  <strong>{formatCurrency(totals.subtotal)}</strong>
                </div>
                <div className="address-summary__row">
                  <span>Delivery Fee</span>
                  <strong>{formatCurrency(totals.delivery)}</strong>
                </div>
                <div className="address-summary__row address-summary__row--total">
                  <span>Total Amount</span>
                  <strong>{formatCurrency(totals.grandTotal)}</strong>
                </div>
              </div>

              <button
                className="address-button address-button--primary address-summary__cta"
                disabled={cartItems.length === 0}
                onClick={() => navigate("/order-confirm")}
                type="button"
              >
                Confirm Order
              </button>
            </section>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default Payment;
