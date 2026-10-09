export const API_URLS = {
  AUTH: {
    REGISTER: "auth/register",
    LOGIN: "auth/login",
    REFRESH_TOKEN: "auth/refresh-token",
  },
  CATEGORY: {
    GET_ALL: "categories",
  },
  PRODUCT: {
    GET_ALL: "products/get-products",
    GET_BY_ID: (id) => `products/${id}`,
    GET_RELATED: (id) => `products/${id}/related`,
  },
};