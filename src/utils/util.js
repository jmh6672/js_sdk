import { v4 as uuidv4 } from "uuid";
import { Buffer } from "buffer";

export function createUUID() {
  return uuidv4();
}
/**
 * 정규표현식 검사
 * @param {String} input
 * @param {regExp} regExp
 * @returns { input, regExp, result }
 */
export function checkRegExp(input, regExp) {
  const regex = new RegExp(regExp, "g");
  const result = regex.test(input);
  // console.log("checkRegExp", { input, regExp, result });
  return { input, regExp, result };
}

/**
 * 토큰 복호화
 * @param {String} token
 * @returns json
 */
export function decodeJWT(token) {
  const base64Payload = token.split(".")[1];
  const payload = Buffer.from(base64Payload, "base64").toString();
  return JSON.parse(payload.toString());
}

/**
 * timeStamp를 Date로 변환
 * 토큰시간변환에 사용
 * @param {number} timeStamp
 * @returns Date
 */
export function convertUnixTimeStampToDate(timeStamp) {
  return new Date(timeStamp * 1000);
}

/**
 * 이메일 정규표현식 검사
 * @param {String} input
 * @returns { input, regExp, result }
 */
export function validEmail(input) {
  return checkRegExp(input, /^[^\s@]+@[^\s@]+\.[^\s@]+$/);
}
