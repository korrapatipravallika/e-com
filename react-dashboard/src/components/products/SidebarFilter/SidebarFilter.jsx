import "./SidebarFilter.css";

function SidebarFilter({
  categories,
  brands,
  minPrice,
  maxPrice,
  minRating,
  searchValue,
  selectedBrand,
  selectedCategory,
  onBrandChange,
  onCategoryChange,
  onMaxPriceChange,
  onMinPriceChange,
  onMinRatingChange,
  onSearchChange,
}) {
  return (
    <>
      <div className="table-filters">
        <input
          className="table-input"
          type="search"
          placeholder="Search product"
          value={searchValue}
          onChange={onSearchChange}
        />

        <input
          className="table-input"
          type="number"
          min="0"
          placeholder="Min price"
          value={minPrice}
          onChange={(event) => onMinPriceChange(event.target.value)}
        />

        <input
          className="table-input"
          type="number"
          min="0"
          placeholder="Max price"
          value={maxPrice}
          onChange={(event) => onMaxPriceChange(event.target.value)}
        />

        <select
          className="table-input table-select"
          value={selectedCategory}
          onChange={(event) => onCategoryChange(event.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category === "all" ? "All categories" : category}
            </option>
          ))}
        </select>

        <select
          className="table-input table-select"
          value={selectedBrand}
          onChange={(event) => onBrandChange(event.target.value)}
        >
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand === "all" ? "All Brands" : brand}
            </option>
          ))}
        </select>

        <input
          className="table-input"
          type="number"
          min="0"
          max="5"
          step="0.1"
          placeholder="Min Rating (0-5)"
          value={minRating}
          onChange={(event) => onMinRatingChange(event.target.value)}
        />

      </div>
    </>
  );
}

export default SidebarFilter;
