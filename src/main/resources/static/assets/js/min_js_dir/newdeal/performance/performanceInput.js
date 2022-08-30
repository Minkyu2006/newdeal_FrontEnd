// * 성능개선사업평가 서비스 자바스크립트 인풋페이지*

$(document).on("click","#checkYesBtn",function(){
    startYesorNo(true,1)
});
$(document).on("click","#checkNoBtn",function(){
    startYesorNo(false,1)
});

// 팝업창 닫기
function popClose(){
    $('.pop').removeClass('open');
}

// 사업 유형을 통해 사업분류의 대한 select box 편의성
function piBusinessTypeClick(idVal,idAdd,data){

    let html = "";

    // console.log("idVal : "+idVal);
    // console.log("idAdd : "+idVal);
    // console.log("data : "+data);
    const $piBusinessClassification = $("#piBusinessClassification"+idAdd);
    if(idVal===1 || idVal===3 || idVal===5 || idVal===7){
        html += "<option value='개량''>"+"개량"+"</option>";
        html += "<option value='확장''>"+"확장"+"</option>";
        html += "<option value='일부개축''>"+"일부개축"+"</option>";
        html += "<option value='전면개축''>"+"전면개축"+"</option>";
        $piBusinessClassification.html(html);
    }else{
        html += "<option value='단순보수보강''>"+"단순보수보강"+"</option>";
    }
    $piBusinessClassification.html(html);

    if(data!==null){
        // console.log("데이터넣기");
        $piBusinessClassification.val(data);
    }

}

// 사업구분(유형)에 따라 UI변경
function piBusinessClick(val){
    $("#step3div").css('display','block');
    const $piUsabilityAndGoalLevelName = $("#piUsabilityAndGoalLevelName");
    const $piUsabilityAndGoalLevel = $("#piUsabilityAndGoalLevel");
    const $piMaintenanceDelay = $("#piMaintenanceDelay");
    const $piErectionCostList = $("#piErectionCostList");

    if(val===1){
        $piErectionCostList.css('visibility','inherit');
        $piUsabilityAndGoalLevelName.text("목표 종합 안전등급")
        $piUsabilityAndGoalLevel.val("A")
        $("#rankA").css('display','block');
        $("#rankB").css('display','block');
        $("#rankC").css('display','block');
        $("#rankD").css('display','block');
        $("#rankE").css('display','block');
        $("#gitaOp").css('display','none');
        $("#gitaNo").css('display','none');

        $piMaintenanceDelay.val("0");
        $("#delay0").css('display','block');
        $("#delay1").css('display','block');
        $("#delay2").css('display','block');
        $("#delay3").css('display','block');
        $("#delayNo").css('display','none');

        $("#stepComment").css('display','block');

    }else if(val===2){
        $piErectionCostList.css('visibility','hidden');
        $piUsabilityAndGoalLevelName.text("목표 종합 안전등급")
        $piUsabilityAndGoalLevel.val("해당안됨")
        $("#rankA").css('display','none');
        $("#rankB").css('display','none');
        $("#rankC").css('display','none');
        $("#rankD").css('display','none');
        $("#rankE").css('display','none');
        $("#gitaOp").css('display','none');
        $("#gitaNo").css('display','block');

        $piMaintenanceDelay.val("9");
        $("#delay0").css('display','none');
        $("#delay1").css('display','none');
        $("#delay2").css('display','none');
        $("#delay3").css('display','none');
        $("#delayNo").css('display','block');

        $("#stepComment").css('display','none');
    }else{
        $piErectionCostList.css('visibility','hidden');
        $piUsabilityAndGoalLevelName.text("사용성등급")
        $piUsabilityAndGoalLevel.val("A")
        $("#rankA").css('display','block');
        $("#rankB").css('display','block');
        $("#rankC").css('display','block');
        $("#rankD").css('display','block');
        $("#gitaE").css('display','none');
        $("#gitaOp").css('display','block');
        $("#gitaNo").css('display','none');

        $piMaintenanceDelay.val("9");
        $("#delay0").css('display','none');
        $("#delay1").css('display','none');
        $("#delay2").css('display','none');
        $("#delay3").css('display','none');
        $("#delayNo").css('display','block');

        $("#stepComment").css('display','none');
    }
}

// 시설물 유형을 통해 형식구분의 대한 select box 편의성
function piTypeClick(idVal,data){
    $("#step4div").css('display','block');
    $("#step5div").css('display','block');

    const $piType = $("#piType");

    let html = "";

    if(idVal==="1" || idVal==="2"){
        html += "<option value='슬래브교'>"+"슬래브교"+"</option>";
        html += "<option value='거더교'>"+"거더교"+"</option>";
        html += "<option value='라멘교'>"+"라멘교"+"</option>";
        html += "<option value='사장교'>"+"사장교"+"</option>";
        html += "<option value='현수교'>"+"현수교"+"</option>";
        html += "<option value='엑스트라도즈드교'>"+"엑스트라도즈드교"+"</option>";
        html += "<option value='보도육교'>"+"보도육교"+"</option>";
        $piType.html(html);
    }else if(idVal==="3" || idVal==="4"){
        html += "<option value='ASSM터널'>"+"ASSM터널"+"</option>";
        html += "<option value='NATM터널'>"+"NATM터널"+"</option>";
        html += "<option value='개착식터널'>"+"개착식 터널"+"</option>";
        html += "<option value='TBM터널'>"+"TBM터널"+"</option>";
        html += "<option value='실드터널'>"+"실드터널"+"</option>";
        html += "<option value='침매터널'>"+"침매터널"+"</option>";
        html += "<option value='지하차도'>"+"지하차도"+"</option>";
        $piType.html(html);
    }else if(idVal==="5"){
        html += "<option value='암반사면'>"+"암반사면"+"</option>";
        html += "<option value='토사사면'>"+"토사사면"+"</option>";
        html += "<option value='혼합사면'>"+"혼합사면"+"</option>";
        html += "<option value='기타'>"+"기타"+"</option>";
        $piType.html(html);
    }else{
        html += "<option value='콘크리트옹벽'>"+"콘크리트옹벽"+"</option>";
        html += "<option value='보강토옹벽'>"+"보강토옹벽"+"</option>";
        html += "<option value='돌쌓기옹벽'>"+"돌쌓기옹벽(석축)"+"</option>";
        html += "<option value='동망태옹벽'>"+"동망태옹벽"+"</option>";
        html += "<option value='기대기옹벽'>"+"기대기옹벽"+"</option>";
        html += "<option value='기타'>"+"기타"+"</option>";
        $piType.html(html);
    }

    if(data!==null){
        $piType.val(data);
    }

}

// 성능개선 기준 적용 대상 여부 확인 선택 팝업열기
function radioPopOpen(){

    const $business_name = $("#business_name");
    if($business_name.val()===""){
        alertCaution("사업명을 입력해주세요.",1);
        return false;
    }else{
        $("#business_name_pop").text($business_name.val());
    }

    let popOpenClonse = 0;
    const business_dissatisfaction = [];
    if(document.getElementById("group1-1").checked===true || document.getElementById("group1-2").checked===true){
        if(document.getElementById("group1-1").checked===false){
            business_dissatisfaction.push("1)시설유형");
            $("#question_1").css("display","block");
            popOpenClonse = 1;
        }else{
            $("#question_1").css("display","none");
        }
    }else{
        alertCaution("1번 문항을 체크해주세요",1)
        return false;
    }
    if(document.getElementById("group2-1").checked===true || document.getElementById("group2-2").checked===true){
        if(document.getElementById("group2-1").checked===false){
            business_dissatisfaction.push("2)부재유형");
            $("#question_2").css("display","block");
            popOpenClonse = 1;
        }else{
            $("#question_2").css("display","none");
        }
    }else{
        alertCaution("2번 문항을 체크해주세요",1)
        return false;
    }
    if(document.getElementById("group3-1").checked===true || document.getElementById("group3-2").checked===true){
        if(document.getElementById("group3-1").checked===false){
            business_dissatisfaction.push("3)보수유형");
            $("#question_3").css("display","block");
            popOpenClonse = 1;
        }else{
            $("#question_3").css("display","none");
        }
    }else{
        alertCaution("3번 문항을 체크해주세요",1)
        return false;
    }
    if(document.getElementById("group4-1").checked===true || document.getElementById("group4-2").checked===true){
        if(document.getElementById("group4-1").checked===false){
            business_dissatisfaction.push("4)사업유형");
            $("#question_4").css("display","block");
            popOpenClonse = 1;
        }else{
            $("#question_4").css("display","none");
        }
    }else{
        alertCaution("4번 문항을 체크해주세요",1)
        return false;
    }
    if(document.getElementById("group5-1").checked===true || document.getElementById("group5-2").checked===true){
        if(document.getElementById("group5-1").checked===false){
            business_dissatisfaction.push("5)사업규모");
            $("#question_5").css("display","block");
            popOpenClonse = 1;
        }else{
            $("#question_5").css("display","none");
        }
    }else{
        alertCaution("5번 문항을 체크해주세요",1)
        return false;
    }
    if(document.getElementById("group6-1").checked===true || document.getElementById("group6-2").checked===true){
        if(document.getElementById("group6-2").checked===false){
            business_dissatisfaction.push("6)사업평가 중복성");
            $("#question_6").css("display","block");
            popOpenClonse = 1;
        }else{
            $("#question_6").css("display","none");
        }
    }else{
        alertCaution("6번 문항을 체크해주세요",1)
        return false;
    }
    if(document.getElementById("group7-1").checked===true || document.getElementById("group7-2").checked===true){
        if(document.getElementById("group7-2").checked===false){
            business_dissatisfaction.push("7)당연사업");
            $("#question_7").css("display","block");
            popOpenClonse = 1;
        }else{
            $("#question_7").css("display","none");
        }
    }else{
        alertCaution("7번 문항을 체크해주세요",1)
        return false;
    }

    if(popOpenClonse===1){
        $("#business_dissatisfaction").text(business_dissatisfaction);
        $("#chapter").val("0");
        $("#piInputSkip").val("1");
        alertWeightCheck("해당 사업은 사업평가 비대상 사업으로 판정되었습니다.<br/><br/>사업평가 대상이 아님에도 평가를 시행하시겠습니까?");
    }else{
        $('#choicePop').addClass('open');
    }

}

