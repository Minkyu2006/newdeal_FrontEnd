
// 선택팝업열기
function popOpen(){
    $('.talk__select-pop').addClass('open');
}

// 현재 로그인한 아이디에서 입력중에 중간에 저장한 대안이 있는지 확인하기
function inputMiddleSaveCheck(){

    // 1. 계속작성할건지 여부를 묻고 하겠다고하면 해당페이지로 이동 대안의 일련번호를 던져준다.
    // 2. 일련번호는 한번저장되면 무조건 입력이되어있어야한다.
    // 3. 안하겠다고하면 해당 게시물삭제 후 새로 저장하는 performance3으로 이동

    JWT_Get();

    let url;

    if (accessToken == null && refreshToken == null && insert_id == null) {
        console.log("callinfo(userid)함수 : 토큰&리플레시&로그인한아이디 Null");
        alertCaution("토큰이 만료되었습니다.<BR>다시 로그인해주세요.", 2);
    } else if (accessToken == null) {
        refreshTokenCookie();
    } else {
        url = $("#backend_protocol").val()+"://" + $("#backend_url").val() + "/api/performance/middleCheck"; // 호출할 백엔드 API
        console.log("url : " + url);
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
                    if(request.sendData.middleSave===1){
                        console.log("중간저장 게시물이 존재함");
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
        console.log("callinfo(userid)함수 : 토큰&리플레시&로그인한아이디 Null");
        alertCaution("토큰이 만료되었습니다.<BR>다시 로그인해주세요.", 2);
    } else if (accessToken == null) {
        refreshTokenCookie();
    } else {

        console.log("호출할 일련번호 : "+autoNum);

        const params = {
            autoNum: autoNum
        };

        url = $("#backend_protocol").val()+"://" + $("#backend_url").val() + "/api/performance/middleData"; // 호출할 백엔드 API
        console.log("url : " + url);
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
            console.log("callinfo(userid)함수 : 토큰&리플레시&로그인한아이디 Null");
            alertCaution("토큰이 만료되었습니다.<BR>다시 로그인해주세요.", 2);
        } else if (accessToken == null) {
            refreshTokenCookie();
        } else {

            //삭제하는 함수 한다음 페이지이동
            const  autoNum = $("#autoNum").val();
            console.log("삭제할 일련번호 : "+autoNum);

            const params = {
                autoNum: autoNum
            };

            url = $("#backend_protocol").val()+"://" + $("#backend_url").val() + "/api/performance/middleDataDel"; // 호출할 백엔드 API
            console.log("url : " + url);
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

        url = $("#backend_protocol").val()+"://" + $("#backend_url").val() + "/api/performance/excelUpload"; // 호출할 백엔드 API
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
    console.log("backend_url : "+$("#backend_url").val());
    console.log("backend_protocol : "+$("#backend_protocol").val());

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

                    console.log("piWeightSafe : "+request.sendData.performanceList[0].piFacilityType);
                    // console.log("piWeightOld : "+request.sendData.performanceList[1].piWeightOld);
                    console.log("performanceSize : "+request.sendData.performanceSize);

                    // 시설 정보 테이블
                    const $outputTableFacility = $('#outputTableFacility');
                    let html = "";

                    html += "<thead>";
                        html += "<tr>";
                            html += "<th></th>";
                                for(let j=0; j<request.sendData.performanceSize; j++){
                                    html += "<th>"+request.sendData.performanceList[j].piBusinessType+' 대안'+"</th>";
                                }
                            html += "</tr>";
                    html += "</thead>";

                    html += "<tbody>";

                    html += "<tr>";
                        html += '<th>'+'시설유형'+'</th>';
                            for(let j=0; j<request.sendData.performanceSize; j++){
                                html += '<th>'+request.sendData.performanceList[j].piFacilityType+'</th>';
                            }
                    html += '</tr>';

                    html += '<tr>';
                        html += '<th>'+'종별구분'+'</th>';
                            for(let j=0; j<request.sendData.performanceSize; j++){
                                html += '<th>'+request.sendData.performanceList[j].piKind+'</th>';
                            }
                    html += '</tr>';

                    html += '<tr>';
                    html += '<th>'+'준공연도'+'</th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html += '<th>'+request.sendData.performanceList[j].piCompletionYear+'</th>';
                    }
                    html += '</tr>';

                    html += '<tr>';
                    html += '<th>'+'공용연수'+'</th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html += '<th>'+request.sendData.performanceList[j].piPublicYear+'</th>';
                    }
                    html += '</tr>';

                    html += '<tr>';
                    html += '<th>'+'형식구분'+'</th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html += '<th>'+request.sendData.performanceList[j].piType+'</th>';
                    }
                    html += '</tr>';

                    html += '<tr>';
                    html += '<th>'+'취득원가'+'</th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html += '<th>'+request.sendData.performanceList[j].piErectionCost+'</th>';
                    }
                    html += '</tr>';

                    html += '<tr>';
                    html += '<th>'+'안전등급'+'</th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html += '<th>'+request.sendData.performanceList[j].piSafetyLevel+'</th>';
                    }
                    html += '</tr>';

                    html += '<tr>';
                    html += '<th>'+'목표등급'+'</th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html += '<th>'+request.sendData.performanceList[j].piGoalLevel+'</th>';
                    }
                    html += '</tr>';

                    html += '<tr>';
                    html += '<th>'+'유지보수 지연기간'+'</th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html += '<th>'+request.sendData.performanceList[j].piMaintenanceDelay+'</th>';
                    }
                    html += '</tr>';

                    html += '<tr>';
                    html += '<th>'+'관리주체'+'</th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html += '<th>'+request.sendData.performanceList[j].piManagement+'</th>';
                    }
                    html += '</tr>';

                    html += '<tr>';
                    html += '<th>'+'관리감독기관'+'</th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html += '<th>'+request.sendData.performanceList[j].piAgency+'</th>';
                    }
                    html += '</tr>';

                    html += '</tbody>';

                    $outputTableFacility.html(html);

                    // 이용 정보 테이블
                    const $outputTableUsage = $('#outputTableUsage');
                    let html2 = "";
                    html2 += '<thead>';
                        html2 += '<tr>';
                            html2 += '<th></th>';
                            for(let j=0; j<request.sendData.performanceSize; j++){
                                html2 += '<th>'+request.sendData.performanceList[j].piBusinessType+' 대안'+'</th>';
                            }
                        html2 += '</tr>';
                    html2 += '</thead>';
                    html2 += '<tbody>';
                        html2 += '<tr>';
                        html2 += '<th>'+'연평균일교통량(AADT)'+'</th>';
                        for(let j=0; j<request.sendData.performanceSize; j++){
                            html2 += '<th>'+request.sendData.performanceList[j].piAADT+'</th>';
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
                        html3 += '<th>'+request.sendData.performanceList[j].piBusinessType+' 대안'+'</th>';
                    }
                    html3 += '</tr>';
                    html3 += '</thead>';
                    html3 += '<tbody>';

                    html3 += '<tr>';
                    html3 += '<th>'+'사업구분'+'</th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html3 += '<th>'+request.sendData.performanceList[j].piBusiness+'</th>';
                    }
                    html3 += '</tr>';

                    html3 += '<tr>';
                    html3 += '<th>'+'사업유형'+'</th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html3 += '<th>'+request.sendData.performanceList[j].piBusinessType+'</th>';
                    }
                    html3 += '</tr>';

                    html3 += '<tr>';
                    html3 += '<th>'+'대상부재'+'</th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html3 += '<th>'+request.sendData.performanceList[j].piTargetAbsence+'</th>';
                    }
                    html3 += '</tr>';

                    html3 += '<tr>';
                    html3 += '<th>'+'사업분류'+'</th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html3 += '<th>'+request.sendData.performanceList[j].piBusinessClassification+'</th>';
                    }
                    html3 += '</tr>';

                    html3 += '<tr>';
                    html3 += '<th>'+'사업내용'+'</th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html3 += '<th>'+request.sendData.performanceList[j].piBusinessInformation+'</th>';
                    }
                    html3 += '</tr>';

                    html3 += '<tr>';
                    html3 += '<th>'+'사업비용'+'</th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html3 += '<th>'+request.sendData.performanceList[j].piBusinessExpenses+'</th>';
                    }
                    html3 += '</tr>';

                    html3 += '<tr>';
                    html3 += '<th>'+'사업전 부재 안전등급'+'</th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html3 += '<th>'+request.sendData.performanceList[j].piBeforeSafetyRating+'</th>';
                    }
                    html3 += '</tr>';

                    html3 += '<tr>';
                    html3 += '<th>'+'사업후 부재 안전등급'+'</th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html3 += '<th>'+request.sendData.performanceList[j].piAfterSafetyRating+'</th>';
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
                        html4 += '<th>'+request.sendData.performanceList[j].piBusinessType+' 대안'+'</th>';
                    }
                    html4 += '</tr>';
                    html4 += '</thead>';

                    html4 += '<tbody>';

                    html4 += '<tr>';
                    html4 += '<th>'+'법에 따른 의무사업'+'</th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html4 += '<th>'+request.sendData.performanceList[j].piBusinessObligatory+'</th>';
                    }
                    html4 += '</tr>';

                    html4 += '<tr>';
                    html4 += '<th>'+'법정계획에 따른 의무사업'+'</th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html4 += '<th>'+request.sendData.performanceList[j].piBusinessMandatory+'</th>';
                    }
                    html4 += '</tr>';

                    html4 += '<tr>';
                    html4 += '<th>'+'자제계획/의결에 따른 사업'+'</th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html4 += '<th>'+request.sendData.performanceList[j].piBusinessPlanned+'</th>';
                    }
                    html4 += '</tr>';

                    html4 += '<tr>';
                    html4 += '<th>'+'최근 1년 간 민원 및 사고발생 건수'+'</th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html4 += '<th>'+request.sendData.performanceList[j].piWhether+'</th>';
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
                        html5 += '<th>'+request.sendData.performanceList[j].piBusinessType+' 대안'+'</th>';
                    }
                    html5 += '</tr>';
                    html5 += '</thead>';

                    html5 += '<tbody>';

                    html5 += '<tr>';
                    html5 += '<th>'+'평가 기준년도'+'</th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html5 += '<th>'+request.sendData.performanceList[j].piRaterBaseYear+'</th>';
                    }
                    html5 += '</tr>';

                    html5 += '<tr>';
                    html5 += '<th>'+'평가자'+'</th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html5 += '<th>'+request.sendData.performanceList[j].piRater+'</th>';
                    }
                    html5 += '</tr>';

                    html5 += '<tr>';
                    html5 += '<th>'+'평가자 소속'+'</th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html5 += '<th>'+request.sendData.performanceList[j].piRaterBelong+'</th>';
                    }
                    html5 += '</tr>';

                    html5 += '<tr>';
                    html5 += '<th>'+'평가자 연락처'+'</th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html5 += '<th>'+request.sendData.performanceList[j].piRaterPhone+'</th>';
                    }
                    html5 += '</tr>';

                    html5 += '</tbody>';
                    $outputTableEvaluation.html(html5);







                    // $("#safetyRankScroe1").text(request.sendData.technicalityRankList[0]+' / '+request.sendData.technicalityScroeList[0]);
                    // $("#oldRankScroe1").text(request.sendData.technicalityRankList[1]+' / '+request.sendData.technicalityScroeList[1]);
                    // $("#urgencyRankScroe1").text(request.sendData.technicalityRankList[2]+' / '+request.sendData.technicalityScroeList[2]);
                    // $("#goalRankScroe1").text(request.sendData.technicalityRankList[3]+' / '+request.sendData.technicalityScroeList[3]);
                    // $("#te_allRankScroe1").text(request.sendData.technicalityAllRank+' / '+request.sendData.technicalityAllScore);

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



