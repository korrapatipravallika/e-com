import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../features/auth/authSlice";
import {
  selectCartCount,
  selectCartItems,
  selectCartTotals,
} from "../../../features/cart/selectors";
import { selectWishlistCount } from "../../../features/wishlist/selectors";
import { formatCurrency } from "../../../utils/formatters";
import "./Navbar.css";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartCount = useSelector(selectCartCount);
  const cartItems = useSelector(selectCartItems);
  const cartTotals = useSelector(selectCartTotals);
  const wishlistCount = useSelector(selectWishlistCount);
  const [showCartSummary, setShowCartSummary] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  const handleContinue = () => {
    setShowCartSummary(false);
    navigate("/address");
  };

  return (
    <header className="topbar">
      <div>
        <h1>E-COMMERCE</h1>
      </div>

      <nav className="nav-links">
        <div className="cart-menu">
          <button
            className="cart-icon-button"
            aria-label="Cart summary"
            onClick={() => setShowCartSummary((current) => !current)}
            type="button"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2Zm10 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2ZM7.2 14.6h8.9c.8 0 1.5-.4 1.8-1.1L21 6.2 19.2 5l-3.1 7.1H7.6L4.3 2H1v2h1.8l3.1 9.3-1.2 2.2C4 16.8 4.9 18 6.3 18H20v-2H6.3l.9-1.4Z" />
            </svg>
            <span className="cart-badge">{cartCount}</span>
          </button>

          {showCartSummary ? (
            <div className="cart-popover">
              {cartItems.length === 0 ? (
                <p className="cart-popover__empty">Your cart is empty.</p>
              ) : (
                <div className="cart-popover__items">
                  {cartItems.map((item) => (
                    <article className="cart-popover__item" key={item.id}>
                      <img src={item.thumbnail} alt={item.title} />
                      <div>
                        <strong>{item.title}</strong>
                        <span>
                          Qty {item.quantity} x {formatCurrency(item.price)}
                        </span>
                      </div>
                    </article>
                  ))}
                </div>
              )}

              <div className="cart-popover__row cart-popover__row--total">
                <span>Total amount</span>
                <strong>{formatCurrency(cartTotals.grandTotal)}</strong>
              </div>
              <button
                className="cart-popover__view"
                onClick={() => {
                  setShowCartSummary(false);
                  navigate("/cart");
                }}
                type="button"
              >
                View Cart
              </button>
              <button
                className="cart-popover__continue"
                disabled={cartCount === 0}
                onClick={handleContinue}
                type="button"
              >
                Continue
              </button>
            </div>
          ) : null}
        </div>
        <button
          className="wishlist-icon-button"
          aria-label="Wishlist"
          onClick={() => navigate("/wishlist")}
          type="button"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 21.3 10.6 20C5.4 15.3 2 12.2 2 8.4 2 5.3 4.4 3 7.5 3c1.7 0 3.4.8 4.5 2.1C13.1 3.8 14.8 3 16.5 3 19.6 3 22 5.3 22 8.4c0 3.8-3.4 6.9-8.6 11.6L12 21.3Z" />
          </svg>
          <span className="cart-badge">{wishlistCount}</span>
        </button>
        <button className="nav-logout" onClick={handleLogout}>
          Logout
        </button>
      </nav>
    </header>
  );
}

export default Navbar;
