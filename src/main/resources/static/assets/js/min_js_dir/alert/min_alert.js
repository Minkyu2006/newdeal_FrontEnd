$(function() {

    // $(document).on("click","#checksuccessBtn",function(){
    //     //console.log("확인버튼누름")
    //     alertSuccess('성공!');
    // })

    $(document).on("click","#cautionBtn1",function(){
        $('#popupId').remove();
    });

    $(document).on("click","#cautionBtn2",function(){
        location.href="/login";
        $('#popupId').remove();
    });

    $(document).on("click","#successBtn",function(){
        $('#popupId').remove();
    });

    $(document).on("click","#answerYes",function(){
        $('#popupId').remove();
        excelSend();
    });

    $(document).on("click","#answerNo",function(){
        $('#popupId').remove();
    });

    $(document).on("click","#answerYesSnw",function(){
        $('#popupId').remove();
    });

    $(document).on("click","#answerNoSnw",function(){
        $('#popupId').remove();
    });

    $(document).on("click","#checkYesBtn",function(){
        startYesorNo(true)
    });
    $(document).on("click","#checkNoBtn",function(){
        startYesorNo(false)
    });

    $(document).on("click","#weightCheckYesBtn",function(){
        $('#popupId').remove();

        const chapter =$("#chapter").val();
        console.log("chapter : "+chapter);

        const businessNum = $("#businessNum").val();
        console.log("businessNum : "+businessNum);

        if(chapter === "0") { // 사업평가 대상이 아님에도 평가를 시행할지(확인)
            $('#choicePop').addClass('open');
        }

        else if(chapter === "1"){ // 안전등급, 목표안전등급 그대로진행 물음
            inputPerformanceNext1();
        }

        else if(chapter === "2"){ // 성능개선 사업구분 별 가중치 기술성
            upWeightCheckEco();
        }else if(chapter === "3"){ // 성능개선 사업구분 별 가중치 경제성
            upWeightCheckPolicy();
        }else if(chapter === "4"){ // 성능개선 사업구분 별 가중치 정책성
            downWeightCheckTech();
        }else if(chapter === "5") { // 평가지표별 가중치 - 사용성
            downWeightCheckTechUsability(businessNum);
        }else if(chapter === "6") { // 평가지표별 가중치 - 노후도
            downWeightCheckTechOld(businessNum);
        }else if(chapter === "7") { // 평가지표별 가중치 - 지체도
            downWeightCheckTechUrgency(businessNum);
        }else if(chapter === "8") { // 평가지표별 가중치 - 목표달성도
            downWeightCheckTechGoal(businessNum);
        }

        else if(chapter === "9") { // 평가지표별 가중치 - 안전효용개선 or 사업규모등급
            downWeightCheckEcoSafeUtility(businessNum);
        }else if(chapter === "10") { // 평가지표별 가중치 - 자산가치개선 or 사업효율등급
            downWeightCheckEcoCostUtility(businessNum);
        }

        else if(chapter === "11") { // 평가지표별 가중치 - 사업추진 타당성
            downWeightCheckPolicyBusiness(businessNum);
        } else if(chapter === "12") { // 평가지표별 가중치 - 민원 및 사고 대응성
            downWeightCheckPolicyComplaint(businessNum);
        }else if(chapter === "13") { // 평가지표별 가중치 - 사업효과 범용성
            downWeightCheckPolicyEffect(businessNum);
        }else if(chapter === "14"){
            inputPerformanceNext3();
        }

    });
    $(document).on("click","#weightCheckNoBtn",function(){
        $('#popupId').remove();

        const chapter =$("#chapter").val();

        if(chapter === "0") { // 사업평가 대상이 아님에도 평가를 시행할지(취소)
            $("#piInputSkip").val("0");
            $('#falseRadio').addClass('open');
        }

    });

    $(document).on("click","#checkDelSuccessBtn",function(){
        startDel($("#delId").val(),true)
    });
    $(document).on("click","#checkDelCancelBtn",function(){
        startDel($("#delId").val(),false)
    });

    // $('#success').on('click', function() {
    //     //console.log("성공버튼 실행");
    //     alertSuccess('성공!');
    // })
    //
    // $('#fail').on('click', function() {
    //     //console.log("실패버튼 실행");
    //     alertCancel('실패!');
    // })
    //
    // $('#caution').on('click', function() {
    //     //console.log("경고버튼 실행");
    //     alertCaution("경고!");
    // })
    //
    // $('#confirm').on('click', function() {
    //     //console.log("확인버튼 실행")
    //     alertCheck('확인!');
    //
    // })

});

//Ajax 호출시 에러가났을경우의 메세지 함수
function ajaxErrorMsg(request) {
    console.log(request.status+" : 403에러");
    $('.l-popup').removeClass('open');
    alertCaution("토큰이 만료되었습니다.<BR>다시 로그인해주세요.", 2);
}

function alertSuccess(text) { //성공창(삭제성공시),저장성공시
    let html = '';
    html +='<div id="popupId" class="popup popup--dim">';
        html +='<div class="popup__box">';
            html +='<div class="popup__content">';
                html +='<div class="popup__stat success"></div>';
                html +='<div class="popup__text">'+text+'</div>';
            html +='</div>';
            html +='<div class="popup__buttons">';
                html +='<button id="successBtn" class="popup__btn popup__btn--success">확인</button>';
            html +='</div>';
        html +='</div>';
    html +='</div>';

    $('#alertpop').html(html);

}

