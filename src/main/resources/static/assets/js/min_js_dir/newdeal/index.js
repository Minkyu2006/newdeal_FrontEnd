
// 유저 수 가져오는 함수
function userCount(){
    // console.log("유저 수 가져오기");

    let url = $("#backend_protocol").val() + "://" + $("#backend_url").val() + "/api/account/count"; // 호출할 백엔드 API

    $.ajax({
        url: url,
        type : 'GET',
        cache:false,
        error:function(request){
            console.log(request+"에러..유저수를 불러오지 못했습니다.")
        },
        success: function(request) {
            let status = request.status;
            // console.log("status : " + status);
            if (status === 200) {
                console.log("유저 수 가져오기 성공");
                console.log("유저 수 : "+request.sendData.userCount);
                let item = document.querySelector('#userCount');
                item.setAttribute('data-count',request.sendData.userCount);

                indexDataCount("userCount");

                // item.dataset.count = request.sendData.userCount;
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

// 데이터 조회 수 가져오는 함수
function dataLogCount(){
    // console.log("데이터 조회 수 가져오기")
    let url = $("#backend_protocol").val() + "://" + $("#backend_url").val() + "/api/userLog/count"; // 호출할 백엔드 API

    $.ajax({
        url: url,
        type : 'GET',
        cache:false,
        error:function(request){
            console.log(request+"에러..조회수를 불러오지 못했습니다.")
        },
        success: function(request) {
            let status = request.status;
            // console.log("status : " + status);
            if (status === 200) {
                console.log("데이터 조회 수 가져오기 성공");
                console.log("데이터 조회 수 : "+request.sendData.dataSearchCount);
                let item = document.querySelector('#dataSearchCount');
                item.setAttribute('data-count',request.sendData.dataSearchCount);
                indexDataCount("dataSearchCount");
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