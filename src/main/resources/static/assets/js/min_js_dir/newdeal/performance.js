// * 성능개선사업평가 서비스 자바스크립트 *

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
        $piUsabilityAndGoalLevelName.text("목표 안전등급")
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
    }else if(val===2){
        $piErectionCostList.css('visibility','hidden');
        $piUsabilityAndGoalLevelName.text("목표 안전등급")
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
        html += "<option value='사장교'>"+"사장교"+"</option>";
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
        if($("#group3-1").checked===false){
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
        if(document.getElementById("group6-1").checked===false){
            business_dissatisfaction.push("7)사업평가 중복성");
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
        if(document.getElementById("group7-1").checked===false){
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
        $('#falseRadio').addClass('open');
    }else{
        $('#choicePop').addClass('open');
    }

}

function choicePopClose(){
    $('#choicePop').removeClass('open');
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
                    if(request.sendData.middleSave===1){
                        console.log("중간저장 게시물이 존재함");
                        $("#autoNum").val(request.sendData.piAutoNum);
                        $("#businessNum").val(request.sendData.piBusiness);
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

// Input 첫번째 NEXT버튼 첫번째 구간(중간저장)
function inputPerformanceNext1(){
    JWT_Get();

    let url;

    if (accessToken == null || refreshToken == null || insert_id == null) {
        // console.log("callinfo(userid)함수 : 토큰&리플레시&로그인한아이디 Null");
        alertCaution("토큰이 만료되었습니다.<BR>다시 로그인해주세요.", 2);
    } else {

        const $piSafetyLevel = $("#piSafetyLevel").val();
        const $piUsabilityAndGoalLevel = $("#piUsabilityAndGoalLevel").val();

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
            if($piSafetyLevel==="A"){
                if($piUsabilityAndGoalLevel==="B" || $piUsabilityAndGoalLevel==="C"){
                    alertCaution("안전등급 보다 목표안전등급이 낮을 수 없습니다.",1);
                    return false;
                }
            }else if($piSafetyLevel==="B"){
                if($piUsabilityAndGoalLevel==="C"){
                    alertCaution("안전등급 보다 목표안전등급이 낮을 수 없습니다.",1);
                    return false;
                }
            }

            if($piErectionCost.val()===""){
                alertCaution("취득원가를 입력해주세요.",1);
                return false;
            }else{
                $piErectionCost.val($piErectionCost.val().replaceAll(",",""));
                if($piErectionCost.val().length>=15){
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

            if(document.getElementById("piBusinessObligatory"+x).checked===false && document.getElementById("piBusinessObligatory"+y).checked===false){
                alertCaution(text+"의 법의 따른 의무사업을 <br>선택해주세요.",1);
                return false;
            }
            if(document.getElementById("piBusinessMandatory"+x).checked===false && document.getElementById("piBusinessMandatory"+y).checked===false){
                alertCaution(text+"의 법정계획/설계기준에 따른 <br>의무사업을 선택해주세요.",1);
                return false;
            }
            if(document.getElementById("piBusinessPlanned"+x).checked===false && document.getElementById("piBusinessPlanned"+y).checked===false){
                alertCaution(text+"의 자체계획/의결에 따른 <br>사업을 선택해주세요.",1);
                return false;
            }
            if($("#piWhether"+j).val()==="") {
                alertCaution(text+"의 최근 1년 간 민원 및 사고발생 <br>건수를 작성해주세요.",1);
                return false;
            }
            j++
            x=x+2;
            y=y+2;
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

        const $weight_Category = $("#businessNum");

        const $piWeightTechnicality = $("#piWeightTechnicality");
        const $piWeightEconomy = $("#piWeightEconomy");
        const $piWeightPolicy = $("#piWeightPolicy");

        const $piWeightSafe = $("#piWeightSafe");
        const $piWeightUsability = $("#piWeightUsability");
        const $piWeightOld = $("#piWeightOld");
        const $piWeightUrgency = $("#piWeightUrgency");
        const $piWeightGoal = $("#piWeightGoal");

        const $piWeightSafeUtility = $("#piWeightSafeUtility");
        const $piWeightCostUtility = $("#piWeightCostUtility");

        const $piWeightBusiness = $("#piWeightBusiness");
        const $piWeightComplaint = $("#piWeightComplaint");
        const $piWeightBusinessEffect = $("#piWeightBusinessEffect");

        console.log("$weight_Category : "+$weight_Category.val());
        if($weight_Category.val()==="노후화대응"){
            if($piWeightTechnicality.val()===""){
                $piWeightTechnicality.val("0.66")
            }else{
                if(Number($piWeightTechnicality.val())<0.52 || Number($piWeightTechnicality.val())>0.79){
                    alertCaution("상단의 기술성 가중치가 초과했습니다.<br>0.52 ~ 0.79 사이로 입력해주세요.",1);
                    return false;
                }
            }
            if($piWeightEconomy.val()===""){
                $piWeightEconomy.val("0.2")
            }else{
                if(Number($piWeightEconomy.val())<0.15 || Number($piWeightEconomy.val())>0.29){
                    alertCaution("상단의 경제성 가중치가 초과했습니다.<br>0.15 ~ 0.29 사이로 입력해주세요.",1);
                    return false;
                }
            }
            if($piWeightPolicy.val()===""){
                $piWeightPolicy.val("0.14")
            }else{
                if(Number($piWeightPolicy.val())<0.07 || Number($piWeightPolicy.val())>0.2){
                    alertCaution("상단의 정책성 가중치가 초과했습니다.<br>0.07 ~ 0.2 사이로 입력해주세요.",1);
                    return false;
                }
            }


            $piWeightUsability.val("0");

            if($piWeightSafe.val()===""){
                $piWeightSafe.val("0.53")
            }else{
                if(Number($piWeightSafe.val())<0.44 || Number($piWeightSafe.val())>0.7){
                    alertCaution("안전성 가중치가 초과했습니다.<br>0.44 ~ 0.7 사이로 입력해주세요.",1);
                    return false;
                }
            }
            if($piWeightOld.val()===""){
                $piWeightOld.val("0.2")
            }else{
                if(Number($piWeightOld.val())<0.11 || Number($piWeightOld.val())>0.3){
                    alertCaution("노후도 가중치가 초과했습니다.<br>0.11 ~ 0.3 사이로 입력해주세요.",1);
                    return false;
                }
            }
            if($piWeightUrgency.val()===""){
                $piWeightUrgency.val("0.09")
            }else{
                if(Number($piWeightUrgency.val())<0.05 || Number($piWeightUrgency.val())>0.15){
                    alertCaution("지체도 가중치가 초과했습니다.<br>0.05 ~ 0.15 사이로 입력해주세요.",1);
                    return false;
                }
            }
            if($piWeightGoal.val()===""){
                $piWeightGoal.val("0.18")
            }else{
                if(Number($piWeightGoal.val())<0.1 || Number($piWeightGoal.val())>0.3){
                    alertCaution("목표달성도 가중치가 초과했습니다.<br>0.1 ~ 0.3 사이로 입력해주세요.",1);
                    return false;
                }
            }


            if($piWeightSafeUtility.val()===""){
                $piWeightSafeUtility.val("0.52")
            }else{
                if(Number($piWeightSafeUtility.val())<0.41 || Number($piWeightSafeUtility.val())>0.65){
                    alertCaution("안전효용 개선 가중치가 초과했습니다.<br>0.41 ~ 0.65 사이로 입력해주세요.",1);
                    return false;
                }
            }
            if($piWeightCostUtility.val()===""){
                $piWeightCostUtility.val("0.48")
            }else{
                if(Number($piWeightCostUtility.val())<0.36 || Number($piWeightCostUtility.val())>0.58){
                    alertCaution("자산가치 개선 가중치가 초과했습니다.<br>0.36 ~ 0.58 사이로 입력해주세요.",1);
                    return false;
                }
            }


            if($piWeightBusiness.val()===""){
                $piWeightBusiness.val("0.54")
            }else{
                if(Number($piWeightBusiness.val())<0.43 || Number($piWeightBusiness.val())>0.66){
                    alertCaution("사업추진 타당성 가중치가 초과했습니다.<br>0.43 ~ 0.66 사이로 입력해주세요.",1);
                    return false;
                }
            }
            if($piWeightComplaint.val()===""){
                $piWeightComplaint.val("0.25")
            }else{
                if(Number($piWeightComplaint.val())<0.16 || Number($piWeightComplaint.val())>0.35){
                    alertCaution("민원및사고 대응성 가중치가 초과했습니다.<br>0.16 ~ 0.35 사이로 입력해주세요.",1);
                    return false;
                }
            }
            if($piWeightBusinessEffect.val()===""){
                $piWeightBusinessEffect.val("0.21")
            }else{
                if(Number($piWeightBusinessEffect.val())<0.1 || Number($piWeightBusinessEffect.val())>0.29){
                    alertCaution("사업효과 범용성 가중치가 초과했습니다.<br>0.1 ~ 0.29 사이로 입력해주세요.",1);
                    return false;
                }
            }


        }else if($weight_Category.val()==="기준변화") {

            if($piWeightTechnicality.val()===""){
                $piWeightTechnicality.val("0.24")
            }else{
                if(Number($piWeightTechnicality.val())<0.17 || Number($piWeightTechnicality.val())>0.3){
                    alertCaution("상단의 기술성 가중치가 초과했습니다.<br>0.17 ~ 0.3 사이로 입력해주세요.",1);
                    return false;
                }
            }
            if($piWeightEconomy.val()===""){
                $piWeightEconomy.val("0.48")
            }else{
                if(Number($piWeightEconomy.val())<0.36 || Number($piWeightEconomy.val())>0.58){
                    alertCaution("상단의 경제성 가중치가 초과했습니다.<br>0.36 ~ 0.58 사이로 입력해주세요.",1);
                    return false;
                }
            }
            if($piWeightPolicy.val()===""){
                $piWeightPolicy.val("0.28")
            }else{
                if(Number($piWeightPolicy.val())<0.17 || Number($piWeightPolicy.val())>0.39){
                    alertCaution("상단의 정책성 가중치가 초과했습니다.<br>0.07 ~ 0.2 사이로 입력해주세요.",1);
                    return false;
                }
            }

            if($piWeightSafe.val()===""){
                $piWeightSafe.val("0.73")
            }else{
                if(Number($piWeightSafe.val())<0.61 || Number($piWeightSafe.val())>0.97){
                    alertCaution("안전성 가중치가 초과했습니다.<br>0.61 ~ 0.97 사이로 입력해주세요.",1);
                    return false;
                }
            }
            if($piWeightOld.val()===""){
                $piWeightOld.val("0.27")
            }else{
                if(Number($piWeightOld.val())<0.16 || Number($piWeightOld.val())>0.41){
                    alertCaution("노후도 가중치가 초과했습니다.<br>0.16 ~ 0.41 사이로 입력해주세요.",1);
                    return false;
                }
            }
            $piWeightUsability.val("0");
            $piWeightUrgency.val("0");
            $piWeightGoal.val("0");

            if($piWeightSafeUtility.val()===""){
                $piWeightSafeUtility.val("0.48")
            }else{
                if(Number($piWeightSafeUtility.val())<0.36 || Number($piWeightSafeUtility.val())>0.58){
                    alertCaution("사업규모 등급 가중치가 초과했습니다.<br>0.36 ~ 0.58 사이로 입력해주세요.",1);
                    return false;
                }
            }
            if($piWeightCostUtility.val()===""){
                $piWeightCostUtility.val("0.52")
            }else{
                if(Number($piWeightCostUtility.val())<0.41 || Number($piWeightCostUtility.val())>0.65){
                    alertCaution("사업효율 등급 가중치가 초과했습니다.<br>0.41 ~ 0.65 사이로 입력해주세요.",1);
                    return false;
                }
            }

            if($piWeightBusiness.val()===""){
                $piWeightBusiness.val("0.72")
            }else{
                if(Number($piWeightBusiness.val())<0.57 || Number($piWeightBusiness.val())>0.88){
                    alertCaution("사업추진 타당성 가중치가 초과했습니다.<br>0.57 ~ 0.88 사이로 입력해주세요.",1);
                    return false;
                }
            }
            $piWeightComplaint.val("0")
            if($piWeightBusinessEffect.val()===""){
                $piWeightBusinessEffect.val("0.28")
            }else{
                if(Number($piWeightBusinessEffect.val())<0.13 || Number($piWeightBusinessEffect.val())>0.39){
                    alertCaution("사업효과 범용성 가중치가 초과했습니다.<br>0.13 ~ 0.39 사이로 입력해주세요.",1);
                    return false;
                }
            }

        }else if($weight_Category.val()==="사용성변화") {

            if($piWeightTechnicality.val()===""){
                $piWeightTechnicality.val("0.19")
            }else{
                if(Number($piWeightTechnicality.val())<0.12 || Number($piWeightTechnicality.val())>0.29){
                    alertCaution("상단의 기술성 가중치가 초과했습니다.<br>0.12 ~ 0.29 사이로 입력해주세요.",1);
                    return false;
                }
            }
            if($piWeightEconomy.val()===""){
                $piWeightEconomy.val("0.39")
            }else{
                if(Number($piWeightEconomy.val())<0.24 || Number($piWeightEconomy.val())>0.47){
                    alertCaution("상단의 경제성 가중치가 초과했습니다.<br>0.24 ~ 0.47 사이로 입력해주세요.",1);
                    return false;
                }
            }
            if($piWeightPolicy.val()===""){
                $piWeightPolicy.val("0.42")
            }else{
                if(Number($piWeightPolicy.val())<0.32 || Number($piWeightPolicy.val())>0.5){
                    alertCaution("상단의 정책성 가중치가 초과했습니다.<br>0.32 ~ 0.5 사이로 입력해주세요.",1);
                    return false;
                }
            }

            if($piWeightSafe.val()===""){
                $piWeightSafe.val("0.62")
            }else{
                if(Number($piWeightSafe.val())<0.51 || Number($piWeightSafe.val())>0.82){
                    alertCaution("안전성 가중치가 초과했습니다.<br>0.51 ~ 0.82 사이로 입력해주세요.",1);
                    return false;
                }
            }
            if($piWeightUsability.val()===""){
                $piWeightUsability.val("0.16")
            }else{
                if(Number($piWeightUsability.val())<0.08 || Number($piWeightUsability.val())>0.24){
                    alertCaution("사용성 가중치가 초과했습니다.<br>0.08 ~ 0.24 사이로 입력해주세요.",1);
                    return false;
                }
            }
            if($piWeightOld.val()===""){
                $piWeightOld.val("0.22")
            }else{
                if(Number($piWeightOld.val())<0.13 || Number($piWeightOld.val())>0.34){
                    alertCaution("노후도 가중치가 초과했습니다.<br>0.13 ~ 0.34 사이로 입력해주세요.",1);
                    return false;
                }
            }
            $piWeightUrgency.val("0");
            $piWeightGoal.val("0");

            if($piWeightSafeUtility.val()===""){
                $piWeightSafeUtility.val("0.48")
            }else{
                if(Number($piWeightSafeUtility.val())<0.36 || Number($piWeightSafeUtility.val())>0.58){
                    alertCaution("사업규모 등급 가중치가 초과했습니다.<br>0.36 ~ 0.58 사이로 입력해주세요.",1);
                    return false;
                }
            }
            if($piWeightCostUtility.val()===""){
                $piWeightCostUtility.val("0.52")
            }else{
                if(Number($piWeightCostUtility.val())<0.41 || Number($piWeightCostUtility.val())>0.65){
                    alertCaution("사업효율 등급 가중치가 초과했습니다.<br>0.41 ~ 0.65 사이로 입력해주세요.",1);
                    return false;
                }
            }


            if($piWeightBusiness.val()===""){
                $piWeightBusiness.val("0.54")
            }else{
                if(Number($piWeightBusiness.val())<0.43 || Number($piWeightBusiness.val())>0.66){
                    alertCaution("사업추진 타당성 가중치가 초과했습니다.<br>0.43 ~ 0.66 사이로 입력해주세요.",1);
                    return false;
                }
            }
            if($piWeightComplaint.val()===""){
                $piWeightComplaint.val("0.25")
            }else{
                if(Number($piWeightComplaint.val())<0.16 || Number($piWeightComplaint.val())>0.35){
                    alertCaution("민원및사고 대응성 가중치가 초과했습니다.<br>0.16 ~ 0.35 사이로 입력해주세요.",1);
                    return false;
                }
            }
            if($piWeightBusinessEffect.val()===""){
                $piWeightBusinessEffect.val("0.21")
            }else{
                if(Number($piWeightBusinessEffect.val())<0.1 || Number($piWeightBusinessEffect.val())>0.29){
                    alertCaution("사업효과 범용성 가중치가 초과했습니다.<br>0.1 ~ 0.29 사이로 입력해주세요.",1);
                    return false;
                }
            }
        }

        const $piWeightCriticalScore = $("#piWeightCriticalScore");
        if($piWeightCriticalScore.val()===""){
            $piWeightCriticalScore.val("50")
        }else if(Number($piWeightCriticalScore.val())>100){
            alertCaution("사업추진 임계점수는 <Br>'100'이하여야 합니다.",1);
        }

        const formData = new FormData(document.getElementById('weightSendForm'));

        url = $("#backend_protocol").val() + "://" + $("#backend_url").val() + "/api/performance/weightSave/"+autoNum; // 호출할 백엔드 API
        // console.log("url : " + url);
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
                    // console.log("마지막 저장완료");
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

                            const piBusinessObligatory = request.sendData.performance[i].piBusinessObligatory;
                            if(piBusinessObligatory===1){
                                $("#piBusinessObligatory"+x).prop("checked", true);
                            }else if(piBusinessObligatory===0){
                                $("#piBusinessObligatory"+y).prop("checked", true);
                            }

                            const piBusinessMandatory = request.sendData.performance[i].piBusinessMandatory;
                            if(piBusinessMandatory===1){
                                $("#piBusinessMandatory"+x).prop("checked", true);
                            }else if(piBusinessMandatory===0){
                                $("#piBusinessMandatory"+y).prop("checked", true);
                            }

                            const piBusinessPlanned = request.sendData.performance[i].piBusinessPlanned;
                            if(piBusinessPlanned===1){
                                $("#piBusinessPlanned"+x).prop("checked", true);
                            }else if(piBusinessPlanned===0){
                                $("#piBusinessPlanned"+y).prop("checked", true);
                            }

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
        $('.weight__contents input[type="number"]').attr('readonly', false);
    }else{
        $("#group1").prop("checked", false);
        $("#group2").prop("checked", true);
        $('.weight__contents input[type="number"]').attr('readonly', true).val("");
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

        const $weight_Category = $("#weight_Category");
        // console.log("선택한 유형 : "+$weight_Category.val());
        if($weight_Category.val()===""){
            alertCaution("성능개선 유형을 선택해주세요.",1)
            return false;
        }

        const $piWeightTechnicality = $("#piWeightTechnicality");
        const $piWeightEconomy = $("#piWeightEconomy");
        const $piWeightPolicy = $("#piWeightPolicy");

        const $piWeightSafe = $("#piWeightSafe");
        const $piWeightUsability = $("#piWeightUsability");
        const $piWeightOld = $("#piWeightOld");
        const $piWeightUrgency = $("#piWeightUrgency");
        const $piWeightGoal = $("#piWeightGoal");

        const $piWeightSafeUtility = $("#piWeightSafeUtility");
        const $piWeightCostUtility = $("#piWeightCostUtility");

        const $piWeightBusiness = $("#piWeightBusiness");
        const $piWeightComplaint = $("#piWeightComplaint");
        const $piWeightBusinessEffect = $("#piWeightBusinessEffect");

        if($weight_Category.val()==="노후화대응"){
            if($piWeightTechnicality.val()===""){
                $piWeightTechnicality.val("0.66")

            }else{
                if(Number($piWeightTechnicality.val())<0.52 || Number($piWeightTechnicality.val())>0.79){
                    alertCaution("상단의 기술성 가중치가 초과했습니다.<br>0.52 ~ 0.79 사이로 입력해주세요.",1);
                    return false;
                }
            }
            if($piWeightEconomy.val()===""){
                $piWeightEconomy.val("0.2")
            }else{
                if(Number($piWeightEconomy.val())<0.15 || Number($piWeightEconomy.val())>0.29){
                    alertCaution("상단의 경제성 가중치가 초과했습니다.<br>0.15 ~ 0.29 사이로 입력해주세요.",1);
                    return false;
                }
            }
            if($piWeightPolicy.val()===""){
                $piWeightPolicy.val("0.14")
            }else{
                if(Number($piWeightPolicy.val())<0.07 || Number($piWeightPolicy.val())>0.2){
                    alertCaution("상단의 정책성 가중치가 초과했습니다.<br>0.07 ~ 0.2 사이로 입력해주세요.",1);
                    return false;
                }
            }


            $piWeightUsability.val("0");

            if($piWeightSafe.val()===""){
                $piWeightSafe.val("0.53")
            }else{
                if(Number($piWeightSafe.val())<0.44 || Number($piWeightSafe.val())>0.7){
                    alertCaution("안전성 가중치가 초과했습니다.<br>0.44 ~ 0.7 사이로 입력해주세요.",1);
                    return false;
                }
            }
            if($piWeightOld.val()===""){
                $piWeightOld.val("0.2")
            }else{
                if(Number($piWeightOld.val())<0.11 || Number($piWeightOld.val())>0.3){
                    alertCaution("노후도 가중치가 초과했습니다.<br>0.11 ~ 0.3 사이로 입력해주세요.",1);
                    return false;
                }
            }
            if($piWeightUrgency.val()===""){
                $piWeightUrgency.val("0.09")
            }else{
                if(Number($piWeightUrgency.val())<0.05 || Number($piWeightUrgency.val())>0.15){
                    alertCaution("지체도 가중치가 초과했습니다.<br>0.05 ~ 0.15 사이로 입력해주세요.",1);
                    return false;
                }
            }
            if($piWeightGoal.val()===""){
                $piWeightGoal.val("0.18")
            }else{
                if(Number($piWeightGoal.val())<0.1 || Number($piWeightGoal.val())>0.3){
                    alertCaution("목표달성도 가중치가 초과했습니다.<br>0.1 ~ 0.3 사이로 입력해주세요.",1);
                    return false;
                }
            }


            if($piWeightSafeUtility.val()===""){
                $piWeightSafeUtility.val("0.52")
            }else{
                if(Number($piWeightSafeUtility.val())<0.41 || Number($piWeightSafeUtility.val())>0.65){
                    alertCaution("안전효용 개선 가중치가 초과했습니다.<br>0.41 ~ 0.65 사이로 입력해주세요.",1);
                    return false;
                }
            }
            if($piWeightCostUtility.val()===""){
                $piWeightCostUtility.val("0.48")
            }else{
                if(Number($piWeightCostUtility.val())<0.36 || Number($piWeightCostUtility.val())>0.58){
                    alertCaution("자산가치 개선 가중치가 초과했습니다.<br>0.36 ~ 0.58 사이로 입력해주세요.",1);
                    return false;
                }
            }


            if($piWeightBusiness.val()===""){
                $piWeightBusiness.val("0.54")
            }else{
                if(Number($piWeightBusiness.val())<0.43 || Number($piWeightBusiness.val())>0.66){
                    alertCaution("사업추진 타당성 가중치가 초과했습니다.<br>0.43 ~ 0.66 사이로 입력해주세요.",1);
                    return false;
                }
            }
            if($piWeightComplaint.val()===""){
                $piWeightComplaint.val("0.25")
            }else{
                if(Number($piWeightComplaint.val())<0.16 || Number($piWeightComplaint.val())>0.35){
                    alertCaution("민원및사고 대응성 가중치가 초과했습니다.<br>0.16 ~ 0.35 사이로 입력해주세요.",1);
                    return false;
                }
            }
            if($piWeightBusinessEffect.val()===""){
                $piWeightBusinessEffect.val("0.21")
            }else{
                if(Number($piWeightBusinessEffect.val())<0.1 || Number($piWeightBusinessEffect.val())>0.29){
                    alertCaution("사업효과 범용성 가중치가 초과했습니다.<br>0.1 ~ 0.29 사이로 입력해주세요.",1);
                    return false;
                }
            }


        }else if($weight_Category.val()==="기준변화") {

            if($piWeightTechnicality.val()===""){
                $piWeightTechnicality.val("0.24")
            }else{
                if(Number($piWeightTechnicality.val())<0.17 || Number($piWeightTechnicality.val())>0.3){
                    alertCaution("상단의 기술성 가중치가 초과했습니다.<br>0.17 ~ 0.3 사이로 입력해주세요.",1);
                    return false;
                }
            }
            if($piWeightEconomy.val()===""){
                $piWeightEconomy.val("0.48")
            }else{
                if(Number($piWeightEconomy.val())<0.36 || Number($piWeightEconomy.val())>0.58){
                    alertCaution("상단의 경제성 가중치가 초과했습니다.<br>0.36 ~ 0.58 사이로 입력해주세요.",1);
                    return false;
                }
            }
            if($piWeightPolicy.val()===""){
                $piWeightPolicy.val("0.28")
            }else{
                if(Number($piWeightPolicy.val())<0.17 || Number($piWeightPolicy.val())>0.39){
                    alertCaution("상단의 정책성 가중치가 초과했습니다.<br>0.07 ~ 0.2 사이로 입력해주세요.",1);
                    return false;
                }
            }

            if($piWeightSafe.val()===""){
                $piWeightSafe.val("0.73")
            }else{
                if(Number($piWeightSafe.val())<0.61 || Number($piWeightSafe.val())>0.97){
                    alertCaution("안전성 가중치가 초과했습니다.<br>0.61 ~ 0.97 사이로 입력해주세요.",1);
                    return false;
                }
            }
            if($piWeightOld.val()===""){
                $piWeightOld.val("0.27")
            }else{
                if(Number($piWeightOld.val())<0.16 || Number($piWeightOld.val())>0.41){
                    alertCaution("노후도 가중치가 초과했습니다.<br>0.16 ~ 0.41 사이로 입력해주세요.",1);
                    return false;
                }
            }
            $piWeightUsability.val("0");
            $piWeightUrgency.val("0");
            $piWeightGoal.val("0");

            if($piWeightSafeUtility.val()===""){
                $piWeightSafeUtility.val("0.48")
            }else{
                if(Number($piWeightSafeUtility.val())<0.36 || Number($piWeightSafeUtility.val())>0.58){
                    alertCaution("사업규모 등급 가중치가 초과했습니다.<br>0.36 ~ 0.58 사이로 입력해주세요.",1);
                    return false;
                }
            }
            if($piWeightCostUtility.val()===""){
                $piWeightCostUtility.val("0.52")
            }else{
                if(Number($piWeightCostUtility.val())<0.41 || Number($piWeightCostUtility.val())>0.65){
                    alertCaution("사업효율 등급 가중치가 초과했습니다.<br>0.41 ~ 0.65 사이로 입력해주세요.",1);
                    return false;
                }
            }

            if($piWeightBusiness.val()===""){
                $piWeightBusiness.val("0.72")
            }else{
                if(Number($piWeightBusiness.val())<0.57 || Number($piWeightBusiness.val())>0.88){
                    alertCaution("사업추진 타당성 가중치가 초과했습니다.<br>0.57 ~ 0.88 사이로 입력해주세요.",1);
                    return false;
                }
            }
            $piWeightComplaint.val("0")
            if($piWeightBusinessEffect.val()===""){
                $piWeightBusinessEffect.val("0.28")
            }else{
                if(Number($piWeightBusinessEffect.val())<0.13 || Number($piWeightBusinessEffect.val())>0.39){
                    alertCaution("사업효과 범용성 가중치가 초과했습니다.<br>0.13 ~ 0.39 사이로 입력해주세요.",1);
                    return false;
                }
            }

        }else if($weight_Category.val()==="사용성변화") {

            if($piWeightTechnicality.val()===""){
                $piWeightTechnicality.val("0.19")
            }else{
                if(Number($piWeightTechnicality.val())<0.12 || Number($piWeightTechnicality.val())>0.29){
                    alertCaution("상단의 기술성 가중치가 초과했습니다.<br>0.12 ~ 0.29 사이로 입력해주세요.",1);
                    return false;
                }
            }
            if($piWeightEconomy.val()===""){
                $piWeightEconomy.val("0.39")
            }else{
                if(Number($piWeightEconomy.val())<0.24 || Number($piWeightEconomy.val())>0.47){
                    alertCaution("상단의 경제성 가중치가 초과했습니다.<br>0.24 ~ 0.47 사이로 입력해주세요.",1);
                    return false;
                }
            }
            if($piWeightPolicy.val()===""){
                $piWeightPolicy.val("0.42")
            }else{
                if(Number($piWeightPolicy.val())<0.32 || Number($piWeightPolicy.val())>0.5){
                    alertCaution("상단의 정책성 가중치가 초과했습니다.<br>0.32 ~ 0.5 사이로 입력해주세요.",1);
                    return false;
                }
            }

            if($piWeightSafe.val()===""){
                $piWeightSafe.val("0.62")
            }else{
                if(Number($piWeightSafe.val())<0.51 || Number($piWeightSafe.val())>0.82){
                    alertCaution("안전성 가중치가 초과했습니다.<br>0.51 ~ 0.82 사이로 입력해주세요.",1);
                    return false;
                }
            }
            if($piWeightUsability.val()===""){
                $piWeightUsability.val("0.16")
            }else{
                if(Number($piWeightUsability.val())<0.08 || Number($piWeightUsability.val())>0.24){
                    alertCaution("사용성 가중치가 초과했습니다.<br>0.08 ~ 0.24 사이로 입력해주세요.",1);
                    return false;
                }
            }
            if($piWeightOld.val()===""){
                $piWeightOld.val("0.22")
            }else{
                if(Number($piWeightOld.val())<0.13 || Number($piWeightOld.val())>0.34){
                    alertCaution("노후도 가중치가 초과했습니다.<br>0.13 ~ 0.34 사이로 입력해주세요.",1);
                    return false;
                }
            }
            $piWeightUrgency.val("0");
            $piWeightGoal.val("0");

            if($piWeightSafeUtility.val()===""){
                $piWeightSafeUtility.val("0.48")
            }else{
                if(Number($piWeightSafeUtility.val())<0.36 || Number($piWeightSafeUtility.val())>0.58){
                    alertCaution("사업규모 등급 가중치가 초과했습니다.<br>0.36 ~ 0.58 사이로 입력해주세요.",1);
                    return false;
                }
            }
            if($piWeightCostUtility.val()===""){
                $piWeightCostUtility.val("0.52")
            }else{
                if(Number($piWeightCostUtility.val())<0.41 || Number($piWeightCostUtility.val())>0.65){
                    alertCaution("사업효율 등급 가중치가 초과했습니다.<br>0.41 ~ 0.65 사이로 입력해주세요.",1);
                    return false;
                }
            }


            if($piWeightBusiness.val()===""){
                $piWeightBusiness.val("0.54")
            }else{
                if(Number($piWeightBusiness.val())<0.43 || Number($piWeightBusiness.val())>0.66){
                    alertCaution("사업추진 타당성 가중치가 초과했습니다.<br>0.43 ~ 0.66 사이로 입력해주세요.",1);
                    return false;
                }
            }
            if($piWeightComplaint.val()===""){
                $piWeightComplaint.val("0.25")
            }else{
                if(Number($piWeightComplaint.val())<0.16 || Number($piWeightComplaint.val())>0.35){
                    alertCaution("민원및사고 대응성 가중치가 초과했습니다.<br>0.16 ~ 0.35 사이로 입력해주세요.",1);
                    return false;
                }
            }
            if($piWeightBusinessEffect.val()===""){
                $piWeightBusinessEffect.val("0.21")
            }else{
                if(Number($piWeightBusinessEffect.val())<0.1 || Number($piWeightBusinessEffect.val())>0.29){
                    alertCaution("사업효과 범용성 가중치가 초과했습니다.<br>0.1 ~ 0.29 사이로 입력해주세요.",1);
                    return false;
                }
            }

        }else{
            alertCaution("성능개선 유형을 선택해주세요.",1)
            return false;
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
                console.log("status : " + status);
                if (status === 200) {
                    $("#excelfile").val('');
                    $('.c-file__input').val('');
                    console.log("엑셀 데이터 전송 성공");
                    console.log("autoNum : "+request.sendData.autoNum)
                    $piWeightTechnicality.val("");
                    $piWeightEconomy.val("");
                    $piWeightPolicy.val("");

                    $piWeightSafe.val("");
                    $piWeightUsability.val("");
                    $piWeightOld.val("");
                    $piWeightUrgency.val("");
                    $piWeightGoal.val("");

                    $piWeightSafeUtility.val("");
                    $piWeightCostUtility.val("");

                    $piWeightBusiness.val("");
                    $piWeightComplaint.val("");
                    $piWeightBusinessEffect.val("");
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

    // console.log("사업평가정보 함수호추 ");
    // console.log("autoNum : "+autoNum);

    if(autoNum==null){
        location.href="/404";
    }

    JWT_Get();

    let url;

    if (accessToken == null && refreshToken == null && insert_id == null) {
        // console.log("callinfo(userid)함수 : 토큰&리플레시&로그인한아이디 Null");
        alertCaution("토큰이 만료되었습니다.<BR>다시 로그인해주세요.", 2);
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
                    // console.log("아웃풋 성공");

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
                        html += '<td>'+pushComma(request.sendData.performanceList[j].piErectionCost)+'</td>';
                    }
                    html += '</tr>';

                    html += '<tr>';
                    html += '<th>'+'안전등급'+'</th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html += '<td>'+request.sendData.performanceList[j].piSafetyLevel+'</td>';
                    }
                    html += '</tr>';

                    if(request.sendData.typeName==="교량" || request.sendData.typeName==="터널" ){
                        html += '<tr>';
                        html += '<th>'+'사용성등급'+'</th>';
                        for(let j=0; j<request.sendData.performanceSize; j++){
                            html += '<td>'+request.sendData.performanceList[j].piUsabilityLevel+'</td>';
                        }
                        html += '</tr>';
                    }else{
                        html += '<tr>';
                        html += '<th>'+'사용성등급'+'</th>';
                        html += '<td>'+'-'+'</td>';
                        html += '</tr>';
                    }

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
                            html2 += '<td>'+pushComma(request.sendData.performanceList[j].piAADT)+'</td>';
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
                    html3 += '<th>'+'사업비용'+'</th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html3 += '<td>'+pushComma(request.sendData.performanceList[j].piBusinessExpenses)+'</td>';
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
                        if(request.sendData.performanceList[j].piBusinessObligatory===0){
                            html4 += '<td>'+'해당없음'+'</td>';
                        }else{
                            html4 += '<td>'+'해당'+'</td>';
                        }
                    }
                    html4 += '</tr>';

                    html4 += '<tr>';
                    html4 += '<th>'+'법정계획에 따른 의무사업'+'</th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        if(request.sendData.performanceList[j].piBusinessMandatory===0){
                            html4 += '<td>'+'해당없음'+'</td>';
                        }else{
                            html4 += '<td>'+'해당'+'</td>';
                        }
                    }
                    html4 += '</tr>';

                    html4 += '<tr>';
                    html4 += '<th>'+'자제계획/의결에 따른 사업'+'</th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        if(request.sendData.performanceList[j].piBusinessPlanned===0){
                            html4 += '<td>'+'해당없음'+'</td>';
                        }else{
                            html4 += '<td>'+'해당'+'</td>';
                        }
                    }
                    html4 += '</tr>';

                    html4 += '<tr>';
                    html4 += '<th>'+'최근 1년 간 민원 및 사고발생 건수'+'</th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html4 += '<td>'+request.sendData.performanceList[j].piWhether+'건'+'</td>';
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
                    html6 += '<td>'+'0.65'+'</td>';
                    html6 += '</tr>';

                    if(request.sendData.typeName==="교량" || request.sendData.typeName==="터널" ){
                        html6 += '<tr>';
                        html6 += '<th>'+'사용성'+'</th>';
                        html6 += '<td>'+request.sendData.weightList.piWeightUsability+'</td>';
                        html6 += '<td>'+'0.05'+'</td>';
                        html6 += '</tr>';
                    }else{
                        html6 += '<tr>';
                        html6 += '<th>'+'사용성'+'</th>';
                        html6 += '<td>'+'-'+'</td>';
                        html6 += '<td>'+'-'+'</td>';
                        html6 += '</tr>';
                    }

                    html6 += '<tr>';
                    html6 += '<th>'+'노후도'+'</th>';
                    html6 += '<td>'+request.sendData.weightList.piWeightOld+'</td>';
                    html6 += '<td>'+'0.2'+'</td>';
                    html6 += '</tr>';

                    html6 += '<tr>';
                    html6 += '<th>'+'지체도'+'</th>';
                    html6 += '<td>'+request.sendData.weightList.piWeightUrgency+'</td>';
                    html6 += '<td>'+'0.05'+'</td>';
                    html6 += '</tr>';

                    html6 += '<tr>';
                    html6 += '<th>'+'목표달성도'+'</th>';
                    html6 += '<td>'+request.sendData.weightList.piWeightGoal+'</td>';
                    html6 += '<td>'+'0.05'+'</td>';
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
                    html8 += '<td>'+'0.2'+'</td>';
                    html8 += '</tr>';

                    html8 += '<tr>';
                    html8 += '<th>'+'자산가치 개선 효율성'+'</th>';
                    html8 += '<td>'+request.sendData.weightList.piWeightBusinessEffect+'</td>';
                    html8 += '<td>'+'0.1'+'</td>';
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

                    if(request.sendData.typeName==="교량" || request.sendData.typeName==="터널" ){
                        html9 += '<tr>';
                        html9 += '<th>'+'사용성'+'</th>';
                        for(let j=0; j<request.sendData.performanceSize; j++){
                            html9 += '<td>'+request.sendData.technicalityRank[j][1]+" / "+request.sendData.technicalityScore[j][1]+'</td>';
                        }
                        html9 += '</tr>';

                        html9 += '<tr>';
                        html9 += '<th>'+'노후도'+'</th>';
                        for(let j=0; j<request.sendData.performanceSize; j++){
                            html9 += '<td>'+request.sendData.technicalityRank[j][2]+" / "+request.sendData.technicalityScore[j][2]+'</td>';
                        }
                        html9 += '</tr>';

                        html9 += '<tr>';
                        html9 += '<th>'+'시급성'+'</th>';
                        for(let j=0; j<request.sendData.performanceSize; j++){
                            html9 += '<td>'+request.sendData.technicalityRank[j][3]+" / "+request.sendData.technicalityScore[j][3]+'</td>';
                        }
                        html9 += '</tr>';

                        html9 += '<tr>';
                        html9 += '<th>'+'목표성능 달성도'+'</th>';
                        for(let j=0; j<request.sendData.performanceSize; j++){
                            html9 += '<td>'+request.sendData.technicalityRank[j][4]+" / "+request.sendData.technicalityScore[j][4]+'</td>';
                        }
                        html9 += '</tr>';

                        html9 += '<tr>';
                        html9 += '<th style="color: red">'+'기술성 종합점수'+'</th>';
                        for(let j=0; j<request.sendData.performanceSize; j++){
                            html9 += '<td style="color: red">'+request.sendData.technicalityRank[j][5]+" / "+request.sendData.technicalityScore[j][5]+'</td>';
                        }
                        html9 += '</tr>';
                    }else{
                        html9 += '<tr>';
                        html9 += '<th>'+'사용성'+'</th>';
                        html9 += '<td>'+'-'+'</td>';
                        html9 += '<td>'+'-'+'</td>';
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
                    }

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
                        html12 += '<td style="color: red">'+request.sendData.allRankMap[j][0]+'</td>';
                    }
                    html12 += '</tr>';

                    html12 += '<tr>';
                    html12 += '<th style="color: red">'+'사업대안별 종합점수'+'</th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html12 += '<td style="color: red">'+request.sendData.allScroeMap[j][0]+'</td>';
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
                        if(request.sendData.allGreate[j]===undefined){
                            html12 += '<td style="color: red">'+'-'+'</td>';
                        }else{
                            html12 += '<td style="color: red">'+request.sendData.allGreate[j]+'</td>';
                        }
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

// 조회
function callList(page){
    JWT_Get();

    if (accessToken == null && refreshToken == null && insert_id == null) {
        alertCaution("토큰이 만료되었습니다.<BR>다시 로그인해주세요.", 2);
    }else {

        console.log("성능개선사업평가 조회");

        page = page - 1;
        if (page < 0) page = 0

        const perPage = 10;
        const perArea = 5;
        let totCnt = 0;

        const $tablePerformanceList = $('#tablePerformanceList');
        const $totalCnt = $('#totalCnt');

        const params = {
            piFacilityType : $("#piFacilityType").val(),
            piKind : $("#piKind").val(),
            piFacilityName : $("#piFacilityName").val()
        };

        $tablePerformanceList.empty().append('<tr ><td colspan="11" align="center">조회 중</td></tr>');
        $totalCnt.text('0');

        let url = $("#backend_protocol").val() + "://" + $("#backend_url").val() + "/api/performance/list"; // 호출할 백엔드 API
        console.log("url : "+url);
        $.ajax({
            url: url + '?size=' + perPage + '&page=' + page,
            type: 'Get',
            data: params,
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
            success: function (res) {
                console.log("성능개선사업평가 등록 글 출력");
                if (res.status === 200) {
                    //화면 출력
                    totCnt = res.total_rows;
                    $("#performancePaging").jqueryPager({
                        pageSize: perPage,
                        pageBlock: perArea,
                        currentPage: page + 1,
                        pageTotal: totCnt,
                        clickEvent: 'callList'
                    });

                    if (totCnt === 0) {
                        $tablePerformanceList.empty().append('<tr class="t-c"><td colspan="11" align="center">조회된 데이터가 없습니다.</td></tr>');
                        return;
                    }

                    $totalCnt.text(totCnt);
                    let html = '';
                    $.each(res.datalist, function (key, value) {
                        html += '<tr>';
                        html += '<td >'+ '<input type="checkbox" value='+echoNull2Blank(value.piAutoNum)+' />' +'</td>';
                        html += '<td >' + echoNull2Blank(value.piFacilityType) + '</td>';
                        html += '<td >' + echoNull2Blank(value.piFacilityName) + '</td>';
                        html += '<td >' + echoNull2Blank(value.piCompletionYear) + '</td>';
                        html += '<td >' + pushComma(echoNull2Blank(value.piErectionCost)) + '</td>';
                        html += '<td >' + echoNull2Blank(value.piSafetyLevel) + '</td>';
                        html += '<td >' + echoNull2Blank(value.piGoalLevel) + '</td>';
                        html += '<td >' + echoNull2Blank(value.piBusinessType) + '</td>';
                        html += '<td >' + pushComma(echoNull2Blank(value.piBusinessExpenses)) + '</td>';
                        html += '<td ><button class="c-button" onclick="outputMove(\'' + echoNull2Blank(value.piAutoNum) + '\');">비교대안 보기</button></td>';
                        html += '<td ><button class="c-button" onclick="del(\'' + echoNull2Blank(value.piAutoNum) + '\');">삭제</button></td>';
                        html += '</tr>';
                    });
                    $tablePerformanceList.html(html);
                }
            }
        });
    }
}

// 아웃풋페이지 이동
function outputMove(autoNum){
    location.href = "/performance/output/" + autoNum;
}

// 대안 리스트에서 삭제
function del(autoNum){
    JWT_Get();

    if (accessToken == null && refreshToken == null && insert_id == null) {
        alertCaution("토큰이 만료되었습니다.<BR>다시 로그인해주세요.", 2);
    } else {

        console.log("autoNum : "+autoNum);

        let url;
        url = $("#backend_protocol").val() + "://" + $("#backend_url").val() + "/api/performance/del"; // 호출할 백엔드 API
        console.log("url : "+url);

        const params = {
            autoNum : autoNum
        }

        $.ajax({
            url: url,
            type: 'post',
            data:params,
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
            success: function (res) {
                console.log("리스트출력");
                if (res.status === 200) {
                    alertSuccess("삭제가 완료되었습니다.");
                    callList(1);
                }
            }
        });
    }
}


