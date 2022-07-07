#IPRON_SDK 사용설명서
> javascript bundle을 로딩하면 전역 DOM객체의 `window`에`Haram` 객체가 생성됨

## First Step Initatilized
- init(url, timeout, isDebug)
  - request
  
    |parameter|type|description|
    |---|---|---|
    |url|String|Haram API 서버 url|
    |timeout|Number|Haram API 요청시  Timeout|
    |isDebug|Boolean|디버깅 로그 console 여부|

~~~ javascript
Haram.init("http://localhost:30600", 10*1000, false);
~~~


## Notify
> Haram 이벤트 리스닝 용도
> Haram.notify 객체 사용

- getSubscriptions(topic)
- addSubscriptions(topic, eventCallback)
- delSubscriptions(topic)

## Oauth2
> Haram.oauth2 객체 사용

- fetchToken(eamil, password)
- fetchTokenByToken(accessToken)
- deleteToken()
- verifyToken(accessToken, refreshToken)
- refreshToken(refreshToken)

~~~ javascript
Haram.oauth2.fetchToken("admin@bcloud.co.kr", "1234");
~~~


## Function
> Haram.call 객체 사용

- haram_api(user_id)
- haram_info(user_id)