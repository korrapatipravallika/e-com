import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartItems, selectCartTotals } from "../../features/cart/selectors";
import { formatCurrency } from "../../utils/formatters";
import "../Address/Address.css";

const checkoutSteps = [
  { number: 1, label: "My Cart", status: "done", path: "/cart" },
  { number: 2, label: "Address", status: "done", path: "/address" },
  { number: 3, label: "Payment", status: "done", path: "/payment" },
  { number: 4, label: "Order Confirm", status: "active", path: "/order-confirm" },
];

function OrderConfirm() {
  const cartItems = useSelector(selectCartItems);
  const totals = useSelector(selectCartTotals);
  const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <section className="address-page">
      <div className="address-shell">
        <div className="address-intro">
          <div>
            <p className="eyebrow">Checkout flow</p>
            <h2>Order Confirmed</h2>
            <p className="address-subtitle">
              Your order has been placed successfully.
            </p>
          </div>
          <Link className="ghost-button address-back-link" to="/products-table">
            Continue shopping
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

        <section className="address-card address-summary-card">
          <p className="address-card__eyebrow">Order summary</p>
          <h3>{itemCount} item{itemCount === 1 ? "" : "s"} ordered</h3>
          <div className="address-summary__row address-summary__row--total">
            <span>Total Amount</span>
            <strong>{formatCurrency(totals.grandTotal)}</strong>
          </div>
        </section>
      </div>
    </section>
  );
}

export default OrderConfirm;
