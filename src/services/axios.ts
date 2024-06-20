import axios from "axios";

const api = axios.create({
  baseURL: "https://h-bench-api.sambacore.com/",
  timeout: 5000,
});

export default api;
