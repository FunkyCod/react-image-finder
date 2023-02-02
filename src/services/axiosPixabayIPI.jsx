import axios from "axios";
const BASE_URL = "https://pixabay.com/api/";

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
