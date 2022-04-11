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
    // const excelfile = $("#excelfile").val();
    // if (excelfile === "" || excelfile == null) {
    //     //파일이 선택되지 않은 경우
    //     alertCaution("파일을 선택해주세요.",1);
    //     return false;
    // } else if (!checkFileType(excelfile)) {
    //     //checkFileType 에서 Excel 확장자가 아닌경우
    //     alertCaution("엑셀파일이 아닙니다.",1);
    //     return false;
    // }else{
        performanceCheck();
    // }
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

function performanceCheck(){
    const $weight_Category = $("#weight_Category");
    console.log("선택한 유형 : "+$weight_Category.val());
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
                alertYesNo("상단의 기술성 가중치가 초과했습니다.<br>0.52 ~ 0.79 사이로 입력해주세요.<br>그래도 평가를 진행하시겠습니까?");
                return false;
            }
        }
        if($piWeightEconomy.val()===""){
            $piWeightEconomy.val("0.2")
        }else{
            if(Number($piWeightEconomy.val())<0.15 || Number($piWeightEconomy.val())>0.29){
                alertYesNo("상단의 경제성 가중치가 초과했습니다.<br>0.15 ~ 0.29 사이로 입력해주세요.<br>그래도 평가를 진행하시겠습니까?");
                return false;
            }
        }
        if($piWeightPolicy.val()===""){
            $piWeightPolicy.val("0.14")
        }else{
            if(Number($piWeightPolicy.val())<0.07 || Number($piWeightPolicy.val())>0.2){
                alertYesNo("상단의 정책성 가중치가 초과했습니다.<br>0.07 ~ 0.2 사이로 입력해주세요.<br>그래도 평가를 진행하시겠습니까?");
                return false;
            }
        }

        $piWeightUsability.val("0");

        if($piWeightSafe.val()===""){
            $piWeightSafe.val("0.53")
        }else{
            if(Number($piWeightSafe.val())<0.44 || Number($piWeightSafe.val())>0.7){
                alertYesNo("안전성 가중치가 초과했습니다.<br>0.44 ~ 0.7 사이로 입력해주세요.<br>그래도 평가를 진행하시겠습니까?");
                return false;
            }
        }
        if($piWeightOld.val()===""){
            $piWeightOld.val("0.2")
        }else{
            if(Number($piWeightOld.val())<0.11 || Number($piWeightOld.val())>0.3){
                alertYesNo("노후도 가중치가 초과했습니다.<br>0.11 ~ 0.3 사이로 입력해주세요.<br>그래도 평가를 진행하시겠습니까?");
                return false;
            }
        }
        if($piWeightUrgency.val()===""){
            $piWeightUrgency.val("0.09")
        }else{
            if(Number($piWeightUrgency.val())<0.05 || Number($piWeightUrgency.val())>0.15){
                alertYesNo("지체도 가중치가 초과했습니다.<br>0.05 ~ 0.15 사이로 입력해주세요.<br>그래도 평가를 진행하시겠습니까?");
                return false;
            }
        }
        if($piWeightGoal.val()===""){
            $piWeightGoal.val("0.18")
        }else{
            if(Number($piWeightGoal.val())<0.1 || Number($piWeightGoal.val())>0.3){
                alertYesNo("목표달성도 가중치가 초과했습니다.<br>0.1 ~ 0.3 사이로 입력해주세요.<br>그래도 평가를 진행하시겠습니까?");
                return false;
            }
        }

        if($piWeightSafeUtility.val()===""){
            $piWeightSafeUtility.val("0.52")
        }else{
            if(Number($piWeightSafeUtility.val())<0.41 || Number($piWeightSafeUtility.val())>0.65){
                alertYesNo("안전효용 개선 가중치가 초과했습니다.<br>0.41 ~ 0.65 사이로 입력해주세요.<br>그래도 평가를 진행하시겠습니까?");
                return false;
            }
        }
        if($piWeightCostUtility.val()===""){
            $piWeightCostUtility.val("0.48")
        }else{
            if(Number($piWeightCostUtility.val())<0.36 || Number($piWeightCostUtility.val())>0.58){
                alertYesNo("자산가치 개선 가중치가 초과했습니다.<br>0.36 ~ 0.58 사이로 입력해주세요.<br>그래도 평가를 진행하시겠습니까?");
                return false;
            }
        }


        if($piWeightBusiness.val()===""){
            $piWeightBusiness.val("0.54")
        }else{
            if(Number($piWeightBusiness.val())<0.43 || Number($piWeightBusiness.val())>0.66){
                alertYesNo("사업추진 타당성 가중치가 초과했습니다.<br>0.43 ~ 0.66 사이로 입력해주세요.<br>그래도 평가를 진행하시겠습니까?");
                return false;
            }
        }
        if($piWeightComplaint.val()===""){
            $piWeightComplaint.val("0.25")
        }else{
            if(Number($piWeightComplaint.val())<0.16 || Number($piWeightComplaint.val())>0.35){
                alertYesNo("민원및사고 대응성 가중치가 초과했습니다.<br>0.16 ~ 0.35 사이로 입력해주세요.<br>그래도 평가를 진행하시겠습니까?");
                return false;
            }
        }
        if($piWeightBusinessEffect.val()===""){
            $piWeightBusinessEffect.val("0.21")
        }else{
            if(Number($piWeightBusinessEffect.val())<0.1 || Number($piWeightBusinessEffect.val())>0.29){
                alertYesNo("사업효과 범용성 가중치가 초과했습니다.<br>0.1 ~ 0.29 사이로 입력해주세요.<br>그래도 평가를 진행하시겠습니까?");
                return false;
            }
        }


    }else if($weight_Category.val()==="기준변화") {

        if($piWeightTechnicality.val()===""){
            $piWeightTechnicality.val("0.24")
        }else{
            if(Number($piWeightTechnicality.val())<0.17 || Number($piWeightTechnicality.val())>0.3){
                alertYesNo("상단의 기술성 가중치가 초과했습니다.<br>0.17 ~ 0.3 사이로 입력해주세요.<br>그래도 평가를 진행하시겠습니까?");
                return false;
            }
        }
        if($piWeightEconomy.val()===""){
            $piWeightEconomy.val("0.48")
        }else{
            if(Number($piWeightEconomy.val())<0.36 || Number($piWeightEconomy.val())>0.58){
                alertYesNo("상단의 경제성 가중치가 초과했습니다.<br>0.36 ~ 0.58 사이로 입력해주세요.<br>그래도 평가를 진행하시겠습니까?");
                return false;
            }
        }
        if($piWeightPolicy.val()===""){
            $piWeightPolicy.val("0.28")
        }else{
            if(Number($piWeightPolicy.val())<0.17 || Number($piWeightPolicy.val())>0.39){
                alertYesNo("상단의 정책성 가중치가 초과했습니다.<br>0.07 ~ 0.2 사이로 입력해주세요.<br>그래도 평가를 진행하시겠습니까?");
                return false;
            }
        }

        if($piWeightSafe.val()===""){
            $piWeightSafe.val("0.73")
        }else{
            if(Number($piWeightSafe.val())<0.61 || Number($piWeightSafe.val())>0.97){
                alertYesNo("안전성 가중치가 초과했습니다.<br>0.61 ~ 0.97 사이로 입력해주세요.<br>그래도 평가를 진행하시겠습니까?");
                return false;
            }
        }
        if($piWeightOld.val()===""){
            $piWeightOld.val("0.27")
        }else{
            if(Number($piWeightOld.val())<0.16 || Number($piWeightOld.val())>0.41){
                alertYesNo("노후도 가중치가 초과했습니다.<br>0.16 ~ 0.41 사이로 입력해주세요.<br>그래도 평가를 진행하시겠습니까?");
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
                alertYesNo("사업규모 등급 가중치가 초과했습니다.<br>0.36 ~ 0.58 사이로 입력해주세요.<br>그래도 평가를 진행하시겠습니까?");
                return false;
            }
        }
        if($piWeightCostUtility.val()===""){
            $piWeightCostUtility.val("0.52")
        }else{
            if(Number($piWeightCostUtility.val())<0.41 || Number($piWeightCostUtility.val())>0.65){
                alertYesNo("사업효율 등급 가중치가 초과했습니다.<br>0.41 ~ 0.65 사이로 입력해주세요.<br>그래도 평가를 진행하시겠습니까?");
                return false;
            }
        }

        if($piWeightBusiness.val()===""){
            $piWeightBusiness.val("0.72")
        }else{
            if(Number($piWeightBusiness.val())<0.57 || Number($piWeightBusiness.val())>0.88){
                alertYesNo("사업추진 타당성 가중치가 초과했습니다.<br>0.57 ~ 0.88 사이로 입력해주세요.<br>그래도 평가를 진행하시겠습니까?");
                return false;
            }
        }
        $piWeightComplaint.val("0")
        if($piWeightBusinessEffect.val()===""){
            $piWeightBusinessEffect.val("0.28")
        }else{
            if(Number($piWeightBusinessEffect.val())<0.13 || Number($piWeightBusinessEffect.val())>0.39){
                alertYesNo("사업효과 범용성 가중치가 초과했습니다.<br>0.13 ~ 0.39 사이로 입력해주세요.<br>그래도 평가를 진행하시겠습니까?");
                return false;
            }
        }

    }else if($weight_Category.val()==="사용성변화") {

        if($piWeightTechnicality.val()===""){
            $piWeightTechnicality.val("0.19")
        }else{
            if(Number($piWeightTechnicality.val())<0.12 || Number($piWeightTechnicality.val())>0.29){
                alertYesNo("상단의 기술성 가중치가 초과했습니다.<br>0.12 ~ 0.29 사이로 입력해주세요.<br>그래도 평가를 진행하시겠습니까?");
                return false;
            }
        }
        if($piWeightEconomy.val()===""){
            $piWeightEconomy.val("0.39")
        }else{
            if(Number($piWeightEconomy.val())<0.24 || Number($piWeightEconomy.val())>0.47){
                alertYesNo("상단의 경제성 가중치가 초과했습니다.<br>0.24 ~ 0.47 사이로 입력해주세요.<br>그래도 평가를 진행하시겠습니까?");
                return false;
            }
        }
        if($piWeightPolicy.val()===""){
            $piWeightPolicy.val("0.42")
        }else{
            if(Number($piWeightPolicy.val())<0.32 || Number($piWeightPolicy.val())>0.5){
                alertYesNo("상단의 정책성 가중치가 초과했습니다.<br>0.32 ~ 0.5 사이로 입력해주세요.<br>그래도 평가를 진행하시겠습니까?");
                return false;
            }
        }

        if($piWeightSafe.val()===""){
            $piWeightSafe.val("0.62")
        }else{
            if(Number($piWeightSafe.val())<0.51 || Number($piWeightSafe.val())>0.82){
                alertYesNo("안전성 가중치가 초과했습니다.<br>0.51 ~ 0.82 사이로 입력해주세요.<br>그래도 평가를 진행하시겠습니까?");
                return false;
            }
        }
        if($piWeightUsability.val()===""){
            $piWeightUsability.val("0.16")
        }else{
            if(Number($piWeightUsability.val())<0.08 || Number($piWeightUsability.val())>0.24){
                alertYesNo("사용성 가중치가 초과했습니다.<br>0.08 ~ 0.24 사이로 입력해주세요.<br>그래도 평가를 진행하시겠습니까?");
                return false;
            }
        }
        if($piWeightOld.val()===""){
            $piWeightOld.val("0.22")
        }else{
            if(Number($piWeightOld.val())<0.13 || Number($piWeightOld.val())>0.34){
                alertYesNo("노후도 가중치가 초과했습니다.<br>0.13 ~ 0.34 사이로 입력해주세요.<br>그래도 평가를 진행하시겠습니까?");
                return false;
            }
        }
        $piWeightUrgency.val("0");
        $piWeightGoal.val("0");

        if($piWeightSafeUtility.val()===""){
            $piWeightSafeUtility.val("0.48")
        }else{
            if(Number($piWeightSafeUtility.val())<0.36 || Number($piWeightSafeUtility.val())>0.58){
                alertYesNo("사업규모 등급 가중치가 초과했습니다.<br>0.36 ~ 0.58 사이로 입력해주세요.<br>그래도 평가를 진행하시겠습니까?");
                return false;
            }
        }
        if($piWeightCostUtility.val()===""){
            $piWeightCostUtility.val("0.52")
        }else{
            if(Number($piWeightCostUtility.val())<0.41 || Number($piWeightCostUtility.val())>0.65){
                alertYesNo("사업효율 등급 가중치가 초과했습니다.<br>0.41 ~ 0.65 사이로 입력해주세요.<br>그래도 평가를 진행하시겠습니까?");
                return false;
            }
        }


        if($piWeightBusiness.val()===""){
            $piWeightBusiness.val("0.54")
        }else{
            if(Number($piWeightBusiness.val())<0.43 || Number($piWeightBusiness.val())>0.66){
                alertYesNo("사업추진 타당성 가중치가 초과했습니다.<br>0.43 ~ 0.66 사이로 입력해주세요.<br>그래도 평가를 진행하시겠습니까?");
                return false;
            }
        }
        if($piWeightComplaint.val()===""){
            $piWeightComplaint.val("0.25")
        }else{
            if(Number($piWeightComplaint.val())<0.16 || Number($piWeightComplaint.val())>0.35){
                alertYesNo("민원및사고 대응성 가중치가 초과했습니다.<br>0.16 ~ 0.35 사이로 입력해주세요.<br>그래도 평가를 진행하시겠습니까?");
                return false;
            }
        }
        if($piWeightBusinessEffect.val()===""){
            $piWeightBusinessEffect.val("0.21")
        }else{
            if(Number($piWeightBusinessEffect.val())<0.1 || Number($piWeightBusinessEffect.val())>0.29){
                alertYesNo("사업효과 범용성 가중치가 초과했습니다.<br>0.1 ~ 0.29 사이로 입력해주세요.<br>그래도 평가를 진행하시겠습니까?");
                return false;
            }
        }

    }else{
        alertCaution("성능개선 유형을 선택해주세요.",1)
    }

    excelSend();

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

        const $piWeightTechnicality = $("#piWeightTechnicality");
        const $piWeightEconomy = $("#piWeightEconomy");
        const $piWeightPolicy = $("#piWeightPolicy");
        console.log("기술성 : "+$piWeightTechnicality.val());
        console.log("경제성 : "+$piWeightEconomy.val());
        console.log("정책성 : "+$piWeightPolicy.val());

        const result =parseFloat($piWeightTechnicality.val())+parseFloat($piWeightEconomy.val())+parseFloat($piWeightPolicy.val());
        console.log("가중치 합 : "+result);

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

