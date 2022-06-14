// * 성능개선사업평가 서비스 자바스크립트 파일업로드페이지*

// Input 업로드방식 등록용 가중치 셋팅값 가져오기
function weightUploadGet(){

    JWT_Get();

    if (accessToken == null || refreshToken == null || insert_id == null) {
        // console.log("callinfo(userid)함수 : 토큰&리플레시&로그인한아이디 Null");
        alertCaution("토큰이 만료되었습니다.<BR>다시 로그인해주세요.", 2);
    } else {

        let url;

        const $weight_Category = $("#weight_Category").val();
        const param = {
            businessNum : $weight_Category
        }

        url = $("#backend_protocol").val() + "://" + $("#backend_url").val() + "/api/performance/weightUploadGet"; // 호출할 백엔드 API
        // console.log("url : "+url);

        $.ajax({
            url: url,
            type: 'post',
            data: param,
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
                    $("#piWeightCriticalScore").attr("placeholder", 50);

                    // 성능개선 사업구분 노후화대응 가중치
                    if($weight_Category==="노후화대응"){
                        const weightOldSetting = request.sendData.weightSettingOldDto
                        console.log("노후화대응 : "+weightOldSetting);

                        // 성능개선 사업구분 노후화대응 가중치
                        $piWeightSafe.attr("placeholder", weightOldSetting.piOldSafetyStan);
                        $piWeightSafeMin.val(weightOldSetting.piOldSafetyMin);
                        $piWeightSafeMax.val(weightOldSetting.piOldSafetyMax);

                        $piWeightOld.attr("placeholder", weightOldSetting.piOldOldStan);
                        $piWeightOldMin.val(weightOldSetting.piOldOldMin);
                        $piWeightOldMax.val(weightOldSetting.piOldOldMax);

                        $piWeightUrgency.attr("placeholder", weightOldSetting.piOldUrgencyStan);
                        $piWeightUrgencyMin.val(weightOldSetting.piOldUrgencyMin);
                        $piWeightUrgencyMax.val(weightOldSetting.piOldUrgencyMax);

                        $piWeightGoal.attr("placeholder", weightOldSetting.piOldGoalStan);
                        $piWeightGoalMin.val(weightOldSetting.piOldGoalMin);
                        $piWeightGoalMax.val(weightOldSetting.piOldGoalMax);

                        $piWeightSafeUtility.attr("placeholder", weightOldSetting.piOldSafeUtilityStan);
                        $piWeightSafeUtilityMin.val(weightOldSetting.piOldSafeUtilityMin);
                        $piWeightSafeUtilityMax.val(weightOldSetting.piOldSafeUtilityMax);

                        $piWeightCostUtility.attr("placeholder", weightOldSetting.piOldCostUtilityStan);
                        $piWeightCostUtilityMin.val(weightOldSetting.piOldCostUtilityMin);
                        $piWeightCostUtilityMax.val(weightOldSetting.piOldCostUtilityMax);

                        $piWeightBusiness.attr("placeholder", weightOldSetting.piOldBusinessStan);
                        $piWeightBusinessMin.val(weightOldSetting.piOldBusinessMin);
                        $piWeightBusinessMax.val(weightOldSetting.piOldBusinessMax);

                        $piWeightComplaint.attr("placeholder", weightOldSetting.piOldComplaintStan);
                        $piWeightComplaintMin.val(weightOldSetting.piOldComplaintMin);
                        $piWeightComplaintMax.val(weightOldSetting.piOldComplaintMax);

                        $piWeightBusinessEffect.attr("placeholder", weightOldSetting.piOldBusinessEffectStan);
                        $piWeightBusinessEffectMin.val(weightOldSetting.piOldBusinessEffectMin);
                        $piWeightBusinessEffectMax.val(weightOldSetting.piOldBusinessEffectMax);

                    }
                    // 성능개선 사업구분 기준변화 가중치
                    else if($weight_Category==="기준변화"){
                        const weightBaseSetting = request.sendData.weightSettingBaseDto;
                        console.log("기준변화 : "+weightBaseSetting);

                        $piWeightSafe.attr("placeholder", weightBaseSetting.piBaseSafetyStan);
                        $piWeightSafeMin.val(weightBaseSetting.piBaseSafetyMin);
                        $piWeightSafeMax.val(weightBaseSetting.piBaseSafetyMax);

                        $piWeightOld.attr("placeholder", weightBaseSetting.piBaseOldStan);
                        $piWeightOldMin.val(weightBaseSetting.piBaseOldMin);
                        $piWeightOldMax.val(weightBaseSetting.piBaseOldMax);

                        $piWeightSafeUtility.attr("placeholder", weightBaseSetting.piBaseBusinessScaleRankStan);
                        $piWeightSafeUtilityMin.val(weightBaseSetting.piBaseBusinessScaleRankMin);
                        $piWeightSafeUtilityMax.val(weightBaseSetting.piBaseBusinessScaleRankMax);

                        $piWeightCostUtility.attr("placeholder", weightBaseSetting.piBaseBusinessEffectRankStan);
                        $piWeightCostUtilityMin.val(weightBaseSetting.piBaseBusinessEffectRankMin);
                        $piWeightCostUtilityMax.val(weightBaseSetting.piBaseBusinessEffectRankMax);

                        $piWeightBusiness.attr("placeholder", weightBaseSetting.piBaseBusinessStan);
                        $piWeightBusinessMin.val(weightBaseSetting.piBaseBusinessMin);
                        $piWeightBusinessMax.val(weightBaseSetting.piBaseBusinessMax);

                        $piWeightBusinessEffect.attr("placeholder", weightBaseSetting.piBaseBusinessEffectStan);
                        $piWeightBusinessEffectMin.val(weightBaseSetting.piBaseBusinessEffectMin);
                        $piWeightBusinessEffectMax.val(weightBaseSetting.piBaseBusinessEffectMax);

                    }
                    // 성능개선 사업구분 사용성변화 가중치
                    else{
                        const weightUseSetting = request.sendData.weightSettingUseDto;
                        console.log("사용성변화 : "+weightUseSetting);

                        // 성능개선 사업구분 사용성변화 가중치
                        $piWeightSafe.attr("placeholder", weightUseSetting.piUseSafetyStan);
                        $piWeightSafeMin.val(weightUseSetting.piUseSafetyMin);
                        $piWeightSafeMax.val(weightUseSetting.piUseSafetyMax);

                        $piWeightUsability.attr("placeholder", weightUseSetting.piUseUsabilityStan);
                        $piWeightUsabilityMin.val(weightUseSetting.piUseUsabilityMin);
                        $piWeightUsabilityMax.val(weightUseSetting.piUseUsabilityMax);

                        $piWeightOld.attr("placeholder", weightUseSetting.piUseOldStan);
                        $piWeightOldMin.val(weightUseSetting.piUseOldMin);
                        $piWeightOldMax.val(weightUseSetting.piUseOldMax);

                        $piWeightSafeUtility.attr("placeholder", weightUseSetting.piUseBusinessScaleRankStan);
                        $piWeightSafeUtilityMin.val(weightUseSetting.piUseBusinessScaleRankMin);
                        $piWeightSafeUtilityMax.val(weightUseSetting.piUseBusinessScaleRankMax);

                        $piWeightCostUtility.attr("placeholder", weightUseSetting.piUseBusinessEffectRankStan);
                        $piWeightCostUtilityMin.val(weightUseSetting.piUseBusinessEffectRankMin);
                        $piWeightCostUtilityMax.val(weightUseSetting.piUseBusinessEffectRankMax);

                        $piWeightBusiness.attr("placeholder", weightUseSetting.piUseBusinessStan);
                        $piWeightBusinessMin.val(weightUseSetting.piUseBusinessMin);
                        $piWeightBusinessMax.val(weightUseSetting.piUseBusinessMax);

                        $piWeightComplaint.attr("placeholder", weightUseSetting.piUseComplaintStan);
                        $piWeightComplaintMin.val(weightUseSetting.piUseComplaintMin);
                        $piWeightComplaintMax.val(weightUseSetting.piUseComplaintMax);

                        $piWeightBusinessEffect.attr("placeholder", weightUseSetting.piUseBusinessEffectStan);
                        $piWeightBusinessEffectMin.val(weightUseSetting.piUseBusinessEffectMin);
                        $piWeightBusinessEffectMax.val(weightUseSetting.piUseBusinessEffectMax);
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

// 가중치를 수정하시겠습니까?(Yes,no 라디오버튼)
function weightRadioBtn(value){
    if(value==="yes"){
        $('#group1').prop("checked", true);
        $('#group2').prop("checked", false);
        $('.weight__contents input[type="number"]').attr('readonly', false);
    }else{
        $("#group1").prop("checked", false);
        $("#group2").prop("checked", true);
        $('.weight__contents input[type="number"]').attr('readonly', true);
    }
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
        const $weight_Category = $("#weight_Category").val();
        if($weight_Category===""){
            alertCaution("유형을 선택해주세요.",1)
            return false;
        }
        upWeightCheckAdd();
    }
}

// 엑셀파일 업로드
function excelSend() {
    JWT_Get();

    let url;

    if (accessToken == null && refreshToken == null && insert_id == null) {
        // console.log("callinfo(userid)함수 : 토큰&리플레시&로그인한아이디 Null");
        alertCaution("토큰이 만료되었습니다.<BR>다시 로그인해주세요.", 2);
    }
    // else if (accessToken == null) {
    //     refreshTokenCookie();
    // }
    else {

        const formData = new FormData(document.getElementById('fileSendForm'));
        formData.set("piInputSkip",$("#piInputSkip").val());

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
                    $("#excelfile").val('');
                    $('.c-file__input').val('');
                    // console.log("엑셀 데이터 전송 성공");
                    // console.log("autoNum : "+request.sendData.autoNum)
                    $("#piWeightTechnicality").val("");
                    $("#piWeightEconomy").val("");
                    $("#piWeightPolicy").val("");

                    $("#piWeightSafe").val("");
                    $("#piWeightUsability").val("");
                    $("#piWeightOld").val("");
                    $("#piWeightUrgency").val("");
                    $("#piWeightGoal").val("");

                    $("#piWeightSafeUtility").val("");
                    $("#piWeightCostUtility").val("");

                    $("#piWeightBusiness").val("");
                    $("#piWeightComplaint").val("");
                    $("#piWeightBusinessEffect").val("");
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
