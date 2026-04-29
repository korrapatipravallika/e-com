import { lazy, Suspense, useEffect, useDeferredValue, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useDebouncedValue from "../../../hooks/useDebouncedValue/useDebouncedValue";
import {
  fetchProducts,
  setBrand,
  setCategory,
  setCurrentPage,
  setMaxPrice,
  setMinPrice,
  setMinRating,
  setSearchTerm,
} from "../../../features/products/productSlice";
import {
  selectBrands,
  selectCategories,
  selectPaginatedProducts,
  selectPaginationMeta,
} from "../../../features/products/selectors";
import Pagination from "../Pagination/Pagination";
import SidebarFilter from "../SidebarFilter/SidebarFilter";
import "./ProductList.css";

const ProductCard = lazy(() => import("../ProductCard/ProductCard"));

function ProductList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productsState = useSelector((state) => state.products);
  const [searchInput, setSearchInput] = useState(productsState.searchTerm);
  const [draftCategory, setDraftCategory] = useState(productsState.selectedCategory);
  const [draftBrand, setDraftBrand] = useState(productsState.selectedBrand);
  const [draftMinPrice, setDraftMinPrice] = useState(productsState.minPrice);
  const [draftMaxPrice, setDraftMaxPrice] = useState(productsState.maxPrice);
  const [draftMinRating, setDraftMinRating] = useState(productsState.minRating);
  const categories = useSelector(selectCategories);
  const brands = useSelector(selectBrands);
  const paginatedProducts = useSelector(selectPaginatedProducts);
  const paginationMeta = useSelector(selectPaginationMeta);

  const debouncedSearch = useDebouncedValue(searchInput, 500);
  const deferredProducts = useDeferredValue(paginatedProducts);

  useEffect(() => {
    if (productsState.status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, productsState.status]);

  useEffect(() => {
    dispatch(setSearchTerm(debouncedSearch));
  }, [debouncedSearch, dispatch]);

  useEffect(() => {
    dispatch(setCategory(draftCategory));
    dispatch(setBrand(draftBrand));
    dispatch(setMinPrice(draftMinPrice));
    dispatch(setMaxPrice(draftMaxPrice));
    dispatch(setMinRating(draftMinRating));
  }, [
    dispatch,
    draftBrand,
    draftCategory,
    draftMaxPrice,
    draftMinPrice,
    draftMinRating,
  ]);

  return (
    <section className="catalog-layout table-layout">
      <button className="back-home-button" type="button" onClick={() => navigate("/")}>
        Back to Homepage
      </button>

      <h2 className="product-table-title">Product Table</h2>

      <SidebarFilter
        categories={categories}
        brands={brands}
        minPrice={draftMinPrice}
        maxPrice={draftMaxPrice}
        minRating={draftMinRating}
        searchValue={searchInput}
        selectedBrand={draftBrand}
        selectedCategory={draftCategory}
        onBrandChange={setDraftBrand}
        onCategoryChange={setDraftCategory}
        onMinPriceChange={setDraftMinPrice}
        onMaxPriceChange={setDraftMaxPrice}
        onMinRatingChange={setDraftMinRating}
        onSearchChange={(event) => setSearchInput(event.target.value)}
      />

      <div className="table-card table-card--flat">
        {productsState.status === "loading" ? (
          <div className="empty-state">Loading products...</div>
        ) : productsState.error ? (
          <div className="empty-state error-state">{productsState.error}</div>
        ) : (
          <>
            <div className="table-header">
              <span>Image</span>
              <span>Title</span>
              <span>Brand</span>
              <span>Category</span>
              <span>Price</span>
              <span>Rating</span>
              <span>Stock</span>
              <span>Action</span>
            </div>

            <div className="product-list">
              <Suspense fallback={<div className="empty-state">Loading cards...</div>}>
                {deferredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))}
              </Suspense>
            </div>

            {deferredProducts.length === 0 ? (
              <div className="empty-state">No products match the selected filters.</div>
            ) : null}

            <Pagination
              currentPage={paginationMeta.currentPage}
              totalPages={paginationMeta.totalPages}
              onChange={(page) => dispatch(setCurrentPage(page))}
            />
          </>
        )}
      </div>
    </section>
  );
}

export default ProductList;
