import axios from "axios";

axios.defaults.baseURL = "https://pro-api.coinmarketcap.com/v1/cryptocurrency";
//Set default header of axios with API key
const API_KEY = "aaa0c4c2-a905-4850-9f9f-68b911099791";

axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["X-CMC_PRO_API_KEY"] = API_KEY;

export default axios;
