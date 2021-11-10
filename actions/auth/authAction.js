import {
  SET_USER,
  GET_ERRORS,
  // SAVE_ACCESS,
  REMOVE_ACCESS,
  LOGOUT,
} from "../../constants/types";
import { token } from "../../config/token";
import instance from "../../utils/instance";

export const registerUser = (data) => async (dispatch) => {
  await instance
    .post(`api/register`, data)
    .then((response) => {
      const res = response.data;
      console.log(res);
    })
    .catch((error) => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data.data,
      });
    });
};

export const loginUser = (data) => async (dispatch) => {
  await instance.get("sanctum/csrf-cookie").then(() => {
    instance
      .post("api/login", data)
      .then((response) => {
        const res = response.data;
        dispatch({
          type: SET_USER,
          payload: res.data,
        });
        console.log(res);
      })
      .catch((error) => {
        dispatch({
          type: GET_ERRORS,
          payload: error.response.data.errors,
        });
        // console.log(error.response.data.errors);
      });
  });
};

export const logoutUser = async (dispatch) => {
  await instance({
    url: "api/logout",
    method: "post",
    headers: {
      Authorization: "Bearer " + token(),
    },
  })
    .then((response) => {
      dispatch({
        type: LOGOUT,
        payload: {},
      });
      dispatch({
        type: REMOVE_ACCESS,
        payload: {},
      });
      console.log(response);
    })
    .catch((error) => {
      const status = error.response.status;
      if (status === 401 || status === 422) {
        dispatch({
          type: GET_ERRORS,
          payload: error.response.data,
        });
      }
    });
};
