import axios from "axios";

const instance = axios.create({
  baseURL: process.env.baseUrl,
  withCredentials: true,
});

export default instance;