function alertCancel(text) { //에러창(로그인만료),오류

    let html = '';

    html +='<div id="popupId" class="popup popup--dim">';
        html +='<div class="popup__box">';
            html +='<div class="popup__content">';
                html +='<div class="popup__stat cancel"></div>';
                html +='<div class="popup__text">'+text+'</div>';
           html +='</div>';
            html +='<div class="popup__buttons">';
               html +='<button id="successBtn" class="popup__btn popup__btn--success">확인</button>';
            html +='</div>';
        html +='</div>';
    html +='</div>';

    $('#alertpop').html(html);

}

function alertCaution(text,type) { //경고창
    let cau = "!";
    let html = '';

    html +='<div id="popupId" class="popup popup--dim">';
        html +='<div class="popup__box">';
            html +='<div class="popup__content">';
                html +='<div class="popup__stat caution">'+cau+'</div>';
                html +='<div class="popup__text">'+text+'</div>';
            html +='</div>';
            html +='<div class="popup__buttons">';
            if(type===1){
                html +='<button id="cautionBtn1" class="popup__btn popup__btn--success">확인</button>';
            }else{
                html +='<button id="cautionBtn2" class="popup__btn popup__btn--success">확인</button>';
            }
            html +='</div>';
        html +='</div>';
    html +='</div>';

    $('#alertpop').html(html);

}

// 삭제 알림창.
function alertCheck(text,id) { //정말삭제할껀지확인하는창
    let html = '';

    html +='<div id="popupId" class="popup popup--dim">';
    html +='<div class="popup__box">';
    html +='<div class="popup__content">';
    html +='<div class="popup__stat check"></div>';
    html +='<div class="popup__text">'+text+'</div>';
    html +='</div>';
    html +='<div class="popup__buttons">';
    html +='<input type="hidden" id="delId" value="'+id+'" />';
    html +='<button id="checkDelSuccessBtn" class="popup__btn popup__btn--success">확인</button>';
    html +='<button id="checkDelCancelBtn" class="popup__btn popup__btn--cancel">취소</button>';
    html +='</div>';
    html +='</div>';
    html +='</div>';

    $('#alertpop').html(html);
}

function alertMiddleSaveCheck(text) { // 정말작성할껀지 확인하는창
    let html = '';

    html +='<div id="popupId" class="popup popup--dim">';
    html +='<div class="popup__box">';
    html +='<div class="popup__content">';
    html +='<div class="popup__stat check"></div>';
    html +='<div class="popup__text">'+text+'</div>';
    html +='</div>';
    html +='<div class="popup__buttons">';
    html +='<button id="checkYesBtn" class="popup__btn popup__btn--success">예</button>';
    html +='<button id="checkNoBtn" class="popup__btn popup__btn--cancel">아니오</button>';
    html +='</div>';
    html +='</div>';
    html +='</div>';

    $('#alertpop').html(html);
}

function alertWeightCheck(text) { // 가중치 확인하는창
    let html = '';

    html +='<div id="popupId" class="popup popup--dim">';
    html +='<div class="popup__box" style="width: 400px">';
    html +='<div class="popup__content">';
    html +='<div class="popup__stat check"></div>';
    html +='<div class="popup__text">'+text+'</div>';
    html +='</div>';
    html +='<div class="popup__buttons">';
    html +='<button id="weightCheckYesBtn" class="popup__btn popup__btn--success">예</button>';
    html +='<button id="weightCheckNoBtn" class="popup__btn popup__btn--cancel">아니오</button>';
    html +='</div>';
    html +='</div>';
    html +='</div>';

    $('#alertpop').html(html);
}

function alertYesNo(text) { // 정말작성할껀지 확인하는창
    let html = '';

    html +='<div id="popupId" class="popup popup--dim">';
    html +='<div class="popup__box">';
    html +='<div class="popup__content">';
    html +='<div class="popup__stat check"></div>';
    html +='<div class="popup__text">'+text+'</div>';
    html +='</div>';
    html +='<div class="popup__buttons">';
    html +='<button id="answerYes" class="popup__btn popup__btn--success">예</button>';
    html +='<button id="answerNo" class="popup__btn popup__btn--cancel">아니오</button>';
    html +='</div>';
    html +='</div>';
    html +='</div>';

    $('#alertpop').html(html);
}

function alertYesNoSnw(text) { // 예 아니오 범용창
    let html = '';

    html +='<div id="popupId" class="popup popup--dim">';
    html +='<div class="popup__box">';
    html +='<div class="popup__content">';
    html +='<div class="popup__stat check"></div>';
    html +='<div class="popup__text">'+text+'</div>';
    html +='</div>';
    html +='<div class="popup__buttons">';
    html +='<button id="answerYesSnw" class="popup__btn popup__btn--success">예</button>';
    html +='<button id="answerNoSnw" class="popup__btn popup__btn--cancel">아니오</button>';
    html +='</div>';
    html +='</div>';
    html +='</div>';

    $('#alertpop').html(html);
}

function alertContinueSuccess(text) { //성공창(삭제성공시),저장성공시

    var html = '';

    html +='<div id="popupId" class="popup popup--dim">';
    html +='<div class="popup__box">';
    html +='<div class="popup__content">';
    html +='<div class="popup__stat success"></div>';
    html +='<div class="popup__text">'+text+'</div>';
    html +='</div>';
    html +='<div class="popup__buttons">';
    html +='<button id="continueSuccessBtn" class="popup__btn popup__btn--success">확인</button>';
    html +='</div>';
    html +='</div>';
    html +='</div>';

    $('#alertpop').html(html);

}

function readyPage() {
    alertCaution("아직 준비중인 페이지입니다.",1);
    return false;
}