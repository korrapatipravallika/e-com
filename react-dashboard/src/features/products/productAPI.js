import { dummyJsonClient } from "../../method/axiosInstance";
import { fallbackProducts } from "../../data/fallbackProducts";

export async function fetchAllProductsAPI() {
  try {
    const initialResponse = await dummyJsonClient.get("/products", {
      params: {
        limit: 1,
        skip: 0,
      },
    });

    const totalProducts = initialResponse.data?.total ?? 0;

    const response = await dummyJsonClient.get("/products", {
      params: {
        limit: totalProducts || 100,
        skip: 0,
      },
    });

    return response.data?.products?.length ? response.data.products : fallbackProducts;
  } catch {
    return fallbackProducts;
  }
}
