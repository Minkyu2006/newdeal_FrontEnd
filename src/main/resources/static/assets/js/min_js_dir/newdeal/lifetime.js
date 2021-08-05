// * 생애주기 의사결정 지원 서비스 자바스크립트 *

// 부재의 따른 세부부재 select box 생성
function absenceSelect(){
    const $absence = $("#absence").val();
    // console.log("absence : "+$absence);
    const $ltAbsenceCode = $("#ltAbsenceCode");
    let html = "";
    if($absence==="plate"){
        html += "<option value='D1'>"+"콘크리트 바닥판"+"</option>";
        html += "<option value='D2'>"+"강 바닥판"+"</option>";
        html += "<option value='D3'>"+"프리스트레스 콘크리트 바닥판"+"</option>";
        html += "<option value='D4'>"+"중공식 콘크리트 바닥판"+"</option>";
        html += "<option value='D5'>"+"중공식 프리스트레스 콘크리트 바닥판"+"</option>";
        html += "<option value='D6'>"+"콘크리트 슬래브"+"</option>";
        html += "<option value='D7'>"+"프리스트레스 콘크리트 슬래브"+"</option>";
        html += "<option value='D8'>"+"중공식 콘크리트 슬래브"+"</option>";
        html += "<option value='D9'>"+"중공식 프리스트레스 콘크리트 슬래브"+"</option>";
    }else{
        // html += "<option value='G1'>"+"RC T형 거더"+"</option>";
        // html += "<option value='G2'>"+"강 I형 거더"+"</option>";
        // html += "<option value='G3'>"+"PSC BOX 거더"+"</option>";
        // html += "<option value='G4'>"+"강판형 거더"+"</option>";
        // html += "<option value='G5'>"+"프리플렉스 거더"+"</option>";
        html += "<option value='G6'>"+"PSCI 거더"+"</option>";
        // html += "<option value='G7'>"+"RC BOX 거더"+"</option>";
        // html += "<option value='G8'>"+"ST BOX 거더"+"</option>";
    }
    $ltAbsenceCode.html(html);
}

// 생애주기 이진혁박사 부분 저장
function lifeAllTimeSave(){
    JWT_Get();

    if (accessToken == null || refreshToken == null || insert_id == null) {
        // console.log("callinfo(userid)함수 : 토큰&리플레시&로그인한아이디 Null");
        alertCaution("토큰이 만료되었습니다.<BR>다시 로그인해주세요.", 2);
    } else {

        console.log("호출성공");

        const formData = new FormData(document.getElementById('lifeAllTimeForm'));

        let url;
        url = $("#backend_protocol").val() + "://" + $("#backend_url").val() + "/api/lifealltime/save"; // 호출할 백엔드 API
        console.log("url : "+url);

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
                xhr.setRequestHeader("insert_id", insert_id);
            },
            error: function (request) {
                if (request.status === 500) {
                    console.log("request.status : " + request.status + " => 500에러");
                    // alertCaution("500에러 재로그인 해주세요.", 2);
                } else {
                    console.log("request.status : " + request.status + " => 404에러");
                    // alertCaution("404에러 재로그인 해주세요.", 2);
                }
            },
            success: function (request) {
                let status = request.status;
                console.log("status : " + status);
                if (status === 200) {
                    console.log("저장성공");
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
}




//한글을 지우는 함수
function delHangle(evt){
    var objTarget = evt.srcElement || evt.target;
    var _value = event.srcElement.value;
    if(/[ㄱ-ㅎㅏ-ㅡ가-핳]/g.test(_value)) {
        objTarget.value = null;
    }
}
// 소수점한개로 제한한 실수값입력할수있게하는 함수
function isNumberKey(evt) {
    const charCode = (evt.which) ? evt.which : event.keyCode;
    const _value = event.srcElement.value;
    if (event.keyCode < 48 || event.keyCode > 57) {
        if (event.keyCode !== 46) {
            return false;
        }
    }
    // 소수점(.)이 두번 이상 나오지 못하게
    const _pattern0 = /^\d*[.]\d*$/;
    if (_pattern0.test(_value)) {
        if (charCode === 46) {
            return false;
        }
    }
    // 소수점 넷째자리까지만 입력가능
    const _pattern2 = /^\d*[.]\d{4}$/;
    if (_pattern2.test(_value)) {
        return false;
    }
}