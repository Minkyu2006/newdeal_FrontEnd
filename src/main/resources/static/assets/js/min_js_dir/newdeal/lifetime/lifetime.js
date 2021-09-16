// * 생애주기 의사결정 지원 서비스 자바스크립트 초기 입력부분 *

// 신규버튼(초기화)
function absenceInit(){
    $("#ltAbsenceId").val("");
    $("#ltAbsence").val("");
    $("#ltAbsenceCode").val("").removeAttr("readonly");
    $("#ltAbsenceName").val("");
    $("#ltDeterioration").val("");
    $("#ltStandardDeviation").val("");
    $("#ltRemunerationThree").val("");
    $("#ltRemunerationTwo").val("");
    $("#ltRemunerationOne").val("");
    $("#ltRemunerationNum").val("");
    $("#ltStatusTwo").val("");
    $("#ltStatusOne").val("");
    $("#ltStatusNum").val("");
    $("#btnUpdate").css("display","none");
    $("#btnSave").css("display","block");
}

// 생애주기 교량 부재별 평균열화율 수치 등록
function absenceSave(val){
    JWT_Get();

    if (accessToken == null && refreshToken == null && insert_id == null) {
        alertCaution("토큰이 만료되었습니다.<BR>다시 로그인해주세요.", 2);
    } else {

        if($("#ltAbsence").val()==="") {
            alertCaution("부재를 선택해주세요.", 1)
            return false;
        }


        if($("#ltAbsenceCode").val()==="") {
            alertCaution("부재코드를 입력해주세요.", 1)
            return false;
        }

        if($("#ltAbsenceName").val()==="") {
            alertCaution("부재명을 입력해주세요.", 1)
            return false;
        }

        if($("#ltDeterioration").val()==="") {
            alertCaution("평균열화율을 입력해주세요.", 1)
            return false;
        }

        if($("#ltStandardDeviation").val()==="") {
            alertCaution("표준편차를 입력해주세요.", 1)
            return false;
        }


        if($("#ltRemunerationThree").val()==="") {
            alertCaution("보수보강 비용모델 3차항 계수를 입력해주세요.", 1)
            return false;
        }

        if($("#ltRemunerationTwo").val()==="") {
            alertCaution("보수보강 비용모델 2차항 계수를 입력해주세요.", 1)
            return false;
        }

        if($("#ltRemunerationOne").val()==="") {
            alertCaution("보수보강 비용모델 1차항 계수를 입력해주세요.", 1)
            return false;
        }

        if($("#ltRemunerationNum").val()==="") {
            alertCaution("보수보강 비용모델 상수를 입력해주세요.", 1)
            return false;
        }


        if($("#ltStatusTwo").val()==="") {
            alertCaution("상태향상 모델 2차항 계수를 입력해주세요.", 1)
            return false;
        }

        if($("#ltStatusOne").val()==="") {
            alertCaution("상태향상 모델 1차항 계수를 입력해주세요.", 1)
            return false;
        }

        if($("#ltStatusNum").val()==="") {
            alertCaution("상태향상 모델 상수를 입력해주세요.", 1)
            return false;
        }


        let url;

        url = $("#backend_protocol").val() + "://" + $("#backend_url").val() + "/api/absence/save"; // 호출할 백엔드 API
        const formData = new FormData(document.getElementById('absenceForm'));

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
                    if(val===1){
                        alertSuccess("부재별 수치를 저장 했습니다.");
                    }else{
                        alertSuccess("부재별 수치를 수정 했습니다.");
                    }
                    absenceInit();
                    absenceCallList(1);
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

// 생애주기 교량 부재별 평균열화율 리스트 호출
function absenceCallList(page){
    JWT_Get();

    if (accessToken == null && refreshToken == null && insert_id == null) {
        alertCaution("토큰이 만료되었습니다.<BR>다시 로그인해주세요.", 2);
    }else {

        let url;

        page = page - 1;
        if (page < 0) page = 0

        const perPage = 10;
        const perArea = 5;
        let totCnt = 0;

        const $tableListLifeTime = $('#tableListLifeTime');
        const $totalCnt = $('#totalCnt');

        const params = {
            ltAbsence: $("#search_ltAbsence").val(),
            ltAbsenceCode: $("#search_ltAbsenceCode").val(),
            ltAbsenceName: $("#search_ltAbsenceName").val()
        };

        $tableListLifeTime.empty().append('<tr ><td colspan="6" align = "center">조회 중</td></tr>');
        $totalCnt.text('0');

        url = $("#backend_protocol").val() + "://" + $("#backend_url").val() + "/api/absence/list"; // 호출할 백엔드 API

        $.ajax({
            url: url + '?size=' + perPage + '&page=' + page,
            type: 'GET',
            data: params,
            cache: false,
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
                console.log("교량 부재별 평균열화율 리스트 출력");
                if (res.status === 200) {
                    //화면 출력
                    totCnt = res.total_rows;
                    $("#lifetimeAllPaging").jqueryPager({
                        pageSize: perPage,
                        pageBlock: perArea,
                        currentPage: page + 1,
                        pageTotal: totCnt,
                        clickEvent: 'absenceCallList'
                    });

                    if (totCnt === 0) {
                        $tableListLifeTime.empty().append('<tr class="t-c"><td colspan="6" align="center">조회된 데이터가 없습니다.</td></tr>');
                        return;
                    }

                    $totalCnt.text(totCnt);
                    let html = '';
                    $.each(res.datalist, function (key, value) {
                        html += '<tr>';
                        html += '<td >' + echoNull2Blank(value.ltAbsence) + '</td>';
                        html += '<td >' + echoNull2Blank(value.ltAbsenceCode) + '</td>';
                        html += '<td >' + echoNull2Blank(value.ltAbsenceName) + '</td>';
                        html += '<td >' + echoNull2Blank(value.ltDeterioration) + '</td>';
                        html += '<td >' + echoNull2Blank(value.ltStandardDeviation) + '</td>';
                        html += '<td ><button class="c-button" onclick="absenceInfoClick(\'' + echoNull2Blank(value.id) + '\');">선택</button></td>';
                        html += '</tr>';
                    });
                    $tableListLifeTime.html(html);
                }
            }
        });
    }
}

// 생애주기 교량 부재별 평균열화율 정보보기
function absenceInfoClick(id){
    JWT_Get();

    if (accessToken == null && refreshToken == null && insert_id == null) {
        alertCaution("토큰이 만료되었습니다.<BR>다시 로그인해주세요.", 2);
    }else {

        let url;

        const params = {
            id: id
        };

        url = $("#backend_protocol").val() + "://" + $("#backend_url").val() + "/api/absence/info"; // 호출할 백엔드 API

        $.ajax({
            url: url,
            type: 'GET',
            data: params,
            cache: false,
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
                // console.log("교량 부재별 평균열화율 정보 출력");
                if (res.status === 200) {
                    $("#btnUpdate").css("display","block");
                    $("#btnSave").css("display","none");

                    $("#ltAbsenceId").val(res.sendData.absence.id);
                    if(res.sendData.absence.ltAbsence==="바닥판"){
                        $("#ltAbsence").val("바닥판");
                    }else{
                        $("#ltAbsence").val("거더");
                    }
                    $("#ltAbsenceCode").val(res.sendData.absence.ltAbsenceCode).attr("readonly",true);
                    $("#ltAbsenceName").val(res.sendData.absence.ltAbsenceName);
                    $("#ltDeterioration").val(res.sendData.absence.ltDeterioration);
                    $("#ltStandardDeviation").val(res.sendData.absence.ltStandardDeviation);
                    $("#ltRemunerationThree").val(res.sendData.absence.ltRemunerationThree);
                    $("#ltRemunerationTwo").val(res.sendData.absence.ltRemunerationTwo);
                    $("#ltRemunerationOne").val(res.sendData.absence.ltRemunerationOne);
                    $("#ltRemunerationNum").val(res.sendData.absence.ltRemunerationNum);
                    $("#ltStatusTwo").val(res.sendData.absence.ltStatusTwo);
                    $("#ltStatusOne").val(res.sendData.absence.ltStatusOne);
                    $("#ltStatusNum").val(res.sendData.absence.ltStatusNum);
                }
            }
        });
    }
}

