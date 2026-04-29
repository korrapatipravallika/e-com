import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addCartItem } from "../features/cart/cartSlice";
import { selectWishlistItems } from "../features/wishlist/selectors";
import { toggleWishlistItemAsync } from "../features/wishlist/wishlistSlice";
import { formatCurrency } from "../utils/formatters";
import "./Wishlist.css";

function Wishlist() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wishlistItems = useSelector(selectWishlistItems);

  const handleMoveToCart = (item) => {
    dispatch(addCartItem(item));
    dispatch(toggleWishlistItemAsync(item));
  };

  return (
    <section className="wishlist-page">
      <div className="wishlist-card">
        <div className="wishlist-card__header">
          <div>
            <h2>Your Wishlist</h2>
            <p>
              {wishlistItems.length} item{wishlistItems.length === 1 ? "" : "s"} saved
            </p>
          </div>
          <button className="wishlist-back-button" onClick={() => navigate("/products-table")}>
            Continue Shopping
          </button>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="empty-state">Your wishlist is empty.</div>
        ) : (
          <div className="wishlist-list">
            {wishlistItems.map((item) => (
              <article key={item.id} className="wishlist-item">
                <img src={item.thumbnail} alt={item.title} />

                <div className="wishlist-item__details">
                  <h3>{item.title}</h3>
                  <p>{item.brand ?? item.category}</p>
                  <strong>{formatCurrency(item.price)}</strong>
                </div>

                <div className="wishlist-item__actions">
                  <button
                    className="wishlist-primary-button"
                    onClick={() => handleMoveToCart(item)}
                  >
                    Move to cart
                  </button>
                  <button
                    className="wishlist-secondary-button"
                    onClick={() => dispatch(toggleWishlistItemAsync(item))}
                  >
                    Remove
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Wishlist;
