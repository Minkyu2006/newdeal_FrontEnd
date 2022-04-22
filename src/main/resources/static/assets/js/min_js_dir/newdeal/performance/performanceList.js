// * 성능개선사업평가 서비스 자바스크립트 리스트페이지*

// 조회
function performanceList(page){
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
                        clickEvent: 'performanceList'
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
                    performanceList(1);
                }
            }
        });
    }
}
