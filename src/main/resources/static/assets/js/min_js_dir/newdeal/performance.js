$(function() {

});

// 선택팝업열기
function popOpen(){
    $('.talk__select-pop').addClass('open');
}

// 페이지 이동
function movePage(url) {
    const ajaxOption = {
        url: url,
        type: "POST",
        dataType: "html"
    };

    $.ajax(ajaxOption).done(function(data){
        const $performance = $('#performance');
        $performance.children().remove();
        $performance.html(data);
    });
}

// 선택후 페이지이동 후 팝업 닫기
function selectMovePage() {
    const url = $('input:radio[name="talk-select"]:checked').val();
    if(url===undefined || url===""){
        alertCaution("입력방식을 선택해주세요.",1);
        return false;
    }
    const ajaxOption = {
        url : url,
        type : "POST",
        dataType : "html"
    }

    $.ajax(ajaxOption).done(function(data){
        const $performance = $('#performance');
        $performance.children().remove();
        $performance.html(data);
    });

    $('.talk__select-pop').removeClass('open');
}

// 엑셀파일인지 검사
function checkFileType(filePath) {
    const fileFormat = filePath.split(".");
    return fileFormat[1] === "xlsx" || fileFormat[1] === "xls";
}

// 엑셀 파일 올렸는지 확인
function filesend() {
    const excelfile = $("#excelfile").val();
    console.log("excelfile : "+excelfile);
    if (excelfile === "" || excelfile == null) {
        //파일이 선택되지 않은 경우
        alertCaution("파일을 선택해주세요.",1);
        return false;
    } else if (!checkFileType(excelfile)) {
        //checkFileType 에서 Excel 확장자가 아닌경우
        alertCaution("엑셀파일이 아닙니다.",1);
        return false;
    }else{
        excelSend();
    }
}

// 엑셀파일 업로드
function excelSend() {
    JWT_Get();

    let url;

    if (accessToken == null && refreshToken == null && insert_id == null) {
        console.log("callinfo(userid)함수 : 토큰&리플레시&로그인한아이디 Null");
        alertCaution("토큰이 만료되었습니다.<BR>다시 로그인해주세요.", 2);
    } else if (accessToken == null) {
        refreshTokenCookie();
    } else {
        const formData = new FormData(document.getElementById('fileSendForm'));
        url = "http://" + $("#backend_url").val() + "/api/performance/excelUpload"; // 호출할 백엔드 API
        console.log("url : " + url);
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
                    console.log("request.status : " + request.status + " => 500에러");
                    alertCaution("500에러 재로그인 해주세요.", 2);
                } else {
                    console.log("request.status : " + request.status + " => 404에러");
                    alertCaution("404에러 재로그인 해주세요.", 2);
                }
            },
            success: function (request) {
                let status = request.status;
                console.log("status : " + status);
                if (status === 200) {
                    $("#excelfile").val('');
                    $('.c-file__input').val('');
                    console.log("엑셀 데이터 전송 성공");
                    console.log("autoNum : "+request.sendData.autoNum)
                    alertLink(request.sendData.autoNum);
                    alertSuccess("엑셀 데이터전송 성공");
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

function alertLink(autoNum) {
    $(document).on("click","#successBtn",function(){
        location.href = "/performance/output/" + autoNum;
        $('#popupId').remove();
    });
}