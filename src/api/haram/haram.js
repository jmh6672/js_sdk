import ApiClient from "../apiClient.js";

////////////////////////
/////// Info API ///////
////////////////////////

const API_NAME = "/haram/v1";

const apiClient = function () {
  if (typeof ApiClient.instance == "undefined" || ApiClient.instance == null) {
    console.error("Do not initialized Haram server!!");
    return;
  }

  return ApiClient.instance;
};

/**
 * 사용자 목록 조회 - 테넌트별
 * @param {String} tenant_id
 * */
export function getUserList(tenant_id, group_id) {
  return apiClient().axios.get(`${API_NAME}/users/${tenant_id}`);
}

/**
 * 사용자 조회
 * @param {String} user_id
 * */
export function getUserInfo(user_id) {
  return apiClient().axios.get(`${API_NAME}/user/${user_id}`);
}
