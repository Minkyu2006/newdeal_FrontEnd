// ****************** 토큰 관련 자바스크립트 ******************//

// 쿠키 값 삭제하기
var deleteCookie = function(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';
    //	deleteCookie('name');
}

// 쿠키 값 넣기
var setCookie = function(name, value, exp) {
    var date = new Date();
    // 1000 * 60 * 30 -> 30분
    // 1000 * 60 -> 1분
    date.setTime(date.getTime() + exp * 1000 * 60 * 30);
    document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
};

// 쿠기 값 가져오기
var getCookie = function(name) {
    var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return value? value[2] : null;
};

// 현재 토큰 쿠키 가져오기
function accessTokenCookieGet(){
    // setCookie(변수이름);
    var accessToken = getCookie("JwtAccessToken");
    console.log("현재 쿠키 JwtAccessToken변수에 저장된 값: "+accessToken);
    if(accessToken==null){
        refreshTokenCookie();
    }
}

// 토큰 Refresh하기
function refreshTokenCookie(){

    console.log("새로고침이 시작됩니다.");

    const accessToken = getCookie("JwtAccessToken");
    const refreshToken = getCookie("JwtRefreshToken");
    console.log("accessToken : "+accessToken);
    console.log("refreshToken : "+refreshToken);

    let url = "http://192.168.0.144:8012/auth/reissue"; // 호출할 백엔드 API

    const params = {
        accessToken : accessToken,
        refreshToken : refreshToken
    };
    const jsonString = JSON.stringify(params);

    let result;
    $.ajax({
        url: url,
        type: 'post',
        data: jsonString,
        contentType: 'application/json',
        cache: false,
        success: function (res) {
            if(res.status===500){
                console.log("토큰 새로고침 에러");
                alertCaution("토큰이 만료되었습니다.<BR>다시 로그인해주세요.", 2);
                result = 0;
            }else{
                // setCookie(변수이름, 변수값, 유효시간);
                setCookie("JwtAccessToken", res.data.token.accessToken, 30); // 발행시간은 30분으로설정
                setCookie("JwtRefreshToken", res.data.token.refreshToken, 30); // 발행시간은 30분으로설정
                setCookie("insert_id",res.data.token.insert_id, 30); // 테스트겸 발행시간은 10분으로설정

                const test_token = getCookie("JwtAccessToken");
                const refreshToken = getCookie("JwtRefreshToken");
                console.log("새로받은 test_token : " + test_token);
                console.log("새로받은 refreshToken : " + refreshToken);
                result = 1;
            }
        }
    });
    return result;
}