// 스킵버튼
function skipBtn(){
    $("#piInputSkip").val("2");
    $("#choiceText").text("성능개선 사업평가를 시작합니다.");
    $('#choicePop').addClass('open');
}

function choicePopClose(){
    $("#choiceText").text("입력하신 성능개선 사업은 국토교통부 『도로시설 성능개선 기준』에서 정하는 평가대상 요건인 " +
        "1)시설유형, 2)부재유형, 3)보수유형, 4)사업유형, 5)사업규모, 6)사업평가 중복성, 7)당연사업 면제사유 " +
        "조건을 모두 충족함에 따라 성능개선사업 평가 대상으로 판정되었습니다.");
    $('#choicePop').removeClass('open');
}

// 중간저장 계속할껀지 안할껀지 여부묻고 페이지이동 or 게시물삭제후 새로저장
function startYesorNo(check, num){
    $('#popupId').remove();
    if(check){
        if(num===1){
            movePage('/performance/performance3')
        }else{
            movePage('/performance/performance2')
        }
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
                    }else if(request.status === 400) {
                        // console.log("request.status : " + request.status + " => 400에러");
                        alertCaution("400에러 재로그인 해주세요.", 2);
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
    // else if(url === "/performance/performance2"){
    //     alertCaution("현재 재개발중 입니다.<br /> 다음에 이용해 주시길 바랍니다.",1);
    //     return false;
    // }

    // $("#choiceText").text("입력하신 성능개선 사업은 국토교통부 『도로시설 성능개선 기준』에서 정하는 평가대상 요건인 " +
    //     "1)시설유형, 2)부재유형, 3)보수유형, 4)사업유형, 5)사업규모, 6)사업평가 중복성, 7)당연사업 면제사유 " +
    //     "조건을 모두 충족함에 따라 성능개선사업 평가 대상으로 판정되었습니다.");

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
                }else if(request.status === 400) {
                    // console.log("request.status : " + request.status + " => 400에러");
                    alertCaution("400에러 재로그인 해주세요.", 2);
                } else {
                    // console.log("request.status : " + request.status + " => 404에러");
                    alertCaution("404에러 재로그인 해주세요.", 2);
                }
            },
            success: function (request) {
                let status = request.status;
                // console.log("status : " + status);
                if (status === 200) {

                    $("#createDate").text(request.sendData.nowDate);
                    $("#createName").text(request.sendData.accountData.username);
                    $("#createTeam").text(request.sendData.accountData.teamname);

                    if(request.sendData.middleSave===1){
                        console.log("중간저장 게시물이 존재함");
                        $("#autoNum").val(request.sendData.piAutoNum);
                        $("#businessNum").val(request.sendData.piBusiness);
                        $("#piInputSkip").val(request.sendData.piInputSkip);
                        alertMiddleSaveCheck("작성중 완료되지 않은 대안이 존재합니다.<BR>계속 작성하시겠습니까?");
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

function inputPerformanceNext1Check(){
    const $piType = $("#piType").val();

    if(document.getElementById("piBusiness-1").checked===false && document.getElementById("piBusiness-2").checked===false && document.getElementById("piBusiness-3").checked===false){
        alertCaution("사업구분을을 선택해주세요.",1);
        return false;
    }

    if($piType===""){
        alertCaution("시설물 유형을 선택해주세요.",1);
        return false;
    }

    const $piFacilityName = $("#piFacilityName").val();
    if($piFacilityName===""){
        alertCaution("시설명을 입력해주세요.",1);
        return false;
    }

    const $piErectionCost = $("#piErectionCost");
    if(document.getElementById("piBusiness-1").checked===true){
        if($piErectionCost.val()===""){
            alertCaution("취득원가를 입력해주세요.",1);
            return false;
        }else{
            $piErectionCost.val($piErectionCost.val().replaceAll(",",""));
            if($piErectionCost.val().length>=15){
                $piErectionCost.val(0);
                alertCaution("취득원가를 한계치가 넘었습니다.<br>다시 확인해주시고 입력해주세요..",1);
                return false;
            }
        }
    }else{
        $piErectionCost.val(0);
    }

    const $piCompletionYear = $("#piCompletionYear").val();
    if($piCompletionYear===""){
        alertCaution("준공연도를 입력해주세요.",1);
        return false;
    }

    const $piAADT = $("#piAADT");
    if($piAADT.val()===""){
        alertCaution("연평균일교통량(AADT)를 입력해주세요.",1);
        return false;
    }else{
        $piAADT.val($piAADT.val().replaceAll(",",""));
        if($piAADT.val().length>=8){
            alertCaution("연평균일교통량(AADT) 한계치가 넘었습니다.<br>다시 확인해주시고 입력해주세요..",1);
            return false;
        }
    }

    const $piRaterBaseYear = $("#piRaterBaseYear").val();
    if($piRaterBaseYear===""){
        alertCaution("평가 기준년도를 입력해주세요.",1);
        return false;
    }

    const $piSafetyLevel = $("#piSafetyLevel").val();
    const $piUsabilityAndGoalLevel = $("#piUsabilityAndGoalLevel").val();

    if(document.getElementById("piBusiness-1").checked===true){
        if($piSafetyLevel==="A"){
            if($piUsabilityAndGoalLevel==="B" || $piUsabilityAndGoalLevel==="C" || $piUsabilityAndGoalLevel==="D" || $piUsabilityAndGoalLevel==="E"){
                $("#chapter").val("1");
                alertWeightCheck("현재 안전등급이 목표 안전등급보다<br>좋은 것으로 입력되었습니다.<br>그래도 진행하시겠습니까?");
                return false;
            }
        }else if($piSafetyLevel==="B"){
            if($piUsabilityAndGoalLevel==="C" || $piUsabilityAndGoalLevel==="D" || $piUsabilityAndGoalLevel==="E"){
                $("#chapter").val("1");
                alertWeightCheck("현재 안전등급이 목표 안전등급보다<br>좋은 것으로 입력되었습니다.<br>그래도 진행하시겠습니까?");
                return false;
            }
        }else if($piSafetyLevel==="C"){
            if($piUsabilityAndGoalLevel==="D" || $piUsabilityAndGoalLevel==="E"){
                $("#chapter").val("1");
                alertWeightCheck("현재 안전등급이 목표 안전등급보다<br>좋은 것으로 입력되었습니다.<br>그래도 진행하시겠습니까?");
                return false;
            }
        }else if($piSafetyLevel==="D"){
            if($piUsabilityAndGoalLevel==="E"){
                $("#chapter").val("1");
                alertWeightCheck("현재 안전등급이 목표 안전등급보다<br>좋은 것으로 입력되었습니다.<br>그래도 진행하시겠습니까?");
                return false;
            }
        }
    }

    inputPerformanceNext1()
}

// Input 첫번째 NEXT버튼 첫번째 구간(중간저장)
function inputPerformanceNext1(){
    JWT_Get();

    let url;

    if (accessToken == null || refreshToken == null || insert_id == null) {
        // console.log("callinfo(userid)함수 : 토큰&리플레시&로그인한아이디 Null");
        alertCaution("토큰이 만료되었습니다.<BR>다시 로그인해주세요.", 2);
    } else {

        const  autoNum = $("#autoNum").val();
        const formData = new FormData(document.getElementById('performance1'));
        formData.set("piInputSkip",$("#piInputSkip").val());
        formData.set("piFileYn",$("#piFileYn").val());

        console.log("중간저장1 autoNum : "+autoNum);
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
                }else if(request.status === 400) {
                    // console.log("request.status : " + request.status + " => 400에러");
                    alertCaution("400에러 재로그인 해주세요.", 2);
                } else {
                    // console.log("request.status : " + request.status + " => 404에러");
                    alertCaution("404에러 재로그인 해주세요.", 2);
                }
            },
            success: function (request) {
                let status = request.status;
                console.log("status : " + status);
                if (status === 200) {
                    console.log("autoNum : "+request.sendData.autoNum);
                    $("#businessNum").val(request.sendData.businessNum);
                    $("#autoNum").val(request.sendData.autoNum);
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

// Input 첫번째 NEXT버튼 두번째 구간(중간저장)
function inputPerformanceNext2(){
    let i;
    JWT_Get();

    if (accessToken == null || refreshToken == null || insert_id == null) {
        // console.log("callinfo(userid)함수 : 토큰&리플레시&로그인한아이디 Null");
        alertCaution("토큰이 만료되었습니다.<BR>다시 로그인해주세요.", 2);
    } else {

        // 예외처리
        const $businessCount = $("#businessCount");
        let j=1;
        let x=1;
        let y=2;
        let text = "";
        for(i = 0; i<$businessCount.val(); i++){
            if(i===0) {
                text = "기준대안";
            }else if(i===1){
                text = "비교대안";
            }else if(i===2){
                text = "추가대안1";
            }else if(i===3){
                text = "추가대안2";
            }

            if(document.getElementById("piBusinessType"+x).checked===false && document.getElementById("piBusinessType"+y).checked===false){
                alertCaution(text+"의 사업유형을 선택해주세요.",1);
                return false;
            }

            const $piBusinessExpenses = $("#piBusinessExpenses"+j);
            if($piBusinessExpenses.val()==="") {
                alertCaution(text+"의 사업비용을 작성해주세요.", 1)
                return false;
            }

            const $piBeforeSafetyRating = $("#piBeforeSafetyRating" + j).val();
            const $piAfterSafetyRating = $("#piAfterSafetyRating"+j).val();
            if($piBeforeSafetyRating==="") {
                alertCaution(text+"의 사업전 종합 안전등급을 <br>선택해주세요.",1);
                return false;
            }
            if($piAfterSafetyRating==="") {
                alertCaution(text+"의 사업후 종합 안전등급을 <br>선택해주세요.",1);
                return false;
            }
            if($piBeforeSafetyRating==="A"){
                if($piAfterSafetyRating==="B" || $piAfterSafetyRating==="C" || $piAfterSafetyRating==="D" || $piAfterSafetyRating==="E"){
                    alertCaution(text+"의 사업전 안전등급보다 사업후 <br>안전등급이 낮을 수 없습니다.",1);
                    return false;
                }
            }else if($piBeforeSafetyRating==="B"){
                if($piAfterSafetyRating==="C" || $piAfterSafetyRating==="D" || $piAfterSafetyRating==="E"){
                    alertCaution(text+"의 사업전 안전등급보다 사업후 <br>안전등급이 낮을 수 없습니다.",1);
                    return false;
                }
            }else if($piBeforeSafetyRating==="C"){
                if($piAfterSafetyRating==="D" || $piAfterSafetyRating==="E"){
                    alertCaution(text+"의 사업전 안전등급보다 사업후 <br>안전등급이 낮을 수 없습니다.",1);
                    return false;
                }
            }else if($piBeforeSafetyRating==="D"){
                if($piAfterSafetyRating==="E"){
                    alertCaution(text+"의 사업전 안전등급보다 사업후 <br>안전등급이 낮을 수 없습니다.",1);
                    return false;
                }
            }

            j++
            x=x+2;
            y=y+2;
        }

        if($("#piWhether").val()==="") {
            alertCaution("최근 1년 간 민원 및 사고발생 <br>건수를 작성해주세요.",1);
            return false;
        }

        for(i=1; i<5; i++){
            const $piBusinessExpenses = $("#piBusinessExpenses"+i);
            $piBusinessExpenses.val($piBusinessExpenses.val().replaceAll(",",""));
        }

        let url;

        const  autoNum = $("#autoNum").val();
        const formData = new FormData(document.getElementById('performance2'));

        // console.log("두번째 중간저장 autoNum : "+autoNum);
        url = $("#backend_protocol").val() + "://" + $("#backend_url").val() + "/api/performance/middleSaveUpdateBusiness/"+autoNum; // 호출할 백엔드 API
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
                }else if(request.status === 400) {
                    // console.log("request.status : " + request.status + " => 400에러");
                    alertCaution("400에러 재로그인 해주세요.", 2);
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
                    // console.log("again : "+request.sendData.again);
                    if(request.sendData.again==="again"){
                        inputPerformanceNext2();
                    }else{
                        // console.log("저장완료");
                        $("#autoNum").val(request.sendData.autoNum);
                        movePage('/performance/performance5');
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




// 상단 가중치 합 검증함수 - 가중치 입력칸 맞는지 확인하는 함수0
function upWeightCheckAdd(){

    const $piWeightCriticalScore = $("#piWeightCriticalScore");
    if($piWeightCriticalScore.val()===""){
        $piWeightCriticalScore.val("50")
    }else if(Number($piWeightCriticalScore.val())>100){
        alertCaution("사업추진 임계점수는 <Br>'100'이하여야 합니다.",1);
        return false;
    }

    let weightAdd;
    const $piWeightTechnicality = $("#piWeightTechnicality");
    const $piWeightEconomy = $("#piWeightEconomy");
    const $piWeightPolicy = $("#piWeightPolicy");

    if($piWeightTechnicality.val()===""){
        $piWeightTechnicality.val($piWeightTechnicality.attr('placeholder'));
    }

    if($piWeightEconomy.val()===""){
        $piWeightEconomy.val($piWeightEconomy.attr('placeholder'));
    }

    if($piWeightPolicy.val()===""){
        $piWeightPolicy.val($piWeightPolicy.attr('placeholder'));
    }

    weightAdd = new Decimal(Number($piWeightTechnicality.val())+Number($piWeightEconomy.val())+Number($piWeightPolicy.val()));
    console.log("성능개선 사업구분 별 가중치 합 : "+weightAdd);
    if(1 < weightAdd){
        alertCaution("사업구분별 가중치의 합이 초과했습니다.<br>"+"가중치의 합은 '1'로 해주시길 바랍니다. ",1);
        return false;
    }else if(weightAdd < 1){
        alertCaution("사업구분별 가중치의 합이 '1'보다 작습니다.<br>"+"가중치의 합은 '1'로 해주시길 바랍니다.",1);
        return false;
    }else{
        upWeightCheckTech();
    }
}

// 상단 기술성 - 가중치 입력칸 맞는지 확인하는 함수1
function upWeightCheckTech(){

    const $piWeightTechnicality = $("#piWeightTechnicality");
    const $piWeightTechnicalityMin = $("#piWeightTechnicalityMin");
    const $piWeightTechnicalityMax = $("#piWeightTechnicalityMax");

    if(Number($piWeightTechnicality.val()) < Number($piWeightTechnicalityMin.text()) || Number($piWeightTechnicality.val()) > Number($piWeightTechnicalityMax.text())) {
        $("#chapter").val("2");
        alertWeightCheck("사업구분별 가중치의 기술성 가중치가 초과했습니다.<br>" + $piWeightTechnicalityMin.text() + "~" + $piWeightTechnicalityMax.text() + " 사이로 입력해주세요.<br>그래도 계속 작성하시겠습니까?");
        return false;
    }else{
        upWeightCheckEco();
    }

}

// 상단 경제성 - 가중치 입력칸 맞는지 확인하는 함수2
function upWeightCheckEco(){

    const $piWeightEconomy = $("#piWeightEconomy");
    const $piWeightEconomyMin = $("#piWeightEconomyMin");
    const $piWeightEconomyMax = $("#piWeightEconomyMax");

    if(Number($piWeightEconomy.val()) < Number($piWeightEconomyMin.text()) || Number($piWeightEconomy.val()) > Number($piWeightEconomyMax.text())){
        $("#chapter").val("3");
        alertWeightCheck("사업구분별 가중치의 경제성 가중치가 초과했습니다.<br>" + $piWeightEconomyMin.text() + "~" + $piWeightEconomyMax.text() + " 사이로 입력해주세요.<br>그래도 계속 작성하시겠습니까?");
        return false;
    }else{
        upWeightCheckPolicy();
    }
}

// 상단 정책성 - 가중치 입력칸 맞는지 확인하는 함수3
function upWeightCheckPolicy(){

    const $piWeightPolicy = $("#piWeightPolicy");
    const $piWeightPolicyMin = $("#piWeightPolicyMin");
    const $piWeightPolicyMax = $("#piWeightPolicyMax");

    if(Number($piWeightPolicy.val()) < Number($piWeightPolicyMin.text()) || Number($piWeightPolicy.val()) > Number($piWeightPolicyMax.text())){
        $("#chapter").val("4");
        alertWeightCheck("사업구분별 가중치의 정책성가 초과했습니다.<br>" + $piWeightPolicyMin.text() + "~" + $piWeightPolicyMax.text() + " 사이로 입력해주세요.<br>그래도 계속 작성하시겠습니까?");
        return false;
    }else{
        downWeightCheckTech();
    }

}

// 하단 가중치 기술성 합 검증함수 - 가중치 입력칸 맞는지 확인하는 함수4
function downWeightCheckTech(){

    let businessNum = $("#businessNum").val();
    let type = 1;
    console.log("유형1 : "+businessNum);
    if(businessNum === ""){
        businessNum = $("#weight_Category").val();
        type = 2;
        console.log("유형2 : "+businessNum);
    }

    let weightAdd;

    // 안전성
    const $piWeightSafe = $("#piWeightSafe");

    // 사용성
    const $piWeightUsability = $("#piWeightUsability");

    // 노후도
    const $piWeightOld = $("#piWeightOld");

    // 지체도
    const $piWeightUrgency = $("#piWeightUrgency");

    // 목표달성도
    const $piWeightGoal = $("#piWeightGoal");

    if(businessNum==="노후화대응"){
        $piWeightUsability.val("0");

        if($piWeightSafe.val()===""){
            $piWeightSafe.val($piWeightSafe.attr('placeholder'));
        }

        if($piWeightOld.val()===""){
            $piWeightOld.val($piWeightOld.attr('placeholder'));
        }

        if($piWeightUrgency.val()===""){
            $piWeightUrgency.val($piWeightUrgency.attr('placeholder'));
        }

        if($piWeightGoal.val()===""){
            $piWeightGoal.val($piWeightGoal.attr('placeholder'));
        }

        weightAdd = new Decimal(Number($piWeightSafe.val())+Number($piWeightOld.val())+Number($piWeightUrgency.val())+Number($piWeightGoal.val()));
    }else if(businessNum==="기준변화"){
        $piWeightUsability.val("0");
        $piWeightUrgency.val("0");
        $piWeightGoal.val("0");

        if($piWeightSafe.val()===""){
            $piWeightSafe.val($piWeightSafe.attr('placeholder'));
        }

        if($piWeightOld.val()===""){
            $piWeightOld.val($piWeightOld.attr('placeholder'));
        }

        weightAdd = new Decimal(Number($piWeightSafe.val())+Number($piWeightOld.val()));
    }else{
        $piWeightUrgency.val("0");
        $piWeightGoal.val("0");

        if($piWeightSafe.val()===""){
            $piWeightSafe.val($piWeightSafe.attr('placeholder'));
        }

        if($piWeightOld.val()===""){
            $piWeightOld.val($piWeightOld.attr('placeholder'));
        }

        if($piWeightUsability.val()===""){
            $piWeightUsability.val($piWeightUsability.attr('placeholder'));
        }

        weightAdd = new Decimal(Number($piWeightSafe.val())+Number($piWeightUsability.val())+Number($piWeightOld.val()));
    }

    console.log("평가지표별 가중치 기술성 합 : "+weightAdd)
    if(1 < weightAdd){
        alertCaution("평가지표별 기술성 합이 '1' 초과했습니다.<br>"+"가중치의 합은 '1'로 해주시길 바랍니다. ",1);
        return false;
    }else if(weightAdd < 1){
        alertCaution("평가지표별 기술성 합이 '1'보다 작습니다.<br>"+"가중치의 합은 '1'로 해주시길 바랍니다.",1);
        return false;
    }else{
        downWeightCheckEco(businessNum, type);
    }

}

// 하단 가중치 경제성 합 검증함수 - 가중치 입력칸 맞는지 확인하는 함수5
function downWeightCheckEco(businessNum, type){

    // console.log("유형 : "+businessNum);

    let weightAdd;

    // 평가지표별 가중치 셋팅 - 경제성

    // 안전효용 개선 효율성, 사업규모 등급
    const $piWeightSafeUtility = $("#piWeightSafeUtility");

    // 자산가치 개선 효율성, 사업효율 등급
    const $piWeightCostUtility = $("#piWeightCostUtility");

    if($piWeightSafeUtility.val()===""){
        $piWeightSafeUtility.val($piWeightSafeUtility.attr('placeholder'));
    }

    if($piWeightCostUtility.val()===""){
        $piWeightCostUtility.val($piWeightCostUtility.attr('placeholder'));
    }

    weightAdd = new Decimal(Number($piWeightSafeUtility.val())+Number($piWeightCostUtility.val()));
    console.log("평가지표별 가중치 경제성 합 : "+weightAdd)
    if(1 < weightAdd){
        alertCaution("평가지표별 경제성 합이 '1' 초과했습니다.<br>"+"가중치의 합은 '1'로 해주시길 바랍니다. ",1);
        return false;
    }else if(weightAdd < 1){
        alertCaution("평가지표별 경제성 합이 '1'보다 작습니다.<br>"+"가중치의 합은 '1'로 해주시길 바랍니다.",1);
        return false;
    }else{
        downWeightCheckPolicy(businessNum, type);
    }

}

// 하단 가중치 정책성 합 검증함수 - 가중치 입력칸 맞는지 확인하는 함수6
function downWeightCheckPolicy(businessNum, type){

    // console.log("유형 : "+businessNum);

    let weightAdd;

    // 평가지표별 가중치 셋팅 - 정책성

    // 사업추진 타당성
    const $piWeightBusiness = $("#piWeightBusiness");

    // 민원 및 사고 대응성
    const $piWeightComplaint = $("#piWeightComplaint");

    // 사업효과 범용성
    const $piWeightBusinessEffect = $("#piWeightBusinessEffect");

    if(businessNum==="기준변화"){
        $piWeightComplaint.val("0");
        if($piWeightBusiness.val()===""){
            $piWeightBusiness.val($piWeightBusiness.attr('placeholder'));
        }

        if($piWeightBusinessEffect.val()===""){
            $piWeightBusinessEffect.val($piWeightBusinessEffect.attr('placeholder'));
        }
        weightAdd = new Decimal(Number($piWeightBusiness.val())+Number($piWeightBusinessEffect.val()));
    }else{
        if($piWeightBusiness.val()===""){
            $piWeightBusiness.val($piWeightBusiness.attr('placeholder'));
        }

        if($piWeightBusinessEffect.val()===""){
            $piWeightBusinessEffect.val($piWeightBusinessEffect.attr('placeholder'));
        }

        if($piWeightComplaint.val()===""){
            $piWeightComplaint.val($piWeightComplaint.attr('placeholder'));
        }
        weightAdd = new Decimal(Number($piWeightBusiness.val())+Number($piWeightComplaint.val())+Number($piWeightBusinessEffect.val()));
    }

    console.log("평가지표별 가중치 정책성 합 : "+weightAdd)
    if(1 < weightAdd){
        alertCaution("평가지표별 정책성 합이 '1' 초과했습니다.<br>"+"가중치의 합은 '1'로 해주시길 바랍니다. ",1);
        return false;
    }else if(weightAdd < 1){
        alertCaution("평가지표별 정책성 합이 '1'보다 작습니다.<br>"+"가중치의 합은 '1'로 해주시길 바랍니다.",1);
        return false;
    }else{
        downWeightCheckTechSafety(businessNum, type);
    }

}

// 하단 기술성 안전성 - 가중치 입력칸 맞는지 확인하는 함수7
function downWeightCheckTechSafety(businessNum, type){

    // 안전성
    const $piWeightSafe = $("#piWeightSafe");
    let $piWeightSafeMin = $("#piWeightSafeMin");
    let $piWeightSafeMax = $("#piWeightSafeMax");
    if(type===1){
        $piWeightSafeMin = $piWeightSafeMin.text();
    }else{
        $piWeightSafeMax = $piWeightSafeMax.val();
    }

    if($piWeightSafe.val()===""){
        $piWeightSafe.val($piWeightSafe.attr('placeholder'));
        downWeightCheckTechUsability(businessNum, type);
    }else{
        if(Number($piWeightSafe.val()) < Number($piWeightSafeMin) || Number($piWeightSafe.val()) > Number($piWeightSafeMax)){
            $("#chapter").val("5");
            alertWeightCheck("평가지표별 안전성이 초과했습니다.<br>" + $piWeightSafeMin + "~" + $piWeightSafeMax + " 사이로 입력해주세요.<br>그래도 계속 작성하시겠습니까?");
            return false;
        }else{
            downWeightCheckTechUsability(businessNum, type);
        }
    }
}

// 하단 기술성 사용성 - 가중치 입력칸 맞는지 확인하는 함수8
function downWeightCheckTechUsability(businessNum, type){

    // 사용성
    const $piWeightUsability = $("#piWeightUsability");
    let $piWeightUsabilityMin = $("#piWeightUsabilityMin");
    let $piWeightUsabilityMax = $("#piWeightUsabilityMax");
    if(type===1){
        $piWeightUsabilityMin = $piWeightUsabilityMin.text();
    }else{
        $piWeightUsabilityMax = $piWeightUsabilityMax.val();
    }

    if(businessNum === "사용성변화"){
        if($piWeightUsability.val()===""){
            $piWeightUsability.val($piWeightUsability.attr('placeholder'));
            downWeightCheckTechOld(businessNum, type);
        }else{
            if(Number($piWeightUsability.val()) < Number($piWeightUsabilityMin) || Number($piWeightUsability.val()) > Number($piWeightUsabilityMax)){
                $("#chapter").val("6");
                alertWeightCheck("평가지표별 사용성이 초과했습니다.<br>" + $piWeightUsabilityMin + "~" + $piWeightUsabilityMax + " 사이로 입력해주세요.<br>그래도 계속 작성하시겠습니까?");
                return false;
            }else{
                downWeightCheckTechOld(businessNum, type);
            }
        }
    }else{
        downWeightCheckTechOld(businessNum, type);
    }
}

// 하단 기술성 노후도 - 가중치 입력칸 맞는지 확인하는 함수9
function downWeightCheckTechOld(businessNum, type){

    // 노후도
    const $piWeightOld = $("#piWeightOld");
    let $piWeightOldMin = $("#piWeightOldMin");
    let $piWeightOldMax = $("#piWeightOldMax");
    if(type===1){
        $piWeightOldMin = $piWeightOldMin.text();
    }else{
        $piWeightOldMax = $piWeightOldMax.val();
    }

    if($piWeightOld.val()===""){
        $piWeightOld.val($piWeightOld.attr('placeholder'));
        downWeightCheckTechUrgency(businessNum, type);
    }else{
        if(Number($piWeightOld.val()) < Number($piWeightOldMin) || Number($piWeightOld.val()) > Number($piWeightOldMax)){
            $("#chapter").val("7");
            alertWeightCheck("평가지표별 노후도가 초과했습니다.<br>" + $piWeightOldMin + "~" + $piWeightOldMax + " 사이로 입력해주세요.<br>그래도 계속 작성하시겠습니까?");
        }else{
            downWeightCheckTechUrgency(businessNum, type);
        }
    }
}

// 하단 기술성 지체도 - 가중치 입력칸 맞는지 확인하는 함수10
function downWeightCheckTechUrgency(businessNum, type){

    // 지체도
    const $piWeightUrgency = $("#piWeightUrgency");
    let $piWeightUrgencyMin = $("#piWeightUrgencyMin");
    let $piWeightUrgencyMax = $("#piWeightUrgencyMax");
    if(type===1){
        $piWeightUrgencyMin = $piWeightUrgencyMin.text();
    }else{
        $piWeightUrgencyMax = $piWeightUrgencyMax.val();
    }

    if(businessNum === "노후화대응"){
        if($piWeightUrgency.val()===""){
            $piWeightUrgency.val($piWeightUrgency.attr('placeholder'));
            downWeightCheckTechGoal(businessNum, type);
        }else{
            if(Number($piWeightUrgency.val()) < Number($piWeightUrgencyMin) || Number($piWeightUrgency.val()) > Number($piWeightUrgencyMax)){
                $("#chapter").val("8");
                alertWeightCheck("평가지표별 지체도가 초과했습니다.<br>" + $piWeightUrgencyMin + "~" + $piWeightUrgencyMax + " 사이로 입력해주세요.<br>그래도 계속 작성하시겠습니까?");
                return false;
            }else{
                downWeightCheckTechGoal(businessNum, type);
            }
        }
    }else{
        downWeightCheckTechGoal(businessNum, type);
    }

}

// 하단 기술성 목표달성도 - 가중치 입력칸 맞는지 확인하는 함수11
function downWeightCheckTechGoal(businessNum, type){

    // 목표달성도
    const $piWeightGoal = $("#piWeightGoal");
    let $piWeightGoalMin = $("#piWeightGoalMin");
    let $piWeightGoalMax = $("#piWeightGoalMax");
    if(type===1){
        $piWeightGoalMin = $piWeightGoalMin.text();
    }else{
        $piWeightGoalMax = $piWeightGoalMax.val();
    }

    if(businessNum === "노후화대응"){
        if($piWeightGoal.val()===""){
            $piWeightGoal.val($piWeightGoal.attr('placeholder'));
            downWeightCheckEcoSafeUtility(businessNum, type);
        }else{
            if(Number($piWeightGoal.val()) < Number($piWeightGoalMin) || Number($piWeightGoal.val()) > Number($piWeightGoalMax)){
                $("#chapter").val("9");
                alertWeightCheck("평가지표별 목표달성도가 초과했습니다.<br>" + $piWeightGoalMin + "~" + $piWeightGoalMax + " 사이로 입력해주세요.<br>그래도 계속 작성하시겠습니까?");
                return false;
            }else{
                downWeightCheckEcoSafeUtility(businessNum, type);
            }
        }
    }else{
        downWeightCheckEcoSafeUtility(businessNum, type);
    }

}

// 하단 경제성 안전효용개선 or 사업규모등급 - 가중치 입력칸 맞는지 확인하는 함수12
function downWeightCheckEcoSafeUtility(businessNum, type){

    // 안전효용 개선 효율성, 사업규모 등급
    const $piWeightSafeUtility = $("#piWeightSafeUtility");
    let $piWeightSafeUtilityMin = $("#piWeightSafeUtilityMin");
    let $piWeightSafeUtilityMax = $("#piWeightSafeUtilityMax");
    if(type===1){
        $piWeightSafeUtilityMin = $piWeightSafeUtilityMin.text();
    }else{
        $piWeightSafeUtilityMax = $piWeightSafeUtilityMax.val();
    }

    let safeUtility;
    if(businessNum === "노후화대응") {
        safeUtility = "안전효용 개선이";
    }else {
        safeUtility = "사업규모 등급이";
    }

    if($piWeightSafeUtility.val()===""){
        $piWeightSafeUtility.val($piWeightSafeUtility.attr('placeholder'));
        downWeightCheckEcoCostUtility(businessNum, type);
    }else{
        if(Number($piWeightSafeUtility.val()) < Number($piWeightSafeUtilityMin) || Number($piWeightSafeUtility.val()) > Number($piWeightSafeUtilityMax)){
            $("#chapter").val("10");
            alertWeightCheck("평가지표별 "+safeUtility+" 초과했습니다.<br>" + $piWeightSafeUtilityMin + "~" + $piWeightSafeUtilityMax + " 사이로 입력해주세요.<br>그래도 계속 작성하시겠습니까?");
            return false;
        }else{
            downWeightCheckEcoCostUtility(businessNum, type);
        }
    }

}

// 하단 경제성 자산가치개선 or 사업효율등급 - 가중치 입력칸 맞는지 확인하는 함수13
function downWeightCheckEcoCostUtility(businessNum, type){

    // 자산가치 개선 효율성, 사업효율 등급
    const $piWeightCostUtility = $("#piWeightCostUtility");
    let $piWeightCostUtilityMin = $("#piWeightCostUtilityMin");
    let $piWeightCostUtilityMax = $("#piWeightCostUtilityMax");
    if(type===1){
        $piWeightCostUtilityMin = $piWeightCostUtilityMin.text();
    }else{
        $piWeightCostUtilityMax = $piWeightCostUtilityMax.val();
    }

    let costUtility;
    if(businessNum === "노후화대응") {
        costUtility = "자산가치 개선이";
    }else {
        costUtility = "사업효율 등급이";
    }

    if($piWeightCostUtility.val()===""){
        $piWeightCostUtility.val($piWeightCostUtility.attr('placeholder'));
        downWeightCheckPolicyBusiness(businessNum, type);
    }else{
        if(Number($piWeightCostUtility.val()) < Number($piWeightCostUtilityMin) || Number($piWeightCostUtility.val()) > Number($piWeightCostUtilityMax)){
            $("#chapter").val("11");
            alertWeightCheck("평가지표별 "+costUtility+" 초과했습니다.<br>" + $piWeightCostUtilityMin + "~" + $piWeightCostUtilityMax + " 사이로 입력해주세요.<br>그래도 계속 작성하시겠습니까?");
            return false;
        }else{
            downWeightCheckPolicyBusiness(businessNum, type);
        }
    }

}

// 하단 정책성 사업추진 타당성 - 가중치 입력칸 맞는지 확인하는 함수14
function downWeightCheckPolicyBusiness(businessNum, type){

    // 사업추진 타당성
    const $piWeightBusiness = $("#piWeightBusiness");
    let $piWeightBusinessMin = $("#piWeightBusinessMin");
    let $piWeightBusinessMax = $("#piWeightBusinessMax");
    if(type===1){
        $piWeightBusinessMin = $piWeightBusinessMin.text();
    }else{
        $piWeightBusinessMax = $piWeightBusinessMax.val();
    }

    if($piWeightBusiness.val()===""){
        $piWeightBusiness.val($piWeightBusiness.attr('placeholder'));
        downWeightCheckPolicyComplaint(businessNum, type);
    }else{
        if(Number($piWeightBusiness.val()) < Number($piWeightBusinessMin) || Number($piWeightBusiness.val()) > Number($piWeightBusinessMax)){
            $("#chapter").val("12");
            alertWeightCheck("평가지표별 사업추진 타당성이 초과했습니다.<br>" + $piWeightBusinessMin + "~" + $piWeightBusinessMax + " 사이로 입력해주세요.<br>그래도 계속 작성하시겠습니까?");
            return false;
        }else{
            downWeightCheckPolicyComplaint(businessNum, type);
        }
    }

}

// 하단 정책성 민원 및 사고 대응성 - 가중치 입력칸 맞는지 확인하는 함수15
function downWeightCheckPolicyComplaint(businessNum, type){

    // 민원 및 사고 대응성
    const $piWeightComplaint = $("#piWeightComplaint");
    let $piWeightComplaintMin = $("#piWeightComplaintMin");
    let $piWeightComplaintMax = $("#piWeightComplaintMax");
    if(type===1){
        $piWeightComplaintMin = $piWeightComplaintMin.text();
    }else{
        $piWeightComplaintMax = $piWeightComplaintMax.val();
    }

    if(businessNum !== "기준변화"){
        if($piWeightComplaint.val()===""){
            $piWeightComplaint.val($piWeightComplaint.attr('placeholder'));
            downWeightCheckPolicyEffect(type);
        }else{
            if(Number($piWeightComplaint.val()) < Number($piWeightComplaintMin) || Number($piWeightComplaint.val()) > Number($piWeightComplaintMax)){
                $("#chapter").val("13");
                alertWeightCheck("평가지표별 민원 대응성이 초과했습니다.<br>" + $piWeightComplaintMin + "~" + $piWeightComplaintMax + " 사이로 입력해주세요.<br>그래도 계속 작성하시겠습니까?");
                return false;
            }else{
                downWeightCheckPolicyEffect(type);
            }
        }
    }else{
        downWeightCheckPolicyEffect(type);
    }

}

// 하단 정책성 사업효과 범용성 - 가중치 입력칸 맞는지 확인하는 함수16
function downWeightCheckPolicyEffect(type){

    // 사업효과 범용성
    const $piWeightBusinessEffect = $("#piWeightBusinessEffect");
    let $piWeightBusinessEffectMin = $("#piWeightBusinessEffectMin");
    let $piWeightBusinessEffectMax = $("#piWeightBusinessEffectMax");
    if(type===1){
        $piWeightBusinessEffectMin = $piWeightBusinessEffectMin.text();
    }else{
        $piWeightBusinessEffectMax = $piWeightBusinessEffectMax.val();
    }

    if($piWeightBusinessEffect.val()===""){
        $piWeightBusinessEffect.val($piWeightBusinessEffect.attr('placeholder'));
        inputPerformanceNext3();
    }else{
        if(Number($piWeightBusinessEffect.val()) < Number($piWeightBusinessEffectMin) || Number($piWeightBusinessEffect.val()) > Number($piWeightBusinessEffectMax)){
            $("#chapter").val("14");
            alertWeightCheck("평가지표별 사업효과 범용성이 초과했습니다.<br>" + $piWeightBusinessEffectMin + "~" + $piWeightBusinessEffectMax + " 사이로 입력해주세요.<br>그래도 계속 작성하시겠습니까?");
            return false;
        }else{
            if(type===1){
                inputPerformanceNext3();
            }else{
                excelSend();
            }
        }
    }

}



// Input 첫번째 NEXT버튼 마지막 구간 저장
function inputPerformanceNext3(){

    JWT_Get();

    let url;

    if (accessToken == null && refreshToken == null && insert_id == null) {
        // console.log("callinfo(userid)함수 : 토큰&리플레시&로그인한아이디 Null");
        alertCaution("토큰이 만료되었습니다.<BR>다시 로그인해주세요.", 2);
    } else {

        const  autoNum = $("#autoNum").val();
        console.log("마지막 저장 autoNum : "+autoNum);

        const formData = new FormData(document.getElementById('weightSendForm'));

        url = $("#backend_protocol").val() + "://" + $("#backend_url").val() + "/api/performance/weightSave/"+autoNum; // 호출할 백엔드 API
        console.log("url : " + url);
        $.ajax({
            url: url,
            type: 'POST',
            data : formData,
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
                }else if(request.status === 400) {
                    // console.log("request.status : " + request.status + " => 400에러");
                    alertCaution("400에러 재로그인 해주세요.", 2);
                } else {
                    // console.log("request.status : " + request.status + " => 404에러");
                    alertCaution("404에러 재로그인 해주세요.", 2);
                }
            },
            success: function (request) {
                let status = request.status;
                // console.log("status : " + status);
                if (status === 200) {
                    console.log("마지막 저장완료");
                    alertLink(request.sendData.autoNum);
                    alertSuccess("작성을 완료했습니다.");
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




// 중간저장 데이터 호출하기1
function middleData(autoNum){

    console.log("일련번호 : "+autoNum);

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
                }else if(request.status === 400) {
                    // console.log("request.status : " + request.status + " => 400에러");
                    alertCaution("400에러 재로그인 해주세요.", 2);
                } else {
                    // console.log("request.status : " + request.status + " => 404에러");
                    alertCaution("404에러 재로그인 해주세요.", 2);
                }
            },
            success: function (request) {
                let status = request.status;
                // console.log("status : " + status);
                if (status === 200) {
                    $("#step3div").css('display','block');

                    const piBusiness = request.sendData.performanceData.piBusiness
                    if(piBusiness==="노후화대응"){
                        $('#piBusiness-1').prop("checked", true);
                        piBusinessClick(1);
                    }else if(piBusiness==="기준변화"){
                        $('#piBusiness-2').prop("checked", true);
                        piBusinessClick(2);
                    }else{
                        $('#piBusiness-3').prop("checked", true);
                        piBusinessClick(3);
                    }

                    const piFacilityType = request.sendData.performanceData.piFacilityType;
                    const piType = request.sendData.performanceData.piType;
                    if(piFacilityType==="교량"){
                        $('#group1-1').prop("checked", true);
                        piTypeClick("1",piType);
                    }else if(piFacilityType==="보도육교"){
                        $('#group1-2').prop("checked", true);
                        piTypeClick("2",piType);
                    }else if(piFacilityType==="터널"){
                        $('#group1-3').prop("checked", true);
                        piTypeClick("3",piType);
                    }else if(piFacilityType==="지하차도"){
                        $('#group1-4').prop("checked", true);
                        piTypeClick("4",piType);
                    }else if(piFacilityType==="절토사면"){
                        $('#group1-5').prop("checked", true);
                        piTypeClick("5",piType);
                    }else{
                        $('#group1-6').prop("checked", true);
                        piTypeClick("6",piType);
                    }
                    $("#piFacilityName").val(request.sendData.performanceData.piFacilityName);
                    $("#piCompletionYear").val(request.sendData.performanceData.piCompletionYear);
                    $("#piPublicYear").val(request.sendData.performanceData.piPublicYear);
                    $("#piErectionCost").val(pushComma(request.sendData.performanceData.piErectionCost));
                    $("#piKind").val(request.sendData.performanceData.piKind);
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

                    console.log("데이터 테스트");
                    console.log(request.sendData.performanceData.piUsabilityAndGoalLevel);
                    if(request.sendData.performanceData.piUsabilityAndGoalLevel==="A"){
                        $('#piUsabilityAndGoalLevel').val('A').prop("selected",true);
                    }else if(request.sendData.performanceData.piUsabilityAndGoalLevel==="B"){
                        $('#piUsabilityAndGoalLevel').val('B').prop("selected",true);
                    }else if(request.sendData.performanceData.piUsabilityAndGoalLevel==="C"){
                        $('#piUsabilityAndGoalLevel').val('C').prop("selected",true);
                    }else if(request.sendData.performanceData.piUsabilityAndGoalLevel==="D") {
                        $('#piUsabilityAndGoalLevel').val('D').prop("selected", true);
                    }else if(request.sendData.performanceData.piUsabilityAndGoalLevel==="기타"){
                        $('#piUsabilityAndGoalLevel').val('기타').prop("selected",true);
                    }else{
                        $('#piUsabilityAndGoalLevel').val('해당안됨').prop("selected",true);
                    }

                    const piMaintenanceDelay = request.sendData.performanceData.piMaintenanceDelay;
                    // console.log("piMaintenanceDelay : "+piMaintenanceDelay)
                    if(piMaintenanceDelay<1){
                        $("#piMaintenanceDelay").val("0");
                    }else if(piMaintenanceDelay===1){
                        $("#piMaintenanceDelay").val("1");
                    }else if(piMaintenanceDelay===2){
                        $("#piMaintenanceDelay").val("2");
                    }else if(piMaintenanceDelay===3){
                        $("#piMaintenanceDelay").val("3");
                    }else{
                        $("#piMaintenanceDelay").val("9");
                    }

                    $("#piAADT").val(pushComma(request.sendData.performanceData.piAADT));
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

// 중간저장 데이터 호출하기2
function middleDataBusiness(autoNum){

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

        url = $("#backend_protocol").val()+"://" + $("#backend_url").val() + "/api/performance/middleDataBusiness"; // 호출할 백엔드 API
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
                    console.log("request.status : " + request.status + " => 500에러");
                    // alertCaution("500에러 재로그인 해주세요.", 2);
                }else if(request.status === 400) {
                    console.log("request.status : " + request.status + " => 400에러");
                    // alertCaution("400에러 재로그인 해주세요.", 2);
                } else {
                    console.log("request.status : " + request.status + " => 404에러");
                    // alertCaution("404에러 재로그인 해주세요.", 2);
                }
            },
            success: function (request) {
                let status = request.status;
                // console.log("status : " + status);
                if (status === 200) {

                    const size = request.sendData.size;
                    console.log("size : "+size);

                    const getData = request.sendData.performance[0].piBusinessType;

                    // 대안이 등록까지 완료 되있을때만 작동
                    if(getData !== null){

                        let j=1;
                        let x=1;
                        let y=2;
                        for(let i=0; i<size; i++){
                            const piBusinessType = request.sendData.performance[i].piBusinessType;
                            const piBusinessClassification = request.sendData.performance[i].piBusinessClassification;
                            // console.log("piBusinessType : "+piBusinessType);
                            // console.log("piBusinessClassification : "+piBusinessClassification);
                            if(piBusinessType==="성능개선"){
                                $("#piBusinessType"+x).prop("checked", true);
                                piBusinessTypeClick(x,j,piBusinessClassification)
                            }else if(piBusinessType==="유지보수"){
                                $("#piBusinessType"+y).prop("checked", true);
                                piBusinessTypeClick(y,j,piBusinessClassification)
                            }

                            $("#piTargetAbsence"+j).val(request.sendData.performance[i].piTargetAbsence);
                            $("#piBusinessExpenses"+j).val(pushComma(request.sendData.performance[i].piBusinessExpenses));
                            $("#piBeforeSafetyRating"+j).val(request.sendData.performance[i].piBeforeSafetyRating);
                            $("#piAfterSafetyRating"+j).val(request.sendData.performance[i].piAfterSafetyRating);

                            const piBusinessValidity = request.sendData.performance[i].piBusinessValidity;
                            $("#piBusinessValidity"+j).val(piBusinessValidity);

                            j++
                            x=x+2;
                            y=y+2;
                        }

                        $("#piWhether").val(request.sendData.performance[0].piWhether);
                        if(size===3){
                            $("#businessCount").val(size);
                            $("#addBusiness1").css('display', 'block');
                        }else if(size===4){
                            $("#businessCount").val(size);
                            $("#addBusiness1").css('display', 'block');
                            $("#addBusiness2").css('display', 'block');
                            $("#addBusinessBtn").css("display","none");
                        }

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

// 성공알림창 버튼 누르면 화면이동하는 함수
function alertLink(autoNum) {
    $(document).on("click","#successBtn",function(){
        location.href = "/performance/output/" + autoNum;
        $('#popupId').remove();
    });
}

// 아웃풋페이지 이동
function outputMove(autoNum){
    location.href = "/performance/output/" + autoNum;
}

// Input 가중치 셋팅값 가져오기
function weightGet(){

    JWT_Get();

    if (accessToken == null || refreshToken == null || insert_id == null) {
        // console.log("callinfo(userid)함수 : 토큰&리플레시&로그인한아이디 Null");
        alertCaution("토큰이 만료되었습니다.<BR>다시 로그인해주세요.", 2);
    } else {

        const  autoNum = $("#autoNum").val();

        let url;

        const $businessNum = $("#businessNum").val();
        const params = {
            autoNum : autoNum,
            businessNum : $businessNum,
            uploadYn: "N"
        }

        console.log("가중치 셋팅값 가져오기 autoNum : "+autoNum);
        url = $("#backend_protocol").val() + "://" + $("#backend_url").val() + "/api/performance/weightGet"; // 호출할 백엔드 API
        // console.log("url : "+url);

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
                }else if(request.status === 400) {
                    // console.log("request.status : " + request.status + " => 400에러");
                    alertCaution("400에러 재로그인 해주세요.", 2);
                } else {
                    // console.log("request.status : " + request.status + " => 404에러");
                    alertCaution("404에러 재로그인 해주세요.", 2);
                }
            },
            success: function (request) {
                let status = request.status;
                // console.log("status : " + status);

                if (status === 200) {

                    const $choseCategory = $("#choseCategory");

                    // 유형
                    const $weight_Category = $("#businessNum");

                    const $piWeightTechnicality = $("#piWeightTechnicality");
                    const $piWeightEconomy = $("#piWeightEconomy");
                    const $piWeightPolicy = $("#piWeightPolicy");
                    const $piWeightTechnicalityMin = $("#piWeightTechnicalityMin");
                    const $piWeightTechnicalityMax = $("#piWeightTechnicalityMax");
                    const $piWeightEconomyMin = $("#piWeightEconomyMin");
                    const $piWeightEconomyMax = $("#piWeightEconomyMax");
                    const $piWeightPolicyMin = $("#piWeightPolicyMin");
                    const $piWeightPolicyMax = $("#piWeightPolicyMax");

                    // 평가지표별 가중치 셋팅 - 기술성
                    // 안전성
                    const $piWeightSafe = $("#piWeightSafe");
                    const $piWeightSafeMin = $("#piWeightSafeMin");
                    const $piWeightSafeMax = $("#piWeightSafeMax");

                    // 사용성
                    const $piWeightUsability = $("#piWeightUsability");
                    const $piWeightUsabilityMin = $("#piWeightUsabilityMin");
                    const $piWeightUsabilityMax = $("#piWeightUsabilityMax");

                    // 노후도
                    const $piWeightOld = $("#piWeightOld");
                    const $piWeightOldMin = $("#piWeightOldMin");
                    const $piWeightOldMax = $("#piWeightOldMax");

                    // 지체도
                    const $piWeightUrgency = $("#piWeightUrgency");
                    const $piWeightUrgencyMin = $("#piWeightUrgencyMin");
                    const $piWeightUrgencyMax = $("#piWeightUrgencyMax");

                    // 목표달성도
                    const $piWeightGoal = $("#piWeightGoal");
                    const $piWeightGoalMin = $("#piWeightGoalMin");
                    const $piWeightGoalMax = $("#piWeightGoalMax");

                    // 평가지표별 가중치 셋팅 - 경제성
                    // 안전효용 개선 효율성, 사업규모 등급
                    const $piWeightSafeUtility = $("#piWeightSafeUtility");
                    const $piWeightSafeUtilityMin = $("#piWeightSafeUtilityMin");
                    const $piWeightSafeUtilityMax = $("#piWeightSafeUtilityMax");

                    // 자산가치 개선 효율성, 사업효율 등급
                    const $piWeightCostUtility = $("#piWeightCostUtility");
                    const $piWeightCostUtilityMin = $("#piWeightCostUtilityMin");
                    const $piWeightCostUtilityMax = $("#piWeightCostUtilityMax");

                    // 평가지표별 가중치 셋팅 - 정책성
                    // 사업추진 타당성
                    const $piWeightBusiness = $("#piWeightBusiness");
                    const $piWeightBusinessMin = $("#piWeightBusinessMin");
                    const $piWeightBusinessMax = $("#piWeightBusinessMax");

                    // 민원 및 사고 대응성
                    const $piWeightComplaint = $("#piWeightComplaint");
                    const $piWeightComplaintMin = $("#piWeightComplaintMin");
                    const $piWeightComplaintMax = $("#piWeightComplaintMax");

                    // 사업효과 범용성
                    const $piWeightBusinessEffect = $("#piWeightBusinessEffect");
                    const $piWeightBusinessEffectMin = $("#piWeightBusinessEffectMin");
                    const $piWeightBusinessEffectMax = $("#piWeightBusinessEffectMax");

                    // 사업추진 임계점수
                    const $piWeightCriticalScore = $("#piWeightCriticalScore");

                    // 평가지표별 가중치 셋팅
                    const $techTable = $("#techTable");
                    const $polTable = $("#polTable");

                    const $techUsabilityTr = $("#techUsabilityTr");
                    const $techUrgencyTr = $("#techUrgencyTr");
                    const $techGoalTr = $("#techGoalTr");

                    const $ecoTh1 = $("#ecoTh1");
                    const $ecoTh2 = $("#ecoTh2");

                    const $polComplaintTr = $("#polComplaintTr");

                    const weight = request.sendData.weightDto;
                    let weightValue = 0;
                    // console.log(weight);
                    if(weight !== null){
                        // console.log("가중치값 셋팅");
                        weightValue = 1;
                    }

                    // 평가지표별 가중치
                    if(weightValue === 1){
                        $piWeightTechnicality.val(weight.piWeightTechnicality);
                        $piWeightEconomy.val(weight.piWeightEconomy);
                        $piWeightPolicy.val(weight.piWeightPolicy);

                        $piWeightSafe.val(weight.piWeightSafe);
                        $piWeightOld.val(weight.piWeightOld);
                        $piWeightUsability.val(weight.piWeightUsability);
                        $piWeightUrgency.val(weight.piWeightUrgency);
                        $piWeightGoal.val(weight.piWeightGoal);

                        $piWeightSafeUtility.val(weight.piWeightSafeUtility);
                        $piWeightCostUtility.val(weight.piWeightCostUtility);

                        $piWeightBusiness.val(weight.piWeightBusiness);
                        $piWeightComplaint.val(weight.piWeightComplaint);
                        $piWeightBusinessEffect.val(weight.piWeightBusinessEffect);

                        $piWeightCriticalScore.val(weight.piWeightCriticalScore);
                    }

                    const weightSetting = request.sendData.weightSettingDto;
                    // console.log(weightSetting);

                    $piWeightCriticalScore.attr("placeholder", 50);
                    if ($weight_Category.val() === "노후화대응") {

                        $choseCategory.text("노후화 대응 유형");

                        // 성능개선 사업구분 별 가중치
                        $piWeightTechnicality.attr("placeholder", "0.66");
                        $piWeightEconomy.attr("placeholder", "0.2");
                        $piWeightPolicy.attr("placeholder", "0.14");
                        $piWeightTechnicalityMin.text(0.52);
                        $piWeightTechnicalityMax.text(0.79);
                        $piWeightEconomyMin.text(0.15);
                        $piWeightEconomyMax.text(0.29);
                        $piWeightPolicyMin.text(0.07);
                        $piWeightPolicyMax.text(0.2);

                        $piWeightSafe.attr("placeholder", weightSetting.piOldSafetyStan);
                        $piWeightSafeMin.text(weightSetting.piOldSafetyMin);
                        $piWeightSafeMax.text(weightSetting.piOldSafetyMax);

                        $piWeightOld.attr("placeholder", weightSetting.piOldOldStan);
                        $piWeightOldMin.text(weightSetting.piOldOldMin);
                        $piWeightOldMax.text(weightSetting.piOldOldMax);

                        $piWeightUrgency.attr("placeholder", weightSetting.piOldUrgencyStan);
                        $piWeightUrgencyMin.text(weightSetting.piOldUrgencyMin);
                        $piWeightUrgencyMax.text(weightSetting.piOldUrgencyMax);

                        $piWeightGoal.attr("placeholder", weightSetting.piOldGoalStan);
                        $piWeightGoalMin.text(weightSetting.piOldGoalMin);
                        $piWeightGoalMax.text(weightSetting.piOldGoalMax);

                        $piWeightSafeUtility.attr("placeholder", weightSetting.piOldSafeUtilityStan);
                        $piWeightSafeUtilityMin.text(weightSetting.piOldSafeUtilityMin);
                        $piWeightSafeUtilityMax.text(weightSetting.piOldSafeUtilityMax);

                        $piWeightCostUtility.attr("placeholder", weightSetting.piOldCostUtilityStan);
                        $piWeightCostUtilityMin.text(weightSetting.piOldCostUtilityMin);
                        $piWeightCostUtilityMax.text(weightSetting.piOldCostUtilityMax);

                        $piWeightBusiness.attr("placeholder", weightSetting.piOldBusinessStan);
                        $piWeightBusinessMin.text(weightSetting.piOldBusinessMin);
                        $piWeightBusinessMax.text(weightSetting.piOldBusinessMax);

                        $piWeightComplaint.attr("placeholder", weightSetting.piOldComplaintStan);
                        $piWeightComplaintMin.text(weightSetting.piOldComplaintMin);
                        $piWeightComplaintMax.text(weightSetting.piOldComplaintMax);

                        $piWeightBusinessEffect.attr("placeholder", weightSetting.piOldBusinessEffectStan);
                        $piWeightBusinessEffectMin.text(weightSetting.piOldBusinessEffectMin);
                        $piWeightBusinessEffectMax.text(weightSetting.piOldBusinessEffectMax);

                        $techTable.attr("rowspan", 4);
                        $polTable.attr("rowspan", 3);
                        $techUsabilityTr.css('display', 'none');

                    } else if ($weight_Category.val() === "기준변화") {

                        $choseCategory.text("기준변화 유형");

                        // 성능개선 사업구분 별 가중치
                        $piWeightTechnicality.attr("placeholder", "0.24");
                        $piWeightEconomy.attr("placeholder", "0.48");
                        $piWeightPolicy.attr("placeholder", "0.28");
                        $piWeightTechnicalityMin.text(0.17);
                        $piWeightTechnicalityMax.text(0.3);
                        $piWeightEconomyMin.text(0.36);
                        $piWeightEconomyMax.text(0.58);
                        $piWeightPolicyMin.text(0.17);
                        $piWeightPolicyMax.text(0.39);

                        $techTable.attr("rowspan", 2);
                        $polTable.attr("rowspan", 2);
                        $techUsabilityTr.css('display', 'none');
                        $techUrgencyTr.css('display', 'none');
                        $techGoalTr.css('display', 'none');
                        $techUsabilityTr.css('display', 'none');
                        $polComplaintTr.css("display", "none");
                        $ecoTh1.text("사업규모 등급");
                        $ecoTh2.text("사업효율 등급");

                        $piWeightSafe.attr("placeholder", weightSetting.piBaseSafetyStan);
                        $piWeightSafeMin.text(weightSetting.piBaseSafetyMin);
                        $piWeightSafeMax.text(weightSetting.piBaseSafetyMax);

                        $piWeightOld.attr("placeholder", weightSetting.piBaseOldStan);
                        $piWeightOldMin.text(weightSetting.piBaseOldMin);
                        $piWeightOldMax.text(weightSetting.piBaseOldMax);

                        $piWeightSafeUtility.attr("placeholder", weightSetting.piBaseBusinessScaleRankStan);
                        $piWeightSafeUtilityMin.text(weightSetting.piBaseBusinessScaleRankMin);
                        $piWeightSafeUtilityMax.text(weightSetting.piBaseBusinessScaleRankMax);

                        $piWeightCostUtility.attr("placeholder", weightSetting.piBaseBusinessEffectRankStan);
                        $piWeightCostUtilityMin.text(weightSetting.piBaseBusinessEffectRankMin);
                        $piWeightCostUtilityMax.text(weightSetting.piBaseBusinessEffectRankMax);

                        $piWeightBusiness.attr("placeholder", weightSetting.piBaseBusinessStan);
                        $piWeightBusinessMin.text(weightSetting.piBaseBusinessMin);
                        $piWeightBusinessMax.text(weightSetting.piBaseBusinessMax);

                        $piWeightBusinessEffect.attr("placeholder", weightSetting.piBaseBusinessEffectStan);
                        $piWeightBusinessEffectMin.text(weightSetting.piBaseBusinessEffectMin);
                        $piWeightBusinessEffectMax.text(weightSetting.piBaseBusinessEffectMax);

                    }else{

                        $choseCategory.text("사용성변화 유형");

                        // 성능개선 사업구분 별 가중치
                        $piWeightTechnicality.attr("placeholder", "0.19");
                        $piWeightEconomy.attr("placeholder", "0.39");
                        $piWeightPolicy.attr("placeholder", "0.42");
                        $piWeightTechnicalityMin.text(0.12);
                        $piWeightTechnicalityMax.text(0.29);
                        $piWeightEconomyMin.text(0.24);
                        $piWeightEconomyMax.text(0.47);
                        $piWeightPolicyMin.text(0.32);
                        $piWeightPolicyMax.text(0.5);

                        $techTable.attr("rowspan", 3);
                        $techUrgencyTr.css('display', 'none');
                        $techGoalTr.css('display', 'none');
                        $techUsabilityTr.css('display', 'revert');
                        $ecoTh1.text("사업규모 등급");
                        $ecoTh2.text("사업효율 등급");

                        $piWeightSafe.attr("placeholder", weightSetting.piUseSafetyStan);
                        $piWeightSafeMin.text(weightSetting.piUseSafetyMin);
                        $piWeightSafeMax.text(weightSetting.piUseSafetyMax);

                        $piWeightUsability.attr("placeholder", weightSetting.piUseUsabilityStan);
                        $piWeightUsabilityMin.text(weightSetting.piUseUsabilityMin);
                        $piWeightUsabilityMax.text(weightSetting.piUseUsabilityMax);

                        $piWeightOld.attr("placeholder", weightSetting.piUseOldStan);
                        $piWeightOldMin.text(weightSetting.piUseOldMin);
                        $piWeightOldMax.text(weightSetting.piUseOldMax);

                        $piWeightSafeUtility.attr("placeholder", weightSetting.piUseBusinessScaleRankStan);
                        $piWeightSafeUtilityMin.text(weightSetting.piUseBusinessScaleRankMin);
                        $piWeightSafeUtilityMax.text(weightSetting.piUseBusinessScaleRankMax);

                        $piWeightCostUtility.attr("placeholder", weightSetting.piUseBusinessEffectRankStan);
                        $piWeightCostUtilityMin.text(weightSetting.piUseBusinessEffectRankMin);
                        $piWeightCostUtilityMax.text(weightSetting.piUseBusinessEffectRankMax);

                        $piWeightBusiness.attr("placeholder", weightSetting.piUseBusinessStan);
                        $piWeightBusinessMin.text(weightSetting.piUseBusinessMin);
                        $piWeightBusinessMax.text(weightSetting.piUseBusinessMax);

                        $piWeightComplaint.attr("placeholder", weightSetting.piUseComplaintStan);
                        $piWeightComplaintMin.text(weightSetting.piUseComplaintMin);
                        $piWeightComplaintMax.text(weightSetting.piUseComplaintMax);

                        $piWeightBusinessEffect.attr("placeholder", weightSetting.piUseBusinessEffectStan);
                        $piWeightBusinessEffectMin.text(weightSetting.piUseBusinessEffectMin);
                        $piWeightBusinessEffectMax.text(weightSetting.piUseBusinessEffectMax);

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
















