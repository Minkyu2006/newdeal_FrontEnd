// * 생애주기 의사결정 지원 서비스 자바스크립트 전체부분 *

// 준공일자, 평가기준일자 월-일 입력 포커스아웃 함수
function dateFocuseOut(name, val){
    let $name = $("#"+name);
    let value;
    if(val.length === 5) {
        if(val.substring(4,5) === "0"){
            $name.val("");
            alertCaution("월을 다시 입력해주시길 바랍니다.",1);
        }else{
            value = val.substring(0,4)+"-0"+val.substring(4,5);
        }
    }else if(val.length === 6) {
        value = val.substring(0,4)+"-"+val.substring(4,7);
    }else if(val.length >= 1 && val.length !== 7) {
        alertCaution("연도와 월을 입력해주시길 바랍니다.<br>현재 입력값 : "+val,1);
    }
    $name.val(value);
}

// 글 수정 로직 메서드
function lifeAllTimeUpdate(){
    const $ltId = $("#ltId");
    if($ltId.val() !== "0"){
        console.log("수정로직을 탑니다.");

        // 해당 ltId의 값들 밀어넣기
        $("#saveBtn").html("수정완료");

        JWT_Get();

        if (accessToken == null || refreshToken == null || insert_id == null) {
            // console.log("callinfo(userid)함수 : 토큰&리플레시&로그인한아이디 Null");
            alertCaution("토큰이 만료되었습니다.<BR>다시 로그인해주세요.", 2);
        } else {

            let url;
            url = $("#backend_protocol").val() + "://" + $("#backend_url").val() + "/api/lifealltime/info"; // 호출할 백엔드 API
            console.log("url : "+url);

            const params = {
                "ltId" : $ltId.val()
            }
            $.ajax({
                url: url,
                data : params,
                type: 'post',
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
                    console.log("status : " + status);
                    if (status === 200) {
                        console.log("데이터삽입");
                        // console.log(request.sendData.lifeAllTimeDto);

                        $("#ltBridgeCode").val(request.sendData.lifeAllTimeDto.ltBridgeCode);
                        $("#ltBridgeName").val(request.sendData.lifeAllTimeDto.ltBridgeName);
                        $("#ltSpanNum").val(request.sendData.lifeAllTimeDto.ltSpanNum);
                        $("#ltAbsenceCode").val(request.sendData.lifeAllTimeDto.ltAbsenceCode);

                        $("#ltAllTeaRoad").val(request.sendData.lifeAllTimeDto.ltAllTeaRoad);
                        $("#ltAllKind").val(request.sendData.lifeAllTimeDto.ltAllKind);

                        $("#ltAllLength").val(request.sendData.lifeAllTimeDto.ltAllLength);
                        $("#ltAllArea").val(request.sendData.lifeAllTimeDto.ltAllArea);
                        $("#ltAllRank").val(request.sendData.lifeAllTimeDto.ltAllRank);

                        // $("#ltAllCompletionDate").val(request.sendData.lifeAllTimeDto.ltAllCompletionDate.replace('-',''));
                        $("#ltAllCompletionDateYear").val(request.sendData.lifeAllTimeDto.ltAllCompletionDate.substring(0,4));
                        $("#ltAllCompletionDateMoneh").val(request.sendData.lifeAllTimeDto.ltAllCompletionDate.substring(5,7));

                        // $("#ltAllInputDate").val(request.sendData.lifeAllTimeDto.ltAllInputDate.replace('-',''));
                        $("#ltAllInputDateYear").val(request.sendData.lifeAllTimeDto.ltAllInputDate.substring(0,4));
                        $("#ltAllInputDateMonth").val(request.sendData.lifeAllTimeDto.ltAllInputDate.substring(5,7));

                        $("#ltAllStage").val(request.sendData.lifeAllTimeDto.ltAllStage);

                        $("#ltDamageBRank").val(request.sendData.lifeAllTimeDto.ltDamageBRank);
                        $("#ltDamageCRank").val(request.sendData.lifeAllTimeDto.ltDamageCRank);
                        $("#ltDamageDRank").val(request.sendData.lifeAllTimeDto.ltDamageDRank);
                        $("#ltDamageERank").val(request.sendData.lifeAllTimeDto.ltDamageERank);
                        $("#ltDiscountRate").val(request.sendData.lifeAllTimeDto.ltDiscountRate*100);
                        $("#ltIncrease").val(request.sendData.lifeAllTimeDto.ltIncrease*100);

                        $("#ltPeriodicYear").val(request.sendData.lifeAllTimeDto.ltPeriodicYear);
                        $("#ltPeriodicNum").val(request.sendData.lifeAllTimeDto.ltPeriodicNum);
                        $("#ltPeriodicCost").val(comma(request.sendData.lifeAllTimeDto.ltPeriodicCost));

                        $("#ltCloseYear").val(request.sendData.lifeAllTimeDto.ltCloseYear);
                        $("#ltCloseNum").val(request.sendData.lifeAllTimeDto.ltCloseNum);
                        $("#ltCloseCost").val(comma(request.sendData.lifeAllTimeDto.ltCloseCost));

                        $("#ltSafetyYear").val(request.sendData.lifeAllTimeDto.ltSafetyYear);
                        $("#ltSafetyNum").val(request.sendData.lifeAllTimeDto.ltSafetyNum);
                        $("#ltSafetyCost").val(comma(request.sendData.lifeAllTimeDto.ltSafetyCost));

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

// 부재의 따른 세부부재 select box 생성
function absenceSelect(){
    const $choseAbsence = $("#choseAbsence").val();
    console.log("choseAbsence : "+$choseAbsence);
    const $ltAbsenceCode = $("#ltAbsenceCode");
    let html = "";
    if($choseAbsence==="plate"){
        html += "<option value='D1'>"+"콘크리트 바닥판"+"</option>";
        html += "<option value='D2'>"+"강 바닥판"+"</option>";
        html += "<option value='D3'>"+"프리스트레스 콘크리트 바닥판"+"</option>";
        html += "<option value='D4'>"+"중공식 콘크리트 바닥판"+"</option>";
        html += "<option value='D5'>"+"중공식 프리스트레스 콘크리트 바닥판"+"</option>";
        html += "<option value='D6'>"+"콘크리트 슬래브"+"</option>";
        html += "<option value='D7'>"+"프리스트레스 콘크리트 슬래브"+"</option>";
        html += "<option value='D8'>"+"중공식 콘크리트 슬래브"+"</option>";
        html += "<option value='D9'>"+"중공식 프리스트레스 콘크리트 슬래브"+"</option>";
    }else if($choseAbsence==="girder"){
        html += "<option value='G1'>"+"RC T형 거더"+"</option>";
        html += "<option value='G2'>"+"강 I형 거더"+"</option>";
        html += "<option value='G3'>"+"PSC BOX 거더"+"</option>";
        html += "<option value='G4'>"+"강판형 거더"+"</option>";
        html += "<option value='G5'>"+"프리플렉스 거더"+"</option>";
        html += "<option value='G6'>"+"PSCI 거더"+"</option>";
        html += "<option value='G7'>"+"RC BOX 거더"+"</option>";
        html += "<option value='G8'>"+"ST BOX 거더"+"</option>";
    }else{
        html += "<option value='BP1'>"+"콘크리트 포장"+"</option>";
        html += "<option value='BP2'>"+"아스팔트 포장"+"</option>";
    }
    $ltAbsenceCode.html(html);
}

// 생애주기 이진혁박사 부분 저장
function lifeAllTimeSave(){
    JWT_Get();

    if (accessToken == null || refreshToken == null || insert_id == null) {
        // console.log("callinfo(userid)함수 : 토큰&리플레시&로그인한아이디 Null");
        alertCaution("토큰이 만료되었습니다.<BR>다시 로그인해주세요.", 2);
    } else {

        if($("#ltBridgeName").val()==="") {
            alertCaution("교량명을 작성해주세요.", 1)
            return false;
        }

        if($("#ltSpanNum").val()==="") {
            alertCaution("경간수를 작성해주세요.", 1)
            return false;
        }

        if($("#ltAllTeaRoad").val()==="") {
            alertCaution("차로수를 작성해주세요.", 1)
            return false;
        }

        if($("#ltAllLength").val()==="") {
            alertCaution("연장(m)을 작성해주세요.", 1)
            return false;
        }

        if($("#ltAllArea").val()==="") {
            alertCaution("폭(m)을 작성해주세요.", 1)
            return false;
        }

        const $ltAllCompletionDateYear = $("#ltAllCompletionDateYear");
        if($ltAllCompletionDateYear.val()==="") {
            alertCaution("준공일자를 입력해주세요.", 1)
            return false;
        }

        const $ltAllInputDateYear = $("#ltAllInputDateYear");
        if($ltAllInputDateYear.val()==="") {
            alertCaution("평가기준일자를 입력해주세요.", 1)
            return false;
        }

        if($("#ltDamageBRank").val()==="") {
            alertCaution("B등급 손상지수를 작성해주세요.", 1)
            return false;
        }

        if($("#ltDamageCRank").val()==="") {
            alertCaution("C등급 손상지수를 작성해주세요.", 1)
            return false;
        }

        if($("#ltDamageDRank").val()==="") {
            alertCaution("D등급 손상지수를 작성해주세요.", 1)
            return false;
        }

        if($("#ltDamageERank").val()==="") {
            alertCaution("E등급 손상지수를 작성해주세요.", 1)
            return false;
        }

        if($("#ltAllVolume").val()==="") {
            alertCaution("전체물량을 작성해주세요.", 1)
            return false;
        }

        if($("#ltDiscountRate").val()==="") {
            alertCaution("할인율을 작성해주세요.", 1)
            return false;
        }

        if($("#ltIncrease").val()==="") {
            alertCaution("열화증가율을 작성해주세요.", 1)
            return false;
        }

        if($("#ltPeriodicFrequency").val()==="") {
            alertCaution("정기점검 빈도수를 입력해주세요.", 1)
            return false;
        }

        const $ltPeriodicCost = $("#ltPeriodicCost");
        if($ltPeriodicCost.val()==="") {
            alertCaution("정기점검 비용을 입력해주세요.", 1)
            return false;
        }else{
            $ltPeriodicCost.val($ltPeriodicCost.val().replaceAll(",",""));
        }

        if($("#ltCloseFrequency").val()==="") {
            alertCaution("정밀점검 빈도수를 입력해주세요.", 1)
            return false;
        }

        const $ltCloseCost = $("#ltCloseCost");
        if($ltCloseCost.val()==="") {
            alertCaution("정밀점검 비용을 입력해주세요.", 1)
            return false;
        }else{
            $ltCloseCost.val($ltCloseCost.val().replaceAll(",",""));
        }

        if($("#ltSafetyFrequency").val()==="") {
            alertCaution("정밀안전점검 빈도수를 입력해주세요.", 1)
            return false;
        }

        const $ltSafetyCost = $("#ltSafetyCost");
        if($ltSafetyCost.val()==="") {
            alertCaution("정밀안전점검 비용을 입력해주세요.", 1)
            return false;
        }else{
            $ltSafetyCost.val($ltSafetyCost.val().replaceAll(",",""));
        }

        const $ltAbsence = $("#ltAbsence");
        if($ltAbsence.val() === "1") {
            $ltAbsence.val("RC 슬래브교");
        }else if($ltAbsence.val() === "2") {
            $ltAbsence.val("라멘교");
        }else if($ltAbsence.val() === "3") {
            $ltAbsence.val("PSC I형교");
        }else if($ltAbsence.val() === "4") {
            $ltAbsence.val("강상자형교");
        }else if($ltAbsence.val() === "5") {
            $ltAbsence.val("RC T형교");
        }else if($ltAbsence.val() === "6") {
            $ltAbsence.val("PSC Box형교");
        }else if($ltAbsence.val() === "7") {
            $ltAbsence.val("PSC 슬래브교");
        }else if($ltAbsence.val() === "8") {
            $ltAbsence.val("Preflex형교");
        }else{
            $ltAbsence.val("형식없음");
        }

        const formData = new FormData(document.getElementById('lifeAllTimeForm'));
        formData.set("ltAllCompletionDate", $ltAllCompletionDateYear.val()+$("#ltAllCompletionDateMoneh").val());
        formData.set("ltAllInputDate", $ltAllInputDateYear.val()+$("#ltAllInputDateMonth").val());

        let url;
        url = $("#backend_protocol").val() + "://" + $("#backend_url").val() + "/api/lifealltime/save"; // 호출할 백엔드 API


        console.log("url : "+url);

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
                console.log("status : " + status);
                if (status === 200) {
                    console.log("저장성공");
                    alertLink(request.sendData.getId);
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
function alertLink(id) {
    $(document).on("click","#successBtn",function(){
        location.href = "/lifetime/all/" + id;
        $('#popupId').remove();
    });
}

function lifeAllTimeOutput(id){

    JWT_Get();

    if (accessToken == null || refreshToken == null || insert_id == null) {
        alertCaution("토큰이 만료되었습니다.<BR>다시 로그인해주세요.", 2);
    } else {

        console.log("호출성공 id : "+id);

        const params = {
            id : id,
        }

        let url;
        url = $("#backend_protocol").val() + "://" + $("#backend_url").val() + "/api/lifealltime/output"; // 호출할 백엔드 API
        console.log("url : "+url);

        $.ajax({
            url: url,
            type: 'post',
            data: params,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("JWT_AccessToken", accessToken);
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
                console.log("status : " + status);
                if (status === 200) {
                    console.log("아웃풋 호출성공");
                    // location.href = "/lifetime/detail/"+$absence;
                    // <button type="button" onClick="location.href='joinUs.jsp' ">회원가입</button>
                    let choseAbsence;
                    if(request.sendData.lifeAllTimeDto.ltAbsenceCode.substring(0,1) === "D"){
                        choseAbsence = "plate"
                    }else{
                        choseAbsence = "girder"
                    }
                    let absence;
                    const ltAbsence = request.sendData.lifeAllTimeDto.ltAbsence;
                    if(ltAbsence === "RC 슬래브교") {
                        absence = "1";
                    }else if(ltAbsence === "라멘교") {
                        absence = "2";
                    }else if(ltAbsence === "PSC I형교") {
                        absence = "3";
                    }else if(ltAbsence === "강상자형교") {
                        absence = "4";
                    }else if(ltAbsence === "RC T형교") {
                        absence = "5";
                    }else if(ltAbsence === "PSC Box형교") {
                        absence = "6";
                    }else if(ltAbsence === "PSC 슬래브교") {
                        absence = "7";
                    }else if(ltAbsence === "Preflex형교") {
                        absence = "8";
                    }else{
                        absence = "0";
                    }

                    const updateUrl = '/lifetime/all/'+choseAbsence+'/'+absence+'/'+request.sendData.lifeAllTimeDto.id;

                    // location.href = "/lifetime/all/"+$choseAbsence+"/"+$absence+"/0";
                    // $("#updateBtn").href("location.href=/lifetime/all/"+choseAbsence+"/"+absence+"/"+request.sendData.lifeAllTimeDto.ltId)
                    document.getElementById("updateBtn").setAttribute("onclick",` location.href='${updateUrl}' `);
                    // console.log("lifeAllTimeDto : " + request.sendData.lifeAllTimeDto);
                    // console.log("periodicCountList : " + request.sendData.periodicCountList);
                    // console.log("closeCountList : " + request.sendData.closeCountList);
                    // console.log("safetyCountList : " + request.sendData.safetyCountList);
                    // console.log("checkCostList : " + request.sendData.checkCostList);
                    // console.log("managementCostList : " + request.sendData.managementCostList);
                    // console.log("ltAbsenceName : " + request.sendData.ltAbsenceName);

                    $('#ltBridgeCode').text(request.sendData.lifeAllTimeDto.ltBridgeCode);
                    $('#ltBridgeName').text(request.sendData.lifeAllTimeDto.ltBridgeName);
                    $('#ltAbsence').text(request.sendData.lifeAllTimeDto.ltAbsence);
                    $('#ltAllRank').text(request.sendData.lifeAllTimeDto.ltAllRank);
                    $('#ltSpanNum').text(request.sendData.lifeAllTimeDto.ltSpanNum);
                    $('#ltAbsenceName').text(request.sendData.ltAbsenceName);

                    $('#ltAllTeaRoad').text(request.sendData.lifeAllTimeDto.ltAllTeaRoad);
                    $('#ltAllKind').text(request.sendData.lifeAllTimeDto.ltAllKind);
                    $('#ltAllLength').text(request.sendData.lifeAllTimeDto.ltAllLength+'m');
                    $('#ltAllArea').text(request.sendData.lifeAllTimeDto.ltAllArea+'m');

                    const ltAllCompletionDate = request.sendData.lifeAllTimeDto.ltAllCompletionDate;
                    const year = ltAllCompletionDate.substring(0, 4);
                    const month = ltAllCompletionDate.substring(5,7);
                    $('#ltAllCompletionDate').text(year+'년 '+month+'월');

                    const ltAllInputDate = request.sendData.lifeAllTimeDto.ltAllInputDate;
                    const year2 = ltAllInputDate.substring(0, 4);
                    const month2 = ltAllInputDate.substring(5,7);
                    $('#ltAllInputDate').text(year2+'년 '+month2+'월');
                    $('#ltAllStage').text(request.sendData.lifeAllTimeDto.ltAllStage);

                    $('#allVolume').text(request.sendData.lifeAllTimeDto.ltAllLength*request.sendData.lifeAllTimeDto.ltAllArea+'m²');

                    // 대표보수 보강공법 수행효과  수행 전 손상지수
                    $('#damageBScoreBefore').text(request.sendData.lifeAllTimeDto.ltDamageBRank);
                    $('#damageCScoreBefore').text(request.sendData.lifeAllTimeDto.ltDamageCRank);
                    $('#damageDScoreBefore').text(request.sendData.lifeAllTimeDto.ltDamageDRank);
                    $('#damageEScoreBefore').text(request.sendData.lifeAllTimeDto.ltDamageERank);

                    // 대표보수 보강공법 수행효과  수행 후 손상지수
                    $('#damageBScoreAfter').text(request.sendData.damageScoreList[0].toFixed(2));
                    $('#damageCScoreAfter').text(request.sendData.damageScoreList[1].toFixed(2));
                    $('#damageDScoreAfter').text(request.sendData.damageScoreList[2].toFixed(2));
                    $('#damageEScoreAfter').text(request.sendData.damageScoreList[3].toFixed(2));
                    $('#damageBRankAfter').text(request.sendData.damageRankListAfter[0]);
                    $('#damageCRankAfter').text(request.sendData.damageRankListAfter[1]);
                    $('#damageDRankAfter').text(request.sendData.damageRankListAfter[2]);
                    $('#damageERankAfter').text(request.sendData.damageRankListAfter[3]);

                    // 대표보수 보강공법 수행효과 비용
                    $('#damageBCost').text(Math.round(request.sendData.costRankList[0]).toLocaleString()+"원");
                    $('#damageCCost').text(Math.round(request.sendData.costRankList[1]).toLocaleString()+"원");
                    $('#damageDCost').text(Math.round(request.sendData.costRankList[2]).toLocaleString()+"원");
                    $('#damageECost').text(Math.round(request.sendData.costRankList[3]).toLocaleString()+"원");

                    $('#discountRate').text(Number(request.sendData.lifeAllTimeDto.ltDiscountRate*100)+'%');
                    $('#increase').text(Number(request.sendData.lifeAllTimeDto.ltIncrease*100)+'%');

                    // $('#ltPeriodicFrequency').text((request.sendData.lifeAllTimeDto.ltPeriodicYear/request.sendData.lifeAllTimeDto.ltPeriodicNum).toFixed(2));
                    $('#ltPeriodicCost').text(pushComma(request.sendData.lifeAllTimeDto.ltPeriodicCost)+"원");
                    $('#ltPeriodicYearNum').text(request.sendData.lifeAllTimeDto.ltPeriodicYear+"년에 "+request.sendData.lifeAllTimeDto.ltPeriodicNum+"회");
                    // $('#ltCloseFrequency').text((request.sendData.lifeAllTimeDto.ltCloseYear/request.sendData.lifeAllTimeDto.ltCloseNum).toFixed(2));
                    $('#ltCloseCost').text(pushComma(request.sendData.lifeAllTimeDto.ltCloseCost)+"원");
                    $('#ltCloseYearNum').text(request.sendData.lifeAllTimeDto.ltCloseYear+"년에 "+request.sendData.lifeAllTimeDto.ltCloseNum+"회");
                    // $('#ltSafetyFrequency').text((request.sendData.lifeAllTimeDto.ltSafetyYear/request.sendData.lifeAllTimeDto.ltSafetyNum).toFixed(2));
                    $('#ltSafetyCost').text(pushComma(request.sendData.lifeAllTimeDto.ltSafetyCost)+"원");
                    $('#ltSafetyYearNum').text(request.sendData.lifeAllTimeDto.ltSafetyYear+"년에 "+request.sendData.lifeAllTimeDto.ltSafetyNum+"회");

                    const $diagnosisTable = $('#diagnosisTable');
                    let html = "";
                    for(let i=0; i<request.sendData.periodicCountList.length; i++){
                        html += '<tr>';
                            html += '<td style="text-align: center;">'+Number(i+1)+'</td>';
                            html += '<td style="text-align: center;">'+request.sendData.periodicCountList[i]+'회'+'</td>';
                            html += '<td style="text-align: center;">'+request.sendData.closeCountList[i]+'회'+'</td>';
                            html += '<td style="text-align: center;">'+request.sendData.safetyCountList[i]+'회'+'</td>';
                            html += '<td style="text-align: right;">'+Math.round(request.sendData.checkCostList[i]).toLocaleString()+'원'+'</td>';
                            html += '<td style="text-align: center;">'+(i+1)+'회'+'</td>';
                            html += '<td style="text-align: center;">'+pushComma(request.sendData.damageRankYearList[i].toFixed(0))+'년'+'</td>';
                            // html += '<td style="text-align: center;">'+request.sendData.performCompletion[i]+'</td>';
                            html += '<td style="text-align: center;">'+request.sendData.costRank[i]+'</td>';
                            html += '<td style="text-align: right;">'+Math.round(request.sendData.discountAccumulateList[i]).toLocaleString()+'원'+'</td>';
                            html += '<td style="text-align: right;">'+Math.round(request.sendData.managementCostList[i]).toLocaleString()+'원'+'</td>';
                            html += '<td style="text-align: right;">'+Math.round(request.sendData.managementCostList2[i]).toLocaleString()+'원'+'</td>';
                            html += '<td style="text-align: right;">'+Math.round(request.sendData.costDownEffect[i]).toLocaleString()+'%'+'</td>';
                        html += '</tr>';
                    }
                    $diagnosisTable.html(html);

                    // $("#chartTitleBridgeName").text(request.sendData.lifeAllTimeDto.ltBridgeName);
                    // console.log(request.sendData.lifeAllTimeDto.ltBridgeName.length);
                    if(request.sendData.lifeAllTimeDto.ltBridgeName.length ===4){
                        $("#chartTitleBridgeName").css("left",440).text(request.sendData.lifeAllTimeDto.ltBridgeName);
                    } else if(request.sendData.lifeAllTimeDto.ltBridgeName.length ===3){
                        $("#chartTitleBridgeName").css("left",460).text(request.sendData.lifeAllTimeDto.ltBridgeName);
                    } else if(request.sendData.lifeAllTimeDto.ltBridgeName.length ===2){
                        $("#chartTitleBridgeName").css("left",480).text(request.sendData.lifeAllTimeDto.ltBridgeName);
                    } else if(request.sendData.lifeAllTimeDto.ltBridgeName.length ===1){
                        $("#chartTitleBridgeName").css("left",500).text(request.sendData.lifeAllTimeDto.ltBridgeName);
                    } else if(request.sendData.lifeAllTimeDto.ltBridgeName.length ===5){
                        $("#chartTitleBridgeName").css("left",420).text(request.sendData.lifeAllTimeDto.ltBridgeName);
                    } else if(request.sendData.lifeAllTimeDto.ltBridgeName.length ===6){
                        $("#chartTitleBridgeName").css("left",400).text(request.sendData.lifeAllTimeDto.ltBridgeName);
                    } else{
                        $("#chartTitleBridgeName").css("left",380).text(request.sendData.lifeAllTimeDto.ltBridgeName);
                    }

                    // console.log("차트 데이터 : "+request.sendData.chartDataList);
                    // amChart
                    am4core.ready(function() { // am4core 시작

                        // 테마설정
                        am4core.useTheme(am4themes_animated);

                        const chart = am4core.create("amChart", am4charts.XYChart);
                        chart.maskBullets = false;

                        // 날짜 데이터
                        // chart.dateFormatter.dateFormat = "MMM YYYY";
                        // chart.numberFormatter.numberFormat = "#.#a";
                        // chart.numberFormatter.bigNumberPrefixes = [
                        //     { "number": 1e+3, "suffix": "K" },
                        //     { "number": 1e+6, "suffix": "M" },
                        //     { "number": 1e+9, "suffix": "B" }
                        // ];

                        // 차트 제목
                        const title = chart.titles.create();
                        title.text = " 유형별 유지관리 시나리오 결과";
                        title.fontSize = 25;
                        title.paddingBottom = 8;

                        chart.data = request.sendData.chartDataList;
                        // console.log(request.sendData.chartDataList);

                        // X축 차트 생성
                        const xAxis = chart.xAxes.push(new am4charts.CategoryAxis);
                        xAxis.dataFields.category = "publicYear";
                        // xAxis.renderer.grid.template.location = 0;
                        xAxis.renderer.minGridDistance = 63; // 범위 조절옵션, fix: 22.07.21 -> 5년단위로 수정
                        xAxis.title.text = "공용연수(Years)";
                        xAxis.renderer.grid.template.disabled = false // x축 라인 제거
                        // xAxis.renderer.labels.template.disabled = true;

                        // Y축 차트 생성
                        const yAxis = chart.yAxes.push(new am4charts.ValueAxis());
                        // valueAxis.renderer.inside = true;
                        // valueAxis.renderer.labels.template.verticalCenter = "bottom";
                        yAxis.renderer.grid.template.disabled = true // y축 라인 제거
                        yAxis.title.text = "상태지수(condition Index,C.I)";
                        yAxis.min = 0;
                        yAxis.max = 1;
                        // valueAxis.strictMinMax = true;
                        // valueAxis.renderer.minGridDistance = 20;
                        // valueAxis.adjustLabelPrecision = false;
                        // valueAxis.renderer.labels.template.dx = -5;
                        // valueAxis.renderer.labels.template.dy = 10;
                        // valueAxis.renderer.maxLabelPosition = 0.95;
                        // valueAxis.title.marginRight = 5;

                        // 현재상태등급 표시
                        function createSeriesTest(field, circleColor, lineColor) {
                            const series = chart.series.push(new am4charts.LineSeries());
                            series.dataFields.categoryX = "publicYear";
                            series.dataFields.valueY = field;
                            series.stroke = lineColor;
                            series.name = "현재 상태등급 : "+request.sendData.lifeAllTimeDto.ltAllRank;

                            // Creating a bullet
                            const bullet = series.bullets.push(new am4plugins_bullets.ShapeBullet());

                            const circle = bullet.createChild(am4core.Circle);
                            circle.radius = 8;
                            circle.fill = circleColor;
                            return series;
                        }
                        createSeriesTest("graphRank", am4core.color("#f89100"), am4core.color("#fff"))

                        // 차트옵션 설정 + 차트설명박스(완)
                        function createSeries(field, name, lineColor,textColor) {
                            const series = chart.series.push(new am4charts.LineSeries());
                            series.dataFields.categoryX = "publicYear";
                            series.dataFields.valueY = field;
                            series.name = name;
                            series.tooltipText = "[bold]{name}[/] \n 공용연수 : [b]{categoryX}년[/] \n 상태지수 : [b]{valueY}[/]";
                            series.strokeWidth = 2;
                            series.smoothing = "monotoneX";
                            series.stroke = lineColor;
                            series.tooltip.getFillFromObject = false;
                            series.tooltip.background.fill = lineColor;
                            series.tooltip.label.fill = textColor;
                            return series;
                        }
                        createSeries("noAction", "무조치시 열화모델", am4core.color("#1c1d66"),am4core.color("#ffffff")); // 무조치시 열화모델 라인색 설정(완)
                        createSeries("current", "현행 유지관리", am4core.color("#5fee83"),am4core.color("#000000")); // 현행 유지관리 라인색 설정(완)
                        createSeries("preemptive", "선제적 유지관리", am4core.color("#6889e2"),am4core.color("#000000")); // 선제적 유지관리 라인색 설정(완)

                        chart.paddingRight = 60;
                        chart.maskBullets = false;

                        // 점선차트 A~D등급
                        function dashSeries(field,color, dashed,number) {
                            const series = chart.series.push(new am4charts.LineSeries());
                            series.dataFields.categoryX = "publicYear";
                            series.dataFields.valueY = field;
                            series.strokeWidth = 2;
                            series.smoothing = "monotoneX";
                            series.stroke = color;
                            series.hiddenInLegend = true; // legend 숨기기

                            // 점선 옵션
                            if (dashed) {
                                series.strokeDasharray = "5 3";
                            }

                            const labelBullet = series.bullets.push(new am4charts.LabelBullet());
                            labelBullet.disabled = true;
                            if(number===1){
                                labelBullet.label.text = request.sendData.aRankValue+"(A)";
                            }else if(number===2){
                                labelBullet.label.text = request.sendData.bRankValue+"(B)";
                            }else if(number===3){
                                labelBullet.label.text = request.sendData.cRankValue+"(C)";
                            }else if(number===4){
                                labelBullet.label.text = request.sendData.dRankValue+"(D)";
                            }

                            labelBullet.fontSize = 17;
                            labelBullet.horizontalCenter = "left";
                            labelBullet.label.horizontalCenter = "left";
                            labelBullet.label.paddingLeft = 10;
                            // labelBullet.propertyFields.disabled = "bulletDisabled";

                            return series;
                        }
                        dashSeries("aRank", am4core.color("#ff7979"),true,1); // A등급 점선 설정(완)
                        dashSeries("bRank", am4core.color("#ff7979"),true,2); // B등급 점선 설정(완)
                        dashSeries("cRank", am4core.color("#ff7979"),true,3); // C등급 점선 설정(완)
                        dashSeries("dRank", am4core.color("#ff7979"),true,4); // D등급 점선 설정(완)

                        // 테스트
                        // function dashSeries2(field,color, dashed,number) {
                        //     const series = chart.series.push(new am4charts.LineSeries());
                        //     series.dataFields.categoryX = "publicYear";
                        //     series.dataFields.valueY = field;
                        //     series.smoothing = "monotoneX";
                        //     series.stroke = color;
                        //
                        //     // series.hiddenInLegend = true; // legend 숨기기
                        //     series.name = "수행 시기";
                        //     series.strokeWidth = 3;
                        //
                        //     // 점선 옵션
                        //     if (dashed) {
                        //         series.strokeDasharray = "5 3";
                        //     }
                        //
                        //     const labelBullet = series.bullets.push(new am4charts.LabelBullet());
                        //     labelBullet.disabled = true;
                        //     if(number===5){
                        //         labelBullet.label.text = name+request.sendData.test1Value;
                        //     }else if(number===6){
                        //         labelBullet.label.text = name+request.sendData.test2Value;
                        //     }else if(number===7){
                        //         labelBullet.label.text = name+request.sendData.test3Value;
                        //     }
                        //     labelBullet.fontSize = 17;
                        //     labelBullet.horizontalCenter = "left";
                        //     labelBullet.label.horizontalCenter = "left";
                        //     labelBullet.label.paddingLeft = 10;
                        //     labelBullet.propertyFields.disabled = "bulletDisabled";
                        //
                        //     return series;
                        // }
                        // dashSeries2("test1", am4core.color("#000000"),true,5); // 세로 눈금 테스트

                        // dashSeries2("test2", am4core.color("#000000"),true,6); // 세로 눈금 테스트
                        // dashSeries2("test3", am4core.color("#000000"),true,7); // 세로 눈금 테스트

                        chart.legend = new am4charts.Legend(); // 항목 상단 오른쪽으로 배치(완)
                        chart.legend.position = "top";
                        chart.legend.contentAlign = "right";

                        chart.cursor = new am4charts.XYCursor(); // x축y축 생성(완)

                        chart.exporting.menu = new am4core.ExportMenu(); // 오른쪽상단 이미지, 데이터 가져올수있는 형식의 메뉴(완)
                        chart.exporting.menu.items = [{
                            "label": "...",
                            "menu": [
                                {
                                    "label": "Image",
                                    "menu": [
                                        { "type": "png", "label": "PNG" },
                                        { "type": "jpg", "label": "JPG" },
                                        { "type": "svg", "label": "SVG" },
                                        // { "type": "pdf", "label": "PDF" }
                                    ]
                                }, {
                                    "label": "Data",
                                    "menu": [
                                        { "type": "json", "label": "JSON" },
                                        { "type": "csv", "label": "CSV" },
                                        // { "type": "xlsx", "label": "XLSX" },
                                        { "type": "html", "label": "HTML" },
                                        // { "type": "pdfdata", "label": "PDF" }
                                    ]
                                },
                                // {
                                //     "label": "Print", "type": "print"
                                // }
                            ]
                        }];

                    }); // am4core 끝

                    $("#result1").html(request.sendData.lifeAllTimeDto.ltBridgeName);
                    // $("#result2").html(request.sendData.result2.toFixed(0)+"년");
                    $("#result3").html(request.sendData.result3+"회");
                    $("#result4").html(pushComma(request.sendData.result4.toFixed(0))+"원");
                    $("#result5").html(request.sendData.lifeAllTimeDto.ltBridgeName);
                    $("#result6").html(pushComma(request.sendData.result6.toFixed(0))+"원");

                    const teableSize = request.sendData.resultTableCnt;
                    // console.log("총 테이블 수 : "+teableSize);

                    const $repairResult1 = $('#repairResult1');
                    let html1 = "";
                    html1 += '<th style="width: 120px;"></th>';
                    for(let i=0; i<teableSize; i++){
                        html1 += '<th>'+Number(i+1)+'차'+'</th>';
                    }
                    $repairResult1.html(html1);

                    const $repairResult2 = $('#repairResult2');
                    let html2 = "";
                    html2 += '<th>현행 유지관리</th>';
                    for(let i=0; i<teableSize; i++){
                        if(request.sendData.damageRankYearList2[i] < 100){
                            html2 += '<td>'+request.sendData.damageRankYearList2[i].toFixed(0)+'년'+'</td>';
                        }else{
                            html2 += '<td></td>';
                        }
                    }
                    $repairResult2.html(html2);

                    const $repairResult3 = $('#repairResult3');
                    let html3 = "";
                    html3 += '<th>선제적 유지관리</th>';
                    for(let i=0; i<teableSize; i++){
                        if(request.sendData.damageRankYearList[i]<100){
                            html3 += '<td>'+request.sendData.damageRankYearList[i].toFixed(0)+'년'+'</td>';
                        }else{
                            html3 += '<td></td>';
                        }
                    }
                    $repairResult3.html(html3);

                    $(".cover__year").text(request.sendData.nowYear);
                    $(".cover__month").text(request.sendData.nowMonth);
                    $(".cover__date").text(request.sendData.nowDate);
                    $("#coverBridgeName").text(request.sendData.lifeAllTimeDto.ltBridgeName);

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

let renderedImg = [];
const contWidth = 200; // 너비(mm) (a4에 맞춤)
const padding = 5; //상하좌우 여백(mm)
// 결과 PDF파일로 출력
function lifetimePDF(){
    const $coverId =  $("#coverId");
    $coverId.css('display','block');

    console.log("PDF출력")
    // console.log("######### PDF 다운로드 시작 #########")

    //로딩 시작
    document.getElementById("loader").style.display = "block";

    const lists = document.querySelectorAll("#lifetimeAll > div.print");
    const deferreds = [];
    const doc = new jsPDF("p", "mm", "a4");
    const listsLeng = lists.length;

    for (let i = 0; i < listsLeng; i++) { // li 개수만큼 이미지 생성
        const deferred = $.Deferred();
        deferreds.push(deferred.promise());
        generateCanvas(i, doc, deferred, lists[i]);
    }

    // 이미지 렌더링이 끝난 후
    $.when.apply($, deferreds).then(function () {
        // 순서대로 정렬
        const sorted = renderedImg.sort(function (a, b) {
            return a.num < b.num ? -1 : 1;
        });

        // 위 여백 (이미지가 들어가기 시작할 y축)
        let   curHeight = padding;
        const sortedLeng = sorted.length;
        for (let i = 0; i < sortedLeng; i++) {
            // 이미지 높이
            const sortedHeight = sorted[i].height;
            // 이미지
            const sortedImage = sorted[i].image;

            // a4 높이에 맞게 남은 공간이 이미지높이보다 작을 경우 페이지 추가
            if( curHeight + sortedHeight > 297 - padding * 2 ){

                // 페이지를 추가함
                doc.addPage();

                // 이미지가 들어갈 y축을 초기 여백값으로 초기화
                curHeight = padding;

                //이미지 넣기
                doc.addImage(sortedImage, 'jpeg', padding , curHeight, contWidth, sortedHeight);

                // y축 = 여백 + 새로 들어간 이미지 높이
                curHeight += sortedHeight;
            } else { // 페이지에 남은 공간보다 이미지가 작으면 페이지 추가하지 않음
                //이미지 넣기
                doc.addImage(sortedImage, 'jpeg', padding , curHeight, contWidth, sortedHeight);
                // y축 = 기존y축 + 새로들어간 이미지 높이
                curHeight += sortedHeight;
            }
        }

        // PDF파일 저장
        doc.save($("#ltBridgeName").text()+"_생애주기 의사결정 지원서비스_PDF파일");

        //로딩 끝
        document.getElementById("loader").style.display = "none";

        //y축 초기화
        curHeight = padding;

        //y축 초기화
        renderedImg = []; //이미지 배열 초기화

        $coverId.css('display','none'); // 표지 초기화
    });
}

//페이지를 이미지로 만들기
function generateCanvas(i, doc, deferred, curList){
    const pdfWidth = $(curList).outerWidth() * 0.2645; //px -> mm로 변환
    const pdfHeight = $(curList).outerHeight() * 0.2645;
    let heightCalc = contWidth * pdfHeight / pdfWidth; //비율에 맞게 높이 조절
    html2canvas( curList ).then(
        function (canvas) {
            const img = canvas.toDataURL('image/jpeg', 1.0); //이미지 형식 지정
            renderedImg.push({num:i, image:img, height:heightCalc}); //renderedImg 배열에 이미지 데이터 저장(뒤죽박죽 방지)
            deferred.resolve(); //결과 보내기
        }
    );
}


