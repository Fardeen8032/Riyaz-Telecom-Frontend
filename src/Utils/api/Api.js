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