import axios from "axios";
import URL from "../constants/url.js";

export const postFace = (fd) => {
  return axios
  .post(URL.face, fd)
  .then((response) => {
    return response.data;
  })
  .catch((error) => {
    return error;
  });
}

export const postLogin = (params) => {
  axios
    .post(URL.login, params)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const getUserAll = () => {
  return axios
    .get(URL.userInfoAll)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const getUser = (name) => {
  return axios
    .get(`${URL.userInfo}/${name}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const getChatBot = (message) => {
  return axios
    .get(`${URL.chatbot}/${message}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};
