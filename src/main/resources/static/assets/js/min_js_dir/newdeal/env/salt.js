
// 계산된값 표출
function countNum(elimentId, value) {
    const $this = $(elimentId);

    $({countNum: $this.text()}).animate({
            countNum: value
        }, {
            duration: 500,
            easing:'linear',
            step: function() {
                $this.text(Math.floor(this.countNum));
            },
            complete: function() {
                $this.text(this.countNum);
            }
        }
    );
}

// 해역선택후 지역데이터 select 생성
function seaCheckChange(){
    const $seaCheck = $("#seaCheck");
    const $seaArea = $("#seaArea");
    let html = '';
    if($seaCheck.val() === "1"){
        html += '<option value ="4.3_11">고성</option>';
        html += '<option value ="2.4_11">속초</option>';
        html += '<option value ="7.7_11">주문진</option>';
        html += '<option value ="6.7_11">삼척</option>';
        html += '<option value ="5.1_12">울진</option>';
        html += '<option value ="3.0_12">영덕</option>';
        html += '<option value ="6.2_12">포항</option>';
        html += '<option value ="7.6_12">울산</option>';
        html += '<option value ="2.2_12">부산</option>';
    }else if($seaCheck.val() === "2"){
        html += '<option value ="11.4_21">고창</option>';
        html += '<option value ="16.0_21">태안</option>';
        html += '<option value ="4.7_21">보령</option>';
        html += '<option value ="1.0_22">강화1</option>';
        html += '<option value ="0.8_22">강화2</option>';
        html += '<option value ="1.1_22">인천</option>';
        html += '<option value ="1.0_22">목포</option>';
        html += '<option value ="1.0_22">아산만</option>';
        html += '<option value ="0.9_22">천수만</option>';
        html += '<option value ="2.2_22">변산</option>';
        html += '<option value ="4.2_22">함평</option>';
    }else{
        html += '<option value ="2.0_31">해남</option>';
        html += '<option value ="1.2_31">고흥</option>';
        html += '<option value ="0.7_31">장흥</option>';
        html += '<option value ="1.2_31">광양</option>';
        html += '<option value ="1.6_32">사천</option>';
        html += '<option value ="3.5_32">거제</option>';
        html += '<option value ="1.1_31">마산</option>';
        html += '<option value ="0.9_31">진해</option>';
    }
    $seaArea.html(html);
}

// 해안가 대기중 비래염분 추정 계산 함수
function seaAir(){
    // console.log("해안가 대기중 비래염분 추정 계산");

    JWT_Get();

    if (accessToken == null && refreshToken == null && insert_id == null) {
        alertCaution("토큰이 만료되었습니다.<BR>다시 로그인해주세요.", 2);
    } else {
        // console.log("계산시작");

        let url;

        url = $("#backend_protocol").val() + "://" + $("#backend_url").val() + "/api/env/salt/seaAir"; // 호출할 백엔드 API
        const param = {
            "seaCheck" : $("#seaCheck").val(),
            "seaArea" : $("#seaArea").val(),
            "seaDistance" : $("#seaDistance").val(),
            "seaHeight" : $("#seaHeight").val()
        }

        $.ajax({
            url: url,
            type: 'post',
            data: param,
            cache: false,
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
                    // console.log("계산성공")
                    console.log("dataResult : "+res.sendData.dataResult);
                    countNum("#seaAirResult", res.sendData.dataResult)

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
