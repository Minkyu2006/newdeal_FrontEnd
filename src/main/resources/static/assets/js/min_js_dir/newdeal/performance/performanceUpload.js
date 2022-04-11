// * 성능개선사업평가 서비스 자바스크립트 파일업로드페이지*

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
        performanceCheck();
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

        // url = $("#backend_protocol").val()+"://" + $("#backend_url").val() + "/api/performance/excelUpload"; // 호출할 백엔드 API
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
