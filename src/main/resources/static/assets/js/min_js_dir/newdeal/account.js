// 사용자 관련 자바스크립트
console.log("사용자 관련 자바스크립트 적용완료");

// 회원가입 시작
function registerSave(){
    console.log("회원가입 시작");

    if($("#userid").val()==="") {
        alertCaution("아이디를 입력해주세요.", 1)
        return false;
    }

    if($("#password").val()==="") {
        alertCaution("비밀번호를 입력해주세요.", 1)
        return false;
    }

    if($("#check_password").val()==="") {
        alertCaution("비밀번호 확인을 입력해주세요.", 1)
        return false;
    }

    if($("#username").val()==="") {
        alertCaution("이름을 작성해주세요.", 1)
        return false;
    }

    if($("#email").val()==="") {
        alertCaution("이메일을 작성해주세요.", 1)
        return false;
    }

    if($("#teamcode").val()==="") {
        alertCaution("부서를 선택해주세요.", 1)
        return false;
    }

    const formData = new FormData(document.getElementById('registerStart'));

    let url;
    url = $("#backend_protocol").val() + "://" + $("#backend_url").val() + "/api/account/register"; // 호출할 백엔드 API
    console.log("url : "+url);

    $.ajax({
        url: url,
        type: 'post',
        data: formData,
        cache: false,
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        error: function (request) {
            if (request.status === 500) {
                // console.log("request.status : " + request.status + " => 500에러");
                alertCaution("500에러 재로그인 해주세요.", 2);
            } else {
                // console.log("request.status : " + request.status + " => 404에러");
                alertCaution("404에러 재로그인 해주세요.", 2);
            }
        },
        success: function (request) {
            let status = request.status;
            console.log("status : " + status);
            if (status === 200) {
                console.log("저장성공");
                alertLink();
                alertSuccess("회원가입이 완료됬습니다.");
            } else {
                if (request.err_msg2 === null) {
                    alertCaution(request.err_msg, 1);
                } else {
                    alertCaution(request.err_msg + "<br>" + request.err_msg2, 1);
                }
            }
        }
    });
}

// 성공알림창 버튼 누르면 화면이동하는 함수
function alertLink() {
    $(document).on("click","#successBtn",function(){
        location.href = "/login";
        $('#popupId').remove();
    });
}

// 부서선택 팝업창
function btn_team_search(){

}
