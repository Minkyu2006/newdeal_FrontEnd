
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

// 가중치를 수정하시겠습니까?(Yes,no 라디오버튼)
function weightRadioBtn(value){
    if(value==="yes"){
        $('#group1').prop("checked", true);
        $('#group2').prop("checked", false);
        $('.weight__contents input').attr('readonly', false);
    }else{
        $("#group1").prop("checked", false);
        $("#group2").prop("checked", true);
        $('.weight__contents input').attr('readonly', true);
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

        const $piWeightSafe = $("#piWeightSafe");
        if($piWeightSafe.val()===""){
            $piWeightSafe.val("0.6")
        }
        const $piWeightOld = $("#piWeightOld");
        if($piWeightOld.val()===""){
            $piWeightOld.val("0.1")
        }
        const $piWeightUrgency = $("#piWeightUrgency");
        if($piWeightUrgency.val()===""){
            $piWeightUrgency.val("0.1")
        }
        const $piWeightGoal = $("#piWeightGoal");
        if($piWeightGoal.val()===""){
            $piWeightGoal.val("0.2")
        }
        const $piWeightSafeUtility = $("#piWeightSafeUtility");
        if($piWeightSafeUtility.val()===""){
            $piWeightSafeUtility.val("0.7")
        }
        const $piWeightCostUtility = $("#piWeightCostUtility");
        if($piWeightCostUtility.val()===""){
            $piWeightCostUtility.val("0.3")
        }
        const $piWeightBusiness = $("#piWeightBusiness");
        if($piWeightBusiness.val()===""){
            $piWeightBusiness.val("0.7")
        }
        const $piWeightComplaint = $("#piWeightComplaint");
        if($piWeightComplaint.val()===""){
            $piWeightComplaint.val("0.1")
        }
        const $piWeightBusinessEffect = $("#piWeightBusinessEffect");
        if($piWeightBusinessEffect.val()===""){
            $piWeightBusinessEffect.val("0.2")
        }
        const $piWeightCriticalScore = $("#piWeightCriticalScore");
        if($piWeightCriticalScore.val()===""){
            $piWeightCriticalScore.val("50")
        }

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

// 성공알림창 버튼 누르면 화면이동하는 함수
function alertLink(autoNum) {
    $(document).on("click","#successBtn",function(){
        location.href = "/performance/output/" + autoNum;
        $('#popupId').remove();
    });
}

// Output 값 함수호출
function call_performance(autoNum){

    console.log("사업평가정보 함수호추 ");
    console.log("autoNum : "+autoNum);
    if(autoNum==null){
        location.href="/404";
    }

    JWT_Get();

    let url;

    if (accessToken == null && refreshToken == null && insert_id == null) {
        console.log("callinfo(userid)함수 : 토큰&리플레시&로그인한아이디 Null");
        alertCaution("토큰이 만료되었습니다.<BR>다시 로그인해주세요.", 2);
    } else if (accessToken == null) {
        refreshTokenCookie();
    } else {
        const params = {
            autoNum: autoNum
        };

        url = "http://" + $("#backend_url").val() + "/api/performance/output"; // 호출할 백엔드 API
        console.log("url : " + url);
        $.ajax({
            url: url,
            type: 'POST',
            data: params,
            cache: false,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("JWT_AccessToken", accessToken);
            },
            error: function (request) {
                if (request.status === 500) {
                    console.log("request.status : " + request.status + " => 500에러");
                    alertCaution("500에러 재로그인 해주세요.", 1);
                } else {
                    console.log("request.status : " + request.status + " => 404에러");
                    alertCaution("404에러 재로그인 해주세요.", 1);
                }
            },
            success: function (request) {
                let status = request.status;
                console.log("status : " + status);
                if (status === 200) {
                    console.log("아웃풋 성공");
                    console.log("technicalityScroeList : "+request.sendData.technicalityScroeList);
                    console.log("technicalityRankList : "+request.sendData.technicalityRankList);
                    console.log("technicalityAllScore : "+request.sendData.technicalityAllScore);
                    console.log("technicalityAllRank : "+request.sendData.technicalityAllRank);

                    $("#safetyRankScroe1").text(request.sendData.technicalityRankList[0]+' / '+request.sendData.technicalityScroeList[0]);
                    $("#oldRankScroe1").text(request.sendData.technicalityRankList[1]+' / '+request.sendData.technicalityScroeList[1]);
                    $("#urgencyRankScroe1").text(request.sendData.technicalityRankList[2]+' / '+request.sendData.technicalityScroeList[2]);
                    $("#goalRankScroe1").text(request.sendData.technicalityRankList[3]+' / '+request.sendData.technicalityScroeList[3]);
                    $("#te_allRankScroe1").text(request.sendData.technicalityAllRank+' / '+request.sendData.technicalityAllScore);

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



