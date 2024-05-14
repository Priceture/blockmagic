import axios from "./axios.config";

export const getPriceAPI = async () => {
  return await axios.get(`/quotes/latest?id=1`);
};
