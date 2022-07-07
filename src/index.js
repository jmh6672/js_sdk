import ApiClient from "./api/apiClient.js";
import * as oauth2 from "./api/auth/oauth2.js";
import * as call from "./api/call/call.js";
import * as notify from "./api/sse/notify.js";
import * as presence from "./api/presence/presence.js";
import * as info from "./api/haram/haram.js";
import * as util from "./utils/util.js";
import { IPRON } from "./common/constant.js";

/**
 * export constant
 * */
const MEDIA_TYPE = IPRON.MEDIA_TYPE;
const AGENT_STATE = IPRON.AGENT_STATE;
const AGENT_STATE_SELECT = IPRON.AGENT_STATE_SELECT;
const AGENT_STATE_CAUSE = IPRON.AGENT_STATE_CAUSE;
const EVENT = IPRON.EVENT;
const SUBJECT = IPRON.SUBJECT;
export { MEDIA_TYPE, AGENT_STATE, AGENT_STATE_SELECT, AGENT_STATE_CAUSE, EVENT, SUBJECT };

/**
 * API client instance;
 * */
const apiClient = function () {
  return ApiClient.instance;
};

/**
 * SDK version;
 * */
export function getVersion() {
  return SDK_VERSION;
}

/**
 * export API
 * */
export { oauth2, call, notify, presence, info, util };

/**
 * Haram 시스템 커넨트를 위한 인스턴스 생성
 * @param {String} url The request baseUrl.
 * @param {Number} timeout The request timeout. default 10000
 * @param {Boolean} isDebug Is debugging when request and response.
 */
export function init(url, timeout, isDebug) {
  return new ApiClient(url, timeout, isDebug);
}
