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

export const getFriendsOf = (name) => {
  return axios
    .get(`${URL.userInfo}/${name}/friends}`)
    .then((response) => {
      if (response.data.success) return response.data.friends;
      else throw response.data.error;
    })
    .catch((error) => error);
};

export const postBoard = (params) => {
  return axios
    .post(`${URL.board}`, params)
    .then((response) => response.data.success)
    .catch((error) => error);
};

export const getBoardList = () => {
  return axios
    .get(`${URL.board}/list}`)
    .then((response) => {
      if (response.data.success) return response.data.boardlist;
      else throw response.data.error;
    })
    .catch((error) => error);
};

export const getBoard = (board_id) => {
  return axios
    .get(`${URL.board}/${board_id}}`)
    .then((response) => {
      if (response.data.success) return response.data.content;
      else throw response.data.error;
    })
    .catch((error) => error);
};

export const postTag = (params) => {
  return axios
    .post(`${URL.tag}`, params)
    .then((response) => response.data.success)
    .catch((error) => error);
};

export const getTags = (board_id) => {
  return axios
    .get(`${URL.tag}/${board_id}`)
    .then((response) => {
      if (response.data.success) return response.data.tags;
      else throw response.data.error;
    })
    .catch((error) => error);
};


export const getRecommand = (userInfo) => {
  return axios
    .get(`${URL.recommand}/${userInfo.id}`)
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      return error;
    });
};