// 생애주기 교량 부재별 평균열화율  정말 삭제? 여부확인
function absenceDelCheck(){
    if ($("#ltAbsenceId").val().trim() === '') {
        alertCaution("삭제할 부재를 선택해주세요",1);
        return false;
    }else{
        alertCheck("정말로 해당부재를 삭제하시겠습니까?",null);
    }
}
// 삭제실행 여부확인
function startDel(id,booleanValue) {
    $('#popupId').remove();
    if(booleanValue===true){
        absenceDel();
    }else{
        return false;
    }
}

// 생애주기 교량 부재별 평균열화율 삭제
function absenceDel(){
    JWT_Get();

    if (accessToken == null && refreshToken == null && insert_id == null) {
        alertCaution("토큰이 만료되었습니다.<BR>다시 로그인해주세요.", 2);
    } else {

        let url;

        const params = {
            id: $("#ltAbsenceId").val()
        };

        url = $("#backend_protocol").val() + "://" + $("#backend_url").val() + "/api/absence/del"; // 호출할 백엔드 API

        $.ajax({
            url: url,
            type: 'post',
            data: params,
            cache: false,
            error: function (request) {
                ajaxErrorMsg(request);
            },
            success: function (res) {
                if (res.status === 200) {
                    alertSuccess("삭제가 완료됬습니다.");
                    absenceCallList(1);
                    init();
                }
            }
        });
    }
}