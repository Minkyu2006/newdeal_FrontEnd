// 선택팝업열기
function popOpen(){
    $('.talk__select-pop').addClass('open');
}

// Input 첫번째 NEXT버튼 구간(중간저장)
function inputPerformanceNext1(){
    JWT_Get();

    let url;

    if (accessToken == null || refreshToken == null || insert_id == null) {
        // console.log("callinfo(userid)함수 : 토큰&리플레시&로그인한아이디 Null");
        alertCaution("토큰이 만료되었습니다.<BR>다시 로그인해주세요.", 2);
    } else {

        const $piSafetyLevel = $("#piSafetyLevel").val();
        const $piGoalLevel = $("#piGoalLevel").val();

        if($piSafetyLevel==="A"){
            if($piGoalLevel==="B" || $piGoalLevel==="C"){
                alertCaution("안전등급보다 목표등급이 낮을 수 없습니다.",1);
                return false;
            }
        }else if($piSafetyLevel==="B"){
            if($piGoalLevel==="C"){
                alertCaution("안전등급보다 목표등급이 낮을 수 없습니다.",1);
                return false;
            }
        }

        const $piCompletionYear = $("#piCompletionYear").val();
        if($piCompletionYear===""){
            alertCaution("준공연도를 입력해주세요.",1);
            return false;
        }
        const $piErectionCost = $("#piErectionCost").val();
        if($piErectionCost===""){
            alertCaution("취득원가를 입력해주세요.",1);
            return false;
        }
        const $piMaintenanceDelay = $("#piMaintenanceDelay").val();
        if($piMaintenanceDelay===""){
            alertCaution("유지보수 지연기간를 입력해주세요.",1);
            return false;
        }
        const $piAADT = $("#piAADT").val();
        if($piAADT===""){
            alertCaution("연평균일교통량(AADT)를 입력해주세요.",1);
            return false;
        }
        const $piRaterBaseYear = $("#piRaterBaseYear").val();
        if($piRaterBaseYear===""){
            alertCaution("평가 기준년도를 입력해주세요.",1);
            return false;
        }

        const  autoNum = $("#autoNum").val();
        const formData = new FormData(document.getElementById('performance1'));

        // console.log("중간저장 autoNum : "+autoNum);
        if(autoNum===""){
            url = $("#backend_protocol").val() + "://" + $("#backend_url").val() + "/api/performance/middleSaveUpdate/"+"null"; // 호출할 백엔드 API
        }else{
            url = $("#backend_protocol").val() + "://" + $("#backend_url").val() + "/api/performance/middleSaveUpdate/"+autoNum; // 호출할 백엔드 API
        }
        // console.log("url : "+url);

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
                    // console.log("request.status : " + request.status + " => 500에러");
                    alertCaution("500에러 재로그인 해주세요.", 2);
                } else {
                    // console.log("request.status : " + request.status + " => 404에러");
                    alertCaution("404에러 재로그인 해주세요.", 2);
                }
            },
            success: function (request) {
                let status = request.status;
                // console.log("status : " + status);
                if (status === 200) {
                    // console.log("autoNum : "+request.sendData.autoNum);
                    $("#autoNum").val(request.sendData.autoNum)
                    movePage('/performance/performance4');
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

// 현재 로그인한 아이디에서 입력중에 중간에 저장한 대안이 있는지 확인하기
function inputMiddleSaveCheck(){

    // 1. 계속작성할건지 여부를 묻고 하겠다고하면 해당페이지로 이동 대안의 일련번호를 던져준다.
    // 2. 일련번호는 한번저장되면 무조건 입력이되어있어야한다.
    // 3. 안하겠다고하면 해당 게시물삭제 후 새로 저장하는 performance3으로 이동

    JWT_Get();

    let url;

    if (accessToken == null && refreshToken == null && insert_id == null) {
        // console.log("callinfo(userid)함수 : 토큰&리플레시&로그인한아이디 Null");
        alertCaution("토큰이 만료되었습니다.<BR>다시 로그인해주세요.", 2);
    } else if (accessToken == null) {
        refreshTokenCookie();
    } else {
        url = $("#backend_protocol").val()+"://" + $("#backend_url").val() + "/api/performance/middleCheck"; // 호출할 백엔드 API
        // console.log("url : " + url);
        $.ajax({
            url: url,
            type: 'POST',
            cache: false,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("JWT_AccessToken", accessToken);
                xhr.setRequestHeader("insert_id", insert_id);
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
            success: function (request) {
                let status = request.status;
                // console.log("status : " + status);
                if (status === 200) {
                    if(request.sendData.middleSave===1){
                        // console.log("중간저장 게시물이 존재함");
                        $("#autoNum").val(request.sendData.piAutoNum);
                        alertMiddleSaveCheck("작성중 완료되지 않은 대안이 존재합니다.<BR>계속 작성하시겠습니까?");
                    }else{
                        console.log("중간저장 게시물이 존재하지 않음");
                    }
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

// 중간저장 데이터 호출하기
function middleData(autoNum){

    JWT_Get();

    let url;

    if (accessToken == null && refreshToken == null && insert_id == null) {
        // console.log("callinfo(userid)함수 : 토큰&리플레시&로그인한아이디 Null");
        alertCaution("토큰이 만료되었습니다.<BR>다시 로그인해주세요.", 2);
    } else if (accessToken == null) {
        refreshTokenCookie();
    } else {

        // console.log("호출할 일련번호 : "+autoNum);

        const params = {
            autoNum: autoNum
        };

        url = $("#backend_protocol").val()+"://" + $("#backend_url").val() + "/api/performance/middleData"; // 호출할 백엔드 API
        // console.log("url : " + url);
        $.ajax({
            url: url,
            type: 'POST',
            data : params,
            cache: false,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("JWT_AccessToken", accessToken);
                xhr.setRequestHeader("insert_id", insert_id);
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
            success: function (request) {
                let status = request.status;
                // console.log("status : " + status);
                if (status === 200) {
                    if(request.sendData.performanceData.piFacilityType==="교량"){
                        $('#group1-1').prop("checked", true);
                    }else if(request.sendData.performanceData.piFacilityType==="보도육교"){
                        $('#group1-2').prop("checked", true);
                    }else if(request.sendData.performanceData.piFacilityType==="터널"){
                        $('#group1-3').prop("checked", true);
                    }else if(request.sendData.performanceData.piFacilityType==="지하차도"){
                        $('#group1-4').prop("checked", true);
                    }else if(request.sendData.performanceData.piFacilityType==="절토사면"){
                        $('#group1-5').prop("checked", true);
                    }else{
                        $('#group1-6').prop("checked", true);
                    }
                    $("#piFacilityName").val(request.sendData.performanceData.piFacilityName);
                    $("#piCompletionYear").val(request.sendData.performanceData.piCompletionYear);
                    $("#piPublicYear").val(request.sendData.performanceData.piPublicYear);
                    $("#piType").val(request.sendData.performanceData.piType);
                    $("#piErectionCost").val(request.sendData.performanceData.piErectionCost);

                    if(request.sendData.performanceData.piSafetyLevel==="A"){
                        $('#piSafetyLevel').val('A').prop("selected",true);
                    }else if(request.sendData.performanceData.piSafetyLevel==="B"){
                        $('#piSafetyLevel').val('B').prop("selected",true);
                    }else if(request.sendData.performanceData.piSafetyLevel==="C"){
                        $('#piSafetyLevel').val('C').prop("selected",true);
                    }else if(request.sendData.performanceData.piSafetyLevel==="D"){
                        $('#piSafetyLevel').val('D').prop("selected",true);
                    }else{
                        $('#piSafetyLevel').val('E').prop("selected",true);
                    }

                    if(request.sendData.performanceData.piGoalLevel==="A"){
                        $('#piGoalLevel').val('A').prop("selected",true);
                    }else if(request.sendData.performanceData.piGoalLevel==="B"){
                        $('#piGoalLevel').val('B').prop("selected",true);
                    }else{
                        $('#piGoalLevel').val('C').prop("selected",true);
                    }

                    $("#piMaintenanceDelay").val(request.sendData.performanceData.piMaintenanceDelay);
                    $("#piAADT").val(request.sendData.performanceData.piAADT);
                    $("#piManagement").val(request.sendData.performanceData.piManagement);
                    $("#piAgency").val(request.sendData.performanceData.piAgency);

                    $("#piRaterBaseYear").val(request.sendData.performanceData.piRaterBaseYear);
                    $("#piRater").val(request.sendData.performanceData.piRater);
                    $("#piRaterBelong").val(request.sendData.performanceData.piRaterBelong);
                    $("#piRaterPhone").val(request.sendData.performanceData.piRaterPhone);

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

// 중간저장 계속할껀지 안할껀지 여부묻고 페이지이동 or 게시물삭제후 새로저장
function startYesorNo(check){
    $('#popupId').remove();
    if(check){
        movePage('/performance/performance3')
    }else{

        JWT_Get();

        let url;

        if (accessToken == null && refreshToken == null && insert_id == null) {
            // console.log("callinfo(userid)함수 : 토큰&리플레시&로그인한아이디 Null");
            alertCaution("토큰이 만료되었습니다.<BR>다시 로그인해주세요.", 2);
        } else if (accessToken == null) {
            refreshTokenCookie();
        } else {

            //삭제하는 함수 한다음 페이지이동
            const  autoNum = $("#autoNum").val();
            // console.log("삭제할 일련번호 : "+autoNum);

            const params = {
                autoNum: autoNum
            };

            url = $("#backend_protocol").val()+"://" + $("#backend_url").val() + "/api/performance/middleDataDel"; // 호출할 백엔드 API
            // console.log("url : " + url);
            $.ajax({
                url: url,
                type: 'POST',
                data : params,
                cache: false,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("JWT_AccessToken", accessToken);
                    xhr.setRequestHeader("insert_id", insert_id);
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
                success: function (request) {
                    let status = request.status;
                    // console.log("status : " + status);
                    if (status === 200) {
                        $("#autoNum").val("");
                        movePage('/performance/performance1')
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
        // console.log("callinfo(userid)함수 : 토큰&리플레시&로그인한아이디 Null");
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

        url = $("#backend_protocol").val()+"://" + $("#backend_url").val() + "/api/performance/excelUpload"; // 호출할 백엔드 API
        // console.log("url : " + url);
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
            success: function (request) {
                let status = request.status;
                // console.log("status : " + status);
                if (status === 200) {
                    $("#excelfile").val('');
                    $('.c-file__input').val('');
                    // console.log("엑셀 데이터 전송 성공");
                    // console.log("autoNum : "+request.sendData.autoNum)
                    alertLink(request.sendData.autoNum);
                    alertSuccess("업로드를 완료했습니다.");
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

        url = $("#backend_protocol").val()+"://" + $("#backend_url").val() + "/api/performance/output"; // 호출할 백엔드 API
        console.log("url : " + url);
        $.ajax({
            url: url,
            type: 'POST',
            data: params,
            cache: false,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("JWT_AccessToken", accessToken);
                xhr.setRequestHeader("insert_id",insert_id);
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

                    // 시설 정보 테이블
                    const $outputTableFacility = $('#outputTableFacility');
                    let html = "";

                    html += "<thead>";
                        html += "<tr>";
                            html += "<th></th>";
                                for(let j=0; j<request.sendData.performanceSize; j++){
                                    html += "<td>"+request.sendData.performanceList[j].piBusinessType+' 대안'+"</td>";
                                }
                            html += "</tr>";
                    html += "</thead>";

                    html += "<tbody>";

                    html += "<tr>";
                        html += '<th>'+'시설유형'+'</th>';
                            for(let j=0; j<request.sendData.performanceSize; j++){
                                html += '<td>'+request.sendData.performanceList[j].piFacilityType+'</td>';
                            }
                    html += '</tr>';

                    html += '<tr>';
                        html += '<th>'+'종별구분'+'</th>';
                            for(let j=0; j<request.sendData.performanceSize; j++){
                                html += '<td>'+request.sendData.performanceList[j].piKind+'</td>';
                            }
                    html += '</tr>';

                    html += '<tr>';
                    html += '<th>'+'준공연도'+'</th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html += '<td>'+request.sendData.performanceList[j].piCompletionYear+'</td>';
                    }
                    html += '</tr>';

                    html += '<tr>';
                    html += '<th>'+'공용연수'+'</th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html += '<td>'+request.sendData.performanceList[j].piPublicYear+'</td>';
                    }
                    html += '</tr>';

                    html += '<tr>';
                    html += '<th>'+'형식구분'+'</th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html += '<td>'+request.sendData.performanceList[j].piType+'</td>';
                    }
                    html += '</tr>';

                    html += '<tr>';
                    html += '<th>'+'취득원가'+'</th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html += '<td>'+request.sendData.performanceList[j].piErectionCost+'</td>';
                    }
                    html += '</tr>';

                    html += '<tr>';
                    html += '<th>'+'안전등급'+'</th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html += '<td>'+request.sendData.performanceList[j].piSafetyLevel+'</td>';
                    }
                    html += '</tr>';

                    html += '<tr>';
                    html += '<th>'+'목표등급'+'</th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html += '<td>'+request.sendData.performanceList[j].piGoalLevel+'</td>';
                    }
                    html += '</tr>';

                    html += '<tr>';
                    html += '<th>'+'유지보수 지연기간'+'</th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html += '<td>'+request.sendData.performanceList[j].piMaintenanceDelay+'</td>';
                    }
                    html += '</tr>';

                    html += '<tr>';
                    html += '<th>'+'관리주체'+'</th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html += '<td>'+request.sendData.performanceList[j].piManagement+'</td>';
                    }
                    html += '</tr>';

                    html += '<tr>';
                    html += '<th>'+'관리감독기관'+'</th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html += '<td>'+request.sendData.performanceList[j].piAgency+'</td>';
                    }
                    html += '</tr>';

                    html += '</tbody>';

                    $outputTableFacility.html(html);

                    // 이용 정보 테이블
                    const $outputTableUsage = $('#outputTableUsage');
                    let html2 = "";
                    html2 += "<thead>";
                        html2 += "<tr>";
                            html2 += "<th></th>";
                            for(let j=0; j<request.sendData.performanceSize; j++){
                                html2 += "<td>"+request.sendData.performanceList[j].piBusinessType+' 대안'+"</td>";
                            }
                        html2 += '</tr>';
                    html2 += '</thead>';
                    html2 += '<tbody>';
                        html2 += '<tr>';
                        html2 += '<th>'+'연평균일교통량(AADT)'+'</th>';
                        for(let j=0; j<request.sendData.performanceSize; j++){
                            html2 += '<td>'+request.sendData.performanceList[j].piAADT+'</td>';
                        }
                        html2 += '</tr>';
                    html2 += '</tbody>';
                    $outputTableUsage.html(html2);

                    // 사업 정보 테이블
                    const $outputTableBusiness = $('#outputTableBusiness');
                    let html3 = '';
                    html3 += '<thead>';
                    html3 += '<tr>';
                    html3 += '<th></th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html3 += '<td>'+request.sendData.performanceList[j].piBusinessType+' 대안'+'</td>';
                    }
                    html3 += '</tr>';
                    html3 += '</thead>';
                    html3 += '<tbody>';

                    html3 += '<tr>';
                    html3 += '<th>'+'사업구분'+'</th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html3 += '<td>'+request.sendData.performanceList[j].piBusiness+'</td>';
                    }
                    html3 += '</tr>';

                    html3 += '<tr>';
                    html3 += '<th>'+'사업유형'+'</th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html3 += '<td>'+request.sendData.performanceList[j].piBusinessType+'</td>';
                    }
                    html3 += '</tr>';

                    html3 += '<tr>';
                    html3 += '<th>'+'대상부재'+'</th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html3 += '<td>'+request.sendData.performanceList[j].piTargetAbsence+'</td>';
                    }
                    html3 += '</tr>';

                    html3 += '<tr>';
                    html3 += '<th>'+'사업분류'+'</th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html3 += '<td>'+request.sendData.performanceList[j].piBusinessClassification+'</td>';
                    }
                    html3 += '</tr>';

                    html3 += '<tr>';
                    html3 += '<th>'+'사업내용'+'</th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html3 += '<td>'+request.sendData.performanceList[j].piBusinessInformation+'</td>';
                    }
                    html3 += '</tr>';

                    html3 += '<tr>';
                    html3 += '<th>'+'사업비용'+'</th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html3 += '<td>'+request.sendData.performanceList[j].piBusinessExpenses+'</td>';
                    }
                    html3 += '</tr>';

                    html3 += '<tr>';
                    html3 += '<th>'+'사업전 부재 안전등급'+'</th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html3 += '<td>'+request.sendData.performanceList[j].piBeforeSafetyRating+'</td>';
                    }
                    html3 += '</tr>';

                    html3 += '<tr>';
                    html3 += '<th>'+'사업후 부재 안전등급'+'</th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html3 += '<td>'+request.sendData.performanceList[j].piAfterSafetyRating+'</td>';
                    }
                    html3 += '</tr>';

                    html3 += '</tbody>';

                    $outputTableBusiness.html(html3);

                    // 여건 정보 테이블
                    const $outputTableCondition = $('#outputTableCondition');
                    let html4 = '';
                    html4 += '<thead>';
                    html4 += '<tr>';
                    html4 += '<th></th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html4 += '<td>'+request.sendData.performanceList[j].piBusinessType+' 대안'+'</td>';
                    }
                    html4 += '</tr>';
                    html4 += '</thead>';

                    html4 += '<tbody>';

                    html4 += '<tr>';
                    html4 += '<th>'+'법에 따른 의무사업'+'</th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html4 += '<td>'+request.sendData.performanceList[j].piBusinessObligatory+'</td>';
                    }
                    html4 += '</tr>';

                    html4 += '<tr>';
                    html4 += '<th>'+'법정계획에 따른 의무사업'+'</th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html4 += '<td>'+request.sendData.performanceList[j].piBusinessMandatory+'</td>';
                    }
                    html4 += '</tr>';

                    html4 += '<tr>';
                    html4 += '<th>'+'자제계획/의결에 따른 사업'+'</th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html4 += '<td>'+request.sendData.performanceList[j].piBusinessPlanned+'</td>';
                    }
                    html4 += '</tr>';

                    html4 += '<tr>';
                    html4 += '<th>'+'최근 1년 간 민원 및 사고발생 건수'+'</th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html4 += '<td>'+request.sendData.performanceList[j].piWhether+'</td>';
                    }
                    html4 += '</tr>';

                    html4 += '</tbody>';

                    $outputTableCondition.html(html4);

                    // 평가 정보 테이블
                    const $outputTableEvaluation = $('#outputTableEvaluation');
                    let html5 = '';
                    html5 += '<thead>';
                    html5 += '<tr>';
                    html5 += '<th></th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html5 += '<td>'+request.sendData.performanceList[j].piBusinessType+' 대안'+'</td>';
                    }
                    html5 += '</tr>';
                    html5 += '</thead>';

                    html5 += '<tbody>';

                    html5 += '<tr>';
                    html5 += '<th>'+'평가 기준년도'+'</th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html5 += '<td>'+request.sendData.performanceList[j].piRaterBaseYear+'</td>';
                    }
                    html5 += '</tr>';

                    html5 += '<tr>';
                    html5 += '<th>'+'평가자'+'</th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html5 += '<td>'+request.sendData.performanceList[j].piRater+'</td>';
                    }
                    html5 += '</tr>';

                    html5 += '<tr>';
                    html5 += '<th>'+'평가자 소속'+'</th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html5 += '<td>'+request.sendData.performanceList[j].piRaterBelong+'</td>';
                    }
                    html5 += '</tr>';

                    html5 += '<tr>';
                    html5 += '<th>'+'평가자 연락처'+'</th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html5 += '<td>'+request.sendData.performanceList[j].piRaterPhone+'</td>';
                    }
                    html5 += '</tr>';

                    html5 += '</tbody>';
                    $outputTableEvaluation.html(html5);

                    // 가중치 테이블 기술성
                    const $outputTableWeightT = $('#outputTableWeightT');
                    let html6 = '';
                    html6 += '<thead>';
                    html6 += '<tr>';
                    html6 += '<th></th>';
                    html6 += '<th>'+'적용 가중치'+'</th>';
                    html6 += '<th>'+'기준 가중치'+'</th>';
                    html6 += "</tr>";
                    html6 += '</thead>';

                    html6 += '<tbody>';

                    html6 += '<tr>';
                    html6 += '<th>'+'안전성'+'</th>';
                    html6 += '<td>'+request.sendData.weightList.piWeightSafe+'</td>';
                    html6 += '<td>'+'0.6'+'</td>';
                    html6 += '</tr>';

                    html6 += '<tr>';
                    html6 += '<th>'+'노후도'+'</th>';
                    html6 += '<td>'+request.sendData.weightList.piWeightOld+'</td>';
                    html6 += '<td>'+'0.1'+'</td>';
                    html6 += '</tr>';

                    html6 += '<tr>';
                    html6 += '<th>'+'시급성'+'</th>';
                    html6 += '<td>'+request.sendData.weightList.piWeightUrgency+'</td>';
                    html6 += '<td>'+'0.1'+'</td>';
                    html6 += '</tr>';

                    html6 += '<tr>';
                    html6 += '<th>'+'목표달성도'+'</th>';
                    html6 += '<td>'+request.sendData.weightList.piWeightGoal+'</td>';
                    html6 += '<td>'+'0.2'+'</td>';
                    html6 += '</tr>';

                    html6 += '</tbody>';
                    $outputTableWeightT.html(html6);

                    // 가중치 테이블 경제성
                    const $outputTableWeightE = $('#outputTableWeightE');
                    let html7 = '';
                    html7 += '<thead>';
                    html7 += '<tr>';
                    html7 += '<th></th>';
                    html7 += '<th>'+'적용 가중치'+'</th>';
                    html7 += '<th>'+'기준 가중치'+'</th>';
                    html7 += "</tr>";
                    html7 += '</thead>';

                    html7 += '<tbody>';

                    html7 += '<tr>';
                    html7 += '<th>'+'안전효용 개선 효율성'+'</th>';
                    html7 += '<td>'+request.sendData.weightList.piWeightSafeUtility+'</td>';
                    html7 += '<td>'+'0.7'+'</td>';
                    html7 += '</tr>';

                    html7 += '<tr>';
                    html7 += '<th>'+'자산가치 개선 효율성'+'</th>';
                    html7 += '<td>'+request.sendData.weightList.piWeightCostUtility+'</td>';
                    html7 += '<td>'+'0.3'+'</td>';
                    html7 += '</tr>';

                    html7 += '</tbody>';
                    $outputTableWeightE.html(html7);

                    // 가중치 테이블 정책성
                    const $outputTableWeightP= $('#outputTableWeightP');
                    let html8 = '';
                    html8 += '<thead>';
                    html8 += '<tr>';
                    html8 += '<th></th>';
                    html8 += '<th>'+'적용 가중치'+'</th>';
                    html8 += '<th>'+'기준 가중치'+'</th>';
                    html8 += "</tr>";
                    html8 += '</thead>';

                    html8 += '<tbody>';

                    html8 += '<tr>';
                    html8 += '<th>'+'안전효용 개선 효율성'+'</th>';
                    html8 += '<td>'+request.sendData.weightList.piWeightBusiness+'</td>';
                    html8 += '<td>'+'0.7'+'</td>';
                    html8 += '</tr>';

                    html8 += '<tr>';
                    html8 += '<th>'+'자산가치 개선 효율성'+'</th>';
                    html8 += '<td>'+request.sendData.weightList.piWeightComplaint+'</td>';
                    html8 += '<td>'+'0.1'+'</td>';
                    html8 += '</tr>';

                    html8 += '<tr>';
                    html8 += '<th>'+'자산가치 개선 효율성'+'</th>';
                    html8 += '<td>'+request.sendData.weightList.piWeightBusinessEffect+'</td>';
                    html8 += '<td>'+'0.2'+'</td>';
                    html8 += '</tr>';

                    html8 += '</tbody>';
                    $outputTableWeightP.html(html8);

                    // 노후화_기술성 테이블
                    const $technicalityTable = $('#technicalityTable');
                    let html9 = '';
                    html9 += '<thead>';
                    html9 += '<tr>';
                    html9 += '<th></th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html9 += '<td>'+request.sendData.performanceList[j].piBusinessType+' 대안'+'</td>';
                    }
                    html9 += '</tr>';
                    html9 += '</thead>';

                    html9 += '<tbody>';

                    html9 += '<tr>';
                    html9 += '<th></th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html9 += '<td>'+'평가등급 / 평가점수'+'</td>';
                    }
                    html9 += '</tr>';

                    html9 += '<tr>';
                    html9 += '<th>'+'안전성'+'</th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html9 += '<td>'+request.sendData.technicalityRank[j][0]+" / "+request.sendData.technicalityScore[j][0]+'</td>';
                    }
                    html9 += '</tr>';

                    html9 += '<tr>';
                    html9 += '<th>'+'노후도'+'</th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html9 += '<td>'+request.sendData.technicalityRank[j][1]+" / "+request.sendData.technicalityScore[j][1]+'</td>';
                    }
                    html9 += '</tr>';

                    html9 += '<tr>';
                    html9 += '<th>'+'시급성'+'</th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html9 += '<td>'+request.sendData.technicalityRank[j][2]+" / "+request.sendData.technicalityScore[j][2]+'</td>';
                    }
                    html9 += '</tr>';

                    html9 += '<tr>';
                    html9 += '<th>'+'목표성능 달성도'+'</th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html9 += '<td>'+request.sendData.technicalityRank[j][3]+" / "+request.sendData.technicalityScore[j][3]+'</td>';
                    }
                    html9 += '</tr>';

                    html9 += '<tr>';
                    html9 += '<th style="color: red">'+'기술성 종합점수'+'</th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html9 += '<td style="color: red">'+request.sendData.technicalityRank[j][4]+" / "+request.sendData.technicalityScore[j][4]+'</td>';
                    }
                    html9 += '</tr>';

                    html9 += '</tbody>';
                    $technicalityTable.html(html9);

                    // 노후화_경제성 테이블
                    const $economyTable = $('#economyTable');
                    let html10 = '';

                    html10 += '<thead>';
                    html10 += '<tr>';
                    html10 += '<th></th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html10 += '<td>'+request.sendData.performanceList[j].piBusinessType+' 대안'+'</td>';
                    }
                    html10 += '</tr>';
                    html10 += '</thead>';

                    html10 += '<tbody>';

                    html10 += '<tr>';
                    html10 += '<th></th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html10 += '<td>'+'평가등급 / 평가점수'+'</td>';
                    }
                    html10 += '</tr>';

                    html10 += '<tr>';
                    html10 += '<th>'+'자산가치 개선 효율성'+'</th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html10 += '<td>'+request.sendData.economyRank[j][0]+" / "+request.sendData.economyScore[j][0]+'</td>';
                    }
                    html10 += '</tr>';

                    html10 += '<tr>';
                    html10 += '<th>'+'안전효용 개선 효율성'+'</th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html10 += '<td>'+request.sendData.economyRank[j][1]+" / "+request.sendData.economyScore[j][1]+'</td>';
                    }
                    html10 += '</tr>';

                    html10 += '<tr>';
                    html10 += '<th style="color: red">'+'경제성 종합점수'+'</th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html10 += '<td style="color: red">'+request.sendData.economyRank[j][2]+" / "+request.sendData.economyScore[j][2]+'</td>';
                    }
                    html10 += '</tr>';

                    html10 += '</tbody>';

                    $economyTable.html(html10);

                    // 노후화_정책성 테이블
                    const $policyTable = $('#policyTable');
                    let html11 = '';
                    html11 += '<thead>';
                    html11 += '<tr>';
                    html11 += '<th></th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html11 += '<td>'+request.sendData.performanceList[j].piBusinessType+' 대안'+'</td>';
                    }
                    html11 += '</tr>';
                    html11 += '</thead>';

                    html11 += '<tbody>';

                    html11 += '<tr>';
                    html11 += '<th></th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html11 += '<td>'+'평가등급 / 평가점수'+'</td>';
                    }
                    html11 += '</tr>';

                    html11 += '<tr>';
                    html11 += '<th>'+'사업추진 타당성'+'</th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html11 += '<td>'+request.sendData.policyRank[j][0]+" / "+request.sendData.policyScore[j][0]+'</td>';
                    }
                    html11 += '</tr>';

                    html11 += '<tr>';
                    html11 += '<th>'+'민원 및 사고 대응성'+'</th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html11 += '<td>'+request.sendData.policyRank[j][1]+" / "+request.sendData.policyScore[j][1]+'</td>';
                    }
                    html11 += '</tr>';

                    html11 += '<tr>';
                    html11 += '<th>'+'사업효과 범용성'+'</th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html11 += '<td>'+request.sendData.policyRank[j][2]+" / "+request.sendData.policyScore[j][2]+'</td>';
                    }
                    html11 += '</tr>';

                    html11 += '<tr>';
                    html11 += '<th style="color: red">'+'정책성 종합점수'+'</th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html11 += '<td style="color: red">'+request.sendData.policyRank[j][3]+" / "+request.sendData.policyScore[j][3]+'</td>';
                    }
                    html11 += '</tr>';

                    html11 += '</tbody>';

                    $policyTable.html(html11);

                    // 종합평가표 테이블
                    const $allScoreRankTable = $('#allScoreRankTable');
                    let html12 = '';
                    html12 += '<thead>';
                    html12 += '<tr>';
                    html12 += '<th></th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html12 += '<td>'+request.sendData.performanceList[j].piBusinessType+' 대안'+'</td>';
                    }
                    html12 += '</tr>';
                    html12 += '</thead>';

                    html12 += '<tbody>';

                    html12 += '<tr>';
                    html12 += '<th style="color: red">'+'사업대안별 종합등급'+'</th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html12 += '<td style="color: red">'+request.sendData.allScroeMap[j][0]+'</td>';
                    }
                    html12 += '</tr>';

                    html12 += '<tr>';
                    html12 += '<th style="color: red">'+'사업대안별 종합점수'+'</th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html12 += '<td style="color: red">'+request.sendData.allRankMap[j][0]+'</td>';
                    }
                    html12 += '</tr>';

                    html12 += '<tr>';
                    html12 += '<th style="color: red">'+'사업 추진 가능여부 평가'+'</th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html12 += '<td style="color: red">'+request.sendData.allBusinessMap[j][0]+'</td>';
                    }
                    html12 += '</tr>';

                    html12 += '<tr>';
                    html12 += '<th style="color: red">'+'사업 우수대안 평가'+'</th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html12 += '<td style="color: red">'+request.sendData.allGreate[j]+'</td>';
                    }
                    html12 += '</tr>';

                    html12 += '</tbody>';

                    $allScoreRankTable.html(html12);




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



