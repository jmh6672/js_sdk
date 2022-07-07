import ApiClient from "../apiClient.js";
import * as util from "../../utils/util.js";

////////////////////////
/////// Auth API ///////
////////////////////////

const API_NAME = "/auth/v1";

const apiClient = function () {
  if (typeof ApiClient.instance == "undefined" || ApiClient.instance == null) {
    console.error("Do not initialized Haram server!!");
    return;
  }

  return ApiClient.instance;
};

/**
 * 토큰 발행(로그인) by 유저 정보
 * @param {String} email
 * @param {String} plainPassword
 * @returns axios
 */
export function fetchToken(email, plainPassword) {
  return apiClient()
    .axios.post(`${API_NAME}/token`, {
      email: email,
      plainPassword: plainPassword,
    })
    .then(response => {
      setLocalToken(response.data);
      return response;
    });
}

/**
 * 토큰 발행(로그인) by accessToken
 * @param {String} accessToken
 * @returns axios
 */
export function fetchTokenByToken(accessToken) {
  return apiClient()
    .axios.post(`${API_NAME}/token/${accessToken}`)
    .then(response => {
      setLocalToken(response.data);
      return response;
    });
}

/**
 * 토큰 폐기(로그아웃)
 * @param {String} refreshToken
 * @returns axios
 */
export function deleteToken() {
  const refreshToken = apiClient().authData.refreshToken;
  return apiClient()
    .axios.post(`${API_NAME}/token/delete`, {
      refreshToken: refreshToken,
    })
    .then(response => {
      deleteLocalToken();
      return response;
    });
}

/**
 * 토큰 유효성확인
 * @param {String} accessToken
 * @param {String} refreshToken
 * @returns axios
 */
export function verifyToken(accessToken, refreshToken) {
  return apiClient().axios.post(`${API_NAME}/token/verify`, {
    accessToken: accessToken,
    refreshToken: refreshToken,
  });
}

/**
 * 토큰 재발행(인증시간 만료시)
 * @param {String} refreshToken
 * @returns axios
 */
export function refreshToken(refreshToken) {
  return apiClient()
    .axios.post(`${API_NAME}/token/refresh`, null, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    })
    .then(response => {
      setLocalToken(response.data);
      return response;
    });
}

/**
 * 토큰 저장
 * @param {Object} data
 */
function setLocalToken(data) {
  apiClient().authData = data;
  apiClient().axios.defaults.headers.common["Authorization"] = `Bearer ${data.accessToken}`;
}

/**
 * 토큰 삭제
 */
function deleteLocalToken() {
  apiClient().authData = {};
  delete apiClient().axios.defaults.headers.common["Authorization"];
}
