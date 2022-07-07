import { assert } from "chai";
import * as notify from "../../../src/api/sse/notify.js";
import * as oauth2 from "../../../src/api/auth/oauth2.js";
import { decodeJWT } from "../../../src/utils/util.js";
import { apiService } from "../apiClientTest.js";

let topic = null;

describe("Notify 이벤트", () => {
  before("인증 등록", async () => {
    const response = await oauth2.fetchToken("jmh667722@gmail.com", "1234");
    console.log(apiService.authData);
    assert.exists(apiService.authData.accessToken);

    apiService.userData = decodeJWT(response.data.accessToken);
  });

  it("이벤트 리스닝", async () => {
    //이벤트 리스닝
    const userData = apiService.userData;
    topic = `user/${userData._id}`;
    await notify.addSubscriptions(topic, data => {
      console.log(data);
    });

    assert.exists(apiService.eventMap[topic]);
  });

  it("이벤트 삭제", async () => {
    // 이벤트 리스닝
    await notify.delSubscriptions(topic);

    assert.notExists(apiService.eventMap[topic]);
  });
});
