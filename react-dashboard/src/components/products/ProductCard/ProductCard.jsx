import { useDispatch, useSelector } from "react-redux";
import { addCartItem } from "../../../features/cart/cartSlice";
import { selectWishlistItems } from "../../../features/wishlist/selectors";
import { toggleWishlistItemAsync } from "../../../features/wishlist/wishlistSlice";
import { formatCurrency } from "../../../utils/formatters";
import "./ProductCard.css";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const wishlistItems = useSelector(selectWishlistItems);
  const inStock = (product.stock ?? 0) > 0;
  const isWishlisted = wishlistItems.some((item) => item.id === product.id);

  return (
    <article className="product-row">
      <div className="product-row__image">
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          width="84"
          height="84"
        />
      </div>

      <div className="product-row__title">
        <h3>{product.title}</h3>
      </div>

      <div className="product-row__brand">
        <span>{product.brand ?? "No Brand"}</span>
      </div>

      <div className="product-row__category">
        <span>{product.category}</span>
      </div>

      <div className="product-row__price">
        <span className="price-text">{formatCurrency(product.price)}</span>
      </div>

      <div className="product-row__rating">
        <span>{Number(product.rating ?? 0).toFixed(2)}</span>
      </div>

      <div className={`product-row__stock${inStock ? "" : " product-row__stock--out"}`}>
        {product.stock ?? 0}
      </div>

      <div className="product-row__actions">
        <button
          className="table-cart-button"
          disabled={!inStock}
          onClick={() => dispatch(addCartItem(product))}
        >
          Add To Cart
        </button>
        <button
          className={`table-wishlist-button${
            isWishlisted ? " table-wishlist-button--active" : ""
          }`}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          onClick={() => dispatch(toggleWishlistItemAsync(product))}
          type="button"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 21.3 10.6 20C5.4 15.3 2 12.2 2 8.4 2 5.3 4.4 3 7.5 3c1.7 0 3.4.8 4.5 2.1C13.1 3.8 14.8 3 16.5 3 19.6 3 22 5.3 22 8.4c0 3.8-3.4 6.9-8.6 11.6L12 21.3Z" />
          </svg>
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
