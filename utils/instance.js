import axios from "axios";
import { logoutUser } from "../actions/auth/authAction";
import { store } from "../store";

const instance = axios.create({
  baseURL: process.env.baseUrl,
  withCredentials: true,
});

// const UNAUTHORIZED = 401;
// instance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const { status } = error.response;
//     if (status === UNAUTHORIZED || status === 419) {
//       store.dispatch(logoutUser);
//       window.location = "/login";
//     }
//   }
// );

export default instance;
