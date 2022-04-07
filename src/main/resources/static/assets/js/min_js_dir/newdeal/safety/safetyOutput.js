$(function() {
    bridgeList();





});

// 계측 기반 안전성 추정 데이터 - 교량 리스트 호출
function bridgeList(){
    JWT_Get();
    if (accessToken == null && refreshToken == null && insert_id == null) {
        alertCaution("토큰이 만료되었습니다.<BR>다시 로그인해주세요.", 2);
    } else {

        let url;
        url = $("#backend_protocol").val() + "://" + $("#backend_url").val() + "/api/safety/bridgeList"; // 호출할 백엔드 API
        $.ajax({
            url: url,
            type: 'get',
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
            success: function (request) {
                if (request.status === 200) {
                    console.log(request);

                    const safetyList = request.sendData.safetyList;
                    let html = '';
                    html += '<option value="">교량을 선택해주세요</option>'
                    for(let i=0; i<safetyList.length; i++){
                        html += '<option value='+safetyList[i]["id"]+'>'+safetyList[i]["sfName"]+'</option>'
                    }

                    $('#sfName').html(html);
                } else{
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

// 계측 기반 안전성 추정 데이터 가져오기
function test(num){
    console.log(num);
    if(num !== ""){
        JWT_Get();
        if (accessToken == null && refreshToken == null && insert_id == null) {
            alertCaution("토큰이 만료되었습니다.<BR>다시 로그인해주세요.", 2);
        } else {

            let url;
            url = $("#backend_protocol").val() + "://" + $("#backend_url").val() + "/api/safety/safetyCalculationOutputInfo"; // 호출할 백엔드 API

            const param = {
                "id" : num
            }
            $.ajax({
                url: url,
                type: 'get',
                data: param,
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
                success: function (request) {
                    if (request.status === 200) {
                        console.log(request);

                        const  safetyInfo = request.sendData.safetyInfo;
                        const  gridListData = request.sendData.gridListData;
                        const  temperatureData = request.sendData.temperatureData;
                        const  capacityData = request.sendData.capacityData;

                        $("#sfForm").val(safetyInfo.sfForm);
                        $("#sfRank").val(safetyInfo.sfRank);
                        $("#sfLength").val(safetyInfo.sfLength);
                        $("#sfWidth").val(safetyInfo.sfWidth);
                        $("#sfNum").val(safetyInfo.sfNum);
                        $("#sfCompletionYear").val(safetyInfo.sfCompletionYear);
                        $("#sfFactor").val(safetyInfo.sfFactor);



                    } else{
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


















