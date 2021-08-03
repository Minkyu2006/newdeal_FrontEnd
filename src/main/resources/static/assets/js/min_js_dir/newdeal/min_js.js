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
                    console.log("500에러 재로그인 해주세요.");
                    // alertCaution("500에러 재로그인 해주세요.", 2);
                } else {
                    console.log("404에러 재로그인 해주세요.");
                    // alertCaution("404에러 재로그인 해주세요.", 2);
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