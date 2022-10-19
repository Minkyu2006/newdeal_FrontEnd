// * 성능개선사업평가 서비스 자바스크립트 아웃풋페이지*

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
                    alertCaution("500에러 재로그인 해주세요.", 1);
                }else if(request.status === 400) {
                    // console.log("request.status : " + request.status + " => 400에러");
                    alertCaution("400에러 재로그인 해주세요.", 1);
                } else {
                    // console.log("request.status : " + request.status + " => 404에러");
                    alertCaution("404에러 재로그인 해주세요.", 1);
                }
            },
            success: function (request) {
                let status = request.status;
                console.log("status : " + status);
                if (status === 200) {
                    console.log("아웃풋 성공");
                    console.log("");

                    const piBusiness = request.sendData.piBusiness;
                    const typeName = request.sendData.typeName
                    const piFileYn = request.sendData.piFileYn
                    $("#piFileYn").val(piFileYn);
                    $("#category").val(piBusiness);
                    console.log("사업구분 : " + piBusiness);
                    console.log("시설유형 : "+ typeName);
                    console.log("파일업로드여부 : "+ piFileYn);
                    console.log("");

                    console.log("각 데이터");
                    console.log(request.sendData.weightList);
                    console.log(request.sendData.performanceList);
                    console.log("performanceSize : "+request.sendData.performanceSize);
                    console.log(request.sendData.weightResultList);
                    console.log("");

                    const weightResultList = request.sendData.weightResultList;

                    console.log("기술성");
                    console.log(request.sendData.technicalityScore);
                    console.log(request.sendData.technicalityRank);
                    console.log("");

                    console.log("경제성");
                    console.log(request.sendData.economyScore);
                    console.log(request.sendData.economyRank);
                    console.log("");

                    console.log("정책성");
                    console.log(request.sendData.policyScore);
                    console.log(request.sendData.policyRank);
                    console.log("");

                    console.log("종합데이터");
                    console.log(request.sendData.allScroeMap);
                    console.log(request.sendData.allRankMap);
                    console.log(request.sendData.allBusinessMap);
                    console.log("allGreate : "+request.sendData.allGreate);
                    console.log("");

                    // 상단 스킵여부(적합,부적합,스킵) Text
                    const $skipText = $("#skipText");
                    let piInputSkipText;
                    if(request.sendData.performanceList[0].piInputSkip === "0"){ // 적합
                        piInputSkipText = "본 사업은 「지속가능한 기반시설 관리 기본법」 제13조에 의거한 기반시설 성능개선 사업평가로써, " +
                            "국토교통부 도로시설 성능개선 기준에서 정한 의무평가 요건(사업비용, " +
                            "시설유형, 적용대상, 중복평가, 의무사업, 확정사업)을 모두 충족하는 사업입니다.";
                    }else if(request.sendData.performanceList[0].piInputSkip === "1"){ // 부적합
                        piInputSkipText = "본 사업은 「지속가능한 기반시설 관리 기본법」 제13조에 의거한 기반시설 성능개선 사업평가로써, " +
                            "국토교통부 도로시설 성능개선 기준에서 정한 의무평가 요건을 부분적으로 충족하는 사업성 평가 비 의무 사업입니다.";
                    }else if(request.sendData.performanceList[0].piInputSkip === "2"){ // 스킵
                        piInputSkipText = "본 사업은 「지속가능한 기반시설 관리 기본법」 제13조에 의거한 기반시설 성능개선 사업평가입니다.";
                    }
                    $skipText.html(piInputSkipText);

                    // 성능개선 사업성 평가 개요 Text
                    const $piBusinessName = $("#piBusinessName");
                    let piBusinessNameText = "가. 본 사업은 ";
                    if(request.sendData.performanceList[0].piBusinessValidity === "1"){
                        piBusinessNameText = piBusinessNameText+"법에 따른 의무사업으로써, ";
                    }else if(request.sendData.performanceList[0].piBusinessValidity === "2"){
                        piBusinessNameText = piBusinessNameText+"법정계획에 따른 의무사업으로써, ";
                    }else if(request.sendData.performanceList[0].piBusinessValidity === "3" || request.sendData.performanceList[0].piBusinessValidity === "0"){
                        piBusinessNameText = piBusinessNameText+"자체계획/의결에 따른 사업으로써, ";
                    }

                    piBusinessNameText = piBusinessNameText+"성능개선 사업 유형 중 "+piBusiness+" 유형 사업에 해당<br />" +
                        "나. 국토부 성능개선 기준에 따라, 성능개선 대안과 유지보수 대안을 설정하고 대안별 기술성, 경제성, 정책성을 평가하여, 사업의 추진여부 및 최적대안을 선정";
                    $piBusinessName.html(piBusinessNameText);

                    // 성능개선 대상시설 및 사업 추진대앙 정보 Text
                    const $typeName = $("#typeName");
                    let typeNameText = "대상 시설은 "+request.sendData.performanceList[0].piFacilityType+"("+request.sendData.performanceList[0].piType+")으로, "+
                        "평가에 활용된 시설정보, 이용정보, 사업정보, 여건정보, 평가정보는 이하와 같음";
                    $typeName.html(typeNameText);

                    // 성능개선 사업성 평가 내용 Text
                    const $explanationName = $("#explanationName");
                    let explanationNameText = "가. 본 성능개선 사업성 평가는 한국건설기술연구원 스마트 교량 유지관리 플랫폼(http://newdeal.bmaps.kr/)에서 제공하는 \"성능개선 사업 평가 서비스“를 이용하여 자동화 평가 시행<br />"+
                        "나. 이용자가 적용한 각 평가지표별 가중치와 평가결과는 다음과 같음";
                    $explanationName.html(explanationNameText);

                    let piBusinessType;
                    const piBusinessTypeList = [];
                    // 같은 대안일시 앞에 숫자 넣기
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        piBusinessType = request.sendData.performanceList[j].piBusinessType;
                        // console.log(j+1+"번째 대안 : "+piBusinessType);

                        if(j !== 0) {
                            if(piBusinessTypeList[j-1].substr(0,2) === piBusinessType.substr(0,2)){
                                piBusinessTypeList[j-1] = request.sendData.performanceList[j-1].piBusinessType+" 대안 "+j;
                                piBusinessTypeList.push(piBusinessType+" 대안 "+Number(j+1));
                            }else{
                                piBusinessTypeList.push(piBusinessType+" 대안");
                            }
                        }else{
                            piBusinessTypeList.push(piBusinessType+" 대안");
                        }

                    }
                    console.log("piBusinessTypeList : "+piBusinessTypeList);

                    // 시설 정보 테이블
                    const $outputTableFacility = $('#outputTableFacility');
                    let html = "";

                    html += "<thead>";
                    html += "</thead>";

                    html += "<tbody>";

                    html += "<tr>";
                    html += '<th>'+'시설명'+'</th>';
                    html += "<td colspan='2'>"+request.sendData.performanceList[0].piFacilityName+'</td>';
                    html += '</tr>';

                    html += "<tr>";
                        html += '<th>'+'시설유형'+'</th>';
                        html += "<td colspan='2'>"+request.sendData.performanceList[0].piFacilityType+'</td>';
                    html += '</tr>';

                    html += '<tr>';
                        html += '<th>'+'종별구분'+'</th>';
                        html += "<td colspan='2'>"+request.sendData.performanceList[0].piKind+'</td>';
                    html += '</tr>';

                    html += '<tr>';
                        html += '<th>'+'준공연도'+'</th>';
                        html += "<td colspan='2'>"+request.sendData.performanceList[0].piCompletionYear+'</td>';
                    html += '</tr>';

                    html += '<tr>';
                        html += '<th>'+'공용연수'+'</th>';
                        html += "<td colspan='2'>"+request.sendData.performanceList[0].piPublicYear+'</td>';
                    html += '</tr>';

                    html += '<tr>';
                        html += '<th>'+'형식구분'+'</th>';
                        html += "<td colspan='2'>"+request.sendData.performanceList[0].piType+'</td>';
                    html += '</tr>';

                    if(piBusiness === "노후화대응") {
                        html += '<tr>';
                            html += '<th>' + '취득원가' + '</th>';
                            html += "<td colspan='2'>"+request.sendData.performanceList[0].piErectionCost+'</td>';
                        html += '</tr>';
                    }

                    html += '<tr>';
                        html += '<th>'+'안전등급'+'</th>';
                        html += "<td colspan='2'>"+request.sendData.performanceList[0].piSafetyLevel+'</td>';
                    html += '</tr>';

                    if(piBusiness === "사용성변화"){
                        if(typeName==="교량" || typeName==="터널" ){
                            html += '<tr>';
                                html += '<th>'+'사용성등급'+'</th>';
                                html += "<td colspan='2'>"+request.sendData.performanceList[0].piUsabilityAndGoalLevel+'</td>';
                            html += '</tr>';
                        }else{
                            html += '<tr>';
                                html += '<th>'+'사용성등급'+'</th>';
                                html += "<td colspan='2'>"+'-'+'</td>';
                            html += '</tr>';
                        }
                    }

                    if(piBusiness === "노후화대응"){
                        html += '<tr>';
                            html += '<th>'+'목표 안전등급'+'</th>';
                            html += "<td colspan='2'>"+request.sendData.performanceList[0].piUsabilityAndGoalLevel+'</td>';
                        html += '</tr>';

                        html += '<tr>';
                            html += '<th>'+'유지보수 지연기간'+'</th>';
                            html += "<td colspan='2'>"+request.sendData.performanceList[0].piMaintenanceDelay+'</td>';
                        html += '</tr>';
                    }

                    html += '<tr>';
                        html += '<th>'+'관리주체'+'</th>';
                        html += "<td colspan='2'>"+request.sendData.performanceList[0].piManagement+'</td>';
                    html += '</tr>';

                    html += '<tr>';
                        html += '<th>'+'관리감독기관'+'</th>';
                        html += "<td colspan='2'>"+request.sendData.performanceList[0].piAgency+'</td>';
                    html += '</tr>';

                    html += '</tbody>';
                    $outputTableFacility.html(html);



                    // 이용 정보 테이블
                    const $outputTableUsage = $('#outputTableUsage');
                    let html2 = "";
                    html2 += "<thead>";
                    html2 += '</thead>';
                    html2 += '<tbody>';
                        html2 += '<tr>';
                            html2 += '<th>'+'연평균일교통량(AADT)'+'</th>';
                            html2 += "<td colspan='2'>"+request.sendData.performanceList[0].piAADT+'</td>';
                        html2 += '</tr>';
                        if(piBusiness !== "기준변화") {
                            html2 += '<tr>';
                                html2 += '<th>' + '최근 1년 간 민원 및 사고발생 건수' + '</th>';
                                html2 += '<td colspan="2">' + request.sendData.performanceList[0].piWhether + '건' + '</td>';
                            html2 += '</tr>';
                        }
                    html2 += '</tbody>';
                    $outputTableUsage.html(html2);



                    // 사업 정보 테이블
                    const $outputTableBusiness = $('#outputTableBusiness');

                    let html3 = '';
                    html3 += '<thead>';
                    html3 += '<tr>';
                    html3 += '<th></th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html3 += '<td>'+piBusinessTypeList[j]+'</td>';
                    }
                    html3 += '</tr>';
                    html3 += '</thead>';
                    html3 += '<tbody>';

                    // html3 += '<tr>';
                    // html3 += '<th>'+'사업유형'+'</th>';
                    // for(let j=0; j<request.sendData.performanceSize; j++){
                    //     html3 += '<td>'+request.sendData.performanceList[j].piBusinessType+'</td>';
                    // }
                    // html3 += '</tr>';

                    html3 += '<tr>';
                    html3 += '<th>'+'사업구분'+'</th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html3 += '<td>'+request.sendData.performanceList[j].piBusiness+' 유형'+'</td>';
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

                    if(piBusiness === "노후화대응") {
                        html3 += '<tr>';
                        html3 += '<th>' + '사업전/사업후 안전등급' + '</th>';
                        for (let j = 0; j < request.sendData.performanceSize; j++) {
                            html3 += '<td>' + request.sendData.performanceList[j].piBeforeSafetyRating+ ' / ' +request.sendData.performanceList[j].piAfterSafetyRating + '</td>';
                        }
                        html3 += '</tr>';

                        // html3 += '<tr>';
                        // html3 += '<th>' + '사업후 안전등급' + '</th>';
                        // for (let j = 0; j < request.sendData.performanceSize; j++) {
                        //     html3 += '<td>' + request.sendData.performanceList[j].piAfterSafetyRating + '</td>';
                        // }
                        // html3 += '</tr>';
                    }

                    html3 += '<tr>';
                    html3 += '<th>'+'사업추진 타당성'+'</th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        if(request.sendData.performanceList[j].piBusinessValidity==="1"){
                            html3 += '<td>'+'법에 따른 의무사업'+'</td>';
                        }else if(request.sendData.performanceList[j].piBusinessValidity==="2"){
                            html3 += '<td>'+'법정계획에 따른 의무사업\t'+'</td>';
                        }else if(request.sendData.performanceList[j].piBusinessValidity==="3"){
                            html3 += '<td>'+'자체계획/의결에 따른 사업\t'+'</td>';
                        }else {
                            html3 += '<td>'+'해당사유 외'+'</td>';
                        }
                    }
                    html3 += '</tr>';

                    html3 += '</tbody>';

                    $outputTableBusiness.html(html3);

                    // // 여건 정보 테이블
                    // const $outputTableCondition = $('#outputTableCondition');
                    // if(piBusiness !== "기준변화") {
                    //     let html4 = '';
                    //     html4 += '<thead>';
                    //
                    //     html4 += '<tr>';
                    //         html4 += '<th></th>';
                    //         html4 += '<td colspan="2">' + request.sendData.performanceList[0].piBusinessType + ' 대안' + '</td>';
                    //     html4 += '</thead>';
                    //
                    //     html4 += '<tbody>';
                    //
                    //     html4 += '<tr>';
                    //         html4 += '<th>' + '최근 1년 간 민원 및 사고발생 건수' + '</th>';
                    //         html4 += '<td colspan="2">' + request.sendData.performanceList[0].piWhether + '건' + '</td>';
                    //     html4 += '</tr>';
                    //
                    //     html4 += '</tbody>';
                    //     $outputTableCondition.html(html4);
                    // }else{
                    //     $outputTableCondition.css("display","none");
                    // }

                    // 평가 정보 테이블
                    const $outputTableEvaluation = $('#outputTableEvaluation');
                    let html5 = '';
                    html5 += '<thead>';
                    html5 += '</thead>';

                    html5 += '<tbody>';

                    html5 += '<tr>';
                        html5 += '<th>'+'평가 기준년도'+'</th>';
                        html5 += '<td colspan="2">' + request.sendData.performanceList[0].piRaterBaseYear + '</td>';
                    html5 += '</tr>';

                    html5 += '<tr>';
                        html5 += '<th>'+'평가자'+'</th>';
                        html5 += '<td colspan="2">' + request.sendData.performanceList[0].piRater + '</td>';
                    html5 += '</tr>';

                    html5 += '<tr>';
                        html5 += '<th>'+'평가자 소속'+'</th>';
                        html5 += '<td colspan="2">' + request.sendData.performanceList[0].piRaterBelong + '</td>';
                    html5 += '</tr>';

                    html5 += '<tr>';
                        html5 += '<th>'+'평가자 연락처'+'</th>';
                        html5 += '<td colspan="2">' + request.sendData.performanceList[0].piRaterPhone + '</td>';
                    html5 += '</tr>';

                    html5 += '</tbody>';
                    $outputTableEvaluation.html(html5);

                    // 가중치 테이블 기술성
                    const $outputTableWeightT = $('#outputTableWeightT');
                    let html6 = '';
                    html6 += '<thead>';
                    html6 += '<tr>';
                    html6 += '<th>'+'평가 지표'+'</th>';
                    html6 += '<th>'+'적용 가중치'+'</th>';
                    html6 += '<th>'+'기준 가중치'+'</th>';
                    html6 += '<th>'+'변경여부'+'</th>';
                    html6 += '<th>'+'최소-최대 범위내 지정'+'</th>';
                    html6 += "</tr>";
                    html6 += '</thead>';

                    html6 += '<tbody>';

                    let i = 0;
                    if(piBusiness === "노후화대응") {

                        html6 += '<tr>';
                        html6 += '<th>'+'안전성'+'</th>';
                        html6 += '<td>'+request.sendData.weightList.piWeightSafe+'</td>';
                        html6 += '<td>'+weightResultList[0][i]+'</td>'
                        html6 += '<td>'+weightResultList[1][i]+'</td>'
                        html6 += '<td>'+weightResultList[2][i]+'</td>'
                        html6 += '</tr>';
                        i++;

                        html6 += '<tr>';
                        html6 += '<th>'+'노후도'+'</th>';
                        html6 += '<td>'+request.sendData.weightList.piWeightOld+'</td>';
                        html6 += '<td>'+weightResultList[0][i]+'</td>'
                        html6 += '<td>'+weightResultList[1][i]+'</td>'
                        html6 += '<td>'+weightResultList[2][i]+'</td>'
                        html6 += '</tr>';
                        i++;

                        html6 += '<tr>';
                        html6 += '<th>'+'지체도'+'</th>';
                        html6 += '<td>'+request.sendData.weightList.piWeightUrgency+'</td>';
                        html6 += '<td>'+weightResultList[0][i]+'</td>'
                        html6 += '<td>'+weightResultList[1][i]+'</td>'
                        html6 += '<td>'+weightResultList[2][i]+'</td>'
                        html6 += '</tr>';
                        i++;

                        html6 += '<tr>';
                        html6 += '<th>'+'목표달성도'+'</th>';
                        html6 += '<td>'+request.sendData.weightList.piWeightGoal+'</td>';
                        html6 += '<td>'+weightResultList[0][i]+'</td>'
                        html6 += '<td>'+weightResultList[1][i]+'</td>'
                        html6 += '<td>'+weightResultList[2][i]+'</td>'
                        html6 += '</tr>';
                        i++;

                    }else if(piBusiness === "사용성변화"){

                        html6 += '<tr>';
                        html6 += '<th>'+'안전성'+'</th>';
                        html6 += '<td>'+request.sendData.weightList.piWeightSafe+'</td>';
                        html6 += '<td>'+weightResultList[0][i]+'</td>'
                        html6 += '<td>'+weightResultList[1][i]+'</td>'
                        html6 += '<td>'+weightResultList[2][i]+'</td>'
                        html6 += '</tr>';
                        i++;

                        if(request.sendData.typeName==="교량" || request.sendData.typeName==="터널" ){
                            html6 += '<tr>';
                            html6 += '<th>'+'사용성'+'</th>';
                            html6 += '<td>'+request.sendData.weightList.piWeightUsability+'</td>';
                            html6 += '<td>'+weightResultList[0][i]+'</td>'
                            html6 += '<td>'+weightResultList[1][i]+'</td>'
                            html6 += '<td>'+weightResultList[2][i]+'</td>'
                            html6 += '</tr>';
                            i++;
                        }else{
                            html6 += '<tr>';
                            html6 += '<th>'+'사용성'+'</th>';
                            html6 += '<td colspan="4">'+'시설유형이 교량 또는 터널이 아닙니다.'+'</td>';
                            html6 += '</tr>';
                        }

                        html6 += '<tr>';
                        html6 += '<th>'+'노후도'+'</th>';
                        html6 += '<td>'+request.sendData.weightList.piWeightOld+'</td>';
                        html6 += '<td>'+weightResultList[0][i]+'</td>'
                        html6 += '<td>'+weightResultList[1][i]+'</td>'
                        html6 += '<td>'+weightResultList[2][i]+'</td>'
                        html6 += '</tr>';
                        i++;

                    }else{

                        html6 += '<tr>';
                        html6 += '<th>'+'안전성'+'</th>';
                        html6 += '<td>'+request.sendData.weightList.piWeightSafe+'</td>';
                        html6 += '<td>'+weightResultList[0][i]+'</td>'
                        html6 += '<td>'+weightResultList[1][i]+'</td>'
                        html6 += '<td>'+weightResultList[2][i]+'</td>'
                        html6 += '</tr>';
                        i++;

                        html6 += '<tr>';
                        html6 += '<th>'+'노후도'+'</th>';
                        html6 += '<td>'+request.sendData.weightList.piWeightOld+'</td>';
                        html6 += '<td>'+weightResultList[0][i]+'</td>'
                        html6 += '<td>'+weightResultList[1][i]+'</td>'
                        html6 += '<td>'+weightResultList[2][i]+'</td>'
                        html6 += '</tr>';
                        i++;

                    }
                    html6 += '</tr>';

                    html6 += '</tbody>';
                    $outputTableWeightT.html(html6);

                    // 가중치 테이블 경제성
                    const $outputTableWeightE = $('#outputTableWeightE');
                    let html7 = '';
                    html7 += '<thead>';
                    html7 += '<tr>';
                    html7 += '<th>'+'평가 지표'+'</th>';
                    html7 += '<th>'+'적용 가중치'+'</th>';
                    html7 += '<th>'+'기준 가중치'+'</th>';
                    html7 += '<th>'+'변경여부'+'</th>';
                    html7 += '<th>'+'최소-최대 범위내 지정'+'</th>';
                    html7 += "</tr>";
                    html7 += '</thead>';

                    html7 += '<tbody>';

                    if(piBusiness === "노후화대응") {
                        html7 += '<tr>';
                        html7 += '<th>' + '안전효용 개선 효율성' + '</th>';
                        html7 += '<td>' + request.sendData.weightList.piWeightSafeUtility + '</td>';
                        html7 += '<td>'+weightResultList[0][i]+'</td>'
                        html7 += '<td>'+weightResultList[1][i]+'</td>'
                        html7 += '<td>'+weightResultList[2][i]+'</td>'
                        html7 += '</tr>';
                        i++;

                        html7 += '<tr>';
                        html7 += '<th>' + '자산가치 개선 효율성' + '</th>';
                        html7 += '<td>' + request.sendData.weightList.piWeightCostUtility + '</td>';
                        html7 += '<td>'+weightResultList[0][i]+'</td>'
                        html7 += '<td>'+weightResultList[1][i]+'</td>'
                        html7 += '<td>'+weightResultList[2][i]+'</td>'
                        html7 += '</tr>';
                        i++;
                    }else{

                        html7 += '<tr>';
                        html7 += '<th>' + '사업규모 등급' + '</th>';
                        html7 += '<td>' + request.sendData.weightList.piWeightSafeUtility + '</td>';
                        html7 += '<td>'+weightResultList[0][i]+'</td>'
                        html7 += '<td>'+weightResultList[1][i]+'</td>'
                        html7 += '<td>'+weightResultList[2][i]+'</td>'
                        html7 += '</tr>';
                        i++;

                        html7 += '<tr>';
                        html7 += '<th>' + '사업효율 등급' + '</th>';
                        html7 += '<td>' + request.sendData.weightList.piWeightCostUtility + '</td>';
                        html7 += '<td>'+weightResultList[0][i]+'</td>'
                        html7 += '<td>'+weightResultList[1][i]+'</td>'
                        html7 += '<td>'+weightResultList[2][i]+'</td>'
                        html7 += '</tr>';
                        i++;
                    }

                    html7 += '</tbody>';
                    $outputTableWeightE.html(html7);

                    // 가중치 테이블 정책성
                    const $outputTableWeightP= $('#outputTableWeightP');
                    let html8 = '';
                    html8 += '<thead>';
                    html8 += '<tr>';
                    html8 += '<th>'+'평가 지표'+'</th>';
                    html8 += '<th>'+'적용 가중치'+'</th>';
                    html8 += '<th>'+'기준 가중치'+'</th>';
                    html8 += '<th>'+'변경여부'+'</th>';
                    html8 += '<th>'+'최소-최대 범위내 지정'+'</th>';
                    html8 += "</tr>";
                    html8 += '</thead>';

                    html8 += '<tbody>';

                    if(piBusiness === "노후화대응" ||  piBusiness === "사용성변화"){
                        html8 += '<tr>';
                        html8 += '<th>' + '사업추진 타당성' + '</th>';
                        html8 += '<td>' + request.sendData.weightList.piWeightBusiness + '</td>';
                        html8 += '<td>'+weightResultList[0][i]+'</td>'
                        html8 += '<td>'+weightResultList[1][i]+'</td>'
                        html8 += '<td>'+weightResultList[2][i]+'</td>'
                        html8 += '</tr>';
                        i++;

                        html8 += '<tr>';
                        html8 += '<th>' + '민원 및 사고 대응성' + '</th>';
                        html8 += '<td>' + request.sendData.weightList.piWeightComplaint + '</td>';
                        html8 += '<td>'+weightResultList[0][i]+'</td>'
                        html8 += '<td>'+weightResultList[1][i]+'</td>'
                        html8 += '<td>'+weightResultList[2][i]+'</td>'
                        html8 += '</tr>';
                        i++;

                        html8 += '<tr>';
                        html8 += '<th>' + '사업효과 범용성' + '</th>';
                        html8 += '<td>' + request.sendData.weightList.piWeightBusinessEffect + '</td>';
                        html8 += '<td>'+weightResultList[0][i]+'</td>'
                        html8 += '<td>'+weightResultList[1][i]+'</td>'
                        html8 += '<td>'+weightResultList[2][i]+'</td>'
                        html8 += '</tr>';
                        i++;
                    }else {
                        html8 += '<tr>';
                        html8 += '<th>' + '사업추진 타당성' + '</th>';
                        html8 += '<td>' + request.sendData.weightList.piWeightBusiness + '</td>';
                        html8 += '<td>'+weightResultList[0][i]+'</td>'
                        html8 += '<td>'+weightResultList[1][i]+'</td>'
                        html8 += '<td>'+weightResultList[2][i]+'</td>'
                        html8 += '</tr>';
                        i++;

                        html8 += '<tr>';
                        html8 += '<th>' + '사업효과 범용성' + '</th>';
                        html8 += '<td>' + request.sendData.weightList.piWeightBusinessEffect + '</td>';
                        html8 += '<td>'+weightResultList[0][i]+'</td>'
                        html8 += '<td>'+weightResultList[1][i]+'</td>'
                        html8 += '<td>'+weightResultList[2][i]+'</td>'
                        html8 += '</tr>';
                        i++;
                    }

                    html8 += '</tbody>';
                    $outputTableWeightP.html(html8);




                    // 노후화_기술성 테이블
                    const $technicalityTable = $('#technicalityTable');
                    i = 0;
                    let html9 = '';

                    html9 += '<thead>';
                    html9 += '<tr>';
                    html9 += '<th>'+'평가 지표'+'</th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html9 += '<td>'+piBusinessTypeList[j]+'</td>';
                    }
                    html9 += '</tr>';
                    html9 += '</thead>';

                    html9 += '<tbody>';

                    if(piBusiness === "노후화대응") {
                        html9 += '<tr>';
                        html9 += '<th>'+'안전성'+'</th>';
                        for(let j=0; j<request.sendData.performanceSize; j++){
                            html9 += '<td>'+request.sendData.technicalityRank[j][i]+" / "+request.sendData.technicalityScore[j][i]+'</td>';
                        }
                        i++;
                        html9 += '</tr>';

                        html9 += '<tr>';
                        html9 += '<th>'+'노후도'+'</th>';
                        for(let j=0; j<request.sendData.performanceSize; j++){
                            html9 += '<td>'+request.sendData.technicalityRank[j][i]+" / "+request.sendData.technicalityScore[j][i]+'</td>';
                        }
                        i++;
                        html9 += '</tr>';

                        html9 += '<tr>';
                        html9 += '<th>'+'지체도'+'</th>';
                        for(let j=0; j<request.sendData.performanceSize; j++){
                            html9 += '<td>'+request.sendData.technicalityRank[j][i]+" / "+request.sendData.technicalityScore[j][i]+'</td>';
                        }
                        i++;
                        html9 += '</tr>';

                        html9 += '<tr>';
                        html9 += '<th>'+'목표달성도'+'</th>';
                        for(let j=0; j<request.sendData.performanceSize; j++){
                            html9 += '<td>'+request.sendData.technicalityRank[j][i]+" / "+request.sendData.technicalityScore[j][i]+'</td>';
                        }
                        i++;
                        html9 += '</tr>';



                    }else if(piBusiness === "사용성변화"){

                        html9 += '<tr>';
                        html9 += '<th>'+'안전성'+'</th>';
                        for(let j=0; j<request.sendData.performanceSize; j++){
                            html9 += '<td>'+request.sendData.technicalityRank[j][i]+" / "+request.sendData.technicalityScore[j][i]+'</td>';
                        }
                        i++;
                        html9 += '</tr>';

                        if(request.sendData.typeName==="교량" || request.sendData.typeName==="터널" ){
                            html9 += '<tr>';
                            html9 += '<th>'+'사용성'+'</th>';
                            for(let j=0; j<request.sendData.performanceSize; j++){
                                html9 += '<td>'+request.sendData.technicalityRank[j][i]+" / "+request.sendData.technicalityScore[j][i]+'</td>';
                            }
                            i++;
                            html9 += '</tr>';
                        }

                        html9 += '<tr>';
                        html9 += '<th>'+'노후도'+'</th>';
                        for(let j=0; j<request.sendData.performanceSize; j++){
                            html9 += '<td>'+request.sendData.technicalityRank[j][i]+" / "+request.sendData.technicalityScore[j][i]+'</td>';
                        }
                        i++;
                        html9 += '</tr>';

                    }else{

                        html9 += '<tr>';
                        html9 += '<th>'+'안전성'+'</th>';
                        for(let j=0; j<request.sendData.performanceSize; j++){
                            html9 += '<td>'+request.sendData.technicalityRank[j][i]+" / "+request.sendData.technicalityScore[j][i]+'</td>';
                        }
                        i++;
                        html9 += '</tr>';

                        html9 += '<tr>';
                        html9 += '<th>'+'노후도'+'</th>';
                        for(let j=0; j<request.sendData.performanceSize; j++){
                            html9 += '<td>'+request.sendData.technicalityRank[j][i]+" / "+request.sendData.technicalityScore[j][i]+'</td>';
                        }
                        i++;
                        html9 += '</tr>';

                    }

                    html9 += '<tr>';
                    html9 += '<th>'+'기술성 종합점수'+'</th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html9 += '<td>'+request.sendData.technicalityRank[j][i]+" / "+request.sendData.technicalityScore[j][i]+'</td>';
                    }
                    html9 += '</tr>';

                    html9 += '</tbody>';
                    $technicalityTable.html(html9);

                    // 노후화_경제성 테이블
                    const $economyTable = $('#economyTable');
                    i = 0;
                    let html10 = '';

                    html10 += '<thead>';
                    html10 += '<tr>';
                    html10 += '<th>'+'평가 지표'+'</th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html10 += '<td>'+piBusinessTypeList[j]+'</td>';
                    }
                    html10 += '</tr>';
                    html10 += '</thead>';

                    html10 += '<tbody>';

                    if(piBusiness === "노후화대응") {
                        html10 += '<tr>';
                        html10 += '<th>' + '자산가치 개선 효율성' + '</th>';
                        for (let j = 0; j < request.sendData.performanceSize; j++) {
                            html10 += '<td>' + request.sendData.economyRank[j][i] + " / " + request.sendData.economyScore[j][i] + '</td>';
                        }
                        i++;
                        html10 += '</tr>';

                        html10 += '<tr>';
                        html10 += '<th>' + '안전효용 개선 효율성' + '</th>';
                        for (let j = 0; j < request.sendData.performanceSize; j++) {
                            html10 += '<td>' + request.sendData.economyRank[j][i] + " / " + request.sendData.economyScore[j][i] + '</td>';
                        }
                        i++;
                        html10 += '</tr>';
                    }else{
                        html10 += '<tr>';
                        html10 += '<th>' + '사업규모 등급' + '</th>';
                        for (let j = 0; j < request.sendData.performanceSize; j++) {
                            html10 += '<td>' + request.sendData.economyRank[j][i] + " / " + request.sendData.economyScore[j][i] + '</td>';
                        }
                        i++;
                        html10 += '</tr>';

                        html10 += '<tr>';
                        html10 += '<th>' + '사업효율 등급' + '</th>';
                        for (let j = 0; j < request.sendData.performanceSize; j++) {
                            html10 += '<td>' + request.sendData.economyRank[j][i] + " / " + request.sendData.economyScore[j][i] + '</td>';
                        }
                        i++;
                        html10 += '</tr>';
                    }

                    html10 += '<tr>';
                    html10 += '<th>'+'경제성 종합점수'+'</th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html10 += '<td>'+request.sendData.economyRank[j][i]+" / "+request.sendData.economyScore[j][i]+'</td>';
                    }
                    html10 += '</tr>';

                    html10 += '</tbody>';

                    $economyTable.html(html10);

                    // 노후화_정책성 테이블
                    const $policyTable = $('#policyTable');
                    i = 0;
                    let html11 = '';

                    html11 += '<thead>';
                    html11 += '<tr>';
                    html11 += '<th>'+'평가 지표'+'</th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html11 += '<td>'+piBusinessTypeList[j]+'</td>';
                    }
                    html11 += '</tr>';
                    html11 += '</thead>';

                    html11 += '<tbody>';

                    html11 += '<tr>';
                    html11 += '<th>'+'사업추진 타당성'+'</th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html11 += '<td>'+request.sendData.policyRank[j][i]+" / "+request.sendData.policyScore[j][i]+'</td>';
                    }
                    i++;
                    html11 += '</tr>';

                    if(piBusiness === "노후화대응" ||  piBusiness === "사용성변화"){

                        html11 += '<tr>';
                        html11 += '<th>'+'민원 및 사고 대응성'+'</th>';
                        for(let j=0; j<request.sendData.performanceSize; j++){
                            html11 += '<td>'+request.sendData.policyRank[j][i]+" / "+request.sendData.policyScore[j][i]+'</td>';
                        }
                        i++;
                        html11 += '</tr>';

                    }

                    html11 += '<tr>';
                    html11 += '<th>'+'사업효과 범용성'+'</th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html11 += '<td>'+request.sendData.policyRank[j][i]+" / "+request.sendData.policyScore[j][i]+'</td>';
                    }
                    i++;
                    html11 += '</tr>';

                    html11 += '<tr>';
                    html11 += '<th>'+'정책성 종합점수'+'</th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html11 += '<td>'+request.sendData.policyRank[j][i]+" / "+request.sendData.policyScore[j][i]+'</td>';
                    }
                    html11 += '</tr>';

                    html11 += '</tbody>';

                    $policyTable.html(html11);

                    // 종합평가표 테이블
                    const $allScoreRankTable = $('#allScoreRankTable');
                    let html12 = '';
                    html12 += '<thead>';
                    html12 += '<tr>';
                    html12 += '<th>'+'평가 지표'+'</th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html12 += '<td>'+piBusinessTypeList[j]+'</td>';
                    }
                    html12 += '</tr>';
                    html12 += '</thead>';

                    html12 += '<tbody>';

                    html12 += '<tr>';
                    html12 += '<th>'+'사업대안별 종합등급'+'</th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html12 += '<td style="color: red">'+request.sendData.allRankMap[j][0]+'</td>';
                    }
                    html12 += '</tr>';

                    html12 += '<tr>';
                    html12 += '<th>'+'사업대안별 종합점수'+'</th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html12 += '<td style="color: red">'+request.sendData.allScroeMap[j][0]+'</td>';
                    }
                    html12 += '</tr>';

                    html12 += '<tr>';
                    html12 += '<th>'+'사업 추진 가능여부 평가'+'</th>';
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        html12 += '<td style="color: red">'+request.sendData.allBusinessMap[j][0]+'</td>';
                    }
                    html12 += '</tr>';

                    html12 += '<tr>';
                    html12 += '<th>'+'사업 우수대안 평가'+'</th>';
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

                    i=0;
                    // 성능개선 사업성 종합평가 결과 Text
                    const $resultName = $("#resultName");
                    let resultNameText = "가. 대안별 사업추진 타당성 평가<br />";
                    for(let j=0; j<request.sendData.performanceSize; j++){
                        resultNameText += "- "+piBusinessTypeList[j]+"은 "+request.sendData.allRankMap[j][0]+
                            "("+request.sendData.allScroeMap[j][0]+")"+"으로 "+request.sendData.allBusinessMap[j][0]+"<br />";
                    }
                    resultNameText +=  "<br />";
                    resultNameText += "나. 우수 사업대안 선정<br />";

                    for(let j=1; j<request.sendData.performanceSize+1; j++){
                        if(request.sendData.allGreate[i] !== undefined && request.sendData.allGreate[i] !== "-") {
                            resultNameText += "- " + piBusinessTypeList[i] + "이 우수<br />"
                        }
                        i++;
                    }
                    $resultName.html(resultNameText);

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




// 사업내용 조정 및 재평가(수정하기) 버튼
function backBtn(){
    // console.log("수정하기 버튼 클릭");
    location.href = '/performance/input?autoNum='+$("#autoNum").val()+'&piFileYn='+$("#piFileYn").val()+'&category='+$("#category").val();
}



let renderedImg = [];
const contWidth = 200; // 너비(mm) (a4에 맞춤)
const padding = 5; //상하좌우 여백(mm)

//이미지를 pdf로 만들기
function createPdf() {
    // console.log("######### PDF 다운로드 시작 #########")

    //로딩 시작
    document.getElementById("loader").style.display = "block";

    const lists = document.querySelectorAll("#performance > div.pdfArea");
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
        doc.save($("#autoNum").val()+"_성능개선사업평가_PDF파일");

        //로딩 끝
        document.getElementById("loader").style.display = "none";

        //y축 초기화
        curHeight = padding;

        //y축 초기화
        renderedImg = []; //이미지 배열 초기화
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
