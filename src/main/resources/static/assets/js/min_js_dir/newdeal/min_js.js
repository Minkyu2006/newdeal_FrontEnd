function logreg(num,menuName1,menuName2,data) {
    JWT_Get();

    if (accessToken == null && refreshToken == null && insert_id == null) {
        // console.log("callinfo(userid)함수 : 토큰&리플레시&로그인한아이디 Null");
        alertCaution("토큰이 만료되었습니다.<BR>다시 로그인해주세요.", 2);
    } else {

        let typeName;

        if (num === 1) {
            typeName = "open";
        } else {
            typeName = "search";
        }

        const params = {
            menuName1: menuName1,
            menuName2: menuName2,
            useType: typeName,
            data: data
        };

        let url;
        url = $("#backend_protocol").val() + "://" + $("#backend_url").val() + "/api/userLog/logreg"; // 호출할 백엔드 API
        console.log("url : " + url);
        $.ajax({
            url: url,
            type: 'Post',
            data: params,
            cache: false,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("JWT_AccessToken", accessToken);
                xhr.setRequestHeader("insert_id", insert_id);
            },
            error: function (request) {
                if (request.status === 500) {
                    // console.log("500에러 재로그인 해주세요.");
                    alertCaution("500에러 재로그인 해주세요.", 2);
                } else {
                    // console.log("404에러 재로그인 해주세요.");
                    alertCaution("404에러 재로그인 해주세요.", 2);
                }
            },
            success: function (request) {
                let status = request.status;
                if (status === 200) {
                    console.log(menuName1+" / "+menuName2+" 로그기록 완료");
                }
            }
        });
    }
}

// 숫자만 입력하게하고, 3번째 숫자마다 콤마(,)를 찍어주는 함수
function inputNumberFormat(obj) {
    obj.value = comma(uncomma(obj.value));
}
function comma(str) {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}
function uncomma(str) {
    str = String(str);
    return str.replace(/[^\d]+/g, '');
}

// 숫자콤마찍는 함수
function pushComma(num){
    let len, point, str;
    num = num + "";
    point = num.length % 3 ;
    len = num.length;
    str = num.substring(0, point);
    while (point < len) {
        if (str !== "") str += ",";
        str += num.substring(point, point + 3);
        point += 3;
    } return str;
}