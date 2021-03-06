import { assert } from "chai";
import { apiService } from "../apiClientTest";
import * as oauth2 from "../../../src/api/auth/oauth2";
import * as info from "../../../src/api/haram/haram";

describe("Info 테스트", () => {
  before("인증 등록", async () => {
    const response = await oauth2.fetchToken("jmh667722@gmail.com", "1234");
    console.log(apiService.authData);
    console.log(apiService.userData);
    assert.exists(apiService.authData.accessToken);
  });

  it("유저 정보 조회", async () => {
    const response = await info.getUserInfo(apiService.userData._id);

    assert.equal(response.result, true);
    assert.exists(response.data);
  });
});
