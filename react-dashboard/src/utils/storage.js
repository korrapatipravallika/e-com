const CART_STORAGE_KEY = "redux-toolkit-cart-v2";
const AUTH_STORAGE_KEY = "redux-toolkit-auth";
const WISHLIST_STORAGE_KEY = "redux-toolkit-wishlist";
const ADDRESS_STORAGE_KEY = "redux-toolkit-addresses";

function normalizeCartState(cartState) {
  if (!cartState || typeof cartState !== "object") {
    return undefined;
  }

  const items = Array.isArray(cartState.items) ? cartState.items : [];

  return {
    items,
    status: typeof cartState.status === "string" ? cartState.status : "idle",
    error: cartState.error ?? null,
  };
}

function normalizeWishlistState(wishlistState) {
  if (!wishlistState || typeof wishlistState !== "object") {
    return undefined;
  }

  return {
    items: Array.isArray(wishlistState.items) ? wishlistState.items : [],
    status: typeof wishlistState.status === "string" ? wishlistState.status : "idle",
  };
}

function normalizeAddressState(addressState) {
  if (!addressState || typeof addressState !== "object") {
    return undefined;
  }

  const addresses = Array.isArray(addressState.addresses)
    ? addressState.addresses.filter((address) => address && typeof address === "object")
    : [];
  const selectedAddressId =
    typeof addressState.selectedAddressId === "number"
      ? addressState.selectedAddressId
      : addresses[0]?.id ?? null;

  return {
    addresses,
    selectedAddressId,
  };
}

export function loadCartState() {
  if (typeof window === "undefined") {
    return undefined;
  }

  try {
    const rawCart = window.localStorage.getItem(CART_STORAGE_KEY);

    if (!rawCart) {
      return undefined;
    }

    return normalizeCartState(JSON.parse(rawCart));
  } catch {
    return undefined;
  }
}

export function loadWishlistState() {
  if (typeof window === "undefined") {
    return undefined;
  }

  try {
    const rawWishlist = window.localStorage.getItem(WISHLIST_STORAGE_KEY);

    if (!rawWishlist) {
      return undefined;
    }

    return normalizeWishlistState(JSON.parse(rawWishlist));
  } catch {
    return undefined;
  }
}

export function loadAddressState() {
  if (typeof window === "undefined") {
    return undefined;
  }

  try {
    const rawAddressState = window.localStorage.getItem(ADDRESS_STORAGE_KEY);

    if (!rawAddressState) {
      return undefined;
    }

    return normalizeAddressState(JSON.parse(rawAddressState));
  } catch {
    return undefined;
  }
}

export function saveCartState(cartState) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const normalizedCartState = normalizeCartState(cartState);
    window.localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify(normalizedCartState)
    );
  } catch {
    // Ignore storage quota issues.
  }
}

export function saveWishlistState(wishlistState) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const normalizedWishlistState = normalizeWishlistState(wishlistState);
    window.localStorage.setItem(
      WISHLIST_STORAGE_KEY,
      JSON.stringify(normalizedWishlistState)
    );
  } catch {
    // Ignore storage quota issues.
  }
}

export function saveAddressState(addressState) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const normalizedAddressState = normalizeAddressState(addressState);
    window.localStorage.setItem(
      ADDRESS_STORAGE_KEY,
      JSON.stringify(normalizedAddressState)
    );
  } catch {
    // Ignore storage quota issues.
  }
}

export function loadAuthState() {
  return undefined;
}

export function saveAuthState(authState) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    if (authState?.token) {
      window.localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  } catch {
    // Ignore storage quota issues.
  }
}
