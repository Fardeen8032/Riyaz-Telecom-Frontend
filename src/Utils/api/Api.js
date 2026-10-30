import axios from "axios";
import { API_URLS } from "../urls/urls";
import { environment } from "../env/Env";


export const registerUser = async (data) => {
  try {
    const url = `${environment.base_url}${API_URLS.AUTH.REGISTER}`;
       const response = await axios.post(url, data)
       return response?.data;
    }
    catch (error) {
       console.log('error', error)
       throw error;
  }
}

export const loginUser = async (payload) => {
  try {
    const url = `${environment.base_url}${API_URLS.AUTH.LOGIN}`;

    const response = await axios.post(url, payload, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error("Login API failed:", error);

    throw error;
  }
};

export const getCategories = async () => {
  try {
    const url = `${environment.base_url}${API_URLS.CATEGORY.GET_ALL}`;

    const response = await axios.get(url);

    return response.data;
  } catch (error) {
    console.error("Get categories API failed:", error);
    throw error;
  }
};

export const getProducts = async ({
  page = 1,
  limit = 12,
  category = "",
} = {}) => {
  try {
    const url = `${environment.base_url}${API_URLS.PRODUCT.GET_ALL}`;

    const response = await axios.get(url, {
      params: {
        page,
        limit,
        ...(category && category !== "All" && { category }),
      },
    });

    return response.data;
  } catch (error) {
    console.error("Get products API failed:", error);
    throw error;
  }
};

export const getFeaturedMobiles = async () => {
  try {
    const url = `${environment.base_url}${API_URLS.PRODUCT.GET_FEATURED_MOBILES}`;

    const response = await axios.get(url);

    return response.data;
  } catch (error) {
    console.error("Get featured mobiles API failed:", error);
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    const url = `${environment.base_url}${API_URLS.PRODUCT.GET_BY_ID(id)}`;

    const response = await axios.get(url);

    return response.data;
  } catch (error) {
    console.error("Get product API failed:", error);
    throw error;
  }
};

export const getRelatedProducts = async (id) => {
  try {
    const url = `${environment.base_url}${API_URLS.PRODUCT.GET_RELATED(id)}`;

    const response = await axios.get(url);

    return response.data;
  } catch (error) {
    console.error("Get related products API failed:", error);
    throw error;
  }
};


export const googleLogin = async (idToken) => {
  try {
    const url = `${environment.base_url}${API_URLS.AUTH.GOOGLE_LOGIN}`;

    const response = await axios.post(url, {
      idToken,
    });

    return response.data;
  } catch (error) {
    console.error(
      "Google login API failed:",
      error.response?.data || error.message
    );

    throw error;
  };
};
  export const getCart = async (accessToken) => {
    try {
      const response = await axios.get(
        `${environment.base_url}${API_URLS.CART.GET}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Get cart API failed:", error);
      throw error;
    }
  };

  export const addCartItem = async (productId, quantity, accessToken) => {
  try {
    const response = await axios.post(
      `${environment.base_url}${API_URLS.CART.ITEMS}`,
      { productId, quantity },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Add cart item API failed:", error);
    throw error;
  }
  };

  export const updateCartItem = async (productId, quantity, accessToken) => {
  try {
    const response = await axios.patch(
      `${environment.base_url}${API_URLS.CART.ITEM(productId)}`,
      { quantity },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Update cart item API failed:", error);
    throw error;
  }
  };

  export const removeCartItem = async (productId, accessToken) => {
  try {
    const response = await axios.delete(
      `${environment.base_url}${API_URLS.CART.ITEM(productId)}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Remove cart item API failed:", error);
    throw error;
  }
  };

  export const clearCart = async (accessToken) => {
  try {
    const response = await axios.delete(
      `${environment.base_url}${API_URLS.CART.GET}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Clear cart API failed:", error);
    throw error;
  }
  };
