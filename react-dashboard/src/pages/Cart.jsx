import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  clearCart,
  removeCartItem,
  updateCartQuantity,
} from "../features/cart/cartSlice";
import {
  selectCartCount,
  selectCartItems,
  selectCartTotals,
} from "../features/cart/selectors";
import { formatCurrency } from "../utils/formatters";
import "./Cart.css";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartCount = useSelector(selectCartCount);
  const cartItems = useSelector(selectCartItems);
  const totals = useSelector(selectCartTotals);
  const totalItems = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <section className="summary-page">
      <div className="summary-card">
        <div className="summary-card__header">
          <div>
            <h2>Cart</h2>
            <p className="summary-card__meta">
              {cartCount} item{cartCount === 1 ? "" : "s"} in your cart
            </p>
          </div>
          <div className="cart-header-actions">
            <button
              className="cart-back-button"
              onClick={() => navigate("/products-table")}
              type="button"
            >
              Back to Products
            </button>
            <button
              className="cart-clear-button"
              disabled={cartItems.length === 0}
              onClick={() => dispatch(clearCart())}
              type="button"
            >
              Clear cart
            </button>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-state">Your cart is empty.</div>
        ) : (
          <div className="summary-list">
            {cartItems.map((item) => (
              <article key={item.id} className="summary-item">
                <div className="summary-item__main">
                  <div className="summary-item__image">
                    <img src={item.thumbnail} alt={item.title} />
                  </div>

                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <p className="summary-item__line-total">
                      Price: {formatCurrency(item.price)} each
                    </p>
                  </div>
                </div>

                <div className="quantity-box">
                  <button
                    className="ghost-button"
                    onClick={() =>
                      dispatch(
                        updateCartQuantity({
                          productId: item.id,
                          quantity: item.quantity - 1,
                        })
                      )
                    }
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="ghost-button"
                    onClick={() =>
                      dispatch(
                        updateCartQuantity({
                          productId: item.id,
                          quantity: item.quantity + 1,
                        })
                      )
                    }
                  >
                    +
                  </button>
                </div>

                <button
                  className="summary-item__remove"
                  onClick={() => dispatch(removeCartItem(item.id))}
                >
                  Remove
                </button>
              </article>
            ))}
          </div>
        )}
      </div>

      <div className="summary-card totals-card">
        <h2>Cart totals</h2>
        <div className="totals-line">
          <span>Total items</span>
          <strong>{totalItems}</strong>
        </div>
        <div className="totals-line">
          <span>Selected products</span>
          <strong>{cartCount}</strong>
        </div>
        <div className="totals-line">
          <span>Subtotal</span>
          <strong>{formatCurrency(totals.subtotal)}</strong>
        </div>
        <div className="totals-line">
          <span>Delivery</span>
          <strong>{formatCurrency(totals.delivery)}</strong>
        </div>
        <div className="totals-line totals-line--grand">
          <span>Grand total</span>
          <strong>{formatCurrency(totals.grandTotal)}</strong>
        </div>
        <button
          className="primary-button cart-continue-button"
          disabled={cartItems.length === 0}
          onClick={() => navigate("/address")}
        >
          Continue
        </button>
      </div>
    </section>
  );
}

export default Cart;
