import { assert } from "chai";
import ApiClient from "../../src/api/apiClient";

const baseURL = "http://100.100.106.111:30600";
export const apiService = new ApiClient(baseURL, 10 * 1000, true);

describe("API 클라이언트", () => {
  it("싱글톤 테스트", () => {
    let instance = ApiClient.instance;
    let params = { accessToken: "access", refreshToken: "refresh" };

    instance.timeout = 30 * 1000;
    assert.equal(apiService.axios.defaults.timeout, 30 * 1000);

    instance.authData = { accessToken: "access", refreshToken: "refresh" };
    assert.equal(apiService.authData.accessToken, params.accessToken);
  });

  it("axios 테스트", async () => {
    const params = { email: "user1", plainPassword: "1234" };
    const response = await apiService.axios.post("/auth/v1/token/verify", params);

    assert.equal(response.result, true);
  });
});
