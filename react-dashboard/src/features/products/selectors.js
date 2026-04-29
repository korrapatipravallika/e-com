import { createSelector } from "@reduxjs/toolkit";

const selectProductsState = (state) => state.products;

export const selectProducts = createSelector(
  [selectProductsState],
  (productsState) => productsState.items
);

export const selectCategories = createSelector([selectProducts], (products) => {
  const categories = new Set(products.map((product) => product.category));
  return ["all", ...categories];
});

export const selectBrands = createSelector([selectProducts], (products) => {
  const brands = new Set(
    products.map((product) => product.brand).filter((brand) => Boolean(brand))
  );
  return ["all", ...brands];
});

export const selectFilteredProducts = createSelector(
  [selectProductsState],
  (productsState) => {
    const normalizedSearch = productsState.searchTerm.trim().toLowerCase();
    const minPrice = productsState.minPrice === "" ? null : Number(productsState.minPrice);
    const maxPrice = productsState.maxPrice === "" ? null : Number(productsState.maxPrice);
    const minRating =
      productsState.minRating === "" ? null : Number(productsState.minRating);

    return productsState.items.filter((product) => {
      const matchesSearch =
        !normalizedSearch ||
        product.title.toLowerCase().includes(normalizedSearch) ||
        product.description.toLowerCase().includes(normalizedSearch);

      const matchesCategory =
        productsState.selectedCategory === "all" ||
        product.category === productsState.selectedCategory;

      const matchesBrand =
        productsState.selectedBrand === "all" ||
        product.brand === productsState.selectedBrand;

      const matchesPriceRange =
        productsState.selectedPriceRanges.length === 0 ||
        productsState.selectedPriceRanges.some((rangeId) => {
          const range = productsState.availablePriceRanges.find(
            (item) => item.id === rangeId
          );

          if (!range) {
            return true;
          }

          return product.price >= range.min && product.price <= range.max;
        });

      const matchesMinPrice = minPrice === null || product.price >= minPrice;
      const matchesMaxPrice = maxPrice === null || product.price <= maxPrice;
      const matchesRating = minRating === null || product.rating >= minRating;
      const isInStock = (product.stock ?? 0) > 0;
      const matchesStock =
        productsState.stockFilter === "all" ||
        (productsState.stockFilter === "in" && isInStock) ||
        (productsState.stockFilter === "out" && !isInStock);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesBrand &&
        matchesPriceRange &&
        matchesMinPrice &&
        matchesMaxPrice &&
        matchesRating &&
        matchesStock
      );
    });
  }
);

export const selectPaginatedProducts = createSelector(
  [selectFilteredProducts, selectProductsState],
  (products, productsState) => {
    const startIndex = (productsState.currentPage - 1) * productsState.itemsPerPage;
    return products.slice(startIndex, startIndex + productsState.itemsPerPage);
  }
);

export const selectPaginationMeta = createSelector(
  [selectFilteredProducts, selectProductsState],
  (products, productsState) => ({
    currentPage: productsState.currentPage,
    itemsPerPage: productsState.itemsPerPage,
    totalItems: products.length,
    totalPages: Math.max(1, Math.ceil(products.length / productsState.itemsPerPage)),
  })
);
