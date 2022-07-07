/**
 * @author JMH
 * @copyright JMH 2022.04
 * @license Copyright (c) 2022 Bridgetec co Inc.
 * **/

import nodeEventSource from "eventsource";
import axios from "axios";
import * as constant from "../common/constant.js";
import qs from "qs";

export default class ApiClient {
  static instance ;

  /**
   * Create Instance
   * @param {String} url The request baseUrl.
   * @param {Number} timeout The request timeout. default 10000
   * @param {Boolean} isDebug Is debugging when request and response.
   */
  constructor(url, timeout, isDebug) {
    /**
     * olny one create intstance just one time.
     */
    if (ApiClient.instance) {
      return ApiClient.instance;
    }

    console.log(`Create API Client Instance.`);

    this.isDebug = isDebug || false;

    /**
     * Use Eventsource when node env.
     */
    if (typeof EventSource == "undefined") {
      global.EventSource = nodeEventSource;
    }

    /**
     * Value is `true` if local storage exists. Otherwise, false.
     */
    this.hasLocalStorage = true;
    try {
      localStorage.setItem("purecloud_local_storage_test", "purecloud_local_storage_test");
      localStorage.removeItem("purecloud_local_storage_test");
    } catch (e) {
      this.hasLocalStorage = false;
    }

    /**
     * Set default axios value.
     */
    this.axios = axios.create({
      /**
       * The default HTTP baseURL.
       * @type {String}
       * @default localhost:80
       */
      baseURL: `${url}`,
      /**
       * The default HTTP timeout for API calls.
       * @type {Number}
       * @default 10000
       */
      timeout: timeout ? timeout : 10000,
      /**
       * Set query params serializer. when list params was definition ','
       */
      paramsSerializer: params => {
        return qs.stringify(params, { arrayFormat: "comma" });
      },
    });
    this.axios.interceptors.request.use(
      function (config) {
        console.log("%c■■■■■■ Request Success ■■■■■■", "background:green;color:#fff;font-weight:bold");
        if (isDebug) {
          console.log(config);
          console.log("%c■■■■■■ Request Success ■■■■■■", "background:green;color:#fff;font-weight:bold");
        }
        return config;
      },
      function (error) {
        console.error("%c■■■■■■ Request Error ■■■■■■", "background:red;color:#fff;font-weight:bold");
        console.error(error);
        if (error.response.data) {
          console.error(error.response.data);
        }
        console.error("%c■■■■■■ Request Error ■■■■■■", "background:red;color:#fff;font-weight:bold");
        return Promise.reject(error);
      },
    );
    this.axios.interceptors.response.use(
      async function (response) {
        console.log("%c■■■■■■ Response Success ■■■■■■", "background:green;color:#fff;font-weight:bold");
        if (isDebug) {
          console.log(response.data);
          console.log("%c■■■■■■ Response Success ■■■■■■", "background:green;color:#fff;font-weight:bold");
        }
        return response.data;
      },
      function (error) {
        console.error("%c■■■■■■ Response Error ■■■■■■", "background:red;color:#fff;font-weight:bold");
        console.error(error);
        if (error.response.data) {
          console.error(error.response.data);
        }
        console.error("%c■■■■■■ Response Error ■■■■■■", "background:red;color:#fff;font-weight:bold");
        return Promise.reject(error);
      },
    );

    /**
     * Set authData.
     */
    this.authData = {};
    /**
     * Set userData.
     */
    this.userData = {};
    /**
     * Set eventsource Collection.
     */
    this.eventMap = {};

    ApiClient.instance = this;
  }

  /**
   * @param {String} url The request baseUrl.
   */
  set baseUrl(url) {
    this.axios.defaults.baseURL = url;
  }

  /**
   * @param {Number} timeout The request timeout.
   */
  set timeout(timeout) {
    this.axios.defaults.timeout = timeout;
  }

  /**
   * Set Authorization data in Haram system
   * @param {Object} data The Authorizaion data.
   */
  set authData(data) {
    this._authData = data || {};
  }
  get authData(){
    return this._authData;
  }


  /**
   * Set user data in instance
   * @param {Object} data The user data.
   */
  set userData(data) {
    this._userData = data || {};
  }
  get userData(){
    return this._userData;
  }

  /**
   * Set user data in instance
   * @param {Object} data The user data.
   */
  set eventMap(data) {
    this._eventMap = data || {};
  }
  get eventMap() {
    return this._eventMap;
  }
}
