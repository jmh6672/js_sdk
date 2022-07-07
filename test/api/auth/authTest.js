import { assert } from "chai";
import * as oauth2 from "../../../src/api/auth/oauth2";
import { apiService } from "../apiClientTest";

describe("API 인증", () => {
  it("토큰 발급 (계정 정보)", async () => {
    const response = await oauth2.fetchToken("jmh667722@gmail.com", "1234");
    assert.equal(response.result, true);

    console.log(apiService.authData);
    assert.exists(apiService.authData.accessToken);

    console.log(apiService.axios.defaults.headers.common["Authorization"]);
    assert.exists(apiService.axios.defaults.headers.common["Authorization"]);
  });

  it("토큰 발급 (accessToken)", async () => {
    const response = await oauth2.fetchTokenByToken(apiService.authData.accessToken);
    assert.equal(response.result, true);

    console.log(apiService.authData);
    assert.exists(apiService.authData.accessToken);

    console.log(apiService.axios.defaults.headers.common["Authorization"]);
    assert.exists(apiService.axios.defaults.headers.common["Authorization"]);
  });

  it("토큰 유효성", async () => {
    const response = await oauth2.verifyToken(apiService.authData.accessToken, apiService.authData.refreshToken);
    assert.equal(response.result, true);
  });

  it("토큰 재발행", async () => {
    const response = await oauth2.refreshToken(apiService.authData.refreshToken);
    assert.equal(response.result, true);

    console.log(apiService.axios.defaults.headers.common["Authorization"]);
    assert.exists(apiService.axios.defaults.headers.common["Authorization"]);
  });

  it("토큰 삭제", async () => {
    const response = await oauth2.deleteToken();
    assert.equal(response.result, true);

    console.log(apiService.authData);
    assert.notExists(apiService.authData.accessToken);
    assert.notExists(apiService.authData.refreshToken);

    console.log(apiService.axios.defaults.headers.common["Authorization"]);
    assert.notExists(apiService.axios.defaults.headers.common["Authorization"]);
  });
});
