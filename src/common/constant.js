export const TIMEOUT = {
  RECONNECT: 5 * 1000,
};

export const IPRON = {
  PROTOCOL: {
    TCP: "tcp",
    UDP: "udp",
    TLS: "tls",
    WSS: "wss",
  },
  /**
   * 대상 리소스 타입
   * */
  SUBJECT: {
    ACCOUNT: "account",
    ROUTING: "routing",
    USER: "user",
  },
  EVENT: {
    /**
     * eventsource 에서 핸들링할 이벤트 명
     * */
    HANDLER: {
      REGISTER: "sse.notify.register",
      REGISTERED: "sse.notify.registered",
      PUSH: "sse.notify.push",
      PROBEREQ: "sse.notify.probereq",
    },
  },
};
