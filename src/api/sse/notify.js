import ApiClient from "../apiClient.js";
import * as constant from "../../common/constant.js";
import { createUUID } from "../../utils/util.js";

////////////////////////
/////// Notify API ///////
////////////////////////

const API_NAME = "/sse/notify";

const apiClient = function () {
  if (typeof ApiClient.instance == "undefined" || ApiClient.instance == null) {
    console.error("Do not initialized Haram server!!");
    return;
  }

  return ApiClient.instance;
};

/**
 * 이벤트 소스 조회
 * @param {String} topic
 * @returns EventSource
 */
export function getSubscriptions(topic) {
  return apiClient().eventMap[topic];
}

/**
 * 이벤트 추가
 * @param {String} tntId
 * @param {String} topic
 * @param {function} eventCallback
 * @returns EventSource
 */
export function addSubscriptions(topic, eventCallback) {
  const defaultReq = apiClient().axios.defaults;
  const baseURL = defaultReq.baseURL;
  const params = {
    id: createUUID(),
    eventsubject: topic,
    bcloudToken: defaultReq.headers.common.Authorization,
  };
  const paramsString = apiClient().axios.defaults.paramsSerializer(params);
  apiClient().eventMap[topic] = new EventSource(`${baseURL}${API_NAME}/subscribe?${paramsString}`);

  const eventsource = apiClient().eventMap[topic];

  eventsource.addEventListener(constant.IPRON.EVENT.HANDLER.REGISTER, e => {
    if (apiClient().isDebug) {
      console.log(`${e.type} [${topic}] Event \n ${e.data}`);
    }
  });

  eventsource.addEventListener(constant.IPRON.EVENT.HANDLER.REGISTERED, e => {
    if (apiClient().isDebug) {
      console.log(`${e.type} [${topic}] Event \n ${e.data}`);
    }
  });

  eventsource.addEventListener(constant.IPRON.EVENT.HANDLER.PUSH, e => {
    if (apiClient().isDebug) {
      console.log(`${e.type} [${topic}] Event \n ${e.data}`);
    }
    eventCallback(e.data);
  });

  eventsource.addEventListener(constant.IPRON.EVENT.HANDLER.PROBEREQ, e => {
    if (apiClient().isDebug) {
      console.log(`${e.type} [${topic}] Event \n ${e.data}`);
    }
  });

  eventsource.onmessage = e => {
    console.log(`이벤트 디버깅 \n ${e.data}`);
  };

  /**
   * 에러가 발생하면 연결이 끊어지고, 다시 케넥트를 시도한다.
   * */
  eventsource.onerror = e => {
    console.error(e);
    delSubscriptions(topic);
    setTimeout(() => {
      addSubscriptions(topic, eventCallback);
    }, constant.TIMEOUT.RECONNECT);
  };

  apiClient().eventMap[topic] = eventsource;
}

/**
 * 이벤트 삭제, topic 파라미터 없을 시 전체 이벤트 삭제
 * @param {String} subs_id
 */
export function delSubscriptions(topic) {
  if (topic) {
    if (apiClient().eventMap[topic] != null) {
      let eventsource = apiClient().eventMap[topic];
      eventsource.close();
      eventsource = null;
      delete apiClient().eventMap[topic];
      console.log(`Close EventSource [${topic}]`);
    }
  } else {
    this.eventMap = {};
  }
}

/**
 * user 이벤트 리스닝
 * @param {String} tntId
 * @param {String} userId
 * @returns EventSource
 */
export function addUserSubscriptions(userId, eventCallback) {
  const topic = `user/${userId}`;
  this.addSubscriptions(topic, eventCallback);
}
export function delUserSubscriptions(userId) {
  const topic = `user/${userId}`;
  this.delSubscriptions(topic);
}