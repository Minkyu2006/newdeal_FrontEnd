// 계측 기반 안전성 추정 데이터 제공 - 교량등록
function safetySave(){
    JWT_Get();

    if (accessToken == null && refreshToken == null && insert_id == null) {
        alertCaution("토큰이 만료되었습니다.<BR>다시 로그인해주세요.", 2);
    } else {

        if($("#sfName").val()==="") {
            alertCaution("교량명을 입력해주세요.", 1)
            return false;
        }

        if($("#sfLength").val()==="") {
            alertCaution("총 길이를 입력해주세요.", 1)
            return false;
        }

        if($("#sfWidth").val()==="") {
            alertCaution("총 폭을 입력해주세요.", 1)
            return false;
        }

        if($("#sfNum").val()==="") {
            alertCaution("경간수를 입력해주세요.", 1)
            return false;
        }

        if($("#sfCompletionYear").val()==="") {
            alertCaution("준공년도를 입력해주세요.", 1)
            return false;
        }

        if($("#sfFactor").val()==="") {
            alertCaution("안전율를 입력해주세요.", 1)
            return false;
        }

        let url;

        url = $("#backend_protocol").val() + "://" + $("#backend_url").val() + "/api/safety/save"; // 호출할 백엔드 API
        const formData = new FormData(document.getElementById('safetyForm'));

        $.ajax({
            url: url,
            type: 'post',
            data: formData,
            cache: false,
            processData: false,
            contentType: false,
            enctype: 'multipart/form-data',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("JWT_AccessToken", accessToken);
                xhr.setRequestHeader("insert_id",insert_id);
            },
            error: function (request) {
                if (request.status === 500) {
                    // console.log("request.status : " + request.status + " => 500에러");
                    alertCaution("500에러 재로그인 해주세요.", 2);
                } else {
                    // console.log("request.status : " + request.status + " => 404에러");
                    alertCaution("404에러 재로그인 해주세요.", 2);
                }
            },
            success: function (res) {
                if (res.status === 200) {
                    console.log(res);
                }else{
                    if (request.err_msg2 === null) {
                        alertCaution(request.err_msg, 1);
                    } else {
                        alertCaution(request.err_msg + "<br>" + request.err_msg2, 1);
                    }
                }
            }
        });
    }
}
