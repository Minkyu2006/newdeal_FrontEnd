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