// 성능개선사업평가 아웃풋 계산값 셋팅 저장함수
// 기술성
function techSettingSave(){

    JWT_Get();

    let url;

    if (accessToken == null && refreshToken == null && insert_id == null) {
        // console.log("callinfo(userid)함수 : 토큰&리플레시&로그인한아이디 Null");
        alertCaution("토큰이 만료되었습니다.<BR>다시 로그인해주세요.", 2);
    } else {

        const $piTechSafetyAe = $("#piTechSafetyAe");
        const $piTechSafetyBd = $("#piTechSafetyBd");
        const $piTechSafetyCc = $("#piTechSafetyCc");
        const $piTechSafetyDb = $("#piTechSafetyDb");
        const $piTechSafetyEa = $("#piTechSafetyEa");
        if($piTechSafetyAe.val()===""){
            $piTechSafetyAe.val("100")
        }
        if($piTechSafetyBd.val()===""){
            $piTechSafetyBd.val("80")
        }
        if($piTechSafetyCc.val()===""){
            $piTechSafetyCc.val("60")
        }
        if($piTechSafetyDb.val()===""){
            $piTechSafetyDb.val("20")
        }
        if($piTechSafetyEa.val()===""){
            $piTechSafetyEa.val("0")
        }

        const $piTechOldAMin = $("#piTechOldAMin");
        const $piTechOldAScore = $("#piTechOldAScore");
        const $piTechOldBMin = $("#piTechOldBMin");
        const $piTechOldBMax = $("#piTechOldBMax");
        const $piTechOldBScore = $("#piTechOldBScore");
        const $piTechOldCMin = $("#piTechOldCMin");
        const $piTechOldCMax = $("#piTechOldCMax");
        const $piTechOldCScore = $("#piTechOldCScore");
        const $piTechOldDMin = $("#piTechOldDMin");
        const $piTechOldDMax = $("#piTechOldDMax");
        const $piTechOldDScore = $("#piTechOldDScore");
        const $piTechOldEMax = $("#piTechOldEMax");
        const $piTechOldEScore = $("#piTechOldEScore");

        if($piTechOldAMin.val()===""){
            $piTechOldAMin.val("50")
        }
        if($piTechOldAScore.val()===""){
            $piTechOldAScore.val("100")
        }
        if($piTechOldBMin.val()===""){
            $piTechOldBMin.val("30")
        }
        if($piTechOldBMax.val()===""){
            $piTechOldBMax.val("49")
        }
        if($piTechOldBScore.val()===""){
            $piTechOldBScore.val("90")
        }
        if($piTechOldCMin.val()===""){
            $piTechOldCMin.val("20")
        }
        if($piTechOldCMax.val()===""){
            $piTechOldCMax.val("29")
        }
        if($piTechOldCScore.val()===""){
            $piTechOldCScore.val("80")
        }
        if($piTechOldDMin.val()===""){
            $piTechOldDMin.val("10")
        }
        if($piTechOldDMax.val()===""){
            $piTechOldDMax.val("19")
        }
        if($piTechOldDScore.val()===""){
            $piTechOldDScore.val("50")
        }
        if($piTechOldEMax.val()===""){
            $piTechOldEMax.val("9")
        }
        if($piTechOldEScore.val()===""){
            $piTechOldEScore.val("0")
        }

        const $piTechUsabilityAe = $("#piTechUsabilityAe");
        const $piTechUsabilityBd = $("#piTechUsabilityBd");
        const $piTechUsabilityCc = $("#piTechUsabilityCc");
        const $piTechUsabilityDb = $("#piTechUsabilityDb");
        const $piTechUsabilityEa = $("#piTechUsabilityEa");
        if($piTechUsabilityAe.val()===""){
            $piTechUsabilityAe.val("100")
        }
        if($piTechUsabilityBd.val()===""){
            $piTechUsabilityBd.val("80")
        }
        if($piTechUsabilityCc.val()===""){
            $piTechUsabilityCc.val("60")
        }
        if($piTechUsabilityDb.val()===""){
            $piTechUsabilityDb.val("20")
        }
        if($piTechUsabilityEa.val()===""){
            $piTechUsabilityEa.val("0")
        }

        const $piTechRetardationA0 = $("#piTechRetardationA0");
        const $piTechRetardationA1 = $("#piTechRetardationA1");
        const $piTechRetardationA2 = $("#piTechRetardationA2");
        const $piTechRetardationA3 = $("#piTechRetardationA3");
        const $piTechRetardationA4 = $("#piTechRetardationA4");
        const $piTechRetardationB0 = $("#piTechRetardationB0");
        const $piTechRetardationB1 = $("#piTechRetardationB1");
        const $piTechRetardationB2 = $("#piTechRetardationB2");
        const $piTechRetardationB3 = $("#piTechRetardationB3");
        const $piTechRetardationB4 = $("#piTechRetardationB4");
        const $piTechRetardationC0 = $("#piTechRetardationC0");
        const $piTechRetardationC1 = $("#piTechRetardationC1");
        const $piTechRetardationC2 = $("#piTechRetardationC2");
        const $piTechRetardationC3 = $("#piTechRetardationC3");
        const $piTechRetardationC4 = $("#piTechRetardationC4");
        const $piTechRetardationD0 = $("#piTechRetardationD0");
        const $piTechRetardationD1 = $("#piTechRetardationD1");
        const $piTechRetardationD2 = $("#piTechRetardationD2");
        const $piTechRetardationD3 = $("#piTechRetardationD3");
        const $piTechRetardationD4 = $("#piTechRetardationD4");
        const $piTechRetardationE0 = $("#piTechRetardationE0");
        const $piTechRetardationE1 = $("#piTechRetardationE1");
        const $piTechRetardationE2 = $("#piTechRetardationE2");
        const $piTechRetardationE3 = $("#piTechRetardationE3");
        const $piTechRetardationE4 = $("#piTechRetardationE4");
        if($piTechRetardationA0.val()===""){
            $piTechRetardationA0.val("0")
        }
        if($piTechRetardationA1.val()===""){
            $piTechRetardationA1.val("0")
        }
        if($piTechRetardationA2.val()===""){
            $piTechRetardationA2.val("0")
        }
        if($piTechRetardationA3.val()===""){
            $piTechRetardationA3.val("10")
        }
        if($piTechRetardationA4.val()===""){
            $piTechRetardationA4.val("20")
        }
        if($piTechRetardationB0.val()===""){
            $piTechRetardationB0.val("0")
        }
        if($piTechRetardationB1.val()===""){
            $piTechRetardationB1.val("10")
        }
        if($piTechRetardationB2.val()===""){
            $piTechRetardationB2.val("20")
        }
        if($piTechRetardationB3.val()===""){
            $piTechRetardationB3.val("30")
        }
        if($piTechRetardationB4.val()===""){
            $piTechRetardationB4.val("40")
        }
        if($piTechRetardationC0.val()===""){
            $piTechRetardationC0.val("30")
        }
        if($piTechRetardationC1.val()===""){
            $piTechRetardationC1.val("50")
        }
        if($piTechRetardationC2.val()===""){
            $piTechRetardationC2.val("60")
        }
        if($piTechRetardationC3.val()===""){
            $piTechRetardationC3.val("70")
        }
        if($piTechRetardationC4.val()===""){
            $piTechRetardationC4.val("80")
        }
        if($piTechRetardationD0.val()===""){
            $piTechRetardationD0.val("80")
        }
        if($piTechRetardationD1.val()===""){
            $piTechRetardationD1.val("90")
        }
        if($piTechRetardationD2.val()===""){
            $piTechRetardationD2.val("100")
        }
        if($piTechRetardationD3.val()===""){
            $piTechRetardationD3.val("100")
        }
        if($piTechRetardationD4.val()===""){
            $piTechRetardationD4.val("100")
        }
        if($piTechRetardationE0.val()===""){
            $piTechRetardationE0.val("100")
        }
        if($piTechRetardationE1.val()===""){
            $piTechRetardationE1.val("100")
        }
        if($piTechRetardationE2.val()===""){
            $piTechRetardationE2.val("100")
        }
        if($piTechRetardationE3.val()===""){
            $piTechRetardationE3.val("100")
        }
        if($piTechRetardationE4.val()===""){
            $piTechRetardationE4.val("100")
        }


        const $piTechPerformanceAa = $("#piTechPerformanceAa");
        const $piTechPerformanceAb = $("#piTechPerformanceAb");
        const $piTechPerformanceAc = $("#piTechPerformanceAc");
        const $piTechPerformanceBa = $("#piTechPerformanceBa");
        const $piTechPerformanceBb = $("#piTechPerformanceBb");
        const $piTechPerformanceBc = $("#piTechPerformanceBc");
        const $piTechPerformanceCa = $("#piTechPerformanceCa");
        const $piTechPerformanceCb = $("#piTechPerformanceCb");
        const $piTechPerformanceCc = $("#piTechPerformanceCc");
        const $piTechPerformanceDa = $("#piTechPerformanceDa");
        const $piTechPerformanceDb = $("#piTechPerformanceDb");
        const $piTechPerformanceDc = $("#piTechPerformanceDc");
        const $piTechPerformanceEa = $("#piTechPerformanceEa");
        const $piTechPerformanceEb = $("#piTechPerformanceEb");
        const $piTechPerformanceEc = $("#piTechPerformanceEc");
        if($piTechPerformanceAa.val()===""){
            $piTechPerformanceAa.val("100")
        }
        if($piTechPerformanceAb.val()===""){
            $piTechPerformanceAb.val("100")
        }
        if($piTechPerformanceAc.val()===""){
            $piTechPerformanceAc.val("100")
        }
        if($piTechPerformanceBa.val()===""){
            $piTechPerformanceBa.val("30")
        }
        if($piTechPerformanceBb.val()===""){
            $piTechPerformanceBb.val("70")
        }
        if($piTechPerformanceBc.val()===""){
            $piTechPerformanceBc.val("80")
        }
        if($piTechPerformanceCa.val()===""){
            $piTechPerformanceCa.val("0")
        }
        if($piTechPerformanceCb.val()===""){
            $piTechPerformanceCb.val("20")
        }
        if($piTechPerformanceCc.val()===""){
            $piTechPerformanceCc.val("70")
        }
        if($piTechPerformanceDa.val()===""){
            $piTechPerformanceDa.val("0")
        }
        if($piTechPerformanceDb.val()===""){
            $piTechPerformanceDb.val("0")
        }
        if($piTechPerformanceDc.val()===""){
            $piTechPerformanceDc.val("0")
        }
        if($piTechPerformanceEa.val()===""){
            $piTechPerformanceEa.val("0")
        }
        if($piTechPerformanceEb.val()===""){
            $piTechPerformanceEb.val("0")
        }
        if($piTechPerformanceEc.val()===""){
            $piTechPerformanceEc.val("0")
        }


        const $piTechGoalAPlusMin = $("#piTechGoalAPlusMin");
        const $piTechGoalAPlusMax = $("#piTechGoalAPlusMax");
        const $piTechGoalAMinusMin = $("#piTechGoalAMinusMin");
        const $piTechGoalAMinusMax = $("#piTechGoalAMinusMax");
        const $piTechGoalBPlusMin = $("#piTechGoalBPlusMin");
        const $piTechGoalBPlusMax = $("#piTechGoalBPlusMax");
        const $piTechGoalBMinusMin = $("#piTechGoalBMinusMin");
        const $piTechGoalBMinusMax = $("#piTechGoalBMinusMax");
        const $piTechGoalCPlusMin = $("#piTechGoalCPlusMin");
        const $piTechGoalCPlusMax = $("#piTechGoalCPlusMax");
        const $piTechGoalCMinusMin = $("#piTechGoalCMinusMin");
        const $piTechGoalCMinusMax = $("#piTechGoalCMinusMax");
        const $piTechGoalDPlusMin = $("#piTechGoalDPlusMin");
        const $piTechGoalDPlusMax = $("#piTechGoalDPlusMax");
        const $piTechGoalDMinusMin = $("#piTechGoalDMinusMin");
        const $piTechGoalDMinusMax = $("#piTechGoalDMinusMax");
        const $piTechGoalEMax = $("#piTechGoalEMax");

        if($piTechGoalAPlusMin.val()===""){
            $piTechGoalAPlusMin.val("90")
        }
        if($piTechGoalAPlusMax.val()===""){
            $piTechGoalAPlusMax.val("100")
        }
        if($piTechGoalAMinusMin.val()===""){
            $piTechGoalAMinusMin.val("80")
        }
        if($piTechGoalAMinusMax.val()===""){
            $piTechGoalAMinusMax.val("89")
        }
        if($piTechGoalBPlusMin.val()===""){
            $piTechGoalBPlusMin.val("70")
        }
        if($piTechGoalBPlusMax.val()===""){
            $piTechGoalBPlusMax.val("79")
        }
        if($piTechGoalBMinusMin.val()===""){
            $piTechGoalBMinusMin.val("60")
        }
        if($piTechGoalBMinusMax.val()===""){
            $piTechGoalBMinusMax.val("69")
        }
        if($piTechGoalCPlusMin.val()===""){
            $piTechGoalCPlusMin.val("55")
        }
        if($piTechGoalCPlusMax.val()===""){
            $piTechGoalCPlusMax.val("59")
        }
        if($piTechGoalCMinusMin.val()===""){
            $piTechGoalCMinusMin.val("50")
        }
        if($piTechGoalCMinusMax.val()===""){
            $piTechGoalCMinusMax.val("54")
        }
        if($piTechGoalDPlusMin.val()===""){
            $piTechGoalDPlusMin.val("45")
        }
        if($piTechGoalDPlusMax.val()===""){
            $piTechGoalDPlusMax.val("49")
        }
        if($piTechGoalDMinusMin.val()===""){
            $piTechGoalDMinusMin.val("40")
        }
        if($piTechGoalDMinusMax.val()===""){
            $piTechGoalDMinusMax.val("44")
        }
        if($piTechGoalEMax.val()===""){
            $piTechGoalEMax.val("39")
        }

        const formData = new FormData(document.getElementById('techForm'));

        url = $("#backend_protocol").val() + "://" + $("#backend_url").val() + "/api/performance/reference/techSave"; // 호출할 백엔드 API
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
                    // console.log("적용완료");
                    alertSuccess("적용 완료했습니다.");
                    techSettingData();
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

// 기술성 데이터 호출
function techSettingData(){
    JWT_Get();

    let url;

    if (accessToken == null && refreshToken == null && insert_id == null) {
        // console.log("callinfo(userid)함수 : 토큰&리플레시&로그인한아이디 Null");
        alertCaution("토큰이 만료되었습니다.<BR>다시 로그인해주세요.", 2);
    } else if (accessToken == null) {
        refreshTokenCookie();
    } else {

        url = $("#backend_protocol").val() + "://" + $("#backend_url").val() + "/api/performance/reference/techData"; // 호출할 백엔드 API
        // console.log("url : " + url);
        $.ajax({
            url: url,
            type: 'GET',
            cache: false,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("JWT_AccessToken", accessToken);
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

                    $("#piTechSafetyAe").val(request.sendData.technicality.piTechSafetyAe);
                    $("#piTechSafetyBd").val(request.sendData.technicality.piTechSafetyBd);
                    $("#piTechSafetyCc").val(request.sendData.technicality.piTechSafetyCc);
                    $("#piTechSafetyDb").val(request.sendData.technicality.piTechSafetyDb);
                    $("#piTechSafetyEa").val(request.sendData.technicality.piTechSafetyEa);

                    $("#piTechOldAMin").val(request.sendData.technicality.piTechOldAMin);
                    $("#piTechOldAScore").val(request.sendData.technicality.piTechOldAScore);
                    $("#piTechOldBMin").val(request.sendData.technicality.piTechOldBMin);
                    $("#piTechOldBMax").val(request.sendData.technicality.piTechOldBMax);
                    $("#piTechOldBScore").val(request.sendData.technicality.piTechOldBScore);
                    $("#piTechOldCMin").val(request.sendData.technicality.piTechOldCMin);
                    $("#piTechOldCMax").val(request.sendData.technicality.piTechOldCMax);
                    $("#piTechOldCScore").val(request.sendData.technicality.piTechOldCScore);
                    $("#piTechOldDMin").val(request.sendData.technicality.piTechOldDMin);
                    $("#piTechOldDMax").val(request.sendData.technicality.piTechOldDMin);
                    $("#piTechOldDScore").val(request.sendData.technicality.piTechOldDScore);
                    $("#piTechOldEMax").val(request.sendData.technicality.piTechOldEMax);
                    $("#piTechOldEScore").val(request.sendData.technicality.piTechOldEScore);

                    $("#piTechUsabilityAe").val(request.sendData.technicality.piTechUsabilityAe);
                    $("#piTechUsabilityBd").val(request.sendData.technicality.piTechUsabilityBd);
                    $("#piTechUsabilityCc").val(request.sendData.technicality.piTechUsabilityCc);
                    $("#piTechUsabilityDb").val(request.sendData.technicality.piTechUsabilityDb);
                    $("#piTechUsabilityEa").val(request.sendData.technicality.piTechUsabilityEa);

                    $("#piTechRetardationA0").val(request.sendData.technicality.piTechRetardationA0);
                    $("#piTechRetardationA1").val(request.sendData.technicality.piTechRetardationA1);
                    $("#piTechRetardationA2").val(request.sendData.technicality.piTechRetardationA2);
                    $("#piTechRetardationA3").val(request.sendData.technicality.piTechRetardationA3);
                    $("#piTechRetardationA4").val(request.sendData.technicality.piTechRetardationA4);
                    $("#piTechRetardationB0").val(request.sendData.technicality.piTechRetardationB0);
                    $("#piTechRetardationB1").val(request.sendData.technicality.piTechRetardationB1);
                    $("#piTechRetardationB2").val(request.sendData.technicality.piTechRetardationB2);
                    $("#piTechRetardationB3").val(request.sendData.technicality.piTechRetardationB3);
                    $("#piTechRetardationB4").val(request.sendData.technicality.piTechRetardationB4);
                    $("#piTechRetardationC0").val(request.sendData.technicality.piTechRetardationC0);
                    $("#piTechRetardationC1").val(request.sendData.technicality.piTechRetardationC1);
                    $("#piTechRetardationC2").val(request.sendData.technicality.piTechRetardationC2);
                    $("#piTechRetardationC3").val(request.sendData.technicality.piTechRetardationC3);
                    $("#piTechRetardationC4").val(request.sendData.technicality.piTechRetardationC4);
                    $("#piTechRetardationD0").val(request.sendData.technicality.piTechRetardationD0);
                    $("#piTechRetardationD1").val(request.sendData.technicality.piTechRetardationD1);
                    $("#piTechRetardationD2").val(request.sendData.technicality.piTechRetardationD2);
                    $("#piTechRetardationD3").val(request.sendData.technicality.piTechRetardationD3);
                    $("#piTechRetardationD4").val(request.sendData.technicality.piTechRetardationD4);
                    $("#piTechRetardationE0").val(request.sendData.technicality.piTechRetardationE0);
                    $("#piTechRetardationE1").val(request.sendData.technicality.piTechRetardationE1);
                    $("#piTechRetardationE2").val(request.sendData.technicality.piTechRetardationE2);
                    $("#piTechRetardationE3").val(request.sendData.technicality.piTechRetardationE3);
                    $("#piTechRetardationE4").val(request.sendData.technicality.piTechRetardationE4);

                    $("#piTechPerformanceAa").val(request.sendData.technicality.piTechPerformanceAa);
                    $("#piTechPerformanceAb").val(request.sendData.technicality.piTechPerformanceAb);
                    $("#piTechPerformanceAc").val(request.sendData.technicality.piTechPerformanceAc);
                    $("#piTechPerformanceBa").val(request.sendData.technicality.piTechPerformanceBa);
                    $("#piTechPerformanceBb").val(request.sendData.technicality.piTechPerformanceBb);
                    $("#piTechPerformanceBc").val(request.sendData.technicality.piTechPerformanceBc);
                    $("#piTechPerformanceCa").val(request.sendData.technicality.piTechPerformanceCa);
                    $("#piTechPerformanceCb").val(request.sendData.technicality.piTechPerformanceCb);
                    $("#piTechPerformanceCc").val(request.sendData.technicality.piTechPerformanceCc);
                    $("#piTechPerformanceDa").val(request.sendData.technicality.piTechPerformanceDa);
                    $("#piTechPerformanceDb").val(request.sendData.technicality.piTechPerformanceDb);
                    $("#piTechPerformanceDc").val(request.sendData.technicality.piTechPerformanceDc);
                    $("#piTechPerformanceEa").val(request.sendData.technicality.piTechPerformanceEa);
                    $("#piTechPerformanceEb").val(request.sendData.technicality.piTechPerformanceEb);
                    $("#piTechPerformanceEc").val(request.sendData.technicality.piTechPerformanceEc);

                    $("#piTechGoalAPlusMin").val(request.sendData.technicality.piTechGoalAPlusMin);
                    $("#piTechGoalAPlusMax").val(request.sendData.technicality.piTechGoalAPlusMax);
                    $("#piTechGoalAMinusMin").val(request.sendData.technicality.piTechGoalAMinusMin);
                    $("#piTechGoalAMinusMax").val(request.sendData.technicality.piTechGoalAMinusMax);
                    $("#piTechGoalBPlusMin").val(request.sendData.technicality.piTechGoalBPlusMin);
                    $("#piTechGoalBPlusMax").val(request.sendData.technicality.piTechGoalBPlusMax);
                    $("#piTechGoalBMinusMin").val(request.sendData.technicality.piTechGoalBMinusMin);
                    $("#piTechGoalBMinusMax").val(request.sendData.technicality.piTechGoalBMinusMax);
                    $("#piTechGoalCPlusMin").val(request.sendData.technicality.piTechGoalCPlusMin);
                    $("#piTechGoalCPlusMax").val(request.sendData.technicality.piTechGoalCPlusMax);
                    $("#piTechGoalCMinusMin").val(request.sendData.technicality.piTechGoalCMinusMin);
                    $("#piTechGoalCMinusMax").val(request.sendData.technicality.piTechGoalCMinusMax);
                    $("#piTechGoalDPlusMin").val(request.sendData.technicality.piTechGoalDPlusMin);
                    $("#piTechGoalDPlusMax").val(request.sendData.technicality.piTechGoalDPlusMax);
                    $("#piTechGoalDMinusMin").val(request.sendData.technicality.piTechGoalDMinusMin);
                    $("#piTechGoalDMinusMax").val(request.sendData.technicality.piTechGoalDMinusMax);
                    $("#piTechGoalEMax").val(request.sendData.technicality.piTechGoalEMax);

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

// 경제성
function ecoSettingSave(){


    JWT_Get();

    let url;

    if (accessToken == null && refreshToken == null && insert_id == null) {
        // console.log("callinfo(userid)함수 : 토큰&리플레시&로그인한아이디 Null");
        alertCaution("토큰이 만료되었습니다.<BR>다시 로그인해주세요.", 2);
    } else {

        const $piEcoAssetAMin = $("#piEcoAssetAMin");
        const $piEcoAssetAScore = $("#piEcoAssetAScore");
        const $piEcoAssetBMin = $("#piEcoAssetBMin");
        const $piEcoAssetBMax = $("#piEcoAssetBMax");
        const $piEcoAssetBScore = $("#piEcoAssetBScore");
        const $piEcoAssetCMin = $("#piEcoAssetCMin");
        const $piEcoAssetCMax = $("#piEcoAssetCMax");
        const $piEcoAssetCScore = $("#piEcoAssetCScore");
        const $piEcoAssetDMin = $("#piEcoAssetDMin");
        const $piEcoAssetDMax = $("#piEcoAssetDMax");
        const $piEcoAssetDScore = $("#piEcoAssetDScore");
        const $piEcoAssetEMax = $("#piEcoAssetEMax");
        const $piEcoAssetEScore = $("#piEcoAssetEScore");
        if($piEcoAssetAMin.val()===""){
            $piEcoAssetAMin.val("5")
        }
        if($piEcoAssetAScore.val()===""){
            $piEcoAssetAScore.val("100")
        }
        if($piEcoAssetBMin.val()===""){
            $piEcoAssetBMin.val("4")
        }
        if($piEcoAssetBMax.val()===""){
            $piEcoAssetBMax.val("5")
        }
        if($piEcoAssetBScore.val()===""){
            $piEcoAssetBScore.val("80")
        }
        if($piEcoAssetCMin.val()===""){
            $piEcoAssetCMin.val("3")
        }
        if($piEcoAssetCMax.val()===""){
            $piEcoAssetCMax.val("4")
        }
        if($piEcoAssetCScore.val()===""){
            $piEcoAssetCScore.val("70")
        }
        if($piEcoAssetDMin.val()===""){
            $piEcoAssetDMin.val("1")
        }
        if($piEcoAssetDMax.val()===""){
            $piEcoAssetDMax.val("3")
        }
        if($piEcoAssetDScore.val()===""){
            $piEcoAssetDScore.val("50")
        }
        if($piEcoAssetEMax.val()===""){
            $piEcoAssetEMax.val("1")
        }
        if($piEcoAssetEScore.val()===""){
            $piEcoAssetEScore.val("30")
        }

        const $piEcoLifeA = $("#piEcoLifeA");
        const $piEcoLifeB = $("#piEcoLifeB");
        const $piEcoLifeC = $("#piEcoLifeC");
        const $piEcoLifeD = $("#piEcoLifeD");
        const $piEcoLifeE = $("#piEcoLifeE");
        if($piEcoLifeA.val()===""){
            $piEcoLifeA.val("95")
        }
        if($piEcoLifeB.val()===""){
            $piEcoLifeB.val("75")
        }
        if($piEcoLifeC.val()===""){
            $piEcoLifeC.val("50")
        }
        if($piEcoLifeD.val()===""){
            $piEcoLifeD.val("30")
        }
        if($piEcoLifeE.val()===""){
            $piEcoLifeE.val("5")
        }

        const $piEcoFacilityA = $("#piEcoFacilityA");
        const $piEcoFacilityB = $("#piEcoFacilityB");
        const $piEcoFacilityC = $("#piEcoFacilityC");
        const $piEcoFacilityD = $("#piEcoFacilityD");
        const $piEcoFacilityE = $("#piEcoFacilityE");
        const $piEcoFacilityF = $("#piEcoFacilityF");
        const $piEcoFacilityG = $("#piEcoFacilityG");
        if($piEcoFacilityA.val()===""){
            $piEcoFacilityA.val("20")
        }
        if($piEcoFacilityB.val()===""){
            $piEcoFacilityB.val("20")
        }
        if($piEcoFacilityC.val()===""){
            $piEcoFacilityC.val("20")
        }
        if($piEcoFacilityD.val()===""){
            $piEcoFacilityD.val("20")
        }
        if($piEcoFacilityE.val()===""){
            $piEcoFacilityE.val("20")
        }
        if($piEcoFacilityF.val()===""){
            $piEcoFacilityF.val("20")
        }
        if($piEcoFacilityG.val()===""){
            $piEcoFacilityG.val("20")
        }


        const $piEcoUtilityAa = $("#piEcoUtilityAa");
        const $piEcoUtilityBa = $("#piEcoUtilityBa");
        const $piEcoUtilityBb = $("#piEcoUtilityBb");
        const $piEcoUtilityCa = $("#piEcoUtilityCa");
        const $piEcoUtilityCb = $("#piEcoUtilityCb");
        const $piEcoUtilityCc = $("#piEcoUtilityCc");
        const $piEcoUtilityDa = $("#piEcoUtilityDa");
        const $piEcoUtilityDb = $("#piEcoUtilityDb");
        const $piEcoUtilityDc = $("#piEcoUtilityDc");
        const $piEcoUtilityDd = $("#piEcoUtilityDd");
        const $piEcoUtilityEa = $("#piEcoUtilityEa");
        const $piEcoUtilityEb = $("#piEcoUtilityEb");
        const $piEcoUtilityEc = $("#piEcoUtilityEc");
        const $piEcoUtilityEd = $("#piEcoUtilityEd");
        const $piEcoUtilityEe = $("#piEcoUtilityEe");
        if($piEcoUtilityAa.val()===""){
            $piEcoUtilityAa.val("5")
        }
        if($piEcoUtilityBa.val()===""){
            $piEcoUtilityBa.val("20")
        }
        if($piEcoUtilityBb.val()===""){
            $piEcoUtilityBb.val("10")
        }
        if($piEcoUtilityCa.val()===""){
            $piEcoUtilityCa.val("80")
        }
        if($piEcoUtilityCb.val()===""){
            $piEcoUtilityCb.val("50")
        }
        if($piEcoUtilityCc.val()===""){
            $piEcoUtilityCc.val("0")
        }
        if($piEcoUtilityDa.val()===""){
            $piEcoUtilityDa.val("90")
        }
        if($piEcoUtilityDb.val()===""){
            $piEcoUtilityDb.val("70")
        }
        if($piEcoUtilityDc.val()===""){
            $piEcoUtilityDc.val("30")
        }
        if($piEcoUtilityDd.val()===""){
            $piEcoUtilityDd.val("0")
        }
        if($piEcoUtilityEa.val()===""){
            $piEcoUtilityEa.val("100")
        }
        if($piEcoUtilityEb.val()===""){
            $piEcoUtilityEb.val("80")
        }
        if($piEcoUtilityEc.val()===""){
            $piEcoUtilityEc.val("50")
        }
        if($piEcoUtilityEd.val()===""){
            $piEcoUtilityEd.val("10")
        }
        if($piEcoUtilityEe.val()===""){
            $piEcoUtilityEe.val("0")
        }


        const $piEcoTrafficAMin = $("#piEcoTrafficAMin");
        const $piEcoTrafficAScore = $("#piEcoTrafficAScore");
        const $piEcoTrafficBMin = $("#piEcoTrafficBMin");
        const $piEcoTrafficBMax = $("#piEcoTrafficBMax");
        const $piEcoTrafficBScore = $("#piEcoTrafficBScore");
        const $piEcoTrafficCMin = $("#piEcoTrafficCMin");
        const $piEcoTrafficCMax = $("#piEcoTrafficCMax");
        const $piEcoTrafficCScore = $("#piEcoTrafficCScore");
        const $piEcoTrafficDMin = $("#piEcoTrafficDMin");
        const $piEcoTrafficDMax = $("#piEcoTrafficDMax");
        const $piEcoTrafficDScore = $("#piEcoTrafficDScore");
        const $piEcoTrafficEMax = $("#piEcoTrafficEMax");
        const $piEcoTrafficEScore = $("#piEcoTrafficEScore");
        if($piEcoTrafficAMin.val()===""){
            $piEcoTrafficAMin.val("20000")
        }
        if($piEcoTrafficAScore.val()===""){
            $piEcoTrafficAScore.val("5")
        }
        if($piEcoTrafficBMin.val()===""){
            $piEcoTrafficBMin.val("10000")
        }
        if($piEcoTrafficBMax.val()===""){
            $piEcoTrafficBMax.val("19999")
        }
        if($piEcoTrafficBScore.val()===""){
            $piEcoTrafficBScore.val("4")
        }
        if($piEcoTrafficCMin.val()===""){
            $piEcoTrafficCMin.val("5000")
        }
        if($piEcoTrafficCMax.val()===""){
            $piEcoTrafficCMax.val("9999")
        }
        if($piEcoTrafficCScore.val()===""){
            $piEcoTrafficCScore.val("3")
        }
        if($piEcoTrafficDMin.val()===""){
            $piEcoTrafficDMin.val("3000")
        }
        if($piEcoTrafficDMax.val()===""){
            $piEcoTrafficDMax.val("4999")
        }
        if($piEcoTrafficDScore.val()===""){
            $piEcoTrafficDScore.val("2")
        }
        if($piEcoTrafficEMax.val()===""){
            $piEcoTrafficEMax.val("2999")
        }
        if($piEcoTrafficEScore.val()===""){
            $piEcoTrafficEScore.val("1")
        }


        const $piEcoImproAMin = $("#piEcoImproAMin");
        const $piEcoImproAScore = $("#piEcoImproAScore");
        const $piEcoImproBMin = $("#piEcoImproBMin");
        const $piEcoImproBMax = $("#piEcoImproBMax");
        const piEcoImproBScore = $("#piEcoImproBScore");
        const $piEcoImproCMin = $("#piEcoImproCMin");
        const $piEcoImproCMax = $("#piEcoImproCMax");
        const $piEcoImproCScore = $("#piEcoImproCScore");
        const $piEcoImproDMin = $("#piEcoImproDMin");
        const $piEcoImproDMax = $("#piEcoImproDMax");
        const $piEcoImproDScore = $("#piEcoImproDScore");
        const $piEcoImproEMax = $("#piEcoImproEMax");
        const $piEcoImproEScore = $("#piEcoImproEScore");
        if($piEcoImproAMin.val()===""){
            $piEcoImproAMin.val("2")
        }
        if($piEcoImproAScore.val()===""){
            $piEcoImproAScore.val("100")
        }
        if($piEcoImproBMin.val()===""){
            $piEcoImproBMin.val("1.5")
        }
        if($piEcoImproBMax.val()===""){
            $piEcoImproBMax.val("2")
        }
        if(piEcoImproBScore.val()===""){
            piEcoImproBScore.val("80")
        }
        if($piEcoImproCMin.val()===""){
            $piEcoImproCMin.val("1")
        }
        if($piEcoImproCMax.val()===""){
            $piEcoImproCMax.val("1.5")
        }
        if($piEcoImproCScore.val()===""){
            $piEcoImproCScore.val("70")
        }
        if($piEcoImproDMin.val()===""){
            $piEcoImproDMin.val("0.5")
        }
        if($piEcoImproDMax.val()===""){
            $piEcoImproDMax.val("1")
        }
        if($piEcoImproDScore.val()===""){
            $piEcoImproDScore.val("50")
        }
        if($piEcoImproEMax.val()===""){
            $piEcoImproEMax.val("0.5")
        }
        if($piEcoImproEScore.val()===""){
            $piEcoImproEScore.val("30")
        }

        const $piEcoScaleBaseA = $("#piEcoScaleBaseA");
        const $piEcoScaleBaseB = $("#piEcoScaleBaseB");
        const $piEcoScaleBaseC = $("#piEcoScaleBaseC");
        const $piEcoScaleBaseD = $("#piEcoScaleBaseD");
        const $piEcoScaleBaseE = $("#piEcoScaleBaseE");
        const $piEcoScaleScoreA = $("#piEcoScaleScoreA");
        const $piEcoScaleScoreB = $("#piEcoScaleScoreB");
        const $piEcoScaleScoreC = $("#piEcoScaleScoreC");
        const $piEcoScaleScoreD = $("#piEcoScaleScoreD");
        const $piEcoScaleScoreE = $("#piEcoScaleScoreE");
        if($piEcoScaleBaseA.val()===""){
            $piEcoScaleBaseA.val("1.5")
        }
        if($piEcoScaleBaseB.val()===""){
            $piEcoScaleBaseB.val("2")
        }
        if($piEcoScaleBaseC.val()===""){
            $piEcoScaleBaseC.val("2.5")
        }
        if($piEcoScaleBaseD.val()==="") {
            $piEcoScaleBaseD.val("3")
        }
        if($piEcoScaleBaseE.val()===""){
            $piEcoScaleBaseE.val("4")
        }
        if($piEcoScaleScoreA.val()===""){
            $piEcoScaleScoreA.val("100")
        }
        if($piEcoScaleScoreB.val()===""){
            $piEcoScaleScoreB.val("90")
        }
        if($piEcoScaleScoreC.val()===""){
            $piEcoScaleScoreC.val("80")
        }
        if($piEcoScaleScoreD.val()===""){
            $piEcoScaleScoreD.val("70")
        }
        if($piEcoScaleScoreE.val()===""){
            $piEcoScaleScoreE.val("50")
        }

        const $piEcoEfficiencyBaseA = $("#piEcoEfficiencyBaseA");
        const $piEcoEfficiencyBaseB = $("#piEcoEfficiencyBaseB");
        const $piEcoEfficiencyBaseC = $("#piEcoEfficiencyBaseC");
        const $piEcoEfficiencyBaseD = $("#piEcoEfficiencyBaseD");
        const $piEcoEfficiencyBaseE = $("#piEcoEfficiencyBaseE");
        const $piEcoEfficiencyScoreA = $("#piEcoEfficiencyScoreA");
        const $piEcoEfficiencyScoreB = $("#piEcoEfficiencyScoreB");
        const $piEcoEfficiencyScoreC = $("#piEcoEfficiencyScoreC");
        const $piEcoEfficiencyScoreD = $("#piEcoEfficiencyScoreD");
        const $piEcoEfficiencyScoreE = $("#piEcoEfficiencyScoreE");
        if($piEcoEfficiencyBaseA.val()==="") {
            $piEcoEfficiencyBaseA.val("137")
        }
        if($piEcoEfficiencyBaseC.val()===""){
            $piEcoEfficiencyBaseB.val("136")
        }
        if($piEcoEfficiencyBaseC.val()===""){
            $piEcoEfficiencyBaseC.val("341")
        }
        if($piEcoEfficiencyBaseD.val()===""){
            $piEcoEfficiencyBaseD.val("684")
        }
        if($piEcoEfficiencyBaseE.val()===""){
            $piEcoEfficiencyBaseE.val("685")
        }
        if($piEcoEfficiencyScoreA.val()===""){
            $piEcoEfficiencyScoreA.val("100")
        }
        if($piEcoEfficiencyScoreB.val()===""){
            $piEcoEfficiencyScoreB.val("90")
        }
        if($piEcoEfficiencyScoreC.val()===""){
            $piEcoEfficiencyScoreC.val("80")
        }
        if($piEcoEfficiencyScoreD.val()===""){
            $piEcoEfficiencyScoreD.val("70")
        }
        if($piEcoEfficiencyScoreE.val()===""){
            $piEcoEfficiencyScoreE.val("50")
        }

        const $piEcoGoalAPlusMin = $("#piEcoGoalAPlusMin");
        const $piEcoGoalAPlusMax = $("#piEcoGoalAPlusMax");
        const $piEcoGoalAMinusMin = $("#piEcoGoalAMinusMin");
        const $piEcoGoalAMinusMax = $("#piEcoGoalAMinusMax");
        const $piEcoGoalBPlusMin = $("#piEcoGoalBPlusMin");
        const $piEcoGoalBPlusMax = $("#piEcoGoalBPlusMax");
        const $piEcoGoalBMinusMin = $("#piEcoGoalBMinusMin");
        const $piEcoGoalBMinusMax = $("#piEcoGoalBMinusMax");
        const $piEcoGoalCPlusMin = $("#piEcoGoalCPlusMin");
        const $piEcoGoalCPlusMax = $("#piEcoGoalCPlusMax");
        const $piEcoGoalCMinusMin = $("#piEcoGoalCMinusMin");
        const $piEcoGoalCMinusMax = $("#piEcoGoalCMinusMax");
        const $piEcoGoalDPlusMin = $("#piEcoGoalDPlusMin");
        const $piEcoGoalDPlusMax = $("#piEcoGoalDPlusMax");
        const $piEcoGoalDMinusMin = $("#piEcoGoalDMinusMin");
        const $piEcoGoalDMinusMax = $("#piEcoGoalDMinusMax");
        const $piEcoGoalEMax = $("#piEcoGoalEMax");

        if($piEcoGoalAPlusMin.val()===""){
            $piEcoGoalAPlusMin.val("90")
        }
        if($piEcoGoalAPlusMax.val()===""){
            $piEcoGoalAPlusMax.val("100")
        }
        if($piEcoGoalAMinusMin.val()===""){
            $piEcoGoalAMinusMin.val("80")
        }
        if($piEcoGoalAMinusMax.val()===""){
            $piEcoGoalAMinusMax.val("89")
        }
        if($piEcoGoalBPlusMin.val()===""){
            $piEcoGoalBPlusMin.val("70")
        }
        if($piEcoGoalBPlusMax.val()===""){
            $piEcoGoalBPlusMax.val("79")
        }
        if($piEcoGoalBMinusMin.val()===""){
            $piEcoGoalBMinusMin.val("60")
        }
        if($piEcoGoalBMinusMax.val()===""){
            $piEcoGoalBMinusMax.val("69")
        }
        if($piEcoGoalCPlusMin.val()===""){
            $piEcoGoalCPlusMin.val("55")
        }
        if($piEcoGoalCPlusMax.val()===""){
            $piEcoGoalCPlusMax.val("59")
        }
        if($piEcoGoalCMinusMin.val()===""){
            $piEcoGoalCMinusMin.val("50")
        }
        if($piEcoGoalCMinusMax.val()===""){
            $piEcoGoalCMinusMax.val("54")
        }
        if($piEcoGoalDPlusMin.val()===""){
            $piEcoGoalDPlusMin.val("45")
        }
        if($piEcoGoalDPlusMax.val()===""){
            $piEcoGoalDPlusMax.val("49")
        }
        if($piEcoGoalDMinusMin.val()===""){
            $piEcoGoalDMinusMin.val("40")
        }
        if($piEcoGoalDMinusMax.val()===""){
            $piEcoGoalDMinusMax.val("44")
        }
        if($piEcoGoalEMax.val()===""){
            $piEcoGoalEMax.val("39")
        }

        const formData = new FormData(document.getElementById('ecoForm'))

        url = $("#backend_protocol").val() + "://" + $("#backend_url").val() + "/api/performance/reference/ecoSave"; // 호출할 백엔드 API
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
                    // console.log("적용완료");
                    alertSuccess("적용 완료했습니다.");
                    ecoSettingData();
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

// 경제성 데이터 호출
function ecoSettingData(){
    JWT_Get();

    let url;

    if (accessToken == null && refreshToken == null && insert_id == null) {
        // console.log("callinfo(userid)함수 : 토큰&리플레시&로그인한아이디 Null");
        alertCaution("토큰이 만료되었습니다.<BR>다시 로그인해주세요.", 2);
    } else if (accessToken == null) {
        refreshTokenCookie();
    } else {

        url = $("#backend_protocol").val() + "://" + $("#backend_url").val() + "/api/performance/reference/ecoData"; // 호출할 백엔드 API
        // console.log("url : " + url);
        $.ajax({
            url: url,
            type: 'GET',
            cache: false,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("JWT_AccessToken", accessToken);
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

                    $("#piEcoAssetAMin").val(request.sendData.economy.piEcoAssetAMin);
                    $("#piEcoAssetAScore").val(request.sendData.economy.piEcoAssetAScore);
                    $("#piEcoAssetBMin").val(request.sendData.economy.piEcoAssetBMin);
                    $("#piEcoAssetBMax").val(request.sendData.economy.piEcoAssetBMax);
                    $("#piEcoAssetBScore").val(request.sendData.economy.piEcoAssetBScore);
                    $("#piEcoAssetCMin").val(request.sendData.economy.piEcoAssetCMin);
                    $("#piEcoAssetCMax").val(request.sendData.economy.piEcoAssetCMax);
                    $("#piEcoAssetCScore").val(request.sendData.economy.piEcoAssetCScore);
                    $("#piEcoAssetDMin").val(request.sendData.economy.piEcoAssetDMin);
                    $("#piEcoAssetDMax").val(request.sendData.economy.piEcoAssetDMax);
                    $("#piEcoAssetDScore").val(request.sendData.economy.piEcoAssetDScore);
                    $("#piEcoAssetEMax").val(request.sendData.economy.piEcoAssetEMax);
                    $("#piEcoAssetEScore").val(request.sendData.economy.piEcoAssetEScore);

                    $("#piEcoLifeA").val(request.sendData.economy.piEcoLifeA);
                    $("#piEcoLifeB").val(request.sendData.economy.piEcoLifeB);
                    $("#piEcoLifeC").val(request.sendData.economy.piEcoLifeC);
                    $("#piEcoLifeD").val(request.sendData.economy.piEcoLifeD);
                    $("#piEcoLifeE").val(request.sendData.economy.piEcoLifeE);

                    $("#piEcoFacilityA").val(request.sendData.economy.piEcoFacilityA);
                    $("#piEcoFacilityB").val(request.sendData.economy.piEcoFacilityB);
                    $("#piEcoFacilityC").val(request.sendData.economy.piEcoFacilityC);
                    $("#piEcoFacilityD").val(request.sendData.economy.piEcoFacilityD);
                    $("#piEcoFacilityE").val(request.sendData.economy.piEcoFacilityE);
                    $("#piEcoFacilityF").val(request.sendData.economy.piEcoFacilityF);
                    $("#piEcoFacilityG").val(request.sendData.economy.piEcoFacilityG);

                    $("#piEcoUtilityAa").val(request.sendData.economy.piEcoUtilityAa);
                    $("#piEcoUtilityBa").val(request.sendData.economy.piEcoUtilityBa);
                    $("#piEcoUtilityBb").val(request.sendData.economy.piEcoUtilityBb);
                    $("#piEcoUtilityCa").val(request.sendData.economy.piEcoUtilityCa);
                    $("#piEcoUtilityCb").val(request.sendData.economy.piEcoUtilityCb);
                    $("#piEcoUtilityCc").val(request.sendData.economy.piEcoUtilityCc);
                    $("#piEcoUtilityDa").val(request.sendData.economy.piEcoUtilityDa);
                    $("#piEcoUtilityDb").val(request.sendData.economy.piEcoUtilityDb);
                    $("#piEcoUtilityDc").val(request.sendData.economy.piEcoUtilityDc);
                    $("#piEcoUtilityDd").val(request.sendData.economy.piEcoUtilityDd);
                    $("#piEcoUtilityEa").val(request.sendData.economy.piEcoUtilityEa);
                    $("#piEcoUtilityEb").val(request.sendData.economy.piEcoUtilityEb);
                    $("#piEcoUtilityEc").val(request.sendData.economy.piEcoUtilityEc);
                    $("#piEcoUtilityEd").val(request.sendData.economy.piEcoUtilityEd);
                    $("#piEcoUtilityEe").val(request.sendData.economy.piEcoUtilityEe);

                    $("#piEcoTrafficAMin").val(request.sendData.economy.piEcoTrafficAMin);
                    $("#piEcoTrafficAScore").val(request.sendData.economy.piEcoTrafficAScore);
                    $("#piEcoTrafficBMin").val(request.sendData.economy.piEcoTrafficBMin);
                    $("#piEcoTrafficBMax").val(request.sendData.economy.piEcoTrafficBMax);
                    $("#piEcoTrafficBScore").val(request.sendData.economy.piEcoTrafficBScore);
                    $("#piEcoTrafficCMin").val(request.sendData.economy.piEcoTrafficCMin);
                    $("#piEcoTrafficCMax").val(request.sendData.economy.piEcoTrafficCMax);
                    $("#piEcoTrafficCScore").val(request.sendData.economy.piEcoTrafficCScore);
                    $("#piEcoTrafficDMin").val(request.sendData.economy.piEcoTrafficDMin);
                    $("#piEcoTrafficDMax").val(request.sendData.economy.piEcoTrafficDMax);
                    $("#piEcoTrafficDScore").val(request.sendData.economy.piEcoTrafficDScore);
                    $("#piEcoTrafficEMax").val(request.sendData.economy.piEcoTrafficEMax);
                    $("#piEcoTrafficEScore").val(request.sendData.economy.piEcoTrafficEScore);

                    $("#piEcoImproAMin").val(request.sendData.economy.piEcoImproAMin);
                    $("#piEcoImproAScore").val(request.sendData.economy.piEcoImproAScore);
                    $("#piEcoImproBMin").val(request.sendData.economy.piEcoImproBMin);
                    $("#piEcoImproBMax").val(request.sendData.economy.piEcoImproBMax);
                    $("#piEcoImproBScore").val(request.sendData.economy.piEcoImproBScore);
                    $("#piEcoImproCMin").val(request.sendData.economy.piEcoImproCMin);
                    $("#piEcoImproCMax").val(request.sendData.economy.piEcoImproCMax);
                    $("#piEcoImproCScore").val(request.sendData.economy.piEcoImproCScore);
                    $("#piEcoImproDMin").val(request.sendData.economy.piEcoImproDMin);
                    $("#piEcoImproDMax").val(request.sendData.economy.piEcoImproDMax);
                    $("#piEcoImproDScore").val(request.sendData.economy.piEcoImproDScore);
                    $("#piEcoImproEMax").val(request.sendData.economy.piEcoImproEMax);
                    $("#piEcoImproEScore").val(request.sendData.economy.piEcoImproEScore);

                    $("#piEcoScaleBaseA").val(request.sendData.economy.piEcoScaleBaseA);
                    $("#piEcoScaleBaseB").val(request.sendData.economy.piEcoScaleBaseB);
                    $("#piEcoScaleBaseC").val(request.sendData.economy.piEcoScaleBaseC);
                    $("#piEcoScaleBaseD").val(request.sendData.economy.piEcoScaleBaseD);
                    $("#piEcoScaleBaseE").val(request.sendData.economy.piEcoScaleBaseE);
                    $("#piEcoScaleScoreA").val(request.sendData.economy.piEcoScaleScoreA);
                    $("#piEcoScaleScoreB").val(request.sendData.economy.piEcoScaleScoreB);
                    $("#piEcoScaleScoreC").val(request.sendData.economy.piEcoScaleScoreC);
                    $("#piEcoScaleScoreD").val(request.sendData.economy.piEcoScaleScoreD);
                    $("#piEcoScaleScoreE").val(request.sendData.economy.piEcoScaleScoreE);

                    $("#piEcoEfficiencyBaseA").val(request.sendData.economy.piEcoEfficiencyBaseA);
                    $("#piEcoEfficiencyBaseB").val(request.sendData.economy.piEcoEfficiencyBaseB);
                    $("#piEcoEfficiencyBaseC").val(request.sendData.economy.piEcoEfficiencyBaseC);
                    $("#piEcoEfficiencyBaseD").val(request.sendData.economy.piEcoEfficiencyBaseD);
                    $("#piEcoEfficiencyBaseE").val(request.sendData.economy.piEcoEfficiencyBaseE);
                    $("#piEcoEfficiencyScoreA").val(request.sendData.economy.piEcoEfficiencyScoreA);
                    $("#piEcoEfficiencyScoreB").val(request.sendData.economy.piEcoEfficiencyScoreB);
                    $("#piEcoEfficiencyScoreC").val(request.sendData.economy.piEcoEfficiencyScoreC);
                    $("#piEcoEfficiencyScoreD").val(request.sendData.economy.piEcoEfficiencyScoreD);
                    $("#piEcoEfficiencyScoreE").val(request.sendData.economy.piEcoEfficiencyScoreE);

                    $("#piEcoGoalAPlusMin").val(request.sendData.economy.piEcoGoalAPlusMin);
                    $("#piEcoGoalAPlusMax").val(request.sendData.economy.piEcoGoalAPlusMax);
                    $("#piEcoGoalAMinusMin").val(request.sendData.economy.piEcoGoalAMinusMin);
                    $("#piEcoGoalAMinusMax").val(request.sendData.economy.piEcoGoalAMinusMax);
                    $("#piEcoGoalBPlusMin").val(request.sendData.economy.piEcoGoalBPlusMin);
                    $("#piEcoGoalBPlusMax").val(request.sendData.economy.piEcoGoalBPlusMax);
                    $("#piEcoGoalBMinusMin").val(request.sendData.economy.piEcoGoalBMinusMin);
                    $("#piEcoGoalBMinusMax").val(request.sendData.economy.piEcoGoalBMinusMax);
                    $("#piEcoGoalCPlusMin").val(request.sendData.economy.piEcoGoalCPlusMin);
                    $("#piEcoGoalCPlusMax").val(request.sendData.economy.piEcoGoalCPlusMax);
                    $("#piEcoGoalCMinusMin").val(request.sendData.economy.piEcoGoalCMinusMin);
                    $("#piEcoGoalCMinusMax").val(request.sendData.economy.piEcoGoalCMinusMax);
                    $("#piEcoGoalDPlusMin").val(request.sendData.economy.piEcoGoalDPlusMin);
                    $("#piEcoGoalDPlusMax").val(request.sendData.economy.piEcoGoalDPlusMax);
                    $("#piEcoGoalDMinusMin").val(request.sendData.economy.piEcoGoalDMinusMin);
                    $("#piEcoGoalDMinusMax").val(request.sendData.economy.piEcoGoalDMinusMax);
                    $("#piEcoGoalEMax").val(request.sendData.economy.piEcoGoalEMax);

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

// 정책성
function policySettingSave(){

    JWT_Get();

    let url;

    if (accessToken == null && refreshToken == null && insert_id == null) {
        // console.log("callinfo(userid)함수 : 토큰&리플레시&로그인한아이디 Null");
        alertCaution("토큰이 만료되었습니다.<BR>다시 로그인해주세요.", 2);
    } else {

        const $piPolicyValidityA = $("#piPolicyValidityA");
        const $piPolicyValidityB = $("#piPolicyValidityB");
        const $piPolicyValidityC = $("#piPolicyValidityC");
        const $piPolicyValidityD = $("#piPolicyValidityD");
        if($piPolicyValidityA.val()===""){
            $piPolicyValidityA.val("100")
        }
        if($piPolicyValidityB.val()===""){
            $piPolicyValidityB.val("80")
        }
        if($piPolicyValidityC.val()===""){
            $piPolicyValidityC.val("30")
        }
        if($piPolicyValidityD.val()===""){
            $piPolicyValidityD.val("0")
        }

        const $piPolicyResponValueA = $("#piPolicyResponValueA");
        const $piPolicyResponValueB = $("#piPolicyResponValueB");
        const $piPolicyResponValueC = $("#piPolicyResponValueC");
        const $piPolicyResponScoreA = $("#piPolicyResponScoreA");
        const $piPolicyResponScoreB = $("#piPolicyResponScoreB");
        const $piPolicyResponScoreC = $("#piPolicyResponScoreC");
        if($piPolicyResponValueA.val()===""){
            $piPolicyResponValueA.val("3")
        }
        if($piPolicyResponValueB.val()===""){
            $piPolicyResponValueB.val("1")
        }
        if($piPolicyResponValueC.val()===""){
            $piPolicyResponValueC.val("0")
        }
        if($piPolicyResponScoreA.val()===""){
            $piPolicyResponScoreA.val("100")
        }
        if($piPolicyResponScoreB.val()===""){
            $piPolicyResponScoreB.val("50")
        }
        if($piPolicyResponScoreC.val()===""){
            $piPolicyResponScoreC.val("30")
        }

        const piPolicyVersatilityAMin = $("#piPolicyVersatilityAMin");
        const piPolicyVersatilityAScore = $("#piPolicyVersatilityAScore");
        const piPolicyVersatilityBMin = $("#piPolicyVersatilityBMin");
        const piPolicyVersatilityBMax = $("#piPolicyVersatilityBMax");
        const piPolicyVersatilityBScore = $("#piPolicyVersatilityBScore");
        const piPolicyVersatilityCMin = $("#piPolicyVersatilityCMin");
        const piPolicyVersatilityCMax = $("#piPolicyVersatilityCMax");
        const piPolicyVersatilityCScore = $("#piPolicyVersatilityCScore");
        const piPolicyVersatilityDMin = $("#piPolicyVersatilityDMin");
        const piPolicyVersatilityDMax = $("#piPolicyVersatilityDMax");
        const piPolicyVersatilityDScore = $("#piPolicyVersatilityDScore");
        const piPolicyVersatilityEMax = $("#piPolicyVersatilityEMax");
        const piPolicyVersatilityEScore = $("#piPolicyVersatilityEScore");
        if(piPolicyVersatilityAMin.val()===""){
            piPolicyVersatilityAMin.val("20000")
        }
        if(piPolicyVersatilityAScore.val()===""){
            piPolicyVersatilityAScore.val("100")
        }
        if(piPolicyVersatilityBMin.val()===""){
            piPolicyVersatilityBMin.val("10000")
        }
        if(piPolicyVersatilityBMax.val()===""){
            piPolicyVersatilityBMax.val("19999")
        }
        if(piPolicyVersatilityBScore.val()===""){
            piPolicyVersatilityBScore.val("80")
        }
        if(piPolicyVersatilityCMin.val()===""){
            piPolicyVersatilityCMin.val("5000")
        }
        if(piPolicyVersatilityCMax.val()===""){
            piPolicyVersatilityCMax.val("9999")
        }
        if(piPolicyVersatilityCScore.val()===""){
            piPolicyVersatilityCScore.val("60")
        }
        if(piPolicyVersatilityDMin.val()===""){
            piPolicyVersatilityDMin.val("3000")
        }
        if(piPolicyVersatilityDMax.val()===""){
            piPolicyVersatilityDMax.val("4999")
        }
        if(piPolicyVersatilityDScore.val()===""){
            piPolicyVersatilityDScore.val("50")
        }
        if(piPolicyVersatilityEMax.val()===""){
            piPolicyVersatilityEMax.val("2999")
        }
        if(piPolicyVersatilityEScore.val()===""){
            piPolicyVersatilityEScore.val("30")
        }

        const $piPolicyGoalAPlusMin = $("#piPolicyGoalAPlusMin");
        const $piPolicyGoalAPlusMax = $("#piPolicyGoalAPlusMax");
        const $piPolicyGoalAMinusMin = $("#piPolicyGoalAMinusMin");
        const $piPolicyGoalAMinusMax = $("#piPolicyGoalAMinusMax");
        const $piPolicyGoalBPlusMin = $("#piPolicyGoalBPlusMin");
        const $piPolicyGoalBPlusMax = $("#piPolicyGoalBPlusMax");
        const $piPolicyGoalBMinusMin = $("#piPolicyGoalBMinusMin");
        const $piPolicyGoalBMinusMax = $("#piPolicyGoalBMinusMax");
        const $piPolicyGoalCPlusMin = $("#piPolicyGoalCPlusMin");
        const $piPolicyGoalCPlusMax = $("#piPolicyGoalCPlusMax");
        const $piPolicyGoalCMinusMin = $("#piPolicyGoalCMinusMin");
        const $piPolicyGoalCMinusMax = $("#piPolicyGoalCMinusMax");
        const $piPolicyGoalDPlusMin = $("#piPolicyGoalDPlusMin");
        const $piPolicyGoalDPlusMax = $("#piPolicyGoalDPlusMax");
        const $piPolicyGoalDMinusMin = $("#piPolicyGoalDMinusMin");
        const $piPolicyGoalDMinusMax = $("#piPolicyGoalDMinusMax");
        const $piPolicyGoalEMax = $("#piPolicyGoalEMax");

        if($piPolicyGoalAPlusMin.val()===""){
            $piPolicyGoalAPlusMin.val("90")
        }
        if($piPolicyGoalAPlusMax.val()===""){
            $piPolicyGoalAPlusMax.val("100")
        }
        if($piPolicyGoalAMinusMin.val()===""){
            $piPolicyGoalAMinusMin.val("80")
        }
        if($piPolicyGoalAMinusMax.val()===""){
            $piPolicyGoalAMinusMax.val("89")
        }
        if($piPolicyGoalBPlusMin.val()===""){
            $piPolicyGoalBPlusMin.val("70")
        }
        if($piPolicyGoalBPlusMax.val()===""){
            $piPolicyGoalBPlusMax.val("79")
        }
        if($piPolicyGoalBMinusMin.val()===""){
            $piPolicyGoalBMinusMin.val("60")
        }
        if($piPolicyGoalBMinusMax.val()===""){
            $piPolicyGoalBMinusMax.val("69")
        }
        if($piPolicyGoalCPlusMin.val()===""){
            $piPolicyGoalCPlusMin.val("55")
        }
        if($piPolicyGoalCPlusMax.val()===""){
            $piPolicyGoalCPlusMax.val("59")
        }
        if($piPolicyGoalCMinusMin.val()===""){
            $piPolicyGoalCMinusMin.val("50")
        }
        if($piPolicyGoalCMinusMax.val()===""){
            $piPolicyGoalCMinusMax.val("54")
        }
        if($piPolicyGoalDPlusMin.val()===""){
            $piPolicyGoalDPlusMin.val("45")
        }
        if($piPolicyGoalDPlusMax.val()===""){
            $piPolicyGoalDPlusMax.val("49")
        }
        if($piPolicyGoalDMinusMin.val()===""){
            $piPolicyGoalDMinusMin.val("40")
        }
        if($piPolicyGoalDMinusMax.val()===""){
            $piPolicyGoalDMinusMax.val("44")
        }
        if($piPolicyGoalEMax.val()===""){
            $piPolicyGoalEMax.val("39")
        }

        const formData = new FormData(document.getElementById('policyForm'))

        url = $("#backend_protocol").val() + "://" + $("#backend_url").val() + "/api/performance/reference/policySave"; // 호출할 백엔드 API
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
                    // console.log("적용완료");
                    alertSuccess("적용 완료했습니다.");
                    policySettingData();
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

// 정책성 데이터 호출
function policySettingData(){
    JWT_Get();

    let url;

    if (accessToken == null && refreshToken == null && insert_id == null) {
        // console.log("callinfo(userid)함수 : 토큰&리플레시&로그인한아이디 Null");
        alertCaution("토큰이 만료되었습니다.<BR>다시 로그인해주세요.", 2);
    } else if (accessToken == null) {
        refreshTokenCookie();
    } else {

        url = $("#backend_protocol").val() + "://" + $("#backend_url").val() + "/api/performance/reference/policyData"; // 호출할 백엔드 API
        // console.log("url : " + url);
        $.ajax({
            url: url,
            type: 'GET',
            cache: false,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("JWT_AccessToken", accessToken);
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

                    $("#piPolicyValidityA").val(request.sendData.policy.piPolicyValidityA);
                    $("#piPolicyValidityB").val(request.sendData.policy.piPolicyValidityB);
                    $("#piPolicyValidityC").val(request.sendData.policy.piPolicyValidityC);
                    $("#piPolicyValidityD").val(request.sendData.policy.piPolicyValidityD);

                    $("#piPolicyResponValueA").val(request.sendData.policy.piPolicyResponValueA);
                    $("#piPolicyResponValueB").val(request.sendData.policy.piPolicyResponValueB);
                    $("#piPolicyResponValueC").val(request.sendData.policy.piPolicyResponValueC);
                    $("#piPolicyResponScoreA").val(request.sendData.policy.piPolicyResponScoreA);
                    $("#piPolicyResponScoreB").val(request.sendData.policy.piPolicyResponScoreB);
                    $("#piPolicyResponScoreC").val(request.sendData.policy.piPolicyResponScoreC);

                    $("#piPolicyVersatilityAMin").val(request.sendData.policy.piPolicyVersatilityAMin);
                    $("#piPolicyVersatilityAScore").val(request.sendData.policy.piPolicyVersatilityAScore);
                    $("#piPolicyVersatilityBMin").val(request.sendData.policy.piPolicyVersatilityBMin);
                    $("#piPolicyVersatilityBMax").val(request.sendData.policy.piPolicyVersatilityBMax);
                    $("#piPolicyVersatilityBScore").val(request.sendData.policy.piPolicyVersatilityBScore);
                    $("#piPolicyVersatilityCMin").val(request.sendData.policy.piPolicyVersatilityCMin);
                    $("#piPolicyVersatilityCMax").val(request.sendData.policy.piPolicyVersatilityCMax);
                    $("#piPolicyVersatilityCScore").val(request.sendData.policy.piPolicyVersatilityCScore);
                    $("#piPolicyVersatilityDMin").val(request.sendData.policy.piPolicyVersatilityDMin);
                    $("#piPolicyVersatilityDMax").val(request.sendData.policy.piPolicyVersatilityDMax);
                    $("#piPolicyVersatilityDScore").val(request.sendData.policy.piPolicyVersatilityDScore);
                    $("#piPolicyVersatilityEMax").val(request.sendData.policy.piPolicyVersatilityEMax);
                    $("#piPolicyVersatilityEScore").val(request.sendData.policy.piPolicyVersatilityEScore);

                    $("#piPolicyGoalAPlusMin").val(request.sendData.policy.piPolicyGoalAPlusMin);
                    $("#piPolicyGoalAPlusMax").val(request.sendData.policy.piPolicyGoalAPlusMax);
                    $("#piPolicyGoalAMinusMin").val(request.sendData.policy.piPolicyGoalAMinusMin);
                    $("#piPolicyGoalAMinusMax").val(request.sendData.policy.piPolicyGoalAMinusMax);
                    $("#piPolicyGoalBPlusMin").val(request.sendData.policy.piPolicyGoalBPlusMin);
                    $("#piPolicyGoalBPlusMax").val(request.sendData.policy.piPolicyGoalBPlusMax);
                    $("#piPolicyGoalBMinusMin").val(request.sendData.policy.piPolicyGoalBMinusMin);
                    $("#piPolicyGoalBMinusMax").val(request.sendData.policy.piPolicyGoalBMinusMax);
                    $("#piPolicyGoalCPlusMin").val(request.sendData.policy.piPolicyGoalCPlusMin);
                    $("#piPolicyGoalCPlusMax").val(request.sendData.policy.piPolicyGoalCPlusMax);
                    $("#piPolicyGoalCMinusMin").val(request.sendData.policy.piPolicyGoalCMinusMin);
                    $("#piPolicyGoalCMinusMax").val(request.sendData.policy.piPolicyGoalCMinusMax);
                    $("#piPolicyGoalDPlusMin").val(request.sendData.policy.piPolicyGoalDPlusMin);
                    $("#piPolicyGoalDPlusMax").val(request.sendData.policy.piPolicyGoalDPlusMax);
                    $("#piPolicyGoalDMinusMin").val(request.sendData.policy.piPolicyGoalDMinusMin);
                    $("#piPolicyGoalDMinusMax").val(request.sendData.policy.piPolicyGoalDMinusMax);
                    $("#piPolicyGoalEMax").val(request.sendData.policy.piPolicyGoalEMax);

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

// 물가배수 등록
function priceSave(){
    JWT_Get();

    if (accessToken == null && refreshToken == null && insert_id == null) {
        alertCaution("토큰이 만료되었습니다.<BR>다시 로그인해주세요.", 2);
    } else {

        let url;

        const params = {
            piYear: $("#piYear").val(),
            piPrice: $("#piPrice").val()
        };

        url = $("#backend_protocol").val() + "://" + $("#backend_url").val() + "/api/price/save"; // 호출할 백엔드 API

        $.ajax({
            url: url,
            type: 'post',
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
                } else {
                    // console.log("request.status : " + request.status + " => 404에러");
                    alertCaution("404에러 재로그인 해주세요.", 2);
                }
            },
            success: function (res) {
                if (res.status === 200) {
                    $("#piYear").val("");
                    $("#piPrice").val("");
                    alertSuccess("물가배수를 등록했습니다.");
                    priceCallList(1,2);
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

// 물가배수 조회
function priceCallList(page,num){
    JWT_Get();

    if (accessToken == null && refreshToken == null && insert_id == null) {
        // console.log("callinfo(userid)함수 : 토큰&리플레시&로그인한아이디 Null");
        alertCaution("토큰이 만료되었습니다.<BR>다시 로그인해주세요.", 2);
    }else {

        if(num === 1){
            logreg(0,"기초정보","물가지수 리스트 조회",null);
        }
        let url;

        page = page - 1;
        if (page < 0) page = 0

        const perPage = 10;
        const perArea = 5;
        let totCnt = 0;

        const $tableListYearCost = $('#tableListYearCost');
        const $totalCnt = $('#totalCnt');

        const params = {
            piYearSearch: $("#piYearSearch").val(),
            piPriceSearch: $("#piPriceSearch").val()
        };

        $tableListYearCost.empty().append('<tr ><td colspan="3" align = "center">조회 중</td></tr>');
        $totalCnt.text('0');

        url = $("#backend_protocol").val() + "://" + $("#backend_url").val() + "/api/price/list"; // 호출할 백엔드 API

        $.ajax({
            url: url + '?size=' + perPage + '&page=' + page,
            type: 'GET',
            data: params,
            cache: false,
            error: function (request) {
                ajaxErrorMsg(request);
            },
            success: function (res) {
                // console.log("리스트출력");
                if (res.status === 200) {
                    //화면 출력
                    totCnt = res.total_rows;
                    $("#pricePaging").jqueryPager({
                        pageSize: perPage,
                        pageBlock: perArea,
                        currentPage: page + 1,
                        pageTotal: totCnt,
                        clickEvent: 'priceCallList'
                    });

                    if (totCnt === 0) {
                        $tableListYearCost.empty().append('<tr class="t-c"><td colspan="3" align="center">조회된 데이터가 없습니다.</td></tr>');
                        return;
                    }

                    $totalCnt.text(totCnt);
                    let html = '';
                    $.each(res.datalist, function (key, value) {
                        html += '<tr>';
                        html += '<td >' + echoNull2Blank(value.piYear) + '</td>';
                        html += '<td >' + echoNull2Blank(value.piPrice) + '</td>';
                        html += '<td ><button class="c-button" onclick="priceDel(\'' + echoNull2Blank(value.id) + '\');">삭제</button></td>';
                        html += '</tr>';
                    });
                    $tableListYearCost.html(html);
                }
            }
        });
    }
}

// 물가배수 삭제조회
function priceDel(id){
    JWT_Get();

    if (accessToken == null && refreshToken == null && insert_id == null) {
        alertCaution("토큰이 만료되었습니다.<BR>다시 로그인해주세요.", 2);
    } else {

        let url;

        const params = {
            id: id
        };

        url = $("#backend_protocol").val() + "://" + $("#backend_url").val() + "/api/price/del"; // 호출할 백엔드 API

        $.ajax({
            url: url,
            type: 'post',
            data: params,
            cache: false,
            error: function (request) {
                ajaxErrorMsg(request);
            },
            success: function (res) {
                console.log("리스트출력");
                if (res.status === 200) {
                    alertSuccess("삭제가 완료되었습니다.");
                    priceCallList(1,2);
                }
            }
        });
    }
}